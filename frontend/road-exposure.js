'use strict';
let roadExposureTimer;
async function loadVisibleRoadExposure(){
  if(state.savedManifest)return;
  if(!state.map||state.map.getZoom()<10)return;
  const bounds=state.map.getBounds(),request=++state.exposureRequest;
  const area={west:Math.max(72.77,bounds.getWest()),south:Math.max(18.89,bounds.getSouth()),east:Math.min(72.99,bounds.getEast()),north:Math.min(19.30,bounds.getNorth()),zoom:state.map.getZoom()};
  if(area.west>=area.east||area.south>=area.north){state.exposure.clearLayers();$('nowcast-status').textContent='Outside Mumbai coverage';$('risk-count').textContent='—';$('map-message').textContent='Return to Mumbai to view road screening.';return;}
  const query=new URLSearchParams(area);
  const demo=state.demoMode===true;
  if(demo){query.set('lead_hours',state.hour);query.set('scenario','street-v2');}
  $('nowcast-status').textContent=demo?'Loading demonstration…':'Calculating visible roads…';
  try{
    const data=await api((demo?'/api/v1/roads/demo-exposure?':'/api/v1/roads/exposure?')+query);
    if(request!==state.exposureRequest)return;
    state.exposure.clearLayers();
    L.geoJSON(data,{pane:'roadExposure',renderer:state.roadRenderer,style:f=>({color:f.properties.color,weight:demo?(state.map.getZoom()>=16?5:4):(state.map.getZoom()<=11?2.5:4),opacity:demo?.9:.75}),
      onEachFeature:(feature,layer)=>{const p=feature.properties,depth=p.estimated_1h_depth_range_cm;
        const observed=p.observed_water_depth_cm;
        layer.bindPopup(demo?`<b>${esc(p.name)} · ${esc(p.risk)}</b><br>Illustrative depth: ${esc(p.depth_cm)} cm<br>Road exposure factor: ${esc(p.illustrative_exposure_factor)}<br>Scenario time: T+${esc(p.lead_hours)} hour<br>Simulated demonstration · Not live<br>Safety certification: No`:`<b>${esc(p.name)} · ${esc(p.category)}</b><br>Basis: ${esc(p.classification_basis)}<br>Live rainfall: ${esc(p.rainfall_mm_hr??'Unavailable')} mm/hr<br>Weather source: ${esc(p.weather_source||'Unavailable')}<br>Verified observed water: ${observed==null?'Unavailable':esc(observed)+' cm'}<br>1h modeled depth: ${depth?esc(depth[0])+'–'+esc(depth[1])+' cm':'Unavailable'}<br>Safety certification: No`);}
    }).addTo(state.exposure);
    if(demo)L.geoJSON(data.hotspots,{pointToLayer:(f,p)=>L.circleMarker(p,{radius:7,color:'#fff',weight:2,fillColor:f.properties.color,fillOpacity:1}),onEachFeature:(f,l)=>l.bindPopup(`<b>${esc(f.properties.name)} · Demo hotspot</b><br>Illustrative depth: ${esc(f.properties.depth_cm)} cm<br>T+${esc(f.properties.lead_hours)} hour · Not live`)}).addTo(state.exposure);
    const m=data.metadata;$('nowcast-status').textContent=`${m.road_count} visible roads screened`;
    const legend=document.querySelector('.legend');
    if(demo){
      $('nowcast-status').textContent=`Demo scenario · T+${m.lead_hours}h`;
      legend.innerHTML='<span class="eyebrow">ILLUSTRATIVE ROAD DEPTH</span><div><i style="background:#16a34a"></i>&lt;5 cm <i style="background:#f59e0b"></i>5–15 cm <i style="background:#dc2626"></i>15–30 cm <i style="background:#991b1b"></i>&gt;30 cm</div><small>Simulated demonstration · Not live or validated · Green is not a safety certificate.</small>';
      $('risk-count').textContent=(m.category_counts.RED||0)+(m.category_counts.CRITICAL||0);
      $('updated').textContent='SIMULATED · NOT LIVE';
      const coverageHint=m.zoom>=16?'All acquired drivable road classes are visible in this viewport.':m.zoom===15?'Residential streets are visible; zoom in once for service roads.':'Zoom in for residential and service roads.';
      $('map-message').textContent=`Zoom ${m.zoom} · ${m.road_segment_count} mapped road segments coloured · T+${m.lead_hours} simulated scenario. ${coverageHint}`;
      return;
    }
    if(legend)legend.innerHTML=m.verified_observation_road_count?'<span class="eyebrow">VERIFIED WATER + LIVE RAIN</span><div><i style="background:#16a34a"></i>&lt;5 cm <i style="background:#f59e0b"></i>5–15 cm <i style="background:#dc2626"></i>&gt;15 cm <i style="background:#2563eb"></i>Low rain</div><small>Observed depth applies within 120 m for 3 hours; inspect each road for its basis.</small>':m.terrain_model_coverage_pct===100?'<span class="eyebrow">MODELLED ROAD SCREENING</span><div><i style="background:#16a34a"></i>&lt;5 cm <i style="background:#f59e0b"></i>5–15 cm <i style="background:#dc2626"></i>&gt;15 cm</div><small>Estimated depth sensitivity; green is not a safety certificate.</small>':'<span class="eyebrow">LIVE RAINFALL SCREENING</span><div><i style="background:#2563eb"></i>&lt;5 mm/h <i style="background:#f59e0b"></i>5–20 mm/h <i style="background:#dc2626"></i>&gt;20 mm/h</div><small>Terrain model unavailable. Rainfall is not measured road depth or flood safety.</small>';
    $('risk-count').textContent=(m.category_counts.RED||0)+(m.category_counts.ORANGE||0);
    const providers=(m.weather_sources||[]).map(source=>source.startsWith('MET Norway')?'MET Norway':source.startsWith('Open-Meteo')?'Open-Meteo':source).join(' + ')||'Unavailable';
    $('updated').textContent=`Weather ${m.weather_coverage_pct}% · ${providers}`;
    $('map-message').textContent=m.terrain_model_coverage_pct===100?'Visible roads show modeled depth sensitivity. Green is still an estimate.':'Visible roads use live rainfall screening; validated terrain is unavailable for some or all segments.';
  }catch(error){
    if(request!==state.exposureRequest)return;
    state.exposure.clearLayers();$('nowcast-status').textContent='Road screening unavailable';$('risk-count').textContent='—';
    $('map-message').textContent=error.message;
  }
}
function scheduleVisibleRoadExposure(){clearTimeout(roadExposureTimer);roadExposureTimer=setTimeout(loadVisibleRoadExposure,350);}
function setMapMode(demo){
  clearSavedForecast();
  if(state.demoMode===demo)return;
  state.demoMode=demo;state.exposureRequest++;state.exposure?.clearLayers();
  $('mode-demo').setAttribute('aria-selected',String(demo));
  $('mode-live').setAttribute('aria-selected',String(!demo));
  $('forecast-help').textContent=demo?'Timeline controls the illustrative monsoon scenario. Values are simulated and must not guide travel.':'Tap a map location to explore its next 3 hours. Route assessment uses current conditions.';
  $('location-details').hidden=true;state.forecastDetailsOpen=false;
  if(demo&&state.map.getZoom()<DEMO_MAP_ZOOM)state.map.setView([DEMO_DEFAULT.lat,DEMO_DEFAULT.lng],DEMO_MAP_ZOOM,{animate:false});
  scheduleVisibleRoadExposure();
}
