const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

test('live map draws every candidate and exposes rainfall rather than flood safety',()=>{
  const nodes=new Map(),drawn=[];
  const get=id=>{if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',querySelectorAll:()=>[]});return nodes.get(id);};
  const context=vm.createContext({$:get,esc:String,document:{querySelector:()=>null},LOCAL_MAP_ZOOM:15,
    state:{selected:'a',map:{fitBounds(){}},routes:{},markers:{}},
    L:{polyline:(coords,options)=>{drawn.push({coords,options});return {addTo(){return this},bindPopup(){return this},on(){return this}}},
       marker:()=>({addTo(){}}),divIcon:x=>x,latLngBounds:x=>x}});
  vm.runInContext(fs.readFileSync('frontend/live-routes.js','utf8'),context);
  const routes=['a','b'].map((id,i)=>({id,coordinates:[[19,72.84],[19.01,72.85]],geometry_source:'OSRM_ROAD_NETWORK',
    screening_label:i?'Higher modeled flood exposure':'Lower modeled flood exposure',is_lowest_exposure:!i,
    distance_km:1,estimated_duration_min:3,mean_rainfall_mm_hr:i?30:2,max_rainfall_mm_hr:i?40:4,rainfall_coverage_pct:100}));
  context.data={routes,screening_complete:true,no_safe_route_warning:'Flood safety is unverified',calculation:{sample_count:20,sample_spacing_max_m:100}};
  vm.runInContext('renderLiveRoutes(data)',context);
  assert.equal(drawn.length,4);
  assert.equal(drawn[3].options.color,'#2563eb');
  assert.match(get('route-options').innerHTML,/Flood safety: unverified/);
  assert.match(get('route-options').innerHTML,/Calculation & data sources/);
  context.data.screening_complete=false;
  vm.runInContext('renderLiveRoutes(data)',context);
  assert.equal(drawn[7].options.color,'#64748b');
});

test('selected route renders calculated section depth colours',()=>{
  const nodes=new Map(),drawn=[];
  const get=id=>{if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',querySelectorAll:()=>[]});return nodes.get(id);};
  const context=vm.createContext({$:get,esc:String,document:{querySelector:()=>null},LOCAL_MAP_ZOOM:15,
    state:{selected:'a',map:{fitBounds(){}},routes:{},markers:{}},
    L:{polyline:(coords,options)=>{drawn.push(options);return {addTo(){return this},bindPopup(){return this},on(){return this}}},marker:()=>({addTo(){}}),divIcon:x=>x,latLngBounds:x=>x}});
  vm.runInContext(fs.readFileSync('frontend/live-routes.js','utf8'),context);
  context.data={screening_complete:true,no_safe_route_warning:'Unverified',calculation:{},routes:[{id:'a',coordinates:[[19,72],[19.01,72.01]],geometry_source:'OSRM_ROAD_NETWORK',screening_label:'Only available road option',distance_km:1,estimated_duration_min:3,rainfall_coverage_pct:100,segments:[
    {coordinates:[[19,72],[19.001,72.001]],rainfall_mm_hr:2,estimated_1h_depth_range_cm:[1,4]},
    {coordinates:[[19.001,72.001],[19.002,72.002]],rainfall_mm_hr:8,estimated_1h_depth_range_cm:[3,10]},
    {coordinates:[[19.002,72.002],[19.003,72.003]],rainfall_mm_hr:25,estimated_1h_depth_range_cm:[8,20]}]}]};
  vm.runInContext('renderLiveRoutes(data)',context);
  assert.deepEqual(Array.from(drawn.slice(-3),x=>x.color),['#2563eb','#f59e0b','#dc2626']);
  assert.match(get('route-options').innerHTML,/modeled max depth/);
});

test('missing terrain falls back to live rainfall section colours',()=>{
  const nodes=new Map(),drawn=[],legend={innerHTML:''};
  const get=id=>{if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',querySelectorAll:()=>[]});return nodes.get(id);};
  const context=vm.createContext({$:get,esc:String,document:{querySelector:()=>legend},LOCAL_MAP_ZOOM:15,
    state:{selected:'a',map:{fitBounds(){}},routes:{},markers:{}},L:{polyline:(c,o)=>{drawn.push(o);return {addTo(){return this},bindPopup(){return this},on(){return this}}},marker:()=>({addTo(){}}),divIcon:x=>x,latLngBounds:x=>x}});
  vm.runInContext(fs.readFileSync('frontend/live-routes.js','utf8'),context);
  context.data={comparison_basis:'rainfall exposure',screening_complete:true,no_safe_route_warning:'Unverified',calculation:{},routes:[{id:'a',coordinates:[[19,72],[19.01,72.01]],geometry_source:'OSRM_ROAD_NETWORK',screening_label:'Only available road option',distance_km:1,estimated_duration_min:3,rainfall_coverage_pct:100,terrain_model_coverage_pct:0,segments:[
    {coordinates:[[19,72],[19.001,72.001]],rainfall_mm_hr:2},
    {coordinates:[[19.001,72.001],[19.002,72.002]],rainfall_mm_hr:8},
    {coordinates:[[19.002,72.002],[19.003,72.003]],rainfall_mm_hr:25}]}]};
  vm.runInContext('renderLiveRoutes(data)',context);
  assert.deepEqual(Array.from(drawn.slice(-3),x=>x.color),['#2563eb','#f59e0b','#dc2626']);
  assert.match(legend.innerHTML,/LIVE RAINFALL SCREENING/);
  assert.match(legend.innerHTML,/Terrain model unavailable/);
});
