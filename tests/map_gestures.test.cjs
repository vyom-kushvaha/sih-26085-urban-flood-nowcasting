const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

function setup(platform='Win32') {
  const events=new Map(),timers=new Map();let timerId=0,dragging=true,unload;
  const hint={hidden:true,textContent:'',setAttribute(){},remove(){this.removed=true}};
  const container={appendChild(){},classList:{add(){},remove(){}},
    addEventListener(type,callback,options){events.set(type,{callback,options})},removeEventListener(type){events.delete(type)}};
  const map={getContainer:()=>container,dragging:{enable(){dragging=true},disable(){dragging=false}},once:(_,cb)=>unload=cb};
  const environment={navigator:{platform},setTimeout(cb,ms){timers.set(++timerId,{cb,ms});return timerId},clearTimeout(id){timers.delete(id)}};
  const context=vm.createContext({document:{createElement:()=>hint},map,environment});
  vm.runInContext(fs.readFileSync('frontend/map-gestures.js','utf8')+'\ninstallMapGestures(map,environment);',context);
  return {hint,timers,events,dragging:()=>dragging,unload:()=>unload(),fire(type,props={}){
    const e={target:{closest:()=>null},stopped:false,prevented:false,stopImmediatePropagation(){this.stopped=true},preventDefault(){this.prevented=true},...props};
    events.get(type).callback(e);return e;
  }};
}
test('plain wheel scrolls page; Ctrl/Cmd wheel reaches native map zoom',()=>{
  const a=setup();
  const plain=a.fire('wheel',{deltaY:120});
  assert.equal(plain.prevented,false);assert.equal(plain.stopped,true);
  assert.match(a.hint.textContent,/Ctrl/);
  for(const key of ['ctrlKey','metaKey']){
    const allowed=a.fire('wheel',{deltaY:120,[key]:true});
    assert.equal(allowed.stopped,false);assert.equal(a.hint.hidden,true);
    const next=a.fire('wheel',{deltaY:120});assert.equal(next.stopped,true);
  }
});
test('single finger stays native page scroll and a two-finger gesture reaches Leaflet pinch',()=>{
  const a=setup(),finger=(x,y)=>({clientX:x,clientY:y});
  a.fire('pointerdown',{pointerType:'touch'});assert.equal(a.dragging(),false);
  a.fire('touchstart',{touches:[finger(100,100)]});
  const swipe=a.fire('touchmove',{touches:[finger(100,150)]});
  assert.equal(swipe.prevented,false);assert.equal(swipe.stopped,false);
  assert.match(a.hint.textContent,/two fingers/);
  const pinch=a.fire('touchstart',{touches:[finger(100,150),finger(160,150)]});
  assert.equal(pinch.stopped,false);assert.equal(a.hint.hidden,true);
  a.fire('touchmove',{touches:[finger(80,180),finger(190,180)]});
  a.fire('touchend',{touches:[]});
  assert.equal(a.fire('click').stopped,true);
  a.fire('pointerdown',{pointerType:'mouse'});assert.equal(a.dragging(),true);
});
test('simple taps and zoom buttons remain available',()=>{
  const a=setup();
  a.fire('touchstart',{touches:[{clientX:10,clientY:10}]});a.fire('touchend',{touches:[]});
  assert.equal(a.fire('click').stopped,false);
  a.fire('touchstart',{touches:[{},{}]});a.fire('touchcancel',{touches:[]});
  assert.equal(a.fire('click',{target:{closest:()=>({})}}).stopped,false);
});
test('hint expires after 1.2 seconds and map teardown removes listeners',()=>{
  const a=setup('MacIntel');a.fire('wheel',{deltaY:120});assert.match(a.hint.textContent,/⌘/);
  const timer=[...a.timers.values()][0];assert.equal(timer.ms,1200);timer.cb();assert.equal(a.hint.hidden,true);
  a.unload();assert.equal(a.events.size,0);assert.equal(a.hint.removed,true);
});
