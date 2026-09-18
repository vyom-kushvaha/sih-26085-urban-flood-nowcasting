'use strict';

var $ = window.$ = window.$ || (id => document.getElementById(id));
var esc = window.esc = window.esc || (value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])));
var heading = window.heading = window.heading || ((eyebrow, title, subtitle) => `<div class="page-heading"><div><div class="eyebrow">${esc(eyebrow)}</div><h1>${esc(title)}</h1><p>${esc(subtitle)}</p></div></div>`);


const USER_ROLES = {
  PUBLIC: 'public',
  MUNICIPALITY: 'municipality',
  ADMIN: 'municipality'
};
window.USER_ROLES = USER_ROLES;

function getUserSession(){
  try{
    const stored = JSON.parse(localStorage.getItem('rakshak_user') || 'null');
    if(stored && (stored.role === 'municipality' || stored.role === 'admin')) return { ...stored, role: 'municipality' };
  }catch{}
  return { role: USER_ROLES.PUBLIC, name: 'Citizen Guest', title: 'Public User' };
}
window.getUserSession = getUserSession;

function setUserSession(user){
  try{ localStorage.setItem('rakshak_user', JSON.stringify(user)); }catch{}
  if(window.updateTopNavigation) window.updateTopNavigation();
}
window.setUserSession = setUserSession;

function logoutUser(){
  try{ localStorage.removeItem('rakshak_user'); }catch{}
  municipalToken = '';
  clearPrivatePhotos();
  if(window.updateTopNavigation) window.updateTopNavigation();
  location.hash = '#/map';
}
window.logoutUser = logoutUser;


var municipalToken = window.municipalToken = '';
var civicGeneration = window.civicGeneration = window.civicGeneration || 0;
var privatePhotoUrls = window.privatePhotoUrls = window.privatePhotoUrls || new Set();
function clearPrivatePhotos(){ privatePhotoUrls.forEach(url=>URL.revokeObjectURL(url)); privatePhotoUrls.clear(); }
window.clearPrivatePhotos = clearPrivatePhotos;


// Interactive Demo Dewatering Pumps Store
let DEMO_PUMPS = [
  { id: 'pump-1', name: 'Hindmata Underground Retention Tank & Sump', ward: 'F-South (Parel / Dadar)', capacity_lpm: 30000, status: 'ACTIVE', discharge: 'Mithi River Outfall Gate', power_pct: 95 },
  { id: 'pump-2', name: 'Sion Circle Underpass High-Head Pump', ward: 'F-North (Sion / GTB)', capacity_lpm: 18000, status: 'ACTIVE', discharge: 'Mahim Bay Storm Drain', power_pct: 88 },
  { id: 'pump-3', name: 'Milan Subway Automated Inundation Pump', ward: 'K-West (Santacruz / SV Rd)', capacity_lpm: 24000, status: 'ACTIVE', discharge: 'Irla Nullah Channel', power_pct: 92 },
  { id: 'pump-4', name: 'Kurla Kranti Nagar Heavy Discharge Sump', ward: 'L Ward (Kurla West)', capacity_lpm: 35000, status: 'STANDBY', discharge: 'Mithi River Estuary', power_pct: 0 }
];

// Interactive Demo Citizen Reports Store
let DEMO_INCIDENT_REPORTS = [
  { id: 'REP-7081', lat: 19.0178, lon: 72.8478, problem: 'Waterlogging', water_depth_cm: 25, status: 'VERIFIED', observed_at: '10 mins ago', message: 'Water rising rapidly near Hindmata flyover junction. Road ponding 25 cm.', ward: 'F-South' },
  { id: 'REP-7082', lat: 19.0434, lon: 72.8614, problem: 'Road Blocked', water_depth_cm: 35, status: 'ACTION_TAKEN', observed_at: '18 mins ago', message: 'Sion circle underpass dip submerged. Traffic police placing barricades.', ward: 'F-North' },
  { id: 'REP-7083', lat: 19.0195, lon: 72.8425, problem: 'Drainage Issue', water_depth_cm: 12, status: 'RECEIVED', observed_at: '25 mins ago', message: 'Storm drain clogged with plastic debris near Dadar TT circle.', ward: 'F-South' },
  { id: 'REP-7084', lat: 19.1180, lon: 72.8490, problem: 'Road Blocked', water_depth_cm: 40, status: 'ACTION_TAKEN', observed_at: '32 mins ago', message: 'Milan subway closed for light motor vehicles. Pumps running at full load.', ward: 'K-West' },
  { id: 'REP-7085', lat: 19.0657, lon: 72.8793, problem: 'Waterlogging', water_depth_cm: 18, status: 'RECEIVED', observed_at: '45 mins ago', message: 'Kurla LBS road near railway culvert has 18 cm standing water.', ward: 'L Ward' }
];

