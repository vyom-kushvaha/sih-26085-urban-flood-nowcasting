'use strict';
function renderLiveRoutes(data){
  const routes=(data.routes||[]).slice(0,3);
  $('route-message').hidden=false;
  $('route-message').textContent=data.no_safe_route_warning;
  const legend=document.querySelector('.legend');
  const modelled=data.comparison_basis==='modelled flood exposure';
  if(legend)legend.innerHTML=modelled?'<span class="eyebrow">MODELLED ROAD EXPOSURE</span><div><i style="background:#2563eb"></i>Lower route <i style="background:#e47e32"></i>Higher route</div><div><i style="background:#2563eb"></i>&lt;5 cm <i style="background:#f59e0b"></i>5–15 cm <i style="background:#dc2626"></i>&gt;15 cm</div><small>Grey: unavailable. Estimated sensitivity range; flood safety unverified.</small>':'<span class="eyebrow">LIVE RAINFALL SCREENING</span><div><i style="background:#2563eb"></i>&lt;5 mm/h <i style="background:#f59e0b"></i>5–20 mm/h <i style="background:#dc2626"></i>&gt;20 mm/h</div><small>Terrain model unavailable. Rainfall is not measured road depth or flood safety.</small>';
  $('route-options').innerHTML=routes.map((r,i)=>`<button class="route-option ${r.id===state.selected?'selected':''}" data-route-id="${esc(r.id)}" aria-pressed="${r.id===state.selected}"><b>Route ${i+1} · ${esc(r.screening_label)}</b><small>${esc(r.distance_km)} km · ${esc(r.estimated_duration_min)} min<br>Rainfall: ${r.mean_rainfall_mm_hr==null?'unavailable':esc(r.mean_rainfall_mm_hr)+' mm/hr mean · '+esc(r.max_rainfall_mm_hr)+' mm/hr peak'}<br>1h modeled max depth: ${r.estimated_1h_depth_range_cm?esc(r.estimated_1h_depth_range_cm[0])+'–'+esc(r.estimated_1h_depth_range_cm[1])+' cm':'unavailable'} (${esc(r.terrain_model_coverage_pct??0)}% terrain coverage)<br>Weather coverage: ${esc(r.rainfall_coverage_pct)}% · Flood safety: unverified</small></button>`).join('')+
    `<details class="sources"><summary>Calculation & data sources</summary><p>${esc(data.calculation?.sample_count)} road sections; maximum ${esc(data.calculation?.sample_spacing_max_m)} m spacing. Weather queries use approximately 2 km cells; actual model resolution varies.</p><p>Rainfall index = 65% peak + 35% distance-weighted mean. Flood exposure = 70% maximum upper depth + 30% distance-weighted mean upper depth.</p><p>${esc(data.weather_cells?.[0]?.source||'Weather unavailable')}<br>Valid time: ${esc(data.weather_cells?.[0]?.valid_time||'unavailable')}</p><p>Depth is a 0–100% drainage-blockage sensitivity range. It is not measured road water or a flood-safe certification.</p></details>`;
  $('route-options').querySelectorAll('button').forEach(button=>button.onclick=()=>{state.selected=button.dataset.routeId;renderRoutes();});
  if(!state.map||typeof L==='undefined')return;
  // Draw every complete candidate, then the selected option on top.
  const ordered=[...routes].sort((a,b)=>Number(a.id===state.selected)-Number(b.id===state.selected));
  for(const r of ordered){
    const coords=r.coordinates||[];
    if(!String(r.geometry_source).endsWith('ROAD_NETWORK')||coords.length<2||!coords.every(p=>Array.isArray(p)&&p.length===2&&p.every(Number.isFinite)))continue;
    const selected=r.id===state.selected;
    const colour=!data.screening_complete||routes.length===1?'#64748b':r.screening_label.startsWith('Similar')?'#64748b':r.is_lowest_exposure?'#2563eb':'#e47e32';
    L.polyline(coords,{smoothFactor:0,color:'#ffffff',weight:selected?9:6,opacity:.9}).addTo(state.routes);
    const line=L.polyline(coords,{smoothFactor:0,color:colour,weight:selected?5:3,opacity:selected?1:.5,dashArray:data.screening_complete?null:'8 5'}).addTo(state.routes);
    line.bindPopup(`${esc(r.screening_label)}<br>Mean rainfall: ${esc(r.mean_rainfall_mm_hr??'Unavailable')} mm/hr<br>Flood safety unverified`);
    line.on('click',()=>{state.selected=r.id;renderRoutes();});
    if(selected)for(const segment of r.segments||[]){
      const upper=segment.estimated_1h_depth_range_cm?.[1];
      const rain=segment.rainfall_mm_hr;
      const segmentColour=upper!=null?(upper>15?'#dc2626':upper>=5?'#f59e0b':'#2563eb'):
        rain==null?'#64748b':rain>20?'#dc2626':rain>=5?'#f59e0b':'#2563eb';
      L.polyline(segment.coordinates,{smoothFactor:0,color:segmentColour,weight:6,opacity:.95,dashArray:upper==null?'6 4':null}).addTo(state.routes)
        .bindPopup(`Live rainfall: ${esc(segment.rainfall_mm_hr??'Unavailable')} mm/hr<br>1h modeled depth: ${segment.estimated_1h_depth_range_cm?esc(segment.estimated_1h_depth_range_cm[0])+'–'+esc(upper)+' cm':'Unavailable'}<br>Flood safety unverified`);
    }
    if(selected){
      [['A',coords[0]],['B',coords[coords.length-1]]].forEach(([label,p])=>L.marker(p,{icon:L.divIcon({className:'',html:`<div class="endpoint">${label}</div>`,iconSize:[26,26],iconAnchor:[13,13]})}).addTo(state.markers));
      state.map.fitBounds(L.latLngBounds(coords),{padding:[48,48],maxZoom:LOCAL_MAP_ZOOM,animate:false});
    }
  }
}
