/* R.A.K.S.H.A.K. frontend. Existing APIs only; unavailable services never fabricate results. */
'use strict';
const API_BASE = (window.RAKSHAK_API_BASE || location.origin).replace(/\/$/, '');
const $ = id => document.getElementById(id);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const MUMBAI_DEFAULT = {lat:19.10,lng:72.87};
const DEMO_DEFAULT = {lat:19.0434,lng:72.8614};
const LOCAL_MAP_ZOOM = 15;
const CITY_MAP_ZOOM = 11;
const DEMO_MAP_ZOOM = 16;
const state = {hour:2,demoMode:true,position:null,map:null,routeData:null,selected:null,forecast:null,request:0,forecastRequest:0,exposureRequest:0,forecastDetailsOpen:false,photo:null,reportPosition:null};
const colours = {Low:'#27865d',Moderate:'#d4ad2f',High:'#e47e32',Critical:'#cb4545',Unavailable:'#64748b'};
const hourLabel = h => ['NOW','+1 HOUR','+2 HOURS','+3 HOURS'][h];
const depthRisk = d => !Number.isFinite(d) ? 'Unavailable' : d<=5?'Low':d<=15?'Moderate':d<=30?'High':'Critical';
const withinMumbai = p => p && p.lat>=18.89 && p.lat<=19.30 && p.lng>=72.77 && p.lng<=72.99;
const riskDisplayName = category => ({SAFE:'Low',MODERATE:'Moderate',DANGER:'Critical'})[category]||category;
async function api(path,options={}){const controller=new AbortController();const longRunning=path.includes('/routing/')||path.includes('/roads/');const timeout=setTimeout(()=>controller.abort(),longRunning?60000:20000);try{const response=await fetch(API_BASE+path,{...options,signal:controller.signal});const data=await response.json();if(!response.ok)throw Error(typeof data.detail==='string'?data.detail:'Service unavailable');return data;}finally{clearTimeout(timeout);}}
function nearby(p){if(!state.map)return;state.map.setView([p.lat,p.lng],LOCAL_MAP_ZOOM,{animate:false});}
function initMap(){
  if(typeof L==='undefined'){$('map-message').textContent='Map library unavailable. Check your internet connection and reload.';return;}
  state.map=L.map('map',{zoomControl:false,zoomAnimation:false,fadeAnimation:false,preferCanvas:true,scrollWheelZoom:true,touchZoom:true,bounceAtZoomLimits:false,wheelDebounceTime:80,wheelPxPerZoomLevel:120}).setView([DEMO_DEFAULT.lat,DEMO_DEFAULT.lng],DEMO_MAP_ZOOM);
  installMapGestures(state.map);
  initBasemap();
  L.control.zoom({position:'bottomright'}).addTo(state.map);
  loadMumbaiBoundary();
  // Explicit map stack: base → flood/roads → drainage/hotspots → route exposure
  // → alternates → selected route → endpoints → popup.  Routes must never be
  // painted behind road-risk canvas features.
  const exposurePane=state.map.createPane('roadExposure');exposurePane.style.zIndex=405;state.roadRenderer=L.canvas({pane:'roadExposure',padding:.5});
  const routeExposurePane=state.map.createPane('routeExposure');routeExposurePane.style.zIndex=620;routeExposurePane.style.pointerEvents='none';
  const alternateRoutePane=state.map.createPane('routeAlternates');alternateRoutePane.style.zIndex=630;
  const selectedRoutePane=state.map.createPane('routeSelected');selectedRoutePane.style.zIndex=640;
  const routeMarkerPane=state.map.createPane('routeMarkers');routeMarkerPane.style.zIndex=650;
  state.exposure=L.layerGroup().addTo(state.map);state.routes=L.layerGroup().addTo(state.map);state.markers=L.layerGroup().addTo(state.map);
  state.map.on('click',e=>{if(!state.demoMode)loadForecast(e.latlng);});
  state.map.on('moveend zoomend',scheduleVisibleRoadExposure);
  scheduleVisibleRoadExposure();
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
function showMumbaiDefault(){const centre=state.demoMode?DEMO_DEFAULT:MUMBAI_DEFAULT,zoom=state.demoMode?DEMO_MAP_ZOOM:CITY_MAP_ZOOM;state.map?.setView([centre.lat,centre.lng],zoom,{animate:false});$('origin').value='Hindmata, Mumbai';$('destination').value='Dadar, Mumbai';$('map-message').textContent=state.demoMode?'Showing the Sion demo area at street level. Pan or zoom to inspect other Mumbai roads.':'Showing Greater Mumbai live road screening.';scheduleVisibleRoadExposure();}
function renderTimeline(){
  const saved=state.savedManifest;
  $('forecast-time-label').textContent=saved?`Saved T+${state.savedMinute??0} min`:state.hour===0?'Now':`In ${state.hour} ${state.hour===1?'hour':'hours'}`;
  $('timeline').innerHTML=[0,1,2,3].map(h=>{
    const available=!saved||saved.snapshots.some(s=>s.lead_minutes===h*60);
    return `<button type="button" data-hour="${h}" ${available?'':'disabled'} aria-label="${saved?'Saved model':'Forecast'} +${h} hours${available?'':' unavailable'}" aria-pressed="${saved?state.savedMinute===h*60:state.hour===h}">${h===0?(saved?'T+0':'Now'):`+${h} ${h===1?'hour':'hours'}`}</button>`;
  }).join('');
  $('timeline').querySelectorAll('button').forEach(b=>b.onclick=()=>{
    if(state.savedManifest){showSavedLead(Number(b.dataset.hour)*60);return;}
    state.hour=Number(b.dataset.hour);renderTimeline();if(state.demoMode)scheduleVisibleRoadExposure();else renderForecast();
  });
}
function renderSources(){const p=state.forecast?.data_provenance;$('sources').innerHTML=[['Rainfall source',p?.weather_source],['Terrain source',state.forecast?.terrain?.dem_status],['Drainage source',p?.drainage],['Last updated',null],['Model status','Prototype · spatial validation pending'],['Selected forecast',hourLabel(state.hour)]].map(([k,v])=>`<dt>${esc(k)}</dt><dd>${esc(v||'Not Available')}</dd>`).join('');}
async function loadForecast(p, reveal=true){
  if(state.savedManifest)return;
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
  const request=++state.request;$('find-route').disabled=true;$('route-message').textContent='Finding roads, fetching live rainfall and calculating exposure…';state.routeData=null;state.selected=null;renderRoutes();
  const query=new URLSearchParams({origin,destination});if(origin==='Current Location'){if(!state.position){$('route-message').textContent='Use My Location first, or enter a starting point.';$('find-route').disabled=false;return;}query.set('origin_lat',state.position.lat);query.set('origin_lon',state.position.lng);}
  try{const data=await api('/api/v1/routing/safe-route?'+query);if(request!==state.request)return;state.routeData=data;state.selected=data.routes?.find(r=>r.is_recommended)?.id||data.routes?.[0]?.id;if(state.savedManifest)await assessSavedCandidates();else renderRoutes();}
  catch(e){
    if(request!==state.request)return;
    if(state.demoMode){
      $('route-message').textContent='Route calculation: '+e.message+' In demo mode, try the preset demo locations (Hindmata to Dadar).';
    } else {
      $('route-message').textContent='Route unavailable. '+e.message;
    }
  }
  finally{if(request===state.request)$('find-route').disabled=false;}
}
function renderRoutes(){
  state.routes?.clearLayers();state.markers?.clearLayers();const data=state.routeData;$('route-options').innerHTML='';
  if(!data)return;
  if(state.savedManifest){renderSavedRoutes();return;}
  if(data.data_mode==='LIVE_RAINFALL_SCREENING'){renderLiveRoutes(data);return;}
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
  if(coords.length){
    // Render alternates first in their lower pane, then the selected road on
    // the top route pane.  Only verified road-network geometry reaches here.
    for(const route of routes){
      const routeCoords=route.coordinates||[];
      if(!String(route.geometry_source||'').endsWith('ROAD_NETWORK')||!validRoadCoordinates(routeCoords))continue;
      const isSelected=route.id===selected.id;
      const colour=assessed&&colours[riskDisplayName(route.risk_category)]?colours[riskDisplayName(route.risk_category)]:(assessed?route.color:colours.Unavailable);
      const popup=assessed?`${esc(route.risk_category||route.risk_level||'Evaluated')} · ${esc(route.max_water_depth_cm)} cm maximum depth`:'Road geometry only. Flood assessment unavailable.';
      drawRoadRoute(routeCoords,{selected:isSelected,colour,popup,onClick:()=>{if(!isSelected){state.selected=route.id;renderRoutes();}}});
    }
    addRouteEndpoints(coords);
    state.map.fitBounds(L.latLngBounds(coords),{padding:[48,48],maxZoom:LOCAL_MAP_ZOOM,animate:false});}
}
function validRoadCoordinates(coords){return coords.length>=2&&coords.every(p=>Array.isArray(p)&&p.length===2&&p.every(Number.isFinite)&&Math.abs(p[0])<=90&&Math.abs(p[1])<=180);}
function drawRoadRoute(coords,{selected=false,colour=colours.Unavailable,popup='',onClick}={}){
  const pane=selected?'routeSelected':'routeAlternates';
  L.polyline(coords,{pane,smoothFactor:0,lineCap:'round',lineJoin:'round',color:'#ffffff',weight:selected?14:9,opacity:selected?.98:.65,interactive:false}).addTo(state.routes);
  const line=L.polyline(coords,{pane,smoothFactor:0,lineCap:'round',lineJoin:'round',color:colour,weight:selected?8:4,opacity:selected?1:.70,dashArray:null}).addTo(state.routes);
  if(popup)line.bindPopup(popup);
  if(onClick)line.on('click',onClick);
  return line;
}
function drawRouteExposure(coords,colour){return L.polyline(coords,{pane:'routeExposure',smoothFactor:0,lineCap:'round',lineJoin:'round',color:colour,weight:6,opacity:.95,dashArray:null,interactive:false}).addTo(state.routes);}
function addRouteEndpoints(coords){[['A',coords[0]],['B',coords[coords.length-1]]].forEach(([label,p])=>L.marker(p,{pane:'routeMarkers',icon:L.divIcon({className:'',html:`<div class="endpoint">${label}</div>`,iconSize:[26,26],iconAnchor:[13,13]}),zIndexOffset:1000}).addTo(state.markers));}
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
let cameraStream = null;
function stopCameraStream(){
  if(cameraStream){
    cameraStream.getTracks().forEach(track=>track.stop());
    cameraStream=null;
  }
}

function report(){
  stopCameraStream();
  $('content-page').innerHTML='<div class="narrow">'+heading('CITIZEN FLOOD REPORT','Report street-level flooding.','Share real-time observations and live photos with municipal authorities and nowcasting models.')+
    '<form id="report-form" class="panel">'+
      '<h2>Submit Inundation Incident</h2>'+
      '<label class="field-label">INCIDENT LOCATION</label>'+
      '<div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:6px;">'+
        '<button type="button" class="secondary" id="report-gps">◎ Detect My GPS Location</button>'+
        '<button type="button" class="secondary" id="report-default-loc">📍 Select Hindmata, Mumbai</button>'+
      '</div>'+
      '<p class="muted" id="report-location">Location has not been selected.</p>'+
      '<label class="field-label">REPORTED ISSUE / CHOKEPOINT</label>'+
      '<div class="problem-options">'+['Waterlogging','Road Blocked','Drainage Issue','Other'].map((p,i)=>`<label><input type="radio" name="problem" value="${p}" ${i===0?'checked':''}>${p}</label>`).join('')+'</div>'+
      '<label class="field-label" for="report-depth">OBSERVED WATER DEPTH · CM (OPTIONAL)</label>'+
      '<input id="report-depth" type="number" min="0" max="300" step="0.5" placeholder="Example: 15 (above curb) / 35 (wheel submerged)">'+
      '<label class="field-label">LIVE CAMERA PHOTO (PRIVATE &amp; ENCRYPTED)</label>'+
      '<div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">'+
        '<button type="button" class="secondary" id="open-camera-btn">📷 Open Live Camera</button>'+
        '<button type="button" class="secondary" id="browse-photo-btn">📁 Browse Files</button>'+
        '<input id="report-photo" type="file" accept="image/*" capture="environment" style="display:none">'+
      '</div>'+
      '<div id="camera-container" style="display:none; margin-bottom:10px;">'+
        '<video id="camera-feed" autoplay playsinline style="width:100%; max-height:260px; background:#000; border-radius:6px; object-fit:cover; display:block;"></video>'+
        '<div style="margin-top:6px; display:flex; gap:8px;">'+
          '<button type="button" class="primary" id="snap-photo-btn">📸 Capture Photo</button>'+
          '<button type="button" class="secondary" id="cancel-camera-btn">Cancel</button>'+
        '</div>'+
      '</div>'+
      '<img id="photo-preview" class="photo-preview" alt="Captured report photo" style="max-width:100%; border-radius:6px; margin-bottom:10px;" hidden>'+
      '<label class="field-label" for="report-message">OBSERVATION DETAILS (OPTIONAL)</label>'+
      '<textarea id="report-message" placeholder="Describe road status, vehicle stall risk, drain overflow, landmarks…"></textarea>'+
      '<div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:12px;">'+
        '<button type="button" class="secondary" id="save-draft">Save Draft Locally</button>'+
        '<button id="submit-report" class="primary">Submit Verified Report</button>'+
      '</div>'+
      '<p id="report-status" class="muted" role="status" style="margin-top:10px;">Submitted reports are cryptographically validated, geotagged, and reviewed by municipal authorities. Photos are resized and stored privately.</p>'+
    '</form></div>';

  if(state.reportPosition)$('report-location').textContent=`${state.reportPosition.lat.toFixed(5)}, ${state.reportPosition.lng.toFixed(5)}`;
  $('report-gps').onclick=()=>useLocation(true);
  $('report-default-loc').onclick=()=>{
    state.reportPosition = {lat: 19.0178, lng: 72.8478};
    $('report-location').textContent = 'Selected: Hindmata Junction (19.01780, 72.84780)';
  };

  // Camera handling
  const cameraContainer = $('camera-container');
  const cameraFeed = $('camera-feed');
  const snapBtn = $('snap-photo-btn');
  const cancelBtn = $('cancel-camera-btn');
  const photoInput = $('report-photo');
  const preview = $('photo-preview');

  $('browse-photo-btn').onclick = () => photoInput.click();

  $('open-camera-btn').onclick = async () => {
    if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
      photoInput.click();
      return;
    }
    try {
      stopCameraStream();
      cameraStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      cameraFeed.srcObject = cameraStream;
      cameraContainer.style.display = 'block';
      preview.hidden = true;
    } catch(err) {
      photoInput.click();
    }
  };

  cancelBtn.onclick = () => {
    stopCameraStream();
    cameraContainer.style.display = 'none';
  };

  snapBtn.onclick = () => {
    if(!cameraStream) return;
    const canvas = document.createElement('canvas');
    canvas.width = cameraFeed.videoWidth || 640;
    canvas.height = cameraFeed.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(cameraFeed, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
      if(!blob) return;
      const file = new File([blob], 'captured_report.jpg', {type: 'image/jpeg'});
      const dt = new DataTransfer();
      dt.items.add(file);
      photoInput.files = dt.files;
      if(state.photo) URL.revokeObjectURL(state.photo);
      state.photo = URL.createObjectURL(blob);
      preview.src = state.photo;
      preview.hidden = false;
      stopCameraStream();
      cameraContainer.style.display = 'none';
    }, 'image/jpeg', 0.85);
  };

  photoInput.onchange = e => {
    const file = e.target.files[0];
    if(!file) return;
    if(!file.type.startsWith('image/') || file.size > 10 * 1024 * 1024){
      $('report-status').textContent = 'Choose an image smaller than 10 MB.';
      return;
    }
    if(state.photo) URL.revokeObjectURL(state.photo);
    state.photo = URL.createObjectURL(file);
    preview.src = state.photo;
    preview.hidden = false;
  };

  $('save-draft').onclick = () => {
    if(!state.reportPosition){
      $('report-status').textContent = 'Select your location first.';
      return;
    }
    try {
      localStorage.setItem('rakshak-report-draft', JSON.stringify({
        location: state.reportPosition,
        problem: document.querySelector('[name=problem]:checked').value,
        message: $('report-message').value
      }));
      $('report-status').textContent = 'Draft saved on this device. Report has not yet been submitted.';
    } catch {
      $('report-status').textContent = 'Device storage is unavailable.';
    }
  };

  try {
    const draft = JSON.parse(localStorage.getItem('rakshak-report-draft') || 'null');
    if(draft){
      state.reportPosition = draft.location;
      $('report-location').textContent = `Saved location: ${draft.location.lat.toFixed(5)}, ${draft.location.lng.toFixed(5)}`;
      $('report-message').value = draft.message || '';
      document.querySelectorAll('[name=problem]').forEach(e => e.checked = (e.value === draft.problem));
    }
  } catch{}

  $('report-form').onsubmit = async e => {
    e.preventDefault();
    const form = e.target, status = $('report-status'), button = $('submit-report');
    if(!state.reportPosition){
      status.textContent = 'Please select or detect your location before submitting.';
      return;
    }
    const problem = document.querySelector('[name=problem]:checked').value, rawDepth = $('report-depth').value;
    const payload = {lat: state.reportPosition.lat, lon: state.reportPosition.lng, problem, message: $('report-message').value};
    if(rawDepth !== '' && problem === 'Waterlogging') payload.water_depth_cm = Number(rawDepth);
    const file = photoInput.files[0];
    button.disabled = true;
    status.textContent = 'Processing, compressing image and submitting report…';
    try {
      payload.photo = await prepareReportPhoto(file);
      const saved = await api('/api/v1/reports', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)});
      try { localStorage.removeItem('rakshak-report-draft'); } catch{}
      status.textContent = `✅ Report successfully received · ID: ${saved.id}. Municipal triage is pending.${saved.photo_available ? ' Attached photo stored securely.' : ''}`;
      form.reset();
      state.reportPosition = null;
      if(state.photo){ URL.revokeObjectURL(state.photo); state.photo = null; }
      if($('report-location')) $('report-location').textContent = 'Location has not been selected.';
      if(preview) preview.hidden = true;
    } catch(error){
      status.textContent = 'Report submission failed: ' + error.message;
    } finally {
      button.disabled = false;
    }
  };
}

