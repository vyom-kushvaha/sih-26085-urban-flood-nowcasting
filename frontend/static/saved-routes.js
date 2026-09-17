'use strict';
async function assessSavedCandidates(){
  state.savedRouteData=null;
  if(!state.savedManifest||!state.routeData?.routes?.length)return;
  const run=state.savedManifest.run_id,minute=state.savedMinute,request=state.request;
  $('route-message').hidden=false;$('route-message').textContent='Comparing candidate roads with saved model cells…';
  try{
    const data=await api(`/api/v1/forecasts/${run}/route-exposure?lead_minutes=${minute}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({routes:state.routeData.routes.slice(0,3).map(r=>({id:r.id,coordinates:r.coordinates}))})});
    if(state.savedManifest?.run_id!==run||state.savedMinute!==minute||state.request!==request)return;
    state.savedRouteData=data;state.selected=data.routes.find(r=>r.rank===1)?.id||data.routes[0]?.id;renderRoutes();
  }catch(e){if(state.savedManifest?.run_id===run&&state.savedMinute===minute&&state.request===request)$('route-message').textContent='Saved route assessment unavailable. '+e.message;}
}
function renderSavedRoutes(){
  const data=state.savedRouteData;
  if(!data){$('route-message').textContent='Saved forecast route comparison is not loaded.';return;}
  $('route-message').textContent=`Saved T+${data.lead_minutes} min · ${data.valid_time}. Candidate comparison; flood safety unverified. No new detour is generated.`;
  $('route-options').innerHTML=data.routes.map(r=>`<button class="route-option ${r.id===state.selected?'selected':''}" data-saved-route="${esc(r.id)}"><b>${r.rank?'Exposure rank '+r.rank:'Insufficient model coverage'}</b><small>${r.distance_km.toFixed(2)} km · ${r.coverage_pct.toFixed(1)}% model coverage<br>Peak model depth: ${r.max_depth_cm===null?'Unknown':r.max_depth_cm.toFixed(1)+' cm'}<br>${r.assessment_complete?'Entire candidate assessed':'Uncovered sections remain unknown'}</small></button>`).join('');
  $('route-options').querySelectorAll('button').forEach(button=>button.onclick=()=>{state.selected=button.dataset.savedRoute;renderRoutes();});
  if(!state.map||typeof L==='undefined')return;
  for(const r of [...data.routes].sort((a,b)=>Number(a.id===state.selected)-Number(b.id===state.selected))){
    if(!validRoadCoordinates(r.coordinates||[]))continue;
    const selected=r.id===state.selected;
    drawRoadRoute(r.coordinates,{selected,colour:'#64748b',popup:`Saved T+${data.lead_minutes} min<br>Peak depth: ${r.max_depth_cm===null?'Unknown':r.max_depth_cm.toFixed(1)+' cm'}<br>Flood safety unverified`,onClick:()=>{if(!selected){state.selected=r.id;renderRoutes();}}});
    if(selected){
      for(const feature of r.segments||[]){
        const coords=feature?.geometry?.coordinates?.map(([lon,lat])=>[lat,lon]);
        if(validRoadCoordinates(coords||[]))drawRouteExposure(coords,feature.properties.color);
      }
      addRouteEndpoints(r.coordinates);
    }
  }
}
