"""Small single-instance deployment guard for bounded writes and private responses."""
import time
from collections import OrderedDict
from starlette.responses import JSONResponse
from backend.core.config import settings


class HTTPGuard:
    def __init__(self, app):
        self.app = app
        self.buckets = OrderedDict()

    async def __call__(self, scope, receive, send):
        if scope['type'] != 'http':
            return await self.app(scope, receive, send)
        path, method = scope['path'], scope['method']
        is_write = method in {'POST', 'PUT', 'PATCH'}
        async def guarded_send(message):
            if message['type'] == 'http.response.start':
                headers = list(message.get('headers', []))
                headers.extend([(b'x-content-type-options', b'nosniff'),
                                (b'referrer-policy', b'strict-origin-when-cross-origin'),
                                (b'x-frame-options', b'SAMEORIGIN')])
                if path.startswith('/api/v1/admin') or path.startswith('/api/v1/reports'):
                    headers.append((b'cache-control', b'no-store'))
                message = {**message, 'headers': headers}
            await send(message)
        if settings.is_production and (is_write or path.startswith('/api/v1/admin')):
            now = time.monotonic()
            key = ((scope.get('client') or ('unknown', 0))[0], 'admin' if '/admin' in path else 'write')
            began, count = self.buckets.get(key, (now, 0))
            if now - began >= 60:
                began, count = now, 0
            self.buckets[key] = (began, count + 1)
            self.buckets.move_to_end(key)
            while len(self.buckets) > 4096:
                self.buckets.popitem(last=False)
            if count >= 30:
                return await JSONResponse({'detail': 'Too many requests; retry in one minute'},
                    status_code=429, headers={'Retry-After': '60'})(scope, receive, guarded_send)
        if is_write:
            body = bytearray()
            while True:
                message = await receive()
                if message['type'] == 'http.disconnect':
                    return
                body.extend(message.get('body', b''))
                if len(body) > 2_000_000:
                    return await JSONResponse({'detail': 'Request exceeds 2 MB limit'}, status_code=413)(scope, receive, guarded_send)
                if not message.get('more_body', False):
                    break
            consumed = False
            async def replay():
                nonlocal consumed
                if not consumed:
                    consumed = True
                    return {'type': 'http.request', 'body': bytes(body), 'more_body': False}
                return await receive()
            return await self.app(scope, replay, guarded_send)
        return await self.app(scope, receive, guarded_send)
