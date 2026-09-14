'use strict';
// Saved-run layers are independent of the point forecast and route assessment.
let savedRun = null, savedLayer = null, savedGeneration = 0;
let savedLayers = {};
function applySavedVisibility(){
  if(!savedLayer)return;
  document.querySelectorAll('[data-saved-layer]').forEach(control=>{
    const layer=savedLayers[control.dataset.savedLayer];
    if(layer){if(control.checked)savedLayer.addLayer(layer);else savedLayer.removeLayer(layer);}
  });
}
function clearSavedForecast(){
  savedGeneration++; savedRun=null;
  state.savedManifest=null;state.savedMinute=null;savedLayers={};
  state.savedHotspots=null;
  state.savedRouteData=null;
  $('saved-priorities').innerHTML='';
  if(savedLayer)state.map?.removeLayer(savedLayer);
  savedLayer=null;
  $('saved-run-timeline').innerHTML='';$('clear-saved-run').hidden=true;
  $('saved-run-status').textContent='Saved forecast layers cleared.';
  $('saved-layer-controls').hidden=true;
  $('mode-demo').setAttribute('aria-selected',String(state.demoMode));
  $('mode-live').setAttribute('aria-selected',String(!state.demoMode));
  $('forecast-help').textContent=state.demoMode?'Timeline controls the illustrative monsoon scenario. Values are simulated and must not guide travel.':'Tap a map location to explore its next 3 hours. Route assessment uses current conditions.';
  renderTimeline();renderSources();renderRoutes();scheduleVisibleRoadExposure();
}
async function showSavedLead(minute, fit=false){
  if(!savedRun)return;
  const generation=++savedGeneration, id=savedRun.run_id;
  const snapshot=savedRun.snapshots.find(s=>s.lead_minutes===minute);
  if(!snapshot)return;
  state.savedMinute=minute;renderTimeline();
  state.savedHotspots=null;state.savedRouteData=null;state.routes?.clearLayers();
  $('saved-priorities').textContent='Loading priorities for this forecast time…';
  $('route-options').innerHTML='';
  if(savedLayer)state.map?.removeLayer(savedLayer);savedLayer=null;
  $('saved-run-status').textContent=`Loading saved T+${minute} min…`;
  try{
    const [depth,drainage,roads,hotspots]=await Promise.all([api(snapshot.layers.depth),api(snapshot.layers.drainage),api(snapshot.layers.roads),api(snapshot.layers.hotspots)]);
    if(generation!==savedGeneration)return;
    if(!state.map||typeof L==='undefined')throw Error('Map is unavailable.');
    const polygons=L.geoJSON(depth,{style:f=>({color:'#003776',weight:.6,fillColor:f.properties.depth_cm>30?'#b33f43':f.properties.depth_cm>5?'#ed963e':'#448dcc',fillOpacity:f.properties.depth_cm>0?.55:.08})});
    polygons.eachLayer(layer=>layer.bindPopup(`Saved model output · T+${minute} min<br>Depth: ${Number(layer.feature.properties.depth_cm).toFixed(2)} cm`));
    const nodes=L.geoJSON(drainage,{pointToLayer:(f,p)=>L.circleMarker(p,{radius:5,color:'#003776',fillColor:'#fff',fillOpacity:1})});
    nodes.eachLayer(layer=>{const p=layer.feature.properties;layer.bindPopup(`${esc(p.id)} · ${esc(p.kind)}<br>Node depth: ${p.depth_m===null?'Boundary node':Number(p.depth_m).toFixed(3)+' m'}<br>Stress: ${esc(p.stress)}<br>Water returned to surface: ${p.exchange_totals?Number(p.exchange_totals.surcharge_returned_m3).toFixed(3)+' m³ since run start':'Not saved'}`);});
    const edges=L.geoJSON(drainage.edges,{style:{color:'#2563eb',weight:2,dashArray:'5 4'},onEachFeature:(f,l)=>l.bindPopup(`${esc(f.properties.id)}<br>${esc(f.properties.upstream)} → ${esc(f.properties.downstream)}<br>${esc(f.properties.geometry_basis)}<br>Flow/capacity utilization: not saved`)});
    const drainageGroup=L.layerGroup([edges,nodes]);
    const peaks=L.geoJSON(hotspots,{pointToLayer:(f,p)=>L.circleMarker(p,{radius:8,color:'#fff',weight:2,fillColor:f.properties.color,fillOpacity:1}),onEachFeature:(f,l)=>l.bindPopup(`${esc(f.properties.name)}<br>Peak model depth: ${Number(f.properties.max_depth_cm).toFixed(1)} cm<br>Affected area: ${Number(f.properties.area_m2).toFixed(0)} m²<br>Saved T+${minute} min · Prototype`)});
    const priorities=L.geoJSON(hotspots.priority_areas,{style:f=>({color:f.properties.color,weight:1,fillOpacity:.12})});
    const streets=L.geoJSON(roads,{style:f=>({color:f.properties.color,weight:5,opacity:.95})});
    streets.eachLayer(layer=>{const p=layer.feature.properties;layer.bindPopup(`${esc(p.name)}<br>Model depth: ${p.depth_cm===null?'Unknown':Number(p.depth_cm).toFixed(1)+' cm'}<br>${esc(p.risk)} · T+${minute} min<br>Prototype model output; passability and official closure status unverified.`);});
    savedLayer=L.layerGroup().addTo(state.map);
    savedLayers={depth:polygons,roads:streets,drainage:drainageGroup,hotspots:peaks,priorities};applySavedVisibility();
    state.savedHotspots=hotspots;
    $('saved-priorities').innerHTML=priorityTable(hotspots);
    $('nowcast-status').textContent=`Saved model · T+${minute} min`;
    $('updated').textContent=`Valid: ${depth.valid_time}`;
    $('sources').innerHTML=[['Selected saved run',id],['Valid model time',depth.valid_time],['Terrain source',depth.terrain_source],['Output quality',depth.output_quality],['Model status','Saved prototype; validation pending']].map(([k,v])=>`<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('');
    $('risk-count').textContent=hotspots.summary.high_risk_clusters;
    $('map-message').textContent='Saved prototype forecast. Candidate routes are compared against this run and time.';
    document.querySelector('.legend').innerHTML='<span class="eyebrow">SAVED MODEL ROAD DEPTH</span><div>Green &lt;5 cm · Amber 5–15 cm · Red &gt;15–30 cm · Dark red &gt;30 cm</div><small>Grey: unknown · Prototype output · No safety certification</small>';
    if(fit&&polygons.getBounds().isValid())state.map.fitBounds(polygons.getBounds(),{padding:[30,30],maxZoom:18});
    $('saved-run-status').textContent=`Saved prototype · T+${minute} min · ${depth.valid_time}. Terrain: ${depth.terrain_source}. Overlay blue/orange/red represents model depth, not route safety.`;
    $('saved-run-timeline').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.minute)===minute)));
    if(state.routeData)assessSavedCandidates();
  }catch(e){if(generation===savedGeneration){$('saved-run-status').textContent='Saved layer unavailable. '+e.message;$('nowcast-status').textContent='Saved layer unavailable';$('updated').textContent='No layer loaded';}}
}
$('saved-run-form').onsubmit=async e=>{
  e.preventDefault();clearSavedForecast();const generation=savedGeneration;
  const id=$('saved-run-id').value.trim();
  if(!/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id)){$('saved-run-status').textContent='Enter a valid forecast UUID.';return;}
  $('saved-run-status').textContent='Opening saved forecast…';
  try{
    const run=await api('/api/v1/forecasts/'+id+'/map');if(generation!==savedGeneration)return;
    if(!run.snapshots.length)throw Error('This run has no saved snapshots.');
    savedRun=run;state.savedManifest=run;state.exposureRequest++;state.forecastRequest++;
    state.exposure?.clearLayers();$('location-details').hidden=true;
    $('mode-demo').setAttribute('aria-selected','false');$('mode-live').setAttribute('aria-selected','false');
    $('forecast-help').textContent='Timeline shows saved model time relative to this run. Unsaved hours are unavailable. Candidate routes use this selected model time.';
    $('saved-layer-controls').hidden=false;
    const leads=run.snapshots.map(s=>s.lead_minutes);
    $('saved-run-timeline').innerHTML=leads.map(m=>`<button type="button" data-minute="${Number(m)}">+${Number(m)} min</button>`).join('');
    $('saved-run-timeline').querySelectorAll('button').forEach(b=>b.onclick=()=>showSavedLead(Number(b.dataset.minute)));
    $('clear-saved-run').hidden=false;await showSavedLead(leads[0],true);
  }catch(err){if(generation===savedGeneration)$('saved-run-status').textContent='Cannot open forecast. '+err.message;}
};
$('clear-saved-run').onclick=clearSavedForecast;
document.querySelectorAll('[data-saved-layer]').forEach(control=>control.onchange=applySavedVisibility);
async function refreshSavedRuns(){
  const select=$('saved-run-list');select.disabled=true;
  try{const data=await api('/api/v1/forecasts?limit=20');select.innerHTML='<option value="">Choose a saved model run</option>'+data.items.map(r=>`<option value="${esc(r.run_id)}">${esc(r.created_at)} · ${esc(r.run_id.slice(0,8))}</option>`).join('');if(!data.items.length)$('saved-run-status').textContent='No saved model runs yet. Demo mode is available separately.';}
  catch(e){$('saved-run-status').textContent='Run list unavailable. '+e.message;}
  finally{select.disabled=false;}
}
$('refresh-saved-runs').onclick=refreshSavedRuns;
$('saved-run-list').onchange=e=>{if(e.target.value){$('saved-run-id').value=e.target.value;$('saved-run-form').requestSubmit();}};
refreshSavedRuns();