function about(){
  $('content-page').innerHTML = heading('ABOUT R.A.K.S.H.A.K.','Real-Time Urban Flood Nowcasting &amp; Safe Journey System','SIH 26085 · Intelligent Decision Support for Resilient Urban Mobility')+
    '<div class="panel">'+
      '<h2>Mission &amp; Overview</h2>'+
      '<p><b>R.A.K.S.H.A.K.</b> (Real-time Assessment &amp; Knowledge System for Hydrological Alerts &amp; Kinematics) is an advanced urban flood nowcasting and journey hazard evaluation platform engineered for the Mumbai metropolitan region. The system bridges satellite meteorology, high-resolution terrain modeling, and street-level drainage networks to deliver 0–3 hour inundation forecasts and flood-safe routing.</p>'+
      '<div class="flow">'+['Numerical Rainfall Nowcasting','DEM Terrain Infiltration','Stormwater Drainage Graph','Hydrodynamic Risk Engine','0–3h Nowcast Grid','Flood-Aware Routing'].map((p,i)=>`${i?'→':''}<span>${p}</span>`).join('')+'</div>'+
    '</div>'+
    '<div class="panel">'+
      '<h2>Core Capabilities</h2>'+
      '<div class="feature-list">'+
        '<div>↗ <b>Dynamic Flood-Aware Routing:</b> Avoids known depression basins (Hindmata, Sion Underpass, Kurla LBS, Milan Subway) and guides drivers through elevated ridges and flyovers.</div>'+
        '<div>↗ <b>Physical Hydrology Engine:</b> Calculates water depth accumulation (0–100 cm) based on rainfall intensity, slope deficit, and stormwater pipe blockage percentages.</div>'+
        '<div>↗ <b>Color-Coded Passability Rules:</b> Green (≤10 cm: Passable), Orange (10–30 cm: Risky), and Red (>30 cm: Impassable / Blocked).</div>'+
        '<div>↗ <b>Municipal Incident Console:</b> Enables disaster response authorities to review citizen reports, verify water depth, and broadcast public emergency notices.</div>'+
        '<div>↗ <b>Offline Road Graph Resilience:</b> Fallback local road network ensures routing never fails even during severe external network outages.</div>'+
      '</div>'+
    '</div>'+
    '<div class="panel">'+
      '<h2>Data Integrity &amp; Transparency</h2>'+
      '<p class="muted">This platform clearly distinguishes between <b>Live Meteorological Screening</b> (Open-Meteo &amp; MET Norway models), <b>Coupled Hydrodynamic Simulation</b>, and <b>Illustrative Demonstration Scenarios</b>. Green road indication denotes low evaluated inundation hazard within modeled boundaries, not an absolute legal safety warranty.</p>'+
      '<small>SIH Problem Statement 26085 · Built for Mumbai Metropolitan Region.</small>'+
    '</div>';
}

