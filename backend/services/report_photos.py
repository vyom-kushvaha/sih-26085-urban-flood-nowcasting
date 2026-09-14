"""Bounded private report photos: validate, downsize and strip metadata."""
import base64
import binascii
import io
import warnings

from PIL import Image, ImageOps, UnidentifiedImageError


def normalize_photo(value):
    if value is None:
        return None
    try:
        header, encoded = value.split(',', 1)
        if header not in {'data:image/jpeg;base64', 'data:image/png;base64', 'data:image/webp;base64'}:
            raise ValueError('Use a JPEG, PNG or WebP photo')
        raw = base64.b64decode(encoded, validate=True)
        if len(raw) > 250_000:
            raise ValueError('Photo must be smaller than 250 KB after resizing')
        with warnings.catch_warnings():
            warnings.simplefilter('error', Image.DecompressionBombWarning)
            with Image.open(io.BytesIO(raw)) as photo:
                if photo.width * photo.height > 4_000_000:
                    raise ValueError('Photo dimensions exceed 4 megapixels')
                photo = ImageOps.exif_transpose(photo).convert('RGB')
                photo.thumbnail((1024, 1024))
                output = io.BytesIO()
                photo.save(output, format='JPEG', quality=70, optimize=True)
        if len(output.getvalue()) > 250_000:
            raise ValueError('Photo is too detailed; choose a smaller image')
        return 'data:image/jpeg;base64,' + base64.b64encode(output.getvalue()).decode('ascii')
    except (ValueError, binascii.Error, UnidentifiedImageError, OSError,
            Image.DecompressionBombError, Image.DecompressionBombWarning) as exc:
        raise ValueError('Invalid photo; use a resized JPEG, PNG or WebP under 250 KB') from exc