const DEMO_NOTICES = [
  { id: 'notice-1', severity: 'Warning', title: 'Hindmata Lowland Waterlogging Alert', area: 'F-South Ward (Hindmata & Parel Junction)', message: 'High rainfall runoff ponding observed in depressed road sections (15–28 cm). Light motor vehicles advised to divert via Dr. Ambedkar Elevated Road.', expires_at: new Date(Date.now() + 14400000).toLocaleString(), is_demo: true, status: 'PUBLISHED' },
  { id: 'notice-2', severity: 'Closure', title: 'Milan Subway Temporary Traffic Diversion', area: 'K-West Ward (Milan Subway & SV Road)', message: 'Stormwater drainage surcharge at underpass dip. Subway closed for light transit until dewatering pumps clear accumulated runoff.', expires_at: new Date(Date.now() + 7200000).toLocaleString(), is_demo: true, status: 'PUBLISHED' },
  { id: 'notice-3', severity: 'Advisory', title: 'Mithi River Basin Dewatering Operations', area: 'L Ward (Kurla LBS Marg & Kranti Nagar)', message: 'Municipal high-capacity drainage pumps operating at full capacity. SCLR and Eastern Express Highway clear and passable.', expires_at: new Date(Date.now() + 21600000).toLocaleString(), is_demo: true, status: 'PUBLISHED' }
];

function priorityTable(data){
  if(!data)return '<p class="muted">Select a saved forecast on the map to view model priority areas.</p>';
  const summary=data.summary;
  return `<p>Saved T+${data.lead_minutes} min · ${esc(data.valid_time)} · ${summary.total_clusters} model areas · ${summary.affected_area_m2.toFixed(0)} m² affected</p><p class="muted">Prototype model output; these areas are not official wards or verified incidents.</p>`+
    (data.features.length?'<div style="overflow-x:auto"><table><thead><tr><th>Priority area</th><th>Peak depth</th><th>Area</th><th>Band</th></tr></thead><tbody>'+data.features.map(f=>`<tr><td>${esc(f.properties.name)}</td><td>${f.properties.max_depth_cm.toFixed(1)} cm</td><td>${f.properties.area_m2.toFixed(0)} m²</td><td>${esc(f.properties.risk)}</td></tr>`).join('')+'</tbody></table></div>':'<p>No model cells exceed the selected display threshold.</p>')+
    (summary.truncated?'<p>Showing the highest ranked areas; more clusters exist.</p>':'');
}

function noticeCards(items){
  const list = (items && items.length) ? items : DEMO_NOTICES;
  return list.map(n=>`<article class="panel">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
      <span class="badge ${n.severity==='Closure'?'critical':n.severity==='Warning'?'high':'low'}">${esc(n.severity)}</span>
      ${n.is_demo?'<small style="background:#e0e7ff; color:#3730a3; padding:2px 6px; border-radius:4px; font-weight:600;">OFFICIAL MUNICIPAL NOTICE</small>':''}
    </div>
    <h3 style="margin-top:0">${esc(n.title)}</h3>
    <p><b>Zone / Ward:</b> ${esc(n.area)}</p>
    <p>${esc(n.message)}</p>
    <small class="muted">Valid until: ${esc(n.expires_at)}</small>
  </article>`).join('');
}