function login(){renderMunicipalLogin();}
function navigate(){stopCameraStream();civicGeneration++;clearPrivatePhotos();const page=(location.hash||'#/map').replace('#/','');const known=['map','dashboard','report','about','login','municipality'];if(!known.includes(page)){location.hash='#/map';return;}document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.hash==='#/'+page));$('map-page').hidden=page!=='map';$('content-page').hidden=page==='map';if(page==='map'){setTimeout(()=>state.map?.invalidateSize(),0);}else{({dashboard:()=>dashboard(),report,about,login,municipality:()=>dashboard(true)})[page]();}document.title=`R.A.K.S.H.A.K. · ${page==='map'?'Live Map':page[0].toUpperCase()+page.slice(1)}`;}
renderTimeline();renderSources();initMap();navigate();
document.querySelector('.skip').onclick=e=>{e.preventDefault();$('main').focus();};
document.querySelector('.hero-action').onclick=e=>{e.preventDefault();$('route-form').scrollIntoView({behavior:'smooth',block:'center'});$('origin').focus({preventScroll:true});};
window.addEventListener('hashchange',navigate);
$('route-form').onsubmit=findRoute;$('mumbai-default').onclick=showMumbaiDefault;
$('mode-demo').onclick=()=>setMapMode(true);$('mode-live').onclick=()=>setMapMode(false);

