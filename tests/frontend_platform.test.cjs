const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

// Exercise application handlers with isolated DOM/network doubles. No public
// services, real location permissions, or municipal writes are needed.
function app() {
  const nodes = new Map();
  const node = id => {
    if (!nodes.has(id)) nodes.set(id, {innerHTML:'',textContent:'',value:'',hidden:false,disabled:false,querySelectorAll:()=>[],setAttribute(){}});
    return nodes.get(id);
  };
  const context = vm.createContext({window:{}, location:{origin:'https://flood.example'}, document:{getElementById:node}, URLSearchParams, AbortController, setTimeout, clearTimeout, fetch:async()=>{throw Error('offline');}});
  const source = fs.readFileSync('frontend/platform.js','utf8');
  vm.runInContext(source.slice(0,source.indexOf('renderTimeline();renderSources();initMap();navigate();')),context);
  return {node,context,run:code=>vm.runInContext(code,context)};
}
test('missing depth is unavailable and API stays on deployment origin',()=>{
  const a=app();assert.equal(a.run('API_BASE'),'https://flood.example');
  for(const value of ['null','undefined','NaN','"5"'])assert.equal(a.run(`depthRisk(${value})`),'Unavailable');
  assert.equal(a.run('depthRisk(4)'),'Low');assert.equal(a.run('depthRisk(40)'),'Critical');
});
test('unvalidated point forecasts never display numerical water depth',()=>{
  const a=app();a.run(`state.forecast={location:{lat:19.01,lon:72.84},terrain:{dem_status:'REAL_DEM'},data_provenance:{weather_input:'REAL_FORECAST'},forecast:[{hour:0,water_depth_cm:17.3}]};renderForecast()`);
  assert.match(a.node('location-details').innerHTML,/Not Available/);assert.doesNotMatch(a.node('location-details').innerHTML,/17.3 cm/);
});
test('validated route assessment presents the safest route and its evaluated depth',()=>{
  const a=app();a.run(`state.routeData={prediction_valid:true,safe_route_available:true,routes:[{id:'one',name:'Test road',distance_km:2,estimated_duration_min:5,risk_category:'SAFE',max_water_depth_cm:4.2,is_recommended:true}]};state.selected='one';renderRoutes()`);
  assert.match(a.node('route-message').textContent,/Flood-safe route assessment complete/);assert.match(a.node('route-options').innerHTML,/Shortest &amp; Safest route/);assert.match(a.node('route-options').innerHTML,/4.2 cm/);
});
test('empty route response is an explicit empty state',()=>{
  const a=app();a.run('state.routeData={routes:[]};renderRoutes()');assert.match(a.node('route-message').textContent,/No road options/);
});

test('three options distinguish shortest, safest and safe alternative',()=>{
  const a=app();a.run(`state.routeData={prediction_valid:true,safe_route_available:true,routes:[
    {id:'short',distance_km:1,estimated_duration_min:3,risk_category:'DANGER'},
    {id:'safe',distance_km:2,estimated_duration_min:6,risk_category:'SAFE',is_recommended:true},
    {id:'third',distance_km:3,estimated_duration_min:8,risk_category:'SAFE'}]};renderRoutes()`);
  assert.match(a.node('route-options').innerHTML,/Shortest road option/);
  assert.match(a.node('route-options').innerHTML,/Safest recommended route/);
  assert.match(a.node('route-options').innerHTML,/Safe alternative/);
  assert.doesNotMatch(a.node('route-options').innerHTML,/Shortest & Safest/);
  assert.match(a.node('route-message').textContent,/Compare 3 road options/);
});

test('missing flood assessment never labels shortest as safest',()=>{
  const a=app();a.run(`state.routeData={prediction_valid:false,routes:[{id:'one',distance_km:1,is_recommended:true,risk_category:'SAFE'}]};renderRoutes()`);
  assert.match(a.node('route-options').innerHTML,/Shortest road option/);
  assert.doesNotMatch(a.node('route-options').innerHTML,/Safest/);
  assert.match(a.node('route-message').textContent,/Only one distinct road route/);
});

test('background forecast and time changes keep location details closed until requested',()=>{
  const a=app();
  a.run(`state.forecast={location:{lat:19.01,lon:72.84},forecast:[]};renderForecast()`);
  assert.equal(a.node('location-details').hidden,true);
  a.run(`state.forecastDetailsOpen=true;renderForecast()`);
  assert.equal(a.node('location-details').hidden,false);
  a.node('close-details').onclick();
  a.run(`state.hour=2;renderForecast()`);
  assert.equal(a.node('location-details').hidden,true);
});

test('selected road preserves bends without Leaflet simplification',()=>{
  const a=app(),drawn=[];
  a.context.L={polyline:(coords,options)=>{drawn.push({coords,options});return {addTo(){return this},bindPopup(){return this}}},marker:()=>({addTo(){}}),divIcon:x=>x};
  a.run(`state.map={};state.selected='one';state.routeData={routes:[{id:'one',geometry_source:'OSRM_ROAD_NETWORK',coordinates:[[19,72],[19.001,72],[19.001,72.001]],steps:[{type:'roundabout',exit:2,road_name:'Circle Road',distance_m:50}]}]};renderRoutes()`);
  assert.equal(drawn.length,2);
  assert.equal(drawn[1].coords.length,3);
  assert.equal(drawn[1].options.smoothFactor,0);
  assert.doesNotMatch(a.node('route-options').innerHTML,/Road-by-road directions|Circle Road/);
  a.run(`state.routeData.routes[0].coordinates=[[19,72],null,[19.001,72.001]];renderRoutes()`);
  assert.equal(drawn.length,2);
  assert.match(a.node('route-message').textContent,/Complete road geometry is unavailable/);
});

test('numbered route options switch selection without written directions',()=>{
  const a=app();
  a.run(`state.routeData={routes:[{id:'a',steps:[{type:'turn',modifier:'left',road_name:'First Road'}]},{id:'b',steps:[{type:'turn',modifier:'right',road_name:'<Second Road>'}]}]};state.selected='a';renderRoutes()`);
  assert.match(a.node('route-options').innerHTML,/<b>Route 1<\/b>/);
  assert.match(a.node('route-options').innerHTML,/<b>Route 2<\/b>/);
  a.run(`state.selected='b';renderRoutes()`);
  assert.doesNotMatch(a.node('route-options').innerHTML,/Turn left onto First Road/);
  assert.match(a.node('route-options').innerHTML,/data-route-id="b" aria-pressed="true"/);
  assert.doesNotMatch(a.node('route-options').innerHTML,/Second Road|Road-by-road directions/);
});
test('failed route search clears previous options and re-enables search',async()=>{
  const a=app();a.node('origin').value='Hindmata';a.node('destination').value='Kurla';a.run('state.routeData={routes:[{id:"old"}]}');
  await a.run('findRoute()');assert.equal(a.run('state.routeData'),null);assert.equal(a.node('find-route').disabled,false);assert.match(a.node('route-message').textContent,/offline/);
});
test('older in-flight route response cannot overwrite latest journey',async()=>{
  const a=app();const pending=[];a.context.fetch=()=>new Promise(resolve=>pending.push(resolve));a.node('origin').value='Hindmata';a.node('destination').value='Kurla';
  const first=a.run('findRoute()');a.node('destination').value='Sion';const second=a.run('findRoute()');
  pending[1]({ok:true,json:async()=>({routes:[],journey:'new'})});await second;
  pending[0]({ok:true,json:async()=>({routes:[],journey:'old'})});await first;
  assert.equal(a.run('state.routeData.journey'),'new');
});
