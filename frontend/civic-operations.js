'use strict';
// Keep the deployment credential in memory only. Reload/sign-out clears access.
let municipalToken = '', civicGeneration = 0;
const privatePhotoUrls = new Set();
function clearPrivatePhotos(){privatePhotoUrls.forEach(url=>URL.revokeObjectURL(url));privatePhotoUrls.clear();}
function priorityTable(data){
  if(!data)return '<p class="muted">Select a saved forecast on the map to view model priority areas.</p>';
  const summary=data.summary;
  return `<p>Saved T+${data.lead_minutes} min · ${esc(data.valid_time)} · ${summary.total_clusters} model areas · ${summary.affected_area_m2.toFixed(0)} m² affected</p><p class="muted">Prototype model output; these areas are not official wards or verified incidents.</p>`+
    (data.features.length?'<div style="overflow-x:auto"><table><thead><tr><th>Priority area</th><th>Peak depth</th><th>Area</th><th>Band</th></tr></thead><tbody>'+data.features.map(f=>`<tr><td>${esc(f.properties.name)}</td><td>${f.properties.max_depth_cm.toFixed(1)} cm</td><td>${f.properties.area_m2.toFixed(0)} m²</td><td>${esc(f.properties.risk)}</td></tr>`).join('')+'</tbody></table></div>':'<p>No model cells exceed the selected display threshold.</p>')+
    (summary.truncated?'<p>Showing the highest ranked areas; more clusters exist.</p>':'');
}
async function municipalApi(path,options={}){
  if(!municipalToken)throw Error('Sign in to municipal access first.');
  return api('/api/v1/admin'+path,{...options,headers:{'Content-Type':'application/json',...options.headers,Authorization:'Bearer '+municipalToken}});
}
function renderMunicipalLogin(){
  const generation=++civicGeneration;
  $('content-page').innerHTML='<div class="narrow">'+heading('MUNICIPAL ACCESS','Review reports and publish notices.','Access is restricted to the project’s configured municipal operator.')+'<form id="municipal-login" class="panel"><label class="field-label" for="municipal-key">MUNICIPAL ACCESS KEY</label><input id="municipal-key" type="password" required autocomplete="off"><button class="primary">Sign in</button><p id="municipal-login-status" role="status">Access lasts until sign-out or page reload.</p></form></div>';
  $('municipal-login').onsubmit=async e=>{e.preventDefault();const key=$('municipal-key').value;const button=e.target.querySelector('button');button.disabled=true;
    try{await api('/api/v1/admin/session',{headers:{Authorization:'Bearer '+key}});if(generation!==civicGeneration)return;municipalToken=key;location.hash='#/municipality';}
    catch(err){if(generation===civicGeneration)$('municipal-login-status').textContent=err.message;}
    finally{button.disabled=false;}
  };
}
function noticeCards(items){return items.length?items.map(n=>`<article class="panel"><span class="badge">${esc(n.severity)}</span><h3>${esc(n.title)}</h3><p>${esc(n.area)}</p><p>${esc(n.message)}</p><small>Expires: ${esc(n.expires_at)}</small></article>`).join(''):'<p class="muted">No current published notices.</p>';}
async function renderCivicDashboard(municipal=false){
  clearPrivatePhotos();const generation=++civicGeneration;
  if(municipal&&!municipalToken){renderMunicipalLogin();return;}
  $('content-page').innerHTML=heading(municipal?'MUNICIPALITY':'MUMBAI',municipal?'Municipality Dashboard':'City Dashboard','Saved model priorities and published municipal information.')+
    (municipal?'<button id="municipal-signout" class="secondary">Sign out</button>':'')+
    '<section class="panel"><h2>Model priority areas</h2>'+priorityTable(state.savedHotspots)+'<a href="#/map">Choose a forecast on the map →</a></section><section class="panel"><h2>Municipal notices</h2><div id="public-notices" role="status">Loading notices…</div></section>'+
    (municipal?'<section class="panel"><h2>Citizen reports</h2><button id="refresh-reports" class="secondary">Refresh reports</button><div id="admin-reports" role="status">Loading reports…</div><button id="reports-prev" class="secondary">Previous</button><button id="reports-next" class="secondary">Next</button></section><section class="panel"><h2>Create a notice</h2><form id="notice-form"><label class="field-label">TITLE<input name="title" minlength="3" maxlength="160" required></label><label class="field-label">AREA<input name="area" minlength="2" maxlength="200" required></label><label class="field-label">MESSAGE<textarea name="message" minlength="5" maxlength="4000" required></textarea></label><label class="field-label">SEVERITY<select name="severity"><option>Advisory</option><option>Warning</option><option>Closure</option></select></label><label class="field-label">EXPIRES (YOUR LOCAL TIME)<input name="expires" type="datetime-local" required></label><button class="primary">Save draft</button><p id="notice-status" role="status"></p></form><div id="admin-notices"></div></section>':'');
  api('/api/v1/notices').then(data=>{if(generation===civicGeneration&&$('public-notices'))$('public-notices').innerHTML=noticeCards(data.items);}).catch(err=>{if(generation===civicGeneration&&$('public-notices'))$('public-notices').textContent=err.message;});
  if(!municipal)return;
  $('municipal-signout').onclick=()=>{municipalToken='';clearPrivatePhotos();location.hash='#/login';};
  let offset=0;
  async function reports(){
    const target=$('admin-reports');target.textContent='Loading reports…';clearPrivatePhotos();
    try{const data=await municipalApi('/reports?limit=20&offset='+offset);if(generation!==civicGeneration)return;
      const actions={RECEIVED:['VERIFIED','REJECTED'],VERIFIED:['ACTION_TAKEN','REJECTED'],ACTION_TAKEN:['RESOLVED']};
      target.innerHTML=data.items.length?data.items.map(r=>`<article class="panel"><h3>${esc(r.problem)} · ${esc(r.status)}</h3><p>${esc(r.lat)}, ${esc(r.lon)} · ${esc(r.observed_at||r.created_at)}</p><p>Reported depth: ${r.water_depth_cm==null?'Not supplied':esc(r.water_depth_cm)+' cm'}</p><p>${esc(r.message)}</p><small>Report ${esc(r.id)}</small><div>${(actions[r.status]||[]).map(status=>`<button class="secondary" data-report="${esc(r.id)}" data-revision="${r.revision}" data-status="${status}">${status.replaceAll('_',' ')}</button>`).join('')}${r.photo_available?`<button class="secondary" data-photo="${esc(r.id)}">View private photo</button>`:''}</div></article>`).join(''):'<p>No reports on this page.</p>';
      $('reports-prev').disabled=offset===0;$('reports-next').disabled=data.items.length<20;
      target.querySelectorAll('[data-report]').forEach(button=>button.onclick=async()=>{button.disabled=true;try{await municipalApi('/reports/'+button.dataset.report,{method:'PATCH',body:JSON.stringify({status:button.dataset.status,revision:Number(button.dataset.revision)})});await reports();}catch(err){button.disabled=false;alert(err.message);}});
      target.querySelectorAll('[data-photo]').forEach(button=>button.onclick=async()=>{button.disabled=true;try{const response=await fetch(API_BASE+'/api/v1/admin/reports/'+button.dataset.photo+'/photo',{headers:{Authorization:'Bearer '+municipalToken}});if(!response.ok)throw Error('Photo unavailable');const blob=await response.blob();if(generation!==civicGeneration||!button.isConnected)return;const url=URL.createObjectURL(blob);privatePhotoUrls.add(url);const img=document.createElement('img');img.src=url;img.alt='Private citizen report photo';img.style.maxWidth='100%';button.after(img);}catch(err){button.disabled=false;alert(err.message);}});
    }catch(err){if(generation===civicGeneration)target.textContent=err.message;}
  }
  async function notices(){
    try{const data=await municipalApi('/notices');if(generation!==civicGeneration)return;
      $('admin-notices').innerHTML=data.items.map(n=>`<article class="panel"><h3>${esc(n.title)} · ${esc(n.status)}</h3><p>${esc(n.message)}</p><p>${esc(n.area)} · ${esc(n.severity)} · Expires ${esc(n.expires_at)}</p>${['DRAFT','PUBLISHED'].includes(n.status)?`<button class="secondary" data-notice="${esc(n.id)}" data-revision="${n.revision}" data-status="${n.status==='DRAFT'?'PUBLISHED':'WITHDRAWN'}">${n.status==='DRAFT'?'Publish notice':'Withdraw notice'}</button>`:''}</article>`).join('');
      $('admin-notices').querySelectorAll('[data-notice]').forEach(button=>button.onclick=async()=>{button.disabled=true;try{await municipalApi('/notices/'+button.dataset.notice,{method:'PATCH',body:JSON.stringify({status:button.dataset.status,revision:Number(button.dataset.revision)})});renderCivicDashboard(true);}catch(err){button.disabled=false;alert(err.message);}});
    }catch(err){if(generation===civicGeneration)$('admin-notices').textContent=err.message;}
  }
  $('refresh-reports').onclick=reports;$('reports-prev').onclick=()=>{offset=Math.max(0,offset-20);reports();};$('reports-next').onclick=()=>{offset+=20;reports();};
  $('notice-form').onsubmit=async e=>{e.preventDefault();const form=e.target,values=new FormData(form),button=form.querySelector('button');button.disabled=true;
    try{await municipalApi('/notices',{method:'POST',body:JSON.stringify({title:values.get('title'),area:values.get('area'),message:values.get('message'),severity:values.get('severity'),expires_at:new Date(values.get('expires')).toISOString()})});if(generation!==civicGeneration)return;form.reset();$('notice-status').textContent='Draft saved. Review it below before publishing.';await notices();}catch(err){if(generation===civicGeneration)$('notice-status').textContent=err.message;}finally{button.disabled=false;}
  };
  await Promise.all([reports(),notices()]);
}

async function prepareReportPhoto(file){
  if(!file)return null;
  if(!file.type.startsWith('image/')||file.size>10*1024*1024)throw Error('Choose an image smaller than 10 MB.');
  const bitmap=await createImageBitmap(file);
  try{const scale=Math.min(1,1024/Math.max(bitmap.width,bitmap.height));const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);
    let result=canvas.toDataURL('image/jpeg',.7);if(result.length>333350)result=canvas.toDataURL('image/jpeg',.45);if(result.length>333350)throw Error('Photo is too detailed. Choose a smaller image.');return result;
  }finally{bitmap.close();}
}