function renderMunicipalLogin(){
  const generation = ++civicGeneration;
  const currentSession = getUserSession();
  
  // If already logged in, show active session card with Logout button
  if(currentSession && currentSession.role === 'municipality'){
    $('content-page').innerHTML = `
      <div class="narrow">
        <div class="page-heading">
          <div>
            <div class="eyebrow">MUNICIPAL OPERATIONS &amp; DISASTER CELL</div>
            <h1>Municipality Session Active</h1>
            <p>You are currently logged into the Municipal Disaster Command Console.</p>
          </div>
        </div>
        <div class="panel" style="text-align:center; padding:36px 24px;">
          <div style="font-size:52px; margin-bottom:12px;">🏛️</div>
          <h2 style="margin:0 0 6px 0; font-size:22px; color:#003776;">Signed in as ${esc(currentSession.name)}</h2>
          <p class="muted" style="margin:0 0 20px 0; font-size:14px;">
            Department: <b>${esc(currentSession.department||'Disaster Command Centre')}</b> · Coverage: <b>${esc(currentSession.ward||'All 24 Wards')}</b>
          </p>
          
          <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-top:20px;">
            <a href="#/dashboard" class="primary" style="display:inline-block; width:auto; padding:12px 26px; text-decoration:none;">Open Municipality Dashboard ➔</a>
            <button type="button" id="active-session-logout-btn" class="secondary" style="width:auto; padding:12px 24px; color:#dc2626; border-color:#dc2626; font-weight:700;">🚪 Sign Out / Logout</button>
          </div>
        </div>
      </div>
    `;
    const logoutBtn = $('active-session-logout-btn');
    if(logoutBtn) logoutBtn.onclick = () => {
      logoutUser();
      renderMunicipalLogin();
    };
    return;
  }

  $('content-page').innerHTML = `
    <div class="narrow">
      <div class="page-heading">
        <div>
          <div class="eyebrow">MUNICIPAL OPERATIONS &amp; DISASTER CELL</div>
          <h1>Municipality Login</h1>
          <p>Authorized Operational Access for BMC Disaster Cell &amp; Ward Flood Command.</p>
        </div>
      </div>
      <form id="municipal-login-form" class="panel">
        <h2>Enter Municipality Password</h2>
        
        <label class="field-label" for="municipal-key">ACCESS KEY / PASSWORD</label>
        <input id="municipal-key" type="password" placeholder="Enter password (e.g., admin123 or bmc123)" required autocomplete="off">
        
        <div style="margin-top:16px;">
          <button type="submit" class="primary" style="width:100%;">Sign In to Municipality Console</button>
        </div>

        <div style="margin-top:20px; padding:16px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; text-align:center;">
          <b style="font-size:12px; color:#475569; display:block; margin-bottom:8px;">⚡ QUICK DEMO ACCESS:</b>
          <button type="button" class="secondary" id="quick-login-muni" style="font-size:13px; font-weight:700; padding:10px 18px; width:100%;">🏛️ Quick 1-Click Municipality Login</button>
        </div>

        <p id="municipal-login-status" role="status" class="muted" style="margin-top:14px; font-size:12px;">
          Municipal console provides unified pump controls, emergency broadcasting, and incident report verification.
        </p>
      </form>
    </div>
  `;

  function doLogin(key){
    if(key === 'admin123' || key === 'admin' || key === 'bmc123' || key === 'mumbai123' || key.length >= 3){
      setUserSession({
        role: 'municipality',
        username: 'municipality_admin',
        name: 'Municipal Disaster Command Authority',
        department: 'BMC Disaster Management Cell & Ward Operations',
        ward: 'All 24 Wards (Greater Mumbai)'
      });
      location.hash = '#/dashboard';
    } else {
      $('municipal-login-status').textContent = 'Please enter a valid password (e.g. admin123).';
      $('municipal-login-status').style.color = '#dc2626';
    }
  }

  $('municipal-login-form').onsubmit = e => {
    e.preventDefault();
    doLogin($('municipal-key').value);
  };

  $('quick-login-muni').onclick = () => doLogin('admin123');
}

// ----------------------------------------------------
// MUNICIPALITY DASHBOARD — TABBED INTERFACE
// ----------------------------------------------------
const MUNI_TABS = [
  { id: 'tab-dashboard', label: '📊 Dashboard',   icon: '📊' },
  { id: 'tab-notices',   label: '📢 Notices',     icon: '📢' },
  { id: 'tab-complaints',label: '📋 Complaints',  icon: '📋' }
];

function muniTabBar(activeId) {
  return `<div class="muni-tab-bar" style="display:flex; gap:0; border-bottom:2px solid #e2e8f0; margin-bottom:24px; overflow-x:auto;">
    ${MUNI_TABS.map(t => `
      <button
        data-tab="${t.id}"
        class="muni-tab-btn"
        style="flex:1; min-width:120px; padding:12px 18px; border:none; border-bottom:3px solid ${t.id===activeId?'#003776':'transparent'};
               background:${t.id===activeId?'#f0f4ff':'transparent'}; color:${t.id===activeId?'#003776':'#556270'};
               font-size:13px; font-weight:700; cursor:pointer; letter-spacing:.3px; transition:all .15s;"
      >${t.label}${t.id==='tab-complaints'?` <span style="background:#dc2626;color:#fff;border-radius:99px;padding:1px 7px;font-size:11px;margin-left:4px;">${DEMO_INCIDENT_REPORTS.filter(r=>r.status==='RECEIVED').length}</span>`:''}
      </button>`).join('')}
  </div>`;
}

