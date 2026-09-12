/* R.A.K.S.H.A.K. frontend. Existing APIs only; unavailable services never fabricate results. */
'use strict';
const API_BASE = (window.RAKSHAK_API_BASE || location.origin).replace(/\/$/, '');
const $ = id => document.getElementById(id);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const MUMBAI_DEFAULT = {lat:19.0182,lng:72.8455};
const LOCAL_MAP_ZOOM = 15;
const state = {hour:0,position:null,map:null,routeData:null,selected:null,forecast:null,request:0,forecastRequest:0,forecastDetailsOpen:false,photo:null,reportPosition:null};
const colours = {Low:'#27865d',Moderate:'#d4ad2f',High:'#e47e32',Critical:'#cb4545',Unavailable:'#64748b'};
const hourLabel = h => ['NOW','+1 HOUR','+2 HOURS','+3 HOURS'][h];
const depthRisk = d => !Number.isFinite(d) ? 'Unavailable' : d<=5?'Low':d<=15?'Moderate':d<=30?'High':'Critical';
const withinMumbai = p => p && p.lat>=18.89 && p.lat<=19.30 && p.lng>=72.77 && p.lng<=72.99;
async function api(path){const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),path.includes('/routing/')?60000:20000);try{const response=await fetch(API_BASE+path,{signal:controller.signal});const data=await response.json();if(!response.ok)throw Error(typeof data.detail==='string'?data.detail:'Service unavailable');return data;}finally{clearTimeout(timeout);}}
function nearby(p){if(!state.map)return;state.map.setView([p.lat,p.lng],LOCAL_MAP_ZOOM,{animate:false});}
function initMap(){
  if(typeof L==='undefined'){$('map-message').textContent='Map library unavailable. Check your internet connection and reload.';return;}
  state.map=L.map('map',{zoomControl:false,zoomAnimation:false,fadeAnimation:false,scrollWheelZoom:true,touchZoom:true,bounceAtZoomLimits:false,wheelDebounceTime:80,wheelPxPerZoomLevel:120}).setView([MUMBAI_DEFAULT.lat,MUMBAI_DEFAULT.lng],13);
  installMapGestures(state.map);
  initBasemap();
  L.control.zoom({position:'bottomright'}).addTo(state.map);
  loadMumbaiBoundary();
  state.routes=L.layerGroup().addTo(state.map);state.markers=L.layerGroup().addTo(state.map);
  state.map.on('click',e=>loadForecast(e.latlng));
  nearby(MUMBAI_DEFAULT);
}
async function loadMumbaiBoundary(){
  try{
    const response=await fetch('/static/mumbai-boundary.geojson');
    if(!response.ok)throw Error('Boundary unavailable');
    const feature=await response.json();
    const boundaryPane=state.map.createPane('cityBoundary');boundaryPane.style.zIndex=390;boundaryPane.style.pointerEvents='none';
    L.geoJSON(feature,{pane:'cityBoundary',interactive:false,style:{color:'#7194b3',weight:1,opacity:.6,fill:false,smoothFactor:0}}).addTo(state.map);
    state.map.attributionControl.addAttribution('<a href="https://github.com/sanjanakrishnan/mumbai_spatial_data">Mumbai boundary: Sanjana Krishnan</a> (CC BY 4.0)');
  }catch(e){$('map-message').textContent='Mumbai boundary unavailable. The basemap is still available.';}
}
function initBasemap(){
  let vector,loadTimeout,fallbackActive=false;
  const fallback=()=>{
    if(fallbackActive)return;fallbackActive=true;clearTimeout(loadTimeout);
    if(vector)state.map.removeLayer(vector);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,className:'fallback-basemap',attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(state.map);
    $('map-message').textContent='Light basemap unavailable. Showing the standard street map.';
  };
  try{
    if(typeof L.maplibreGL!=='function')return fallback();
    vector=L.maplibreGL({style:'/static/light-map-style.json?v=1',interactive:false,attribution:'<a href="https://openfreemap.org/">OpenFreeMap</a> · © <a href="https://openmaptiles.org/">OpenMapTiles</a> · © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(state.map);
    state.map.setMaxZoom(19);
    loadTimeout=setTimeout(fallback,20000);
    vector.getMaplibreMap().once('load',()=>clearTimeout(loadTimeout));
    state.map.once('unload',()=>clearTimeout(loadTimeout));
  }catch(e){fallback();}
}
function useLocation(forReport=false){
  const message=forReport?$('report-location'):$('map-message');
  if(!navigator.geolocation){message.textContent='Location is not supported on this device.';return;}
  message.textContent='Locating your device…';
  navigator.geolocation.getCurrentPosition(pos=>{
    const p={lat:pos.coords.latitude,lng:pos.coords.longitude};
    if(forReport){state.reportPosition=p;message.textContent=`${p.lat.toFixed(5)}, ${p.lng.toFixed(5)} · accuracy ±${Math.round(pos.coords.accuracy)} m`;return;}
    state.position=p;updatePosition();
    if(!withinMumbai(p)){nearby(MUMBAI_DEFAULT);$('origin').value='Hindmata, Mumbai';message.textContent='Your device is outside Mumbai coverage. Showing the default Mumbai area instead.';loadForecast(MUMBAI_DEFAULT);return;}
    nearby(p);$('origin').value='Current Location';
    message.textContent=withinMumbai(p)?'Your location · Nearby 3 km view':'Your location · Flood coverage is currently limited to Mumbai.';
    loadForecast(p);
  },()=>{message.textContent='Location unavailable. Allow location access or enter your starting point.';},{enableHighAccuracy:true,timeout:12000,maximumAge:30000});
}
function updatePosition(){if(!state.map||!state.position)return;if(state.userMarker)state.userMarker.setLatLng(state.position);else state.userMarker=L.marker(state.position,{icon:L.divIcon({className:'',html:'<div class="current-dot"></div>',iconSize:[16,16],iconAnchor:[8,8]})}).addTo(state.map).bindPopup('Your current location');}
function showMumbaiDefault(){nearby(MUMBAI_DEFAULT);loadForecast(MUMBAI_DEFAULT,false);$('origin').value='Hindmata, Mumbai';$('destination').value='Dadar, Mumbai';$('map-message').textContent='Showing the default Mumbai flood-routing area.';findRoute();}
function renderTimeline(){$('forecast-time-label').textContent=state.hour===0?'Now':`In ${state.hour} ${state.hour===1?'hour':'hours'}`;$('timeline').innerHTML=[0,1,2,3].map(h=>`<button type="button" data-hour="${h}" aria-label="${h===0?'Current forecast':`Forecast in ${h} ${h===1?'hour':'hours'}`}" aria-pressed="${state.hour===h}">${h===0?'Now':`+${h} ${h===1?'hour':'hours'}`}</button>`).join('');$('timeline').querySelectorAll('button').forEach(b=>b.onclick=()=>{state.hour=Number(b.dataset.hour);renderTimeline();renderForecast();});}
function renderSources(){const p=state.forecast?.data_provenance;$('sources').innerHTML=[['Rainfall source',p?.weather_source],['Terrain source',state.forecast?.terrain?.dem_status],['Drainage source',p?.drainage],['Last updated',null],['Model status','Prototype · spatial validation pending'],['Selected forecast',hourLabel(state.hour)]].map(([k,v])=>`<dt>${esc(k)}</dt><dd>${esc(v||'Not Available')}</dd>`).join('');}
async function loadForecast(p, reveal=true){
  state.forecastDetailsOpen=reveal;
  const request=++state.forecastRequest;state.forecast=null;renderSources();
  if(!withinMumbai(p)){$('location-details').hidden=true;return;}
  $('location-details').hidden=!state.forecastDetailsOpen;$('location-details').textContent='Loading selected location…';
  try{const data=await api(`/api/v1/risk/forecast?lat=${p.lat}&lon=${p.lng}&horizon_hours=3`);if(request!==state.forecastRequest)return;state.forecast=data;renderForecast();}
  catch(e){if(request!==state.forecastRequest)return;$('location-details').textContent='Forecast unavailable. '+e.message;}
}
function renderForecast(){
  renderSources();const f=state.forecast;if(!f)return;const step=f.forecast?.find(s=>s.hour===state.hour);
  const valid=f.terrain?.dem_status==='VALIDATED_HIGH_RES_DTM'&&f.data_provenance?.weather_input==='REAL_FORECAST';
  const depth=valid&&Number.isFinite(step?.water_depth_cm)?step.water_depth_cm:null;
  $('location-details').hidden=!state.forecastDetailsOpen;$('location-details').innerHTML=`<button aria-label="Close location details" id="close-details">×</button><div class="eyebrow">SELECTED LOCATION</div><h3>${esc(f.location?.lat?.toFixed(4))}, ${esc(f.location?.lon?.toFixed(4))}</h3><p>Water depth: <b>${depth===null?'Not Available':esc(depth)+' cm'}</b></p><p>Risk: ${depthRisk(depth)}<br>Forecast: ${hourLabel(state.hour)}</p><small>${valid?'Point estimate; road-wide coverage unavailable.':'Terrain validation pending. No flood assessment available.'}</small>`;
  $('close-details').onclick=()=>{state.forecastDetailsOpen=false;$('location-details').hidden=true;};
}
async function findRoute(event){
  $('route-message').hidden=false;
  event?.preventDefault();const origin=$('origin').value.trim(),destination=$('destination').value.trim();if(!origin||!destination){$('route-message').textContent='Enter both a starting point and destination.';return;}
  const request=++state.request;$('find-route').disabled=true;$('route-message').textContent='Finding road options…';state.routeData=null;state.selected=null;renderRoutes();
  const query=new URLSearchParams({origin,destination});if(origin==='Current Location'){if(!state.position){$('route-message').textContent='Use My Location first, or enter a starting point.';$('find-route').disabled=false;return;}query.set('origin_lat',state.position.lat);query.set('origin_lon',state.position.lng);}
  try{const data=await api('/api/v1/routing/safe-route?'+query);if(request!==state.request)return;state.routeData=data;state.selected=data.routes?.find(r=>r.is_recommended)?.id||data.routes?.[0]?.id;renderRoutes();}
  catch(e){if(request!==state.request)return;$('route-message').textContent='Route unavailable. '+e.message;}
  finally{if(request===state.request)$('find-route').disabled=false;}
}
function renderRoutes(){
  state.routes?.clearLayers();state.markers?.clearLayers();const data=state.routeData;$('route-options').innerHTML='';
  if(!data)return;
  const assessed=data.prediction_valid===true;
  if(assessed&&data.safe_route_available)$('route-message').textContent='Flood-safe route assessment complete. The recommended corridor has the lowest evaluated flood exposure.';
  else if(assessed)$('route-message').textContent=data.no_safe_route_warning||'No fully safe route is available right now. The recommended corridor has the lowest evaluated hazard.';
  else $('route-message').textContent=data.no_safe_route_warning||'Flood-safety assessment is unavailable; showing road geometry only.';
  const routes=(data.routes||[]).slice(0,3);if(!routes.length){$('route-message').textContent='No road options returned for this journey.';return;}const fastest=[...routes].sort((a,b)=>a.estimated_duration_min-b.estimated_duration_min)[0];
  const shortest=[...routes].sort((a,b)=>a.distance_km-b.distance_km||a.estimated_duration_min-b.estimated_duration_min)[0];
  $('route-message').textContent+=routes.length===1?' Only one distinct road route is available for this journey.':` Compare ${routes.length} road options below. Shortest means shortest among these options.`;
  $('route-options').innerHTML=routes.map((r,i)=>{const label=routeOptionLabel(r,{assessed,shortestId:shortest?.id,fastestId:fastest?.id,index:i});const details=assessed?`Risk: ${esc(r.risk_category||r.risk_level||'Not Available')} · Max depth: ${Number.isFinite(r.max_water_depth_cm)?esc(r.max_water_depth_cm)+' cm':'—'}<br>${esc(r.recommendation_reason||r.reason||'Flood evaluation complete.')}`:'Risk: Not Available · Max depth: —';return `<button class="route-option ${r.id===state.selected?'selected':''}" data-route-id="${esc(r.id)}" aria-pressed="${r.id===state.selected}"><b>Route ${i+1}</b><small>${esc(label)}<br>${esc(r.distance_km)} km · ${esc(r.estimated_duration_min)} min<br>${details}</small></button>`;}).join('');
  $('route-options').querySelectorAll('button').forEach(b=>b.onclick=()=>{state.selected=b.dataset.routeId;renderRoutes();});
  const selected=routes.find(r=>r.id===state.selected);if(!selected)return;
  if(!state.map)return;
  if(!String(selected.geometry_source||'').endsWith('ROAD_NETWORK')){$('route-message').textContent='No driving route is needed for this selection.';return;}
  const coords=selected.coordinates||[];
  // Dropping a bad vertex would connect its neighbours across an unknown gap.
  if(coords.length<2||!coords.every(p=>Array.isArray(p)&&p.length===2&&p.every(Number.isFinite)&&Math.abs(p[0])<=90&&Math.abs(p[1])<=180)){$('route-message').textContent='Complete road geometry is unavailable. Please recalculate the route.';return;}
  if(coords.length){const routeColour=assessed&&colours[riskDisplayName(selected.risk_category)]?colours[riskDisplayName(selected.risk_category)]:(assessed?selected.color:colours.Unavailable);const popup=assessed?`${esc(selected.risk_category||selected.risk_level||'Evaluated')} · ${esc(selected.max_water_depth_cm)} cm maximum depth`:'Road geometry only. Flood assessment unavailable.';L.polyline(coords,{smoothFactor:0,color:'#ffffff',weight:9,opacity:.95}).addTo(state.routes);L.polyline(coords,{smoothFactor:0,color:routeColour,weight:5,opacity:.9,dashArray:assessed&&selected.stroke_style!=='dashed'?null:'10 5'}).addTo(state.routes).bindPopup(popup);
    [['A',coords[0]],['B',coords[coords.length-1]]].forEach(([label,p])=>L.marker(p,{icon:L.divIcon({className:'',html:`<div class="endpoint">${label}</div>`,iconSize:[26,26],iconAnchor:[13,13]})}).addTo(state.markers));
    state.map.fitBounds(L.latLngBounds(coords),{padding:[48,48],maxZoom:LOCAL_MAP_ZOOM,animate:false});}
}
function routeOptionLabel(route,{assessed,shortestId,fastestId,index}){
  const shortest=route.id===shortestId;
  if(assessed&&route.is_recommended){
    if(route.risk_category==='SAFE')return shortest?'Shortest & Safest route':'Safest recommended route';
    return shortest?'Shortest · Lowest evaluated risk':'Lowest evaluated risk';
  }
  if(shortest)return 'Shortest road option';
  if(assessed&&route.risk_category==='SAFE')return 'Safe alternative';
  if(route.id===fastestId)return 'Fastest road option';
  return 'Alternative route '+(index+1);
}
function routeInstruction(step){
  const road=step.road_name||'Unnamed road',direction=(step.modifier||'').replaceAll('_',' ');
  if(step.type==='depart')return `Start on ${road}`;
  if(step.type==='arrive')return 'Arrive at your destination';
  if(['roundabout','rotary','roundabout turn'].includes(step.type))return `At the roundabout, ${step.exit?`take exit ${step.exit}`:`continue ${direction}`.trim()} onto ${road}`;
  if(['exit roundabout','exit rotary'].includes(step.type))return `Exit the roundabout onto ${road}`;
  if(step.type==='turn')return `${direction==='uturn'?'Make a U-turn':`Turn ${direction}`} onto ${road}`;
  if(step.type==='fork')return `Keep ${direction} onto ${road}`;
  if(step.type==='merge')return `Merge ${direction} onto ${road}`;
  if(step.type==='off ramp')return `Take the exit ${direction} onto ${road}`;
  if(step.type==='on ramp')return `Take the ramp ${direction} onto ${road}`;
  return `Continue ${direction} on ${road}`;
}
function riskDisplayName(category){return ({SAFE:'Low',MODERATE:'Moderate',DANGER:'Critical'})[category]||category;}
function heading(k,title,description){return `<div class="page-heading"><div><div class="eyebrow">${k}</div><h1>${title}</h1><p>${description}</p></div></div>`;}
function filters(){return '<div class="filters"><label class="field-label">STATE<select id="state-filter"><option>Maharashtra</option><option>Delhi</option><option>Tamil Nadu</option></select></label><label class="field-label">CITY<select id="city-filter"><option>Mumbai</option></select></label></div>';}
function dashboard(municipal=false){
  $('content-page').innerHTML=heading(municipal?'MUNICIPALITY WORKSPACE':'CITY OVERVIEW',municipal?'Municipality Dashboard':'A pulse on the city.',municipal?'Monitor roads, drainage and citizen reports.':'Flood information and official updates, in one place.')+(municipal?'<div class="preview-banner">Interface preview · Authentication is not connected. No official records or publishing access.</div>':'')+filters()+`<div class="panel status-row"><div><small id="city-label">MUMBAI · CURRENT STATUS</small><strong id="city-status">Assessment unavailable</strong></div><div><small>HIGH-RISK AREAS</small><strong>—</strong></div><div><small>LAST UPDATED</small><strong>Not Available</strong></div><a href="#/map" class="small-link">View on Live Map ↗</a></div><div class="columns"><div><div class="panel"><h2>${municipal?'Critical Roads':'High Alert Areas'}</h2><div class="table-head"><span>Location</span><span>Depth</span><span>Risk</span><span>Forecast</span></div><div class="empty">City-wide flood data is not available yet.<br>Areas will appear when validated forecasts are connected.</div></div><div class="panel"><h2>${municipal?'Critical Drainage Locations':'Model Flood Alerts'}</h2><div class="empty">${municipal?'Drainage stress data is not available.':'Model alert feed is not connected.'}</div></div></div><div><div class="panel"><h2>Municipal Notices <span class="badge">OFFICIAL</span></h2><div class="empty">Municipal notice service is not connected.</div>${municipal?'<button class="secondary" id="create-notice">Create notice</button>':''}</div>${municipal?'<div class="panel"><h2>Citizen Reports</h2><div class="empty">Report service is not connected.</div><small>Reported → Verified → Action Taken → Resolved</small><label class="field-label">WARD / AREA<select disabled><option>Ward data unavailable</option></select></label></div>':'<div class="panel"><h2>See something on your street?</h2><p class="muted">Help the municipality understand local conditions.</p><a class="small-link" href="#/report">Report flooding →</a></div>'}</div></div>`;
  $('state-filter').onchange=()=>{const cities={Maharashtra:'Mumbai',Delhi:'New Delhi','Tamil Nadu':'Chennai'};const city=cities[$('state-filter').value];$('city-filter').innerHTML=`<option>${city}</option>`;$('city-label').textContent=city.toUpperCase()+' · CURRENT STATUS';$('city-status').textContent=city==='Mumbai'?'Assessment unavailable':'Coverage unavailable';};
  if(municipal)$('create-notice').onclick=()=>{const section=document.createElement('section');section.className='panel';section.innerHTML='<h2>Create Notice</h2><label class="field-label">Title<input></label><label class="field-label">Location<input></label><label class="field-label">Message<textarea></textarea></label><label class="field-label">Severity<select><option>Advisory</option><option>Warning</option><option>Closure</option></select></label><button disabled class="primary">Publish Notice</button><p class="muted">Publishing requires the municipal authentication and notices service.</p>';$('content-page').append(section);section.scrollIntoView({behavior:'smooth'});};
}
function report(){
  $('content-page').innerHTML='<div class="narrow">'+heading('CITIZEN REPORT','Tell us what you see.','Share a location and photo of the issue on your street.')+'<form id="report-form" class="panel"><h2>Report a local issue</h2><label class="field-label">LOCATION</label><button type="button" class="secondary" id="report-gps">◎ Use Live Location</button><p class="muted" id="report-location">Location has not been selected.</p><label class="field-label">PROBLEM</label><div class="problem-options">'+['Waterlogging','Road Blocked','Drainage Issue','Other'].map((p,i)=>`<label><input type="radio" name="problem" value="${p}" ${i===0?'checked':''}>${p}</label>`).join('')+'</div><label class="field-label" for="report-photo">CAMERA · TAKE LIVE PHOTO</label><input id="report-photo" type="file" accept="image/*" capture="environment"><img id="photo-preview" class="photo-preview" alt="Captured report photo" hidden><label class="field-label" for="report-message">MESSAGE (OPTIONAL)</label><textarea id="report-message" placeholder="Describe what is happening…"></textarea><button type="button" class="secondary" id="save-draft">Save draft on this device</button><button class="primary" disabled>Submit Report</button><p id="report-status" class="muted" role="status">Report submission service is not connected. You can prepare and save a local text draft.</p></form></div>';
  if(state.reportPosition)$('report-location').textContent=`${state.reportPosition.lat}, ${state.reportPosition.lng}`;
  $('report-gps').onclick=()=>useLocation(true);
  $('report-photo').onchange=e=>{const file=e.target.files[0];if(!file)return;if(!file.type.startsWith('image/')||file.size>10*1024*1024){$('report-status').textContent='Choose an image smaller than 10 MB.';return;}if(state.photo)URL.revokeObjectURL(state.photo);state.photo=URL.createObjectURL(file);$('photo-preview').src=state.photo;$('photo-preview').hidden=false;};
  $('save-draft').onclick=()=>{if(!state.reportPosition){$('report-status').textContent='Select your location first.';return;}try{localStorage.setItem('rakshak-report-draft',JSON.stringify({location:state.reportPosition,problem:document.querySelector('[name=problem]:checked').value,message:$('report-message').value}));$('report-status').textContent='Draft saved on this device. Photo is not saved. Report has not been submitted.';}catch{$('report-status').textContent='Device storage is unavailable.';}};
  try{const draft=JSON.parse(localStorage.getItem('rakshak-report-draft')||'null');if(draft){state.reportPosition=draft.location;$('report-location').textContent=`Saved location: ${draft.location.lat}, ${draft.location.lng}`;$('report-message').value=draft.message;document.querySelectorAll('[name=problem]').forEach(e=>e.checked=e.value===draft.problem);}}catch{}
  $('report-form').onsubmit=e=>e.preventDefault();
}
function about(){$('content-page').innerHTML=heading('ABOUT R.A.K.S.H.A.K.','Understand the water. Find a way.','Real-time Assessment &amp; Knowledge System for Hydrological Alerts · SIH 26085')+'<div class="panel"><h2>From rainfall to the road ahead</h2><p class="muted">A platform designed to connect rainfall, terrain and drainage information into local flood forecasts and journey planning. Mumbai is the initial coverage area.</p><div class="flow">'+['Rainfall','Terrain','Surface Water','Drainage Network','Flood Prediction','0–3 Hour Forecast','Flood-Safe Route'].map((p,i)=>`${i?'→':''}<span>${p}</span>`).join('')+'</div></div><div class="panel"><h2>What the platform is being built for</h2><div class="feature-list">'+['Street-level flood prediction','Water-depth estimation','Drainage-aware modelling','0–3 hour forecasting','Flood-aware routing','Municipality monitoring'].map(p=>`<div>↗ ${p}</div>`).join('')+'</div><p class="muted">Current status: prototype. Validated spatial forecasts and municipal services are pending integration. Missing information is shown as unavailable.</p></div>';}
function login(){$('content-page').innerHTML='<div class="narrow">'+heading('OFFICIAL ACCESS','Municipality Portal','A shared workspace for local response teams.')+'<form id="login-form" class="panel"><label class="field-label" for="login-city">CITY</label><select id="login-city"><option>Mumbai</option></select><label class="field-label" for="official-id">OFFICIAL ID</label><input id="official-id" autocomplete="username" placeholder="Enter official ID"><label class="field-label" for="password">PASSWORD</label><input id="password" type="password" autocomplete="current-password" placeholder="Enter password"><button class="primary" disabled>Login</button><p class="muted">Official authentication is not connected yet.</p><a class="small-link" href="#/municipality">Preview dashboard interface →</a></form></div>';$('login-form').onsubmit=e=>e.preventDefault();}
function navigate(){const page=(location.hash||'#/map').replace('#/','');const known=['map','dashboard','report','about','login','municipality'];if(!known.includes(page)){location.hash='#/map';return;}document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.hash==='#/'+page));$('map-page').hidden=page!=='map';$('content-page').hidden=page==='map';if(page==='map'){setTimeout(()=>state.map?.invalidateSize(),0);}else{({dashboard:()=>dashboard(),report,about,login,municipality:()=>dashboard(true)})[page]();}document.title=`R.A.K.S.H.A.K. · ${page==='map'?'Live Map':page[0].toUpperCase()+page.slice(1)}`;}
renderTimeline();renderSources();initMap();navigate();
document.querySelector('.skip').onclick=e=>{e.preventDefault();$('main').focus();};
document.querySelector('.hero-action').onclick=e=>{e.preventDefault();$('route-form').scrollIntoView({behavior:'smooth',block:'center'});$('origin').focus({preventScroll:true});};
window.addEventListener('hashchange',navigate);
$('route-form').onsubmit=findRoute;$('mumbai-default').onclick=showMumbaiDefault;
// Mumbai is deliberately the landing area: this prototype has Mumbai-only flood data.
// Journey options appear only after the user submits the planner.
