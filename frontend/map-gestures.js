/* Cooperative page/map gestures. Leaflet retains its native pinch and wheel math. */
'use strict';
function installMapGestures(map, environment = window) {
  const container = map.getContainer();
  const hint = document.createElement('div');
  hint.className = 'map-gesture-hint';
  hint.setAttribute('role', 'status');
  hint.setAttribute('aria-live', 'polite');
  hint.hidden = true;
  container.appendChild(hint);
  container.classList.add('cooperative-map');
  const modifier = /Mac|iPhone|iPad/.test(environment.navigator?.platform || '') ? '⌘' : 'Ctrl';
  let hintTimer, startPoint, moved = false, suppressClickUntil = 0;
  const listeners = [];
  const listen = (type, handler, options) => {
    container.addEventListener(type, handler, options);
    listeners.push([type, handler, options]);
  };
  const hideHint = () => { environment.clearTimeout(hintTimer); hint.hidden = true; };
  const showHint = text => {
    if (hint.textContent !== text) hint.textContent = text;
    hint.hidden = false;
    environment.clearTimeout(hintTimer);
    hintTimer = environment.setTimeout(hideHint, 1200);
  };
  // Capture before Leaflet's wheel handler. Keep the browser default scroll;
  // only authorised Ctrl/Cmd-wheel events reach Leaflet and prevent page zoom.
  listen('wheel', event => {
    if (event.ctrlKey || event.metaKey) { hideHint(); return; }
    event.stopImmediatePropagation();
    if (event.deltaY) showHint(`Hold ${modifier} and scroll to zoom the map`);
  }, {capture:true, passive:true});
  // Input type, not screen width: touchscreen laptops must work too.
  listen('pointerdown', event => {
    if (event.pointerType === 'touch') map.dragging.disable();
    else { map.dragging.enable(); hideHint(); }
  }, {capture:true, passive:true});
  listen('mousedown', () => { map.dragging.enable(); }, {capture:true, passive:true});
  listen('touchstart', event => {
    map.dragging.disable();
    if (event.touches.length === 1) {
      startPoint = [event.touches[0].clientX, event.touches[0].clientY];
      moved = false;
    } else {
      moved = true;
      hideHint();
    }
    // Do not cancel single touches. Leaflet's touchZoom handles two fingers,
    // their moving midpoint (pan), and changing distance (pinch) together.
  }, {capture:true, passive:true});
  listen('touchmove', event => {
    if (event.touches.length !== 1) { moved = true; hideHint(); return; }
    const touch = event.touches[0];
    if (startPoint && Math.hypot(touch.clientX-startPoint[0], touch.clientY-startPoint[1]) > 10) {
      moved = true;
      showHint('Use two fingers to move and zoom the map');
    }
  }, {capture:true, passive:true});
  const finishTouch = event => {
    if (moved) suppressClickUntil = Date.now() + 400;
    if (!event.touches?.length) { startPoint = null; moved = false; }
    hideHint();
  };
  listen('touchend', finishTouch, {capture:true, passive:true});
  listen('touchcancel', finishTouch, {capture:true, passive:true});
  listen('click', event => {
    if (Date.now() < suppressClickUntil && !event.target.closest?.('.leaflet-control')) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
  const cleanup = () => {
    hideHint();
    listeners.forEach(args => container.removeEventListener(...args));
    hint.remove();
    container.classList.remove('cooperative-map');
  };
  map.once('unload', cleanup);
  return cleanup;
}