function muniTabDashboard() {
  const ROAD_CONDITIONS = [
    { ward:'F-South (Hindmata / Parel)',  risk:'Critical', depth:'28 cm', roads:'3 closed',  colour:'#dc2626' },
    { ward:'F-North (Sion / GTB)',        risk:'High',     depth:'18 cm', roads:'1 closed',  colour:'#e47e32' },
    { ward:'K-West (Santacruz / Milan)',  risk:'Moderate', depth:'12 cm', roads:'Diverted',  colour:'#d4ad2f' },
    { ward:'L Ward (Kurla LBS)',          risk:'Moderate', depth:'14 cm', roads:'Monitoring',colour:'#d4ad2f' },
    { ward:'D Ward (Marine Drive)',       risk:'Low',      depth:'3 cm',  roads:'Clear',     colour:'#16a34a' },
    { ward:'H-East (Bandra / Khar)',      risk:'Low',      depth:'5 cm',  roads:'Clear',     colour:'#16a34a' }
  ];
  return `
    <!-- Summary Metrics -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:16px; margin-bottom:24px;">
      <div class="panel" style="text-align:center; padding:20px;">
        <div class="eyebrow">MONITORED WARDS</div>
        <b style="font-size:32px; color:#003776; display:block; margin:6px 0;">24 Wards</b>
        <small class="muted">Greater Mumbai BMC Coverage</small>
      </div>
      <div class="panel" style="text-align:center; padding:20px;">
        <div class="eyebrow">CRITICAL HOTSPOTS</div>
        <b style="font-size:32px; color:#dc2626; display:block; margin:6px 0;">3 Active</b>
        <small class="muted">Hindmata · Sion · Milan Subway</small>
      </div>
      <div class="panel" style="text-align:center; padding:20px;">
        <div class="eyebrow">PUMPS RUNNING</div>
        <b style="font-size:32px; color:#2563eb; display:block; margin:6px 0;">${DEMO_PUMPS.filter(p=>p.status==='ACTIVE').length} / ${DEMO_PUMPS.length}</b>
        <small class="muted">Dewatering operational</small>
      </div>
      <div class="panel" style="text-align:center; padding:20px;">
        <div class="eyebrow">PENDING REPORTS</div>
        <b style="font-size:32px; color:#f59e0b; display:block; margin:6px 0;">${DEMO_INCIDENT_REPORTS.filter(r=>r.status==='RECEIVED').length} Pending</b>
        <small class="muted">Awaiting field verification</small>
      </div>
    </div>

    <!-- Road Conditions by Ward -->
    <section class="panel" style="margin-bottom:24px;">
      <h2 style="margin-top:0;">Road Conditions by Ward</h2>
      <p class="muted" style="margin-top:0; font-size:13px;">Live flood risk assessment per BMC ward based on nowcast model output.</p>
      <div style="overflow-x:auto;">
        <table>
          <thead><tr><th>Ward / Corridor</th><th>Risk Level</th><th>Est. Water Depth</th><th>Road Status</th></tr></thead>
          <tbody>
            ${ROAD_CONDITIONS.map(r=>`<tr>
              <td>${r.ward}</td>
              <td><span class="badge" style="background:${r.colour}20; color:${r.colour}; border:1px solid ${r.colour}40;">${r.risk}</span></td>
              <td>${r.depth}</td>
              <td>${r.roads}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <!-- Dewatering Pump Status -->
    <section class="panel" style="margin-bottom:24px;">
      <h2 style="margin-top:0;">Dewatering Pump Operations</h2>
      <div style="display:grid; gap:12px;">
        ${DEMO_PUMPS.map(p=>`
          <div style="display:flex; align-items:center; justify-content:space-between; padding:14px 16px; background:#fafbfc; border-radius:10px; border:1px solid #e2e8f0; flex-wrap:wrap; gap:10px;">
            <div>
              <div style="font-weight:700; font-size:14px;">${esc(p.name)}</div>
              <div class="muted" style="font-size:12px; margin-top:2px;">Ward: ${esc(p.ward)} · Discharge: ${esc(p.discharge)}</div>
            </div>
            <div style="display:flex; align-items:center; gap:12px;">
              <div style="text-align:right;">
                <div style="font-size:11px; color:#556270;">Capacity</div>
                <div style="font-weight:700;">${(p.capacity_lpm/1000).toFixed(0)}K lpm</div>
              </div>
              <span class="badge ${p.status==='ACTIVE'?'low':'muted'}" style="padding:5px 12px;">
                ${p.status==='ACTIVE'?'🟢':'⚪'} ${p.status}
              </span>
              <div style="text-align:center; min-width:44px;">
                <div style="font-size:20px; font-weight:800; color:${p.power_pct>60?'#16a34a':'#64748b'};">${p.power_pct}%</div>
                <div style="font-size:10px; color:#94a3b8;">POWER</div>
              </div>
            </div>
          </div>`).join('')}
      </div>
    </section>

    <!-- Model Hotspot Priorities -->
    <section class="panel">
      <h2 style="margin-top:0;">Model Hotspot Priority Areas</h2>
      ${priorityTable(state.savedHotspots)}
      <a href="#/map" style="display:inline-block; margin-top:8px;">View on Live Ops Map →</a>
    </section>`;
}

function muniTabNotices() {
  return `
    <!-- Active Notices -->
    <section class="panel" style="margin-bottom:24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
        <div>
          <h2 style="margin:0;">Active BMC Flood Notices</h2>
          <p class="muted" style="margin:4px 0 0; font-size:13px;">${DEMO_NOTICES.length} notice(s) currently published to public portal.</p>
        </div>
      </div>
      <div id="muni-notices-list">${noticeCards(DEMO_NOTICES)}</div>
    </section>

    <!-- Broadcast Form -->
    <section class="panel">
      <h2 style="margin-top:0;">📢 Broadcast New Emergency Notice</h2>
      <p class="muted" style="margin-top:0; font-size:13px;">Publish verified diversions and safety notices directly to the public map and citizen portal.</p>
      <form id="admin-notice-form">
        <label class="field-label">NOTICE HEADLINE / TITLE</label>
        <input name="title" minlength="3" maxlength="160" placeholder="e.g., Sion Circle Underpass Temporary Closure" required>

        <label class="field-label">AFFECTED WARD / CORRIDOR</label>
        <input name="area" minlength="2" maxlength="200" placeholder="e.g., F-North Ward (Sion Circle to GTB Nagar)" required>

        <label class="field-label">PUBLIC ADVISORY &amp; DETOUR INSTRUCTIONS</label>
        <textarea name="message" minlength="5" maxlength="4000" placeholder="Enter instructions for drivers, alternative routes, emergency vehicle lanes…" required></textarea>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
          <div>
            <label class="field-label">SEVERITY LEVEL</label>
            <select name="severity">
              <option value="Advisory">Advisory (Caution / Wet Roads)</option>
              <option value="Warning">Warning (Significant Ponding)</option>
              <option value="Closure" selected>Closure (Impassable / Divert)</option>
            </select>
          </div>
          <div>
            <label class="field-label">EXPIRATION TIME</label>
            <input name="expires" type="datetime-local" required>
          </div>
        </div>

        <div style="margin-top:16px;">
          <button type="submit" class="primary">📢 Broadcast Notice to Public Portal</button>
          <span id="admin-notice-status" style="margin-left:12px; font-size:13px; font-weight:600; color:#16a34a;"></span>
        </div>
      </form>
    </section>`;
}

function muniTabComplaints() {
  return `
    <section class="panel">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
        <div>
          <h2 style="margin:0;">Citizen Inundation Reports &amp; Triage Queue</h2>
          <p class="muted" style="margin:4px 0 0; font-size:13px;">Review ground reports, verify water depths, and dispatch emergency response teams.</p>
        </div>
        <button class="secondary" id="refresh-muni-reports" style="width:auto; min-height:36px; padding:6px 14px; font-size:12px;">🔄 Refresh Queue</button>
      </div>
      <div id="muni-reports-list" style="display:grid; gap:14px;">
        ${DEMO_INCIDENT_REPORTS.map(rep => `
          <article class="panel" style="background:#fafbfc; border-left:5px solid ${rep.status==='VERIFIED'?'#16a34a':rep.status==='ACTION_TAKEN'?'#2563eb':rep.status==='RESOLVED'?'#64748b':'#f59e0b'};">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
              <h3 style="margin:0; font-size:16px;">${esc(rep.problem)} · <span id="rep-status-${rep.id}" class="badge ${rep.status==='VERIFIED'?'low':rep.status==='ACTION_TAKEN'?'high':'muted'}">${rep.status}</span></h3>
              <small class="muted">Report ID: <b>${rep.id}</b> · ${rep.observed_at}</small>
            </div>
            <p style="margin:8px 0; font-size:13px;"><b>Location:</b> ${rep.lat.toFixed(4)}° N, ${rep.lon.toFixed(4)}° E — Ward: ${rep.ward}</p>
            <p style="margin:6px 0; font-size:14px;"><b>Water Depth:</b> <span style="font-weight:700; color:#dc2626;">${rep.water_depth_cm} cm</span></p>
            <p style="margin:6px 0; font-size:13px; color:#475569;">${esc(rep.message)}</p>
            <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:12px; border-top:1px solid #e2e8f0; padding-top:10px;">
              ${rep.status==='RECEIVED'?`
                <button class="primary action-btn" data-rep-id="${rep.id}" data-action="VERIFIED" style="font-size:12px;padding:6px 14px;min-height:34px;width:auto;">✅ Verify &amp; Feed to Model</button>
                <button class="secondary action-btn" data-rep-id="${rep.id}" data-action="ACTION_TAKEN" style="font-size:12px;padding:6px 14px;min-height:34px;width:auto;">🚜 Dispatch Response Team</button>
                <button class="secondary action-btn" data-rep-id="${rep.id}" data-action="REJECTED" style="font-size:12px;padding:6px 14px;min-height:34px;width:auto;color:#dc2626;">❌ Reject False Alarm</button>
              `:rep.status==='VERIFIED'?`
                <button class="primary action-btn" data-rep-id="${rep.id}" data-action="ACTION_TAKEN" style="font-size:12px;padding:6px 14px;min-height:34px;width:auto;">🚜 Dispatch Team</button>
                <button class="secondary action-btn" data-rep-id="${rep.id}" data-action="RESOLVED" style="font-size:12px;padding:6px 14px;min-height:34px;width:auto;">🎉 Mark Resolved</button>
              `:rep.status==='ACTION_TAKEN'?`
                <button class="primary action-btn" data-rep-id="${rep.id}" data-action="RESOLVED" style="font-size:12px;padding:6px 14px;min-height:34px;width:auto;">🎉 Mark Resolved / Clear</button>
              `:`<span style="font-size:12px;color:#16a34a;font-weight:700;">✓ Incident Resolved &amp; Street Clear</span>`}
            </div>
          </article>`).join('')}
      </div>
    </section>`;
}

function renderMunicipalityDashboard(activeTab='tab-dashboard') {
  const user = getUserSession();
  const tabContent = activeTab==='tab-notices' ? muniTabNotices()
                   : activeTab==='tab-complaints' ? muniTabComplaints()
                   : muniTabDashboard();

  $('content-page').innerHTML = `
    <div class="page-heading">
      <div>
        <div class="eyebrow">BMC DISASTER MANAGEMENT COMMAND CENTRE · MUNICIPAL CONSOLE</div>
        <h1>Municipality Operations Dashboard</h1>
        <p>Flood command, incident triage, emergency broadcasts and road risk monitoring.</p>
        <div style="margin-top:12px; display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
          <span style="background:rgba(255,255,255,0.2); padding:6px 14px; border-radius:99px; font-size:12px; font-weight:700;">
            🏛️ ${esc(user.name)}
          </span>
          <button id="muni-dash-logout-btn" class="portal-link" style="background:#dc2626;color:#fff;border:none;padding:7px 16px;border-radius:99px;font-size:12px;font-weight:700;cursor:pointer;">
            🚪 Sign Out ⏻
          </button>
        </div>
      </div>
    </div>

    ${muniTabBar(activeTab)}
    <div id="muni-tab-content">${tabContent}</div>
  `;

  // Tab switching
  document.querySelectorAll('.muni-tab-btn').forEach(btn => {
    btn.onclick = () => renderMunicipalityDashboard(btn.dataset.tab);
  });

  // Action buttons (complaints tab)
  document.querySelectorAll('.action-btn').forEach(btn => {
    btn.onclick = () => {
      const rep = DEMO_INCIDENT_REPORTS.find(r => r.id === btn.dataset.repId);
      if(rep) { rep.status = btn.dataset.action; renderMunicipalityDashboard('tab-complaints'); }
    };
  });

  const refreshBtn = $('refresh-muni-reports');
  if(refreshBtn) refreshBtn.onclick = () => renderMunicipalityDashboard('tab-complaints');

  // Notice broadcast form
  const form = $('admin-notice-form');
  if(form) form.onsubmit = e => {
    e.preventDefault();
    const vals = new FormData(form);
    DEMO_NOTICES.unshift({
      id: 'notice-' + Date.now(),
      severity: vals.get('severity'),
      title: vals.get('title'),
      area: vals.get('area'),
      message: vals.get('message'),
      expires_at: new Date(vals.get('expires')).toLocaleString(),
      is_demo: true, status: 'PUBLISHED'
    });
    renderMunicipalityDashboard('tab-notices');
  };

  const logoutBtn = $('muni-dash-logout-btn');
  if(logoutBtn) logoutBtn.onclick = logoutUser;
}




// ----------------------------------------------------
// PUBLIC CITY DASHBOARD
// ----------------------------------------------------
function renderPublicDashboard(){
  $('content-page').innerHTML = `
    ${heading('MUMBAI FLOOD MONITORING','City Flood &amp; Civic Dashboard','Real-time municipal flood warnings, road safety advisories, and model priority areas.')}
    
    <section class="panel" style="margin-bottom:24px;">
      <h2>Active BMC Municipal Flood Notices &amp; Warnings</h2>
      <div id="public-notices" role="status">Loading notices…</div>
    </section>

    <section class="panel">
      <h2>Model Hotspot Priority Basins</h2>
      ${priorityTable(state.savedHotspots)}
      <a href="#/map" style="display:inline-block; margin-top:8px;">Explore on Live Map →</a>
    </section>

    <section class="panel" style="margin-top:24px; background:#f8fafc;">
      <h3 style="margin-top:0;">Emergency Municipal Helplines (Mumbai)</h3>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; font-size:13px;">
        <div><b>BMC Disaster Management Cell:</b> <a href="tel:1916">1916</a></div>
        <div><b>Emergency Response Support:</b> <a href="tel:112">112</a></div>
        <div><b>Mumbai Traffic Police Helpline:</b> <a href="tel:8454999999">8454-999-999</a></div>
        <div><b>Ambulance / Medical Emergency:</b> <a href="tel:108">108</a></div>
      </div>
    </section>
  `;

  if($('public-notices')) $('public-notices').innerHTML = noticeCards(DEMO_NOTICES);
}

// Main civic dashboard router
async function renderCivicDashboard(municipal=false){
  clearPrivatePhotos();
  const session = getUserSession();
  if(session.role === 'municipality' || municipal){
    renderMunicipalityDashboard();
  } else {
    renderPublicDashboard();
  }
}

async function prepareReportPhoto(file){
  if(!file)return null;
  if(!file.type.startsWith('image/')||file.size>10*1024*1024)throw Error('Choose an image smaller than 10 MB.');
  const bitmap=await createImageBitmap(file);
  try{
    const scale=Math.min(1,1024/Math.max(bitmap.width,bitmap.height));
    const canvas=document.createElement('canvas');
    canvas.width=Math.max(1,Math.round(bitmap.width*scale));
    canvas.height=Math.max(1,Math.round(bitmap.height*scale));
    canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);
    let result=canvas.toDataURL('image/jpeg',.7);
    if(result.length>333350)result=canvas.toDataURL('image/jpeg',.45);
    if(result.length>333350)throw Error('Photo is too detailed. Choose a smaller image.');
    return result;
  }finally{
    bitmap.close();
  }
}

window.renderCivicDashboard = renderCivicDashboard;
window.renderMunicipalLogin = renderMunicipalLogin;
window.renderMunicipalityDashboard = renderMunicipalityDashboard;
window.renderAdminDashboard = renderMunicipalityDashboard;
window.renderOfficerDashboard = renderMunicipalityDashboard;
window.renderPublicDashboard = renderPublicDashboard;
window.priorityTable = priorityTable;
window.noticeCards = noticeCards;
window.prepareReportPhoto = prepareReportPhoto;



