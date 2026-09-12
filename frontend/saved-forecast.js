'use strict';
// Saved-run layers are independent of the point forecast and route assessment.
let savedRun = null, savedLayer = null, savedGeneration = 0;
function clearSavedForecast(){
  savedGeneration++; savedRun=null;
  if(savedLayer)state.map?.removeLayer(savedLayer);
  savedLayer=null;
  $('saved-run-timeline').innerHTML='';$('clear-saved-run').hidden=true;
  $('saved-run-status').textContent='Saved forecast layers cleared.';
}
async function showSavedLead(minute, fit=false){
  const generation=++savedGeneration, id=savedRun.run_id;
  if(savedLayer)state.map?.removeLayer(savedLayer);savedLayer=null;
  $('saved-run-status').textContent=`Loading saved T+${minute} min…`;
  try{
    const [depth,drainage]=await Promise.all([api(`/api/v1/forecasts/${id}/depth.geojson?lead_minutes=${minute}`),api(`/api/v1/forecasts/${id}/drainage?lead_minutes=${minute}`)]);
    if(generation!==savedGeneration)return;
    if(!state.map||typeof L==='undefined')throw Error('Map is unavailable.');
    const polygons=L.geoJSON(depth,{style:f=>({color:'#003776',weight:.6,fillColor:f.properties.depth_cm>30?'#b33f43':f.properties.depth_cm>5?'#ed963e':'#448dcc',fillOpacity:f.properties.depth_cm>0?.55:.08})});
    polygons.eachLayer(layer=>layer.bindPopup(`Saved model output · T+${minute} min<br>Depth: ${Number(layer.feature.properties.depth_cm).toFixed(2)} cm`));
    const nodes=L.geoJSON(drainage,{pointToLayer:(f,p)=>L.circleMarker(p,{radius:5,color:'#003776',fillColor:'#fff',fillOpacity:1})});
    nodes.eachLayer(layer=>{const p=layer.feature.properties;layer.bindPopup(`${esc(p.id)} · ${esc(p.kind)}<br>Node depth: ${p.depth_m===null?'Boundary node':Number(p.depth_m).toFixed(3)+' m'}`);});
    savedLayer=L.layerGroup([polygons,nodes]).addTo(state.map);
    if(fit&&polygons.getBounds().isValid())state.map.fitBounds(polygons.getBounds(),{padding:[30,30],maxZoom:18});
    $('saved-run-status').textContent=`Saved prototype · T+${minute} min · ${depth.valid_time}. Terrain: ${depth.terrain_source}. Overlay blue/orange/red represents model depth, not route safety.`;
    $('saved-run-timeline').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.minute)===minute)));
  }catch(e){if(generation===savedGeneration)$('saved-run-status').textContent='Saved layer unavailable. '+e.message;}
}
$('saved-run-form').onsubmit=async e=>{
  e.preventDefault();clearSavedForecast();const generation=savedGeneration;
  const id=$('saved-run-id').value.trim();
  if(!/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id)){$('saved-run-status').textContent='Enter a valid forecast UUID.';return;}
  $('saved-run-status').textContent='Opening saved forecast…';
  try{
    const run=await api('/api/v1/forecasts/'+id);if(generation!==savedGeneration)return;
    savedRun=run;const leads=run.result.snapshots.map(s=>s.lead_minutes);
    $('saved-run-timeline').innerHTML=leads.map(m=>`<button type="button" data-minute="${Number(m)}">+${Number(m)} min</button>`).join('');
    $('saved-run-timeline').querySelectorAll('button').forEach(b=>b.onclick=()=>showSavedLead(Number(b.dataset.minute)));
    $('clear-saved-run').hidden=false;await showSavedLead(leads[0],true);
  }catch(err){if(generation===savedGeneration)$('saved-run-status').textContent='Cannot open forecast. '+err.message;}
};
$('clear-saved-run').onclick=clearSavedForecast;
