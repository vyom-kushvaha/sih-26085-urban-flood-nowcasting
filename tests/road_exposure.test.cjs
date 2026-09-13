const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

test('visible road overlay reports coverage and preserves unverified status',async()=>{
  const nodes=new Map(),styles=[],legend={innerHTML:''};
  const get=id=>{if(!nodes.has(id))nodes.set(id,{textContent:''});return nodes.get(id);};
  const data={type:'FeatureCollection',features:[{type:'Feature',geometry:{type:'LineString',coordinates:[[72.84,19],[72.85,19.01]]},properties:{name:'Test Road',category:'BLUE',color:'#2563eb',classification_basis:'LIVE_RAINFALL_SCREENING',rainfall_mm_hr:2,safe_route_certified:false}}],metadata:{road_count:1,weather_coverage_pct:100,terrain_model_coverage_pct:0,verified_observation_road_count:0,category_counts:{RED:0,ORANGE:0}}};
  const context=vm.createContext({$:get,esc:String,clearTimeout,setTimeout,URLSearchParams,document:{querySelector:()=>legend},
    api:async()=>data,state:{exposureRequest:0,map:{getZoom:()=>15,getBounds:()=>({getWest:()=>72.83,getSouth:()=>19,getEast:()=>72.86,getNorth:()=>19.03})},exposure:{clearLayers(){}}},
    L:{geoJSON:(value,options)=>{styles.push(options.style(value.features[0]));return {addTo(){return this}}}}});
  vm.runInContext(fs.readFileSync('frontend/road-exposure.js','utf8'),context);
  await vm.runInContext('loadVisibleRoadExposure()',context);
  assert.equal(styles[0].color,'#2563eb');
  assert.match(get('nowcast-status').textContent,/1 visible roads screened/);
  assert.match(get('updated').textContent,/Weather 100% · Verified depth 0/);
  assert.match(get('map-message').textContent,/validated terrain is unavailable/);
  assert.match(legend.innerHTML,/LIVE RAINFALL SCREENING/);
});
