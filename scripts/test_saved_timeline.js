const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

// Exercise the actual timeline function without loading external map services.
const source = fs.readFileSync('frontend/platform.js', 'utf8');
const timeline = source.slice(source.indexOf('function renderTimeline(){'), source.indexOf('function renderSources()'));
const elements = {
  'forecast-time-label': {},
  timeline: { innerHTML: '', querySelectorAll() { return buttons; } },
};
const buttons = [0, 1, 2, 3].map(h => ({ dataset: { hour: String(h) } }));
const state = { hour: 2, demoMode: true, savedMinute: 0,
  savedManifest: { snapshots: [{ lead_minutes: 0 }, { lead_minutes: 120 }] } };
const calls = [];
const context = vm.createContext({ state, $: id => elements[id],
  showSavedLead: minute => calls.push(minute),
  scheduleVisibleRoadExposure: () => calls.push('demo'),
  renderForecast: () => calls.push('point') });
vm.runInContext(timeline, context);
vm.runInContext('renderTimeline()', context);
assert.match(elements.timeline.innerHTML, /data-hour="1" disabled/);
assert.match(elements.timeline.innerHTML, /data-hour="3" disabled/);
assert.doesNotMatch(elements.timeline.innerHTML, /data-hour="2" disabled/);
assert.equal(elements['forecast-time-label'].textContent, 'Saved T+0 min');
buttons[2].onclick();
assert.deepEqual(calls, [120]);
state.savedManifest = null;
vm.runInContext('renderTimeline()', context);
assert.doesNotMatch(elements.timeline.innerHTML, /disabled/);
buttons[1].onclick();
assert.equal(state.hour, 1);
assert.deepEqual(calls, [120, 'demo']);
state.demoMode = false;
buttons[0].onclick();
assert.equal(calls.at(-1), 'point');
console.log('Saved timeline availability, lead selection and mode restoration passed.');
