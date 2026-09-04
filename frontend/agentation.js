(()=>{var j4=Object.create;var wb=Object.defineProperty;var I4=Object.getOwnPropertyDescriptor;var Y4=Object.getOwnPropertyNames;var X4=Object.getPrototypeOf,q4=Object.prototype.hasOwnProperty;var V4=(i,s,u)=>()=>{if(u)throw u[0];try{return i&&(s=i(i=0)),s}catch(f){throw u=[f],f}};var ha=(i,s)=>()=>{try{return s||i((s={exports:{}}).exports,s),s.exports}catch(u){throw s=0,u}};var Q4=(i,s,u,f)=>{if(s&&typeof s=="object"||typeof s=="function")for(let h of Y4(s))!q4.call(i,h)&&h!==u&&wb(i,h,{get:()=>s[h],enumerable:!(f=I4(s,h))||f.enumerable});return i};var kn=(i,s,u)=>(u=i!=null?j4(X4(i)):{},Q4(s||!i||!i.__esModule?wb(u,"default",{value:i,enumerable:!0}):u,i));var Sb=ha((Ct,Nh)=>{"use strict";(function(){function i(_,T){Object.defineProperty(f.prototype,_,{get:function(){console.warn("%s(...) is deprecated in plain JavaScript React classes. %s",T[0],T[1])}})}function s(_){return _===null||typeof _!="object"?null:(_=nl&&_[nl]||_["@@iterator"],typeof _=="function"?_:null)}function u(_,T){_=(_=_.constructor)&&(_.displayName||_.name)||"ReactClass";var W=_+"."+T;xe[W]||(console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",T,_),xe[W]=!0)}function f(_,T,W){this.props=_,this.context=T,this.refs=fo,this.updater=W||po}function h(){}function y(_,T,W){this.props=_,this.context=T,this.refs=fo,this.updater=W||po}function k(){}function E(_){return""+_}function A(_){try{E(_);var T=!1}catch{T=!0}if(T){T=console;var W=T.error,se=typeof Symbol=="function"&&Symbol.toStringTag&&_[Symbol.toStringTag]||_.constructor.name||"Object";return W.call(T,"The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",se),E(_)}}function ie(_){if(_==null)return null;if(typeof _=="function")return _.$$typeof===So?null:_.displayName||_.name||null;if(typeof _=="string")return _;switch(_){case Ee:return"Fragment";case Q:return"Profiler";case vt:return"StrictMode";case Rn:return"Suspense";case Oo:return"SuspenseList";case eo:return"Activity"}if(typeof _=="object")switch(typeof _.tag=="number"&&console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),_.$$typeof){case oe:return"Portal";case at:return _.displayName||"Context";case qe:return(_._context.displayName||"Context")+".Consumer";case ht:var T=_.render;return _=_.displayName,_||(_=T.displayName||T.name||"",_=_!==""?"ForwardRef("+_+")":"ForwardRef"),_;case It:return T=_.displayName||null,T!==null?T:ie(_.type)||"Memo";case En:T=_._payload,_=_._init;try{return ie(_(T))}catch{}}return null}function B(_){if(_===Ee)return"<>";if(typeof _=="object"&&_!==null&&_.$$typeof===En)return"<...>";try{var T=ie(_);return T?"<"+T+">":"<...>"}catch{return"<...>"}}function $(){var _=we.A;return _===null?null:_.getOwner()}function v(){return Error("react-stack-top-frame")}function Z(_){if(pe.call(_,"key")){var T=Object.getOwnPropertyDescriptor(_,"key").get;if(T&&T.isReactWarning)return!1}return _.key!==void 0}function X(_,T){function W(){lt||(lt=!0,console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",T))}W.isReactWarning=!0,Object.defineProperty(_,"key",{get:W,configurable:!0})}function re(){var _=ie(this.type);return Je[_]||(Je[_]=!0,console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")),_=this.props.ref,_!==void 0?_:null}function j(_,T,W,se,K,Ae){var be=W.ref;return _={$$typeof:ye,type:_,key:T,props:W,_owner:se},(be!==void 0?be:null)!==null?Object.defineProperty(_,"ref",{enumerable:!1,get:re}):Object.defineProperty(_,"ref",{enumerable:!1,value:null}),_._store={},Object.defineProperty(_._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:0}),Object.defineProperty(_,"_debugInfo",{configurable:!1,enumerable:!1,writable:!0,value:null}),Object.defineProperty(_,"_debugStack",{configurable:!1,enumerable:!1,writable:!0,value:K}),Object.defineProperty(_,"_debugTask",{configurable:!1,enumerable:!1,writable:!0,value:Ae}),Object.freeze&&(Object.freeze(_.props),Object.freeze(_)),_}function J(_,T){return T=j(_.type,T,_.props,_._owner,_._debugStack,_._debugTask),_._store&&(T._store.validated=_._store.validated),T}function De(_){Ie(_)?_._store&&(_._store.validated=1):typeof _=="object"&&_!==null&&_.$$typeof===En&&(_._payload.status==="fulfilled"?Ie(_._payload.value)&&_._payload.value._store&&(_._payload.value._store.validated=1):_._store&&(_._store.validated=1))}function Ie(_){return typeof _=="object"&&_!==null&&_.$$typeof===ye}function Ge(_){var T={"=":"=0",":":"=2"};return"$"+_.replace(/[=:]/g,function(W){return T[W]})}function $t(_,T){return typeof _=="object"&&_!==null&&_.key!=null?(A(_.key),Ge(""+_.key)):T.toString(36)}function jt(_){switch(_.status){case"fulfilled":return _.value;case"rejected":throw _.reason;default:switch(typeof _.status=="string"?_.then(k,k):(_.status="pending",_.then(function(T){_.status==="pending"&&(_.status="fulfilled",_.value=T)},function(T){_.status==="pending"&&(_.status="rejected",_.reason=T)})),_.status){case"fulfilled":return _.value;case"rejected":throw _.reason}}throw _}function Me(_,T,W,se,K){var Ae=typeof _;(Ae==="undefined"||Ae==="boolean")&&(_=null);var be=!1;if(_===null)be=!0;else switch(Ae){case"bigint":case"string":case"number":be=!0;break;case"object":switch(_.$$typeof){case ye:case oe:be=!0;break;case En:return be=_._init,Me(be(_._payload),T,W,se,K)}}if(be){be=_,K=K(be);var Te=se===""?"."+$t(be,0):se;return Qt(K)?(W="",Te!=null&&(W=Te.replace(kt,"$&/")+"/"),Me(K,T,W,"",function(xt){return xt})):K!=null&&(Ie(K)&&(K.key!=null&&(be&&be.key===K.key||A(K.key)),W=J(K,W+(K.key==null||be&&be.key===K.key?"":(""+K.key).replace(kt,"$&/")+"/")+Te),se!==""&&be!=null&&Ie(be)&&be.key==null&&be._store&&!be._store.validated&&(W._store.validated=2),K=W),T.push(K)),1}if(be=0,Te=se===""?".":se+":",Qt(_))for(var ae=0;ae<_.length;ae++)se=_[ae],Ae=Te+$t(se,ae),be+=Me(se,T,W,Ae,K);else if(ae=s(_),typeof ae=="function")for(ae===_.entries&&(Ot||console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),Ot=!0),_=ae.call(_),ae=0;!(se=_.next()).done;)se=se.value,Ae=Te+$t(se,ae++),be+=Me(se,T,W,Ae,K);else if(Ae==="object"){if(typeof _.then=="function")return Me(jt(_),T,W,se,K);throw T=String(_),Error("Objects are not valid as a React child (found: "+(T==="[object Object]"?"object with keys {"+Object.keys(_).join(", ")+"}":T)+"). If you meant to render a collection of children, use an array instead.")}return be}function Xe(_,T,W){if(_==null)return _;var se=[],K=0;return Me(_,se,"","",function(Ae){return T.call(W,Ae,K++)}),se}function wt(_){if(_._status===-1){var T=_._ioInfo;T!=null&&(T.start=T.end=performance.now()),T=_._result;var W=T();if(W.then(function(K){if(_._status===0||_._status===-1){_._status=1,_._result=K;var Ae=_._ioInfo;Ae!=null&&(Ae.end=performance.now()),W.status===void 0&&(W.status="fulfilled",W.value=K)}},function(K){if(_._status===0||_._status===-1){_._status=2,_._result=K;var Ae=_._ioInfo;Ae!=null&&(Ae.end=performance.now()),W.status===void 0&&(W.status="rejected",W.reason=K)}}),T=_._ioInfo,T!=null){T.value=W;var se=W.displayName;typeof se=="string"&&(T.name=se)}_._status===-1&&(_._status=0,_._result=W)}if(_._status===1)return T=_._result,T===void 0&&console.error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,T),"default"in T||console.error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,T),T.default;throw _._result}function ue(){var _=we.H;return _===null&&console.error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`),_}function Ve(){we.asyncTransitions--}function Ye(_){if(I===null)try{var T=("require"+Math.random()).slice(0,7);I=(Nh&&Nh[T]).call(Nh,"timers").setImmediate}catch{I=function(se){H===!1&&(H=!0,typeof MessageChannel>"u"&&console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));var K=new MessageChannel;K.port1.onmessage=se,K.port2.postMessage(void 0)}}return I(_)}function Be(_){return 1<_.length&&typeof AggregateError=="function"?new AggregateError(_):_[0]}function Fe(_,T){T!==te-1&&console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "),te=T}function ne(_,T,W){var se=we.actQueue;if(se!==null)if(se.length!==0)try{me(se),Ye(function(){return ne(_,T,W)});return}catch(K){we.thrownErrors.push(K)}else we.actQueue=null;0<we.thrownErrors.length?(se=Be(we.thrownErrors),we.thrownErrors.length=0,W(se)):T(_)}function me(_){if(!Oe){Oe=!0;var T=0;try{for(;T<_.length;T++){var W=_[T];do{we.didUsePromise=!1;var se=W(!1);if(se!==null){if(we.didUsePromise){_[T]=W,_.splice(0,T);return}W=se}else break}while(!0)}_.length=0}catch(K){_.splice(0,T+1),we.thrownErrors.push(K)}finally{Oe=!1}}}typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());var ye=Symbol.for("react.transitional.element"),oe=Symbol.for("react.portal"),Ee=Symbol.for("react.fragment"),vt=Symbol.for("react.strict_mode"),Q=Symbol.for("react.profiler"),qe=Symbol.for("react.consumer"),at=Symbol.for("react.context"),ht=Symbol.for("react.forward_ref"),Rn=Symbol.for("react.suspense"),Oo=Symbol.for("react.suspense_list"),It=Symbol.for("react.memo"),En=Symbol.for("react.lazy"),eo=Symbol.for("react.activity"),nl=Symbol.iterator,xe={},po={isMounted:function(){return!1},enqueueForceUpdate:function(_){u(_,"forceUpdate")},enqueueReplaceState:function(_){u(_,"replaceState")},enqueueSetState:function(_){u(_,"setState")}},Yn=Object.assign,fo={};Object.freeze(fo),f.prototype.isReactComponent={},f.prototype.setState=function(_,T){if(typeof _!="object"&&typeof _!="function"&&_!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,_,T,"setState")},f.prototype.forceUpdate=function(_){this.updater.enqueueForceUpdate(this,_,"forceUpdate")};var sn={isMounted:["isMounted","Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],replaceState:["replaceState","Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]};for(de in sn)sn.hasOwnProperty(de)&&i(de,sn[de]);h.prototype=f.prototype,sn=y.prototype=new h,sn.constructor=y,Yn(sn,f.prototype),sn.isPureReactComponent=!0;var Qt=Array.isArray,So=Symbol.for("react.client.reference"),we={H:null,A:null,T:null,S:null,actQueue:null,asyncTransitions:0,isBatchingLegacy:!1,didScheduleLegacyUpdate:!1,didUsePromise:!1,thrownErrors:[],getCurrentStack:null,recentlyCreatedOwnerStacks:0},pe=Object.prototype.hasOwnProperty,Se=console.createTask?console.createTask:function(){return null};sn={react_stack_bottom_frame:function(_){return _()}};var lt,it,Je={},Bt=sn.react_stack_bottom_frame.bind(sn,v)(),Zt=Se(B(v)),Ot=!1,kt=/\/+/g,Ze=typeof reportError=="function"?reportError:function(_){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var T=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof _=="object"&&_!==null&&typeof _.message=="string"?String(_.message):String(_),error:_});if(!window.dispatchEvent(T))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",_);return}console.error(_)},H=!1,I=null,te=0,le=!1,Oe=!1,Ue=typeof queueMicrotask=="function"?function(_){queueMicrotask(function(){return queueMicrotask(_)})}:Ye;sn=Object.freeze({__proto__:null,c:function(_){return ue().useMemoCache(_)}});var de={map:Xe,forEach:function(_,T,W){Xe(_,function(){T.apply(this,arguments)},W)},count:function(_){var T=0;return Xe(_,function(){T++}),T},toArray:function(_){return Xe(_,function(T){return T})||[]},only:function(_){if(!Ie(_))throw Error("React.Children.only expected to receive a single React element child.");return _}};Ct.Activity=eo,Ct.Children=de,Ct.Component=f,Ct.Fragment=Ee,Ct.Profiler=Q,Ct.PureComponent=y,Ct.StrictMode=vt,Ct.Suspense=Rn,Ct.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=we,Ct.__COMPILER_RUNTIME=sn,Ct.act=function(_){var T=we.actQueue,W=te;te++;var se=we.actQueue=T!==null?T:[],K=!1;try{var Ae=_()}catch(ae){we.thrownErrors.push(ae)}if(0<we.thrownErrors.length)throw Fe(T,W),_=Be(we.thrownErrors),we.thrownErrors.length=0,_;if(Ae!==null&&typeof Ae=="object"&&typeof Ae.then=="function"){var be=Ae;return Ue(function(){K||le||(le=!0,console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"))}),{then:function(ae,xt){K=!0,be.then(function(pt){if(Fe(T,W),W===0){try{me(se),Ye(function(){return ne(pt,ae,xt)})}catch(Ht){we.thrownErrors.push(Ht)}if(0<we.thrownErrors.length){var st=Be(we.thrownErrors);we.thrownErrors.length=0,xt(st)}}else ae(pt)},function(pt){Fe(T,W),0<we.thrownErrors.length&&(pt=Be(we.thrownErrors),we.thrownErrors.length=0),xt(pt)})}}}var Te=Ae;if(Fe(T,W),W===0&&(me(se),se.length!==0&&Ue(function(){K||le||(le=!0,console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"))}),we.actQueue=null),0<we.thrownErrors.length)throw _=Be(we.thrownErrors),we.thrownErrors.length=0,_;return{then:function(ae,xt){K=!0,W===0?(we.actQueue=se,Ye(function(){return ne(Te,ae,xt)})):ae(Te)}}},Ct.cache=function(_){return function(){return _.apply(null,arguments)}},Ct.cacheSignal=function(){return null},Ct.captureOwnerStack=function(){var _=we.getCurrentStack;return _===null?null:_()},Ct.cloneElement=function(_,T,W){if(_==null)throw Error("The argument must be a React element, but you passed "+_+".");var se=Yn({},_.props),K=_.key,Ae=_._owner;if(T!=null){var be;e:{if(pe.call(T,"ref")&&(be=Object.getOwnPropertyDescriptor(T,"ref").get)&&be.isReactWarning){be=!1;break e}be=T.ref!==void 0}be&&(Ae=$()),Z(T)&&(A(T.key),K=""+T.key);for(Te in T)!pe.call(T,Te)||Te==="key"||Te==="__self"||Te==="__source"||Te==="ref"&&T.ref===void 0||(se[Te]=T[Te])}var Te=arguments.length-2;if(Te===1)se.children=W;else if(1<Te){be=Array(Te);for(var ae=0;ae<Te;ae++)be[ae]=arguments[ae+2];se.children=be}for(se=j(_.type,K,se,Ae,_._debugStack,_._debugTask),K=2;K<arguments.length;K++)De(arguments[K]);return se},Ct.createContext=function(_){return _={$$typeof:at,_currentValue:_,_currentValue2:_,_threadCount:0,Provider:null,Consumer:null},_.Provider=_,_.Consumer={$$typeof:qe,_context:_},_._currentRenderer=null,_._currentRenderer2=null,_},Ct.createElement=function(_,T,W){for(var se=2;se<arguments.length;se++)De(arguments[se]);se={};var K=null;if(T!=null)for(ae in it||!("__self"in T)||"key"in T||(it=!0,console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")),Z(T)&&(A(T.key),K=""+T.key),T)pe.call(T,ae)&&ae!=="key"&&ae!=="__self"&&ae!=="__source"&&(se[ae]=T[ae]);var Ae=arguments.length-2;if(Ae===1)se.children=W;else if(1<Ae){for(var be=Array(Ae),Te=0;Te<Ae;Te++)be[Te]=arguments[Te+2];Object.freeze&&Object.freeze(be),se.children=be}if(_&&_.defaultProps)for(ae in Ae=_.defaultProps,Ae)se[ae]===void 0&&(se[ae]=Ae[ae]);K&&X(se,typeof _=="function"?_.displayName||_.name||"Unknown":_);var ae=1e4>we.recentlyCreatedOwnerStacks++;return j(_,K,se,$(),ae?Error("react-stack-top-frame"):Bt,ae?Se(B(_)):Zt)},Ct.createRef=function(){var _={current:null};return Object.seal(_),_},Ct.forwardRef=function(_){_!=null&&_.$$typeof===It?console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."):typeof _!="function"?console.error("forwardRef requires a render function but was given %s.",_===null?"null":typeof _):_.length!==0&&_.length!==2&&console.error("forwardRef render functions accept exactly two parameters: props and ref. %s",_.length===1?"Did you forget to use the ref parameter?":"Any additional parameter will be undefined."),_!=null&&_.defaultProps!=null&&console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");var T={$$typeof:ht,render:_},W;return Object.defineProperty(T,"displayName",{enumerable:!1,configurable:!0,get:function(){return W},set:function(se){W=se,_.name||_.displayName||(Object.defineProperty(_,"name",{value:se}),_.displayName=se)}}),T},Ct.isValidElement=Ie,Ct.lazy=function(_){_={_status:-1,_result:_};var T={$$typeof:En,_payload:_,_init:wt},W={name:"lazy",start:-1,end:-1,value:null,owner:null,debugStack:Error("react-stack-top-frame"),debugTask:console.createTask?console.createTask("lazy()"):null};return _._ioInfo=W,T._debugInfo=[{awaited:W}],T},Ct.memo=function(_,T){_==null&&console.error("memo: The first argument must be a component. Instead received: %s",_===null?"null":typeof _),T={$$typeof:It,type:_,compare:T===void 0?null:T};var W;return Object.defineProperty(T,"displayName",{enumerable:!1,configurable:!0,get:function(){return W},set:function(se){W=se,_.name||_.displayName||(Object.defineProperty(_,"name",{value:se}),_.displayName=se)}}),T},Ct.startTransition=function(_){var T=we.T,W={};W._updatedFibers=new Set,we.T=W;try{var se=_(),K=we.S;K!==null&&K(W,se),typeof se=="object"&&se!==null&&typeof se.then=="function"&&(we.asyncTransitions++,se.then(Ve,Ve),se.then(k,Ze))}catch(Ae){Ze(Ae)}finally{T===null&&W._updatedFibers&&(_=W._updatedFibers.size,W._updatedFibers.clear(),10<_&&console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")),T!==null&&W.types!==null&&(T.types!==null&&T.types!==W.types&&console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."),T.types=W.types),we.T=T}},Ct.unstable_useCacheRefresh=function(){return ue().useCacheRefresh()},Ct.use=function(_){return ue().use(_)},Ct.useActionState=function(_,T,W){return ue().useActionState(_,T,W)},Ct.useCallback=function(_,T){return ue().useCallback(_,T)},Ct.useContext=function(_){var T=ue();return _.$$typeof===qe&&console.error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"),T.useContext(_)},Ct.useDebugValue=function(_,T){return ue().useDebugValue(_,T)},Ct.useDeferredValue=function(_,T){return ue().useDeferredValue(_,T)},Ct.useEffect=function(_,T){return _==null&&console.warn("React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"),ue().useEffect(_,T)},Ct.useEffectEvent=function(_){return ue().useEffectEvent(_)},Ct.useId=function(){return ue().useId()},Ct.useImperativeHandle=function(_,T,W){return ue().useImperativeHandle(_,T,W)},Ct.useInsertionEffect=function(_,T){return _==null&&console.warn("React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"),ue().useInsertionEffect(_,T)},Ct.useLayoutEffect=function(_,T){return _==null&&console.warn("React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"),ue().useLayoutEffect(_,T)},Ct.useMemo=function(_,T){return ue().useMemo(_,T)},Ct.useOptimistic=function(_,T){return ue().useOptimistic(_,T)},Ct.useReducer=function(_,T,W){return ue().useReducer(_,T,W)},Ct.useRef=function(_){return ue().useRef(_)},Ct.useState=function(_){return ue().useState(_)},Ct.useSyncExternalStore=function(_,T,W){return ue().useSyncExternalStore(_,T,W)},Ct.useTransition=function(){return ue().useTransition()},Ct.version="19.2.8",typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())})()});var Dl=ha((f7,Cb)=>{"use strict";Cb.exports=Sb()});var kb=ha(zn=>{"use strict";(function(){function i(){if(Ge=!1,Xe){var ne=zn.unstable_now();Ve=ne;var me=!0;try{e:{De=!1,Ie&&(Ie=!1,jt(wt),wt=-1),J=!0;var ye=j;try{t:{for(y(ne),re=u(v);re!==null&&!(re.expirationTime>ne&&E());){var oe=re.callback;if(typeof oe=="function"){re.callback=null,j=re.priorityLevel;var Ee=oe(re.expirationTime<=ne);if(ne=zn.unstable_now(),typeof Ee=="function"){re.callback=Ee,y(ne),me=!0;break t}re===u(v)&&f(v),y(ne)}else f(v);re=u(v)}if(re!==null)me=!0;else{var vt=u(Z);vt!==null&&A(k,vt.startTime-ne),me=!1}}break e}finally{re=null,j=ye,J=!1}me=void 0}}finally{me?Ye():Xe=!1}}}function s(ne,me){var ye=ne.length;ne.push(me);e:for(;0<ye;){var oe=ye-1>>>1,Ee=ne[oe];if(0<h(Ee,me))ne[oe]=me,ne[ye]=Ee,ye=oe;else break e}}function u(ne){return ne.length===0?null:ne[0]}function f(ne){if(ne.length===0)return null;var me=ne[0],ye=ne.pop();if(ye!==me){ne[0]=ye;e:for(var oe=0,Ee=ne.length,vt=Ee>>>1;oe<vt;){var Q=2*(oe+1)-1,qe=ne[Q],at=Q+1,ht=ne[at];if(0>h(qe,ye))at<Ee&&0>h(ht,qe)?(ne[oe]=ht,ne[at]=ye,oe=at):(ne[oe]=qe,ne[Q]=ye,oe=Q);else if(at<Ee&&0>h(ht,ye))ne[oe]=ht,ne[at]=ye,oe=at;else break e}}return me}function h(ne,me){var ye=ne.sortIndex-me.sortIndex;return ye!==0?ye:ne.id-me.id}function y(ne){for(var me=u(Z);me!==null;){if(me.callback===null)f(Z);else if(me.startTime<=ne)f(Z),me.sortIndex=me.expirationTime,s(v,me);else break;me=u(Z)}}function k(ne){if(Ie=!1,y(ne),!De)if(u(v)!==null)De=!0,Xe||(Xe=!0,Ye());else{var me=u(Z);me!==null&&A(k,me.startTime-ne)}}function E(){return Ge?!0:!(zn.unstable_now()-Ve<ue)}function A(ne,me){wt=$t(function(){ne(zn.unstable_now())},me)}if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error()),zn.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var ie=performance;zn.unstable_now=function(){return ie.now()}}else{var B=Date,$=B.now();zn.unstable_now=function(){return B.now()-$}}var v=[],Z=[],X=1,re=null,j=3,J=!1,De=!1,Ie=!1,Ge=!1,$t=typeof setTimeout=="function"?setTimeout:null,jt=typeof clearTimeout=="function"?clearTimeout:null,Me=typeof setImmediate<"u"?setImmediate:null,Xe=!1,wt=-1,ue=5,Ve=-1;if(typeof Me=="function")var Ye=function(){Me(i)};else if(typeof MessageChannel<"u"){var Be=new MessageChannel,Fe=Be.port2;Be.port1.onmessage=i,Ye=function(){Fe.postMessage(null)}}else Ye=function(){$t(i,0)};zn.unstable_IdlePriority=5,zn.unstable_ImmediatePriority=1,zn.unstable_LowPriority=4,zn.unstable_NormalPriority=3,zn.unstable_Profiling=null,zn.unstable_UserBlockingPriority=2,zn.unstable_cancelCallback=function(ne){ne.callback=null},zn.unstable_forceFrameRate=function(ne){0>ne||125<ne?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):ue=0<ne?Math.floor(1e3/ne):5},zn.unstable_getCurrentPriorityLevel=function(){return j},zn.unstable_next=function(ne){switch(j){case 1:case 2:case 3:var me=3;break;default:me=j}var ye=j;j=me;try{return ne()}finally{j=ye}},zn.unstable_requestPaint=function(){Ge=!0},zn.unstable_runWithPriority=function(ne,me){switch(ne){case 1:case 2:case 3:case 4:case 5:break;default:ne=3}var ye=j;j=ne;try{return me()}finally{j=ye}},zn.unstable_scheduleCallback=function(ne,me,ye){var oe=zn.unstable_now();switch(typeof ye=="object"&&ye!==null?(ye=ye.delay,ye=typeof ye=="number"&&0<ye?oe+ye:oe):ye=oe,ne){case 1:var Ee=-1;break;case 2:Ee=250;break;case 5:Ee=1073741823;break;case 4:Ee=1e4;break;default:Ee=5e3}return Ee=ye+Ee,ne={id:X++,callback:me,priorityLevel:ne,startTime:ye,expirationTime:Ee,sortIndex:-1},ye>oe?(ne.sortIndex=ye,s(Z,ne),u(v)===null&&ne===u(Z)&&(Ie?(jt(wt),wt=-1):Ie=!0,A(k,ye-oe))):(ne.sortIndex=Ee,s(v,ne),De||J||(De=!0,Xe||(Xe=!0,Ye()))),ne},zn.unstable_shouldYield=E,zn.unstable_wrapCallback=function(ne){var me=j;return function(){var ye=j;j=me;try{return ne.apply(this,arguments)}finally{j=ye}}},typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())})()});var Mb=ha((_7,Eb)=>{"use strict";Eb.exports=kb()});var Tb=ha(Jo=>{"use strict";(function(){function i(){}function s($){return""+$}function u($,v,Z){var X=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;try{s(X);var re=!1}catch{re=!0}return re&&(console.error("The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",typeof Symbol=="function"&&Symbol.toStringTag&&X[Symbol.toStringTag]||X.constructor.name||"Object"),s(X)),{$$typeof:ie,key:X==null?null:""+X,children:$,containerInfo:v,implementation:Z}}function f($,v){if($==="font")return"";if(typeof v=="string")return v==="use-credentials"?v:""}function h($){return $===null?"`null`":$===void 0?"`undefined`":$===""?"an empty string":'something with type "'+typeof $+'"'}function y($){return $===null?"`null`":$===void 0?"`undefined`":$===""?"an empty string":typeof $=="string"?JSON.stringify($):typeof $=="number"?"`"+$+"`":'something with type "'+typeof $+'"'}function k(){var $=B.H;return $===null&&console.error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`),$}typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());var E=Dl(),A={d:{f:i,r:function(){throw Error("Invalid form element. requestFormReset must be passed a form that was rendered by React.")},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},ie=Symbol.for("react.portal"),B=E.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;typeof Map=="function"&&Map.prototype!=null&&typeof Map.prototype.forEach=="function"&&typeof Set=="function"&&Set.prototype!=null&&typeof Set.prototype.clear=="function"&&typeof Set.prototype.forEach=="function"||console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"),Jo.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=A,Jo.createPortal=function($,v){var Z=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!v||v.nodeType!==1&&v.nodeType!==9&&v.nodeType!==11)throw Error("Target container is not a DOM element.");return u($,v,null,Z)},Jo.flushSync=function($){var v=B.T,Z=A.p;try{if(B.T=null,A.p=2,$)return $()}finally{B.T=v,A.p=Z,A.d.f()&&console.error("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.")}},Jo.preconnect=function($,v){typeof $=="string"&&$?v!=null&&typeof v!="object"?console.error("ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.",y(v)):v!=null&&typeof v.crossOrigin!="string"&&console.error("ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.",h(v.crossOrigin)):console.error("ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",h($)),typeof $=="string"&&(v?(v=v.crossOrigin,v=typeof v=="string"?v==="use-credentials"?v:"":void 0):v=null,A.d.C($,v))},Jo.prefetchDNS=function($){if(typeof $!="string"||!$)console.error("ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",h($));else if(1<arguments.length){var v=arguments[1];typeof v=="object"&&v.hasOwnProperty("crossOrigin")?console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",y(v)):console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",y(v))}typeof $=="string"&&A.d.D($)},Jo.preinit=function($,v){if(typeof $=="string"&&$?v==null||typeof v!="object"?console.error("ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.",y(v)):v.as!=="style"&&v.as!=="script"&&console.error('ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".',y(v.as)):console.error("ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",h($)),typeof $=="string"&&v&&typeof v.as=="string"){var Z=v.as,X=f(Z,v.crossOrigin),re=typeof v.integrity=="string"?v.integrity:void 0,j=typeof v.fetchPriority=="string"?v.fetchPriority:void 0;Z==="style"?A.d.S($,typeof v.precedence=="string"?v.precedence:void 0,{crossOrigin:X,integrity:re,fetchPriority:j}):Z==="script"&&A.d.X($,{crossOrigin:X,integrity:re,fetchPriority:j,nonce:typeof v.nonce=="string"?v.nonce:void 0})}},Jo.preinitModule=function($,v){var Z="";typeof $=="string"&&$||(Z+=" The `href` argument encountered was "+h($)+"."),v!==void 0&&typeof v!="object"?Z+=" The `options` argument encountered was "+h(v)+".":v&&"as"in v&&v.as!=="script"&&(Z+=" The `as` option encountered was "+y(v.as)+"."),Z?console.error("ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s",Z):(Z=v&&typeof v.as=="string"?v.as:"script",Z)==="script"||(Z=y(Z),console.error('ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)',Z,$)),typeof $=="string"&&(typeof v=="object"&&v!==null?(v.as==null||v.as==="script")&&(Z=f(v.as,v.crossOrigin),A.d.M($,{crossOrigin:Z,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0})):v==null&&A.d.M($))},Jo.preload=function($,v){var Z="";if(typeof $=="string"&&$||(Z+=" The `href` argument encountered was "+h($)+"."),v==null||typeof v!="object"?Z+=" The `options` argument encountered was "+h(v)+".":typeof v.as=="string"&&v.as||(Z+=" The `as` option encountered was "+h(v.as)+"."),Z&&console.error('ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s',Z),typeof $=="string"&&typeof v=="object"&&v!==null&&typeof v.as=="string"){Z=v.as;var X=f(Z,v.crossOrigin);A.d.L($,Z,{crossOrigin:X,integrity:typeof v.integrity=="string"?v.integrity:void 0,nonce:typeof v.nonce=="string"?v.nonce:void 0,type:typeof v.type=="string"?v.type:void 0,fetchPriority:typeof v.fetchPriority=="string"?v.fetchPriority:void 0,referrerPolicy:typeof v.referrerPolicy=="string"?v.referrerPolicy:void 0,imageSrcSet:typeof v.imageSrcSet=="string"?v.imageSrcSet:void 0,imageSizes:typeof v.imageSizes=="string"?v.imageSizes:void 0,media:typeof v.media=="string"?v.media:void 0})}},Jo.preloadModule=function($,v){var Z="";typeof $=="string"&&$||(Z+=" The `href` argument encountered was "+h($)+"."),v!==void 0&&typeof v!="object"?Z+=" The `options` argument encountered was "+h(v)+".":v&&"as"in v&&typeof v.as!="string"&&(Z+=" The `as` option encountered was "+h(v.as)+"."),Z&&console.error('ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s',Z),typeof $=="string"&&(v?(Z=f(v.as,v.crossOrigin),A.d.m($,{as:typeof v.as=="string"&&v.as!=="script"?v.as:void 0,crossOrigin:Z,integrity:typeof v.integrity=="string"?v.integrity:void 0})):A.d.m($))},Jo.requestFormReset=function($){A.d.r($)},Jo.unstable_batchedUpdates=function($,v){return $(v)},Jo.useFormState=function($,v,Z){return k().useFormState($,v,Z)},Jo.useFormStatus=function(){return k().useHostTransitionStatus()},Jo.version="19.2.8",typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())})()});var $h=ha((p7,Rb)=>{"use strict";Rb.exports=Tb()});var Db=ha(Bh=>{"use strict";(function(){function i(e,t){for(e=e.memoizedState;e!==null&&0<t;)e=e.next,t--;return e}function s(e,t,n,o){if(n>=t.length)return o;var l=t[n],a=ho(e)?e.slice():Lt({},e);return a[l]=s(e[l],t,n+1,o),a}function u(e,t,n){if(t.length!==n.length)console.warn("copyWithRename() expects paths of the same length");else{for(var o=0;o<n.length-1;o++)if(t[o]!==n[o]){console.warn("copyWithRename() expects paths to be the same except for the deepest key");return}return f(e,t,n,0)}}function f(e,t,n,o){var l=t[o],a=ho(e)?e.slice():Lt({},e);return o+1===t.length?(a[n[o]]=a[l],ho(a)?a.splice(l,1):delete a[l]):a[l]=f(e[l],t,n,o+1),a}function h(e,t,n){var o=t[n],l=ho(e)?e.slice():Lt({},e);return n+1===t.length?(ho(l)?l.splice(o,1):delete l[o],l):(l[o]=h(e[o],t,n+1),l)}function y(){return!1}function k(){return null}function E(){console.error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks")}function A(){console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().")}function ie(){}function B(){}function $(e){var t=[];return e.forEach(function(n){t.push(n)}),t.sort().join(", ")}function v(e,t,n,o){return new l_(e,t,n,o)}function Z(e,t){e.context===Fi&&(A0(e.current,2,t,e,null,null),$s())}function X(e,t){if(ql!==null){var n=t.staleFamilies;t=t.updatedFamilies,hu(),Ms(e.current,t,n),$s()}}function re(e){ql=e}function j(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function J(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function De(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Ie(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Ge(e){if(J(e)!==e)throw Error("Unable to find node on an unmounted component.")}function $t(e){var t=e.alternate;if(!t){if(t=J(e),t===null)throw Error("Unable to find node on an unmounted component.");return t!==e?null:e}for(var n=e,o=t;;){var l=n.return;if(l===null)break;var a=l.alternate;if(a===null){if(o=l.return,o!==null){n=o;continue}break}if(l.child===a.child){for(a=l.child;a;){if(a===n)return Ge(l),e;if(a===o)return Ge(l),t;a=a.sibling}throw Error("Unable to find node on an unmounted component.")}if(n.return!==o.return)n=l,o=a;else{for(var r=!1,c=l.child;c;){if(c===n){r=!0,n=l,o=a;break}if(c===o){r=!0,o=l,n=a;break}c=c.sibling}if(!r){for(c=a.child;c;){if(c===n){r=!0,n=a,o=l;break}if(c===o){r=!0,o=a,n=l;break}c=c.sibling}if(!r)throw Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.")}}if(n.alternate!==o)throw Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.")}if(n.tag!==3)throw Error("Unable to find node on an unmounted component.");return n.stateNode.current===n?e:t}function jt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=jt(e),t!==null)return t;e=e.sibling}return null}function Me(e){return e===null||typeof e!="object"?null:(e=Ny&&e[Ny]||e["@@iterator"],typeof e=="function"?e:null)}function Xe(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Px?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Xs:return"Fragment";case H0:return"Profiler";case Rf:return"StrictMode";case j0:return"Suspense";case I0:return"SuspenseList";case Y0:return"Activity"}if(typeof e=="object")switch(typeof e.tag=="number"&&console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),e.$$typeof){case Ys:return"Portal";case Oa:return e.displayName||"Context";case U0:return(e._context.displayName||"Context")+".Consumer";case Su:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Df:return t=e.displayName||null,t!==null?t:Xe(e.type)||"Memo";case wl:t=e._payload,e=e._init;try{return Xe(e(t))}catch{}}return null}function wt(e){return typeof e.tag=="number"?ue(e):typeof e.name=="string"?e.name:null}function ue(e){var t=e.type;switch(e.tag){case 31:return"Activity";case 24:return"Cache";case 9:return(t._context.displayName||"Context")+".Consumer";case 10:return t.displayName||"Context";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 26:case 27:case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Xe(t);case 8:return t===Rf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;break;case 29:if(t=e._debugInfo,t!=null){for(var n=t.length-1;0<=n;n--)if(typeof t[n].name=="string")return t[n].name}if(e.return!==null)return ue(e.return)}return null}function Ve(e){return{current:e}}function Ye(e,t){0>ci?console.error("Unexpected pop."):(t!==q0[ci]&&console.error("Unexpected Fiber popped."),e.current=X0[ci],X0[ci]=null,q0[ci]=null,ci--)}function Be(e,t,n){ci++,X0[ci]=e.current,q0[ci]=n,e.current=t}function Fe(e){return e===null&&console.error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."),e}function ne(e,t){Be(Vi,t,e),Be(Cu,e,e),Be(qi,null,e);var n=t.nodeType;switch(n){case 9:case 11:n=n===9?"#document":"#fragment",t=(t=t.documentElement)&&(t=t.namespaceURI)?ay(t):Si;break;default:if(n=t.tagName,t=t.namespaceURI)t=ay(t),t=iy(t,n);else switch(n){case"svg":t=Sc;break;case"math":t=Th;break;default:t=Si}}n=n.toLowerCase(),n=e_(null,n),n={context:t,ancestorInfo:n},Ye(qi,e),Be(qi,n,e)}function me(e){Ye(qi,e),Ye(Cu,e),Ye(Vi,e)}function ye(){return Fe(qi.current)}function oe(e){e.memoizedState!==null&&Be(Af,e,e);var t=Fe(qi.current),n=e.type,o=iy(t.context,n);n=e_(t.ancestorInfo,n),o={context:o,ancestorInfo:n},t!==o&&(Be(Cu,e,e),Be(qi,o,e))}function Ee(e){Cu.current===e&&(Ye(qi,e),Ye(Cu,e)),Af.current===e&&(Ye(Af,e),md._currentValue=ls)}function vt(){}function Q(){if(ku===0){$y=console.log,By=console.info,Hy=console.warn,Uy=console.error,jy=console.group,Iy=console.groupCollapsed,Yy=console.groupEnd;var e={configurable:!0,enumerable:!0,value:vt,writable:!0};Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e})}ku++}function qe(){if(ku--,ku===0){var e={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:Lt({},e,{value:$y}),info:Lt({},e,{value:By}),warn:Lt({},e,{value:Hy}),error:Lt({},e,{value:Uy}),group:Lt({},e,{value:jy}),groupCollapsed:Lt({},e,{value:Iy}),groupEnd:Lt({},e,{value:Yy})})}0>ku&&console.error("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}function at(e){var t=Error.prepareStackTrace;if(Error.prepareStackTrace=void 0,e=e.stack,Error.prepareStackTrace=t,e.startsWith(`Error: react-stack-top-frame
`)&&(e=e.slice(29)),t=e.indexOf(`
`),t!==-1&&(e=e.slice(t+1)),t=e.indexOf("react_stack_bottom_frame"),t!==-1&&(t=e.lastIndexOf(`
`,t)),t!==-1)e=e.slice(0,t);else return"";return e}function ht(e){if(V0===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);V0=t&&t[1]||"",Xy=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+V0+e+Xy}function Rn(e,t){if(!e||Q0)return"";var n=W0.get(e);if(n!==void 0)return n;Q0=!0,n=Error.prepareStackTrace,Error.prepareStackTrace=void 0;var o=null;o=V.H,V.H=null,Q();try{var l={DetermineComponentFrameRoot:function(){try{if(t){var C=function(){throw Error()};if(Object.defineProperty(C.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(C,[])}catch(ve){var Y=ve}Reflect.construct(e,[],C)}else{try{C.call()}catch(ve){Y=ve}e.call(C.prototype)}}else{try{throw Error()}catch(ve){Y=ve}(C=e())&&typeof C.catch=="function"&&C.catch(function(){})}}catch(ve){if(ve&&Y&&typeof ve.stack=="string")return[ve.stack,Y.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var r=l.DetermineComponentFrameRoot(),c=r[0],d=r[1];if(c&&d){var p=c.split(`
`),L=d.split(`
`);for(r=a=0;a<p.length&&!p[a].includes("DetermineComponentFrameRoot");)a++;for(;r<L.length&&!L[r].includes("DetermineComponentFrameRoot");)r++;if(a===p.length||r===L.length)for(a=p.length-1,r=L.length-1;1<=a&&0<=r&&p[a]!==L[r];)r--;for(;1<=a&&0<=r;a--,r--)if(p[a]!==L[r]){if(a!==1||r!==1)do if(a--,r--,0>r||p[a]!==L[r]){var N=`
`+p[a].replace(" at new "," at ");return e.displayName&&N.includes("<anonymous>")&&(N=N.replace("<anonymous>",e.displayName)),typeof e=="function"&&W0.set(e,N),N}while(1<=a&&0<=r);break}}}finally{Q0=!1,V.H=o,qe(),Error.prepareStackTrace=n}return p=(p=e?e.displayName||e.name:"")?ht(p):"",typeof e=="function"&&W0.set(e,p),p}function Oo(e,t){switch(e.tag){case 26:case 27:case 5:return ht(e.type);case 16:return ht("Lazy");case 13:return e.child!==t&&t!==null?ht("Suspense Fallback"):ht("Suspense");case 19:return ht("SuspenseList");case 0:case 15:return Rn(e.type,!1);case 11:return Rn(e.type.render,!1);case 1:return Rn(e.type,!0);case 31:return ht("Activity");default:return""}}function It(e){try{var t="",n=null;do{t+=Oo(e,n);var o=e._debugInfo;if(o)for(var l=o.length-1;0<=l;l--){var a=o[l];if(typeof a.name=="string"){var r=t;e:{var c=a.name,d=a.env,p=a.debugLocation;if(p!=null){var L=at(p),N=L.lastIndexOf(`
`),C=N===-1?L:L.slice(N+1);if(C.indexOf(c)!==-1){var Y=`
`+C;break e}}Y=ht(c+(d?" ["+d+"]":""))}t=r+Y}}n=e,e=e.return}while(e);return t}catch(ve){return`
Error generating stack: `+ve.message+`
`+ve.stack}}function En(e){return(e=e?e.displayName||e.name:"")?ht(e):""}function eo(){if(Sl===null)return null;var e=Sl._debugOwner;return e!=null?wt(e):null}function nl(){if(Sl===null)return"";var e=Sl;try{var t="";switch(e.tag===6&&(e=e.return),e.tag){case 26:case 27:case 5:t+=ht(e.type);break;case 13:t+=ht("Suspense");break;case 19:t+=ht("SuspenseList");break;case 31:t+=ht("Activity");break;case 30:case 0:case 15:case 1:e._debugOwner||t!==""||(t+=En(e.type));break;case 11:e._debugOwner||t!==""||(t+=En(e.type.render))}for(;e;)if(typeof e.tag=="number"){var n=e;e=n._debugOwner;var o=n._debugStack;if(e&&o){var l=at(o);l!==""&&(t+=`
`+l)}}else if(e.debugStack!=null){var a=e.debugStack;(e=e.owner)&&a&&(t+=`
`+at(a))}else break;var r=t}catch(c){r=`
Error generating stack: `+c.message+`
`+c.stack}return r}function xe(e,t,n,o,l,a,r){var c=Sl;po(e);try{return e!==null&&e._debugTask?e._debugTask.run(t.bind(null,n,o,l,a,r)):t(n,o,l,a,r)}finally{po(c)}throw Error("runWithFiberInDEV should never be called in production. This is a bug in React.")}function po(e){V.getCurrentStack=e===null?null:nl,za=!1,Sl=e}function Yn(e){return typeof Symbol=="function"&&Symbol.toStringTag&&e[Symbol.toStringTag]||e.constructor.name||"Object"}function fo(e){try{return sn(e),!1}catch{return!0}}function sn(e){return""+e}function Qt(e,t){if(fo(e))return console.error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.",t,Yn(e)),sn(e)}function So(e,t){if(fo(e))return console.error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.",t,Yn(e)),sn(e)}function we(e){if(fo(e))return console.error("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before using it here.",Yn(e)),sn(e)}function pe(e){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u")return!1;var t=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t.isDisabled)return!0;if(!t.supportsFiber)return console.error("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://react.dev/link/react-devtools"),!0;try{Vs=t.inject(e),Bo=t}catch(n){console.error("React instrumentation encountered an error: %o.",n)}return!!t.checkDCE}function Se(e){if(typeof ow=="function"&&lw(e),Bo&&typeof Bo.setStrictMode=="function")try{Bo.setStrictMode(Vs,e)}catch(t){La||(La=!0,console.error("React instrumentation encountered an error: %o",t))}}function lt(e){return e>>>=0,e===0?32:31-(aw(e)/iw|0)|0}function it(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return console.error("Should have found matching lanes. This is a bug in React."),e}}function Je(e,t,n){var o=e.pendingLanes;if(o===0)return 0;var l=0,a=e.suspendedLanes,r=e.pingedLanes;e=e.warmLanes;var c=o&134217727;return c!==0?(o=c&~a,o!==0?l=it(o):(r&=c,r!==0?l=it(r):n||(n=c&~e,n!==0&&(l=it(n))))):(c=o&~a,c!==0?l=it(c):r!==0?l=it(r):n||(n=o&~e,n!==0&&(l=it(n)))),l===0?0:t!==0&&t!==l&&(t&a)===0&&(a=l&-l,n=t&-t,a>=n||a===32&&(n&4194048)!==0)?t:l}function Bt(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Zt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return console.error("Should have found matching lanes. This is a bug in React."),-1}}function Ot(){var e=Lf;return Lf<<=1,(Lf&62914560)===0&&(Lf=4194304),e}function kt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ze(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function H(e,t,n,o,l,a){var r=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var c=e.entanglements,d=e.expirationTimes,p=e.hiddenUpdates;for(n=r&~n;0<n;){var L=31-qo(n),N=1<<L;c[L]=0,d[L]=-1;var C=p[L];if(C!==null)for(p[L]=null,L=0;L<C.length;L++){var Y=C[L];Y!==null&&(Y.lane&=-536870913)}n&=~N}o!==0&&I(e,o,0),a!==0&&l===0&&e.tag!==0&&(e.suspendedLanes|=a&~(r&~t))}function I(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var o=31-qo(t);e.entangledLanes|=t,e.entanglements[o]=e.entanglements[o]|1073741824|n&261930}function te(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var o=31-qo(n),l=1<<o;l&t|e[o]&t&&(e[o]|=t),n&=~l}}function le(e,t){var n=t&-t;return n=(n&42)!==0?1:Oe(n),(n&(e.suspendedLanes|t))!==0?0:n}function Oe(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Ue(e,t,n){if(Na)for(e=e.pendingUpdatersLaneMap;0<n;){var o=31-qo(n),l=1<<o;e[o].add(t),n&=~l}}function de(e,t){if(Na)for(var n=e.pendingUpdatersLaneMap,o=e.memoizedUpdaters;0<t;){var l=31-qo(t);e=1<<l,l=n[l],0<l.size&&(l.forEach(function(a){var r=a.alternate;r!==null&&o.has(r)||o.add(a)}),l.clear()),t&=~e}}function _(e){return e&=-e,Cl!==0&&Cl<e?ia!==0&&ia<e?(e&134217727)!==0?$a:Nf:ia:Cl}function T(){var e=nn.p;return e!==0?e:(e=window.event,e===void 0?$a:Ty(e.type))}function W(e,t){var n=nn.p;try{return nn.p=e,t()}finally{nn.p=n}}function se(e){delete e[Do],delete e[Vo],delete e[J0],delete e[rw],delete e[sw]}function K(e){var t=e[Do];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Wi]||n[Do]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=_y(e);e!==null;){if(n=e[Do])return n;e=_y(e)}return t}e=n,n=e.parentNode}return null}function Ae(e){if(e=e[Do]||e[Wi]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function be(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error("getNodeFromInstance: Invalid argument.")}function Te(e){var t=e[qy];return t||(t=e[qy]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function ae(e){e[Eu]=!0}function xt(e,t){pt(e,t),pt(e+"Capture",t)}function pt(e,t){$r[e]&&console.error("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.",e),$r[e]=t;var n=e.toLowerCase();for(K0[n]=e,e==="onDoubleClick"&&(K0.ondblclick=e),e=0;e<t.length;e++)Vy.add(t[e])}function st(e,t){cw[t.type]||t.onChange||t.onInput||t.readOnly||t.disabled||t.value==null||console.error(e==="select"?"You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`.":"You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."),t.onChange||t.readOnly||t.disabled||t.checked==null||console.error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.")}function Ht(e){return aa.call(Wy,e)?!0:aa.call(Qy,e)?!1:uw.test(e)?Wy[e]=!0:(Qy[e]=!0,console.error("Invalid attribute name: `%s`",e),!1)}function ct(e,t,n){if(Ht(t)){if(!e.hasAttribute(t)){switch(typeof n){case"symbol":case"object":return n;case"function":return n;case"boolean":if(n===!1)return n}return n===void 0?void 0:null}return e=e.getAttribute(t),e===""&&n===!0?!0:(Qt(n,t),e===""+n?n:e)}}function Kt(e,t,n){if(Ht(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var o=t.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(t);return}}Qt(n,t),e.setAttribute(t,""+n)}}function Nn(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}Qt(n,t),e.setAttribute(t,""+n)}}function Xn(e,t,n,o){if(o===null)e.removeAttribute(n);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}Qt(o,n),e.setAttributeNS(t,n,""+o)}}function $n(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return we(e),e;default:return""}}function Co(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function ea(e,t,n){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var l=o.get,a=o.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(r){we(r),n=""+r,a.call(this,r)}}),Object.defineProperty(e,t,{enumerable:o.enumerable}),{getValue:function(){return n},setValue:function(r){we(r),n=""+r},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ei(e){if(!e._valueTracker){var t=Co(e)?"checked":"value";e._valueTracker=ea(e,t,""+e[t])}}function Dn(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),o="";return e&&(o=Co(e)?e.checked?"true":"false":e.value),e=o,e!==n?(t.setValue(e),!0):!1}function ol(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ko(e){return e.replace(dw,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Md(e,t){t.checked===void 0||t.defaultChecked===void 0||Zy||(console.error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",eo()||"A component",t.type),Zy=!0),t.value===void 0||t.defaultValue===void 0||Gy||(console.error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",eo()||"A component",t.type),Gy=!0)}function ft(e,t,n,o,l,a,r,c){e.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?(Qt(r,"type"),e.type=r):e.removeAttribute("type"),t!=null?r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+$n(t)):e.value!==""+$n(t)&&(e.value=""+$n(t)):r!=="submit"&&r!=="reset"||e.removeAttribute("value"),t!=null?br(e,r,$n(t)):n!=null?br(e,r,$n(n)):o!=null&&e.removeAttribute("value"),l==null&&a!=null&&(e.defaultChecked=!!a),l!=null&&(e.checked=l&&typeof l!="function"&&typeof l!="symbol"),c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"?(Qt(c,"name"),e.name=""+$n(c)):e.removeAttribute("name")}function Uo(e,t,n,o,l,a,r,c){if(a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"&&(Qt(a,"type"),e.type=a),t!=null||n!=null){if(!(a!=="submit"&&a!=="reset"||t!=null)){Ei(e);return}n=n!=null?""+$n(n):"",t=t!=null?""+$n(t):n,c||t===e.value||(e.value=t),e.defaultValue=t}o=o??l,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=c?e.checked:!!o,e.defaultChecked=!!o,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(Qt(r,"name"),e.name=r),Ei(e)}function br(e,t,n){t==="number"&&ol(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function ds(e,t){t.value==null&&(typeof t.children=="object"&&t.children!==null?B0.Children.forEach(t.children,function(n){n==null||typeof n=="string"||typeof n=="number"||typeof n=="bigint"||Fy||(Fy=!0,console.error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."))}):t.dangerouslySetInnerHTML==null||Jy||(Jy=!0,console.error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."))),t.selected==null||Py||(console.error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."),Py=!0)}function ma(){var e=eo();return e?`

Check the render method of \``+e+"`.":""}function Mi(e,t,n,o){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&o&&(e[n].defaultSelected=!0)}else{for(n=""+$n(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,o&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function zc(e,t){for(e=0;e<e5.length;e++){var n=e5[e];if(t[n]!=null){var o=ho(t[n]);t.multiple&&!o?console.error("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s",n,ma()):!t.multiple&&o&&console.error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s",n,ma())}}t.value===void 0||t.defaultValue===void 0||Ky||(console.error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"),Ky=!0)}function Td(e,t){t.value===void 0||t.defaultValue===void 0||t5||(console.error("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components",eo()||"A component"),t5=!0),t.children!=null&&t.value==null&&console.error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.")}function Rd(e,t,n){if(t!=null&&(t=""+$n(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+$n(n):""}function Dd(e,t,n,o){if(t==null){if(o!=null){if(n!=null)throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");if(ho(o)){if(1<o.length)throw Error("<textarea> can only have at most one child.");o=o[0]}n=o}n==null&&(n=""),t=n}n=$n(t),e.defaultValue=n,o=e.textContent,o===n&&o!==""&&o!==null&&(e.value=o),Ei(e)}function fs(e,t){return e.serverProps===void 0&&e.serverTail.length===0&&e.children.length===1&&3<e.distanceFromLeaf&&e.distanceFromLeaf>15-t?fs(e.children[0],t):e}function jo(e){return"  "+"  ".repeat(e)}function Va(e){return"+ "+"  ".repeat(e)}function fl(e){return"- "+"  ".repeat(e)}function vr(e){switch(e.tag){case 26:case 27:case 5:return e.type;case 16:return"Lazy";case 31:return"Activity";case 13:return"Suspense";case 19:return"SuspenseList";case 0:case 15:return e=e.type,e.displayName||e.name||null;case 11:return e=e.type.render,e.displayName||e.name||null;case 1:return e=e.type,e.displayName||e.name||null;default:return null}}function Eo(e,t){return n5.test(e)?(e=JSON.stringify(e),e.length>t-2?8>t?'{"..."}':"{"+e.slice(0,t-7)+'..."}':"{"+e+"}"):e.length>t?5>t?'{"..."}':e.slice(0,t-3)+"...":e}function Qa(e,t,n){var o=120-2*n;if(t===null)return Va(n)+Eo(e,o)+`
`;if(typeof t=="string"){for(var l=0;l<t.length&&l<e.length&&t.charCodeAt(l)===e.charCodeAt(l);l++);return l>o-8&&10<l&&(e="..."+e.slice(l-8),t="..."+t.slice(l-8)),Va(n)+Eo(e,o)+`
`+fl(n)+Eo(t,o)+`
`}return jo(n)+Eo(e,o)+`
`}function hs(e){return Object.prototype.toString.call(e).replace(/^\[object (.*)\]$/,function(t,n){return n})}function ta(e,t){switch(typeof e){case"string":return e=JSON.stringify(e),e.length>t?5>t?'"..."':e.slice(0,t-4)+'..."':e;case"object":if(e===null)return"null";if(ho(e))return"[...]";if(e.$$typeof===Aa)return(t=Xe(e.type))?"<"+t+">":"<...>";var n=hs(e);if(n==="Object"){n="",t-=2;for(var o in e)if(e.hasOwnProperty(o)){var l=JSON.stringify(o);if(l!=='"'+o+'"'&&(o=l),t-=o.length-2,l=ta(e[o],15>t?t:15),t-=l.length,0>t){n+=n===""?"...":", ...";break}n+=(n===""?"":",")+o+":"+l}return"{"+n+"}"}return n;case"function":return(t=e.displayName||e.name)?"function "+t:"function";default:return String(e)}}function Ol(e,t){return typeof e!="string"||n5.test(e)?"{"+ta(e,t-2)+"}":e.length>t-2?5>t?'"..."':'"'+e.slice(0,t-5)+'..."':'"'+e+'"'}function Wa(e,t,n){var o=120-n.length-e.length,l=[],a;for(a in t)if(t.hasOwnProperty(a)&&a!=="children"){var r=Ol(t[a],120-n.length-a.length-1);o-=a.length+r.length+2,l.push(a+"="+r)}return l.length===0?n+"<"+e+`>
`:0<o?n+"<"+e+" "+l.join(" ")+`>
`:n+"<"+e+`
`+n+"  "+l.join(`
`+n+"  ")+`
`+n+`>
`}function hl(e,t,n){var o="",l=Lt({},t),a;for(a in e)if(e.hasOwnProperty(a)){delete l[a];var r=120-2*n-a.length-2,c=ta(e[a],r);t.hasOwnProperty(a)?(r=ta(t[a],r),o+=Va(n)+a+": "+c+`
`,o+=fl(n)+a+": "+r+`
`):o+=Va(n)+a+": "+c+`
`}for(var d in l)l.hasOwnProperty(d)&&(e=ta(l[d],120-2*n-d.length-2),o+=fl(n)+d+": "+e+`
`);return o}function Lc(e,t,n,o){var l="",a=new Map;for(p in n)n.hasOwnProperty(p)&&a.set(p.toLowerCase(),p);if(a.size===1&&a.has("children"))l+=Wa(e,t,jo(o));else{for(var r in t)if(t.hasOwnProperty(r)&&r!=="children"){var c=120-2*(o+1)-r.length-1,d=a.get(r.toLowerCase());if(d!==void 0){a.delete(r.toLowerCase());var p=t[r];d=n[d];var L=Ol(p,c);c=Ol(d,c),typeof p=="object"&&p!==null&&typeof d=="object"&&d!==null&&hs(p)==="Object"&&hs(d)==="Object"&&(2<Object.keys(p).length||2<Object.keys(d).length||-1<L.indexOf("...")||-1<c.indexOf("..."))?l+=jo(o+1)+r+`={{
`+hl(p,d,o+2)+jo(o+1)+`}}
`:(l+=Va(o+1)+r+"="+L+`
`,l+=fl(o+1)+r+"="+c+`
`)}else l+=jo(o+1)+r+"="+Ol(t[r],c)+`
`}a.forEach(function(N){if(N!=="children"){var C=120-2*(o+1)-N.length-1;l+=fl(o+1)+N+"="+Ol(n[N],C)+`
`}}),l=l===""?jo(o)+"<"+e+`>
`:jo(o)+"<"+e+`
`+l+jo(o)+`>
`}return e=n.children,t=t.children,typeof e=="string"||typeof e=="number"||typeof e=="bigint"?(a="",(typeof t=="string"||typeof t=="number"||typeof t=="bigint")&&(a=""+t),l+=Qa(a,""+e,o+1)):(typeof t=="string"||typeof t=="number"||typeof t=="bigint")&&(l=e==null?l+Qa(""+t,null,o+1):l+Qa(""+t,void 0,o+1)),l}function Io(e,t){var n=vr(e);if(n===null){for(n="",e=e.child;e;)n+=Io(e,t),e=e.sibling;return n}return jo(t)+"<"+n+`>
`}function Nc(e,t){var n=fs(e,t);if(n!==e&&(e.children.length!==1||e.children[0]!==n))return jo(t)+`...
`+Nc(n,t+1);n="";var o=e.fiber._debugInfo;if(o)for(var l=0;l<o.length;l++){var a=o[l].name;typeof a=="string"&&(n+=jo(t)+"<"+a+`>
`,t++)}if(o="",l=e.fiber.pendingProps,e.fiber.tag===6)o=Qa(l,e.serverProps,t),t++;else if(a=vr(e.fiber),a!==null)if(e.serverProps===void 0){o=t;var r=120-2*o-a.length-2,c="";for(p in l)if(l.hasOwnProperty(p)&&p!=="children"){var d=Ol(l[p],15);if(r-=p.length+d.length+2,0>r){c+=" ...";break}c+=" "+p+"="+d}o=jo(o)+"<"+a+c+`>
`,t++}else e.serverProps===null?(o=Wa(a,l,Va(t)),t++):typeof e.serverProps=="string"?console.error("Should not have matched a non HostText fiber to a Text node. This is a bug in React."):(o=Lc(a,l,e.serverProps,t),t++);var p="";for(l=e.fiber.child,a=0;l&&a<e.children.length;)r=e.children[a],r.fiber===l?(p+=Nc(r,t),a++):p+=Io(l,t),l=l.sibling;for(l&&0<e.children.length&&(p+=jo(t)+`...
`),l=e.serverTail,e.serverProps===null&&t--,e=0;e<l.length;e++)a=l[e],p=typeof a=="string"?p+(fl(t)+Eo(a,120-2*t)+`
`):p+Wa(a.type,a.props,fl(t));return n+o+p}function $c(e){try{return`

`+Nc(e,0)}catch{return""}}function Bc(e,t,n){for(var o=t,l=null,a=0;o;)o===e&&(a=0),l={fiber:o,children:l!==null?[l]:[],serverProps:o===t?n:o===e?null:void 0,serverTail:[],distanceFromLeaf:a},a++,o=o.return;return l!==null?$c(l).replaceAll(/^[+-]/gm,">"):""}function e_(e,t){var n=Lt({},e||l5),o={tag:t};return o5.indexOf(t)!==-1&&(n.aTagInScope=null,n.buttonTagInScope=null,n.nobrTagInScope=null),hw.indexOf(t)!==-1&&(n.pTagInButtonScope=null),fw.indexOf(t)!==-1&&t!=="address"&&t!=="div"&&t!=="p"&&(n.listItemTagAutoclosing=null,n.dlItemTagAutoclosing=null),n.current=o,t==="form"&&(n.formTag=o),t==="a"&&(n.aTagInScope=o),t==="button"&&(n.buttonTagInScope=o),t==="nobr"&&(n.nobrTagInScope=o),t==="p"&&(n.pTagInButtonScope=o),t==="li"&&(n.listItemTagAutoclosing=o),(t==="dd"||t==="dt")&&(n.dlItemTagAutoclosing=o),t==="#document"||t==="html"?n.containerTagInScope=null:n.containerTagInScope||(n.containerTagInScope=o),e!==null||t!=="#document"&&t!=="html"&&t!=="body"?n.implicitRootScope===!0&&(n.implicitRootScope=!1):n.implicitRootScope=!0,n}function _s(e,t,n){switch(t){case"select":return e==="hr"||e==="option"||e==="optgroup"||e==="script"||e==="template"||e==="#text";case"optgroup":return e==="option"||e==="#text";case"option":return e==="#text";case"tr":return e==="th"||e==="td"||e==="style"||e==="script"||e==="template";case"tbody":case"thead":case"tfoot":return e==="tr"||e==="style"||e==="script"||e==="template";case"colgroup":return e==="col"||e==="template";case"table":return e==="caption"||e==="colgroup"||e==="tbody"||e==="tfoot"||e==="thead"||e==="style"||e==="script"||e==="template";case"head":return e==="base"||e==="basefont"||e==="bgsound"||e==="link"||e==="meta"||e==="title"||e==="noscript"||e==="noframes"||e==="style"||e==="script"||e==="template";case"html":if(n)break;return e==="head"||e==="body"||e==="frameset";case"frameset":return e==="frame";case"#document":if(!n)return e==="html"}switch(e){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":return t!=="h1"&&t!=="h2"&&t!=="h3"&&t!=="h4"&&t!=="h5"&&t!=="h6";case"rp":case"rt":return _w.indexOf(t)===-1;case"caption":case"col":case"colgroup":case"frameset":case"frame":case"tbody":case"td":case"tfoot":case"th":case"thead":case"tr":return t==null;case"head":return n||t===null;case"html":return n&&t==="#document"||t===null;case"body":return n&&(t==="#document"||t==="html")||t===null}return!0}function $p(e,t){switch(e){case"address":case"article":case"aside":case"blockquote":case"center":case"details":case"dialog":case"dir":case"div":case"dl":case"fieldset":case"figcaption":case"figure":case"footer":case"header":case"hgroup":case"main":case"menu":case"nav":case"ol":case"p":case"section":case"summary":case"ul":case"pre":case"listing":case"table":case"hr":case"xmp":case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":return t.pTagInButtonScope;case"form":return t.formTag||t.pTagInButtonScope;case"li":return t.listItemTagAutoclosing;case"dd":case"dt":return t.dlItemTagAutoclosing;case"button":return t.buttonTagInScope;case"a":return t.aTagInScope;case"nobr":return t.nobrTagInScope}return null}function t_(e,t){for(;e;){switch(e.tag){case 5:case 26:case 27:if(e.type===t)return e}e=e.return}return null}function Ad(e,t){t=t||l5;var n=t.current;if(t=(n=_s(e,n&&n.tag,t.implicitRootScope)?null:n)?null:$p(e,t),t=n||t,!t)return!0;var o=t.tag;if(t=String(!!n)+"|"+e+"|"+o,$f[t])return!1;$f[t]=!0;var l=(t=Sl)?t_(t.return,o):null,a=t!==null&&l!==null?Bc(l,t,null):"",r="<"+e+">";return n?(n="",o==="table"&&e==="tr"&&(n+=" Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."),console.error(`In HTML, %s cannot be a child of <%s>.%s
This will cause a hydration error.%s`,r,o,n,a)):console.error(`In HTML, %s cannot be a descendant of <%s>.
This will cause a hydration error.%s`,r,o,a),t&&(e=t.return,l===null||e===null||l===e&&e._debugOwner===t._debugOwner||xe(l,function(){console.error(`<%s> cannot contain a nested %s.
See this log for the ancestor stack trace.`,o,r)})),!1}function Hc(e,t,n){if(n||_s("#text",t,!1))return!0;if(n="#text|"+t,$f[n])return!1;$f[n]=!0;var o=(n=Sl)?t_(n,t):null;return n=n!==null&&o!==null?Bc(o,n,n.tag!==6?{children:null}:null):"",/\S/.test(e)?console.error(`In HTML, text nodes cannot be a child of <%s>.
This will cause a hydration error.%s`,t,n):console.error(`In HTML, whitespace text nodes cannot be a child of <%s>. Make sure you don't have any extra whitespace between tags on each line of your source code.
This will cause a hydration error.%s`,t,n),!1}function ms(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}function Bp(e){return e.replace(gw,function(t,n){return n.toUpperCase()})}function Uc(e,t,n){var o=t.indexOf("--")===0;o||(-1<t.indexOf("-")?Qs.hasOwnProperty(t)&&Qs[t]||(Qs[t]=!0,console.error("Unsupported style property %s. Did you mean %s?",t,Bp(t.replace(pw,"ms-")))):mw.test(t)?Qs.hasOwnProperty(t)&&Qs[t]||(Qs[t]=!0,console.error("Unsupported vendor-prefixed style property %s. Did you mean %s?",t,t.charAt(0).toUpperCase()+t.slice(1))):!r5.test(n)||tm.hasOwnProperty(n)&&tm[n]||(tm[n]=!0,console.error(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`,t,n.replace(r5,""))),typeof n=="number"&&(isNaN(n)?s5||(s5=!0,console.error("`NaN` is an invalid value for the `%s` css style property.",t)):isFinite(n)||c5||(c5=!0,console.error("`Infinity` is an invalid value for the `%s` css style property.",t)))),n==null||typeof n=="boolean"||n===""?o?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":o?e.setProperty(t,n):typeof n!="number"||n===0||u5.has(t)?t==="float"?e.cssFloat=n:(So(n,t),e[t]=(""+n).trim()):e[t]=n+"px"}function jc(e,t,n){if(t!=null&&typeof t!="object")throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");if(t&&Object.freeze(t),e=e.style,n!=null){if(t){var o={};if(n){for(var l in n)if(n.hasOwnProperty(l)&&!t.hasOwnProperty(l))for(var a=em[l]||[l],r=0;r<a.length;r++)o[a[r]]=l}for(var c in t)if(t.hasOwnProperty(c)&&(!n||n[c]!==t[c]))for(l=em[c]||[c],a=0;a<l.length;a++)o[l[a]]=c;c={};for(var d in t)for(l=em[d]||[d],a=0;a<l.length;a++)c[l[a]]=d;d={};for(var p in o)if(l=o[p],(a=c[p])&&l!==a&&(r=l+","+a,!d[r])){d[r]=!0,r=console;var L=t[l];r.error.call(r,"%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.",L==null||typeof L=="boolean"||L===""?"Removing":"Updating",l,a)}}for(var N in n)!n.hasOwnProperty(N)||t!=null&&t.hasOwnProperty(N)||(N.indexOf("--")===0?e.setProperty(N,""):N==="float"?e.cssFloat="":e[N]="");for(var C in t)p=t[C],t.hasOwnProperty(C)&&n[C]!==p&&Uc(e,C,p)}else for(o in t)t.hasOwnProperty(o)&&Uc(e,o,t[o])}function zl(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}function Bn(e){return yw.get(e)||e}function Ti(e,t){if(aa.call(Gs,t)&&Gs[t])return!0;if(vw.test(t)){if(e="aria-"+t.slice(4).toLowerCase(),e=d5.hasOwnProperty(e)?e:null,e==null)return console.error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.",t),Gs[t]=!0;if(t!==e)return console.error("Invalid ARIA attribute `%s`. Did you mean `%s`?",t,e),Gs[t]=!0}if(bw.test(t)){if(e=t.toLowerCase(),e=d5.hasOwnProperty(e)?e:null,e==null)return Gs[t]=!0,!1;t!==e&&(console.error("Unknown ARIA attribute `%s`. Did you mean `%s`?",t,e),Gs[t]=!0)}return!0}function Ll(e,t){var n=[],o;for(o in t)Ti(e,o)||n.push(o);t=n.map(function(l){return"`"+l+"`"}).join(", "),n.length===1?console.error("Invalid aria prop %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",t,e):1<n.length&&console.error("Invalid aria props %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",t,e)}function go(e,t,n,o){if(aa.call(Qo,t)&&Qo[t])return!0;var l=t.toLowerCase();if(l==="onfocusin"||l==="onfocusout")return console.error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."),Qo[t]=!0;if(typeof n=="function"&&(e==="form"&&t==="action"||e==="input"&&t==="formAction"||e==="button"&&t==="formAction"))return!0;if(o!=null){if(e=o.possibleRegistrationNames,o.registrationNameDependencies.hasOwnProperty(t))return!0;if(o=e.hasOwnProperty(l)?e[l]:null,o!=null)return console.error("Invalid event handler property `%s`. Did you mean `%s`?",t,o),Qo[t]=!0;if(h5.test(t))return console.error("Unknown event handler property `%s`. It will be ignored.",t),Qo[t]=!0}else if(h5.test(t))return xw.test(t)&&console.error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.",t),Qo[t]=!0;if(ww.test(t)||Sw.test(t))return!0;if(l==="innerhtml")return console.error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."),Qo[t]=!0;if(l==="aria")return console.error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."),Qo[t]=!0;if(l==="is"&&n!==null&&n!==void 0&&typeof n!="string")return console.error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.",typeof n),Qo[t]=!0;if(typeof n=="number"&&isNaN(n))return console.error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.",t),Qo[t]=!0;if(Hf.hasOwnProperty(l)){if(l=Hf[l],l!==t)return console.error("Invalid DOM property `%s`. Did you mean `%s`?",t,l),Qo[t]=!0}else if(t!==l)return console.error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.",t,l),Qo[t]=!0;switch(t){case"dangerouslySetInnerHTML":case"children":case"style":case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":return!0;case"innerText":case"textContent":return!0}switch(typeof n){case"boolean":switch(t){case"autoFocus":case"checked":case"multiple":case"muted":case"selected":case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":case"capture":case"download":case"inert":return!0;default:return l=t.toLowerCase().slice(0,5),l==="data-"||l==="aria-"?!0:(n?console.error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.',n,t,t,n,t):console.error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.',n,t,t,n,t,t,t),Qo[t]=!0)}case"function":case"symbol":return Qo[t]=!0,!1;case"string":if(n==="false"||n==="true"){switch(t){case"checked":case"selected":case"multiple":case"muted":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":case"inert":break;default:return!0}console.error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?",n,t,n==="false"?"The browser will interpret it as a truthy value.":'Although this works, it will not work as expected if you pass the string "false".',t,n),Qo[t]=!0}}return!0}function n_(e,t,n){var o=[],l;for(l in t)go(e,l,t[l],n)||o.push(l);t=o.map(function(a){return"`"+a+"`"}).join(", "),o.length===1?console.error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior ",t,e):1<o.length&&console.error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://react.dev/link/attribute-behavior ",t,e)}function xr(e){return Cw.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function na(){}function Mt(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}function Od(e){var t=Ae(e);if(t&&(e=t.stateNode)){var n=e[Vo]||null;e:switch(e=t.stateNode,t.type){case"input":if(ft(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(Qt(t,"name"),n=n.querySelectorAll('input[name="'+ko(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var o=n[t];if(o!==e&&o.form===e.form){var l=o[Vo]||null;if(!l)throw Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");ft(o,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(t=0;t<n.length;t++)o=n[t],o.form===e.form&&Dn(o)}break e;case"textarea":Rd(e,n.value,n.defaultValue);break e;case"select":t=n.value,t!=null&&Mi(e,!!n.multiple,t,!1)}}}function _l(e,t,n){if(nm)return e(t,n);nm=!0;try{var o=e(t);return o}finally{if(nm=!1,(Zs!==null||Ps!==null)&&($s(),Zs&&(t=Zs,e=Ps,Ps=Zs=null,Od(t),e)))for(t=0;t<e.length;t++)Od(e[t])}}function Ri(e,t){var n=e.stateNode;if(n===null)return null;var o=n[Vo]||null;if(o===null)return null;n=o[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error("Expected `"+t+"` listener to be a function, instead got a value of `"+typeof n+"` type.");return n}function Ic(){if(Uf)return Uf;var e,t=lm,n=t.length,o,l="value"in Gi?Gi.value:Gi.textContent,a=l.length;for(e=0;e<n&&t[e]===l[e];e++);var r=n-e;for(o=1;o<=r&&t[n-o]===l[a-o];o++);return Uf=l.slice(e,1<o?1-o:void 0)}function wr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ps(){return!0}function Yc(){return!1}function qn(e){function t(n,o,l,a,r){this._reactName=n,this._targetInst=l,this.type=o,this.nativeEvent=a,this.target=r,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(n=e[c],this[c]=n?n(a):a[c]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?ps:Yc,this.isPropagationStopped=Yc,this}return Lt(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ps)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ps)},persist:function(){},isPersistent:ps}),t}function Zn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Bw[e])?!!t[e]:!1}function Sr(){return Zn}function Xc(e,t){switch(e){case"keyup":return Zw.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==g5;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ll(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}function Ga(e,t){switch(e){case"compositionend":return ll(t);case"keypress":return t.which!==b5?null:(x5=!0,v5);case"textInput":return e=t.data,e===v5&&x5?null:e;default:return null}}function Mn(e,t){if(Fs)return e==="compositionend"||!sm&&Xc(e,t)?(e=Ic(),Uf=lm=Gi=null,Fs=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return y5&&t.locale!=="ko"?null:t.data;default:return null}}function gs(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Fw[e.type]:t==="textarea"}function Za(e){if(!Ba)return!1;e="on"+e;var t=e in document;return t||(t=document.createElement("div"),t.setAttribute(e,"return;"),t=typeof t[e]=="function"),t}function qc(e,t,n,o){Zs?Ps?Ps.push(o):Ps=[o]:Zs=o,t=bf(t,"onChange"),0<t.length&&(n=new jf("onChange","change",null,n,o),e.push({event:n,listeners:t}))}function Di(e){G1(e,0)}function Cr(e){var t=be(e);if(Dn(t))return e}function ys(e,t){if(e==="change")return t}function Vc(){Ou&&(Ou.detachEvent("onpropertychange",Ai),zu=Ou=null)}function Ai(e){if(e.propertyName==="value"&&Cr(zu)){var t=[];qc(t,zu,e,Mt(e)),_l(Di,t)}}function zd(e,t,n){e==="focusin"?(Vc(),Ou=t,zu=n,Ou.attachEvent("onpropertychange",Ai)):e==="focusout"&&Vc()}function bs(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Cr(zu)}function kr(e,t){if(e==="click")return Cr(t)}function vs(e,t){if(e==="input"||e==="change")return Cr(t)}function o_(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}function Nl(e,t){if(Wo(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),o=Object.keys(t);if(n.length!==o.length)return!1;for(o=0;o<n.length;o++){var l=n[o];if(!aa.call(t,l)||!Wo(e[l],t[l]))return!1}return!0}function $l(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Qc(e,t){var n=$l(e);e=0;for(var o;n;){if(n.nodeType===3){if(o=e+n.textContent.length,e<=t&&o>=t)return{node:n,offset:t-e};e=o}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=$l(n)}}function Pa(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Pa(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function ml(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=ol(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=ol(e.document)}return t}function Fa(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Oi(e,t,n){var o=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;um||Js==null||Js!==ol(o)||(o=Js,"selectionStart"in o&&Fa(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),Lu&&Nl(Lu,o)||(Lu=o,o=bf(cm,"onSelect"),0<o.length&&(t=new jf("onSelect","select",null,t,n),e.push({event:t,listeners:o}),t.target=Js)))}function Bl(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}function pa(e){if(dm[e])return dm[e];if(!Ks[e])return e;var t=Ks[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in S5)return dm[e]=t[n];return e}function zo(e,t){T5.set(e,t),xt(t,[e])}function Ld(e){for(var t=Yf,n=0;n<e.length;n++){var o=e[n];if(typeof o=="object"&&o!==null)if(ho(o)&&o.length===2&&typeof o[0]=="string"){if(t!==Yf&&t!==pm)return _m;t=pm}else return _m;else{if(typeof o=="function"||typeof o=="string"&&50<o.length||t!==Yf&&t!==mm)return _m;t=mm}}return t}function Er(e,t,n,o){for(var l in e)aa.call(e,l)&&l[0]!=="_"&&Hl(l,e[l],t,n,o)}function Hl(e,t,n,o,l){switch(typeof t){case"object":if(t===null){t="null";break}else{if(t.$$typeof===Aa){var a=Xe(t.type)||"\u2026",r=t.key;t=t.props;var c=Object.keys(t),d=c.length;if(r==null&&d===0){t="<"+a+" />";break}if(3>o||d===1&&c[0]==="children"&&r==null){t="<"+a+" \u2026 />";break}n.push([l+"\xA0\xA0".repeat(o)+e,"<"+a]),r!==null&&Hl("key",r,n,o+1,l),e=!1;for(var p in t)p==="children"?t.children!=null&&(!ho(t.children)||0<t.children.length)&&(e=!0):aa.call(t,p)&&p[0]!=="_"&&Hl(p,t[p],n,o+1,l);n.push(["",e?">\u2026</"+a+">":"/>"]);return}if(a=Object.prototype.toString.call(t),a=a.slice(8,a.length-1),a==="Array"){if(p=Ld(t),p===mm||p===Yf){t=JSON.stringify(t);break}else if(p===pm){for(n.push([l+"\xA0\xA0".repeat(o)+e,""]),e=0;e<t.length;e++)a=t[e],Hl(a[0],a[1],n,o+1,l);return}}if(a==="Promise"){if(t.status==="fulfilled"){if(a=n.length,Hl(e,t.value,n,o,l),n.length>a){n=n[a],n[1]="Promise<"+(n[1]||"Object")+">";return}}else if(t.status==="rejected"&&(a=n.length,Hl(e,t.reason,n,o,l),n.length>a)){n=n[a],n[1]="Rejected Promise<"+n[1]+">";return}n.push(["\xA0\xA0".repeat(o)+e,"Promise"]);return}a==="Object"&&(p=Object.getPrototypeOf(t))&&typeof p.constructor=="function"&&(a=p.constructor.name),n.push([l+"\xA0\xA0".repeat(o)+e,a==="Object"?3>o?"":"\u2026":a]),3>o&&Er(t,n,o+1,l);return}case"function":t=t.name===""?"() => {}":t.name+"() {}";break;case"string":t=t===l4?"\u2026":JSON.stringify(t);break;case"undefined":t="undefined";break;case"boolean":t=t?"true":"false";break;default:t=String(t)}n.push([l+"\xA0\xA0".repeat(o)+e,t])}function Wc(e,t,n,o){var l=!0;for(r in e)r in t||(n.push([Xf+"\xA0\xA0".repeat(o)+r,"\u2026"]),l=!1);for(var a in t)if(a in e){var r=e[a],c=t[a];if(r!==c){if(o===0&&a==="children")l="\xA0\xA0".repeat(o)+a,n.push([Xf+l,"\u2026"],[qf+l,"\u2026"]);else{if(!(3<=o)){if(typeof r=="object"&&typeof c=="object"&&r!==null&&c!==null&&r.$$typeof===c.$$typeof)if(c.$$typeof===Aa){if(r.type===c.type&&r.key===c.key){r=Xe(c.type)||"\u2026",l="\xA0\xA0".repeat(o)+a,r="<"+r+" \u2026 />",n.push([Xf+l,r],[qf+l,r]),l=!1;continue}}else{var d=Object.prototype.toString.call(r),p=Object.prototype.toString.call(c);if(d===p&&(p==="[object Object]"||p==="[object Array]")){d=[A5+"\xA0\xA0".repeat(o)+a,p==="[object Array]"?"Array":""],n.push(d),p=n.length,Wc(r,c,n,o+1)?p===n.length&&(d[1]="Referentially unequal but deeply equal objects. Consider memoization."):l=!1;continue}}else if(typeof r=="function"&&typeof c=="function"&&r.name===c.name&&r.length===c.length&&(d=Function.prototype.toString.call(r),p=Function.prototype.toString.call(c),d===p)){r=c.name===""?"() => {}":c.name+"() {}",n.push([A5+"\xA0\xA0".repeat(o)+a,r+" Referentially unequal function closure. Consider memoization."]);continue}}Hl(a,r,n,o,Xf),Hl(a,c,n,o,qf)}l=!1}}else n.push([qf+"\xA0\xA0".repeat(o)+a,"\u2026"]),l=!1;return l}function Lo(e){Ut=e&63?"Blocking":e&64?"Gesture":e&4194176?"Transition":e&62914560?"Suspense":e&2080374784?"Idle":"Other"}function No(e,t,n,o){wn&&(Pi.start=t,Pi.end=n,ui.color="warning",ui.tooltipText=o,ui.properties=null,(e=e._debugTask)?e.run(performance.measure.bind(performance,o,Pi)):performance.measure(o,Pi))}function nt(e,t,n){No(e,t,n,"Reconnect")}function zi(e,t,n,o,l){var a=ue(e);if(a!==null&&wn){var r=e.alternate,c=e.actualDuration;if(r===null||r.child!==e.child)for(var d=e.child;d!==null;d=d.sibling)c-=d.actualDuration;o=.5>c?o?"tertiary-light":"primary-light":10>c?o?"tertiary":"primary":100>c?o?"tertiary-dark":"primary-dark":"error";var p=e.memoizedProps;c=e._debugTask,p!==null&&r!==null&&r.memoizedProps!==p?(d=[a4],p=Wc(r.memoizedProps,p,d,0),1<d.length&&(p&&!Zi&&(r.lanes&l)===0&&100<e.actualDuration?(Zi=!0,d[0]=i4,ui.color="warning",ui.tooltipText=O5):(ui.color=o,ui.tooltipText=a),ui.properties=d,Pi.start=t,Pi.end=n,c!=null?c.run(performance.measure.bind(performance,"\u200B"+a,Pi)):performance.measure("\u200B"+a,Pi))):c!=null?c.run(console.timeStamp.bind(console,a,t,n,Yl,void 0,o)):console.timeStamp(a,t,n,Yl,void 0,o)}}function xs(e,t,n,o){if(wn){var l=ue(e);if(l!==null){for(var a=null,r=[],c=0;c<o.length;c++){var d=o[c];a==null&&d.source!==null&&(a=d.source._debugTask),d=d.value,r.push(["Error",typeof d=="object"&&d!==null&&typeof d.message=="string"?String(d.message):String(d)])}e.key!==null&&Hl("key",e.key,r,0,""),e.memoizedProps!==null&&Er(e.memoizedProps,r,0,""),a==null&&(a=e._debugTask),e={start:t,end:n,detail:{devtools:{color:"error",track:Yl,tooltipText:e.tag===13?"Hydration failed":"Error boundary caught an error",properties:r}}},a?a.run(performance.measure.bind(performance,"\u200B"+l,e)):performance.measure("\u200B"+l,e)}}}function Ul(e,t,n,o,l){if(l!==null){if(wn){var a=ue(e);if(a!==null){o=[];for(var r=0;r<l.length;r++){var c=l[r].value;o.push(["Error",typeof c=="object"&&c!==null&&typeof c.message=="string"?String(c.message):String(c)])}e.key!==null&&Hl("key",e.key,o,0,""),e.memoizedProps!==null&&Er(e.memoizedProps,o,0,""),t={start:t,end:n,detail:{devtools:{color:"error",track:Yl,tooltipText:"A lifecycle or effect errored",properties:o}}},(e=e._debugTask)?e.run(performance.measure.bind(performance,"\u200B"+a,t)):performance.measure("\u200B"+a,t)}}}else a=ue(e),a!==null&&wn&&(l=1>o?"secondary-light":100>o?"secondary":500>o?"secondary-dark":"error",(e=e._debugTask)?e.run(console.timeStamp.bind(console,a,t,n,Yl,void 0,l)):console.timeStamp(a,t,n,Yl,void 0,l))}function Gc(e,t,n,o){if(wn&&!(t<=e)){var l=(n&738197653)===n?"tertiary-dark":"primary-dark";n=(n&536870912)===n?"Prepared":(n&201326741)===n?"Hydrated":"Render",o?o.run(console.timeStamp.bind(console,n,e,t,Ut,Nt,l)):console.timeStamp(n,e,t,Ut,Nt,l)}}function Ja(e,t,n,o){!wn||t<=e||(n=(n&738197653)===n?"tertiary-dark":"primary-dark",o?o.run(console.timeStamp.bind(console,"Prewarm",e,t,Ut,Nt,n)):console.timeStamp("Prewarm",e,t,Ut,Nt,n))}function Mr(e,t,n,o){!wn||t<=e||(n=(n&738197653)===n?"tertiary-dark":"primary-dark",o?o.run(console.timeStamp.bind(console,"Suspended",e,t,Ut,Nt,n)):console.timeStamp("Suspended",e,t,Ut,Nt,n))}function Nd(e,t,n,o,l,a){if(wn&&!(t<=e)){n=[];for(var r=0;r<o.length;r++){var c=o[r].value;n.push(["Recoverable Error",typeof c=="object"&&c!==null&&typeof c.message=="string"?String(c.message):String(c)])}e={start:e,end:t,detail:{devtools:{color:"primary-dark",track:Ut,trackGroup:Nt,tooltipText:l?"Hydration Failed":"Recovered after Error",properties:n}}},a?a.run(performance.measure.bind(performance,"Recovered",e)):performance.measure("Recovered",e)}}function ws(e,t,n,o){!wn||t<=e||(o?o.run(console.timeStamp.bind(console,"Errored",e,t,Ut,Nt,"error")):console.timeStamp("Errored",e,t,Ut,Nt,"error"))}function Ss(e,t,n,o){!wn||t<=e||(o?o.run(console.timeStamp.bind(console,n,e,t,Ut,Nt,"secondary-light")):console.timeStamp(n,e,t,Ut,Nt,"secondary-light"))}function Cs(e,t,n,o,l){if(wn&&!(t<=e)){for(var a=[],r=0;r<n.length;r++){var c=n[r].value;a.push(["Error",typeof c=="object"&&c!==null&&typeof c.message=="string"?String(c.message):String(c)])}e={start:e,end:t,detail:{devtools:{color:"error",track:Ut,trackGroup:Nt,tooltipText:o?"Remaining Effects Errored":"Commit Errored",properties:a}}},l?l.run(performance.measure.bind(performance,"Errored",e)):performance.measure("Errored",e)}}function Li(e,t,n){!wn||t<=e||(n?n.run(console.timeStamp.bind(console,"Animating",e,t,Ut,Nt,"secondary-dark")):console.timeStamp("Animating",e,t,Ut,Nt,"secondary-dark"))}function Ka(){for(var e=ec,t=gm=ec=0;t<e;){var n=Xl[t];Xl[t++]=null;var o=Xl[t];Xl[t++]=null;var l=Xl[t];Xl[t++]=null;var a=Xl[t];if(Xl[t++]=null,o!==null&&l!==null){var r=o.pending;r===null?l.next=l:(l.next=r.next,r.next=l),o.pending=l}a!==0&&ks(n,l,a)}}function Yo(e,t,n,o){Xl[ec++]=e,Xl[ec++]=t,Xl[ec++]=n,Xl[ec++]=o,gm|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function Zc(e,t,n,o){return Yo(e,t,n,o),ei(e)}function to(e,t){return Yo(e,null,null,t),ei(e)}function ks(e,t,n){e.lanes|=n;var o=e.alternate;o!==null&&(o.lanes|=n);for(var l=!1,a=e.return;a!==null;)a.childLanes|=n,o=a.alternate,o!==null&&(o.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&Nu||(l=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,l&&t!==null&&(l=31-qo(n),e=a.hiddenUpdates,o=e[l],o===null?e[l]=[t]:o.push(t),t.lane=n|536870912),a):null}function ei(e){if(sd>x4)throw Jr=sd=0,cd=Pm=null,Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");Jr>w4&&(Jr=0,cd=null,console.error("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.")),e.alternate===null&&(e.flags&4098)!==0&&I1(e);for(var t=e,n=t.return;n!==null;)t.alternate===null&&(t.flags&4098)!==0&&I1(e),t=n,n=t.return;return t.tag===3?t.stateNode:null}function ti(e){if(ql===null)return e;var t=ql(e);return t===void 0?e:t.current}function Pc(e){if(ql===null)return e;var t=ql(e);return t===void 0?e!=null&&typeof e.render=="function"&&(t=ti(e.render),e.render!==t)?(t={$$typeof:Su,render:t},e.displayName!==void 0&&(t.displayName=e.displayName),t):e:t.current}function ga(e,t){if(ql===null)return!1;var n=e.elementType;t=t.type;var o=!1,l=typeof t=="object"&&t!==null?t.$$typeof:null;switch(e.tag){case 1:typeof t=="function"&&(o=!0);break;case 0:(typeof t=="function"||l===wl)&&(o=!0);break;case 11:(l===Su||l===wl)&&(o=!0);break;case 14:case 15:(l===Df||l===wl)&&(o=!0);break;default:return!1}return!!(o&&(e=ql(n),e!==void 0&&e===ql(t)))}function Es(e){ql!==null&&typeof WeakSet=="function"&&(tc===null&&(tc=new WeakSet),tc.add(e))}function Ms(e,t,n){do{var o=e,l=o.alternate,a=o.child,r=o.sibling,c=o.tag;o=o.type;var d=null;switch(c){case 0:case 15:case 1:d=o;break;case 11:d=o.render}if(ql===null)throw Error("Expected resolveFamily to be set during hot reload.");var p=!1;if(o=!1,d!==null&&(d=ql(d),d!==void 0&&(n.has(d)?o=!0:t.has(d)&&(c===1?o=!0:p=!0))),tc!==null&&(tc.has(e)||l!==null&&tc.has(l))&&(o=!0),o&&(e._debugNeedsRemount=!0),(o||p)&&(l=to(e,2),l!==null&&Hn(l,e,2)),a===null||o||Ms(a,t,n),r===null)break;e=r}while(!0)}function l_(e,t,n,o){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null,this.actualDuration=-0,this.actualStartTime=-1.1,this.treeBaseDuration=this.selfBaseDuration=-0,this._debugTask=this._debugStack=this._debugOwner=this._debugInfo=null,this._debugNeedsRemount=!1,this._debugHookTypes=null,z5||typeof Object.preventExtensions!="function"||Object.preventExtensions(this)}function ni(e){return e=e.prototype,!(!e||!e.isReactComponent)}function $o(e,t){var n=e.alternate;switch(n===null?(n=v(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n._debugOwner=e._debugOwner,n._debugStack=e._debugStack,n._debugTask=e._debugTask,n._debugHookTypes=e._debugHookTypes,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null,n.actualDuration=-0,n.actualStartTime=-1.1),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext,_debugThenableState:t._debugThenableState},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n.selfBaseDuration=e.selfBaseDuration,n.treeBaseDuration=e.treeBaseDuration,n._debugInfo=e._debugInfo,n._debugNeedsRemount=e._debugNeedsRemount,n.tag){case 0:case 15:n.type=ti(e.type);break;case 1:n.type=ti(e.type);break;case 11:n.type=Pc(e.type)}return n}function $d(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null,e.selfBaseDuration=0,e.treeBaseDuration=0):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext,_debugThenableState:t._debugThenableState},e.selfBaseDuration=n.selfBaseDuration,e.treeBaseDuration=n.treeBaseDuration),e}function Ts(e,t,n,o,l,a){var r=0,c=e;if(typeof e=="function")ni(e)&&(r=1),c=ti(c);else if(typeof e=="string")r=ye(),r=Bx(e,n,r)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case Y0:return t=v(31,n,t,l),t.elementType=Y0,t.lanes=a,t;case Xs:return b(n.children,l,a,t);case Rf:r=8,l|=Ho,l|=ra;break;case H0:return e=n,o=l,typeof e.id!="string"&&console.error('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.',typeof e.id),t=v(12,e,t,o|Tt),t.elementType=H0,t.lanes=a,t.stateNode={effectDuration:0,passiveEffectDuration:0},t;case j0:return t=v(13,n,t,l),t.elementType=j0,t.lanes=a,t;case I0:return t=v(19,n,t,l),t.elementType=I0,t.lanes=a,t;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Oa:r=10;break e;case U0:r=9;break e;case Su:r=11,c=Pc(c);break e;case Df:r=14;break e;case wl:r=16,c=null;break e}c="",(e===void 0||typeof e=="object"&&e!==null&&Object.keys(e).length===0)&&(c+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."),e===null?n="null":ho(e)?n="array":e!==void 0&&e.$$typeof===Aa?(n="<"+(Xe(e.type)||"Unknown")+" />",c=" Did you accidentally export a JSX literal instead of a component?"):n=typeof e,(r=o?wt(o):null)&&(c+=`

Check the render method of \``+r+"`."),r=29,n=Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: "+(n+"."+c)),c=null}return t=v(r,n,t,l),t.elementType=e,t.type=c,t.lanes=a,t._debugOwner=o,t}function Tr(e,t,n){return t=Ts(e.type,e.key,e.props,e._owner,t,n),t._debugOwner=e._owner,t._debugStack=e._debugStack,t._debugTask=e._debugTask,t}function b(e,t,n,o){return e=v(7,e,o,t),e.lanes=n,e}function w(e,t,n){return e=v(6,e,null,t),e.lanes=n,e}function D(e){var t=v(18,null,null,_t);return t.stateNode=e,t}function R(e,t,n){return t=v(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function z(e,t){if(typeof e=="object"&&e!==null){var n=ym.get(e);return n!==void 0?n:(t={value:e,source:t,stack:It(t)},ym.set(e,t),t)}return{value:e,source:t,stack:It(t)}}function G(e,t){ot(),nc[oc++]=$u,nc[oc++]=Vf,Vf=e,$u=t}function ge(e,t,n){ot(),Vl[Ql++]=fi,Vl[Ql++]=hi,Vl[Ql++]=Hr,Hr=e;var o=fi;e=hi;var l=32-qo(o)-1;o&=~(1<<l),n+=1;var a=32-qo(t)+l;if(30<a){var r=l-l%5;a=(o&(1<<r)-1).toString(32),o>>=r,l-=r,fi=1<<32-qo(t)+l|n<<l|o,hi=a+e}else fi=1<<a|n<<l|o,hi=e}function Ce(e){ot(),e.return!==null&&(G(e,1),ge(e,1,0))}function $e(e){for(;e===Vf;)Vf=nc[--oc],nc[oc]=null,$u=nc[--oc],nc[oc]=null;for(;e===Hr;)Hr=Vl[--Ql],Vl[Ql]=null,hi=Vl[--Ql],Vl[Ql]=null,fi=Vl[--Ql],Vl[Ql]=null}function We(){return ot(),Hr!==null?{id:fi,overflow:hi}:null}function Pe(e,t){ot(),Vl[Ql++]=fi,Vl[Ql++]=hi,Vl[Ql++]=Hr,fi=t.id,hi=t.overflow,Hr=e}function ot(){Yt||console.error("Expected to be hydrating. This is a bug in React. Please file an issue.")}function St(e,t){if(e.return===null){if(kl===null)kl={fiber:e,children:[],serverProps:void 0,serverTail:[],distanceFromLeaf:t};else{if(kl.fiber!==e)throw Error("Saw multiple hydration diff roots in a pass. This is a bug in React.");kl.distanceFromLeaf>t&&(kl.distanceFromLeaf=t)}return kl}var n=St(e.return,t+1).children;return 0<n.length&&n[n.length-1].fiber===e?(n=n[n.length-1],n.distanceFromLeaf>t&&(n.distanceFromLeaf=t),n):(t={fiber:e,children:[],serverProps:void 0,serverTail:[],distanceFromLeaf:t},n.push(t),t)}function et(){Yt&&console.error("We should not be hydrating here. This is a bug in React. Please file a bug.")}function Le(e,t){Ha||(e=St(e,0),e.serverProps=null,t!==null&&(t=fy(t),e.serverTail.push(t)))}function ln(e){var t=1<arguments.length&&arguments[1]!==void 0?arguments[1]:!1,n="",o=kl;throw o!==null&&(kl=null,n=$c(o)),mt(z(Error("Hydration failed because the server rendered "+(t?"text":"HTML")+` didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch \`if (typeof window !== 'undefined')\`.
- Variable input such as \`Date.now()\` or \`Math.random()\` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch`+n),e)),bm}function en(e){var t=e.stateNode,n=e.type,o=e.memoizedProps;switch(t[Do]=e,t[Vo]=o,b0(n,o),n){case"dialog":qt("cancel",t),qt("close",t);break;case"iframe":case"object":case"embed":qt("load",t);break;case"video":case"audio":for(n=0;n<ud.length;n++)qt(ud[n],t);break;case"source":qt("error",t);break;case"img":case"image":case"link":qt("error",t),qt("load",t);break;case"details":qt("toggle",t);break;case"input":st("input",o),qt("invalid",t),Md(t,o),Uo(t,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"option":ds(t,o);break;case"select":st("select",o),qt("invalid",t),zc(t,o);break;case"textarea":st("textarea",o),qt("invalid",t),Td(t,o),Dd(t,o.value,o.defaultValue,o.children)}n=o.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||o.suppressHydrationWarning===!0||J1(t.textContent,n)?(o.popover!=null&&(qt("beforetoggle",t),qt("toggle",t)),o.onScroll!=null&&qt("scroll",t),o.onScrollEnd!=null&&qt("scrollend",t),o.onClick!=null&&(t.onclick=na),t=!0):t=!1,t||ln(e,!0)}function Vn(e){for(Ao=e.return;Ao;)switch(Ao.tag){case 5:case 31:case 13:Wl=!1;return;case 27:case 3:Wl=!0;return;default:Ao=Ao.return}}function Wt(e){if(e!==Ao)return!1;if(!Yt)return Vn(e),Yt=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||C0(e.type,e.memoizedProps)),n=!n),n&&Sn){for(n=Sn;n;){var o=St(e,0),l=fy(n);o.serverTail.push(l),n=l.type==="Suspense"?T0(n):xl(n.nextSibling)}ln(e)}if(Vn(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");Sn=T0(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");Sn=T0(e)}else t===27?(t=Sn,Xi(e.type)?(e=sp,sp=null,Sn=e):Sn=t):Sn=Ao?xl(e.stateNode.nextSibling):null;return!0}function cn(){Sn=Ao=null,Ha=Yt=!1}function ut(){var e=Ji;return e!==null&&(Fo===null?Fo=e:Fo.push.apply(Fo,e),Ji=null),e}function mt(e){Ji===null?Ji=[e]:Ji.push(e)}function pn(){var e=kl;if(e!==null){kl=null;for(var t=$c(e);0<e.children.length;)e=e.children[0];xe(e.fiber,function(){console.error(`A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch \`if (typeof window !== 'undefined')\`.
- Variable input such as \`Date.now()\` or \`Math.random()\` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

%s%s`,"https://react.dev/link/hydration-mismatch",t)})}}function gn(){lc=Qf=null,ac=!1}function no(e,t,n){Be(vm,t._currentValue,e),t._currentValue=n,Be(xm,t._currentRenderer,e),t._currentRenderer!==void 0&&t._currentRenderer!==null&&t._currentRenderer!==N5&&console.error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."),t._currentRenderer=N5}function Qn(e,t){e._currentValue=vm.current;var n=xm.current;Ye(xm,t),e._currentRenderer=n,Ye(vm,t)}function Pn(e,t,n){for(;e!==null;){var o=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,o!==null&&(o.childLanes|=t)):o!==null&&(o.childLanes&t)!==t&&(o.childLanes|=t),e===n)break;e=e.return}e!==n&&console.error("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.")}function oi(e,t,n,o){var l=e.child;for(l!==null&&(l.return=e);l!==null;){var a=l.dependencies;if(a!==null){var r=l.child;a=a.firstContext;e:for(;a!==null;){var c=a;a=l;for(var d=0;d<t.length;d++)if(c.context===t[d]){a.lanes|=n,c=a.alternate,c!==null&&(c.lanes|=n),Pn(a.return,n,e),o||(r=null);break e}a=c.next}}else if(l.tag===18){if(r=l.return,r===null)throw Error("We just came from a parent so we must have had a parent. This is a bug in React.");r.lanes|=n,a=r.alternate,a!==null&&(a.lanes|=n),Pn(r,n,e),r=null}else r=l.child;if(r!==null)r.return=l;else for(r=l;r!==null;){if(r===e){r=null;break}if(l=r.sibling,l!==null){l.return=r.return,r=l;break}r=r.return}l=r}}function al(e,t,n,o){e=null;for(var l=t,a=!1;l!==null;){if(!a){if((l.flags&524288)!==0)a=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var r=l.alternate;if(r===null)throw Error("Should have a current fiber. This is a bug in React.");if(r=r.memoizedProps,r!==null){var c=l.type;Wo(l.pendingProps.value,r.value)||(e!==null?e.push(c):e=[c])}}else if(l===Af.current){if(r=l.alternate,r===null)throw Error("Should have a current fiber. This is a bug in React.");r.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(e!==null?e.push(md):e=[md])}l=l.return}e!==null&&oi(t,e,n,o),t.flags|=262144}function pl(e){for(e=e.firstContext;e!==null;){if(!Wo(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function dn(e){Qf=e,lc=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Pt(e){return ac&&console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."),Bd(Qf,e)}function jl(e,t){return Qf===null&&dn(e),Bd(e,t)}function Bd(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},lc===null){if(e===null)throw Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");lc=t,e.dependencies={lanes:0,firstContext:t,_debugThenableState:null},e.flags|=524288}else lc=lc.next=t;return n}function Fc(){return{controller:new c4,data:new Map,refCount:0}}function li(e){e.controller.signal.aborted&&console.warn("A cache instance was retained after it was already freed. This likely indicates a bug in React."),e.refCount++}function Rr(e){e.refCount--,0>e.refCount&&console.warn("A cache instance was released after it was already freed. This likely indicates a bug in React."),e.refCount===0&&u4(d4,function(){e.controller.abort()})}function ya(e,t,n){(e&127)!==0?0>Ua&&(Ua=ao(),Hu=Wf(t),wm=t,n!=null&&(Sm=ue(n)),(Gt&(mo|Tl))!==wo&&(Un=!0,tr=Bu),e=yu(),t=gu(),e!==ic||t!==Uu?ic=-1.1:t!==null&&(tr=Bu),jr=e,Uu=t):(e&4194048)!==0&&0>Gl&&(Gl=ao(),ju=Wf(t),$5=t,n!=null&&(B5=ue(n)),0>pi)&&(e=yu(),t=gu(),(e!==or||t!==Ir)&&(or=-1.1),nr=e,Ir=t)}function Rv(e){if(0>Ua){Ua=ao(),Hu=e._debugTask!=null?e._debugTask:null,(Gt&(mo|Tl))!==wo&&(tr=Bu);var t=yu(),n=gu();t!==ic||n!==Uu?ic=-1.1:n!==null&&(tr=Bu),jr=t,Uu=n}0>Gl&&(Gl=ao(),ju=e._debugTask!=null?e._debugTask:null,0>pi)&&(e=yu(),t=gu(),(e!==or||t!==Ir)&&(or=-1.1),nr=e,Ir=t)}function ai(){var e=Ur;return Ur=0,e}function Hd(e){var t=Ur;return Ur=e,t}function Jc(e){var t=Ur;return Ur+=e,t}function Ud(){dt=tt=-1.1}function gl(){var e=tt;return tt=-1.1,e}function yl(e){0<=e&&(tt=e)}function ba(){var e=An;return An=-0,e}function va(e){0<=e&&(An=e)}function xa(){var e=Tn;return Tn=null,e}function wa(){var e=Un;return Un=!1,e}function a_(e){Go=ao(),0>e.actualStartTime&&(e.actualStartTime=Go)}function i_(e){if(0<=Go){var t=ao()-Go;e.actualDuration+=t,e.selfBaseDuration=t,Go=-1}}function Hp(e){if(0<=Go){var t=ao()-Go;e.actualDuration+=t,Go=-1}}function Sa(){if(0<=Go){var e=ao(),t=e-Go;Go=-1,Ur+=t,An+=t,dt=e}}function Up(e){Tn===null&&(Tn=[]),Tn.push(e),mi===null&&(mi=[]),mi.push(e)}function Ca(){Go=ao(),0>tt&&(tt=Go)}function Kc(e){for(var t=e.child;t;)e.actualDuration+=t.actualDuration,t=t.sibling}function Dv(e,t){if(Yu===null){var n=Yu=[];km=0,Yr=m0(),rc={status:"pending",value:void 0,then:function(o){n.push(o)}}}return km++,t.then(jp,jp),t}function jp(){if(--km===0&&(-1<Gl||(pi=-1.1),Yu!==null)){rc!==null&&(rc.status="fulfilled");var e=Yu;Yu=null,Yr=0,rc=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Av(e,t){var n=[],o={status:"pending",value:null,reason:null,then:function(l){n.push(l)}};return e.then(function(){o.status="fulfilled",o.value=t;for(var l=0;l<n.length;l++)(0,n[l])(t)},function(l){for(o.status="rejected",o.reason=l,l=0;l<n.length;l++)(0,n[l])(void 0)}),o}function r_(){var e=Xr.current;return e!==null?e:_n.pooledCache}function jd(e,t){t===null?Be(Xr,Xr.current,e):Be(Xr,t.pool,e)}function Ip(){var e=r_();return e===null?null:{parent:lo._currentValue,pool:e}}function Yp(){return{didWarnAboutUncachedPromise:!1,thenables:[]}}function Xp(e){return e=e.status,e==="fulfilled"||e==="rejected"}function qp(e,t,n){V.actQueue!==null&&(V.didUsePromise=!0);var o=e.thenables;if(n=o[n],n===void 0?o.push(t):n!==t&&(e.didWarnAboutUncachedPromise||(e.didWarnAboutUncachedPromise=!0,console.error("A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework.")),t.then(na,na),t=n),t._debugInfo===void 0){e=performance.now(),o=t.displayName;var l={name:typeof o=="string"?o:"Promise",start:e,end:e,value:t};t._debugInfo=[{awaited:l}],t.status!=="fulfilled"&&t.status!=="rejected"&&(e=function(){l.end=performance.now()},t.then(e,e))}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Qp(e),e;default:if(typeof t.status=="string")t.then(na,na);else{if(e=_n,e!==null&&100<e.shellSuspendCounter)throw Error("An unknown Component is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");e=t,e.status="pending",e.then(function(a){if(t.status==="pending"){var r=t;r.status="fulfilled",r.value=a}},function(a){if(t.status==="pending"){var r=t;r.status="rejected",r.reason=a}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Qp(e),e}throw Vr=t,Zu=!0,sc}}function Ni(e){try{return m4(e)}catch(t){throw t!==null&&typeof t=="object"&&typeof t.then=="function"?(Vr=t,Zu=!0,sc):t}}function Vp(){if(Vr===null)throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");var e=Vr;return Vr=null,Zu=!1,e}function Qp(e){if(e===sc||e===th)throw Error("Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.")}function Mo(e){var t=Rt;return e!=null&&(Rt=t===null?e:t.concat(e)),t}function s_(){var e=Rt;if(e!=null){for(var t=e.length-1;0<=t;t--)if(e[t].name!=null){var n=e[t].debugTask;if(n!=null)return n}}return null}function Id(e,t,n){for(var o=Object.keys(e.props),l=0;l<o.length;l++){var a=o[l];if(a!=="children"&&a!=="key"){t===null&&(t=Tr(e,n.mode,0),t._debugInfo=Rt,t.return=n),xe(t,function(r){console.error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",r)},a);break}}}function Yd(e){var t=Pu;return Pu+=1,cc===null&&(cc=Yp()),qp(cc,e,t)}function eu(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Wp(e,t){throw t.$$typeof===Gx?Error(`A React Element from an older version of React was rendered. This is not supported. It can happen if:
- Multiple copies of the "react" package is used.
- A library pre-bundled an old copy of "react" or "react/jsx-runtime".
- A compiler tries to "inline" JSX instead of using the runtime.`):(e=Object.prototype.toString.call(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead."))}function Xd(e,t){var n=s_();n!==null?n.run(Wp.bind(null,e,t)):Wp(e,t)}function Gp(e,t){var n=ue(e)||"Component";o2[n]||(o2[n]=!0,t=t.displayName||t.name||"Component",e.tag===3?console.error(`Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.
  root.render(%s)`,t,t,t):console.error(`Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.
  <%s>{%s}</%s>`,t,t,n,t,n))}function qd(e,t){var n=s_();n!==null?n.run(Gp.bind(null,e,t)):Gp(e,t)}function Zp(e,t){var n=ue(e)||"Component";l2[n]||(l2[n]=!0,t=String(t),e.tag===3?console.error(`Symbols are not valid as a React child.
  root.render(%s)`,t):console.error(`Symbols are not valid as a React child.
  <%s>%s</%s>`,n,t,n))}function Vd(e,t){var n=s_();n!==null?n.run(Zp.bind(null,e,t)):Zp(e,t)}function Pp(e){function t(S,M){if(e){var O=S.deletions;O===null?(S.deletions=[M],S.flags|=16):O.push(M)}}function n(S,M){if(!e)return null;for(;M!==null;)t(S,M),M=M.sibling;return null}function o(S){for(var M=new Map;S!==null;)S.key!==null?M.set(S.key,S):M.set(S.index,S),S=S.sibling;return M}function l(S,M){return S=$o(S,M),S.index=0,S.sibling=null,S}function a(S,M,O){return S.index=O,e?(O=S.alternate,O!==null?(O=O.index,O<M?(S.flags|=67108866,M):O):(S.flags|=67108866,M)):(S.flags|=1048576,M)}function r(S){return e&&S.alternate===null&&(S.flags|=67108866),S}function c(S,M,O,P){return M===null||M.tag!==6?(M=w(O,S.mode,P),M.return=S,M._debugOwner=S,M._debugTask=S._debugTask,M._debugInfo=Rt,M):(M=l(M,O),M.return=S,M._debugInfo=Rt,M)}function d(S,M,O,P){var Re=O.type;return Re===Xs?(M=L(S,M,O.props.children,P,O.key),Id(O,M,S),M):M!==null&&(M.elementType===Re||ga(M,O)||typeof Re=="object"&&Re!==null&&Re.$$typeof===wl&&Ni(Re)===M.type)?(M=l(M,O.props),eu(M,O),M.return=S,M._debugOwner=O._owner,M._debugInfo=Rt,M):(M=Tr(O,S.mode,P),eu(M,O),M.return=S,M._debugInfo=Rt,M)}function p(S,M,O,P){return M===null||M.tag!==4||M.stateNode.containerInfo!==O.containerInfo||M.stateNode.implementation!==O.implementation?(M=R(O,S.mode,P),M.return=S,M._debugInfo=Rt,M):(M=l(M,O.children||[]),M.return=S,M._debugInfo=Rt,M)}function L(S,M,O,P,Re){return M===null||M.tag!==7?(M=b(O,S.mode,P,Re),M.return=S,M._debugOwner=S,M._debugTask=S._debugTask,M._debugInfo=Rt,M):(M=l(M,O),M.return=S,M._debugInfo=Rt,M)}function N(S,M,O){if(typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint")return M=w(""+M,S.mode,O),M.return=S,M._debugOwner=S,M._debugTask=S._debugTask,M._debugInfo=Rt,M;if(typeof M=="object"&&M!==null){switch(M.$$typeof){case Aa:return O=Tr(M,S.mode,O),eu(O,M),O.return=S,S=Mo(M._debugInfo),O._debugInfo=Rt,Rt=S,O;case Ys:return M=R(M,S.mode,O),M.return=S,M._debugInfo=Rt,M;case wl:var P=Mo(M._debugInfo);return M=Ni(M),S=N(S,M,O),Rt=P,S}if(ho(M)||Me(M))return O=b(M,S.mode,O,null),O.return=S,O._debugOwner=S,O._debugTask=S._debugTask,S=Mo(M._debugInfo),O._debugInfo=Rt,Rt=S,O;if(typeof M.then=="function")return P=Mo(M._debugInfo),S=N(S,Yd(M),O),Rt=P,S;if(M.$$typeof===Oa)return N(S,jl(S,M),O);Xd(S,M)}return typeof M=="function"&&qd(S,M),typeof M=="symbol"&&Vd(S,M),null}function C(S,M,O,P){var Re=M!==null?M.key:null;if(typeof O=="string"&&O!==""||typeof O=="number"||typeof O=="bigint")return Re!==null?null:c(S,M,""+O,P);if(typeof O=="object"&&O!==null){switch(O.$$typeof){case Aa:return O.key===Re?(Re=Mo(O._debugInfo),S=d(S,M,O,P),Rt=Re,S):null;case Ys:return O.key===Re?p(S,M,O,P):null;case wl:return Re=Mo(O._debugInfo),O=Ni(O),S=C(S,M,O,P),Rt=Re,S}if(ho(O)||Me(O))return Re!==null?null:(Re=Mo(O._debugInfo),S=L(S,M,O,P,null),Rt=Re,S);if(typeof O.then=="function")return Re=Mo(O._debugInfo),S=C(S,M,Yd(O),P),Rt=Re,S;if(O.$$typeof===Oa)return C(S,M,jl(S,O),P);Xd(S,O)}return typeof O=="function"&&qd(S,O),typeof O=="symbol"&&Vd(S,O),null}function Y(S,M,O,P,Re){if(typeof P=="string"&&P!==""||typeof P=="number"||typeof P=="bigint")return S=S.get(O)||null,c(M,S,""+P,Re);if(typeof P=="object"&&P!==null){switch(P.$$typeof){case Aa:return O=S.get(P.key===null?O:P.key)||null,S=Mo(P._debugInfo),M=d(M,O,P,Re),Rt=S,M;case Ys:return S=S.get(P.key===null?O:P.key)||null,p(M,S,P,Re);case wl:var yt=Mo(P._debugInfo);return P=Ni(P),M=Y(S,M,O,P,Re),Rt=yt,M}if(ho(P)||Me(P))return O=S.get(O)||null,S=Mo(P._debugInfo),M=L(M,O,P,Re,null),Rt=S,M;if(typeof P.then=="function")return yt=Mo(P._debugInfo),M=Y(S,M,O,Yd(P),Re),Rt=yt,M;if(P.$$typeof===Oa)return Y(S,M,O,jl(M,P),Re);Xd(M,P)}return typeof P=="function"&&qd(M,P),typeof P=="symbol"&&Vd(M,P),null}function ve(S,M,O,P){if(typeof O!="object"||O===null)return P;switch(O.$$typeof){case Aa:case Ys:B(S,M,O);var Re=O.key;if(typeof Re!="string")break;if(P===null){P=new Set,P.add(Re);break}if(!P.has(Re)){P.add(Re);break}xe(M,function(){console.error("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted \u2014 the behavior is unsupported and could change in a future version.",Re)});break;case wl:O=Ni(O),ve(S,M,O,P)}return P}function ze(S,M,O,P){for(var Re=null,yt=null,Ke=null,Qe=M,Et=M=0,Cn=null;Qe!==null&&Et<O.length;Et++){Qe.index>Et?(Cn=Qe,Qe=null):Cn=Qe.sibling;var Jn=C(S,Qe,O[Et],P);if(Jn===null){Qe===null&&(Qe=Cn);break}Re=ve(S,Jn,O[Et],Re),e&&Qe&&Jn.alternate===null&&t(S,Qe),M=a(Jn,M,Et),Ke===null?yt=Jn:Ke.sibling=Jn,Ke=Jn,Qe=Cn}if(Et===O.length)return n(S,Qe),Yt&&G(S,Et),yt;if(Qe===null){for(;Et<O.length;Et++)Qe=N(S,O[Et],P),Qe!==null&&(Re=ve(S,Qe,O[Et],Re),M=a(Qe,M,Et),Ke===null?yt=Qe:Ke.sibling=Qe,Ke=Qe);return Yt&&G(S,Et),yt}for(Qe=o(Qe);Et<O.length;Et++)Cn=Y(Qe,S,Et,O[Et],P),Cn!==null&&(Re=ve(S,Cn,O[Et],Re),e&&Cn.alternate!==null&&Qe.delete(Cn.key===null?Et:Cn.key),M=a(Cn,M,Et),Ke===null?yt=Cn:Ke.sibling=Cn,Ke=Cn);return e&&Qe.forEach(function(ki){return t(S,ki)}),Yt&&G(S,Et),yt}function bn(S,M,O,P){if(O==null)throw Error("An iterable object provided no iterator.");for(var Re=null,yt=null,Ke=M,Qe=M=0,Et=null,Cn=null,Jn=O.next();Ke!==null&&!Jn.done;Qe++,Jn=O.next()){Ke.index>Qe?(Et=Ke,Ke=null):Et=Ke.sibling;var ki=C(S,Ke,Jn.value,P);if(ki===null){Ke===null&&(Ke=Et);break}Cn=ve(S,ki,Jn.value,Cn),e&&Ke&&ki.alternate===null&&t(S,Ke),M=a(ki,M,Qe),yt===null?Re=ki:yt.sibling=ki,yt=ki,Ke=Et}if(Jn.done)return n(S,Ke),Yt&&G(S,Qe),Re;if(Ke===null){for(;!Jn.done;Qe++,Jn=O.next())Ke=N(S,Jn.value,P),Ke!==null&&(Cn=ve(S,Ke,Jn.value,Cn),M=a(Ke,M,Qe),yt===null?Re=Ke:yt.sibling=Ke,yt=Ke);return Yt&&G(S,Qe),Re}for(Ke=o(Ke);!Jn.done;Qe++,Jn=O.next())Et=Y(Ke,S,Qe,Jn.value,P),Et!==null&&(Cn=ve(S,Et,Jn.value,Cn),e&&Et.alternate!==null&&Ke.delete(Et.key===null?Qe:Et.key),M=a(Et,M,Qe),yt===null?Re=Et:yt.sibling=Et,yt=Et);return e&&Ke.forEach(function(U4){return t(S,U4)}),Yt&&G(S,Qe),Re}function Vt(S,M,O,P){if(typeof O=="object"&&O!==null&&O.type===Xs&&O.key===null&&(Id(O,null,S),O=O.props.children),typeof O=="object"&&O!==null){switch(O.$$typeof){case Aa:var Re=Mo(O._debugInfo);e:{for(var yt=O.key;M!==null;){if(M.key===yt){if(yt=O.type,yt===Xs){if(M.tag===7){n(S,M.sibling),P=l(M,O.props.children),P.return=S,P._debugOwner=O._owner,P._debugInfo=Rt,Id(O,P,S),S=P;break e}}else if(M.elementType===yt||ga(M,O)||typeof yt=="object"&&yt!==null&&yt.$$typeof===wl&&Ni(yt)===M.type){n(S,M.sibling),P=l(M,O.props),eu(P,O),P.return=S,P._debugOwner=O._owner,P._debugInfo=Rt,S=P;break e}n(S,M);break}else t(S,M);M=M.sibling}O.type===Xs?(P=b(O.props.children,S.mode,P,O.key),P.return=S,P._debugOwner=S,P._debugTask=S._debugTask,P._debugInfo=Rt,Id(O,P,S),S=P):(P=Tr(O,S.mode,P),eu(P,O),P.return=S,P._debugInfo=Rt,S=P)}return S=r(S),Rt=Re,S;case Ys:e:{for(Re=O,O=Re.key;M!==null;){if(M.key===O)if(M.tag===4&&M.stateNode.containerInfo===Re.containerInfo&&M.stateNode.implementation===Re.implementation){n(S,M.sibling),P=l(M,Re.children||[]),P.return=S,S=P;break e}else{n(S,M);break}else t(S,M);M=M.sibling}P=R(Re,S.mode,P),P.return=S,S=P}return r(S);case wl:return Re=Mo(O._debugInfo),O=Ni(O),S=Vt(S,M,O,P),Rt=Re,S}if(ho(O))return Re=Mo(O._debugInfo),S=ze(S,M,O,P),Rt=Re,S;if(Me(O)){if(Re=Mo(O._debugInfo),yt=Me(O),typeof yt!="function")throw Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");var Ke=yt.call(O);return Ke===O?(S.tag!==0||Object.prototype.toString.call(S.type)!=="[object GeneratorFunction]"||Object.prototype.toString.call(Ke)!=="[object Generator]")&&(t2||console.error("Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."),t2=!0):O.entries!==yt||Rm||(console.error("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),Rm=!0),S=bn(S,M,Ke,P),Rt=Re,S}if(typeof O.then=="function")return Re=Mo(O._debugInfo),S=Vt(S,M,Yd(O),P),Rt=Re,S;if(O.$$typeof===Oa)return Vt(S,M,jl(S,O),P);Xd(S,O)}return typeof O=="string"&&O!==""||typeof O=="number"||typeof O=="bigint"?(Re=""+O,M!==null&&M.tag===6?(n(S,M.sibling),P=l(M,Re),P.return=S,S=P):(n(S,M),P=w(Re,S.mode,P),P.return=S,P._debugOwner=S,P._debugTask=S._debugTask,P._debugInfo=Rt,S=P),r(S)):(typeof O=="function"&&qd(S,O),typeof O=="symbol"&&Vd(S,O),n(S,M))}return function(S,M,O,P){var Re=Rt;Rt=null;try{Pu=0;var yt=Vt(S,M,O,P);return cc=null,yt}catch(Cn){if(Cn===sc||Cn===th)throw Cn;var Ke=v(29,Cn,null,S.mode);Ke.lanes=P,Ke.return=S;var Qe=Ke._debugInfo=Rt;if(Ke._debugOwner=S._debugOwner,Ke._debugTask=S._debugTask,Qe!=null){for(var Et=Qe.length-1;0<=Et;Et--)if(typeof Qe[Et].stack=="string"){Ke._debugOwner=Qe[Et],Ke._debugTask=Qe[Et].debugTask;break}}return Ke}finally{Rt=Re}}}function Fp(e,t){var n=ho(e);return e=!n&&typeof Me(e)=="function",n||e?(n=n?"array":"iterable",console.error("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>",n,t,n),!1):!0}function c_(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function u_(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function $i(e){return{lane:e,tag:i2,payload:null,callback:null,next:null}}function Bi(e,t,n){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,Am===o&&!c2){var l=ue(e);console.error(`An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.

Please update the following component: %s`,l),c2=!0}return(Gt&mo)!==wo?(l=o.pending,l===null?t.next=t:(t.next=l.next,l.next=t),o.pending=t,t=ei(e),ks(e,null,n),t):(Yo(e,o,t,n),ei(e))}function tu(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var o=t.lanes;o&=e.pendingLanes,n|=o,t.lanes=n,te(e,n)}}function Qd(e,t){var n=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,n===o)){var l=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?l=a=r:a=a.next=r,n=n.next}while(n!==null);a===null?l=a=t:a=a.next=t}else l=a=t;n={baseState:o.baseState,firstBaseUpdate:l,lastBaseUpdate:a,shared:o.shared,callbacks:o.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function nu(){if(Om){var e=rc;if(e!==null)throw e}}function ou(e,t,n,o){Om=!1;var l=e.updateQueue;lr=!1,Am=l.shared;var a=l.firstBaseUpdate,r=l.lastBaseUpdate,c=l.shared.pending;if(c!==null){l.shared.pending=null;var d=c,p=d.next;d.next=null,r===null?a=p:r.next=p,r=d;var L=e.alternate;L!==null&&(L=L.updateQueue,c=L.lastBaseUpdate,c!==r&&(c===null?L.firstBaseUpdate=p:c.next=p,L.lastBaseUpdate=d))}if(a!==null){var N=l.baseState;r=0,L=p=d=null,c=a;do{var C=c.lane&-536870913,Y=C!==c.lane;if(Y?(Dt&C)===C:(o&C)===C){C!==0&&C===Yr&&(Om=!0),L!==null&&(L=L.next={lane:0,tag:c.tag,payload:c.payload,callback:null,next:null});e:{C=e;var ve=c,ze=t,bn=n;switch(ve.tag){case r2:if(ve=ve.payload,typeof ve=="function"){ac=!0;var Vt=ve.call(bn,N,ze);if(C.mode&Ho){Se(!0);try{ve.call(bn,N,ze)}finally{Se(!1)}}ac=!1,N=Vt;break e}N=ve;break e;case Dm:C.flags=C.flags&-65537|128;case i2:if(Vt=ve.payload,typeof Vt=="function"){if(ac=!0,ve=Vt.call(bn,N,ze),C.mode&Ho){Se(!0);try{Vt.call(bn,N,ze)}finally{Se(!1)}}ac=!1}else ve=Vt;if(ve==null)break e;N=Lt({},N,ve);break e;case s2:lr=!0}}C=c.callback,C!==null&&(e.flags|=64,Y&&(e.flags|=8192),Y=l.callbacks,Y===null?l.callbacks=[C]:Y.push(C))}else Y={lane:C,tag:c.tag,payload:c.payload,callback:c.callback,next:null},L===null?(p=L=Y,d=N):L=L.next=Y,r|=C;if(c=c.next,c===null){if(c=l.shared.pending,c===null)break;Y=c,c=Y.next,Y.next=null,l.lastBaseUpdate=Y,l.shared.pending=null}}while(!0);L===null&&(d=N),l.baseState=d,l.firstBaseUpdate=p,l.lastBaseUpdate=L,a===null&&(l.shared.lanes=0),rr|=r,e.lanes=r,e.memoizedState=N}Am=null}function Jp(e,t){if(typeof e!="function")throw Error("Invalid argument passed as callback. Expected a function. Instead received: "+e);e.call(t)}function Ov(e,t){var n=e.shared.hiddenCallbacks;if(n!==null)for(e.shared.hiddenCallbacks=null,e=0;e<n.length;e++)Jp(n[e],t)}function Kp(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Jp(n[e],t)}function eg(e,t){var n=Ya;Be(oh,n,e),Be(uc,t,e),Ya=n|t.baseLanes}function d_(e){Be(oh,Ya,e),Be(uc,uc.current,e)}function f_(e){Ya=oh.current,Ye(uc,e),Ye(oh,e)}function Hi(e){var t=e.alternate;Be(Fn,Fn.current&dc,e),Be(El,e,e),Zl===null&&(t===null||uc.current!==null||t.memoizedState!==null)&&(Zl=e)}function h_(e){Be(Fn,Fn.current,e),Be(El,e,e),Zl===null&&(Zl=e)}function tg(e){e.tag===22?(Be(Fn,Fn.current,e),Be(El,e,e),Zl===null&&(Zl=e)):Ui(e)}function Ui(e){Be(Fn,Fn.current,e),Be(El,El.current,e)}function bl(e){Ye(El,e),Zl===e&&(Zl=null),Ye(Fn,e)}function Wd(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||E0(n)||M0(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}function zt(){var e=q;Fl===null?Fl=[e]:Fl.push(e)}function _e(){var e=q;if(Fl!==null&&(vi++,Fl[vi]!==e)){var t=ue(gt);if(!u2.has(t)&&(u2.add(t),Fl!==null)){for(var n="",o=0;o<=vi;o++){var l=Fl[o],a=o===vi?e:l;for(l=o+1+". "+l;30>l.length;)l+=" ";l+=a+`
`,n+=l}console.error(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`,t,n)}}}function Rs(e){e==null||ho(e)||console.error("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.",q,typeof e)}function Gd(){var e=ue(gt);f2.has(e)||(f2.add(e),console.error("ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.",e))}function Wn(){throw Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`)}function __(e,t){if(Ku)return!1;if(t===null)return console.error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.",q),!1;e.length!==t.length&&console.error(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`,q,"["+t.join(", ")+"]","["+e.join(", ")+"]");for(var n=0;n<t.length&&n<e.length;n++)if(!Wo(e[n],t[n]))return!1;return!0}function m_(e,t,n,o,l,a){yi=a,gt=t,Fl=e!==null?e._debugHookTypes:null,vi=-1,Ku=e!==null&&e.type!==t.type,(Object.prototype.toString.call(n)==="[object AsyncFunction]"||Object.prototype.toString.call(n)==="[object AsyncGeneratorFunction]")&&(a=ue(gt),zm.has(a)||(zm.add(a),console.error("%s is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.",a===null?"An unknown Component":"<"+a+">"))),t.memoizedState=null,t.updateQueue=null,t.lanes=0,V.H=e!==null&&e.memoizedState!==null?Nm:Fl!==null?h2:Lm,Wr=a=(t.mode&Ho)!==_t;var r=Em(n,o,l);if(Wr=!1,hc&&(r=p_(t,n,o,l)),a){Se(!0);try{r=p_(t,n,o,l)}finally{Se(!1)}}return ng(e,t),r}function ng(e,t){t._debugHookTypes=Fl,t.dependencies===null?bi!==null&&(t.dependencies={lanes:0,firstContext:null,_debugThenableState:bi}):t.dependencies._debugThenableState=bi,V.H=ed;var n=hn!==null&&hn.next!==null;if(yi=0,Fl=q=io=hn=gt=null,vi=-1,e!==null&&(e.flags&65011712)!==(t.flags&65011712)&&console.error("Internal React error: Expected static flag was missing. Please notify the React team."),ah=!1,Ju=0,bi=null,n)throw Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");e===null||ro||(e=e.dependencies,e!==null&&pl(e)&&(ro=!0)),Zu?(Zu=!1,e=!0):e=!1,e&&(t=ue(t)||"Unknown",d2.has(t)||zm.has(t)||(d2.add(t),console.error("`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary.")))}function p_(e,t,n,o){gt=e;var l=0;do{if(hc&&(bi=null),Ju=0,hc=!1,l>=g4)throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");if(l+=1,Ku=!1,io=hn=null,e.updateQueue!=null){var a=e.updateQueue;a.lastEffect=null,a.events=null,a.stores=null,a.memoCache!=null&&(a.memoCache.index=0)}vi=-1,V.H=_2,a=Em(t,n,o)}while(hc);return a}function zv(){var e=V.H,t=e.useState()[0];return t=typeof t.then=="function"?lu(t):t,e=e.useState()[0],(hn!==null?hn.memoizedState:null)!==e&&(gt.flags|=1024),t}function g_(){var e=ih!==0;return ih=0,e}function y_(e,t,n){t.updateQueue=e.updateQueue,t.flags=(t.mode&ra)!==_t?t.flags&-402655237:t.flags&-2053,e.lanes&=~n}function b_(e){if(ah){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}ah=!1}yi=0,Fl=io=hn=gt=null,vi=-1,q=null,hc=!1,Ju=ih=0,bi=null}function Xo(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return io===null?gt.memoizedState=io=e:io=io.next=e,io}function an(){if(hn===null){var e=gt.alternate;e=e!==null?e.memoizedState:null}else e=hn.next;var t=io===null?gt.memoizedState:io.next;if(t!==null)io=t,hn=e;else{if(e===null)throw gt.alternate===null?Error("Update hook called on initial render. This is likely a bug in React. Please file an issue."):Error("Rendered more hooks than during the previous render.");hn=e,e={memoizedState:hn.memoizedState,baseState:hn.baseState,baseQueue:hn.baseQueue,queue:hn.queue,next:null},io===null?gt.memoizedState=io=e:io=io.next=e}return io}function Zd(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function lu(e){var t=Ju;return Ju+=1,bi===null&&(bi=Yp()),e=qp(bi,e,t),t=gt,(io===null?t.memoizedState:io.next)===null&&(t=t.alternate,V.H=t!==null&&t.memoizedState!==null?Nm:Lm),e}function ji(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return lu(e);if(e.$$typeof===Oa)return Pt(e)}throw Error("An unsupported type was passed to use(): "+String(e))}function Dr(e){var t=null,n=gt.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var o=gt.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(t={data:o.data.map(function(l){return l.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=Zd(),gt.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0||Ku)for(n=t.data[t.index]=Array(e),o=0;o<e;o++)n[o]=Zx;else n.length!==e&&console.error("Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.",n.length,e);return t.index++,n}function oa(e,t){return typeof t=="function"?t(e):t}function v_(e,t,n){var o=Xo();if(n!==void 0){var l=n(t);if(Wr){Se(!0);try{n(t)}finally{Se(!1)}}}else l=t;return o.memoizedState=o.baseState=l,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:l},o.queue=e,e=e.dispatch=Hv.bind(null,gt,e),[o.memoizedState,e]}function Ds(e){var t=an();return x_(t,hn,e)}function x_(e,t,n){var o=e.queue;if(o===null)throw Error("Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)");o.lastRenderedReducer=n;var l=e.baseQueue,a=o.pending;if(a!==null){if(l!==null){var r=l.next;l.next=a.next,a.next=r}t.baseQueue!==l&&console.error("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."),t.baseQueue=l=a,o.pending=null}if(a=e.baseState,l===null)e.memoizedState=a;else{t=l.next;var c=r=null,d=null,p=t,L=!1;do{var N=p.lane&-536870913;if(N!==p.lane?(Dt&N)===N:(yi&N)===N){var C=p.revertLane;if(C===0)d!==null&&(d=d.next={lane:0,revertLane:0,gesture:null,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null}),N===Yr&&(L=!0);else if((yi&C)===C){p=p.next,C===Yr&&(L=!0);continue}else N={lane:0,revertLane:p.revertLane,gesture:null,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null},d===null?(c=d=N,r=a):d=d.next=N,gt.lanes|=C,rr|=C;N=p.action,Wr&&n(a,N),a=p.hasEagerState?p.eagerState:n(a,N)}else C={lane:N,revertLane:p.revertLane,gesture:p.gesture,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null},d===null?(c=d=C,r=a):d=d.next=C,gt.lanes|=N,rr|=N;p=p.next}while(p!==null&&p!==t);if(d===null?r=a:d.next=c,!Wo(a,e.memoizedState)&&(ro=!0,L&&(n=rc,n!==null)))throw n;e.memoizedState=a,e.baseState=r,e.baseQueue=d,o.lastRenderedState=a}return l===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function au(e){var t=an(),n=t.queue;if(n===null)throw Error("Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)");n.lastRenderedReducer=e;var o=n.dispatch,l=n.pending,a=t.memoizedState;if(l!==null){n.pending=null;var r=l=l.next;do a=e(a,r.action),r=r.next;while(r!==l);Wo(a,t.memoizedState)||(ro=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,o]}function w_(e,t,n){var o=gt,l=Xo();if(Yt){if(n===void 0)throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");var a=n();fc||a===n()||(console.error("The result of getServerSnapshot should be cached to avoid an infinite loop"),fc=!0)}else{if(a=t(),fc||(n=t(),Wo(a,n)||(console.error("The result of getSnapshot should be cached to avoid an infinite loop"),fc=!0)),_n===null)throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");(Dt&127)!==0||og(o,t,a)}return l.memoizedState=a,n={value:a,getSnapshot:t},l.queue=n,Kd(ag.bind(null,o,n,e),[e]),o.flags|=2048,Os(Pl|Po,{destroy:void 0},lg.bind(null,o,n,a,t),null),a}function Pd(e,t,n){var o=gt,l=an(),a=Yt;if(a){if(n===void 0)throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");n=n()}else if(n=t(),!fc){var r=t();Wo(n,r)||(console.error("The result of getSnapshot should be cached to avoid an infinite loop"),fc=!0)}(r=!Wo((hn||l).memoizedState,n))&&(l.memoizedState=n,ro=!0),l=l.queue;var c=ag.bind(null,o,l,e);if(il(2048,Po,c,[e]),l.getSnapshot!==t||r||io!==null&&io.memoizedState.tag&Pl){if(o.flags|=2048,Os(Pl|Po,{destroy:void 0},lg.bind(null,o,l,n,t),null),_n===null)throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");a||(yi&127)!==0||og(o,t,n)}return n}function og(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=gt.updateQueue,t===null?(t=Zd(),gt.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function lg(e,t,n,o){t.value=n,t.getSnapshot=o,ig(t)&&rg(e)}function ag(e,t,n){return n(function(){ig(t)&&(ya(2,"updateSyncExternalStore()",e),rg(e))})}function ig(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Wo(e,n)}catch{return!0}}function rg(e){var t=to(e,2);t!==null&&Hn(t,e,2)}function S_(e){var t=Xo();if(typeof e=="function"){var n=e;if(e=n(),Wr){Se(!0);try{n()}finally{Se(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:e},t}function C_(e){e=S_(e);var t=e.queue,n=Eg.bind(null,gt,t);return t.dispatch=n,[e.memoizedState,n]}function k_(e){var t=Xo();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=U_.bind(null,gt,!0,n),n.dispatch=t,[e,t]}function sg(e,t){var n=an();return cg(n,hn,e,t)}function cg(e,t,n,o){return e.baseState=n,x_(e,hn,typeof o=="function"?o:oa)}function ug(e,t){var n=an();return hn!==null?cg(n,hn,e,t):(n.baseState=e,[e,n.queue.dispatch])}function Lv(e,t,n,o,l){if(af(e))throw Error("Cannot update form state while rendering.");if(e=t.action,e!==null){var a={payload:l,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){a.listeners.push(r)}};V.T!==null?n(!0):a.isTransition=!1,o(a),n=t.pending,n===null?(a.next=t.pending=a,dg(t,a)):(a.next=n.next,t.pending=n.next=a)}}function dg(e,t){var n=t.action,o=t.payload,l=e.state;if(t.isTransition){var a=V.T,r={};r._updatedFibers=new Set,V.T=r;try{var c=n(l,o),d=V.S;d!==null&&d(r,c),fg(e,t,c)}catch(p){E_(e,t,p)}finally{a!==null&&r.types!==null&&(a.types!==null&&a.types!==r.types&&console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."),a.types=r.types),V.T=a,a===null&&r._updatedFibers&&(e=r._updatedFibers.size,r._updatedFibers.clear(),10<e&&console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."))}}else try{r=n(l,o),fg(e,t,r)}catch(p){E_(e,t,p)}}function fg(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?(V.asyncTransitions++,n.then(lf,lf),n.then(function(o){hg(e,t,o)},function(o){return E_(e,t,o)}),t.isTransition||console.error("An async function with useActionState was called outside of a transition. This is likely not what you intended (for example, isPending will not update correctly). Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop.")):hg(e,t,n)}function hg(e,t,n){t.status="fulfilled",t.value=n,_g(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,dg(e,n)))}function E_(e,t,n){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do t.status="rejected",t.reason=n,_g(t),t=t.next;while(t!==o)}e.action=null}function _g(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function mg(e,t){return t}function As(e,t){if(Yt){var n=_n.formState;if(n!==null){e:{var o=gt;if(Yt){if(Sn){t:{for(var l=Sn,a=Wl;l.nodeType!==8;){if(!a){l=null;break t}if(l=xl(l.nextSibling),l===null){l=null;break t}}a=l.data,l=a===lp||a===K2?l:null}if(l){Sn=xl(l.nextSibling),o=l.data===lp;break e}}ln(o)}o=!1}o&&(t=n[0])}}return n=Xo(),n.memoizedState=n.baseState=t,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:mg,lastRenderedState:t},n.queue=o,n=Eg.bind(null,gt,o),o.dispatch=n,o=S_(!1),a=U_.bind(null,gt,!1,o.queue),o=Xo(),l={state:t,dispatch:null,action:e,pending:null},o.queue=l,n=Lv.bind(null,gt,l,a,n),l.dispatch=n,o.memoizedState=e,[t,n,!1]}function Fd(e){var t=an();return pg(t,hn,e)}function pg(e,t,n){if(t=x_(e,t,mg)[0],e=Ds(oa)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var o=lu(t)}catch(r){throw r===sc?th:r}else o=t;t=an();var l=t.queue,a=l.dispatch;return n!==t.memoizedState&&(gt.flags|=2048,Os(Pl|Po,{destroy:void 0},Nv.bind(null,l,n),null)),[o,a,e]}function Nv(e,t){e.action=t}function Jd(e){var t=an(),n=hn;if(n!==null)return pg(t,n,e);an(),t=t.memoizedState,n=an();var o=n.queue.dispatch;return n.memoizedState=e,[t,o,!1]}function Os(e,t,n,o){return e={tag:e,create:n,deps:o,inst:t,next:null},t=gt.updateQueue,t===null&&(t=Zd(),gt.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(o=n.next,n.next=e,e.next=o,t.lastEffect=e),e}function M_(e){var t=Xo();return e={current:e},t.memoizedState=e}function Ar(e,t,n,o){var l=Xo();gt.flags|=e,l.memoizedState=Os(Pl|t,{destroy:void 0},n,o===void 0?null:o)}function il(e,t,n,o){var l=an();o=o===void 0?null:o;var a=l.memoizedState.inst;hn!==null&&o!==null&&__(o,hn.memoizedState.deps)?l.memoizedState=Os(t,a,n,o):(gt.flags|=e,l.memoizedState=Os(Pl|t,a,n,o))}function Kd(e,t){(gt.mode&ra)!==_t?Ar(276826112,Po,e,t):Ar(8390656,Po,e,t)}function $v(e){gt.flags|=4;var t=gt.updateQueue;if(t===null)t=Zd(),gt.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function T_(e){var t=Xo(),n={impl:e};return t.memoizedState=n,function(){if((Gt&mo)!==wo)throw Error("A function wrapped in useEffectEvent can't be called during rendering.");return n.impl.apply(void 0,arguments)}}function ef(e){var t=an().memoizedState;return $v({ref:t,nextImpl:e}),function(){if((Gt&mo)!==wo)throw Error("A function wrapped in useEffectEvent can't be called during rendering.");return t.impl.apply(void 0,arguments)}}function R_(e,t){var n=4194308;return(gt.mode&ra)!==_t&&(n|=134217728),Ar(n,Ml,e,t)}function gg(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return t.hasOwnProperty("current")||console.error("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.","an object with keys {"+Object.keys(t).join(", ")+"}"),e=e(),t.current=e,function(){t.current=null}}function D_(e,t,n){typeof t!="function"&&console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",t!==null?typeof t:"null"),n=n!=null?n.concat([e]):null;var o=4194308;(gt.mode&ra)!==_t&&(o|=134217728),Ar(o,Ml,gg.bind(null,t,e),n)}function tf(e,t,n){typeof t!="function"&&console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",t!==null?typeof t:"null"),n=n!=null?n.concat([e]):null,il(4,Ml,gg.bind(null,t,e),n)}function A_(e,t){return Xo().memoizedState=[e,t===void 0?null:t],e}function nf(e,t){var n=an();t=t===void 0?null:t;var o=n.memoizedState;return t!==null&&__(t,o[1])?o[0]:(n.memoizedState=[e,t],e)}function O_(e,t){var n=Xo();t=t===void 0?null:t;var o=e();if(Wr){Se(!0);try{e()}finally{Se(!1)}}return n.memoizedState=[o,t],o}function of(e,t){var n=an();t=t===void 0?null:t;var o=n.memoizedState;if(t!==null&&__(t,o[1]))return o[0];if(o=e(),Wr){Se(!0);try{e()}finally{Se(!1)}}return n.memoizedState=[o,t],o}function z_(e,t){var n=Xo();return L_(n,e,t)}function yg(e,t){var n=an();return vg(n,hn.memoizedState,e,t)}function bg(e,t){var n=an();return hn===null?L_(n,e,t):vg(n,hn.memoizedState,e,t)}function L_(e,t,n){return n===void 0||(yi&1073741824)!==0&&(Dt&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=x1(),gt.lanes|=e,rr|=e,n)}function vg(e,t,n,o){return Wo(n,t)?n:uc.current!==null?(e=L_(e,n,o),Wo(e,t)||(ro=!0),e):(yi&42)===0||(yi&1073741824)!==0&&(Dt&261930)===0?(ro=!0,e.memoizedState=n):(e=x1(),gt.lanes|=e,rr|=e,t)}function lf(){V.asyncTransitions--}function xg(e,t,n,o,l){var a=nn.p;nn.p=a!==0&&a<ia?a:ia;var r=V.T,c={};c._updatedFibers=new Set,V.T=c,U_(e,!1,t,n);try{var d=l(),p=V.S;if(p!==null&&p(c,d),d!==null&&typeof d=="object"&&typeof d.then=="function"){V.asyncTransitions++,d.then(lf,lf);var L=Av(d,o);iu(e,t,L,vl(e))}else iu(e,t,o,vl(e))}catch(N){iu(e,t,{then:function(){},status:"rejected",reason:N},vl(e))}finally{nn.p=a,r!==null&&c.types!==null&&(r.types!==null&&r.types!==c.types&&console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."),r.types=c.types),V.T=r,r===null&&c._updatedFibers&&(e=c._updatedFibers.size,c._updatedFibers.clear(),10<e&&console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."))}}function N_(e,t,n,o){if(e.tag!==5)throw Error("Expected the form instance to be a HostComponent. This is a bug in React.");var l=wg(e).queue;Rv(e),xg(e,l,t,ls,n===null?ie:function(){return Sg(e),n(o)})}function wg(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ls,baseState:ls,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:ls},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Sg(e){V.T===null&&console.error("requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition.");var t=wg(e);t.next===null&&(t=e.alternate.memoizedState),iu(e,t.next.queue,{},vl(e))}function $_(){var e=S_(!1);return e=xg.bind(null,gt,e.queue,!0,!1),Xo().memoizedState=e,[!1,e]}function Cg(){var e=Ds(oa)[0],t=an().memoizedState;return[typeof e=="boolean"?e:lu(e),t]}function kg(){var e=au(oa)[0],t=an().memoizedState;return[typeof e=="boolean"?e:lu(e),t]}function Or(){return Pt(md)}function B_(){var e=Xo(),t=_n.identifierPrefix;if(Yt){var n=hi,o=fi;n=(o&~(1<<32-qo(o)-1)).toString(32)+n,t="_"+t+"R_"+n,n=ih++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=p4++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t}function H_(){return Xo().memoizedState=Bv.bind(null,gt)}function Bv(e,t){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var o=vl(n),l=$i(o),a=Bi(n,l,o);a!==null&&(ya(o,"refresh()",e),Hn(a,n,o),tu(a,n,o)),e=Fc(),t!=null&&a!==null&&console.error("The seed argument is not enabled outside experimental channels."),l.payload={cache:e};return}n=n.return}}function Hv(e,t,n){var o=arguments;typeof o[3]=="function"&&console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."),o=vl(e);var l={lane:o,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};af(e)?Mg(t,l):(l=Zc(e,t,l,o),l!==null&&(ya(o,"dispatch()",e),Hn(l,e,o),Tg(l,t,o)))}function Eg(e,t,n){var o=arguments;typeof o[3]=="function"&&console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."),o=vl(e),iu(e,t,n,o)&&ya(o,"setState()",e)}function iu(e,t,n,o){var l={lane:o,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(af(e))Mg(t,l);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null)){var r=V.H;V.H=ca;try{var c=t.lastRenderedState,d=a(c,n);if(l.hasEagerState=!0,l.eagerState=d,Wo(d,c))return Yo(e,t,l,0),_n===null&&Ka(),!1}catch{}finally{V.H=r}}if(n=Zc(e,t,l,o),n!==null)return Hn(n,e,o),Tg(n,t,o),!0}return!1}function U_(e,t,n,o){if(V.T===null&&Yr===0&&console.error("An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."),o={lane:2,revertLane:m0(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},af(e)){if(t)throw Error("Cannot update optimistic state while rendering.");console.error("Cannot call startTransition while rendering.")}else t=Zc(e,n,o,2),t!==null&&(ya(2,"setOptimistic()",e),Hn(t,e,2))}function af(e){var t=e.alternate;return e===gt||t!==null&&t===gt}function Mg(e,t){hc=ah=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Tg(e,t,n){if((n&4194048)!==0){var o=t.lanes;o&=e.pendingLanes,n|=o,t.lanes=n,te(e,n)}}function j_(e){if(e!==null&&typeof e!="function"){var t=String(e);k2.has(t)||(k2.add(t),console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.",e))}}function I_(e,t,n,o){var l=e.memoizedState,a=n(o,l);if(e.mode&Ho){Se(!0);try{a=n(o,l)}finally{Se(!1)}}a===void 0&&(t=Xe(t)||"Component",x2.has(t)||(x2.add(t),console.error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.",t))),l=a==null?l:Lt({},l,a),e.memoizedState=l,e.lanes===0&&(e.updateQueue.baseState=l)}function Rg(e,t,n,o,l,a,r){var c=e.stateNode;if(typeof c.shouldComponentUpdate=="function"){if(n=c.shouldComponentUpdate(o,a,r),e.mode&Ho){Se(!0);try{n=c.shouldComponentUpdate(o,a,r)}finally{Se(!1)}}return n===void 0&&console.error("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.",Xe(t)||"Component"),n}return t.prototype&&t.prototype.isPureReactComponent?!Nl(n,o)||!Nl(l,a):!0}function Dg(e,t,n,o){var l=t.state;typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,o),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,o),t.state!==l&&(e=ue(e)||"Component",p2.has(e)||(p2.add(e),console.error("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",e)),$m.enqueueReplaceState(t,t.state,null))}function zr(e,t){var n=t;if("ref"in t){n={};for(var o in t)o!=="ref"&&(n[o]=t[o])}if(e=e.defaultProps){n===t&&(n=Lt({},n));for(var l in e)n[l]===void 0&&(n[l]=e[l])}return n}function Ag(e){hm(e),console.warn(`%s

%s
`,_c?"An error occurred in the <"+_c+"> component.":"An error occurred in one of your React components.",`Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.`)}function Og(e){var t=_c?"The above error occurred in the <"+_c+"> component.":"The above error occurred in one of your React components.",n="React will try to recreate this component tree from scratch using the error boundary you provided, "+((Bm||"Anonymous")+".");if(typeof e=="object"&&e!==null&&typeof e.environmentName=="string"){var o=e.environmentName;e=[`%o

%s

%s
`,e,t,n].slice(0),typeof e[0]=="string"?e.splice(0,1,rb+" "+e[0],sb,Ah+o+Ah,cb):e.splice(0,0,rb,sb,Ah+o+Ah,cb),e.unshift(console),o=B4.apply(console.error,e),o()}else console.error(`%o

%s

%s
`,e,t,n)}function zg(e){hm(e)}function rf(e,t){try{_c=t.source?ue(t.source):null,Bm=null;var n=t.value;if(V.actQueue!==null)V.thrownErrors.push(n);else{var o=e.onUncaughtError;o(n,{componentStack:t.stack})}}catch(l){setTimeout(function(){throw l})}}function Lg(e,t,n){try{_c=n.source?ue(n.source):null,Bm=ue(t);var o=e.onCaughtError;o(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function Y_(e,t,n){return n=$i(n),n.tag=Dm,n.payload={element:null},n.callback=function(){xe(t.source,rf,e,t)},n}function X_(e){return e=$i(e),e.tag=Dm,e}function q_(e,t,n,o){var l=n.type.getDerivedStateFromError;if(typeof l=="function"){var a=o.value;e.payload=function(){return l(a)},e.callback=function(){Es(n),xe(o.source,Lg,t,n,o)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(e.callback=function(){Es(n),xe(o.source,Lg,t,n,o),typeof l!="function"&&(cr===null?cr=new Set([this]):cr.add(this)),f4(this,o),typeof l=="function"||(n.lanes&2)===0&&console.error("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.",ue(n)||"Unknown")})}function Uv(e,t,n,o,l){if(n.flags|=32768,Na&&_u(e,l),o!==null&&typeof o=="object"&&typeof o.then=="function"){if(t=n.alternate,t!==null&&al(t,n,l,!0),Yt&&(Ha=!0),n=El.current,n!==null){switch(n.tag){case 31:case 13:return Zl===null?pf():n.alternate===null&&On===wi&&(On=ch),n.flags&=-257,n.flags|=65536,n.lanes=l,o===nh?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([o]):t.add(o),d0(e,o,l)),!1;case 22:return n.flags|=65536,o===nh?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([o])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([o]):n.add(o)),d0(e,o,l)),!1}throw Error("Unexpected Suspense handler tag ("+n.tag+"). This is a bug in React.")}return d0(e,o,l),pf(),!1}if(Yt)return Ha=!0,t=El.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=l,o!==bm&&mt(z(Error("There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.",{cause:o}),n))):(o!==bm&&mt(z(Error("There was an error while hydrating but React was able to recover by instead client rendering the entire root.",{cause:o}),n)),e=e.current.alternate,e.flags|=65536,l&=-l,e.lanes|=l,o=z(o,n),l=Y_(e.stateNode,o,l),Qd(e,l),On!==ar&&(On=Gr)),!1;var a=z(Error("There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.",{cause:o}),n);if(id===null?id=[a]:id.push(a),On!==ar&&(On=Gr),t===null)return!0;o=z(o,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=l&-l,n.lanes|=e,e=Y_(n.stateNode,o,e),Qd(n,e),!1;case 1:if(t=n.type,a=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||a!==null&&typeof a.componentDidCatch=="function"&&(cr===null||!cr.has(a))))return n.flags|=65536,l&=-l,n.lanes|=l,l=X_(l),q_(l,e,n,o),Qd(n,l),!1}n=n.return}while(n!==null);return!1}function To(e,t,n,o){t.child=e===null?a2(t,null,n,o):Qr(t,e.child,n,o)}function Ng(e,t,n,o,l){n=n.render;var a=t.ref;if("ref"in o){var r={};for(var c in o)c!=="ref"&&(r[c]=o[c])}else r=o;return dn(t),o=m_(e,t,n,r,a,l),c=g_(),e!==null&&!ro?(y_(e,t,l),ii(e,t,l)):(Yt&&c&&Ce(t),t.flags|=1,To(e,t,o,l),t.child)}function $g(e,t,n,o,l){if(e===null){var a=n.type;return typeof a=="function"&&!ni(a)&&a.defaultProps===void 0&&n.compare===null?(n=ti(a),t.tag=15,t.type=n,Q_(t,a),Bg(e,t,n,o,l)):(e=Ts(n.type,null,o,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!J_(e,l)){var r=a.memoizedProps;if(n=n.compare,n=n!==null?n:Nl,n(r,o)&&e.ref===t.ref)return ii(e,t,l)}return t.flags|=1,e=$o(a,o),e.ref=t.ref,e.return=t,t.child=e}function Bg(e,t,n,o,l){if(e!==null){var a=e.memoizedProps;if(Nl(a,o)&&e.ref===t.ref&&t.type===e.type)if(ro=!1,t.pendingProps=o=a,J_(e,l))(e.flags&131072)!==0&&(ro=!0);else return t.lanes=e.lanes,ii(e,t,l)}return V_(e,t,n,o,l)}function Hg(e,t,n,o){var l=o.children,a=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:Nu,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((t.flags&128)!==0){if(a=a!==null?a.baseLanes|n:n,e!==null){for(o=t.child=e.child,l=0;o!==null;)l=l|o.lanes|o.childLanes,o=o.sibling;o=l&~a}else o=0,t.child=null;return Ug(e,t,a,n,o)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&jd(t,a!==null?a.cachePool:null),a!==null?eg(t,a):d_(t),tg(t);else return o=t.lanes=536870912,Ug(e,t,a!==null?a.baseLanes|n:n,n,o)}else a!==null?(jd(t,a.cachePool),eg(t,a),Ui(t),t.memoizedState=null):(e!==null&&jd(t,null),d_(t),Ui(t));return To(e,t,l,n),t.child}function ru(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:Nu,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Ug(e,t,n,o,l){var a=r_();return a=a===null?null:{parent:lo._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&jd(t,null),d_(t),tg(t),e!==null&&al(e,t,o,!0),t.childLanes=l,null}function sf(e,t){var n=t.hidden;return n!==void 0&&console.error(`<Activity> doesn't accept a hidden prop. Use mode="hidden" instead.
- <Activity %s>
+ <Activity %s>`,n===!0?"hidden":n===!1?"hidden={false}":"hidden={...}",n?'mode="hidden"':'mode="visible"'),t=uf({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function jg(e,t,n){return Qr(t,e.child,null,n),e=sf(t,t.pendingProps),e.flags|=2,bl(t),t.memoizedState=null,e}function jv(e,t,n){var o=t.pendingProps,l=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Yt){if(o.mode==="hidden")return e=sf(t,o),t.lanes=536870912,ru(null,e);if(h_(t),(e=Sn)?(n=dy(e,Wl),n=n!==null&&n.data===es?n:null,n!==null&&(o={dehydrated:n,treeContext:We(),retryLane:536870912,hydrationErrors:null},t.memoizedState=o,o=D(n),o.return=t,t.child=o,Ao=t,Sn=null)):n=null,n===null)throw Le(t,e),ln(t);return t.lanes=536870912,null}return sf(t,o)}var a=e.memoizedState;if(a!==null){var r=a.dehydrated;if(h_(t),l)if(t.flags&256)t.flags&=-257,t=jg(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error("Client rendering an Activity suspended it again. This is a bug in React.");else if(et(),(n&536870912)!==0&&mf(t),ro||al(e,t,n,!1),l=(n&e.childLanes)!==0,ro||l){if(o=_n,o!==null&&(r=le(o,n),r!==0&&r!==a.retryLane))throw a.retryLane=r,to(e,r),Hn(o,e,r),Hm;pf(),t=jg(e,t,n)}else e=a.treeContext,Sn=xl(r.nextSibling),Ao=t,Yt=!0,Ji=null,Ha=!1,kl=null,Wl=!1,e!==null&&Pe(t,e),t=sf(t,o),t.flags|=4096;return t}return a=e.child,o={mode:o.mode,children:o.children},(n&536870912)!==0&&(n&e.lanes)!==0&&mf(t),e=$o(a,o),e.ref=t.ref,t.child=e,e.return=t,e}function cf(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error("Expected ref to be a function, an object returned by React.createRef(), or undefined/null.");(e===null||e.ref!==n)&&(t.flags|=4194816)}}function V_(e,t,n,o,l){if(n.prototype&&typeof n.prototype.render=="function"){var a=Xe(n)||"Unknown";E2[a]||(console.error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.",a,a),E2[a]=!0)}return t.mode&Ho&&sa.recordLegacyContextWarning(t,null),e===null&&(Q_(t,t.type),n.contextTypes&&(a=Xe(n)||"Unknown",T2[a]||(T2[a]=!0,console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)",a)))),dn(t),n=m_(e,t,n,o,void 0,l),o=g_(),e!==null&&!ro?(y_(e,t,l),ii(e,t,l)):(Yt&&o&&Ce(t),t.flags|=1,To(e,t,n,l),t.child)}function Ig(e,t,n,o,l,a){return dn(t),vi=-1,Ku=e!==null&&e.type!==t.type,t.updateQueue=null,n=p_(t,o,n,l),ng(e,t),o=g_(),e!==null&&!ro?(y_(e,t,a),ii(e,t,a)):(Yt&&o&&Ce(t),t.flags|=1,To(e,t,n,a),t.child)}function Yg(e,t,n,o,l){switch(k(t)){case!1:var a=t.stateNode,r=new t.type(t.memoizedProps,a.context).state;a.updater.enqueueSetState(a,r,null);break;case!0:t.flags|=128,t.flags|=65536,a=Error("Simulated error coming from DevTools");var c=l&-l;if(t.lanes|=c,r=_n,r===null)throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");c=X_(c),q_(c,r,t,z(a,t)),Qd(t,c)}if(dn(t),t.stateNode===null){if(r=Fi,a=n.contextType,"contextType"in n&&a!==null&&(a===void 0||a.$$typeof!==Oa)&&!C2.has(n)&&(C2.add(n),c=a===void 0?" However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.":typeof a!="object"?" However, it is set to a "+typeof a+".":a.$$typeof===U0?" Did you accidentally pass the Context.Consumer instead?":" However, it is set to an object with keys {"+Object.keys(a).join(", ")+"}.",console.error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s",Xe(n)||"Component",c)),typeof a=="object"&&a!==null&&(r=Pt(a)),a=new n(o,r),t.mode&Ho){Se(!0);try{a=new n(o,r)}finally{Se(!1)}}if(r=t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=$m,t.stateNode=a,a._reactInternals=t,a._reactInternalInstance=m2,typeof n.getDerivedStateFromProps=="function"&&r===null&&(r=Xe(n)||"Component",g2.has(r)||(g2.add(r),console.error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.",r,a.state===null?"null":"undefined",r))),typeof n.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"){var d=c=r=null;if(typeof a.componentWillMount=="function"&&a.componentWillMount.__suppressDeprecationWarning!==!0?r="componentWillMount":typeof a.UNSAFE_componentWillMount=="function"&&(r="UNSAFE_componentWillMount"),typeof a.componentWillReceiveProps=="function"&&a.componentWillReceiveProps.__suppressDeprecationWarning!==!0?c="componentWillReceiveProps":typeof a.UNSAFE_componentWillReceiveProps=="function"&&(c="UNSAFE_componentWillReceiveProps"),typeof a.componentWillUpdate=="function"&&a.componentWillUpdate.__suppressDeprecationWarning!==!0?d="componentWillUpdate":typeof a.UNSAFE_componentWillUpdate=="function"&&(d="UNSAFE_componentWillUpdate"),r!==null||c!==null||d!==null){a=Xe(n)||"Component";var p=typeof n.getDerivedStateFromProps=="function"?"getDerivedStateFromProps()":"getSnapshotBeforeUpdate()";b2.has(a)||(b2.add(a),console.error(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://react.dev/link/unsafe-component-lifecycles`,a,p,r!==null?`
  `+r:"",c!==null?`
  `+c:"",d!==null?`
  `+d:""))}}a=t.stateNode,r=Xe(n)||"Component",a.render||(n.prototype&&typeof n.prototype.render=="function"?console.error("No `render` method found on the %s instance: did you accidentally return an object from the constructor?",r):console.error("No `render` method found on the %s instance: you may have forgotten to define `render`.",r)),!a.getInitialState||a.getInitialState.isReactClassApproved||a.state||console.error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?",r),a.getDefaultProps&&!a.getDefaultProps.isReactClassApproved&&console.error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.",r),a.contextType&&console.error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.",r),n.childContextTypes&&!S2.has(n)&&(S2.add(n),console.error("%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)",r)),n.contextTypes&&!w2.has(n)&&(w2.add(n),console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)",r)),typeof a.componentShouldUpdate=="function"&&console.error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",r),n.prototype&&n.prototype.isPureReactComponent&&typeof a.shouldComponentUpdate<"u"&&console.error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.",Xe(n)||"A pure component"),typeof a.componentDidUnmount=="function"&&console.error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?",r),typeof a.componentDidReceiveProps=="function"&&console.error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().",r),typeof a.componentWillRecieveProps=="function"&&console.error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",r),typeof a.UNSAFE_componentWillRecieveProps=="function"&&console.error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?",r),c=a.props!==o,a.props!==void 0&&c&&console.error("When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.",r),a.defaultProps&&console.error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.",r,r),typeof a.getSnapshotBeforeUpdate!="function"||typeof a.componentDidUpdate=="function"||y2.has(n)||(y2.add(n),console.error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.",Xe(n))),typeof a.getDerivedStateFromProps=="function"&&console.error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.",r),typeof a.getDerivedStateFromError=="function"&&console.error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.",r),typeof n.getSnapshotBeforeUpdate=="function"&&console.error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.",r),(c=a.state)&&(typeof c!="object"||ho(c))&&console.error("%s.state: must be set to an object or null",r),typeof a.getChildContext=="function"&&typeof n.childContextTypes!="object"&&console.error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",r),a=t.stateNode,a.props=o,a.state=t.memoizedState,a.refs={},c_(t),r=n.contextType,a.context=typeof r=="object"&&r!==null?Pt(r):Fi,a.state===o&&(r=Xe(n)||"Component",v2.has(r)||(v2.add(r),console.error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.",r))),t.mode&Ho&&sa.recordLegacyContextWarning(t,a),sa.recordUnsafeLifecycleWarnings(t,a),a.state=t.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(I_(t,n,r,o),a.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(r=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),r!==a.state&&(console.error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",ue(t)||"Component"),$m.enqueueReplaceState(a,a.state,null)),ou(t,o,a,l),nu(),a.state=t.memoizedState),typeof a.componentDidMount=="function"&&(t.flags|=4194308),(t.mode&ra)!==_t&&(t.flags|=134217728),a=!0}else if(e===null){a=t.stateNode;var L=t.memoizedProps;c=zr(n,L),a.props=c;var N=a.context;d=n.contextType,r=Fi,typeof d=="object"&&d!==null&&(r=Pt(d)),p=n.getDerivedStateFromProps,d=typeof p=="function"||typeof a.getSnapshotBeforeUpdate=="function",L=t.pendingProps!==L,d||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(L||N!==r)&&Dg(t,a,o,r),lr=!1;var C=t.memoizedState;a.state=C,ou(t,o,a,l),nu(),N=t.memoizedState,L||C!==N||lr?(typeof p=="function"&&(I_(t,n,p,o),N=t.memoizedState),(c=lr||Rg(t,n,c,o,C,N,r))?(d||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308),(t.mode&ra)!==_t&&(t.flags|=134217728)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),(t.mode&ra)!==_t&&(t.flags|=134217728),t.memoizedProps=o,t.memoizedState=N),a.props=o,a.state=N,a.context=r,a=c):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),(t.mode&ra)!==_t&&(t.flags|=134217728),a=!1)}else{a=t.stateNode,u_(e,t),r=t.memoizedProps,d=zr(n,r),a.props=d,p=t.pendingProps,C=a.context,N=n.contextType,c=Fi,typeof N=="object"&&N!==null&&(c=Pt(N)),L=n.getDerivedStateFromProps,(N=typeof L=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(r!==p||C!==c)&&Dg(t,a,o,c),lr=!1,C=t.memoizedState,a.state=C,ou(t,o,a,l),nu();var Y=t.memoizedState;r!==p||C!==Y||lr||e!==null&&e.dependencies!==null&&pl(e.dependencies)?(typeof L=="function"&&(I_(t,n,L,o),Y=t.memoizedState),(d=lr||Rg(t,n,d,o,C,Y,c)||e!==null&&e.dependencies!==null&&pl(e.dependencies))?(N||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(o,Y,c),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(o,Y,c)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||r===e.memoizedProps&&C===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&C===e.memoizedState||(t.flags|=1024),t.memoizedProps=o,t.memoizedState=Y),a.props=o,a.state=Y,a.context=c,a=d):(typeof a.componentDidUpdate!="function"||r===e.memoizedProps&&C===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&C===e.memoizedState||(t.flags|=1024),a=!1)}if(c=a,cf(e,t),r=(t.flags&128)!==0,c||r){if(c=t.stateNode,po(t),r&&typeof n.getDerivedStateFromError!="function")n=null,Go=-1;else if(n=V5(c),t.mode&Ho){Se(!0);try{V5(c)}finally{Se(!1)}}t.flags|=1,e!==null&&r?(t.child=Qr(t,e.child,null,l),t.child=Qr(t,null,n,l)):To(e,t,n,l),t.memoizedState=c.state,e=t.child}else e=ii(e,t,l);return l=t.stateNode,a&&l.props!==o&&(mc||console.error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.",ue(t)||"a component"),mc=!0),e}function Xg(e,t,n,o){return cn(),t.flags|=256,To(e,t,n,o),t.child}function Q_(e,t){t&&t.childContextTypes&&console.error(`childContextTypes cannot be defined on a function component.
  %s.childContextTypes = ...`,t.displayName||t.name||"Component"),typeof t.getDerivedStateFromProps=="function"&&(e=Xe(t)||"Unknown",R2[e]||(console.error("%s: Function components do not support getDerivedStateFromProps.",e),R2[e]=!0)),typeof t.contextType=="object"&&t.contextType!==null&&(t=Xe(t)||"Unknown",M2[t]||(console.error("%s: Function components do not support contextType.",t),M2[t]=!0))}function W_(e){return{baseLanes:e,cachePool:Ip()}}function G_(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=dl),e}function qg(e,t,n){var o,l=t.pendingProps;y(t)&&(t.flags|=128);var a=!1,r=(t.flags&128)!==0;if((o=r)||(o=e!==null&&e.memoizedState===null?!1:(Fn.current&Fu)!==0),o&&(a=!0,t.flags&=-129),o=(t.flags&32)!==0,t.flags&=-33,e===null){if(Yt){if(a?Hi(t):Ui(t),(e=Sn)?(n=dy(e,Wl),n=n!==null&&n.data!==es?n:null,n!==null&&(o={dehydrated:n,treeContext:We(),retryLane:536870912,hydrationErrors:null},t.memoizedState=o,o=D(n),o.return=t,t.child=o,Ao=t,Sn=null)):n=null,n===null)throw Le(t,e),ln(t);return M0(n)?t.lanes=32:t.lanes=536870912,null}var c=l.children;if(l=l.fallback,a){Ui(t);var d=t.mode;return c=uf({mode:"hidden",children:c},d),l=b(l,d,n,null),c.return=t,l.return=t,c.sibling=l,t.child=c,l=t.child,l.memoizedState=W_(n),l.childLanes=G_(e,o,n),t.memoizedState=Um,ru(null,l)}return Hi(t),Z_(t,c)}var p=e.memoizedState;if(p!==null){var L=p.dehydrated;if(L!==null){if(r)t.flags&256?(Hi(t),t.flags&=-257,t=P_(e,t,n)):t.memoizedState!==null?(Ui(t),t.child=e.child,t.flags|=128,t=null):(Ui(t),c=l.fallback,d=t.mode,l=uf({mode:"visible",children:l.children},d),c=b(c,d,n,null),c.flags|=2,l.return=t,c.return=t,l.sibling=c,t.child=l,Qr(t,e.child,null,n),l=t.child,l.memoizedState=W_(n),l.childLanes=G_(e,o,n),t.memoizedState=Um,t=ru(null,l));else if(Hi(t),et(),(n&536870912)!==0&&mf(t),M0(L)){if(o=L.nextSibling&&L.nextSibling.dataset,o){c=o.dgst;var N=o.msg;d=o.stck;var C=o.cstck}a=N,o=c,l=d,L=C,c=a,d=L,c=Error(c||"The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."),c.stack=l||"",c.digest=o,o=d===void 0?null:d,l={value:c,source:null,stack:o},typeof o=="string"&&ym.set(c,l),mt(l),t=P_(e,t,n)}else if(ro||al(e,t,n,!1),o=(n&e.childLanes)!==0,ro||o){if(o=_n,o!==null&&(l=le(o,n),l!==0&&l!==p.retryLane))throw p.retryLane=l,to(e,l),Hn(o,e,l),Hm;E0(L)||pf(),t=P_(e,t,n)}else E0(L)?(t.flags|=192,t.child=e.child,t=null):(e=p.treeContext,Sn=xl(L.nextSibling),Ao=t,Yt=!0,Ji=null,Ha=!1,kl=null,Wl=!1,e!==null&&Pe(t,e),t=Z_(t,l.children),t.flags|=4096);return t}}return a?(Ui(t),c=l.fallback,d=t.mode,C=e.child,L=C.sibling,l=$o(C,{mode:"hidden",children:l.children}),l.subtreeFlags=C.subtreeFlags&65011712,L!==null?c=$o(L,c):(c=b(c,d,n,null),c.flags|=2),c.return=t,l.return=t,l.sibling=c,t.child=l,ru(null,l),l=t.child,c=e.child.memoizedState,c===null?c=W_(n):(d=c.cachePool,d!==null?(C=lo._currentValue,d=d.parent!==C?{parent:C,pool:C}:d):d=Ip(),c={baseLanes:c.baseLanes|n,cachePool:d}),l.memoizedState=c,l.childLanes=G_(e,o,n),t.memoizedState=Um,ru(e.child,l)):(p!==null&&(n&62914560)===n&&(n&e.lanes)!==0&&mf(t),Hi(t),n=e.child,e=n.sibling,n=$o(n,{mode:"visible",children:l.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Z_(e,t){return t=uf({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function uf(e,t){return e=v(22,e,null,t),e.lanes=0,e}function P_(e,t,n){return Qr(t,e.child,null,n),e=Z_(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Vg(e,t,n){e.lanes|=t;var o=e.alternate;o!==null&&(o.lanes|=t),Pn(e.return,t,n)}function F_(e,t,n,o,l,a){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:o,tail:n,tailMode:l,treeForkCount:a}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=o,r.tail=n,r.tailMode=l,r.treeForkCount=a)}function Qg(e,t,n){var o=t.pendingProps,l=o.revealOrder,a=o.tail,r=o.children,c=Fn.current;if((o=(c&Fu)!==0)?(c=c&dc|Fu,t.flags|=128):c&=dc,Be(Fn,c,t),c=l??"null",l!=="forwards"&&l!=="unstable_legacy-backwards"&&l!=="together"&&l!=="independent"&&!D2[c])if(D2[c]=!0,l==null)console.error('The default for the <SuspenseList revealOrder="..."> prop is changing. To be future compatible you must explictly specify either "independent" (the current default), "together", "forwards" or "legacy_unstable-backwards".');else if(l==="backwards")console.error('The rendering order of <SuspenseList revealOrder="backwards"> is changing. To be future compatible you must specify revealOrder="legacy_unstable-backwards" instead.');else if(typeof l=="string")switch(l.toLowerCase()){case"together":case"forwards":case"backwards":case"independent":console.error('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.',l,l.toLowerCase());break;case"forward":case"backward":console.error('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.',l,l.toLowerCase());break;default:console.error('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "independent", "together", "forwards" or "backwards"?',l)}else console.error('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "independent", "together", "forwards" or "backwards"?',l);c=a??"null",sh[c]||(a==null?(l==="forwards"||l==="backwards"||l==="unstable_legacy-backwards")&&(sh[c]=!0,console.error('The default for the <SuspenseList tail="..."> prop is changing. To be future compatible you must explictly specify either "visible" (the current default), "collapsed" or "hidden".')):a!=="visible"&&a!=="collapsed"&&a!=="hidden"?(sh[c]=!0,console.error('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "visible", "collapsed" or "hidden"?',a)):l!=="forwards"&&l!=="backwards"&&l!=="unstable_legacy-backwards"&&(sh[c]=!0,console.error('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?',a)));e:if((l==="forwards"||l==="backwards"||l==="unstable_legacy-backwards")&&r!==void 0&&r!==null&&r!==!1)if(ho(r)){for(c=0;c<r.length;c++)if(!Fp(r[c],c))break e}else if(c=Me(r),typeof c=="function"){if(c=c.call(r))for(var d=c.next(),p=0;!d.done;d=c.next()){if(!Fp(d.value,p))break e;p++}}else console.error('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?',l);if(To(e,t,r,n),Yt?(ot(),r=$u):r=0,!o&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Vg(e,n,t);else if(e.tag===19)Vg(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&Wd(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),F_(t,!1,l,n,a,r);break;case"backwards":case"unstable_legacy-backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&Wd(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}F_(t,!0,n,null,a,r);break;case"together":F_(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function ii(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Go=-1,rr|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(al(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error("Resuming work not yet implemented.");if(t.child!==null){for(e=t.child,n=$o(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=$o(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function J_(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&pl(e)))}function Iv(e,t,n){switch(t.tag){case 3:ne(t,t.stateNode.containerInfo),no(t,lo,e.memoizedState.cache),cn();break;case 27:case 5:oe(t);break;case 4:ne(t,t.stateNode.containerInfo);break;case 10:no(t,t.type,t.memoizedProps.value);break;case 12:(n&t.childLanes)!==0&&(t.flags|=4),t.flags|=2048;var o=t.stateNode;o.effectDuration=-0,o.passiveEffectDuration=-0;break;case 31:if(t.memoizedState!==null)return t.flags|=128,h_(t),null;break;case 13:if(o=t.memoizedState,o!==null)return o.dehydrated!==null?(Hi(t),t.flags|=128,null):(n&t.child.childLanes)!==0?qg(e,t,n):(Hi(t),e=ii(e,t,n),e!==null?e.sibling:null);Hi(t);break;case 19:var l=(e.flags&128)!==0;if(o=(n&t.childLanes)!==0,o||(al(e,t,n,!1),o=(n&t.childLanes)!==0),l){if(o)return Qg(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),Be(Fn,Fn.current,t),o)break;return null;case 22:return t.lanes=0,Hg(e,t,n,t.pendingProps);case 24:no(t,lo,e.memoizedState.cache)}return ii(e,t,n)}function K_(e,t,n){if(t._debugNeedsRemount&&e!==null){n=Ts(t.type,t.key,t.pendingProps,t._debugOwner||null,t.mode,t.lanes),n._debugStack=t._debugStack,n._debugTask=t._debugTask;var o=t.return;if(o===null)throw Error("Cannot swap the root fiber.");if(e.alternate=null,t.alternate=null,n.index=t.index,n.sibling=t.sibling,n.return=t.return,n.ref=t.ref,n._debugInfo=t._debugInfo,t===o.child)o.child=n;else{var l=o.child;if(l===null)throw Error("Expected parent to have a child.");for(;l.sibling!==t;)if(l=l.sibling,l===null)throw Error("Expected to find the previous sibling.");l.sibling=n}return t=o.deletions,t===null?(o.deletions=[e],o.flags|=16):t.push(e),n.flags|=2,n}if(e!==null)if(e.memoizedProps!==t.pendingProps||t.type!==e.type)ro=!0;else{if(!J_(e,n)&&(t.flags&128)===0)return ro=!1,Iv(e,t,n);ro=(e.flags&131072)!==0}else ro=!1,(o=Yt)&&(ot(),o=(t.flags&1048576)!==0),o&&(o=t.index,ot(),ge(t,$u,o));switch(t.lanes=0,t.tag){case 16:e:if(o=t.pendingProps,e=Ni(t.elementType),t.type=e,typeof e=="function")ni(e)?(o=zr(e,o),t.tag=1,t.type=e=ti(e),t=Yg(null,t,e,o,n)):(t.tag=0,Q_(t,e),t.type=e=ti(e),t=V_(null,t,e,o,n));else{if(e!=null){if(l=e.$$typeof,l===Su){t.tag=11,t.type=e=Pc(e),t=Ng(null,t,e,o,n);break e}else if(l===Df){t.tag=14,t=$g(null,t,e,o,n);break e}}throw t="",e!==null&&typeof e=="object"&&e.$$typeof===wl&&(t=" Did you wrap a component in React.lazy() more than once?"),n=Xe(e)||e,Error("Element type is invalid. Received a promise that resolves to: "+n+". Lazy element type must resolve to a class or function."+t)}return t;case 0:return V_(e,t,t.type,t.pendingProps,n);case 1:return o=t.type,l=zr(o,t.pendingProps),Yg(e,t,o,l,n);case 3:e:{if(ne(t,t.stateNode.containerInfo),e===null)throw Error("Should have a current fiber. This is a bug in React.");o=t.pendingProps;var a=t.memoizedState;l=a.element,u_(e,t),ou(t,o,null,n);var r=t.memoizedState;if(o=r.cache,no(t,lo,o),o!==a.cache&&oi(t,[lo],n,!0),nu(),o=r.element,a.isDehydrated)if(a={element:o,isDehydrated:!1,cache:r.cache},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){t=Xg(e,t,o,n);break e}else if(o!==l){l=z(Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."),t),mt(l),t=Xg(e,t,o,n);break e}else for(e=t.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,Sn=xl(e.firstChild),Ao=t,Yt=!0,Ji=null,Ha=!1,kl=null,Wl=!0,n=a2(t,null,o,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(cn(),o===l){t=ii(e,t,n);break e}To(e,t,o,n)}t=t.child}return t;case 26:return cf(e,t),e===null?(n=gy(t.type,null,t.pendingProps,null))?t.memoizedState=n:Yt||(n=t.type,e=t.pendingProps,o=Fe(Vi.current),o=vf(o).createElement(n),o[Do]=t,o[Vo]=e,Ro(o,n,e),ae(o),t.stateNode=o):t.memoizedState=gy(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return oe(t),e===null&&Yt&&(o=Fe(Vi.current),l=ye(),o=t.stateNode=my(t.type,t.pendingProps,o,l,!1),Ha||(l=oy(o,t.type,t.pendingProps,l),l!==null&&(St(t,0).serverProps=l)),Ao=t,Wl=!0,l=Sn,Xi(t.type)?(sp=l,Sn=xl(o.firstChild)):Sn=l),To(e,t,t.pendingProps.children,n),cf(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Yt&&(a=ye(),o=Ad(t.type,a.ancestorInfo),l=Sn,(r=!l)||(r=Rx(l,t.type,t.pendingProps,Wl),r!==null?(t.stateNode=r,Ha||(a=oy(r,t.type,t.pendingProps,a),a!==null&&(St(t,0).serverProps=a)),Ao=t,Sn=xl(r.firstChild),Wl=!1,a=!0):a=!1,r=!a),r&&(o&&Le(t,l),ln(t))),oe(t),l=t.type,a=t.pendingProps,r=e!==null?e.memoizedProps:null,o=a.children,C0(l,a)?o=null:r!==null&&C0(l,r)&&(t.flags|=32),t.memoizedState!==null&&(l=m_(e,t,zv,null,null,n),md._currentValue=l),cf(e,t),To(e,t,o,n),t.child;case 6:return e===null&&Yt&&(n=t.pendingProps,e=ye(),o=e.ancestorInfo.current,n=o!=null?Hc(n,o.tag,e.ancestorInfo.implicitRootScope):!0,e=Sn,(o=!e)||(o=Dx(e,t.pendingProps,Wl),o!==null?(t.stateNode=o,Ao=t,Sn=null,o=!0):o=!1,o=!o),o&&(n&&Le(t,e),ln(t))),null;case 13:return qg(e,t,n);case 4:return ne(t,t.stateNode.containerInfo),o=t.pendingProps,e===null?t.child=Qr(t,null,o,n):To(e,t,o,n),t.child;case 11:return Ng(e,t,t.type,t.pendingProps,n);case 7:return To(e,t,t.pendingProps,n),t.child;case 8:return To(e,t,t.pendingProps.children,n),t.child;case 12:return t.flags|=4,t.flags|=2048,o=t.stateNode,o.effectDuration=-0,o.passiveEffectDuration=-0,To(e,t,t.pendingProps.children,n),t.child;case 10:return o=t.type,l=t.pendingProps,a=l.value,"value"in l||A2||(A2=!0,console.error("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?")),no(t,o,a),To(e,t,l.children,n),t.child;case 9:return l=t.type._context,o=t.pendingProps.children,typeof o!="function"&&console.error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."),dn(t),l=Pt(l),o=Em(o,l,void 0),t.flags|=1,To(e,t,o,n),t.child;case 14:return $g(e,t,t.type,t.pendingProps,n);case 15:return Bg(e,t,t.type,t.pendingProps,n);case 19:return Qg(e,t,n);case 31:return jv(e,t,n);case 22:return Hg(e,t,n,t.pendingProps);case 24:return dn(t),o=Pt(lo),e===null?(l=r_(),l===null&&(l=_n,a=Fc(),l.pooledCache=a,li(a),a!==null&&(l.pooledCacheLanes|=n),l=a),t.memoizedState={parent:o,cache:l},c_(t),no(t,lo,l)):((e.lanes&n)!==0&&(u_(e,t),ou(t,null,null,n),nu()),l=e.memoizedState,a=t.memoizedState,l.parent!==o?(l={parent:o,cache:o},t.memoizedState=l,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=l),no(t,lo,o)):(o=a.cache,no(t,lo,o),o!==l.cache&&oi(t,[lo],n,!0))),To(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error("Unknown unit of work tag ("+t.tag+"). This error is likely caused by a bug in React. Please file an issue.")}function ri(e){e.flags|=4}function e0(e,t,n,o,l){if((t=(e.mode&s4)!==_t)&&(t=!1),t){if(e.flags|=16777216,(l&335544128)===l)if(e.stateNode.complete)e.flags|=8192;else if(k1())e.flags|=8192;else throw Vr=nh,Tm}else e.flags&=-16777217}function Wg(e,t){if(t.type!=="stylesheet"||(t.state.loading&Jl)!==os)e.flags&=-16777217;else if(e.flags|=16777216,!wy(t))if(k1())e.flags|=8192;else throw Vr=nh,Tm}function df(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Ot():536870912,e.lanes|=t,Fr|=t)}function su(e,t){if(!Yt)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var o=null;n!==null;)n.alternate!==null&&(o=n),n=n.sibling;o===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function yn(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,o=0;if(t)if((e.mode&Tt)!==_t){for(var l=e.selfBaseDuration,a=e.child;a!==null;)n|=a.lanes|a.childLanes,o|=a.subtreeFlags&65011712,o|=a.flags&65011712,l+=a.treeBaseDuration,a=a.sibling;e.treeBaseDuration=l}else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,o|=l.subtreeFlags&65011712,o|=l.flags&65011712,l.return=e,l=l.sibling;else if((e.mode&Tt)!==_t){l=e.actualDuration,a=e.selfBaseDuration;for(var r=e.child;r!==null;)n|=r.lanes|r.childLanes,o|=r.subtreeFlags,o|=r.flags,l+=r.actualDuration,a+=r.treeBaseDuration,r=r.sibling;e.actualDuration=l,e.treeBaseDuration=a}else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,o|=l.subtreeFlags,o|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=o,e.childLanes=n,t}function Yv(e,t,n){var o=t.pendingProps;switch($e(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return yn(t),null;case 1:return yn(t),null;case 3:return n=t.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),t.memoizedState.cache!==o&&(t.flags|=2048),Qn(lo,t),me(t),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Wt(t)?(pn(),ri(t)):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,ut())),yn(t),null;case 26:var l=t.type,a=t.memoizedState;return e===null?(ri(t),a!==null?(yn(t),Wg(t,a)):(yn(t),e0(t,l,null,o,n))):a?a!==e.memoizedState?(ri(t),yn(t),Wg(t,a)):(yn(t),t.flags&=-16777217):(e=e.memoizedProps,e!==o&&ri(t),yn(t),e0(t,l,e,o,n)),null;case 27:if(Ee(t),n=Fe(Vi.current),l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==o&&ri(t);else{if(!o){if(t.stateNode===null)throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");return yn(t),null}e=ye(),Wt(t)?en(t,e):(e=my(l,o,n,e,!0),t.stateNode=e,ri(t))}return yn(t),null;case 5:if(Ee(t),l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==o&&ri(t);else{if(!o){if(t.stateNode===null)throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");return yn(t),null}var r=ye();if(Wt(t))en(t,r);else{switch(a=Fe(Vi.current),Ad(l,r.ancestorInfo),r=r.context,a=vf(a),r){case Sc:a=a.createElementNS(Ws,l);break;case Th:a=a.createElementNS(Bf,l);break;default:switch(l){case"svg":a=a.createElementNS(Ws,l);break;case"math":a=a.createElementNS(Bf,l);break;case"script":a=a.createElement("div"),a.innerHTML="<script><\/script>",a=a.removeChild(a.firstChild);break;case"select":a=typeof o.is=="string"?a.createElement("select",{is:o.is}):a.createElement("select"),o.multiple?a.multiple=!0:o.size&&(a.size=o.size);break;default:a=typeof o.is=="string"?a.createElement(l,{is:o.is}):a.createElement(l),l.indexOf("-")===-1&&(l!==l.toLowerCase()&&console.error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.",l),Object.prototype.toString.call(a)!=="[object HTMLUnknownElement]"||aa.call(tb,l)||(tb[l]=!0,console.error("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.",l)))}}a[Do]=t,a[Vo]=o;e:for(r=t.child;r!==null;){if(r.tag===5||r.tag===6)a.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break e;for(;r.sibling===null;){if(r.return===null||r.return===t)break e;r=r.return}r.sibling.return=r.return,r=r.sibling}t.stateNode=a;e:switch(Ro(a,l,o),l){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}o&&ri(t)}}return yn(t),e0(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==o&&ri(t);else{if(typeof o!="string"&&t.stateNode===null)throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");if(e=Fe(Vi.current),n=ye(),Wt(t)){if(e=t.stateNode,n=t.memoizedProps,l=!Ha,o=null,a=Ao,a!==null)switch(a.tag){case 3:l&&(l=hy(e,n,o),l!==null&&(St(t,0).serverProps=l));break;case 27:case 5:o=a.memoizedProps,l&&(l=hy(e,n,o),l!==null&&(St(t,0).serverProps=l))}e[Do]=t,e=!!(e.nodeValue===n||o!==null&&o.suppressHydrationWarning===!0||J1(e.nodeValue,n)),e||ln(t,!0)}else l=n.ancestorInfo.current,l!=null&&Hc(o,l.tag,n.ancestorInfo.implicitRootScope),e=vf(e).createTextNode(o),e[Do]=t,t.stateNode=e}return yn(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(o=Wt(t),n!==null){if(e===null){if(!o)throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error("Expected to have a hydrated activity instance. This error is likely caused by a bug in React. Please file an issue.");e[Do]=t,yn(t),(t.mode&Tt)!==_t&&n!==null&&(e=t.child,e!==null&&(t.treeBaseDuration-=e.treeBaseDuration))}else pn(),cn(),(t.flags&128)===0&&(n=t.memoizedState=null),t.flags|=4,yn(t),(t.mode&Tt)!==_t&&n!==null&&(e=t.child,e!==null&&(t.treeBaseDuration-=e.treeBaseDuration));e=!1}else n=ut(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(bl(t),t):(bl(t),null);if((t.flags&128)!==0)throw Error("Client rendering an Activity suspended it again. This is a bug in React.")}return yn(t),null;case 13:if(o=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(l=o,a=Wt(t),l!==null&&l.dehydrated!==null){if(e===null){if(!a)throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");a[Do]=t,yn(t),(t.mode&Tt)!==_t&&l!==null&&(l=t.child,l!==null&&(t.treeBaseDuration-=l.treeBaseDuration))}else pn(),cn(),(t.flags&128)===0&&(l=t.memoizedState=null),t.flags|=4,yn(t),(t.mode&Tt)!==_t&&l!==null&&(l=t.child,l!==null&&(t.treeBaseDuration-=l.treeBaseDuration));l=!1}else l=ut(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=l),l=!0;if(!l)return t.flags&256?(bl(t),t):(bl(t),null)}return bl(t),(t.flags&128)!==0?(t.lanes=n,(t.mode&Tt)!==_t&&Kc(t),t):(n=o!==null,e=e!==null&&e.memoizedState!==null,n&&(o=t.child,l=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(l=o.alternate.memoizedState.cachePool.pool),a=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(a=o.memoizedState.cachePool.pool),a!==l&&(o.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),df(t,t.updateQueue),yn(t),(t.mode&Tt)!==_t&&n&&(e=t.child,e!==null&&(t.treeBaseDuration-=e.treeBaseDuration)),null);case 4:return me(t),e===null&&g0(t.stateNode.containerInfo),yn(t),null;case 10:return Qn(t.type,t),yn(t),null;case 19:if(Ye(Fn,t),o=t.memoizedState,o===null)return yn(t),null;if(l=(t.flags&128)!==0,a=o.rendering,a===null)if(l)su(o,!1);else{if(On!==wi||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(a=Wd(e),a!==null){for(t.flags|=128,su(o,!1),e=a.updateQueue,t.updateQueue=e,df(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)$d(n,e),n=n.sibling;return Be(Fn,Fn.current&dc|Fu,t),Yt&&G(t,o.treeForkCount),t.child}e=e.sibling}o.tail!==null&&bo()>mh&&(t.flags|=128,l=!0,su(o,!1),t.lanes=4194304)}else{if(!l)if(e=Wd(a),e!==null){if(t.flags|=128,l=!0,e=e.updateQueue,t.updateQueue=e,df(t,e),su(o,!0),o.tail===null&&o.tailMode==="hidden"&&!a.alternate&&!Yt)return yn(t),null}else 2*bo()-o.renderingStartTime>mh&&n!==536870912&&(t.flags|=128,l=!0,su(o,!1),t.lanes=4194304);o.isBackwards?(a.sibling=t.child,t.child=a):(e=o.last,e!==null?e.sibling=a:t.child=a,o.last=a)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=bo(),e.sibling=null,n=Fn.current,n=l?n&dc|Fu:n&dc,Be(Fn,n,t),Yt&&G(t,o.treeForkCount),e):(yn(t),null);case 22:case 23:return bl(t),f_(t),o=t.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(t.flags|=8192):o&&(t.flags|=8192),o?(n&536870912)!==0&&(t.flags&128)===0&&(yn(t),t.subtreeFlags&6&&(t.flags|=8192)):yn(t),n=t.updateQueue,n!==null&&df(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),o=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(o=t.memoizedState.cachePool.pool),o!==n&&(t.flags|=2048),e!==null&&Ye(Xr,t),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Qn(lo,t),yn(t),null;case 25:return null;case 30:return null}throw Error("Unknown unit of work tag ("+t.tag+"). This error is likely caused by a bug in React. Please file an issue.")}function Xv(e,t){switch($e(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,(t.mode&Tt)!==_t&&Kc(t),t):null;case 3:return Qn(lo,t),me(t),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Ee(t),null;case 31:if(t.memoizedState!==null){if(bl(t),t.alternate===null)throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");cn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,(t.mode&Tt)!==_t&&Kc(t),t):null;case 13:if(bl(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");cn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,(t.mode&Tt)!==_t&&Kc(t),t):null;case 19:return Ye(Fn,t),null;case 4:return me(t),null;case 10:return Qn(t.type,t),null;case 22:case 23:return bl(t),f_(t),e!==null&&Ye(Xr,t),e=t.flags,e&65536?(t.flags=e&-65537|128,(t.mode&Tt)!==_t&&Kc(t),t):null;case 24:return Qn(lo,t),null;case 25:return null;default:return null}}function Gg(e,t){switch($e(t),t.tag){case 3:Qn(lo,t),me(t);break;case 26:case 27:case 5:Ee(t);break;case 4:me(t);break;case 31:t.memoizedState!==null&&bl(t);break;case 13:bl(t);break;case 19:Ye(Fn,t);break;case 10:Qn(t.type,t);break;case 22:case 23:bl(t),f_(t),e!==null&&Ye(Xr,t);break;case 24:Qn(lo,t)}}function ka(e){return(e.mode&Tt)!==_t}function Zg(e,t){ka(e)?(Ca(),cu(t,e),Sa()):cu(t,e)}function t0(e,t,n){ka(e)?(Ca(),zs(n,e,t),Sa()):zs(n,e,t)}function cu(e,t){try{var n=t.updateQueue,o=n!==null?n.lastEffect:null;if(o!==null){var l=o.next;n=l;do{if((n.tag&e)===e&&(o=void 0,(e&Zo)!==lh&&(vc=!0),o=xe(t,h4,n),(e&Zo)!==lh&&(vc=!1),o!==void 0&&typeof o!="function")){var a=void 0;a=(n.tag&Ml)!==0?"useLayoutEffect":(n.tag&Zo)!==0?"useInsertionEffect":"useEffect";var r=void 0;r=o===null?" You returned null. If your effect does not require clean up, return undefined (or nothing).":typeof o.then=="function"?`

It looks like you wrote `+a+`(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

`+a+`(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching`:" You returned: "+o,xe(t,function(c,d){console.error("%s must not return anything besides a function, which is used for clean-up.%s",c,d)},a,r)}n=n.next}while(n!==l)}}catch(c){tn(t,t.return,c)}}function zs(e,t,n){try{var o=t.updateQueue,l=o!==null?o.lastEffect:null;if(l!==null){var a=l.next;o=a;do{if((o.tag&e)===e){var r=o.inst,c=r.destroy;c!==void 0&&(r.destroy=void 0,(e&Zo)!==lh&&(vc=!0),l=t,xe(l,_4,l,n,c),(e&Zo)!==lh&&(vc=!1))}o=o.next}while(o!==a)}}catch(d){tn(t,t.return,d)}}function Pg(e,t){ka(e)?(Ca(),cu(t,e),Sa()):cu(t,e)}function n0(e,t,n){ka(e)?(Ca(),zs(n,e,t),Sa()):zs(n,e,t)}function Fg(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;e.type.defaultProps||"ref"in e.memoizedProps||mc||(n.props!==e.memoizedProps&&console.error("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",ue(e)||"instance"),n.state!==e.memoizedState&&console.error("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",ue(e)||"instance"));try{xe(e,Kp,t,n)}catch(o){tn(e,e.return,o)}}}function qv(e,t,n){return e.getSnapshotBeforeUpdate(t,n)}function Vv(e,t){var n=t.memoizedProps,o=t.memoizedState;t=e.stateNode,e.type.defaultProps||"ref"in e.memoizedProps||mc||(t.props!==e.memoizedProps&&console.error("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",ue(e)||"instance"),t.state!==e.memoizedState&&console.error("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",ue(e)||"instance"));try{var l=zr(e.type,n),a=xe(e,qv,t,l,o);n=O2,a!==void 0||n.has(e.type)||(n.add(e.type),xe(e,function(){console.error("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.",ue(e))})),t.__reactInternalSnapshotBeforeUpdate=a}catch(r){tn(e,e.return,r)}}function Jg(e,t,n){n.props=zr(e.type,e.memoizedProps),n.state=e.memoizedState,ka(e)?(Ca(),xe(e,F5,e,t,n),Sa()):xe(e,F5,e,t,n)}function Qv(e){var t=e.ref;if(t!==null){switch(e.tag){case 26:case 27:case 5:var n=e.stateNode;break;case 30:n=e.stateNode;break;default:n=e.stateNode}if(typeof t=="function")if(ka(e))try{Ca(),e.refCleanup=t(n)}finally{Sa()}else e.refCleanup=t(n);else typeof t=="string"?console.error("String refs are no longer supported."):t.hasOwnProperty("current")||console.error("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().",ue(e)),t.current=n}}function uu(e,t){try{xe(e,Qv,e)}catch(n){tn(e,t,n)}}function Ea(e,t){var n=e.ref,o=e.refCleanup;if(n!==null)if(typeof o=="function")try{if(ka(e))try{Ca(),xe(e,o)}finally{Sa(e)}else xe(e,o)}catch(l){tn(e,t,l)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{if(ka(e))try{Ca(),xe(e,n,null)}finally{Sa(e)}else xe(e,n,null)}catch(l){tn(e,t,l)}else n.current=null}function Kg(e,t,n,o){var l=e.memoizedProps,a=l.id,r=l.onCommit;l=l.onRender,t=t===null?"mount":"update",Jf&&(t="nested-update"),typeof l=="function"&&l(a,t,e.actualDuration,e.treeBaseDuration,e.actualStartTime,n),typeof r=="function"&&r(a,t,o,n)}function Wv(e,t,n,o){var l=e.memoizedProps;e=l.id,l=l.onPostCommit,t=t===null?"mount":"update",Jf&&(t="nested-update"),typeof l=="function"&&l(e,t,o,n)}function e1(e){var t=e.type,n=e.memoizedProps,o=e.stateNode;try{xe(e,gx,o,t,n,e)}catch(l){tn(e,e.return,l)}}function o0(e,t,n){try{xe(e,bx,e.stateNode,e.type,n,t,e)}catch(o){tn(e,e.return,o)}}function t1(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Xi(e.type)||e.tag===4}function l0(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||t1(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Xi(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function a0(e,t,n){var o=e.tag;if(o===5||o===6)e=e.stateNode,t?(sy(n),(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(e,t)):(sy(n),t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=na));else if(o!==4&&(o===27&&Xi(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(a0(e,t,n),e=e.sibling;e!==null;)a0(e,t,n),e=e.sibling}function ff(e,t,n){var o=e.tag;if(o===5||o===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(o!==4&&(o===27&&Xi(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(ff(e,t,n),e=e.sibling;e!==null;)ff(e,t,n),e=e.sibling}function Gv(e){for(var t,n=e.return;n!==null;){if(t1(n)){t=n;break}n=n.return}if(t==null)throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");switch(t.tag){case 27:t=t.stateNode,n=l0(e),ff(e,n,t);break;case 5:n=t.stateNode,t.flags&32&&(ry(n),t.flags&=-33),t=l0(e),ff(e,t,n);break;case 3:case 4:t=t.stateNode.containerInfo,n=l0(e),a0(e,n,t);break;default:throw Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.")}}function n1(e){var t=e.stateNode,n=e.memoizedProps;try{xe(e,Nx,e.type,n,t,e)}catch(o){tn(e,e.return,o)}}function o1(e,t){return t.tag===31?(t=t.memoizedState,e.memoizedState!==null&&t===null):t.tag===13?(e=e.memoizedState,t=t.memoizedState,e!==null&&e.dehydrated!==null&&(t===null||t.dehydrated===null)):t.tag===3?e.memoizedState.isDehydrated&&(t.flags&256)===0:!1}function Zv(e,t){if(e=e.containerInfo,ap=Oh,e=ml(e),Fa(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var o=n.getSelection&&n.getSelection();if(o&&o.rangeCount!==0){n=o.anchorNode;var l=o.anchorOffset,a=o.focusNode;o=o.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break e}var r=0,c=-1,d=-1,p=0,L=0,N=e,C=null;t:for(;;){for(var Y;N!==n||l!==0&&N.nodeType!==3||(c=r+l),N!==a||o!==0&&N.nodeType!==3||(d=r+o),N.nodeType===3&&(r+=N.nodeValue.length),(Y=N.firstChild)!==null;)C=N,N=Y;for(;;){if(N===e)break t;if(C===n&&++p===l&&(c=r),C===a&&++L===o&&(d=r),(Y=N.nextSibling)!==null)break;N=C,C=N.parentNode}N=Y}n=c===-1||d===-1?null:{start:c,end:d}}else n=null}n=n||{start:0,end:0}}else n=null;for(ip={focusedElem:e,selectionRange:n},Oh=!1,xo=t;xo!==null;)if(t=xo,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,xo=e;else for(;xo!==null;){switch(e=t=xo,n=e.alternate,l=e.flags,e.tag){case 0:if((l&4)!==0&&(e=e.updateQueue,e=e!==null?e.events:null,e!==null))for(n=0;n<e.length;n++)l=e[n],l.ref.impl=l.nextImpl;break;case 11:case 15:break;case 1:(l&1024)!==0&&n!==null&&Vv(e,n);break;case 3:if((l&1024)!==0){if(e=e.stateNode.containerInfo,n=e.nodeType,n===9)k0(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":k0(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((l&1024)!==0)throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.")}if(e=t.sibling,e!==null){e.return=t.return,xo=e;break}xo=t.return}}function l1(e,t,n){var o=gl(),l=ba(),a=xa(),r=wa(),c=n.flags;switch(n.tag){case 0:case 11:case 15:Ma(e,n),c&4&&Zg(n,Ml|Pl);break;case 1:if(Ma(e,n),c&4)if(e=n.stateNode,t===null)n.type.defaultProps||"ref"in n.memoizedProps||mc||(e.props!==n.memoizedProps&&console.error("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",ue(n)||"instance"),e.state!==n.memoizedState&&console.error("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",ue(n)||"instance")),ka(n)?(Ca(),xe(n,Mm,n,e),Sa()):xe(n,Mm,n,e);else{var d=zr(n.type,t.memoizedProps);t=t.memoizedState,n.type.defaultProps||"ref"in n.memoizedProps||mc||(e.props!==n.memoizedProps&&console.error("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",ue(n)||"instance"),e.state!==n.memoizedState&&console.error("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",ue(n)||"instance")),ka(n)?(Ca(),xe(n,G5,n,e,d,t,e.__reactInternalSnapshotBeforeUpdate),Sa()):xe(n,G5,n,e,d,t,e.__reactInternalSnapshotBeforeUpdate)}c&64&&Fg(n),c&512&&uu(n,n.return);break;case 3:if(t=ai(),Ma(e,n),c&64&&(c=n.updateQueue,c!==null)){if(d=null,n.child!==null)switch(n.child.tag){case 27:case 5:d=n.child.stateNode;break;case 1:d=n.child.stateNode}try{xe(n,Kp,c,d)}catch(L){tn(n,n.return,L)}}e.effectDuration+=Hd(t);break;case 27:t===null&&c&4&&n1(n);case 26:case 5:if(Ma(e,n),t===null){if(c&4)e1(n);else if(c&64){e=n.type,t=n.memoizedProps,d=n.stateNode;try{xe(n,yx,d,e,t,n)}catch(L){tn(n,n.return,L)}}}c&512&&uu(n,n.return);break;case 12:if(c&4){c=ai(),Ma(e,n),e=n.stateNode,e.effectDuration+=Jc(c);try{xe(n,Kg,n,t,Ki,e.effectDuration)}catch(L){tn(n,n.return,L)}}else Ma(e,n);break;case 31:Ma(e,n),c&4&&r1(e,n);break;case 13:Ma(e,n),c&4&&s1(e,n),c&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(c=lx.bind(null,n),Ax(e,c))));break;case 22:if(c=n.memoizedState!==null||xi,!c){t=t!==null&&t.memoizedState!==null||so,d=xi;var p=so;xi=c,(so=t)&&!p?(Ta(e,n,(n.subtreeFlags&8772)!==0),(n.mode&Tt)!==_t&&0<=tt&&0<=dt&&.05<dt-tt&&nt(n,tt,dt)):Ma(e,n),xi=d,so=p}break;case 30:break;default:Ma(e,n)}(n.mode&Tt)!==_t&&0<=tt&&0<=dt&&((Un||.05<An)&&Ul(n,tt,dt,An,Tn),n.alternate===null&&n.return!==null&&n.return.alternate!==null&&.05<dt-tt&&(o1(n.return.alternate,n.return)||No(n,tt,dt,"Mount"))),yl(o),va(l),Tn=a,Un=r}function a1(e){var t=e.alternate;t!==null&&(e.alternate=null,a1(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&se(t)),e.stateNode=null,e._debugOwner=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function si(e,t,n){for(n=n.child;n!==null;)i1(e,t,n),n=n.sibling}function i1(e,t,n){if(Bo&&typeof Bo.onCommitFiberUnmount=="function")try{Bo.onCommitFiberUnmount(Vs,n)}catch(p){La||(La=!0,console.error("React instrumentation encountered an error: %o",p))}var o=gl(),l=ba(),a=xa(),r=wa();switch(n.tag){case 26:so||Ea(n,t),si(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(e=n.stateNode,e.parentNode.removeChild(e));break;case 27:so||Ea(n,t);var c=co,d=cl;Xi(n.type)&&(co=n.stateNode,cl=!1),si(e,t,n),xe(n,bu,n.stateNode),co=c,cl=d;break;case 5:so||Ea(n,t);case 6:if(c=co,d=cl,co=null,si(e,t,n),co=c,cl=d,co!==null)if(cl)try{xe(n,wx,co,n.stateNode)}catch(p){tn(n,t,p)}else try{xe(n,xx,co,n.stateNode)}catch(p){tn(n,t,p)}break;case 18:co!==null&&(cl?(e=co,cy(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),Is(e)):cy(co,n.stateNode));break;case 4:c=co,d=cl,co=n.stateNode.containerInfo,cl=!0,si(e,t,n),co=c,cl=d;break;case 0:case 11:case 14:case 15:zs(Zo,n,t),so||t0(n,t,Ml),si(e,t,n);break;case 1:so||(Ea(n,t),c=n.stateNode,typeof c.componentWillUnmount=="function"&&Jg(n,t,c)),si(e,t,n);break;case 21:si(e,t,n);break;case 22:so=(c=so)||n.memoizedState!==null,si(e,t,n),so=c;break;default:si(e,t,n)}(n.mode&Tt)!==_t&&0<=tt&&0<=dt&&(Un||.05<An)&&Ul(n,tt,dt,An,Tn),yl(o),va(l),Tn=a,Un=r}function r1(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{xe(t,zx,e)}catch(n){tn(t,t.return,n)}}}function s1(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{xe(t,Lx,e)}catch(n){tn(t,t.return,n)}}function Pv(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new z2),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new z2),t;default:throw Error("Unexpected Suspense handler tag ("+e.tag+"). This is a bug in React.")}}function hf(e,t){var n=Pv(e);t.forEach(function(o){if(!n.has(o)){if(n.add(o),Na)if(pc!==null&&gc!==null)_u(gc,pc);else throw Error("Expected finished root and lanes to be set. This is a bug in React.");var l=ax.bind(null,e,o);o.then(l,l)}})}function rl(e,t){var n=t.deletions;if(n!==null)for(var o=0;o<n.length;o++){var l=e,a=t,r=n[o],c=gl(),d=a;e:for(;d!==null;){switch(d.tag){case 27:if(Xi(d.type)){co=d.stateNode,cl=!1;break e}break;case 5:co=d.stateNode,cl=!1;break e;case 3:case 4:co=d.stateNode.containerInfo,cl=!0;break e}d=d.return}if(co===null)throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");i1(l,a,r),co=null,cl=!1,(r.mode&Tt)!==_t&&0<=tt&&0<=dt&&.05<dt-tt&&No(r,tt,dt,"Unmount"),yl(c),l=r,a=l.alternate,a!==null&&(a.return=null),l.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)c1(t,e),t=t.sibling}function c1(e,t){var n=gl(),o=ba(),l=xa(),a=wa(),r=e.alternate,c=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:rl(t,e),sl(e),c&4&&(zs(Zo|Pl,e,e.return),cu(Zo|Pl,e),t0(e,e.return,Ml|Pl));break;case 1:if(rl(t,e),sl(e),c&512&&(so||r===null||Ea(r,r.return)),c&64&&xi&&(c=e.updateQueue,c!==null&&(r=c.callbacks,r!==null))){var d=c.shared.hiddenCallbacks;c.shared.hiddenCallbacks=d===null?r:d.concat(r)}break;case 26:if(d=ua,rl(t,e),sl(e),c&512&&(so||r===null||Ea(r,r.return)),c&4){var p=r!==null?r.memoizedState:null;if(c=e.memoizedState,r===null)if(c===null)if(e.stateNode===null){e:{c=e.type,r=e.memoizedProps,d=d.ownerDocument||d;t:switch(c){case"title":p=d.getElementsByTagName("title")[0],(!p||p[Eu]||p[Do]||p.namespaceURI===Ws||p.hasAttribute("itemprop"))&&(p=d.createElement(c),d.head.insertBefore(p,d.querySelector("head > title"))),Ro(p,c,r),p[Do]=e,ae(p),c=p;break e;case"link":var L=vy("link","href",d).get(c+(r.href||""));if(L){for(var N=0;N<L.length;N++)if(p=L[N],p.getAttribute("href")===(r.href==null||r.href===""?null:r.href)&&p.getAttribute("rel")===(r.rel==null?null:r.rel)&&p.getAttribute("title")===(r.title==null?null:r.title)&&p.getAttribute("crossorigin")===(r.crossOrigin==null?null:r.crossOrigin)){L.splice(N,1);break t}}p=d.createElement(c),Ro(p,c,r),d.head.appendChild(p);break;case"meta":if(L=vy("meta","content",d).get(c+(r.content||""))){for(N=0;N<L.length;N++)if(p=L[N],Qt(r.content,"content"),p.getAttribute("content")===(r.content==null?null:""+r.content)&&p.getAttribute("name")===(r.name==null?null:r.name)&&p.getAttribute("property")===(r.property==null?null:r.property)&&p.getAttribute("http-equiv")===(r.httpEquiv==null?null:r.httpEquiv)&&p.getAttribute("charset")===(r.charSet==null?null:r.charSet)){L.splice(N,1);break t}}p=d.createElement(c),Ro(p,c,r),d.head.appendChild(p);break;default:throw Error('getNodesForType encountered a type it did not expect: "'+c+'". This is a bug in React.')}p[Do]=e,ae(p),c=p}e.stateNode=c}else xy(d,e.type,e.stateNode);else e.stateNode=by(d,c,e.memoizedProps);else p!==c?(p===null?r.stateNode!==null&&(r=r.stateNode,r.parentNode.removeChild(r)):p.count--,c===null?xy(d,e.type,e.stateNode):by(d,c,e.memoizedProps)):c===null&&e.stateNode!==null&&o0(e,e.memoizedProps,r.memoizedProps)}break;case 27:rl(t,e),sl(e),c&512&&(so||r===null||Ea(r,r.return)),r!==null&&c&4&&o0(e,e.memoizedProps,r.memoizedProps);break;case 5:if(rl(t,e),sl(e),c&512&&(so||r===null||Ea(r,r.return)),e.flags&32){d=e.stateNode;try{xe(e,ry,d)}catch(ze){tn(e,e.return,ze)}}c&4&&e.stateNode!=null&&(d=e.memoizedProps,o0(e,d,r!==null?r.memoizedProps:d)),c&1024&&(jm=!0,e.type!=="form"&&console.error("Unexpected host component type. Expected a form. This is a bug in React."));break;case 6:if(rl(t,e),sl(e),c&4){if(e.stateNode===null)throw Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");c=e.memoizedProps,r=r!==null?r.memoizedProps:c,d=e.stateNode;try{xe(e,vx,d,r,c)}catch(ze){tn(e,e.return,ze)}}break;case 3:if(d=ai(),Rh=null,p=ua,ua=xf(t.containerInfo),rl(t,e),ua=p,sl(e),c&4&&r!==null&&r.memoizedState.isDehydrated)try{xe(e,Ox,t.containerInfo)}catch(ze){tn(e,e.return,ze)}jm&&(jm=!1,u1(e)),t.effectDuration+=Hd(d);break;case 4:c=ua,ua=xf(e.stateNode.containerInfo),rl(t,e),sl(e),ua=c;break;case 12:c=ai(),rl(t,e),sl(e),e.stateNode.effectDuration+=Jc(c);break;case 31:rl(t,e),sl(e),c&4&&(c=e.updateQueue,c!==null&&(e.updateQueue=null,hf(e,c)));break;case 13:rl(t,e),sl(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(_h=bo()),c&4&&(c=e.updateQueue,c!==null&&(e.updateQueue=null,hf(e,c)));break;case 22:d=e.memoizedState!==null;var C=r!==null&&r.memoizedState!==null,Y=xi,ve=so;if(xi=Y||d,so=ve||C,rl(t,e),so=ve,xi=Y,C&&!d&&!Y&&!ve&&(e.mode&Tt)!==_t&&0<=tt&&0<=dt&&.05<dt-tt&&nt(e,tt,dt),sl(e),c&8192)e:for(t=e.stateNode,t._visibility=d?t._visibility&~Nu:t._visibility|Nu,!d||r===null||C||xi||so||(Lr(e),(e.mode&Tt)!==_t&&0<=tt&&0<=dt&&.05<dt-tt&&No(e,tt,dt,"Disconnect")),r=null,t=e;;){if(t.tag===5||t.tag===26){if(r===null){C=r=t;try{p=C.stateNode,d?xe(C,Cx,p):xe(C,Mx,C.stateNode,C.memoizedProps)}catch(ze){tn(C,C.return,ze)}}}else if(t.tag===6){if(r===null){C=t;try{L=C.stateNode,d?xe(C,kx,L):xe(C,Tx,L,C.memoizedProps)}catch(ze){tn(C,C.return,ze)}}}else if(t.tag===18){if(r===null){C=t;try{N=C.stateNode,d?xe(C,Sx,N):xe(C,Ex,C.stateNode)}catch(ze){tn(C,C.return,ze)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;r===t&&(r=null),t=t.return}r===t&&(r=null),t.sibling.return=t.return,t=t.sibling}c&4&&(c=e.updateQueue,c!==null&&(r=c.retryQueue,r!==null&&(c.retryQueue=null,hf(e,r))));break;case 19:rl(t,e),sl(e),c&4&&(c=e.updateQueue,c!==null&&(e.updateQueue=null,hf(e,c)));break;case 30:break;case 21:break;default:rl(t,e),sl(e)}(e.mode&Tt)!==_t&&0<=tt&&0<=dt&&((Un||.05<An)&&Ul(e,tt,dt,An,Tn),e.alternate===null&&e.return!==null&&e.return.alternate!==null&&.05<dt-tt&&(o1(e.return.alternate,e.return)||No(e,tt,dt,"Mount"))),yl(n),va(o),Tn=l,Un=a}function sl(e){var t=e.flags;if(t&2){try{xe(e,Gv,e)}catch(n){tn(e,e.return,n)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function u1(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;u1(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Ma(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)l1(e,t.alternate,t),t=t.sibling}function d1(e){var t=gl(),n=ba(),o=xa(),l=wa();switch(e.tag){case 0:case 11:case 14:case 15:t0(e,e.return,Ml),Lr(e);break;case 1:Ea(e,e.return);var a=e.stateNode;typeof a.componentWillUnmount=="function"&&Jg(e,e.return,a),Lr(e);break;case 27:xe(e,bu,e.stateNode);case 26:case 5:Ea(e,e.return),Lr(e);break;case 22:e.memoizedState===null&&Lr(e);break;case 30:Lr(e);break;default:Lr(e)}(e.mode&Tt)!==_t&&0<=tt&&0<=dt&&(Un||.05<An)&&Ul(e,tt,dt,An,Tn),yl(t),va(n),Tn=o,Un=l}function Lr(e){for(e=e.child;e!==null;)d1(e),e=e.sibling}function f1(e,t,n,o){var l=gl(),a=ba(),r=xa(),c=wa(),d=n.flags;switch(n.tag){case 0:case 11:case 15:Ta(e,n,o),Zg(n,Ml);break;case 1:if(Ta(e,n,o),t=n.stateNode,typeof t.componentDidMount=="function"&&xe(n,Mm,n,t),t=n.updateQueue,t!==null){e=n.stateNode;try{xe(n,Ov,t,e)}catch(p){tn(n,n.return,p)}}o&&d&64&&Fg(n),uu(n,n.return);break;case 27:n1(n);case 26:case 5:Ta(e,n,o),o&&t===null&&d&4&&e1(n),uu(n,n.return);break;case 12:if(o&&d&4){d=ai(),Ta(e,n,o),o=n.stateNode,o.effectDuration+=Jc(d);try{xe(n,Kg,n,t,Ki,o.effectDuration)}catch(p){tn(n,n.return,p)}}else Ta(e,n,o);break;case 31:Ta(e,n,o),o&&d&4&&r1(e,n);break;case 13:Ta(e,n,o),o&&d&4&&s1(e,n);break;case 22:n.memoizedState===null&&Ta(e,n,o),uu(n,n.return);break;case 30:break;default:Ta(e,n,o)}(n.mode&Tt)!==_t&&0<=tt&&0<=dt&&(Un||.05<An)&&Ul(n,tt,dt,An,Tn),yl(l),va(a),Tn=r,Un=c}function Ta(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;)f1(e,t.alternate,t,n),t=t.sibling}function i0(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&li(e),n!=null&&Rr(n))}function r0(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(li(t),e!=null&&Rr(e))}function la(e,t,n,o,l){if(t.subtreeFlags&10256||t.actualDuration!==0&&(t.alternate===null||t.alternate.child!==t.child))for(t=t.child;t!==null;){var a=t.sibling;h1(e,t,n,o,a!==null?a.actualStartTime:l),t=a}}function h1(e,t,n,o,l){var a=gl(),r=ba(),c=xa(),d=wa(),p=Zi,L=t.flags;switch(t.tag){case 0:case 11:case 15:(t.mode&Tt)!==_t&&0<t.actualStartTime&&(t.flags&1)!==0&&zi(t,t.actualStartTime,l,_o,n),la(e,t,n,o,l),L&2048&&Pg(t,Po|Pl);break;case 1:(t.mode&Tt)!==_t&&0<t.actualStartTime&&((t.flags&128)!==0?xs(t,t.actualStartTime,l,[]):(t.flags&1)!==0&&zi(t,t.actualStartTime,l,_o,n)),la(e,t,n,o,l);break;case 3:var N=ai(),C=_o;_o=t.alternate!==null&&t.alternate.memoizedState.isDehydrated&&(t.flags&256)===0,la(e,t,n,o,l),_o=C,L&2048&&(n=null,t.alternate!==null&&(n=t.alternate.memoizedState.cache),o=t.memoizedState.cache,o!==n&&(li(o),n!=null&&Rr(n))),e.passiveEffectDuration+=Hd(N);break;case 12:if(L&2048){L=ai(),la(e,t,n,o,l),e=t.stateNode,e.passiveEffectDuration+=Jc(L);try{xe(t,Wv,t,t.alternate,Ki,e.passiveEffectDuration)}catch(Y){tn(t,t.return,Y)}}else la(e,t,n,o,l);break;case 31:L=_o,N=t.alternate!==null?t.alternate.memoizedState:null,C=t.memoizedState,N!==null&&C===null?(C=t.deletions,C!==null&&0<C.length&&C[0].tag===18?(_o=!1,N=N.hydrationErrors,N!==null&&xs(t,t.actualStartTime,l,N)):_o=!0):_o=!1,la(e,t,n,o,l),_o=L;break;case 13:L=_o,N=t.alternate!==null?t.alternate.memoizedState:null,C=t.memoizedState,N===null||N.dehydrated===null||C!==null&&C.dehydrated!==null?_o=!1:(C=t.deletions,C!==null&&0<C.length&&C[0].tag===18?(_o=!1,N=N.hydrationErrors,N!==null&&xs(t,t.actualStartTime,l,N)):_o=!0),la(e,t,n,o,l),_o=L;break;case 23:break;case 22:C=t.stateNode,N=t.alternate,t.memoizedState!==null?C._visibility&di?la(e,t,n,o,l):du(e,t,n,o,l):C._visibility&di?la(e,t,n,o,l):(C._visibility|=di,Ls(e,t,n,o,(t.subtreeFlags&10256)!==0||t.actualDuration!==0&&(t.alternate===null||t.alternate.child!==t.child),l),(t.mode&Tt)===_t||_o||(e=t.actualStartTime,0<=e&&.05<l-e&&nt(t,e,l),0<=tt&&0<=dt&&.05<dt-tt&&nt(t,tt,dt))),L&2048&&i0(N,t);break;case 24:la(e,t,n,o,l),L&2048&&r0(t.alternate,t);break;default:la(e,t,n,o,l)}(t.mode&Tt)!==_t&&((e=!_o&&t.alternate===null&&t.return!==null&&t.return.alternate!==null)&&(n=t.actualStartTime,0<=n&&.05<l-n&&No(t,n,l,"Mount")),0<=tt&&0<=dt&&((Un||.05<An)&&Ul(t,tt,dt,An,Tn),e&&.05<dt-tt&&No(t,tt,dt,"Mount"))),yl(a),va(r),Tn=c,Un=d,Zi=p}function Ls(e,t,n,o,l,a){for(l=l&&((t.subtreeFlags&10256)!==0||t.actualDuration!==0&&(t.alternate===null||t.alternate.child!==t.child)),t=t.child;t!==null;){var r=t.sibling;_1(e,t,n,o,l,r!==null?r.actualStartTime:a),t=r}}function _1(e,t,n,o,l,a){var r=gl(),c=ba(),d=xa(),p=wa(),L=Zi;l&&(t.mode&Tt)!==_t&&0<t.actualStartTime&&(t.flags&1)!==0&&zi(t,t.actualStartTime,a,_o,n);var N=t.flags;switch(t.tag){case 0:case 11:case 15:Ls(e,t,n,o,l,a),Pg(t,Po);break;case 23:break;case 22:var C=t.stateNode;t.memoizedState!==null?C._visibility&di?Ls(e,t,n,o,l,a):du(e,t,n,o,a):(C._visibility|=di,Ls(e,t,n,o,l,a)),l&&N&2048&&i0(t.alternate,t);break;case 24:Ls(e,t,n,o,l,a),l&&N&2048&&r0(t.alternate,t);break;default:Ls(e,t,n,o,l,a)}(t.mode&Tt)!==_t&&0<=tt&&0<=dt&&(Un||.05<An)&&Ul(t,tt,dt,An,Tn),yl(r),va(c),Tn=d,Un=p,Zi=L}function du(e,t,n,o,l){if(t.subtreeFlags&10256||t.actualDuration!==0&&(t.alternate===null||t.alternate.child!==t.child))for(var a=t.child;a!==null;){t=a.sibling;var r=e,c=n,d=o,p=t!==null?t.actualStartTime:l,L=Zi;(a.mode&Tt)!==_t&&0<a.actualStartTime&&(a.flags&1)!==0&&zi(a,a.actualStartTime,p,_o,c);var N=a.flags;switch(a.tag){case 22:du(r,a,c,d,p),N&2048&&i0(a.alternate,a);break;case 24:du(r,a,c,d,p),N&2048&&r0(a.alternate,a);break;default:du(r,a,c,d,p)}Zi=L,a=t}}function Ns(e,t,n){if(e.subtreeFlags&td)for(e=e.child;e!==null;)m1(e,t,n),e=e.sibling}function m1(e,t,n){switch(e.tag){case 26:Ns(e,t,n),e.flags&td&&e.memoizedState!==null&&Hx(n,ua,e.memoizedState,e.memoizedProps);break;case 5:Ns(e,t,n);break;case 3:case 4:var o=ua;ua=xf(e.stateNode.containerInfo),Ns(e,t,n),ua=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=td,td=16777216,Ns(e,t,n),td=o):Ns(e,t,n));break;default:Ns(e,t,n)}}function p1(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function fu(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var o=t[n],l=gl();xo=o,b1(o,e),(o.mode&Tt)!==_t&&0<=tt&&0<=dt&&.05<dt-tt&&No(o,tt,dt,"Unmount"),yl(l)}p1(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)g1(e),e=e.sibling}function g1(e){var t=gl(),n=ba(),o=xa(),l=wa();switch(e.tag){case 0:case 11:case 15:fu(e),e.flags&2048&&n0(e,e.return,Po|Pl);break;case 3:var a=ai();fu(e),e.stateNode.passiveEffectDuration+=Hd(a);break;case 12:a=ai(),fu(e),e.stateNode.passiveEffectDuration+=Jc(a);break;case 22:a=e.stateNode,e.memoizedState!==null&&a._visibility&di&&(e.return===null||e.return.tag!==13)?(a._visibility&=~di,_f(e),(e.mode&Tt)!==_t&&0<=tt&&0<=dt&&.05<dt-tt&&No(e,tt,dt,"Disconnect")):fu(e);break;default:fu(e)}(e.mode&Tt)!==_t&&0<=tt&&0<=dt&&(Un||.05<An)&&Ul(e,tt,dt,An,Tn),yl(t),va(n),Un=l,Tn=o}function _f(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var o=t[n],l=gl();xo=o,b1(o,e),(o.mode&Tt)!==_t&&0<=tt&&0<=dt&&.05<dt-tt&&No(o,tt,dt,"Unmount"),yl(l)}p1(e)}for(e=e.child;e!==null;)y1(e),e=e.sibling}function y1(e){var t=gl(),n=ba(),o=xa(),l=wa();switch(e.tag){case 0:case 11:case 15:n0(e,e.return,Po),_f(e);break;case 22:var a=e.stateNode;a._visibility&di&&(a._visibility&=~di,_f(e));break;default:_f(e)}(e.mode&Tt)!==_t&&0<=tt&&0<=dt&&(Un||.05<An)&&Ul(e,tt,dt,An,Tn),yl(t),va(n),Un=l,Tn=o}function b1(e,t){for(;xo!==null;){var n=xo,o=n,l=t,a=gl(),r=ba(),c=xa(),d=wa();switch(o.tag){case 0:case 11:case 15:n0(o,l,Po);break;case 23:case 22:o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(l=o.memoizedState.cachePool.pool,l!=null&&li(l));break;case 24:Rr(o.memoizedState.cache)}if((o.mode&Tt)!==_t&&0<=tt&&0<=dt&&(Un||.05<An)&&Ul(o,tt,dt,An,Tn),yl(a),va(r),Un=d,Tn=c,o=n.child,o!==null)o.return=n,xo=o;else e:for(n=e;xo!==null;){if(o=xo,a=o.sibling,r=o.return,a1(o),o===n){xo=null;break e}if(a!==null){a.return=r,xo=a;break e}xo=r}}}function Fv(){b4.forEach(function(e){return e()})}function v1(){var e=typeof IS_REACT_ACT_ENVIRONMENT<"u"?IS_REACT_ACT_ENVIRONMENT:void 0;return e||V.actQueue===null||console.error("The current testing environment is not configured to support act(...)"),e}function vl(e){if((Gt&mo)!==wo&&Dt!==0)return Dt&-Dt;var t=V.T;return t!==null?(t._updatedFibers||(t._updatedFibers=new Set),t._updatedFibers.add(e),m0()):T()}function x1(){if(dl===0)if((Dt&536870912)===0||Yt){var e=zf;zf<<=1,(zf&3932160)===0&&(zf=262144),dl=e}else dl=536870912;return e=El.current,e!==null&&(e.flags|=32),dl}function Hn(e,t,n){if(vc&&console.error("useInsertionEffect must not schedule updates."),Fm&&(yh=!0),(e===_n&&(rn===Zr||rn===Pr)||e.cancelPendingCommit!==null)&&(Bs(e,0),Ii(e,Dt,dl,!1)),Ze(e,n),(Gt&mo)!==wo&&e===_n){if(za)switch(t.tag){case 0:case 11:case 15:e=At&&ue(At)||"Unknown",G2.has(e)||(G2.add(e),t=ue(t)||"Unknown",console.error("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render",t,e,e));break;case 1:W2||(console.error("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."),W2=!0)}}else Na&&Ue(e,t,n),rx(t),e===_n&&((Gt&mo)===wo&&(sr|=n),On===ar&&Ii(e,Dt,dl,!1)),Ra(e)}function w1(e,t,n){if((Gt&(mo|Tl))!==wo)throw Error("Should not already be working.");if(Dt!==0&&At!==null){var o=At,l=bo();switch(j5){case ld:case Zr:var a=Iu;wn&&((o=o._debugTask)?o.run(console.timeStamp.bind(console,"Suspended",a,l,Yl,void 0,"primary-light")):console.timeStamp("Suspended",a,l,Yl,void 0,"primary-light"));break;case Pr:a=Iu,wn&&((o=o._debugTask)?o.run(console.timeStamp.bind(console,"Action",a,l,Yl,void 0,"primary-light")):console.timeStamp("Action",a,l,Yl,void 0,"primary-light"));break;default:wn&&(o=l-Iu,3>o||console.timeStamp("Blocked",Iu,l,Yl,void 0,5>o?"primary-light":10>o?"primary":100>o?"primary-dark":"error"))}}a=(n=!n&&(t&127)===0&&(t&e.expiredLanes)===0||Bt(e,t))?Kv(e,t):c0(e,t,!0);var r=n;do{if(a===wi){yc&&!n&&Ii(e,t,0,!1),t=rn,Iu=ao(),j5=t;break}else{if(o=bo(),l=e.current.alternate,r&&!Jv(l)){Lo(t),l=vo,a=o,!wn||a<=l||(Gn?Gn.run(console.timeStamp.bind(console,"Teared Render",l,a,Ut,Nt,"error")):console.timeStamp("Teared Render",l,a,Ut,Nt,"error")),Nr(t,o),a=c0(e,t,!1),r=!1;continue}if(a===Gr){if(r=t,e.errorRecoveryDisabledLanes&r)var c=0;else c=e.pendingLanes&-536870913,c=c!==0?c:c&536870912?536870912:0;if(c!==0){Lo(t),ws(vo,o,t,Gn),Nr(t,o),t=c;e:{o=e,a=r,r=id;var d=o.current.memoizedState.isDehydrated;if(d&&(Bs(o,c).flags|=256),c=c0(o,c,!1),c!==Gr){if(Xm&&!d){o.errorRecoveryDisabledLanes|=a,sr|=a,a=ar;break e}o=Fo,Fo=r,o!==null&&(Fo===null?Fo=o:Fo.push.apply(Fo,o))}a=c}if(r=!1,a!==Gr)continue;o=bo()}}if(a===od){Lo(t),ws(vo,o,t,Gn),Nr(t,o),Bs(e,0),Ii(e,t,0,!0);break}e:{switch(n=e,a){case wi:case od:throw Error("Root did not complete. This is a bug in React.");case ar:if((t&4194048)!==t)break;case uh:Lo(t),Ja(vo,o,t,Gn),Nr(t,o),l=t,(l&127)!==0?Zf=o:(l&4194048)!==0&&(Pf=o),Ii(n,t,dl,!ir);break e;case Gr:Fo=null;break;case ch:case L2:break;default:throw Error("Unknown root exit status.")}if(V.actQueue!==null)u0(n,l,t,Fo,rd,hh,dl,sr,Fr,a,null,null,vo,o);else{if((t&62914560)===t&&(r=_h+B2-bo(),10<r)){if(Ii(n,t,dl,!ir),Je(n,0,!0)!==0)break e;da=t,n.timeoutHandle=nb(S1.bind(null,n,l,Fo,rd,hh,t,dl,sr,Fr,ir,a,"Throttled",vo,o),r);break e}S1(n,l,Fo,rd,hh,t,dl,sr,Fr,ir,a,null,vo,o)}}}break}while(!0);Ra(e)}function S1(e,t,n,o,l,a,r,c,d,p,L,N,C,Y){e.timeoutHandle=ns;var ve=t.subtreeFlags,ze=null;if((ve&8192||(ve&16785408)===16785408)&&(ze={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:na},m1(t,a,ze),ve=(a&62914560)===a?_h-bo():(a&4194048)===a?$2-bo():0,ve=Ux(ze,ve),ve!==null)){da=a,e.cancelPendingCommit=ve(u0.bind(null,e,t,a,n,o,l,r,c,d,L,ze,ze.waitingForViewTransition?"Waiting for the previous Animation":0<ze.count?0<ze.imgCount?"Suspended on CSS and Images":"Suspended on CSS":ze.imgCount===1?"Suspended on an Image":0<ze.imgCount?"Suspended on Images":null,C,Y)),Ii(e,a,r,!p);return}u0(e,t,a,n,o,l,r,c,d,L,ze,N,C,Y)}function Jv(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var o=0;o<n.length;o++){var l=n[o],a=l.getSnapshot;l=l.value;try{if(!Wo(a(),l))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Ii(e,t,n,o){t&=~qm,t&=~sr,e.suspendedLanes|=t,e.pingedLanes&=~t,o&&(e.warmLanes|=t),o=e.expirationTimes;for(var l=t;0<l;){var a=31-qo(l),r=1<<a;o[a]=-1,l&=~r}n!==0&&I(e,n,t)}function $s(){return(Gt&(mo|Tl))===wo?(mu(0,!1),!1):!0}function s0(){if(At!==null){if(rn===ul)var e=At.return;else e=At,gn(),b_(e),cc=null,Pu=0,e=At;for(;e!==null;)Gg(e.alternate,e),e=e.return;At=null}}function Nr(e,t){(e&127)!==0&&(er=t),(e&4194048)!==0&&(ja=t),(e&62914560)!==0&&(H5=t),(e&2080374784)!==0&&(U5=t)}function Bs(e,t){wn&&(console.timeStamp("Blocking Track",.003,.003,"Blocking",Nt,"primary-light"),console.timeStamp("Transition Track",.003,.003,"Transition",Nt,"primary-light"),console.timeStamp("Suspense Track",.003,.003,"Suspense",Nt,"primary-light"),console.timeStamp("Idle Track",.003,.003,"Idle",Nt,"primary-light"));var n=vo;if(vo=ao(),Dt!==0&&0<n){if(Lo(Dt),On===ch||On===ar)Ja(n,vo,t,Gn);else{var o=vo,l=Gn;if(wn&&!(o<=n)){var a=(t&738197653)===t?"tertiary-dark":"primary-dark",r=(t&536870912)===t?"Prewarm":(t&201326741)===t?"Interrupted Hydration":"Interrupted Render";l?l.run(console.timeStamp.bind(console,r,n,o,Ut,Nt,a)):console.timeStamp(r,n,o,Ut,Nt,a)}}Nr(Dt,vo)}if(n=Gn,Gn=null,(t&127)!==0){Gn=Hu,l=0<=Ua&&Ua<er?er:Ua,o=0<=jr&&jr<er?er:jr,a=0<=o?o:0<=l?l:vo,0<=Zf?(Lo(2),Mr(Zf,a,t,n)):(Ff&127)!==0&&(Lo(2),Li(er,a,gi)),n=l;var c=o,d=Uu,p=0<ic,L=tr===Bu,N=tr===Gf;if(l=vo,o=Hu,a=wm,r=Sm,wn){if(Ut="Blocking",0<n?n>l&&(n=l):n=l,0<c?c>n&&(c=n):c=n,d!==null&&n>c){var C=p?"secondary-light":"warning";o?o.run(console.timeStamp.bind(console,p?"Consecutive":"Event: "+d,c,n,Ut,Nt,C)):console.timeStamp(p?"Consecutive":"Event: "+d,c,n,Ut,Nt,C)}l>n&&(c=L?"error":(t&738197653)===t?"tertiary-light":"primary-light",L=N?"Promise Resolved":L?"Cascading Update":5<l-n?"Update Blocked":"Update",N=[],r!=null&&N.push(["Component name",r]),a!=null&&N.push(["Method name",a]),n={start:n,end:l,detail:{devtools:{properties:N,track:Ut,trackGroup:Nt,color:c}}},o?o.run(performance.measure.bind(performance,L,n)):performance.measure(L,n))}Ua=-1.1,tr=0,Sm=wm=null,Zf=-1.1,ic=jr,jr=-1.1,er=ao()}if((t&4194048)!==0&&(Gn=ju,l=0<=pi&&pi<ja?ja:pi,n=0<=Gl&&Gl<ja?ja:Gl,o=0<=nr&&nr<ja?ja:nr,a=0<=o?o:0<=n?n:vo,0<=Pf?(Lo(256),Mr(Pf,a,t,Gn)):(Ff&4194048)!==0&&(Lo(256),Li(ja,a,gi)),N=o,c=Ir,d=0<or,p=Cm===Gf,a=vo,o=ju,r=$5,L=B5,wn&&(Ut="Transition",0<n?n>a&&(n=a):n=a,0<l?l>n&&(l=n):l=n,0<N?N>l&&(N=l):N=l,l>N&&c!==null&&(C=d?"secondary-light":"warning",o?o.run(console.timeStamp.bind(console,d?"Consecutive":"Event: "+c,N,l,Ut,Nt,C)):console.timeStamp(d?"Consecutive":"Event: "+c,N,l,Ut,Nt,C)),n>l&&(o?o.run(console.timeStamp.bind(console,"Action",l,n,Ut,Nt,"primary-dark")):console.timeStamp("Action",l,n,Ut,Nt,"primary-dark")),a>n&&(l=p?"Promise Resolved":5<a-n?"Update Blocked":"Update",N=[],L!=null&&N.push(["Component name",L]),r!=null&&N.push(["Method name",r]),n={start:n,end:a,detail:{devtools:{properties:N,track:Ut,trackGroup:Nt,color:"primary-light"}}},o?o.run(performance.measure.bind(performance,l,n)):performance.measure(l,n))),Gl=pi=-1.1,Cm=0,Pf=-1.1,or=nr,nr=-1.1,ja=ao()),(t&62914560)!==0&&(Ff&62914560)!==0&&(Lo(4194304),Li(H5,vo,gi)),(t&2080374784)!==0&&(Ff&2080374784)!==0&&(Lo(268435456),Li(U5,vo,gi)),n=e.timeoutHandle,n!==ns&&(e.timeoutHandle=ns,O4(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),da=0,s0(),_n=e,At=n=$o(e.current,null),Dt=t,rn=ul,Rl=null,ir=!1,yc=Bt(e,t),Xm=!1,On=wi,Fr=dl=qm=sr=rr=0,Fo=id=null,hh=!1,(t&8)!==0&&(t|=t&32),o=e.entangledLanes,o!==0)for(e=e.entanglements,o&=t;0<o;)l=31-qo(o),a=1<<l,t|=e[l],o&=~a;return Ya=t,Ka(),e=D5(),1e3<e-R5&&(V.recentlyCreatedOwnerStacks=0,R5=e),sa.discardPendingWarnings(),n}function C1(e,t){gt=null,V.H=ed,V.getCurrentStack=null,za=!1,Sl=null,t===sc||t===th?(t=Vp(),rn=ld):t===Tm?(t=Vp(),rn=N2):rn=t===Hm?Ym:t!==null&&typeof t=="object"&&typeof t.then=="function"?ad:dh,Rl=t;var n=At;n===null?(On=od,rf(e,z(t,e.current))):n.mode&Tt&&i_(n)}function k1(){var e=El.current;return e===null?!0:(Dt&4194048)===Dt?Zl===null:(Dt&62914560)===Dt||(Dt&536870912)!==0?e===Zl:!1}function E1(){var e=V.H;return V.H=ed,e===null?ed:e}function M1(){var e=V.A;return V.A=y4,e}function mf(e){Gn===null&&(Gn=e._debugTask==null?null:e._debugTask)}function pf(){On=ar,ir||(Dt&4194048)!==Dt&&El.current!==null||(yc=!0),(rr&134217727)===0&&(sr&134217727)===0||_n===null||Ii(_n,Dt,dl,!1)}function c0(e,t,n){var o=Gt;Gt|=mo;var l=E1(),a=M1();if(_n!==e||Dt!==t){if(Na){var r=e.memoizedUpdaters;0<r.size&&(_u(e,Dt),r.clear()),de(e,t)}rd=null,Bs(e,t)}t=!1,r=On;e:do try{if(rn!==ul&&At!==null){var c=At,d=Rl;switch(rn){case Ym:s0(),r=uh;break e;case ld:case Zr:case Pr:case ad:El.current===null&&(t=!0);var p=rn;if(rn=ul,Rl=null,Hs(e,c,d,p),n&&yc){r=wi;break e}break;default:p=rn,rn=ul,Rl=null,Hs(e,c,d,p)}}T1(),r=On;break}catch(L){C1(e,L)}while(!0);return t&&e.shellSuspendCounter++,gn(),Gt=o,V.H=l,V.A=a,At===null&&(_n=null,Dt=0,Ka()),r}function T1(){for(;At!==null;)R1(At)}function Kv(e,t){var n=Gt;Gt|=mo;var o=E1(),l=M1();if(_n!==e||Dt!==t){if(Na){var a=e.memoizedUpdaters;0<a.size&&(_u(e,Dt),a.clear()),de(e,t)}rd=null,mh=bo()+H2,Bs(e,t)}else yc=Bt(e,t);e:do try{if(rn!==ul&&At!==null)t:switch(t=At,a=Rl,rn){case dh:rn=ul,Rl=null,Hs(e,t,a,dh);break;case Zr:case Pr:if(Xp(a)){rn=ul,Rl=null,D1(t);break}t=function(){rn!==Zr&&rn!==Pr||_n!==e||(rn=fh),Ra(e)},a.then(t,t);break e;case ld:rn=fh;break e;case N2:rn=Im;break e;case fh:Xp(a)?(rn=ul,Rl=null,D1(t)):(rn=ul,Rl=null,Hs(e,t,a,fh));break;case Im:var r=null;switch(At.tag){case 26:r=At.memoizedState;case 5:case 27:var c=At;if(r?wy(r):c.stateNode.complete){rn=ul,Rl=null;var d=c.sibling;if(d!==null)At=d;else{var p=c.return;p!==null?(At=p,gf(p)):At=null}break t}break;default:console.error("Unexpected type of fiber triggered a suspensey commit. This is a bug in React.")}rn=ul,Rl=null,Hs(e,t,a,Im);break;case ad:rn=ul,Rl=null,Hs(e,t,a,ad);break;case Ym:s0(),On=uh;break e;default:throw Error("Unexpected SuspendedReason. This is a bug in React.")}V.actQueue!==null?T1():ex();break}catch(L){C1(e,L)}while(!0);return gn(),V.H=o,V.A=l,Gt=n,At!==null?wi:(_n=null,Dt=0,Ka(),On)}function ex(){for(;At!==null&&!Kx();)R1(At)}function R1(e){var t=e.alternate;(e.mode&Tt)!==_t?(a_(e),t=xe(e,K_,t,e,Ya),i_(e)):t=xe(e,K_,t,e,Ya),e.memoizedProps=e.pendingProps,t===null?gf(e):At=t}function D1(e){var t=xe(e,tx,e);e.memoizedProps=e.pendingProps,t===null?gf(e):At=t}function tx(e){var t=e.alternate,n=(e.mode&Tt)!==_t;switch(n&&a_(e),e.tag){case 15:case 0:t=Ig(t,e,e.pendingProps,e.type,void 0,Dt);break;case 11:t=Ig(t,e,e.pendingProps,e.type.render,e.ref,Dt);break;case 5:b_(e);default:Gg(t,e),e=At=$d(e,Ya),t=K_(t,e,Ya)}return n&&i_(e),t}function Hs(e,t,n,o){gn(),b_(t),cc=null,Pu=0;var l=t.return;try{if(Uv(e,l,t,n,Dt)){On=od,rf(e,z(n,e.current)),At=null;return}}catch(a){if(l!==null)throw At=l,a;On=od,rf(e,z(n,e.current)),At=null;return}t.flags&32768?(Yt||o===dh?e=!0:yc||(Dt&536870912)!==0?e=!1:(ir=e=!0,(o===Zr||o===Pr||o===ld||o===ad)&&(o=El.current,o!==null&&o.tag===13&&(o.flags|=16384))),A1(t,e)):gf(t)}function gf(e){var t=e;do{if((t.flags&32768)!==0){A1(t,ir);return}var n=t.alternate;if(e=t.return,a_(t),n=xe(t,Yv,n,t,Ya),(t.mode&Tt)!==_t&&Hp(t),n!==null){At=n;return}if(t=t.sibling,t!==null){At=t;return}At=t=e}while(t!==null);On===wi&&(On=L2)}function A1(e,t){do{var n=Xv(e.alternate,e);if(n!==null){n.flags&=32767,At=n;return}if((e.mode&Tt)!==_t){Hp(e),n=e.actualDuration;for(var o=e.child;o!==null;)n+=o.actualDuration,o=o.sibling;e.actualDuration=n}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){At=e;return}At=e=n}while(e!==null);On=uh,At=null}function u0(e,t,n,o,l,a,r,c,d,p,L,N,C,Y){e.cancelPendingCommit=null;do hu();while(uo!==ur);if(sa.flushLegacyContextWarning(),sa.flushPendingUnsafeLifecycleWarnings(),(Gt&(mo|Tl))!==wo)throw Error("Should not already be working.");if(Lo(n),p===Gr?ws(C,Y,n,Gn):o!==null?Nd(C,Y,n,o,t!==null&&t.alternate!==null&&t.alternate.memoizedState.isDehydrated&&(t.flags&256)!==0,Gn):Gc(C,Y,n,Gn),t!==null){if(n===0&&console.error("finishedLanes should not be empty during a commit. This is a bug in React."),t===e.current)throw Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");if(a=t.lanes|t.childLanes,a|=gm,H(e,n,a,r,c,d),e===_n&&(At=_n=null,Dt=0),bc=t,dr=e,da=n,Wm=a,Zm=l,q2=o,Gm=Y,V2=N,fa=ph,Q2=null,t.actualDuration!==0||(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,ix(qs,function(){return hd=window.event,fa===ph&&(fa=Qm),$1(),null})):(e.callbackNode=null,e.callbackPriority=0),mi=null,Ki=ao(),N!==null&&Ss(Y,Ki,N,Gn),o=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||o){o=V.T,V.T=null,l=nn.p,nn.p=Cl,r=Gt,Gt|=Tl;try{Zv(e,t,n)}finally{Gt=r,nn.p=l,V.T=o}}uo=j2,O1(),z1(),L1()}}function O1(){if(uo===j2){uo=ur;var e=dr,t=bc,n=da,o=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||o){o=V.T,V.T=null;var l=nn.p;nn.p=Cl;var a=Gt;Gt|=Tl;try{pc=n,gc=e,Ud(),c1(t,e),gc=pc=null,n=ip;var r=ml(e.containerInfo),c=n.focusedElem,d=n.selectionRange;if(r!==c&&c&&c.ownerDocument&&Pa(c.ownerDocument.documentElement,c)){if(d!==null&&Fa(c)){var p=d.start,L=d.end;if(L===void 0&&(L=p),"selectionStart"in c)c.selectionStart=p,c.selectionEnd=Math.min(L,c.value.length);else{var N=c.ownerDocument||document,C=N&&N.defaultView||window;if(C.getSelection){var Y=C.getSelection(),ve=c.textContent.length,ze=Math.min(d.start,ve),bn=d.end===void 0?ze:Math.min(d.end,ve);!Y.extend&&ze>bn&&(r=bn,bn=ze,ze=r);var Vt=Qc(c,ze),S=Qc(c,bn);if(Vt&&S&&(Y.rangeCount!==1||Y.anchorNode!==Vt.node||Y.anchorOffset!==Vt.offset||Y.focusNode!==S.node||Y.focusOffset!==S.offset)){var M=N.createRange();M.setStart(Vt.node,Vt.offset),Y.removeAllRanges(),ze>bn?(Y.addRange(M),Y.extend(S.node,S.offset)):(M.setEnd(S.node,S.offset),Y.addRange(M))}}}}for(N=[],Y=c;Y=Y.parentNode;)Y.nodeType===1&&N.push({element:Y,left:Y.scrollLeft,top:Y.scrollTop});for(typeof c.focus=="function"&&c.focus(),c=0;c<N.length;c++){var O=N[c];O.element.scrollLeft=O.left,O.element.scrollTop=O.top}}Oh=!!ap,ip=ap=null}finally{Gt=a,nn.p=l,V.T=o}}e.current=t,uo=I2}}function z1(){if(uo===I2){uo=ur;var e=Q2;if(e!==null){Ki=ao();var t=_i,n=Ki;!wn||n<=t||(gi?gi.run(console.timeStamp.bind(console,e,t,n,Ut,Nt,"secondary-light")):console.timeStamp(e,t,n,Ut,Nt,"secondary-light"))}e=dr,t=bc,n=da;var o=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||o){o=V.T,V.T=null;var l=nn.p;nn.p=Cl;var a=Gt;Gt|=Tl;try{pc=n,gc=e,Ud(),l1(e,t.alternate,t),gc=pc=null}finally{Gt=a,nn.p=l,V.T=o}}e=Gm,t=V2,_i=ao(),e=t===null?e:Ki,t=_i,n=fa===Vm,o=Gn,mi!==null?Cs(e,t,mi,!1,o):!wn||t<=e||(o?o.run(console.timeStamp.bind(console,n?"Commit Interrupted View Transition":"Commit",e,t,Ut,Nt,n?"error":"secondary-dark")):console.timeStamp(n?"Commit Interrupted View Transition":"Commit",e,t,Ut,Nt,n?"error":"secondary-dark")),uo=Y2}}function L1(){if(uo===X2||uo===Y2){if(uo===X2){var e=_i;_i=ao();var t=_i,n=fa===Vm;!wn||t<=e||(gi?gi.run(console.timeStamp.bind(console,n?"Interrupted View Transition":"Starting Animation",e,t,Ut,Nt,n?"error":"secondary-light")):console.timeStamp(n?"Interrupted View Transition":"Starting Animation",e,t,Ut,Nt,n?" error":"secondary-light")),fa!==Vm&&(fa=U2)}uo=ur,ew(),e=dr;var o=bc;t=da,n=q2;var l=o.actualDuration!==0||(o.subtreeFlags&10256)!==0||(o.flags&10256)!==0;l?uo=gh:(uo=ur,bc=dr=null,N1(e,e.pendingLanes),Jr=0,cd=null);var a=e.pendingLanes;if(a===0&&(cr=null),l||j1(e),a=_(t),o=o.stateNode,Bo&&typeof Bo.onCommitFiberRoot=="function")try{var r=(o.current.flags&128)===128;switch(a){case Cl:var c=Z0;break;case ia:c=P0;break;case $a:c=qs;break;case Nf:c=F0;break;default:c=qs}Bo.onCommitFiberRoot(Vs,o,c,r)}catch(N){La||(La=!0,console.error("React instrumentation encountered an error: %o",N))}if(Na&&e.memoizedUpdaters.clear(),Fv(),n!==null){r=V.T,c=nn.p,nn.p=Cl,V.T=null;try{var d=e.onRecoverableError;for(o=0;o<n.length;o++){var p=n[o],L=nx(p.stack);xe(p.source,d,p.value,L)}}finally{V.T=r,nn.p=c}}(da&3)!==0&&hu(),Ra(e),a=e.pendingLanes,(t&261930)!==0&&(a&42)!==0?(Kf=!0,e===Pm?sd++:(sd=0,Pm=e)):sd=0,l||Nr(t,_i),mu(0,!1)}}function nx(e){return e={componentStack:e},Object.defineProperty(e,"digest",{get:function(){console.error('You are accessing "digest" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.')}}),e}function N1(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Rr(t)))}function hu(){return O1(),z1(),L1(),$1()}function $1(){if(uo!==gh)return!1;var e=dr,t=Wm;Wm=0;var n=_(da),o=$a===0||$a>n?$a:n;n=V.T;var l=nn.p;try{nn.p=o,V.T=null;var a=Zm;Zm=null,o=dr;var r=da;if(uo=ur,bc=dr=null,da=0,(Gt&(mo|Tl))!==wo)throw Error("Cannot flush passive effects while already rendering.");Lo(r),Fm=!0,yh=!1;var c=0;if(mi=null,c=bo(),fa===U2)Li(_i,c,gi);else{var d=_i,p=c,L=fa===Qm;!wn||p<=d||(Gn?Gn.run(console.timeStamp.bind(console,L?"Waiting for Paint":"Waiting",d,p,Ut,Nt,"secondary-light")):console.timeStamp(L?"Waiting for Paint":"Waiting",d,p,Ut,Nt,"secondary-light"))}d=Gt,Gt|=Tl;var N=o.current;Ud(),g1(N);var C=o.current;N=Gm,Ud(),h1(o,C,r,a,N),j1(o),Gt=d;var Y=bo();if(C=c,N=Gn,mi!==null?Cs(C,Y,mi,!0,N):!wn||Y<=C||(N?N.run(console.timeStamp.bind(console,"Remaining Effects",C,Y,Ut,Nt,"secondary-dark")):console.timeStamp("Remaining Effects",C,Y,Ut,Nt,"secondary-dark")),Nr(r,Y),mu(0,!1),yh?o===cd?Jr++:(Jr=0,cd=o):Jr=0,yh=Fm=!1,Bo&&typeof Bo.onPostCommitFiberRoot=="function")try{Bo.onPostCommitFiberRoot(Vs,o)}catch(ze){La||(La=!0,console.error("React instrumentation encountered an error: %o",ze))}var ve=o.current.stateNode;return ve.effectDuration=0,ve.passiveEffectDuration=0,!0}finally{nn.p=l,V.T=n,N1(e,t)}}function B1(e,t,n){t=z(n,t),Up(t),t=Y_(e.stateNode,t,2),e=Bi(e,t,2),e!==null&&(Ze(e,2),Ra(e))}function tn(e,t,n){if(vc=!1,e.tag===3)B1(e,e,n);else{for(;t!==null;){if(t.tag===3){B1(t,e,n);return}if(t.tag===1){var o=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(cr===null||!cr.has(o))){e=z(n,e),Up(e),n=X_(2),o=Bi(t,n,2),o!==null&&(q_(n,o,t,e),Ze(o,2),Ra(o));return}}t=t.return}console.error(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`,n)}}function d0(e,t,n){var o=e.pingCache;if(o===null){o=e.pingCache=new v4;var l=new Set;o.set(t,l)}else l=o.get(t),l===void 0&&(l=new Set,o.set(t,l));l.has(n)||(Xm=!0,l.add(n),o=ox.bind(null,e,t,n),Na&&_u(e,n),t.then(o,o))}function ox(e,t,n){var o=e.pingCache;o!==null&&o.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,(n&127)!==0?0>Ua&&(er=Ua=ao(),Hu=Wf("Promise Resolved"),tr=Gf):(n&4194048)!==0&&0>Gl&&(ja=Gl=ao(),ju=Wf("Promise Resolved"),Cm=Gf),v1()&&V.actQueue===null&&console.error(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act`),_n===e&&(Dt&n)===n&&(On===ar||On===ch&&(Dt&62914560)===Dt&&bo()-_h<B2?(Gt&mo)===wo&&Bs(e,0):qm|=n,Fr===Dt&&(Fr=0)),Ra(e)}function H1(e,t){t===0&&(t=Ot()),e=to(e,t),e!==null&&(Ze(e,t),Ra(e))}function lx(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),H1(e,n)}function ax(e,t){var n=0;switch(e.tag){case 31:case 13:var o=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error("Pinged unknown suspense boundary type. This is probably a bug in React.")}o!==null&&o.delete(t),H1(e,n)}function f0(e,t,n){if((t.subtreeFlags&67117056)!==0)for(t=t.child;t!==null;){var o=e,l=t,a=l.type===Rf;a=n||a,l.tag!==22?l.flags&67108864?a&&xe(l,U1,o,l):f0(o,l,a):l.memoizedState===null&&(a&&l.flags&8192?xe(l,U1,o,l):l.subtreeFlags&67108864&&xe(l,f0,o,l,a)),t=t.sibling}}function U1(e,t){Se(!0);try{d1(t),y1(t),f1(e,t.alternate,t,!1),_1(e,t,0,null,!1,0)}finally{Se(!1)}}function j1(e){var t=!0;e.current.mode&(Ho|ra)||(t=!1),f0(e,e.current,t)}function I1(e){if((Gt&mo)===wo){var t=e.tag;if(t===3||t===1||t===0||t===11||t===14||t===15){if(t=ue(e)||"ReactComponent",bh!==null){if(bh.has(t))return;bh.add(t)}else bh=new Set([t]);xe(e,function(){console.error("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously tries to update the component. Move this work to useEffect instead.")})}}}function _u(e,t){Na&&e.memoizedUpdaters.forEach(function(n){Ue(e,n,t)})}function ix(e,t){var n=V.actQueue;return n!==null?(n.push(t),S4):G0(e,t)}function rx(e){v1()&&V.actQueue===null&&xe(e,function(){console.error(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act`,ue(e))})}function Ra(e){e!==xc&&e.next===null&&(xc===null?vh=xc=e:xc=xc.next=e),xh=!0,V.actQueue!==null?Km||(Km=!0,V1()):Jm||(Jm=!0,V1())}function mu(e,t){if(!ep&&xh){ep=!0;do for(var n=!1,o=vh;o!==null;){if(!t)if(e!==0){var l=o.pendingLanes;if(l===0)var a=0;else{var r=o.suspendedLanes,c=o.pingedLanes;a=(1<<31-qo(42|e)+1)-1,a&=l&~(r&~c),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,q1(o,a))}else a=Dt,a=Je(o,o===_n?a:0,o.cancelPendingCommit!==null||o.timeoutHandle!==ns),(a&3)===0||Bt(o,a)||(n=!0,q1(o,a));o=o.next}while(n);ep=!1}}function sx(){hd=window.event,h0()}function h0(){xh=Km=Jm=!1;var e=0;fr!==0&&mx()&&(e=fr);for(var t=bo(),n=null,o=vh;o!==null;){var l=o.next,a=Y1(o,t);a===0?(o.next=null,n===null?vh=l:n.next=l,l===null&&(xc=n)):(n=o,(e!==0||(a&3)!==0)&&(xh=!0)),o=l}uo!==ur&&uo!==gh||mu(e,!1),fr!==0&&(fr=0)}function Y1(e,t){for(var n=e.suspendedLanes,o=e.pingedLanes,l=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var r=31-qo(a),c=1<<r,d=l[r];d===-1?((c&n)===0||(c&o)!==0)&&(l[r]=Zt(c,t)):d<=t&&(e.expiredLanes|=c),a&=~c}if(t=_n,n=Dt,n=Je(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==ns),o=e.callbackNode,n===0||e===t&&(rn===Zr||rn===Pr)||e.cancelPendingCommit!==null)return o!==null&&_0(o),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||Bt(e,n)){if(t=n&-n,t!==e.callbackPriority||V.actQueue!==null&&o!==tp)_0(o);else return t;switch(_(n)){case Cl:case ia:n=P0;break;case $a:n=qs;break;case Nf:n=F0;break;default:n=qs}return o=X1.bind(null,e),V.actQueue!==null?(V.actQueue.push(o),n=tp):n=G0(n,o),e.callbackPriority=t,e.callbackNode=n,t}return o!==null&&_0(o),e.callbackPriority=2,e.callbackNode=null,2}function X1(e,t){if(Kf=Jf=!1,hd=window.event,uo!==ur&&uo!==gh)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(fa===ph&&(fa=Qm),hu()&&e.callbackNode!==n)return null;var o=Dt;return o=Je(e,e===_n?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==ns),o===0?null:(w1(e,o,t),Y1(e,bo()),e.callbackNode!=null&&e.callbackNode===n?X1.bind(null,e):null)}function q1(e,t){if(hu())return null;Jf=Kf,Kf=!1,w1(e,t,!0)}function _0(e){e!==tp&&e!==null&&Jx(e)}function V1(){V.actQueue!==null&&V.actQueue.push(function(){return h0(),null}),z4(function(){(Gt&(mo|Tl))!==wo?G0(Z0,sx):h0()})}function m0(){if(fr===0){var e=Yr;e===0&&(e=Of,Of<<=1,(Of&261888)===0&&(Of=256)),fr=e}return fr}function Q1(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:(Qt(e,"action"),xr(""+e))}function W1(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function cx(e,t,n,o,l){if(t==="submit"&&n&&n.stateNode===l){var a=Q1((l[Vo]||null).action),r=o.submitter;r&&(t=(t=r[Vo]||null)?Q1(t.formAction):r.getAttribute("formAction"),t!==null&&(a=t,r=null));var c=new jf("action","action",null,o,l);e.push({event:c,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(fr!==0){var d=r?W1(l,r):new FormData(l),p={pending:!0,data:d,method:l.method,action:a};Object.freeze(p),N_(n,p,null,d)}}else typeof a=="function"&&(c.preventDefault(),d=r?W1(l,r):new FormData(l),p={pending:!0,data:d,method:l.method,action:a},Object.freeze(p),N_(n,p,a,d))},currentTarget:l}]})}}function yf(e,t,n){e.currentTarget=n;try{t(e)}catch(o){hm(o)}e.currentTarget=null}function G1(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var o=e[n];e:{var l=void 0,a=o.event;if(o=o.listeners,t)for(var r=o.length-1;0<=r;r--){var c=o[r],d=c.instance,p=c.currentTarget;if(c=c.listener,d!==l&&a.isPropagationStopped())break e;d!==null?xe(d,yf,a,c,p):yf(a,c,p),l=d}else for(r=0;r<o.length;r++){if(c=o[r],d=c.instance,p=c.currentTarget,c=c.listener,d!==l&&a.isPropagationStopped())break e;d!==null?xe(d,yf,a,c,p):yf(a,c,p),l=d}}}}function qt(e,t){np.has(e)||console.error('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.',e);var n=t[J0];n===void 0&&(n=t[J0]=new Set);var o=e+"__bubble";n.has(o)||(Z1(t,e,2,!1),n.add(o))}function p0(e,t,n){np.has(e)&&!t&&console.error('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.',e);var o=0;t&&(o|=4),Z1(n,e,o,t)}function g0(e){if(!e[wh]){e[wh]=!0,Vy.forEach(function(n){n!=="selectionchange"&&(np.has(n)||p0(n,!1,e),p0(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[wh]||(t[wh]=!0,p0("selectionchange",!1,t))}}function Z1(e,t,n,o){switch(Ty(t)){case Cl:var l=Xx;break;case ia:l=qx;break;default:l=z0}n=l.bind(null,t,n,e),l=void 0,!om||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),o?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function y0(e,t,n,o,l){var a=o;if((t&1)===0&&(t&2)===0&&o!==null)e:for(;;){if(o===null)return;var r=o.tag;if(r===3||r===4){var c=o.stateNode.containerInfo;if(c===l)break;if(r===4)for(r=o.return;r!==null;){var d=r.tag;if((d===3||d===4)&&r.stateNode.containerInfo===l)return;r=r.return}for(;c!==null;){if(r=K(c),r===null)return;if(d=r.tag,d===5||d===6||d===26||d===27){o=a=r;continue e}c=c.parentNode}}o=o.return}_l(function(){var p=a,L=Mt(n),N=[];e:{var C=T5.get(e);if(C!==void 0){var Y=jf,ve=e;switch(e){case"keypress":if(wr(n)===0)break e;case"keydown":case"keyup":Y=Uw;break;case"focusin":ve="focus",Y=rm;break;case"focusout":ve="blur",Y=rm;break;case"beforeblur":case"afterblur":Y=rm;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Y=_5;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Y=Mw;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Y=Yw;break;case C5:case k5:case E5:Y=Dw;break;case M5:Y=qw;break;case"scroll":case"scrollend":Y=kw;break;case"wheel":Y=Qw;break;case"copy":case"cut":case"paste":Y=Ow;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Y=p5;break;case"toggle":case"beforetoggle":Y=Gw}var ze=(t&4)!==0,bn=!ze&&(e==="scroll"||e==="scrollend"),Vt=ze?C!==null?C+"Capture":null:C;ze=[];for(var S=p,M;S!==null;){var O=S;if(M=O.stateNode,O=O.tag,O!==5&&O!==26&&O!==27||M===null||Vt===null||(O=Ri(S,Vt),O!=null&&ze.push(pu(S,O,M))),bn)break;S=S.return}0<ze.length&&(C=new Y(C,ve,null,n,L),N.push({event:C,listeners:ze}))}}if((t&7)===0){e:{if(C=e==="mouseover"||e==="pointerover",Y=e==="mouseout"||e==="pointerout",C&&n!==Mu&&(ve=n.relatedTarget||n.fromElement)&&(K(ve)||ve[Wi]))break e;if((Y||C)&&(C=L.window===L?L:(C=L.ownerDocument)?C.defaultView||C.parentWindow:window,Y?(ve=n.relatedTarget||n.toElement,Y=p,ve=ve?K(ve):null,ve!==null&&(bn=J(ve),ze=ve.tag,ve!==bn||ze!==5&&ze!==27&&ze!==6)&&(ve=null)):(Y=null,ve=p),Y!==ve)){if(ze=_5,O="onMouseLeave",Vt="onMouseEnter",S="mouse",(e==="pointerout"||e==="pointerover")&&(ze=p5,O="onPointerLeave",Vt="onPointerEnter",S="pointer"),bn=Y==null?C:be(Y),M=ve==null?C:be(ve),C=new ze(O,S+"leave",Y,n,L),C.target=bn,C.relatedTarget=M,O=null,K(L)===p&&(ze=new ze(Vt,S+"enter",ve,n,L),ze.target=M,ze.relatedTarget=bn,O=ze),bn=O,Y&&ve)t:{for(ze=ux,Vt=Y,S=ve,M=0,O=Vt;O;O=ze(O))M++;O=0;for(var P=S;P;P=ze(P))O++;for(;0<M-O;)Vt=ze(Vt),M--;for(;0<O-M;)S=ze(S),O--;for(;M--;){if(Vt===S||S!==null&&Vt===S.alternate){ze=Vt;break t}Vt=ze(Vt),S=ze(S)}ze=null}else ze=null;Y!==null&&P1(N,C,Y,ze,!1),ve!==null&&bn!==null&&P1(N,bn,ve,ze,!0)}}e:{if(C=p?be(p):window,Y=C.nodeName&&C.nodeName.toLowerCase(),Y==="select"||Y==="input"&&C.type==="file")var Re=ys;else if(gs(C))if(w5)Re=vs;else{Re=bs;var yt=zd}else Y=C.nodeName,!Y||Y.toLowerCase()!=="input"||C.type!=="checkbox"&&C.type!=="radio"?p&&zl(p.elementType)&&(Re=ys):Re=kr;if(Re&&(Re=Re(e,p))){qc(N,Re,n,L);break e}yt&&yt(e,C,p),e==="focusout"&&p&&C.type==="number"&&p.memoizedProps.value!=null&&br(C,"number",C.value)}switch(yt=p?be(p):window,e){case"focusin":(gs(yt)||yt.contentEditable==="true")&&(Js=yt,cm=p,Lu=null);break;case"focusout":Lu=cm=Js=null;break;case"mousedown":um=!0;break;case"contextmenu":case"mouseup":case"dragend":um=!1,Oi(N,n,L);break;case"selectionchange":if(Jw)break;case"keydown":case"keyup":Oi(N,n,L)}var Ke;if(sm)e:{switch(e){case"compositionstart":var Qe="onCompositionStart";break e;case"compositionend":Qe="onCompositionEnd";break e;case"compositionupdate":Qe="onCompositionUpdate";break e}Qe=void 0}else Fs?Xc(e,n)&&(Qe="onCompositionEnd"):e==="keydown"&&n.keyCode===g5&&(Qe="onCompositionStart");Qe&&(y5&&n.locale!=="ko"&&(Fs||Qe!=="onCompositionStart"?Qe==="onCompositionEnd"&&Fs&&(Ke=Ic()):(Gi=L,lm="value"in Gi?Gi.value:Gi.textContent,Fs=!0)),yt=bf(p,Qe),0<yt.length&&(Qe=new m5(Qe,e,null,n,L),N.push({event:Qe,listeners:yt}),Ke?Qe.data=Ke:(Ke=ll(n),Ke!==null&&(Qe.data=Ke)))),(Ke=Pw?Ga(e,n):Mn(e,n))&&(Qe=bf(p,"onBeforeInput"),0<Qe.length&&(yt=new Lw("onBeforeInput","beforeinput",null,n,L),N.push({event:yt,listeners:Qe}),yt.data=Ke)),cx(N,e,p,n,L)}G1(N,t)})}function pu(e,t,n){return{instance:e,listener:t,currentTarget:n}}function bf(e,t){for(var n=t+"Capture",o=[];e!==null;){var l=e,a=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||a===null||(l=Ri(e,n),l!=null&&o.unshift(pu(e,l,a)),l=Ri(e,t),l!=null&&o.push(pu(e,l,a))),e.tag===3)return o;e=e.return}return[]}function ux(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function P1(e,t,n,o,l){for(var a=t._reactName,r=[];n!==null&&n!==o;){var c=n,d=c.alternate,p=c.stateNode;if(c=c.tag,d!==null&&d===o)break;c!==5&&c!==26&&c!==27||p===null||(d=p,l?(p=Ri(n,a),p!=null&&r.unshift(pu(n,p,d))):l||(p=Ri(n,a),p!=null&&r.push(pu(n,p,d)))),n=n.return}r.length!==0&&e.push({event:t,listeners:r})}function b0(e,t){Ll(e,t),e!=="input"&&e!=="textarea"&&e!=="select"||t==null||t.value!==null||f5||(f5=!0,e==="select"&&t.multiple?console.error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.",e):console.error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.",e));var n={registrationNameDependencies:$r,possibleRegistrationNames:K0};zl(e)||typeof t.is=="string"||n_(e,t,n),t.contentEditable&&!t.suppressContentEditableWarning&&t.children!=null&&console.error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.")}function yo(e,t,n,o){t!==n&&(n=Yi(n),Yi(t)!==n&&(o[e]=t))}function dx(e,t,n){t.forEach(function(o){n[K1(o)]=o==="style"?x0(e):e.getAttribute(o)})}function Da(e,t){t===!1?console.error("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.",e,e,e):console.error("Expected `%s` listener to be a function, instead got a value of `%s` type.",e,typeof t)}function F1(e,t){return e=e.namespaceURI===Bf||e.namespaceURI===Ws?e.ownerDocument.createElementNS(e.namespaceURI,e.tagName):e.ownerDocument.createElement(e.tagName),e.innerHTML=t,e.innerHTML}function Yi(e){return fo(e)&&(console.error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.",Yn(e)),sn(e)),(typeof e=="string"?e:""+e).replace(C4,`
`).replace(k4,"")}function J1(e,t){return t=Yi(t),Yi(e)===t}function fn(e,t,n,o,l,a){switch(n){case"children":typeof o=="string"?(Hc(o,t,!1),t==="body"||t==="textarea"&&o===""||ms(e,o)):(typeof o=="number"||typeof o=="bigint")&&(Hc(""+o,t,!1),t!=="body"&&ms(e,""+o));break;case"className":Nn(e,"class",o);break;case"tabIndex":Nn(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Nn(e,n,o);break;case"style":jc(e,o,a);break;case"data":if(t!=="object"){Nn(e,"data",o);break}case"src":case"href":if(o===""&&(t!=="a"||n!=="href")){console.error(n==="src"?'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.':'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',n,n),e.removeAttribute(n);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(n);break}Qt(o,n),o=xr(""+o),e.setAttribute(n,o);break;case"action":case"formAction":if(o!=null&&(t==="form"?n==="formAction"?console.error("You can only pass the formAction prop to <input> or <button>. Use the action prop on <form>."):typeof o=="function"&&(l.encType==null&&l.method==null||kh||(kh=!0,console.error("Cannot specify a encType or method for a form that specifies a function as the action. React provides those automatically. They will get overridden.")),l.target==null||Ch||(Ch=!0,console.error("Cannot specify a target for a form that specifies a function as the action. The function will always be executed in the same window."))):t==="input"||t==="button"?n==="action"?console.error("You can only pass the action prop to <form>. Use the formAction prop on <input> or <button>."):t!=="input"||l.type==="submit"||l.type==="image"||Sh?t!=="button"||l.type==null||l.type==="submit"||Sh?typeof o=="function"&&(l.name==null||F2||(F2=!0,console.error('Cannot specify a "name" prop for a button that specifies a function as a formAction. React needs it to encode which action should be invoked. It will get overridden.')),l.formEncType==null&&l.formMethod==null||kh||(kh=!0,console.error("Cannot specify a formEncType or formMethod for a button that specifies a function as a formAction. React provides those automatically. They will get overridden.")),l.formTarget==null||Ch||(Ch=!0,console.error("Cannot specify a formTarget for a button that specifies a function as a formAction. The function will always be executed in the same window."))):(Sh=!0,console.error('A button can only specify a formAction along with type="submit" or no type.')):(Sh=!0,console.error('An input can only specify a formAction along with type="submit" or type="image".')):console.error(n==="action"?"You can only pass the action prop to <form>.":"You can only pass the formAction prop to <input> or <button>.")),typeof o=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof a=="function"&&(n==="formAction"?(t!=="input"&&fn(e,t,"name",l.name,l,null),fn(e,t,"formEncType",l.formEncType,l,null),fn(e,t,"formMethod",l.formMethod,l,null),fn(e,t,"formTarget",l.formTarget,l,null)):(fn(e,t,"encType",l.encType,l,null),fn(e,t,"method",l.method,l,null),fn(e,t,"target",l.target,l,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(n);break}Qt(o,n),o=xr(""+o),e.setAttribute(n,o);break;case"onClick":o!=null&&(typeof o!="function"&&Da(n,o),e.onclick=na);break;case"onScroll":o!=null&&(typeof o!="function"&&Da(n,o),qt("scroll",e));break;case"onScrollEnd":o!=null&&(typeof o!="function"&&Da(n,o),qt("scrollend",e));break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");if(n=o.__html,n!=null){if(l.children!=null)throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");e.innerHTML=n}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}Qt(o,n),n=xr(""+o),e.setAttributeNS(Kr,"xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?(Qt(o,n),e.setAttribute(n,""+o)):e.removeAttribute(n);break;case"inert":o!==""||Eh[n]||(Eh[n]=!0,console.error("Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",n));case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":o===!0?e.setAttribute(n,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?(Qt(o,n),e.setAttribute(n,o)):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?(Qt(o,n),e.setAttribute(n,o)):e.removeAttribute(n);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(n):(Qt(o,n),e.setAttribute(n,o));break;case"popover":qt("beforetoggle",e),qt("toggle",e),Kt(e,"popover",o);break;case"xlinkActuate":Xn(e,Kr,"xlink:actuate",o);break;case"xlinkArcrole":Xn(e,Kr,"xlink:arcrole",o);break;case"xlinkRole":Xn(e,Kr,"xlink:role",o);break;case"xlinkShow":Xn(e,Kr,"xlink:show",o);break;case"xlinkTitle":Xn(e,Kr,"xlink:title",o);break;case"xlinkType":Xn(e,Kr,"xlink:type",o);break;case"xmlBase":Xn(e,op,"xml:base",o);break;case"xmlLang":Xn(e,op,"xml:lang",o);break;case"xmlSpace":Xn(e,op,"xml:space",o);break;case"is":a!=null&&console.error('Cannot update the "is" prop after it has been initialized.'),Kt(e,"is",o);break;case"innerText":case"textContent":break;case"popoverTarget":J2||o==null||typeof o!="object"||(J2=!0,console.error("The `popoverTarget` prop expects the ID of an Element as a string. Received %s instead.",o));default:!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N"?(n=Bn(n),Kt(e,n,o)):$r.hasOwnProperty(n)&&o!=null&&typeof o!="function"&&Da(n,o)}}function v0(e,t,n,o,l,a){switch(n){case"style":jc(e,o,a);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");if(n=o.__html,n!=null){if(l.children!=null)throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");e.innerHTML=n}}break;case"children":typeof o=="string"?ms(e,o):(typeof o=="number"||typeof o=="bigint")&&ms(e,""+o);break;case"onScroll":o!=null&&(typeof o!="function"&&Da(n,o),qt("scroll",e));break;case"onScrollEnd":o!=null&&(typeof o!="function"&&Da(n,o),qt("scrollend",e));break;case"onClick":o!=null&&(typeof o!="function"&&Da(n,o),e.onclick=na);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if($r.hasOwnProperty(n))o!=null&&typeof o!="function"&&Da(n,o);else e:{if(n[0]==="o"&&n[1]==="n"&&(l=n.endsWith("Capture"),t=n.slice(2,l?n.length-7:void 0),a=e[Vo]||null,a=a!=null?a[n]:null,typeof a=="function"&&e.removeEventListener(t,a,l),typeof o=="function")){typeof a!="function"&&a!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,o,l);break e}n in e?e[n]=o:o===!0?e.setAttribute(n,""):Kt(e,n,o)}}}function Ro(e,t,n){switch(b0(t,n),t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":qt("error",e),qt("load",e);var o=!1,l=!1,a;for(a in n)if(n.hasOwnProperty(a)){var r=n[a];if(r!=null)switch(a){case"src":o=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(t+" is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");default:fn(e,t,a,r,n,null)}}l&&fn(e,t,"srcSet",n.srcSet,n,null),o&&fn(e,t,"src",n.src,n,null);return;case"input":st("input",n),qt("invalid",e);var c=a=r=l=null,d=null,p=null;for(o in n)if(n.hasOwnProperty(o)){var L=n[o];if(L!=null)switch(o){case"name":l=L;break;case"type":r=L;break;case"checked":d=L;break;case"defaultChecked":p=L;break;case"value":a=L;break;case"defaultValue":c=L;break;case"children":case"dangerouslySetInnerHTML":if(L!=null)throw Error(t+" is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");break;default:fn(e,t,o,L,n,null)}}Md(e,n),Uo(e,a,c,d,p,r,l,!1);return;case"select":st("select",n),qt("invalid",e),o=r=a=null;for(l in n)if(n.hasOwnProperty(l)&&(c=n[l],c!=null))switch(l){case"value":a=c;break;case"defaultValue":r=c;break;case"multiple":o=c;default:fn(e,t,l,c,n,null)}zc(e,n),t=a,n=r,e.multiple=!!o,t!=null?Mi(e,!!o,t,!1):n!=null&&Mi(e,!!o,n,!0);return;case"textarea":st("textarea",n),qt("invalid",e),a=l=o=null;for(r in n)if(n.hasOwnProperty(r)&&(c=n[r],c!=null))switch(r){case"value":o=c;break;case"defaultValue":l=c;break;case"children":a=c;break;case"dangerouslySetInnerHTML":if(c!=null)throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");break;default:fn(e,t,r,c,n,null)}Td(e,n),Dd(e,o,l,a);return;case"option":ds(e,n);for(d in n)n.hasOwnProperty(d)&&(o=n[d],o!=null)&&(d==="selected"?e.selected=o&&typeof o!="function"&&typeof o!="symbol":fn(e,t,d,o,n,null));return;case"dialog":qt("beforetoggle",e),qt("toggle",e),qt("cancel",e),qt("close",e);break;case"iframe":case"object":qt("load",e);break;case"video":case"audio":for(o=0;o<ud.length;o++)qt(ud[o],e);break;case"image":qt("error",e),qt("load",e);break;case"details":qt("toggle",e);break;case"embed":case"source":case"link":qt("error",e),qt("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(p in n)if(n.hasOwnProperty(p)&&(o=n[p],o!=null))switch(p){case"children":case"dangerouslySetInnerHTML":throw Error(t+" is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");default:fn(e,t,p,o,n,null)}return;default:if(zl(t)){for(L in n)n.hasOwnProperty(L)&&(o=n[L],o!==void 0&&v0(e,t,L,o,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(o=n[c],o!=null&&fn(e,t,c,o,n,null))}function fx(e,t,n,o){switch(b0(t,o),t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,a=null,r=null,c=null,d=null,p=null,L=null;for(Y in n){var N=n[Y];if(n.hasOwnProperty(Y)&&N!=null)switch(Y){case"checked":break;case"value":break;case"defaultValue":d=N;default:o.hasOwnProperty(Y)||fn(e,t,Y,null,o,N)}}for(var C in o){var Y=o[C];if(N=n[C],o.hasOwnProperty(C)&&(Y!=null||N!=null))switch(C){case"type":a=Y;break;case"name":l=Y;break;case"checked":p=Y;break;case"defaultChecked":L=Y;break;case"value":r=Y;break;case"defaultValue":c=Y;break;case"children":case"dangerouslySetInnerHTML":if(Y!=null)throw Error(t+" is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");break;default:Y!==N&&fn(e,t,C,Y,o,N)}}t=n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null,o=o.type==="checkbox"||o.type==="radio"?o.checked!=null:o.value!=null,t||!o||P2||(console.error("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"),P2=!0),!t||o||Z2||(console.error("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"),Z2=!0),ft(e,r,c,d,p,L,a,l);return;case"select":Y=r=c=C=null;for(a in n)if(d=n[a],n.hasOwnProperty(a)&&d!=null)switch(a){case"value":break;case"multiple":Y=d;default:o.hasOwnProperty(a)||fn(e,t,a,null,o,d)}for(l in o)if(a=o[l],d=n[l],o.hasOwnProperty(l)&&(a!=null||d!=null))switch(l){case"value":C=a;break;case"defaultValue":c=a;break;case"multiple":r=a;default:a!==d&&fn(e,t,l,a,o,d)}o=c,t=r,n=Y,C!=null?Mi(e,!!t,C,!1):!!n!=!!t&&(o!=null?Mi(e,!!t,o,!0):Mi(e,!!t,t?[]:"",!1));return;case"textarea":Y=C=null;for(c in n)if(l=n[c],n.hasOwnProperty(c)&&l!=null&&!o.hasOwnProperty(c))switch(c){case"value":break;case"children":break;default:fn(e,t,c,null,o,l)}for(r in o)if(l=o[r],a=n[r],o.hasOwnProperty(r)&&(l!=null||a!=null))switch(r){case"value":C=l;break;case"defaultValue":Y=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");break;default:l!==a&&fn(e,t,r,l,o,a)}Rd(e,C,Y);return;case"option":for(var ve in n)C=n[ve],n.hasOwnProperty(ve)&&C!=null&&!o.hasOwnProperty(ve)&&(ve==="selected"?e.selected=!1:fn(e,t,ve,null,o,C));for(d in o)C=o[d],Y=n[d],o.hasOwnProperty(d)&&C!==Y&&(C!=null||Y!=null)&&(d==="selected"?e.selected=C&&typeof C!="function"&&typeof C!="symbol":fn(e,t,d,C,o,Y));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ze in n)C=n[ze],n.hasOwnProperty(ze)&&C!=null&&!o.hasOwnProperty(ze)&&fn(e,t,ze,null,o,C);for(p in o)if(C=o[p],Y=n[p],o.hasOwnProperty(p)&&C!==Y&&(C!=null||Y!=null))switch(p){case"children":case"dangerouslySetInnerHTML":if(C!=null)throw Error(t+" is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");break;default:fn(e,t,p,C,o,Y)}return;default:if(zl(t)){for(var bn in n)C=n[bn],n.hasOwnProperty(bn)&&C!==void 0&&!o.hasOwnProperty(bn)&&v0(e,t,bn,void 0,o,C);for(L in o)C=o[L],Y=n[L],!o.hasOwnProperty(L)||C===Y||C===void 0&&Y===void 0||v0(e,t,L,C,o,Y);return}}for(var Vt in n)C=n[Vt],n.hasOwnProperty(Vt)&&C!=null&&!o.hasOwnProperty(Vt)&&fn(e,t,Vt,null,o,C);for(N in o)C=o[N],Y=n[N],!o.hasOwnProperty(N)||C===Y||C==null&&Y==null||fn(e,t,N,C,o,Y)}function K1(e){switch(e){case"class":return"className";case"for":return"htmlFor";default:return e}}function x0(e){var t={};e=e.style;for(var n=0;n<e.length;n++){var o=e[n];t[o]=e.getPropertyValue(o)}return t}function ey(e,t,n){if(t!=null&&typeof t!="object")console.error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");else{var o,l=o="",a;for(a in t)if(t.hasOwnProperty(a)){var r=t[a];r!=null&&typeof r!="boolean"&&r!==""&&(a.indexOf("--")===0?(So(r,a),o+=l+a+":"+(""+r).trim()):typeof r!="number"||r===0||u5.has(a)?(So(r,a),o+=l+a.replace(a5,"-$1").toLowerCase().replace(i5,"-ms-")+":"+(""+r).trim()):o+=l+a.replace(a5,"-$1").toLowerCase().replace(i5,"-ms-")+":"+r+"px",l=";")}o=o||null,t=e.getAttribute("style"),t!==o&&(o=Yi(o),Yi(t)!==o&&(n.style=x0(e)))}}function Il(e,t,n,o,l,a){if(l.delete(n),e=e.getAttribute(n),e===null)switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":return}else if(o!=null)switch(typeof o){case"function":case"symbol":case"boolean":break;default:if(Qt(o,t),e===""+o)return}yo(t,e,o,a)}function ty(e,t,n,o,l,a){if(l.delete(n),e=e.getAttribute(n),e===null){switch(typeof o){case"function":case"symbol":return}if(!o)return}else switch(typeof o){case"function":case"symbol":break;default:if(o)return}yo(t,e,o,a)}function w0(e,t,n,o,l,a){if(l.delete(n),e=e.getAttribute(n),e===null)switch(typeof o){case"undefined":case"function":case"symbol":return}else if(o!=null)switch(typeof o){case"function":case"symbol":break;default:if(Qt(o,n),e===""+o)return}yo(t,e,o,a)}function ny(e,t,n,o,l,a){if(l.delete(n),e=e.getAttribute(n),e===null)switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":return;default:if(isNaN(o))return}else if(o!=null)switch(typeof o){case"function":case"symbol":case"boolean":break;default:if(!isNaN(o)&&(Qt(o,t),e===""+o))return}yo(t,e,o,a)}function S0(e,t,n,o,l,a){if(l.delete(n),e=e.getAttribute(n),e===null)switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":return}else if(o!=null)switch(typeof o){case"function":case"symbol":case"boolean":break;default:if(Qt(o,t),n=xr(""+o),e===n)return}yo(t,e,o,a)}function oy(e,t,n,o){for(var l={},a=new Set,r=e.attributes,c=0;c<r.length;c++)switch(r[c].name.toLowerCase()){case"value":break;case"checked":break;case"selected":break;default:a.add(r[c].name)}if(zl(t)){for(var d in n)if(n.hasOwnProperty(d)){var p=n[d];if(p!=null){if($r.hasOwnProperty(d))typeof p!="function"&&Da(d,p);else if(n.suppressHydrationWarning!==!0)switch(d){case"children":typeof p!="string"&&typeof p!="number"||yo("children",e.textContent,p,l);continue;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":continue;case"dangerouslySetInnerHTML":r=e.innerHTML,p=p?p.__html:void 0,p!=null&&(p=F1(e,p),yo(d,r,p,l));continue;case"style":a.delete(d),ey(e,p,l);continue;case"offsetParent":case"offsetTop":case"offsetLeft":case"offsetWidth":case"offsetHeight":case"isContentEditable":case"outerText":case"outerHTML":a.delete(d.toLowerCase()),console.error("Assignment to read-only property will result in a no-op: `%s`",d);continue;case"className":a.delete("class"),r=ct(e,"class",p),yo("className",r,p,l);continue;default:o.context===Si&&t!=="svg"&&t!=="math"?a.delete(d.toLowerCase()):a.delete(d),r=ct(e,d,p),yo(d,r,p,l)}}}}else for(p in n)if(n.hasOwnProperty(p)&&(d=n[p],d!=null)){if($r.hasOwnProperty(p))typeof d!="function"&&Da(p,d);else if(n.suppressHydrationWarning!==!0)switch(p){case"children":typeof d!="string"&&typeof d!="number"||yo("children",e.textContent,d,l);continue;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"value":case"checked":case"selected":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":continue;case"dangerouslySetInnerHTML":r=e.innerHTML,d=d?d.__html:void 0,d!=null&&(d=F1(e,d),r!==d&&(l[p]={__html:r}));continue;case"className":Il(e,p,"class",d,a,l);continue;case"tabIndex":Il(e,p,"tabindex",d,a,l);continue;case"style":a.delete(p),ey(e,d,l);continue;case"multiple":a.delete(p),yo(p,e.multiple,d,l);continue;case"muted":a.delete(p),yo(p,e.muted,d,l);continue;case"autoFocus":a.delete("autofocus"),yo(p,e.autofocus,d,l);continue;case"data":if(t!=="object"){a.delete(p),r=e.getAttribute("data"),yo(p,r,d,l);continue}case"src":case"href":if(!(d!==""||t==="a"&&p==="href"||t==="object"&&p==="data")){console.error(p==="src"?'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.':'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',p,p);continue}S0(e,p,p,d,a,l);continue;case"action":case"formAction":if(r=e.getAttribute(p),typeof d=="function"){a.delete(p.toLowerCase()),p==="formAction"?(a.delete("name"),a.delete("formenctype"),a.delete("formmethod"),a.delete("formtarget")):(a.delete("enctype"),a.delete("method"),a.delete("target"));continue}else if(r===E4){a.delete(p.toLowerCase()),yo(p,"function",d,l);continue}S0(e,p,p.toLowerCase(),d,a,l);continue;case"xlinkHref":S0(e,p,"xlink:href",d,a,l);continue;case"contentEditable":w0(e,p,"contenteditable",d,a,l);continue;case"spellCheck":w0(e,p,"spellcheck",d,a,l);continue;case"draggable":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":w0(e,p,p,d,a,l);continue;case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":ty(e,p,p.toLowerCase(),d,a,l);continue;case"capture":case"download":e:{c=e;var L=r=p,N=l;if(a.delete(L),c=c.getAttribute(L),c===null)switch(typeof d){case"undefined":case"function":case"symbol":break e;default:if(d===!1)break e}else if(d!=null)switch(typeof d){case"function":case"symbol":break;case"boolean":if(d===!0&&c==="")break e;break;default:if(Qt(d,r),c===""+d)break e}yo(r,c,d,N)}continue;case"cols":case"rows":case"size":case"span":e:{if(c=e,L=r=p,N=l,a.delete(L),c=c.getAttribute(L),c===null)switch(typeof d){case"undefined":case"function":case"symbol":case"boolean":break e;default:if(isNaN(d)||1>d)break e}else if(d!=null)switch(typeof d){case"function":case"symbol":case"boolean":break;default:if(!(isNaN(d)||1>d)&&(Qt(d,r),c===""+d))break e}yo(r,c,d,N)}continue;case"rowSpan":ny(e,p,"rowspan",d,a,l);continue;case"start":ny(e,p,p,d,a,l);continue;case"xHeight":Il(e,p,"x-height",d,a,l);continue;case"xlinkActuate":Il(e,p,"xlink:actuate",d,a,l);continue;case"xlinkArcrole":Il(e,p,"xlink:arcrole",d,a,l);continue;case"xlinkRole":Il(e,p,"xlink:role",d,a,l);continue;case"xlinkShow":Il(e,p,"xlink:show",d,a,l);continue;case"xlinkTitle":Il(e,p,"xlink:title",d,a,l);continue;case"xlinkType":Il(e,p,"xlink:type",d,a,l);continue;case"xmlBase":Il(e,p,"xml:base",d,a,l);continue;case"xmlLang":Il(e,p,"xml:lang",d,a,l);continue;case"xmlSpace":Il(e,p,"xml:space",d,a,l);continue;case"inert":d!==""||Eh[p]||(Eh[p]=!0,console.error("Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",p)),ty(e,p,p,d,a,l);continue;default:if(!(2<p.length)||p[0]!=="o"&&p[0]!=="O"||p[1]!=="n"&&p[1]!=="N"){c=Bn(p),r=!1,o.context===Si&&t!=="svg"&&t!=="math"?a.delete(c.toLowerCase()):(L=p.toLowerCase(),L=Hf.hasOwnProperty(L)&&Hf[L]||null,L!==null&&L!==p&&(r=!0,a.delete(L)),a.delete(c));e:if(L=e,N=c,c=d,Ht(N))if(L.hasAttribute(N))L=L.getAttribute(N),Qt(c,N),c=L===""+c?c:L;else{switch(typeof c){case"function":case"symbol":break e;case"boolean":if(L=N.toLowerCase().slice(0,5),L!=="data-"&&L!=="aria-")break e}c=c===void 0?void 0:null}else c=void 0;r||yo(p,c,d,l)}}}return 0<a.size&&n.suppressHydrationWarning!==!0&&dx(e,a,l),Object.keys(l).length===0?null:l}function hx(e,t){switch(e.length){case 0:return"";case 1:return e[0];case 2:return e[0]+" "+t+" "+e[1];default:return e.slice(0,-1).join(", ")+", "+t+" "+e[e.length-1]}}function ly(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function _x(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),o=0;o<n.length;o++){var l=n[o],a=l.transferSize,r=l.initiatorType,c=l.duration;if(a&&c&&ly(r)){for(r=0,c=l.responseEnd,o+=1;o<n.length;o++){var d=n[o],p=d.startTime;if(p>c)break;var L=d.transferSize,N=d.initiatorType;L&&ly(N)&&(d=d.responseEnd,r+=L*(d<c?1:(c-p)/(d-p)))}if(--o,t+=8*(a+r)/(l.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}function vf(e){return e.nodeType===9?e:e.ownerDocument}function ay(e){switch(e){case Ws:return Sc;case Bf:return Th;default:return Si}}function iy(e,t){if(e===Si)switch(t){case"svg":return Sc;case"math":return Th;default:return Si}return e===Sc&&t==="foreignObject"?Si:e}function C0(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}function mx(){var e=window.event;return e&&e.type==="popstate"?e===rp?!1:(rp=e,!0):(rp=null,!1)}function gu(){var e=window.event;return e&&e!==hd?e.type:null}function yu(){var e=window.event;return e&&e!==hd?e.timeStamp:-1.1}function px(e){setTimeout(function(){throw e})}function gx(e,t,n){switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&e.focus();break;case"img":n.src?e.src=n.src:n.srcSet&&(e.srcset=n.srcSet)}}function yx(){}function bx(e,t,n,o){fx(e,t,n,o),e[Vo]=o}function ry(e){ms(e,"")}function vx(e,t,n){e.nodeValue=n}function sy(e){if(!e.__reactWarnedAboutChildrenConflict){var t=e[Vo]||null;if(t!==null){var n=Ae(e);n!==null&&(typeof t.children=="string"||typeof t.children=="number"?(e.__reactWarnedAboutChildrenConflict=!0,xe(n,function(){console.error('Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets "children" text content using React. It should be a leaf with no children. Otherwise it\'s ambiguous which children should be used.')})):t.dangerouslySetInnerHTML!=null&&(e.__reactWarnedAboutChildrenConflict=!0,xe(n,function(){console.error('Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets "dangerouslySetInnerHTML" using React. It should be a leaf with no children. Otherwise it\'s ambiguous which children should be used.')})))}}}function Xi(e){return e==="head"}function xx(e,t){e.removeChild(t)}function wx(e,t){(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e).removeChild(t)}function cy(e,t){var n=t,o=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n===fd||n===Mh){if(o===0){e.removeChild(l),Is(t);return}o--}else if(n===dd||n===hr||n===ts||n===wc||n===es)o++;else if(n===T4)bu(e.ownerDocument.documentElement);else if(n===D4){n=e.ownerDocument.head,bu(n);for(var a=n.firstChild;a;){var r=a.nextSibling,c=a.nodeName;a[Eu]||c==="SCRIPT"||c==="STYLE"||c==="LINK"&&a.rel.toLowerCase()==="stylesheet"||n.removeChild(a),a=r}}else n===R4&&bu(e.ownerDocument.body);n=l}while(n);Is(t)}function uy(e,t){var n=e;e=0;do{var o=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),o&&o.nodeType===8)if(n=o.data,n===fd){if(e===0)break;e--}else n!==dd&&n!==hr&&n!==ts&&n!==wc||e++;n=o}while(n)}function Sx(e){uy(e,!0)}function Cx(e){e=e.style,typeof e.setProperty=="function"?e.setProperty("display","none","important"):e.display="none"}function kx(e){e.nodeValue=""}function Ex(e){uy(e,!1)}function Mx(e,t){t=t[A4],t=t!=null&&t.hasOwnProperty("display")?t.display:null,e.style.display=t==null||typeof t=="boolean"?"":(""+t).trim()}function Tx(e,t){e.nodeValue=t}function k0(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":k0(n),se(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function Rx(e,t,n,o){for(;e.nodeType===1;){var l=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[Eu])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(a=e.getAttribute("rel"),a==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(a!==l.rel||e.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||e.getAttribute("title")!==(l.title==null?null:l.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(a=e.getAttribute("src"),(a!==(l.src==null?null:l.src)||e.getAttribute("type")!==(l.type==null?null:l.type)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&a&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){Qt(l.name,"name");var a=l.name==null?null:""+l.name;if(l.type==="hidden"&&e.getAttribute("name")===a)return e}else return e;if(e=xl(e.nextSibling),e===null)break}return null}function Dx(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=xl(e.nextSibling),e===null))return null;return e}function dy(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=xl(e.nextSibling),e===null))return null;return e}function E0(e){return e.data===hr||e.data===ts}function M0(e){return e.data===wc||e.data===hr&&e.ownerDocument.readyState!==eb}function Ax(e,t){var n=e.ownerDocument;if(e.data===ts)e._reactRetry=t;else if(e.data!==hr||n.readyState!==eb)t();else{var o=function(){t(),n.removeEventListener("DOMContentLoaded",o)};n.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function xl(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===dd||t===wc||t===hr||t===ts||t===es||t===lp||t===K2)break;if(t===fd||t===Mh)return null}}return e}function fy(e){if(e.nodeType===1){for(var t=e.nodeName.toLowerCase(),n={},o=e.attributes,l=0;l<o.length;l++){var a=o[l];n[K1(a.name)]=a.name.toLowerCase()==="style"?x0(e):a.value}return{type:t,props:n}}return e.nodeType===8?e.data===es?{type:"Activity",props:{}}:{type:"Suspense",props:{}}:e.nodeValue}function hy(e,t,n){return n===null||n[M4]!==!0?(e.nodeValue===t?e=null:(t=Yi(t),e=Yi(e.nodeValue)===t?null:e.nodeValue),e):null}function T0(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===fd||n===Mh){if(t===0)return xl(e.nextSibling);t--}else n!==dd&&n!==wc&&n!==hr&&n!==ts&&n!==es||t++}e=e.nextSibling}return null}function _y(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===dd||n===wc||n===hr||n===ts||n===es){if(t===0)return e;t--}else n!==fd&&n!==Mh||t++}e=e.previousSibling}return null}function Ox(e){Is(e)}function zx(e){Is(e)}function Lx(e){Is(e)}function my(e,t,n,o,l){switch(l&&Ad(e,o.ancestorInfo),t=vf(n),e){case"html":if(e=t.documentElement,!e)throw Error("React expected an <html> element (document.documentElement) to exist in the Document but one was not found. React never removes the documentElement for any Document it renders into so the cause is likely in some other script running on this page.");return e;case"head":if(e=t.head,!e)throw Error("React expected a <head> element (document.head) to exist in the Document but one was not found. React never removes the head for any Document it renders into so the cause is likely in some other script running on this page.");return e;case"body":if(e=t.body,!e)throw Error("React expected a <body> element (document.body) to exist in the Document but one was not found. React never removes the body for any Document it renders into so the cause is likely in some other script running on this page.");return e;default:throw Error("resolveSingletonInstance was called with an element type that is not supported. This is a bug in React.")}}function Nx(e,t,n,o){if(!n[Wi]&&Ae(n)){var l=n.tagName.toLowerCase();console.error("You are mounting a new %s component when a previous one has not first unmounted. It is an error to render more than one %s component at a time and attributes and children of these components will likely fail in unpredictable ways. Please only render a single instance of <%s> and if you need to mount a new one, ensure any previous ones have unmounted first.",l,l,l)}switch(e){case"html":case"head":case"body":break;default:console.error("acquireSingletonInstance was called with an element type that is not supported. This is a bug in React.")}for(l=n.attributes;l.length;)n.removeAttributeNode(l[0]);Ro(n,e,t),n[Do]=o,n[Vo]=t}function bu(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);se(e)}function xf(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}function py(e,t,n){var o=Cc;if(o&&typeof t=="string"&&t){var l=ko(t);l='link[rel="'+e+'"][href="'+l+'"]',typeof n=="string"&&(l+='[crossorigin="'+n+'"]'),ib.has(l)||(ib.add(l),e={rel:e,crossOrigin:n,href:t},o.querySelector(l)===null&&(t=o.createElement("link"),Ro(t,"link",e),ae(t),o.head.appendChild(t)))}}function gy(e,t,n,o){var l=(l=Vi.current)?xf(l):null;if(!l)throw Error('"resourceRoot" was expected to exist. This is a bug in React.');switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(n=Us(n.href),t=Te(l).hoistableStyles,o=t.get(n),o||(o={type:"style",instance:null,count:0,state:null},t.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=Us(n.href);var a=Te(l).hoistableStyles,r=a.get(e);if(!r&&(l=l.ownerDocument||l,r={type:"stylesheet",instance:null,count:0,state:{loading:os,preload:null}},a.set(e,r),(a=l.querySelector(vu(e)))&&!a._p&&(r.instance=a,r.state.loading=_d|Jl),!Kl.has(e))){var c={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy};Kl.set(e,c),a||$x(l,e,c,r.state)}if(t&&o===null)throw n=`

  - `+wf(t)+`
  + `+wf(n),Error("Expected <link> not to update to be updated to a stylesheet with precedence. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key."+n);return r}if(t&&o!==null)throw n=`

  - `+wf(t)+`
  + `+wf(n),Error("Expected stylesheet with precedence to not be updated to a different kind of <link>. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key."+n);return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(n=js(n),t=Te(l).hoistableScripts,o=t.get(n),o||(o={type:"script",instance:null,count:0,state:null},t.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error('getResource encountered a type it did not expect: "'+e+'". this is a bug in React.')}}function wf(e){var t=0,n="<link";return typeof e.rel=="string"?(t++,n+=' rel="'+e.rel+'"'):aa.call(e,"rel")&&(t++,n+=' rel="'+(e.rel===null?"null":"invalid type "+typeof e.rel)+'"'),typeof e.href=="string"?(t++,n+=' href="'+e.href+'"'):aa.call(e,"href")&&(t++,n+=' href="'+(e.href===null?"null":"invalid type "+typeof e.href)+'"'),typeof e.precedence=="string"?(t++,n+=' precedence="'+e.precedence+'"'):aa.call(e,"precedence")&&(t++,n+=" precedence={"+(e.precedence===null?"null":"invalid type "+typeof e.precedence)+"}"),Object.getOwnPropertyNames(e).length>t&&(n+=" ..."),n+" />"}function Us(e){return'href="'+ko(e)+'"'}function vu(e){return'link[rel="stylesheet"]['+e+"]"}function yy(e){return Lt({},e,{"data-precedence":e.precedence,precedence:null})}function $x(e,t,n,o){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?o.loading=_d:(t=e.createElement("link"),o.preload=t,t.addEventListener("load",function(){return o.loading|=_d}),t.addEventListener("error",function(){return o.loading|=lb}),Ro(t,"link",n),ae(t),e.head.appendChild(t))}function js(e){return'[src="'+ko(e)+'"]'}function xu(e){return"script[async]"+e}function by(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var o=e.querySelector('style[data-href~="'+ko(n.href)+'"]');if(o)return t.instance=o,ae(o),o;var l=Lt({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),ae(o),Ro(o,"style",l),Sf(o,n.precedence,e),t.instance=o;case"stylesheet":l=Us(n.href);var a=e.querySelector(vu(l));if(a)return t.state.loading|=Jl,t.instance=a,ae(a),a;o=yy(n),(l=Kl.get(l))&&R0(o,l),a=(e.ownerDocument||e).createElement("link"),ae(a);var r=a;return r._p=new Promise(function(c,d){r.onload=c,r.onerror=d}),Ro(a,"link",o),t.state.loading|=Jl,Sf(a,n.precedence,e),t.instance=a;case"script":return a=js(n.src),(l=e.querySelector(xu(a)))?(t.instance=l,ae(l),l):(o=n,(l=Kl.get(a))&&(o=Lt({},n),D0(o,l)),e=e.ownerDocument||e,l=e.createElement("script"),ae(l),Ro(l,"link",o),e.head.appendChild(l),t.instance=l);case"void":return null;default:throw Error('acquireResource encountered a resource type it did not expect: "'+t.type+'". this is a bug in React.')}else t.type==="stylesheet"&&(t.state.loading&Jl)===os&&(o=t.instance,t.state.loading|=Jl,Sf(o,n.precedence,e));return t.instance}function Sf(e,t,n){for(var o=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=o.length?o[o.length-1]:null,a=l,r=0;r<o.length;r++){var c=o[r];if(c.dataset.precedence===t)a=c;else if(a!==l)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function R0(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function D0(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}function vy(e,t,n){if(Rh===null){var o=new Map,l=Rh=new Map;l.set(n,o)}else l=Rh,o=l.get(n),o||(o=new Map,l.set(n,o));if(o.has(e))return o;for(o.set(e,null),n=n.getElementsByTagName(e),l=0;l<n.length;l++){var a=n[l];if(!(a[Eu]||a[Do]||e==="link"&&a.getAttribute("rel")==="stylesheet")&&a.namespaceURI!==Ws){var r=a.getAttribute(t)||"";r=e+r;var c=o.get(r);c?c.push(a):o.set(r,[a])}}return o}function xy(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function Bx(e,t,n){var o=!n.ancestorInfo.containerTagInScope;if(n.context===Sc||t.itemProp!=null)return!o||t.itemProp==null||e!=="meta"&&e!=="title"&&e!=="style"&&e!=="link"&&e!=="script"||console.error("Cannot render a <%s> outside the main document if it has an `itemProp` prop. `itemProp` suggests the tag belongs to an `itemScope` which can appear anywhere in the DOM. If you were intending for React to hoist this <%s> remove the `itemProp` prop. Otherwise, try moving this tag into the <head> or <body> of the Document.",e,e),!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href===""){o&&console.error('Cannot render a <style> outside the main document without knowing its precedence and a unique href key. React can hoist and deduplicate <style> tags if you provide a `precedence` prop along with an `href` prop that does not conflict with the `href` values used in any other hoisted <style> or <link rel="stylesheet" ...> tags.  Note that hoisting <style> tags is considered an advanced feature that most will not use directly. Consider moving the <style> tag to the <head> or consider adding a `precedence="default"` and `href="some unique resource identifier"`.');break}return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError){if(t.rel==="stylesheet"&&typeof t.precedence=="string"){e=t.href;var l=t.onError,a=t.disabled;n=[],t.onLoad&&n.push("`onLoad`"),l&&n.push("`onError`"),a!=null&&n.push("`disabled`"),l=hx(n,"and"),l+=n.length===1?" prop":" props",a=n.length===1?"an "+l:"the "+l,n.length&&console.error('React encountered a <link rel="stylesheet" href="%s" ... /> with a `precedence` prop that also included %s. The presence of loading and error handlers indicates an intent to manage the stylesheet loading state from your from your Component code and React will not hoist or deduplicate this stylesheet. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop remove the %s, otherwise remove the `precedence` prop.',e,a,l)}o&&(typeof t.rel!="string"||typeof t.href!="string"||t.href===""?console.error("Cannot render a <link> outside the main document without a `rel` and `href` prop. Try adding a `rel` and/or `href` prop to this <link> or moving the link into the <head> tag"):(t.onError||t.onLoad)&&console.error("Cannot render a <link> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."));break}return t.rel==="stylesheet"?(e=t.precedence,t=t.disabled,typeof e!="string"&&o&&console.error('Cannot render a <link rel="stylesheet" /> outside the main document without knowing its precedence. Consider adding precedence="default" or moving it into the root <head> tag.'),typeof e=="string"&&t==null):!0;case"script":if(e=t.async&&typeof t.async!="function"&&typeof t.async!="symbol",!e||t.onLoad||t.onError||!t.src||typeof t.src!="string"){o&&(e?t.onLoad||t.onError?console.error("Cannot render a <script> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."):console.error("Cannot render a <script> outside the main document without `async={true}` and a non-empty `src` prop. Ensure there is a valid `src` and either make the script async or move it into the root <head> tag or somewhere in the <body>."):console.error('Cannot render a sync or defer <script> outside the main document without knowing its order. Try adding async="" or moving it into the root <head> tag.'));break}return!0;case"noscript":case"template":o&&console.error("Cannot render <%s> outside the main document. Try moving it into the root <head> tag.",e)}return!1}function wy(e){return!(e.type==="stylesheet"&&(e.state.loading&ab)===os)}function Hx(e,t,n,o){if(n.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(n.state.loading&Jl)===os){if(n.instance===null){var l=Us(o.href),a=t.querySelector(vu(l));if(a){t=a._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Cf.bind(e),t.then(e,e)),n.state.loading|=Jl,n.instance=a,ae(a);return}a=t.ownerDocument||t,o=yy(o),(l=Kl.get(l))&&R0(o,l),a=a.createElement("link"),ae(a);var r=a;r._p=new Promise(function(c,d){r.onload=c,r.onerror=d}),Ro(a,"link",o),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&ab)===os&&(e.count++,n=Cf.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}function Ux(e,t){return e.stylesheets&&e.count===0&&kf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var o=setTimeout(function(){if(e.stylesheets&&kf(e,e.stylesheets),e.unsuspend){var a=e.unsuspend;e.unsuspend=null,a()}},L4+t);0<e.imgBytes&&cp===0&&(cp=125*_x()*$4);var l=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&kf(e,e.stylesheets),e.unsuspend)){var a=e.unsuspend;e.unsuspend=null,a()}},(e.imgBytes>cp?50:N4)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(l)}}:null}function Cf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)kf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}function kf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Dh=new Map,t.forEach(jx,e),Dh=null,Cf.call(e))}function jx(e,t){if(!(t.state.loading&Jl)){var n=Dh.get(e);if(n)var o=n.get(up);else{n=new Map,Dh.set(e,n);for(var l=e.querySelectorAll("link[data-precedence],style[data-precedence]"),a=0;a<l.length;a++){var r=l[a];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),o=r)}o&&n.set(up,o)}l=t.instance,r=l.getAttribute("data-precedence"),a=n.get(r)||o,a===o&&n.set(up,l),n.set(r,l),this.count++,o=Cf.bind(this),l.addEventListener("load",o),l.addEventListener("error",o),a?a.parentNode.insertBefore(l,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(l,e.firstChild)),t.state.loading|=Jl}}function Ix(e,t,n,o,l,a,r,c,d){for(this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=ns,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=kt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=kt(0),this.hiddenUpdates=kt(null),this.identifierPrefix=o,this.onUncaughtError=l,this.onCaughtError=a,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=d,this.incompleteTransitions=new Map,this.passiveEffectDuration=this.effectDuration=-0,this.memoizedUpdaters=new Set,e=this.pendingUpdatersLaneMap=[],t=0;31>t;t++)e.push(new Set);this._debugRootType=n?"hydrateRoot()":"createRoot()"}function Sy(e,t,n,o,l,a,r,c,d,p,L,N){return e=new Ix(e,t,n,r,d,p,L,N,c),t=r4,a===!0&&(t|=Ho|ra),t|=Tt,a=v(3,null,null,t),e.current=a,a.stateNode=e,t=Fc(),li(t),e.pooledCache=t,li(t),a.memoizedState={element:o,isDehydrated:n,cache:t},c_(a),e}function Cy(e){return e?(e=Fi,e):Fi}function A0(e,t,n,o,l,a){if(Bo&&typeof Bo.onScheduleFiberRoot=="function")try{Bo.onScheduleFiberRoot(Vs,o,n)}catch(r){La||(La=!0,console.error("React instrumentation encountered an error: %o",r))}l=Cy(l),o.context===null?o.context=l:o.pendingContext=l,za&&Sl!==null&&!ub&&(ub=!0,console.error(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`,ue(Sl)||"Unknown")),o=$i(t),o.payload={element:n},a=a===void 0?null:a,a!==null&&(typeof a!="function"&&console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.",a),o.callback=a),n=Bi(e,o,t),n!==null&&(ya(t,"root.render()",null),Hn(n,e,t),tu(n,e,t))}function ky(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function O0(e,t){ky(e,t),(e=e.alternate)&&ky(e,t)}function Ey(e){if(e.tag===13||e.tag===31){var t=to(e,67108864);t!==null&&Hn(t,e,67108864),O0(e,67108864)}}function My(e){if(e.tag===13||e.tag===31){var t=vl(e);t=Oe(t);var n=to(e,t);n!==null&&Hn(n,e,t),O0(e,t)}}function Yx(){return Sl}function Xx(e,t,n,o){var l=V.T;V.T=null;var a=nn.p;try{nn.p=Cl,z0(e,t,n,o)}finally{nn.p=a,V.T=l}}function qx(e,t,n,o){var l=V.T;V.T=null;var a=nn.p;try{nn.p=ia,z0(e,t,n,o)}finally{nn.p=a,V.T=l}}function z0(e,t,n,o){if(Oh){var l=L0(o);if(l===null)y0(e,t,o,zh,n),Ry(e,o);else if(Vx(l,e,t,n,o))o.stopPropagation();else if(Ry(e,o),t&4&&-1<H4.indexOf(e)){for(;l!==null;){var a=Ae(l);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var r=it(a.pendingLanes);if(r!==0){var c=a;for(c.pendingLanes|=2,c.entangledLanes|=2;r;){var d=1<<31-qo(r);c.entanglements[1]|=d,r&=~d}Ra(a),(Gt&(mo|Tl))===wo&&(mh=bo()+H2,mu(0,!1))}}break;case 31:case 13:c=to(a,2),c!==null&&Hn(c,a,2),$s(),O0(a,2)}if(a=L0(o),a===null&&y0(e,t,o,zh,n),a===l)break;l=a}l!==null&&o.stopPropagation()}else y0(e,t,o,null,n)}}function L0(e){return e=Mt(e),N0(e)}function N0(e){if(zh=null,e=K(e),e!==null){var t=J(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=De(t),e!==null)return e;e=null}else if(n===31){if(e=Ie(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return zh=e,null}function Ty(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return Cl;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return ia;case"message":switch(tw()){case Z0:return Cl;case P0:return ia;case qs:case nw:return $a;case F0:return Nf;default:return $a}default:return $a}}function Ry(e,t){switch(e){case"focusin":case"focusout":_r=null;break;case"dragenter":case"dragleave":mr=null;break;case"mouseover":case"mouseout":pr=null;break;case"pointerover":case"pointerout":pd.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":gd.delete(t.pointerId)}}function wu(e,t,n,o,l,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:o,nativeEvent:a,targetContainers:[l]},t!==null&&(t=Ae(t),t!==null&&Ey(t)),e):(e.eventSystemFlags|=o,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function Vx(e,t,n,o,l){switch(t){case"focusin":return _r=wu(_r,e,t,n,o,l),!0;case"dragenter":return mr=wu(mr,e,t,n,o,l),!0;case"mouseover":return pr=wu(pr,e,t,n,o,l),!0;case"pointerover":var a=l.pointerId;return pd.set(a,wu(pd.get(a)||null,e,t,n,o,l)),!0;case"gotpointercapture":return a=l.pointerId,gd.set(a,wu(gd.get(a)||null,e,t,n,o,l)),!0}return!1}function Dy(e){var t=K(e.target);if(t!==null){var n=J(t);if(n!==null){if(t=n.tag,t===13){if(t=De(n),t!==null){e.blockedOn=t,W(e.priority,function(){My(n)});return}}else if(t===31){if(t=Ie(n),t!==null){e.blockedOn=t,W(e.priority,function(){My(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ef(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=L0(e.nativeEvent);if(n===null){n=e.nativeEvent;var o=new n.constructor(n.type,n),l=o;Mu!==null&&console.error("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."),Mu=l,n.target.dispatchEvent(o),Mu===null&&console.error("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."),Mu=null}else return t=Ae(n),t!==null&&Ey(t),e.blockedOn=n,!1;t.shift()}return!0}function Ay(e,t,n){Ef(e)&&n.delete(t)}function Qx(){dp=!1,_r!==null&&Ef(_r)&&(_r=null),mr!==null&&Ef(mr)&&(mr=null),pr!==null&&Ef(pr)&&(pr=null),pd.forEach(Ay),gd.forEach(Ay)}function Mf(e,t){e.blockedOn===t&&(e.blockedOn=null,dp||(dp=!0,oo.unstable_scheduleCallback(oo.unstable_NormalPriority,Qx)))}function Oy(e){Lh!==e&&(Lh=e,oo.unstable_scheduleCallback(oo.unstable_NormalPriority,function(){Lh===e&&(Lh=null);for(var t=0;t<e.length;t+=3){var n=e[t],o=e[t+1],l=e[t+2];if(typeof o!="function"){if(N0(o||n)===null)continue;break}var a=Ae(n);a!==null&&(e.splice(t,3),t-=3,n={pending:!0,data:l,method:n.method,action:o},Object.freeze(n),N_(a,n,o,l))}}))}function Is(e){function t(d){return Mf(d,e)}_r!==null&&Mf(_r,e),mr!==null&&Mf(mr,e),pr!==null&&Mf(pr,e),pd.forEach(t),gd.forEach(t);for(var n=0;n<gr.length;n++){var o=gr[n];o.blockedOn===e&&(o.blockedOn=null)}for(;0<gr.length&&(n=gr[0],n.blockedOn===null);)Dy(n),n.blockedOn===null&&gr.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(o=0;o<n.length;o+=3){var l=n[o],a=n[o+1],r=l[Vo]||null;if(typeof a=="function")r||Oy(n);else if(r){var c=null;if(a&&a.hasAttribute("formAction")){if(l=a,r=a[Vo]||null)c=r.formAction;else if(N0(l)!==null)continue}else c=r.action;typeof c=="function"?n[o+1]=c:(n.splice(o,3),o-=3),Oy(n)}}}function zy(){function e(a){a.canIntercept&&a.info==="react-transition"&&a.intercept({handler:function(){return new Promise(function(r){return l=r})},focusReset:"manual",scroll:"manual"})}function t(){l!==null&&(l(),l=null),o||setTimeout(n,20)}function n(){if(!o&&!navigation.transition){var a=navigation.currentEntry;a&&a.url!=null&&navigation.navigate(a.url,{state:a.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,l=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),l!==null&&(l(),l=null)}}}function $0(e){this._internalRoot=e}function Tf(e){this._internalRoot=e}function Ly(e){e[Wi]&&(e._reactRootContainer?console.error("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported."):console.error("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."))}typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());var oo=Mb(),B0=Dl(),Wx=$h(),Lt=Object.assign,Gx=Symbol.for("react.element"),Aa=Symbol.for("react.transitional.element"),Ys=Symbol.for("react.portal"),Xs=Symbol.for("react.fragment"),Rf=Symbol.for("react.strict_mode"),H0=Symbol.for("react.profiler"),U0=Symbol.for("react.consumer"),Oa=Symbol.for("react.context"),Su=Symbol.for("react.forward_ref"),j0=Symbol.for("react.suspense"),I0=Symbol.for("react.suspense_list"),Df=Symbol.for("react.memo"),wl=Symbol.for("react.lazy"),Y0=Symbol.for("react.activity"),Zx=Symbol.for("react.memo_cache_sentinel"),Ny=Symbol.iterator,Px=Symbol.for("react.client.reference"),ho=Array.isArray,V=B0.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,nn=Wx.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Fx=Object.freeze({pending:!1,data:null,method:null,action:null}),X0=[],q0=[],ci=-1,qi=Ve(null),Cu=Ve(null),Vi=Ve(null),Af=Ve(null),ku=0,$y,By,Hy,Uy,jy,Iy,Yy;vt.__reactDisabledLog=!0;var V0,Xy,Q0=!1,W0=new(typeof WeakMap=="function"?WeakMap:Map),Sl=null,za=!1,aa=Object.prototype.hasOwnProperty,G0=oo.unstable_scheduleCallback,Jx=oo.unstable_cancelCallback,Kx=oo.unstable_shouldYield,ew=oo.unstable_requestPaint,bo=oo.unstable_now,tw=oo.unstable_getCurrentPriorityLevel,Z0=oo.unstable_ImmediatePriority,P0=oo.unstable_UserBlockingPriority,qs=oo.unstable_NormalPriority,nw=oo.unstable_LowPriority,F0=oo.unstable_IdlePriority,ow=oo.log,lw=oo.unstable_setDisableYieldValue,Vs=null,Bo=null,La=!1,Na=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u",qo=Math.clz32?Math.clz32:lt,aw=Math.log,iw=Math.LN2,Of=256,zf=262144,Lf=4194304,Cl=2,ia=8,$a=32,Nf=268435456,Qi=Math.random().toString(36).slice(2),Do="__reactFiber$"+Qi,Vo="__reactProps$"+Qi,Wi="__reactContainer$"+Qi,J0="__reactEvents$"+Qi,rw="__reactListeners$"+Qi,sw="__reactHandles$"+Qi,qy="__reactResources$"+Qi,Eu="__reactMarker$"+Qi,Vy=new Set,$r={},K0={},cw={button:!0,checkbox:!0,image:!0,hidden:!0,radio:!0,reset:!0,submit:!0},uw=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Qy={},Wy={},dw=/[\n"\\]/g,Gy=!1,Zy=!1,Py=!1,Fy=!1,Jy=!1,Ky=!1,e5=["value","defaultValue"],t5=!1,n5=/["'&<>\n\t]|^\s|\s$/,fw="address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input isindex li link listing main marquee menu menuitem meta nav noembed noframes noscript object ol p param plaintext pre script section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp".split(" "),o5="applet caption html table td th marquee object template foreignObject desc title".split(" "),hw=o5.concat(["button"]),_w="dd dt li option optgroup p rp rt".split(" "),l5={current:null,formTag:null,aTagInScope:null,buttonTagInScope:null,nobrTagInScope:null,pTagInButtonScope:null,listItemTagAutoclosing:null,dlItemTagAutoclosing:null,containerTagInScope:null,implicitRootScope:!1},$f={},em={animation:"animationDelay animationDirection animationDuration animationFillMode animationIterationCount animationName animationPlayState animationTimingFunction".split(" "),background:"backgroundAttachment backgroundClip backgroundColor backgroundImage backgroundOrigin backgroundPositionX backgroundPositionY backgroundRepeat backgroundSize".split(" "),backgroundPosition:["backgroundPositionX","backgroundPositionY"],border:"borderBottomColor borderBottomStyle borderBottomWidth borderImageOutset borderImageRepeat borderImageSlice borderImageSource borderImageWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderTopColor borderTopStyle borderTopWidth".split(" "),borderBlockEnd:["borderBlockEndColor","borderBlockEndStyle","borderBlockEndWidth"],borderBlockStart:["borderBlockStartColor","borderBlockStartStyle","borderBlockStartWidth"],borderBottom:["borderBottomColor","borderBottomStyle","borderBottomWidth"],borderColor:["borderBottomColor","borderLeftColor","borderRightColor","borderTopColor"],borderImage:["borderImageOutset","borderImageRepeat","borderImageSlice","borderImageSource","borderImageWidth"],borderInlineEnd:["borderInlineEndColor","borderInlineEndStyle","borderInlineEndWidth"],borderInlineStart:["borderInlineStartColor","borderInlineStartStyle","borderInlineStartWidth"],borderLeft:["borderLeftColor","borderLeftStyle","borderLeftWidth"],borderRadius:["borderBottomLeftRadius","borderBottomRightRadius","borderTopLeftRadius","borderTopRightRadius"],borderRight:["borderRightColor","borderRightStyle","borderRightWidth"],borderStyle:["borderBottomStyle","borderLeftStyle","borderRightStyle","borderTopStyle"],borderTop:["borderTopColor","borderTopStyle","borderTopWidth"],borderWidth:["borderBottomWidth","borderLeftWidth","borderRightWidth","borderTopWidth"],columnRule:["columnRuleColor","columnRuleStyle","columnRuleWidth"],columns:["columnCount","columnWidth"],flex:["flexBasis","flexGrow","flexShrink"],flexFlow:["flexDirection","flexWrap"],font:"fontFamily fontFeatureSettings fontKerning fontLanguageOverride fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition fontWeight lineHeight".split(" "),fontVariant:"fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition".split(" "),gap:["columnGap","rowGap"],grid:"gridAutoColumns gridAutoFlow gridAutoRows gridTemplateAreas gridTemplateColumns gridTemplateRows".split(" "),gridArea:["gridColumnEnd","gridColumnStart","gridRowEnd","gridRowStart"],gridColumn:["gridColumnEnd","gridColumnStart"],gridColumnGap:["columnGap"],gridGap:["columnGap","rowGap"],gridRow:["gridRowEnd","gridRowStart"],gridRowGap:["rowGap"],gridTemplate:["gridTemplateAreas","gridTemplateColumns","gridTemplateRows"],listStyle:["listStyleImage","listStylePosition","listStyleType"],margin:["marginBottom","marginLeft","marginRight","marginTop"],marker:["markerEnd","markerMid","markerStart"],mask:"maskClip maskComposite maskImage maskMode maskOrigin maskPositionX maskPositionY maskRepeat maskSize".split(" "),maskPosition:["maskPositionX","maskPositionY"],outline:["outlineColor","outlineStyle","outlineWidth"],overflow:["overflowX","overflowY"],padding:["paddingBottom","paddingLeft","paddingRight","paddingTop"],placeContent:["alignContent","justifyContent"],placeItems:["alignItems","justifyItems"],placeSelf:["alignSelf","justifySelf"],textDecoration:["textDecorationColor","textDecorationLine","textDecorationStyle"],textEmphasis:["textEmphasisColor","textEmphasisStyle"],transition:["transitionDelay","transitionDuration","transitionProperty","transitionTimingFunction"],wordWrap:["overflowWrap"]},a5=/([A-Z])/g,i5=/^ms-/,mw=/^(?:webkit|moz|o)[A-Z]/,pw=/^-ms-/,gw=/-(.)/g,r5=/;\s*$/,Qs={},tm={},s5=!1,c5=!1,u5=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" ")),Bf="http://www.w3.org/1998/Math/MathML",Ws="http://www.w3.org/2000/svg",yw=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Hf={accept:"accept",acceptcharset:"acceptCharset","accept-charset":"acceptCharset",accesskey:"accessKey",action:"action",allowfullscreen:"allowFullScreen",alt:"alt",as:"as",async:"async",autocapitalize:"autoCapitalize",autocomplete:"autoComplete",autocorrect:"autoCorrect",autofocus:"autoFocus",autoplay:"autoPlay",autosave:"autoSave",capture:"capture",cellpadding:"cellPadding",cellspacing:"cellSpacing",challenge:"challenge",charset:"charSet",checked:"checked",children:"children",cite:"cite",class:"className",classid:"classID",classname:"className",cols:"cols",colspan:"colSpan",content:"content",contenteditable:"contentEditable",contextmenu:"contextMenu",controls:"controls",controlslist:"controlsList",coords:"coords",crossorigin:"crossOrigin",dangerouslysetinnerhtml:"dangerouslySetInnerHTML",data:"data",datetime:"dateTime",default:"default",defaultchecked:"defaultChecked",defaultvalue:"defaultValue",defer:"defer",dir:"dir",disabled:"disabled",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback",download:"download",draggable:"draggable",enctype:"encType",enterkeyhint:"enterKeyHint",fetchpriority:"fetchPriority",for:"htmlFor",form:"form",formmethod:"formMethod",formaction:"formAction",formenctype:"formEncType",formnovalidate:"formNoValidate",formtarget:"formTarget",frameborder:"frameBorder",headers:"headers",height:"height",hidden:"hidden",high:"high",href:"href",hreflang:"hrefLang",htmlfor:"htmlFor",httpequiv:"httpEquiv","http-equiv":"httpEquiv",icon:"icon",id:"id",imagesizes:"imageSizes",imagesrcset:"imageSrcSet",inert:"inert",innerhtml:"innerHTML",inputmode:"inputMode",integrity:"integrity",is:"is",itemid:"itemID",itemprop:"itemProp",itemref:"itemRef",itemscope:"itemScope",itemtype:"itemType",keyparams:"keyParams",keytype:"keyType",kind:"kind",label:"label",lang:"lang",list:"list",loop:"loop",low:"low",manifest:"manifest",marginwidth:"marginWidth",marginheight:"marginHeight",max:"max",maxlength:"maxLength",media:"media",mediagroup:"mediaGroup",method:"method",min:"min",minlength:"minLength",multiple:"multiple",muted:"muted",name:"name",nomodule:"noModule",nonce:"nonce",novalidate:"noValidate",open:"open",optimum:"optimum",pattern:"pattern",placeholder:"placeholder",playsinline:"playsInline",poster:"poster",preload:"preload",profile:"profile",radiogroup:"radioGroup",readonly:"readOnly",referrerpolicy:"referrerPolicy",rel:"rel",required:"required",reversed:"reversed",role:"role",rows:"rows",rowspan:"rowSpan",sandbox:"sandbox",scope:"scope",scoped:"scoped",scrolling:"scrolling",seamless:"seamless",selected:"selected",shape:"shape",size:"size",sizes:"sizes",span:"span",spellcheck:"spellCheck",src:"src",srcdoc:"srcDoc",srclang:"srcLang",srcset:"srcSet",start:"start",step:"step",style:"style",summary:"summary",tabindex:"tabIndex",target:"target",title:"title",type:"type",usemap:"useMap",value:"value",width:"width",wmode:"wmode",wrap:"wrap",about:"about",accentheight:"accentHeight","accent-height":"accentHeight",accumulate:"accumulate",additive:"additive",alignmentbaseline:"alignmentBaseline","alignment-baseline":"alignmentBaseline",allowreorder:"allowReorder",alphabetic:"alphabetic",amplitude:"amplitude",arabicform:"arabicForm","arabic-form":"arabicForm",ascent:"ascent",attributename:"attributeName",attributetype:"attributeType",autoreverse:"autoReverse",azimuth:"azimuth",basefrequency:"baseFrequency",baselineshift:"baselineShift","baseline-shift":"baselineShift",baseprofile:"baseProfile",bbox:"bbox",begin:"begin",bias:"bias",by:"by",calcmode:"calcMode",capheight:"capHeight","cap-height":"capHeight",clip:"clip",clippath:"clipPath","clip-path":"clipPath",clippathunits:"clipPathUnits",cliprule:"clipRule","clip-rule":"clipRule",color:"color",colorinterpolation:"colorInterpolation","color-interpolation":"colorInterpolation",colorinterpolationfilters:"colorInterpolationFilters","color-interpolation-filters":"colorInterpolationFilters",colorprofile:"colorProfile","color-profile":"colorProfile",colorrendering:"colorRendering","color-rendering":"colorRendering",contentscripttype:"contentScriptType",contentstyletype:"contentStyleType",cursor:"cursor",cx:"cx",cy:"cy",d:"d",datatype:"datatype",decelerate:"decelerate",descent:"descent",diffuseconstant:"diffuseConstant",direction:"direction",display:"display",divisor:"divisor",dominantbaseline:"dominantBaseline","dominant-baseline":"dominantBaseline",dur:"dur",dx:"dx",dy:"dy",edgemode:"edgeMode",elevation:"elevation",enablebackground:"enableBackground","enable-background":"enableBackground",end:"end",exponent:"exponent",externalresourcesrequired:"externalResourcesRequired",fill:"fill",fillopacity:"fillOpacity","fill-opacity":"fillOpacity",fillrule:"fillRule","fill-rule":"fillRule",filter:"filter",filterres:"filterRes",filterunits:"filterUnits",floodopacity:"floodOpacity","flood-opacity":"floodOpacity",floodcolor:"floodColor","flood-color":"floodColor",focusable:"focusable",fontfamily:"fontFamily","font-family":"fontFamily",fontsize:"fontSize","font-size":"fontSize",fontsizeadjust:"fontSizeAdjust","font-size-adjust":"fontSizeAdjust",fontstretch:"fontStretch","font-stretch":"fontStretch",fontstyle:"fontStyle","font-style":"fontStyle",fontvariant:"fontVariant","font-variant":"fontVariant",fontweight:"fontWeight","font-weight":"fontWeight",format:"format",from:"from",fx:"fx",fy:"fy",g1:"g1",g2:"g2",glyphname:"glyphName","glyph-name":"glyphName",glyphorientationhorizontal:"glyphOrientationHorizontal","glyph-orientation-horizontal":"glyphOrientationHorizontal",glyphorientationvertical:"glyphOrientationVertical","glyph-orientation-vertical":"glyphOrientationVertical",glyphref:"glyphRef",gradienttransform:"gradientTransform",gradientunits:"gradientUnits",hanging:"hanging",horizadvx:"horizAdvX","horiz-adv-x":"horizAdvX",horizoriginx:"horizOriginX","horiz-origin-x":"horizOriginX",ideographic:"ideographic",imagerendering:"imageRendering","image-rendering":"imageRendering",in2:"in2",in:"in",inlist:"inlist",intercept:"intercept",k1:"k1",k2:"k2",k3:"k3",k4:"k4",k:"k",kernelmatrix:"kernelMatrix",kernelunitlength:"kernelUnitLength",kerning:"kerning",keypoints:"keyPoints",keysplines:"keySplines",keytimes:"keyTimes",lengthadjust:"lengthAdjust",letterspacing:"letterSpacing","letter-spacing":"letterSpacing",lightingcolor:"lightingColor","lighting-color":"lightingColor",limitingconeangle:"limitingConeAngle",local:"local",markerend:"markerEnd","marker-end":"markerEnd",markerheight:"markerHeight",markermid:"markerMid","marker-mid":"markerMid",markerstart:"markerStart","marker-start":"markerStart",markerunits:"markerUnits",markerwidth:"markerWidth",mask:"mask",maskcontentunits:"maskContentUnits",maskunits:"maskUnits",mathematical:"mathematical",mode:"mode",numoctaves:"numOctaves",offset:"offset",opacity:"opacity",operator:"operator",order:"order",orient:"orient",orientation:"orientation",origin:"origin",overflow:"overflow",overlineposition:"overlinePosition","overline-position":"overlinePosition",overlinethickness:"overlineThickness","overline-thickness":"overlineThickness",paintorder:"paintOrder","paint-order":"paintOrder",panose1:"panose1","panose-1":"panose1",pathlength:"pathLength",patterncontentunits:"patternContentUnits",patterntransform:"patternTransform",patternunits:"patternUnits",pointerevents:"pointerEvents","pointer-events":"pointerEvents",points:"points",pointsatx:"pointsAtX",pointsaty:"pointsAtY",pointsatz:"pointsAtZ",popover:"popover",popovertarget:"popoverTarget",popovertargetaction:"popoverTargetAction",prefix:"prefix",preservealpha:"preserveAlpha",preserveaspectratio:"preserveAspectRatio",primitiveunits:"primitiveUnits",property:"property",r:"r",radius:"radius",refx:"refX",refy:"refY",renderingintent:"renderingIntent","rendering-intent":"renderingIntent",repeatcount:"repeatCount",repeatdur:"repeatDur",requiredextensions:"requiredExtensions",requiredfeatures:"requiredFeatures",resource:"resource",restart:"restart",result:"result",results:"results",rotate:"rotate",rx:"rx",ry:"ry",scale:"scale",security:"security",seed:"seed",shaperendering:"shapeRendering","shape-rendering":"shapeRendering",slope:"slope",spacing:"spacing",specularconstant:"specularConstant",specularexponent:"specularExponent",speed:"speed",spreadmethod:"spreadMethod",startoffset:"startOffset",stddeviation:"stdDeviation",stemh:"stemh",stemv:"stemv",stitchtiles:"stitchTiles",stopcolor:"stopColor","stop-color":"stopColor",stopopacity:"stopOpacity","stop-opacity":"stopOpacity",strikethroughposition:"strikethroughPosition","strikethrough-position":"strikethroughPosition",strikethroughthickness:"strikethroughThickness","strikethrough-thickness":"strikethroughThickness",string:"string",stroke:"stroke",strokedasharray:"strokeDasharray","stroke-dasharray":"strokeDasharray",strokedashoffset:"strokeDashoffset","stroke-dashoffset":"strokeDashoffset",strokelinecap:"strokeLinecap","stroke-linecap":"strokeLinecap",strokelinejoin:"strokeLinejoin","stroke-linejoin":"strokeLinejoin",strokemiterlimit:"strokeMiterlimit","stroke-miterlimit":"strokeMiterlimit",strokewidth:"strokeWidth","stroke-width":"strokeWidth",strokeopacity:"strokeOpacity","stroke-opacity":"strokeOpacity",suppresscontenteditablewarning:"suppressContentEditableWarning",suppresshydrationwarning:"suppressHydrationWarning",surfacescale:"surfaceScale",systemlanguage:"systemLanguage",tablevalues:"tableValues",targetx:"targetX",targety:"targetY",textanchor:"textAnchor","text-anchor":"textAnchor",textdecoration:"textDecoration","text-decoration":"textDecoration",textlength:"textLength",textrendering:"textRendering","text-rendering":"textRendering",to:"to",transform:"transform",transformorigin:"transformOrigin","transform-origin":"transformOrigin",typeof:"typeof",u1:"u1",u2:"u2",underlineposition:"underlinePosition","underline-position":"underlinePosition",underlinethickness:"underlineThickness","underline-thickness":"underlineThickness",unicode:"unicode",unicodebidi:"unicodeBidi","unicode-bidi":"unicodeBidi",unicoderange:"unicodeRange","unicode-range":"unicodeRange",unitsperem:"unitsPerEm","units-per-em":"unitsPerEm",unselectable:"unselectable",valphabetic:"vAlphabetic","v-alphabetic":"vAlphabetic",values:"values",vectoreffect:"vectorEffect","vector-effect":"vectorEffect",version:"version",vertadvy:"vertAdvY","vert-adv-y":"vertAdvY",vertoriginx:"vertOriginX","vert-origin-x":"vertOriginX",vertoriginy:"vertOriginY","vert-origin-y":"vertOriginY",vhanging:"vHanging","v-hanging":"vHanging",videographic:"vIdeographic","v-ideographic":"vIdeographic",viewbox:"viewBox",viewtarget:"viewTarget",visibility:"visibility",vmathematical:"vMathematical","v-mathematical":"vMathematical",vocab:"vocab",widths:"widths",wordspacing:"wordSpacing","word-spacing":"wordSpacing",writingmode:"writingMode","writing-mode":"writingMode",x1:"x1",x2:"x2",x:"x",xchannelselector:"xChannelSelector",xheight:"xHeight","x-height":"xHeight",xlinkactuate:"xlinkActuate","xlink:actuate":"xlinkActuate",xlinkarcrole:"xlinkArcrole","xlink:arcrole":"xlinkArcrole",xlinkhref:"xlinkHref","xlink:href":"xlinkHref",xlinkrole:"xlinkRole","xlink:role":"xlinkRole",xlinkshow:"xlinkShow","xlink:show":"xlinkShow",xlinktitle:"xlinkTitle","xlink:title":"xlinkTitle",xlinktype:"xlinkType","xlink:type":"xlinkType",xmlbase:"xmlBase","xml:base":"xmlBase",xmllang:"xmlLang","xml:lang":"xmlLang",xmlns:"xmlns","xml:space":"xmlSpace",xmlnsxlink:"xmlnsXlink","xmlns:xlink":"xmlnsXlink",xmlspace:"xmlSpace",y1:"y1",y2:"y2",y:"y",ychannelselector:"yChannelSelector",z:"z",zoomandpan:"zoomAndPan"},d5={"aria-current":0,"aria-description":0,"aria-details":0,"aria-disabled":0,"aria-hidden":0,"aria-invalid":0,"aria-keyshortcuts":0,"aria-label":0,"aria-roledescription":0,"aria-autocomplete":0,"aria-checked":0,"aria-expanded":0,"aria-haspopup":0,"aria-level":0,"aria-modal":0,"aria-multiline":0,"aria-multiselectable":0,"aria-orientation":0,"aria-placeholder":0,"aria-pressed":0,"aria-readonly":0,"aria-required":0,"aria-selected":0,"aria-sort":0,"aria-valuemax":0,"aria-valuemin":0,"aria-valuenow":0,"aria-valuetext":0,"aria-atomic":0,"aria-busy":0,"aria-live":0,"aria-relevant":0,"aria-dropeffect":0,"aria-grabbed":0,"aria-activedescendant":0,"aria-colcount":0,"aria-colindex":0,"aria-colspan":0,"aria-controls":0,"aria-describedby":0,"aria-errormessage":0,"aria-flowto":0,"aria-labelledby":0,"aria-owns":0,"aria-posinset":0,"aria-rowcount":0,"aria-rowindex":0,"aria-rowspan":0,"aria-setsize":0,"aria-braillelabel":0,"aria-brailleroledescription":0,"aria-colindextext":0,"aria-rowindextext":0},Gs={},bw=RegExp("^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),vw=RegExp("^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),f5=!1,Qo={},h5=/^on./,xw=/^on[^A-Z]/,ww=RegExp("^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Sw=RegExp("^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Cw=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i,Mu=null,Zs=null,Ps=null,nm=!1,Ba=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),om=!1;if(Ba)try{var Tu={};Object.defineProperty(Tu,"passive",{get:function(){om=!0}}),window.addEventListener("test",Tu,Tu),window.removeEventListener("test",Tu,Tu)}catch{om=!1}var Gi=null,lm=null,Uf=null,Br={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},jf=qn(Br),Ru=Lt({},Br,{view:0,detail:0}),kw=qn(Ru),am,im,Du,If=Lt({},Ru,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Sr,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Du&&(Du&&e.type==="mousemove"?(am=e.screenX-Du.screenX,im=e.screenY-Du.screenY):im=am=0,Du=e),am)},movementY:function(e){return"movementY"in e?e.movementY:im}}),_5=qn(If),Ew=Lt({},If,{dataTransfer:0}),Mw=qn(Ew),Tw=Lt({},Ru,{relatedTarget:0}),rm=qn(Tw),Rw=Lt({},Br,{animationName:0,elapsedTime:0,pseudoElement:0}),Dw=qn(Rw),Aw=Lt({},Br,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Ow=qn(Aw),zw=Lt({},Br,{data:0}),m5=qn(zw),Lw=m5,Nw={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},$w={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Bw={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"},Hw=Lt({},Ru,{key:function(e){if(e.key){var t=Nw[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=wr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?$w[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Sr,charCode:function(e){return e.type==="keypress"?wr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?wr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Uw=qn(Hw),jw=Lt({},If,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),p5=qn(jw),Iw=Lt({},Ru,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Sr}),Yw=qn(Iw),Xw=Lt({},Br,{propertyName:0,elapsedTime:0,pseudoElement:0}),qw=qn(Xw),Vw=Lt({},If,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Qw=qn(Vw),Ww=Lt({},Br,{newState:0,oldState:0}),Gw=qn(Ww),Zw=[9,13,27,32],g5=229,sm=Ba&&"CompositionEvent"in window,Au=null;Ba&&"documentMode"in document&&(Au=document.documentMode);var Pw=Ba&&"TextEvent"in window&&!Au,y5=Ba&&(!sm||Au&&8<Au&&11>=Au),b5=32,v5=String.fromCharCode(b5),x5=!1,Fs=!1,Fw={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0},Ou=null,zu=null,w5=!1;Ba&&(w5=Za("input")&&(!document.documentMode||9<document.documentMode));var Wo=typeof Object.is=="function"?Object.is:o_,Jw=Ba&&"documentMode"in document&&11>=document.documentMode,Js=null,cm=null,Lu=null,um=!1,Ks={animationend:Bl("Animation","AnimationEnd"),animationiteration:Bl("Animation","AnimationIteration"),animationstart:Bl("Animation","AnimationStart"),transitionrun:Bl("Transition","TransitionRun"),transitionstart:Bl("Transition","TransitionStart"),transitioncancel:Bl("Transition","TransitionCancel"),transitionend:Bl("Transition","TransitionEnd")},dm={},S5={};Ba&&(S5=document.createElement("div").style,"AnimationEvent"in window||(delete Ks.animationend.animation,delete Ks.animationiteration.animation,delete Ks.animationstart.animation),"TransitionEvent"in window||delete Ks.transitionend.transition);var C5=pa("animationend"),k5=pa("animationiteration"),E5=pa("animationstart"),Kw=pa("transitionrun"),e4=pa("transitionstart"),t4=pa("transitioncancel"),M5=pa("transitionend"),T5=new Map,fm="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");fm.push("scrollEnd");var R5=0;if(typeof performance=="object"&&typeof performance.now=="function")var n4=performance,D5=function(){return n4.now()};else{var o4=Date;D5=function(){return o4.now()}}var hm=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},l4="This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.",Yf=0,_m=1,mm=2,pm=3,Xf="\u2013\xA0",qf="+\xA0",A5="\u2007\xA0",wn=typeof console<"u"&&typeof console.timeStamp=="function"&&typeof performance<"u"&&typeof performance.measure=="function",Yl="Components \u269B",Nt="Scheduler \u269B",Ut="Blocking",Zi=!1,ui={color:"primary",properties:null,tooltipText:"",track:Yl},Pi={start:-0,end:-0,detail:{devtools:ui}},a4=["Changed Props",""],O5="This component received deeply equal props. It might benefit from useMemo or the React Compiler in its owner.",i4=["Changed Props",O5],Nu=1,di=2,Xl=[],ec=0,gm=0,Fi={};Object.freeze(Fi);var ql=null,tc=null,_t=0,r4=1,Tt=2,Ho=8,ra=16,s4=32,z5=!1;try{var L5=Object.preventExtensions({})}catch{z5=!0}var ym=new WeakMap,nc=[],oc=0,Vf=null,$u=0,Vl=[],Ql=0,Hr=null,fi=1,hi="",Ao=null,Sn=null,Yt=!1,Ha=!1,kl=null,Ji=null,Wl=!1,bm=Error("Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."),vm=Ve(null),xm=Ve(null),N5={},Qf=null,lc=null,ac=!1,c4=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,o){e.push(o)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},u4=oo.unstable_scheduleCallback,d4=oo.unstable_NormalPriority,lo={$$typeof:Oa,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0,_currentRenderer:null,_currentRenderer2:null},ao=oo.unstable_now,Wf=console.createTask?console.createTask:function(){return null},Bu=1,Gf=2,vo=-0,Ki=-0,_i=-0,mi=null,Go=-1.1,Ur=-0,An=-0,tt=-1.1,dt=-1.1,Tn=null,Un=!1,er=-0,Ua=-1.1,Hu=null,tr=0,wm=null,Sm=null,jr=-1.1,Uu=null,ic=-1.1,Zf=-1.1,ja=-0,pi=-1.1,Gl=-1.1,Cm=0,ju=null,$5=null,B5=null,nr=-1.1,Ir=null,or=-1.1,Pf=-1.1,H5=-0,U5=-0,Ff=0,gi=null,j5=0,Iu=-1.1,Jf=!1,Kf=!1,Yu=null,km=0,Yr=0,rc=null,I5=V.S;V.S=function(e,t){if($2=bo(),typeof t=="object"&&t!==null&&typeof t.then=="function"){if(0>pi&&0>Gl){pi=ao();var n=yu(),o=gu();(n!==or||o!==Ir)&&(or=-1.1),nr=n,Ir=o}Dv(e,t)}I5!==null&&I5(e,t)};var Xr=Ve(null),sa={recordUnsafeLifecycleWarnings:function(){},flushPendingUnsafeLifecycleWarnings:function(){},recordLegacyContextWarning:function(){},flushLegacyContextWarning:function(){},discardPendingWarnings:function(){}},Xu=[],qu=[],Vu=[],Qu=[],Wu=[],Gu=[],qr=new Set;sa.recordUnsafeLifecycleWarnings=function(e,t){qr.has(e.type)||(typeof t.componentWillMount=="function"&&t.componentWillMount.__suppressDeprecationWarning!==!0&&Xu.push(e),e.mode&Ho&&typeof t.UNSAFE_componentWillMount=="function"&&qu.push(e),typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps.__suppressDeprecationWarning!==!0&&Vu.push(e),e.mode&Ho&&typeof t.UNSAFE_componentWillReceiveProps=="function"&&Qu.push(e),typeof t.componentWillUpdate=="function"&&t.componentWillUpdate.__suppressDeprecationWarning!==!0&&Wu.push(e),e.mode&Ho&&typeof t.UNSAFE_componentWillUpdate=="function"&&Gu.push(e))},sa.flushPendingUnsafeLifecycleWarnings=function(){var e=new Set;0<Xu.length&&(Xu.forEach(function(c){e.add(ue(c)||"Component"),qr.add(c.type)}),Xu=[]);var t=new Set;0<qu.length&&(qu.forEach(function(c){t.add(ue(c)||"Component"),qr.add(c.type)}),qu=[]);var n=new Set;0<Vu.length&&(Vu.forEach(function(c){n.add(ue(c)||"Component"),qr.add(c.type)}),Vu=[]);var o=new Set;0<Qu.length&&(Qu.forEach(function(c){o.add(ue(c)||"Component"),qr.add(c.type)}),Qu=[]);var l=new Set;0<Wu.length&&(Wu.forEach(function(c){l.add(ue(c)||"Component"),qr.add(c.type)}),Wu=[]);var a=new Set;if(0<Gu.length&&(Gu.forEach(function(c){a.add(ue(c)||"Component"),qr.add(c.type)}),Gu=[]),0<t.size){var r=$(t);console.error(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`,r)}0<o.size&&(r=$(o),console.error(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state

Please update the following components: %s`,r)),0<a.size&&(r=$(a),console.error(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`,r)),0<e.size&&(r=$(e),console.warn(`componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,r)),0<n.size&&(r=$(n),console.warn(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,r)),0<l.size&&(r=$(l),console.warn(`componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,r))};var eh=new Map,Y5=new Set;sa.recordLegacyContextWarning=function(e,t){for(var n=null,o=e;o!==null;)o.mode&Ho&&(n=o),o=o.return;n===null?console.error("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue."):!Y5.has(e.type)&&(o=eh.get(n),e.type.contextTypes!=null||e.type.childContextTypes!=null||t!==null&&typeof t.getChildContext=="function")&&(o===void 0&&(o=[],eh.set(n,o)),o.push(e))},sa.flushLegacyContextWarning=function(){eh.forEach(function(e){if(e.length!==0){var t=e[0],n=new Set;e.forEach(function(l){n.add(ue(l)||"Component"),Y5.add(l.type)});var o=$(n);xe(t,function(){console.error(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://react.dev/link/legacy-context`,o)})}})},sa.discardPendingWarnings=function(){Xu=[],qu=[],Vu=[],Qu=[],Wu=[],Gu=[],eh=new Map};var X5={react_stack_bottom_frame:function(e,t,n){var o=za;za=!0;try{return e(t,n)}finally{za=o}}},Em=X5.react_stack_bottom_frame.bind(X5),q5={react_stack_bottom_frame:function(e){var t=za;za=!0;try{return e.render()}finally{za=t}}},V5=q5.react_stack_bottom_frame.bind(q5),Q5={react_stack_bottom_frame:function(e,t){try{t.componentDidMount()}catch(n){tn(e,e.return,n)}}},Mm=Q5.react_stack_bottom_frame.bind(Q5),W5={react_stack_bottom_frame:function(e,t,n,o,l){try{t.componentDidUpdate(n,o,l)}catch(a){tn(e,e.return,a)}}},G5=W5.react_stack_bottom_frame.bind(W5),Z5={react_stack_bottom_frame:function(e,t){var n=t.stack;e.componentDidCatch(t.value,{componentStack:n!==null?n:""})}},f4=Z5.react_stack_bottom_frame.bind(Z5),P5={react_stack_bottom_frame:function(e,t,n){try{n.componentWillUnmount()}catch(o){tn(e,t,o)}}},F5=P5.react_stack_bottom_frame.bind(P5),J5={react_stack_bottom_frame:function(e){var t=e.create;return e=e.inst,t=t(),e.destroy=t}},h4=J5.react_stack_bottom_frame.bind(J5),K5={react_stack_bottom_frame:function(e,t,n){try{n()}catch(o){tn(e,t,o)}}},_4=K5.react_stack_bottom_frame.bind(K5),e2={react_stack_bottom_frame:function(e){var t=e._init;return t(e._payload)}},m4=e2.react_stack_bottom_frame.bind(e2),sc=Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."),Tm=Error("Suspense Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."),th=Error("Suspense Exception: This is not a real error! It's an implementation detail of `useActionState` to interrupt the current render. You must either rethrow it immediately, or move the `useActionState` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary."),nh={then:function(){console.error('Internal React error: A listener was unexpectedly attached to a "noop" thenable. This is a bug in React. Please file an issue.')}},Vr=null,Zu=!1,cc=null,Pu=0,Rt=null,Rm,t2=Rm=!1,n2={},o2={},l2={};B=function(e,t,n){if(n!==null&&typeof n=="object"&&n._store&&(!n._store.validated&&n.key==null||n._store.validated===2)){if(typeof n._store!="object")throw Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");n._store.validated=1;var o=ue(e),l=o||"null";if(!n2[l]){n2[l]=!0,n=n._owner,e=e._debugOwner;var a="";e&&typeof e.tag=="number"&&(l=ue(e))&&(a=`

Check the render method of \``+l+"`."),a||o&&(a=`

Check the top-level render call using <`+o+">.");var r="";n!=null&&e!==n&&(o=null,typeof n.tag=="number"?o=ue(n):typeof n.name=="string"&&(o=n.name),o&&(r=" It was passed a child from "+o+".")),xe(t,function(){console.error('Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',a,r)})}}};var Qr=Pp(!0),a2=Pp(!1),i2=0,r2=1,s2=2,Dm=3,lr=!1,c2=!1,Am=null,Om=!1,uc=Ve(null),oh=Ve(0),El=Ve(null),Zl=null,dc=1,Fu=2,Fn=Ve(0),lh=0,Pl=1,Zo=2,Ml=4,Po=8,fc,u2=new Set,d2=new Set,zm=new Set,f2=new Set,yi=0,gt=null,hn=null,io=null,ah=!1,hc=!1,Wr=!1,ih=0,Ju=0,bi=null,p4=0,g4=25,q=null,Fl=null,vi=-1,Ku=!1,ed={readContext:Pt,use:ji,useCallback:Wn,useContext:Wn,useEffect:Wn,useImperativeHandle:Wn,useLayoutEffect:Wn,useInsertionEffect:Wn,useMemo:Wn,useReducer:Wn,useRef:Wn,useState:Wn,useDebugValue:Wn,useDeferredValue:Wn,useTransition:Wn,useSyncExternalStore:Wn,useId:Wn,useHostTransitionStatus:Wn,useFormState:Wn,useActionState:Wn,useOptimistic:Wn,useMemoCache:Wn,useCacheRefresh:Wn};ed.useEffectEvent=Wn;var Lm=null,h2=null,Nm=null,_2=null,Ia=null,ca=null,rh=null;Lm={readContext:function(e){return Pt(e)},use:ji,useCallback:function(e,t){return q="useCallback",zt(),Rs(t),A_(e,t)},useContext:function(e){return q="useContext",zt(),Pt(e)},useEffect:function(e,t){return q="useEffect",zt(),Rs(t),Kd(e,t)},useImperativeHandle:function(e,t,n){return q="useImperativeHandle",zt(),Rs(n),D_(e,t,n)},useInsertionEffect:function(e,t){q="useInsertionEffect",zt(),Rs(t),Ar(4,Zo,e,t)},useLayoutEffect:function(e,t){return q="useLayoutEffect",zt(),Rs(t),R_(e,t)},useMemo:function(e,t){q="useMemo",zt(),Rs(t);var n=V.H;V.H=Ia;try{return O_(e,t)}finally{V.H=n}},useReducer:function(e,t,n){q="useReducer",zt();var o=V.H;V.H=Ia;try{return v_(e,t,n)}finally{V.H=o}},useRef:function(e){return q="useRef",zt(),M_(e)},useState:function(e){q="useState",zt();var t=V.H;V.H=Ia;try{return C_(e)}finally{V.H=t}},useDebugValue:function(){q="useDebugValue",zt()},useDeferredValue:function(e,t){return q="useDeferredValue",zt(),z_(e,t)},useTransition:function(){return q="useTransition",zt(),$_()},useSyncExternalStore:function(e,t,n){return q="useSyncExternalStore",zt(),w_(e,t,n)},useId:function(){return q="useId",zt(),B_()},useFormState:function(e,t){return q="useFormState",zt(),Gd(),As(e,t)},useActionState:function(e,t){return q="useActionState",zt(),As(e,t)},useOptimistic:function(e){return q="useOptimistic",zt(),k_(e)},useHostTransitionStatus:Or,useMemoCache:Dr,useCacheRefresh:function(){return q="useCacheRefresh",zt(),H_()},useEffectEvent:function(e){return q="useEffectEvent",zt(),T_(e)}},h2={readContext:function(e){return Pt(e)},use:ji,useCallback:function(e,t){return q="useCallback",_e(),A_(e,t)},useContext:function(e){return q="useContext",_e(),Pt(e)},useEffect:function(e,t){return q="useEffect",_e(),Kd(e,t)},useImperativeHandle:function(e,t,n){return q="useImperativeHandle",_e(),D_(e,t,n)},useInsertionEffect:function(e,t){q="useInsertionEffect",_e(),Ar(4,Zo,e,t)},useLayoutEffect:function(e,t){return q="useLayoutEffect",_e(),R_(e,t)},useMemo:function(e,t){q="useMemo",_e();var n=V.H;V.H=Ia;try{return O_(e,t)}finally{V.H=n}},useReducer:function(e,t,n){q="useReducer",_e();var o=V.H;V.H=Ia;try{return v_(e,t,n)}finally{V.H=o}},useRef:function(e){return q="useRef",_e(),M_(e)},useState:function(e){q="useState",_e();var t=V.H;V.H=Ia;try{return C_(e)}finally{V.H=t}},useDebugValue:function(){q="useDebugValue",_e()},useDeferredValue:function(e,t){return q="useDeferredValue",_e(),z_(e,t)},useTransition:function(){return q="useTransition",_e(),$_()},useSyncExternalStore:function(e,t,n){return q="useSyncExternalStore",_e(),w_(e,t,n)},useId:function(){return q="useId",_e(),B_()},useActionState:function(e,t){return q="useActionState",_e(),As(e,t)},useFormState:function(e,t){return q="useFormState",_e(),Gd(),As(e,t)},useOptimistic:function(e){return q="useOptimistic",_e(),k_(e)},useHostTransitionStatus:Or,useMemoCache:Dr,useCacheRefresh:function(){return q="useCacheRefresh",_e(),H_()},useEffectEvent:function(e){return q="useEffectEvent",_e(),T_(e)}},Nm={readContext:function(e){return Pt(e)},use:ji,useCallback:function(e,t){return q="useCallback",_e(),nf(e,t)},useContext:function(e){return q="useContext",_e(),Pt(e)},useEffect:function(e,t){q="useEffect",_e(),il(2048,Po,e,t)},useImperativeHandle:function(e,t,n){return q="useImperativeHandle",_e(),tf(e,t,n)},useInsertionEffect:function(e,t){return q="useInsertionEffect",_e(),il(4,Zo,e,t)},useLayoutEffect:function(e,t){return q="useLayoutEffect",_e(),il(4,Ml,e,t)},useMemo:function(e,t){q="useMemo",_e();var n=V.H;V.H=ca;try{return of(e,t)}finally{V.H=n}},useReducer:function(e,t,n){q="useReducer",_e();var o=V.H;V.H=ca;try{return Ds(e,t,n)}finally{V.H=o}},useRef:function(){return q="useRef",_e(),an().memoizedState},useState:function(){q="useState",_e();var e=V.H;V.H=ca;try{return Ds(oa)}finally{V.H=e}},useDebugValue:function(){q="useDebugValue",_e()},useDeferredValue:function(e,t){return q="useDeferredValue",_e(),yg(e,t)},useTransition:function(){return q="useTransition",_e(),Cg()},useSyncExternalStore:function(e,t,n){return q="useSyncExternalStore",_e(),Pd(e,t,n)},useId:function(){return q="useId",_e(),an().memoizedState},useFormState:function(e){return q="useFormState",_e(),Gd(),Fd(e)},useActionState:function(e){return q="useActionState",_e(),Fd(e)},useOptimistic:function(e,t){return q="useOptimistic",_e(),sg(e,t)},useHostTransitionStatus:Or,useMemoCache:Dr,useCacheRefresh:function(){return q="useCacheRefresh",_e(),an().memoizedState},useEffectEvent:function(e){return q="useEffectEvent",_e(),ef(e)}},_2={readContext:function(e){return Pt(e)},use:ji,useCallback:function(e,t){return q="useCallback",_e(),nf(e,t)},useContext:function(e){return q="useContext",_e(),Pt(e)},useEffect:function(e,t){q="useEffect",_e(),il(2048,Po,e,t)},useImperativeHandle:function(e,t,n){return q="useImperativeHandle",_e(),tf(e,t,n)},useInsertionEffect:function(e,t){return q="useInsertionEffect",_e(),il(4,Zo,e,t)},useLayoutEffect:function(e,t){return q="useLayoutEffect",_e(),il(4,Ml,e,t)},useMemo:function(e,t){q="useMemo",_e();var n=V.H;V.H=rh;try{return of(e,t)}finally{V.H=n}},useReducer:function(e,t,n){q="useReducer",_e();var o=V.H;V.H=rh;try{return au(e,t,n)}finally{V.H=o}},useRef:function(){return q="useRef",_e(),an().memoizedState},useState:function(){q="useState",_e();var e=V.H;V.H=rh;try{return au(oa)}finally{V.H=e}},useDebugValue:function(){q="useDebugValue",_e()},useDeferredValue:function(e,t){return q="useDeferredValue",_e(),bg(e,t)},useTransition:function(){return q="useTransition",_e(),kg()},useSyncExternalStore:function(e,t,n){return q="useSyncExternalStore",_e(),Pd(e,t,n)},useId:function(){return q="useId",_e(),an().memoizedState},useFormState:function(e){return q="useFormState",_e(),Gd(),Jd(e)},useActionState:function(e){return q="useActionState",_e(),Jd(e)},useOptimistic:function(e,t){return q="useOptimistic",_e(),ug(e,t)},useHostTransitionStatus:Or,useMemoCache:Dr,useCacheRefresh:function(){return q="useCacheRefresh",_e(),an().memoizedState},useEffectEvent:function(e){return q="useEffectEvent",_e(),ef(e)}},Ia={readContext:function(e){return A(),Pt(e)},use:function(e){return E(),ji(e)},useCallback:function(e,t){return q="useCallback",E(),zt(),A_(e,t)},useContext:function(e){return q="useContext",E(),zt(),Pt(e)},useEffect:function(e,t){return q="useEffect",E(),zt(),Kd(e,t)},useImperativeHandle:function(e,t,n){return q="useImperativeHandle",E(),zt(),D_(e,t,n)},useInsertionEffect:function(e,t){q="useInsertionEffect",E(),zt(),Ar(4,Zo,e,t)},useLayoutEffect:function(e,t){return q="useLayoutEffect",E(),zt(),R_(e,t)},useMemo:function(e,t){q="useMemo",E(),zt();var n=V.H;V.H=Ia;try{return O_(e,t)}finally{V.H=n}},useReducer:function(e,t,n){q="useReducer",E(),zt();var o=V.H;V.H=Ia;try{return v_(e,t,n)}finally{V.H=o}},useRef:function(e){return q="useRef",E(),zt(),M_(e)},useState:function(e){q="useState",E(),zt();var t=V.H;V.H=Ia;try{return C_(e)}finally{V.H=t}},useDebugValue:function(){q="useDebugValue",E(),zt()},useDeferredValue:function(e,t){return q="useDeferredValue",E(),zt(),z_(e,t)},useTransition:function(){return q="useTransition",E(),zt(),$_()},useSyncExternalStore:function(e,t,n){return q="useSyncExternalStore",E(),zt(),w_(e,t,n)},useId:function(){return q="useId",E(),zt(),B_()},useFormState:function(e,t){return q="useFormState",E(),zt(),As(e,t)},useActionState:function(e,t){return q="useActionState",E(),zt(),As(e,t)},useOptimistic:function(e){return q="useOptimistic",E(),zt(),k_(e)},useMemoCache:function(e){return E(),Dr(e)},useHostTransitionStatus:Or,useCacheRefresh:function(){return q="useCacheRefresh",zt(),H_()},useEffectEvent:function(e){return q="useEffectEvent",E(),zt(),T_(e)}},ca={readContext:function(e){return A(),Pt(e)},use:function(e){return E(),ji(e)},useCallback:function(e,t){return q="useCallback",E(),_e(),nf(e,t)},useContext:function(e){return q="useContext",E(),_e(),Pt(e)},useEffect:function(e,t){q="useEffect",E(),_e(),il(2048,Po,e,t)},useImperativeHandle:function(e,t,n){return q="useImperativeHandle",E(),_e(),tf(e,t,n)},useInsertionEffect:function(e,t){return q="useInsertionEffect",E(),_e(),il(4,Zo,e,t)},useLayoutEffect:function(e,t){return q="useLayoutEffect",E(),_e(),il(4,Ml,e,t)},useMemo:function(e,t){q="useMemo",E(),_e();var n=V.H;V.H=ca;try{return of(e,t)}finally{V.H=n}},useReducer:function(e,t,n){q="useReducer",E(),_e();var o=V.H;V.H=ca;try{return Ds(e,t,n)}finally{V.H=o}},useRef:function(){return q="useRef",E(),_e(),an().memoizedState},useState:function(){q="useState",E(),_e();var e=V.H;V.H=ca;try{return Ds(oa)}finally{V.H=e}},useDebugValue:function(){q="useDebugValue",E(),_e()},useDeferredValue:function(e,t){return q="useDeferredValue",E(),_e(),yg(e,t)},useTransition:function(){return q="useTransition",E(),_e(),Cg()},useSyncExternalStore:function(e,t,n){return q="useSyncExternalStore",E(),_e(),Pd(e,t,n)},useId:function(){return q="useId",E(),_e(),an().memoizedState},useFormState:function(e){return q="useFormState",E(),_e(),Fd(e)},useActionState:function(e){return q="useActionState",E(),_e(),Fd(e)},useOptimistic:function(e,t){return q="useOptimistic",E(),_e(),sg(e,t)},useMemoCache:function(e){return E(),Dr(e)},useHostTransitionStatus:Or,useCacheRefresh:function(){return q="useCacheRefresh",_e(),an().memoizedState},useEffectEvent:function(e){return q="useEffectEvent",E(),_e(),ef(e)}},rh={readContext:function(e){return A(),Pt(e)},use:function(e){return E(),ji(e)},useCallback:function(e,t){return q="useCallback",E(),_e(),nf(e,t)},useContext:function(e){return q="useContext",E(),_e(),Pt(e)},useEffect:function(e,t){q="useEffect",E(),_e(),il(2048,Po,e,t)},useImperativeHandle:function(e,t,n){return q="useImperativeHandle",E(),_e(),tf(e,t,n)},useInsertionEffect:function(e,t){return q="useInsertionEffect",E(),_e(),il(4,Zo,e,t)},useLayoutEffect:function(e,t){return q="useLayoutEffect",E(),_e(),il(4,Ml,e,t)},useMemo:function(e,t){q="useMemo",E(),_e();var n=V.H;V.H=ca;try{return of(e,t)}finally{V.H=n}},useReducer:function(e,t,n){q="useReducer",E(),_e();var o=V.H;V.H=ca;try{return au(e,t,n)}finally{V.H=o}},useRef:function(){return q="useRef",E(),_e(),an().memoizedState},useState:function(){q="useState",E(),_e();var e=V.H;V.H=ca;try{return au(oa)}finally{V.H=e}},useDebugValue:function(){q="useDebugValue",E(),_e()},useDeferredValue:function(e,t){return q="useDeferredValue",E(),_e(),bg(e,t)},useTransition:function(){return q="useTransition",E(),_e(),kg()},useSyncExternalStore:function(e,t,n){return q="useSyncExternalStore",E(),_e(),Pd(e,t,n)},useId:function(){return q="useId",E(),_e(),an().memoizedState},useFormState:function(e){return q="useFormState",E(),_e(),Jd(e)},useActionState:function(e){return q="useActionState",E(),_e(),Jd(e)},useOptimistic:function(e,t){return q="useOptimistic",E(),_e(),ug(e,t)},useMemoCache:function(e){return E(),Dr(e)},useHostTransitionStatus:Or,useCacheRefresh:function(){return q="useCacheRefresh",_e(),an().memoizedState},useEffectEvent:function(e){return q="useEffectEvent",E(),_e(),ef(e)}};var m2={},p2=new Set,g2=new Set,y2=new Set,b2=new Set,v2=new Set,x2=new Set,w2=new Set,S2=new Set,C2=new Set,k2=new Set;Object.freeze(m2);var $m={enqueueSetState:function(e,t,n){e=e._reactInternals;var o=vl(e),l=$i(o);l.payload=t,n!=null&&(j_(n),l.callback=n),t=Bi(e,l,o),t!==null&&(ya(o,"this.setState()",e),Hn(t,e,o),tu(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var o=vl(e),l=$i(o);l.tag=r2,l.payload=t,n!=null&&(j_(n),l.callback=n),t=Bi(e,l,o),t!==null&&(ya(o,"this.replaceState()",e),Hn(t,e,o),tu(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=vl(e),o=$i(n);o.tag=s2,t!=null&&(j_(t),o.callback=t),t=Bi(e,o,n),t!==null&&(ya(n,"this.forceUpdate()",e),Hn(t,e,n),tu(t,e,n))}},_c=null,Bm=null,Hm=Error("This is not a real error. It's an implementation detail of React's selective hydration feature. If this leaks into userspace, it's a bug in React. Please file an issue."),ro=!1,E2={},M2={},T2={},R2={},mc=!1,D2={},sh={},Um={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null},A2=!1,O2=null;O2=new Set;var xi=!1,so=!1,jm=!1,z2=typeof WeakSet=="function"?WeakSet:Set,xo=null,pc=null,gc=null,co=null,cl=!1,ua=null,_o=!1,td=8192,y4={getCacheForType:function(e){var t=Pt(lo),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Pt(lo).controller.signal},getOwner:function(){return Sl}};if(typeof Symbol=="function"&&Symbol.for){var nd=Symbol.for;nd("selector.component"),nd("selector.has_pseudo_class"),nd("selector.role"),nd("selector.test_id"),nd("selector.text")}var b4=[],v4=typeof WeakMap=="function"?WeakMap:Map,wo=0,mo=2,Tl=4,wi=0,od=1,Gr=2,ch=3,ar=4,uh=6,L2=5,Gt=wo,_n=null,At=null,Dt=0,ul=0,dh=1,Zr=2,ld=3,N2=4,Im=5,ad=6,fh=7,Ym=8,Pr=9,rn=ul,Rl=null,ir=!1,yc=!1,Xm=!1,Ya=0,On=wi,rr=0,sr=0,qm=0,dl=0,Fr=0,id=null,Fo=null,hh=!1,_h=0,$2=0,B2=300,mh=1/0,H2=500,rd=null,Gn=null,cr=null,ph=0,Vm=1,Qm=2,U2=3,ur=0,j2=1,I2=2,Y2=3,X2=4,gh=5,uo=0,dr=null,bc=null,da=0,Wm=0,Gm=-0,Zm=null,q2=null,V2=null,fa=ph,Q2=null,x4=50,sd=0,Pm=null,Fm=!1,yh=!1,w4=50,Jr=0,cd=null,vc=!1,bh=null,W2=!1,G2=new Set,S4={},vh=null,xc=null,Jm=!1,Km=!1,xh=!1,ep=!1,fr=0,tp={};(function(){for(var e=0;e<fm.length;e++){var t=fm[e],n=t.toLowerCase();t=t[0].toUpperCase()+t.slice(1),zo(n,"on"+t)}zo(C5,"onAnimationEnd"),zo(k5,"onAnimationIteration"),zo(E5,"onAnimationStart"),zo("dblclick","onDoubleClick"),zo("focusin","onFocus"),zo("focusout","onBlur"),zo(Kw,"onTransitionRun"),zo(e4,"onTransitionStart"),zo(t4,"onTransitionCancel"),zo(M5,"onTransitionEnd")})(),pt("onMouseEnter",["mouseout","mouseover"]),pt("onMouseLeave",["mouseout","mouseover"]),pt("onPointerEnter",["pointerout","pointerover"]),pt("onPointerLeave",["pointerout","pointerover"]),xt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),xt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),xt("onBeforeInput",["compositionend","keypress","textInput","paste"]),xt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),xt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),xt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ud="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),np=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ud)),wh="_reactListening"+Math.random().toString(36).slice(2),Z2=!1,P2=!1,Sh=!1,F2=!1,Ch=!1,kh=!1,J2=!1,Eh={},C4=/\r\n?/g,k4=/\u0000|\uFFFD/g,Kr="http://www.w3.org/1999/xlink",op="http://www.w3.org/XML/1998/namespace",E4="javascript:throw new Error('React form unexpectedly submitted.')",M4="suppressHydrationWarning",es="&",Mh="/&",dd="$",fd="/$",hr="$?",ts="$~",wc="$!",T4="html",R4="body",D4="head",lp="F!",K2="F",eb="loading",A4="style",Si=0,Sc=1,Th=2,ap=null,ip=null,tb={dialog:!0,webview:!0},rp=null,hd=void 0,nb=typeof setTimeout=="function"?setTimeout:void 0,O4=typeof clearTimeout=="function"?clearTimeout:void 0,ns=-1,ob=typeof Promise=="function"?Promise:void 0,z4=typeof queueMicrotask=="function"?queueMicrotask:typeof ob<"u"?function(e){return ob.resolve(null).then(e).catch(px)}:nb,sp=null,os=0,_d=1,lb=2,ab=3,Jl=4,Kl=new Map,ib=new Set,Ci=nn.d;nn.d={f:function(){var e=Ci.f(),t=$s();return e||t},r:function(e){var t=Ae(e);t!==null&&t.tag===5&&t.type==="form"?Sg(t):Ci.r(e)},D:function(e){Ci.D(e),py("dns-prefetch",e,null)},C:function(e,t){Ci.C(e,t),py("preconnect",e,t)},L:function(e,t,n){Ci.L(e,t,n);var o=Cc;if(o&&e&&t){var l='link[rel="preload"][as="'+ko(t)+'"]';t==="image"&&n&&n.imageSrcSet?(l+='[imagesrcset="'+ko(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(l+='[imagesizes="'+ko(n.imageSizes)+'"]')):l+='[href="'+ko(e)+'"]';var a=l;switch(t){case"style":a=Us(e);break;case"script":a=js(e)}Kl.has(a)||(e=Lt({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),Kl.set(a,e),o.querySelector(l)!==null||t==="style"&&o.querySelector(vu(a))||t==="script"&&o.querySelector(xu(a))||(t=o.createElement("link"),Ro(t,"link",e),ae(t),o.head.appendChild(t)))}},m:function(e,t){Ci.m(e,t);var n=Cc;if(n&&e){var o=t&&typeof t.as=="string"?t.as:"script",l='link[rel="modulepreload"][as="'+ko(o)+'"][href="'+ko(e)+'"]',a=l;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":a=js(e)}if(!Kl.has(a)&&(e=Lt({rel:"modulepreload",href:e},t),Kl.set(a,e),n.querySelector(l)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(xu(a)))return}o=n.createElement("link"),Ro(o,"link",e),ae(o),n.head.appendChild(o)}}},X:function(e,t){Ci.X(e,t);var n=Cc;if(n&&e){var o=Te(n).hoistableScripts,l=js(e),a=o.get(l);a||(a=n.querySelector(xu(l)),a||(e=Lt({src:e,async:!0},t),(t=Kl.get(l))&&D0(e,t),a=n.createElement("script"),ae(a),Ro(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},o.set(l,a))}},S:function(e,t,n){Ci.S(e,t,n);var o=Cc;if(o&&e){var l=Te(o).hoistableStyles,a=Us(e);t=t||"default";var r=l.get(a);if(!r){var c={loading:os,preload:null};if(r=o.querySelector(vu(a)))c.loading=_d|Jl;else{e=Lt({rel:"stylesheet",href:e,"data-precedence":t},n),(n=Kl.get(a))&&R0(e,n);var d=r=o.createElement("link");ae(d),Ro(d,"link",e),d._p=new Promise(function(p,L){d.onload=p,d.onerror=L}),d.addEventListener("load",function(){c.loading|=_d}),d.addEventListener("error",function(){c.loading|=lb}),c.loading|=Jl,Sf(r,t,o)}r={type:"stylesheet",instance:r,count:1,state:c},l.set(a,r)}}},M:function(e,t){Ci.M(e,t);var n=Cc;if(n&&e){var o=Te(n).hoistableScripts,l=js(e),a=o.get(l);a||(a=n.querySelector(xu(l)),a||(e=Lt({src:e,async:!0,type:"module"},t),(t=Kl.get(l))&&D0(e,t),a=n.createElement("script"),ae(a),Ro(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},o.set(l,a))}}};var Cc=typeof document>"u"?null:document,Rh=null,L4=6e4,N4=800,$4=500,cp=0,up=null,Dh=null,ls=Fx,md={$$typeof:Oa,Provider:null,Consumer:null,_currentValue:ls,_currentValue2:ls,_threadCount:0},rb="%c%s%c",sb="background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px",cb="",Ah=" ",B4=Function.prototype.bind,ub=!1,db=null,fb=null,hb=null,_b=null,mb=null,pb=null,gb=null,yb=null,bb=null,vb=null;db=function(e,t,n,o){t=i(e,t),t!==null&&(n=s(t.memoizedState,n,0,o),t.memoizedState=n,t.baseState=n,e.memoizedProps=Lt({},e.memoizedProps),n=to(e,2),n!==null&&Hn(n,e,2))},fb=function(e,t,n){t=i(e,t),t!==null&&(n=h(t.memoizedState,n,0),t.memoizedState=n,t.baseState=n,e.memoizedProps=Lt({},e.memoizedProps),n=to(e,2),n!==null&&Hn(n,e,2))},hb=function(e,t,n,o){t=i(e,t),t!==null&&(n=u(t.memoizedState,n,o),t.memoizedState=n,t.baseState=n,e.memoizedProps=Lt({},e.memoizedProps),n=to(e,2),n!==null&&Hn(n,e,2))},_b=function(e,t,n){e.pendingProps=s(e.memoizedProps,t,0,n),e.alternate&&(e.alternate.pendingProps=e.pendingProps),t=to(e,2),t!==null&&Hn(t,e,2)},mb=function(e,t){e.pendingProps=h(e.memoizedProps,t,0),e.alternate&&(e.alternate.pendingProps=e.pendingProps),t=to(e,2),t!==null&&Hn(t,e,2)},pb=function(e,t,n){e.pendingProps=u(e.memoizedProps,t,n),e.alternate&&(e.alternate.pendingProps=e.pendingProps),t=to(e,2),t!==null&&Hn(t,e,2)},gb=function(e){var t=to(e,2);t!==null&&Hn(t,e,2)},yb=function(e){var t=Ot(),n=to(e,t);n!==null&&Hn(n,e,t)},bb=function(e){k=e},vb=function(e){y=e};var Oh=!0,zh=null,dp=!1,_r=null,mr=null,pr=null,pd=new Map,gd=new Map,gr=[],H4="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" "),Lh=null;if(Tf.prototype.render=$0.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error("Cannot update an unmounted root.");var n=arguments;typeof n[1]=="function"?console.error("does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."):j(n[1])?console.error("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root."):typeof n[1]<"u"&&console.error("You passed a second argument to root.render(...) but it only accepts one argument."),n=e;var o=t.current,l=vl(o);A0(o,l,n,t,null,null)},Tf.prototype.unmount=$0.prototype.unmount=function(){var e=arguments;if(typeof e[0]=="function"&&console.error("does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."),e=this._internalRoot,e!==null){this._internalRoot=null;var t=e.containerInfo;(Gt&(mo|Tl))!==wo&&console.error("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."),A0(e.current,2,null,e,null,null),$s(),t[Wi]=null}},Tf.prototype.unstable_scheduleHydration=function(e){if(e){var t=T();e={blockedOn:null,target:e,priority:t};for(var n=0;n<gr.length&&t!==0&&t<gr[n].priority;n++);gr.splice(n,0,e),n===0&&Dy(e)}},(function(){var e=B0.version;if(e!=="19.2.8")throw Error(`Incompatible React versions: The "react" and "react-dom" packages must have the exact same version. Instead got:
  - react:      `+(e+`
  - react-dom:  19.2.8
Learn more: https://react.dev/warnings/version-mismatch`))})(),typeof Map=="function"&&Map.prototype!=null&&typeof Map.prototype.forEach=="function"&&typeof Set=="function"&&Set.prototype!=null&&typeof Set.prototype.clear=="function"&&typeof Set.prototype.forEach=="function"||console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://react.dev/link/react-polyfills"),nn.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error("Unable to find node on an unmounted component."):(e=Object.keys(e).join(","),Error("Argument appears to not be a ReactComponent. Keys: "+e));return e=$t(t),e=e!==null?jt(e):null,e=e===null?null:e.stateNode,e},!(function(){var e={bundleType:1,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:V,reconcilerVersion:"19.2.8"};return e.overrideHookState=db,e.overrideHookStateDeletePath=fb,e.overrideHookStateRenamePath=hb,e.overrideProps=_b,e.overridePropsDeletePath=mb,e.overridePropsRenamePath=pb,e.scheduleUpdate=gb,e.scheduleRetry=yb,e.setErrorHandler=bb,e.setSuspenseHandler=vb,e.scheduleRefresh=X,e.scheduleRoot=Z,e.setRefreshHandler=re,e.getCurrentFiber=Yx,pe(e)})()&&Ba&&window.top===window.self&&(-1<navigator.userAgent.indexOf("Chrome")&&navigator.userAgent.indexOf("Edge")===-1||-1<navigator.userAgent.indexOf("Firefox"))){var xb=window.location.protocol;/^(https?|file):$/.test(xb)&&console.info("%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools"+(xb==="file:"?`
You might need to use a local HTTP server (instead of file://): https://react.dev/link/react-devtools-faq`:""),"font-weight:bold")}Bh.createRoot=function(e,t){if(!j(e))throw Error("Target container is not a DOM element.");Ly(e);var n=!1,o="",l=Ag,a=Og,r=zg;return t!=null&&(t.hydrate?console.warn("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead."):typeof t=="object"&&t!==null&&t.$$typeof===Aa&&console.error(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`),t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(o=t.identifierPrefix),t.onUncaughtError!==void 0&&(l=t.onUncaughtError),t.onCaughtError!==void 0&&(a=t.onCaughtError),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=Sy(e,1,!1,null,null,n,o,null,l,a,r,zy),e[Wi]=t.current,g0(e),new $0(t)},Bh.hydrateRoot=function(e,t,n){if(!j(e))throw Error("Target container is not a DOM element.");Ly(e),t===void 0&&console.error("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");var o=!1,l="",a=Ag,r=Og,c=zg,d=null;return n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onUncaughtError!==void 0&&(a=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(c=n.onRecoverableError),n.formState!==void 0&&(d=n.formState)),t=Sy(e,1,!0,t,n??null,o,l,d,a,r,c,zy),t.context=Cy(null),n=t.current,o=vl(n),o=Oe(o),l=$i(o),l.callback=null,Bi(n,l,o),ya(o,"hydrateRoot()",null),n=o,t.current.lanes=n,Ze(t,n),Ra(t),e[Wi]=t.current,g0(e),new Tf(t)},Bh.version="19.2.8",typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())})()});var Ob=ha((y7,Ab)=>{"use strict";Ab.exports=Db()});var zb=ha(Hh=>{"use strict";(function(){function i(Q){if(Q==null)return null;if(typeof Q=="function")return Q.$$typeof===Ve?null:Q.displayName||Q.name||null;if(typeof Q=="string")return Q;switch(Q){case j:return"Fragment";case De:return"Profiler";case J:return"StrictMode";case jt:return"Suspense";case Me:return"SuspenseList";case ue:return"Activity"}if(typeof Q=="object")switch(typeof Q.tag=="number"&&console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),Q.$$typeof){case re:return"Portal";case Ge:return Q.displayName||"Context";case Ie:return(Q._context.displayName||"Context")+".Consumer";case $t:var qe=Q.render;return Q=Q.displayName,Q||(Q=qe.displayName||qe.name||"",Q=Q!==""?"ForwardRef("+Q+")":"ForwardRef"),Q;case Xe:return qe=Q.displayName||null,qe!==null?qe:i(Q.type)||"Memo";case wt:qe=Q._payload,Q=Q._init;try{return i(Q(qe))}catch{}}return null}function s(Q){return""+Q}function u(Q){try{s(Q);var qe=!1}catch{qe=!0}if(qe){qe=console;var at=qe.error,ht=typeof Symbol=="function"&&Symbol.toStringTag&&Q[Symbol.toStringTag]||Q.constructor.name||"Object";return at.call(qe,"The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",ht),s(Q)}}function f(Q){if(Q===j)return"<>";if(typeof Q=="object"&&Q!==null&&Q.$$typeof===wt)return"<...>";try{var qe=i(Q);return qe?"<"+qe+">":"<...>"}catch{return"<...>"}}function h(){var Q=Ye.A;return Q===null?null:Q.getOwner()}function y(){return Error("react-stack-top-frame")}function k(Q){if(Be.call(Q,"key")){var qe=Object.getOwnPropertyDescriptor(Q,"key").get;if(qe&&qe.isReactWarning)return!1}return Q.key!==void 0}function E(Q,qe){function at(){me||(me=!0,console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",qe))}at.isReactWarning=!0,Object.defineProperty(Q,"key",{get:at,configurable:!0})}function A(){var Q=i(this.type);return ye[Q]||(ye[Q]=!0,console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")),Q=this.props.ref,Q!==void 0?Q:null}function ie(Q,qe,at,ht,Rn,Oo){var It=at.ref;return Q={$$typeof:X,type:Q,key:qe,props:at,_owner:ht},(It!==void 0?It:null)!==null?Object.defineProperty(Q,"ref",{enumerable:!1,get:A}):Object.defineProperty(Q,"ref",{enumerable:!1,value:null}),Q._store={},Object.defineProperty(Q._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:0}),Object.defineProperty(Q,"_debugInfo",{configurable:!1,enumerable:!1,writable:!0,value:null}),Object.defineProperty(Q,"_debugStack",{configurable:!1,enumerable:!1,writable:!0,value:Rn}),Object.defineProperty(Q,"_debugTask",{configurable:!1,enumerable:!1,writable:!0,value:Oo}),Object.freeze&&(Object.freeze(Q.props),Object.freeze(Q)),Q}function B(Q,qe,at,ht,Rn,Oo){var It=qe.children;if(It!==void 0)if(ht)if(Fe(It)){for(ht=0;ht<It.length;ht++)$(It[ht]);Object.freeze&&Object.freeze(It)}else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");else $(It);if(Be.call(qe,"key")){It=i(Q);var En=Object.keys(qe).filter(function(nl){return nl!=="key"});ht=0<En.length?"{key: someKey, "+En.join(": ..., ")+": ...}":"{key: someKey}",vt[It+ht]||(En=0<En.length?"{"+En.join(": ..., ")+": ...}":"{}",console.error(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,ht,It,En,It),vt[It+ht]=!0)}if(It=null,at!==void 0&&(u(at),It=""+at),k(qe)&&(u(qe.key),It=""+qe.key),"key"in qe){at={};for(var eo in qe)eo!=="key"&&(at[eo]=qe[eo])}else at=qe;return It&&E(at,typeof Q=="function"?Q.displayName||Q.name||"Unknown":Q),ie(Q,It,at,h(),Rn,Oo)}function $(Q){v(Q)?Q._store&&(Q._store.validated=1):typeof Q=="object"&&Q!==null&&Q.$$typeof===wt&&(Q._payload.status==="fulfilled"?v(Q._payload.value)&&Q._payload.value._store&&(Q._payload.value._store.validated=1):Q._store&&(Q._store.validated=1))}function v(Q){return typeof Q=="object"&&Q!==null&&Q.$$typeof===X}var Z=Dl(),X=Symbol.for("react.transitional.element"),re=Symbol.for("react.portal"),j=Symbol.for("react.fragment"),J=Symbol.for("react.strict_mode"),De=Symbol.for("react.profiler"),Ie=Symbol.for("react.consumer"),Ge=Symbol.for("react.context"),$t=Symbol.for("react.forward_ref"),jt=Symbol.for("react.suspense"),Me=Symbol.for("react.suspense_list"),Xe=Symbol.for("react.memo"),wt=Symbol.for("react.lazy"),ue=Symbol.for("react.activity"),Ve=Symbol.for("react.client.reference"),Ye=Z.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Be=Object.prototype.hasOwnProperty,Fe=Array.isArray,ne=console.createTask?console.createTask:function(){return null};Z={react_stack_bottom_frame:function(Q){return Q()}};var me,ye={},oe=Z.react_stack_bottom_frame.bind(Z,y)(),Ee=ne(f(y)),vt={};Hh.Fragment=j,Hh.jsx=function(Q,qe,at){var ht=1e4>Ye.recentlyCreatedOwnerStacks++;return B(Q,qe,at,!1,ht?Error("react-stack-top-frame"):oe,ht?ne(f(Q)):Ee)},Hh.jsxs=function(Q,qe,at){var ht=1e4>Ye.recentlyCreatedOwnerStacks++;return B(Q,qe,at,!0,ht?Error("react-stack-top-frame"):oe,ht?ne(f(Q)):Ee)}})()});var Ko=ha((v7,Lb)=>{"use strict";Lb.exports=zb()});function h6(){if(typeof window>"u")return{frozen:!1,installed:!0,origSetTimeout:setTimeout,origSetInterval:setInterval,origRAF:s=>0,pausedAnimations:[],frozenTimeoutQueue:[],frozenRAFQueue:[]};let i=window;return i[hp]||(i[hp]={frozen:!1,installed:!1,origSetTimeout:null,origSetInterval:null,origRAF:null,pausedAnimations:[],frozenTimeoutQueue:[],frozenRAFQueue:[]}),i[hp]}function m6(i){return i?sv.some(s=>!!i.closest?.(`[${s}]`)):!1}function p6(){if(typeof document>"u"||Xt.frozen)return;Xt.frozen=!0,Xt.frozenTimeoutQueue=[],Xt.frozenRAFQueue=[];let i=document.getElementById(Cp);i||(i=document.createElement("style"),i.id=Cp),i.textContent=`
    *${fp},
    *${fp}::before,
    *${fp}::after {
      animation-play-state: paused !important;
      transition: none !important;
    }
  `,document.head.appendChild(i),Xt.pausedAnimations=[];try{document.getAnimations().forEach(s=>{if(s.playState!=="running")return;let u=s.effect?.target;m6(u)||(s.pause(),Xt.pausedAnimations.push(s))})}catch{}document.querySelectorAll("video").forEach(s=>{s.paused||(s.dataset.wasPaused="false",s.pause())})}function Nb(){if(typeof document>"u"||!Xt.frozen)return;Xt.frozen=!1;let i=Xt.frozenTimeoutQueue;Xt.frozenTimeoutQueue=[];for(let u of i)Xt.origSetTimeout(()=>{if(Xt.frozen){Xt.frozenTimeoutQueue.push(u);return}try{u()}catch(f){console.warn("[agentation] Error replaying queued timeout:",f)}},0);let s=Xt.frozenRAFQueue;Xt.frozenRAFQueue=[];for(let u of s)Xt.origRAF(f=>{if(Xt.frozen){Xt.frozenRAFQueue.push(u);return}u(f)});for(let u of Xt.pausedAnimations)try{u.play()}catch(f){console.warn("[agentation] Error resuming animation:",f)}Xt.pausedAnimations=[],document.getElementById(Cp)?.remove(),document.querySelectorAll("video").forEach(u=>{u.dataset.wasPaused==="false"&&(u.play().catch(()=>{}),delete u.dataset.wasPaused)})}function _p(i){if(!i)return;let s=u=>u.stopImmediatePropagation();document.addEventListener("focusin",s,!0),document.addEventListener("focusout",s,!0);try{i.focus()}finally{document.removeEventListener("focusin",s,!0),document.removeEventListener("focusout",s,!0)}}function ce({w:i,h:s=3,strong:u}){return(0,g.jsx)("div",{style:{width:typeof i=="number"?`${i}px`:i,height:s,borderRadius:2,background:u?"var(--agd-bar-strong)":"var(--agd-bar)",flexShrink:0}})}function un({w:i,h:s,radius:u=3,style:f}){return(0,g.jsx)("div",{style:{width:typeof i=="number"?`${i}px`:i,height:typeof s=="number"?`${s}px`:s,borderRadius:u,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",flexShrink:0,...f}})}function tl({size:i}){return(0,g.jsx)("div",{style:{width:i,height:i,borderRadius:"50%",border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",flexShrink:0}})}function v6({width:i,height:s}){let u=Math.max(8,s*.2);return(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",height:"100%",padding:`0 ${u}px`,gap:i*.02},children:[(0,g.jsx)(un,{w:Math.max(20,s*.5),h:Math.max(12,s*.4),radius:2}),(0,g.jsxs)("div",{style:{flex:1,display:"flex",gap:i*.03,marginLeft:i*.04},children:[(0,g.jsx)(ce,{w:i*.06}),(0,g.jsx)(ce,{w:i*.07}),(0,g.jsx)(ce,{w:i*.05}),(0,g.jsx)(ce,{w:i*.06})]}),(0,g.jsx)(un,{w:i*.1,h:Math.min(28,s*.5),radius:4})]})}function x6({width:i,height:s,text:u}){return(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:s*.05},children:[u?(0,g.jsx)("span",{style:{fontSize:Math.min(20,s*.08),fontWeight:600,color:"var(--agd-text-3)",textAlign:"center",maxWidth:"80%"},children:u}):(0,g.jsx)(ce,{w:i*.5,h:Math.max(6,s*.04),strong:!0}),(0,g.jsx)(ce,{w:i*.6}),(0,g.jsx)(ce,{w:i*.4}),(0,g.jsx)(un,{w:Math.min(140,i*.2),h:Math.min(36,s*.12),radius:6,style:{marginTop:s*.06}})]})}function w6({width:i,height:s}){let u=Math.max(3,Math.floor(s/36));return(0,g.jsxs)("div",{style:{padding:i*.08,display:"flex",flexDirection:"column",gap:s*.03},children:[(0,g.jsx)(ce,{w:i*.6,h:4,strong:!0}),Array.from({length:u},(f,h)=>(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:6},children:[(0,g.jsx)(un,{w:10,h:10,radius:2}),(0,g.jsx)(ce,{w:i*(.4+h*17%30/100)})]},h))]})}function S6({width:i,height:s}){let u=Math.max(2,Math.min(4,Math.floor(i/160)));return(0,g.jsx)("div",{style:{display:"flex",padding:`${s*.12}px ${i*.03}px`,gap:i*.05},children:Array.from({length:u},(f,h)=>(0,g.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:4},children:[(0,g.jsx)(ce,{w:"60%",h:3,strong:!0}),(0,g.jsx)(ce,{w:"80%",h:2}),(0,g.jsx)(ce,{w:"70%",h:2}),(0,g.jsx)(ce,{w:"60%",h:2})]},h))})}function C6({width:i,height:s}){return(0,g.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[(0,g.jsxs)("div",{style:{padding:"10px 12px",borderBottom:"1px solid var(--agd-stroke)",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,g.jsx)(ce,{w:i*.3,h:4,strong:!0}),(0,g.jsx)("div",{style:{width:14,height:14,border:"1px solid var(--agd-stroke)",borderRadius:3}})]}),(0,g.jsxs)("div",{style:{flex:1,padding:12,display:"flex",flexDirection:"column",gap:6},children:[(0,g.jsx)(ce,{w:"90%"}),(0,g.jsx)(ce,{w:"70%"}),(0,g.jsx)(ce,{w:"80%"})]}),(0,g.jsxs)("div",{style:{padding:"10px 12px",borderTop:"1px solid var(--agd-stroke)",display:"flex",justifyContent:"flex-end",gap:8},children:[(0,g.jsx)(un,{w:70,h:26,radius:4}),(0,g.jsx)(un,{w:70,h:26,radius:4,style:{background:"var(--agd-bar)"}})]})]})}function k6({width:i,height:s}){return(0,g.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[(0,g.jsx)("div",{style:{height:"40%",background:"var(--agd-fill)",borderBottom:"1px dashed var(--agd-stroke)"}}),(0,g.jsxs)("div",{style:{flex:1,padding:10,display:"flex",flexDirection:"column",gap:5},children:[(0,g.jsx)(ce,{w:"70%",h:4,strong:!0}),(0,g.jsx)(ce,{w:"95%",h:2}),(0,g.jsx)(ce,{w:"85%",h:2}),(0,g.jsx)(ce,{w:"50%",h:2})]})]})}function E6({width:i,height:s,text:u}){if(u)return(0,g.jsx)("div",{style:{padding:4,fontSize:Math.min(14,s*.3),lineHeight:1.5,color:"var(--agd-text-3)",wordBreak:"break-word",overflow:"hidden"},children:u});let f=Math.max(2,Math.floor(s/18));return(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:6,padding:4},children:[(0,g.jsx)(ce,{w:i*.6,h:5,strong:!0}),Array.from({length:f},(h,y)=>(0,g.jsx)(ce,{w:`${70+y*13%25}%`,h:2},y))]})}function M6({width:i,height:s}){return(0,g.jsx)("div",{style:{height:"100%",position:"relative"},children:(0,g.jsxs)("svg",{width:"100%",height:"100%",viewBox:`0 0 ${i} ${s}`,preserveAspectRatio:"none",fill:"none",children:[(0,g.jsx)("line",{x1:"0",y1:"0",x2:i,y2:s,stroke:"var(--agd-stroke)",strokeWidth:"1"}),(0,g.jsx)("line",{x1:i,y1:"0",x2:"0",y2:s,stroke:"var(--agd-stroke)",strokeWidth:"1"}),(0,g.jsx)("circle",{cx:i*.3,cy:s*.3,r:Math.min(i,s)*.08,fill:"var(--agd-fill)",stroke:"var(--agd-stroke)",strokeWidth:"0.8"})]})})}function T6({width:i,height:s}){let u=Math.max(2,Math.min(5,Math.floor(i/100))),f=Math.max(2,Math.min(6,Math.floor(s/32)));return(0,g.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[(0,g.jsx)("div",{style:{display:"flex",borderBottom:"1px solid var(--agd-stroke)",padding:"6px 0"},children:Array.from({length:u},(h,y)=>(0,g.jsx)("div",{style:{flex:1,padding:"0 8px"},children:(0,g.jsx)(ce,{w:"70%",h:3,strong:!0})},y))}),Array.from({length:f},(h,y)=>(0,g.jsx)("div",{style:{display:"flex",borderBottom:"1px solid rgba(255,255,255,0.03)",padding:"6px 0"},children:Array.from({length:u},(k,E)=>(0,g.jsx)("div",{style:{flex:1,padding:"0 8px"},children:(0,g.jsx)(ce,{w:`${50+(y*7+E*13)%40}%`,h:2})},E))},y))]})}function R6({width:i,height:s}){let u=Math.max(2,Math.floor(s/28));return(0,g.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:4,padding:4},children:Array.from({length:u},(f,h)=>(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"4px 0"},children:[(0,g.jsx)(tl,{size:8}),(0,g.jsx)(ce,{w:`${55+h*17%35}%`,h:2})]},h))})}function D6({width:i,height:s,text:u}){return(0,g.jsx)("div",{style:{height:"100%",borderRadius:Math.min(8,s/3),border:"1px solid var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center"},children:u?(0,g.jsx)("span",{style:{fontSize:Math.min(13,s*.4),fontWeight:500,color:"var(--agd-text-3)",letterSpacing:"-0.01em"},children:u}):(0,g.jsx)(ce,{w:Math.max(20,i*.5),h:3,strong:!0})})}function A6({width:i,height:s}){return(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:4,height:"100%",justifyContent:"center"},children:[(0,g.jsx)(ce,{w:Math.min(80,i*.3),h:2}),(0,g.jsx)("div",{style:{height:Math.min(36,s*.6),borderRadius:4,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",paddingLeft:8},children:(0,g.jsx)(ce,{w:"40%",h:2})})]})}function O6({width:i,height:s}){let u=Math.max(2,Math.min(5,Math.floor(s/56)));return(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:s*.04,padding:8},children:[Array.from({length:u},(f,h)=>(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[(0,g.jsx)(ce,{w:60+h*17%30,h:2}),(0,g.jsx)(un,{w:"100%",h:28,radius:4})]},h)),(0,g.jsx)(un,{w:Math.min(120,i*.35),h:30,radius:6,style:{marginTop:8,alignSelf:"flex-end",background:"var(--agd-bar)"}})]})}function z6({width:i,height:s}){let u=Math.max(2,Math.min(4,Math.floor(i/120)));return(0,g.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[(0,g.jsx)("div",{style:{display:"flex",gap:2,borderBottom:"1px solid var(--agd-stroke)"},children:Array.from({length:u},(f,h)=>(0,g.jsx)("div",{style:{padding:"8px 12px",borderBottom:h===0?"2px solid var(--agd-bar-strong)":"none"},children:(0,g.jsx)(ce,{w:60,h:3,strong:h===0})},h))}),(0,g.jsxs)("div",{style:{flex:1,padding:12,display:"flex",flexDirection:"column",gap:6},children:[(0,g.jsx)(ce,{w:"80%",h:2}),(0,g.jsx)(ce,{w:"65%",h:2}),(0,g.jsx)(ce,{w:"75%",h:2})]})]})}function L6({width:i,height:s}){let u=Math.min(i,s)/2;return(0,g.jsxs)("svg",{width:"100%",height:"100%",viewBox:`0 0 ${i} ${s}`,fill:"none",children:[(0,g.jsx)("circle",{cx:i/2,cy:s/2,r:u-1,stroke:"var(--agd-stroke)",fill:"var(--agd-fill)",strokeWidth:"1.5",strokeDasharray:"3 2"}),(0,g.jsx)("circle",{cx:i/2,cy:s*.38,r:u*.28,stroke:"var(--agd-stroke)",fill:"var(--agd-fill)",strokeWidth:"0.8"}),(0,g.jsx)("path",{d:`M${i/2-u*.55} ${s*.78} C${i/2-u*.55} ${s*.55} ${i/2+u*.55} ${s*.55} ${i/2+u*.55} ${s*.78}`,stroke:"var(--agd-stroke)",fill:"var(--agd-fill)",strokeWidth:"0.8"})]})}function N6({width:i,height:s}){return(0,g.jsx)("div",{style:{height:"100%",borderRadius:s/2,border:"1px solid var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,g.jsx)(ce,{w:Math.max(16,i*.5),h:2,strong:!0})})}function $6({width:i,height:s}){return(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:s*.08},children:[(0,g.jsx)(ce,{w:i*.5,h:Math.max(5,s*.06),strong:!0}),(0,g.jsx)(ce,{w:i*.35})]})}function B6({width:i,height:s}){return(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",height:"100%",gap:s*.04,padding:i*.04},children:[(0,g.jsx)(ce,{w:i*.3,h:4,strong:!0}),(0,g.jsx)(ce,{w:i*.7}),(0,g.jsx)(ce,{w:i*.5}),(0,g.jsxs)("div",{style:{flex:1,display:"flex",gap:i*.03,marginTop:s*.06},children:[(0,g.jsx)(un,{w:"33%",h:"100%",radius:4}),(0,g.jsx)(un,{w:"33%",h:"100%",radius:4}),(0,g.jsx)(un,{w:"33%",h:"100%",radius:4})]})]})}function H6({width:i,height:s}){let u=Math.max(2,Math.min(4,Math.floor(i/140))),f=Math.max(1,Math.min(3,Math.floor(s/120)));return(0,g.jsx)("div",{style:{display:"grid",gridTemplateColumns:`repeat(${u}, 1fr)`,gridTemplateRows:`repeat(${f}, 1fr)`,gap:6,height:"100%"},children:Array.from({length:u*f},(h,y)=>(0,g.jsx)(un,{w:"100%",h:"100%",radius:4},y))})}function U6({width:i,height:s}){let u=Math.max(2,Math.floor((s-32)/28));return(0,g.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[(0,g.jsx)("div",{style:{padding:"6px 8px",borderBottom:"1px solid var(--agd-stroke)"},children:(0,g.jsx)(ce,{w:i*.5,h:3,strong:!0})}),(0,g.jsx)("div",{style:{flex:1,padding:4,display:"flex",flexDirection:"column",gap:2},children:Array.from({length:u},(f,h)=>(0,g.jsx)("div",{style:{padding:"4px 6px",borderRadius:3,background:h===0?"var(--agd-fill)":"transparent"},children:(0,g.jsx)(ce,{w:`${50+h*17%35}%`,h:2,strong:h===0})},h))})]})}function j6({width:i,height:s}){let u=Math.min(i,s)/2;return(0,g.jsxs)("svg",{width:"100%",height:"100%",viewBox:`0 0 ${i} ${s}`,fill:"none",children:[(0,g.jsx)("rect",{x:"1",y:"1",width:i-2,height:s-2,rx:u,stroke:"var(--agd-stroke)",strokeWidth:"1"}),(0,g.jsx)("circle",{cx:i-u,cy:s/2,r:u*.7,fill:"var(--agd-bar)"})]})}function I6({width:i,height:s}){let u=Math.min(s/2,20);return(0,g.jsxs)("div",{style:{height:"100%",borderRadius:u,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:`0 ${u*.6}px`,gap:6},children:[(0,g.jsx)(tl,{size:Math.min(14,s*.4)}),(0,g.jsx)(ce,{w:"50%",h:2})]})}function Y6({width:i,height:s}){return(0,g.jsxs)("div",{style:{height:"100%",borderRadius:8,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:"0 10px",gap:8},children:[(0,g.jsx)(tl,{size:Math.min(20,s*.5)}),(0,g.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:3},children:[(0,g.jsx)(ce,{w:"60%",h:3,strong:!0}),(0,g.jsx)(ce,{w:"80%",h:2})]}),(0,g.jsx)("div",{style:{width:14,height:14,border:"1px solid var(--agd-stroke)",borderRadius:3,flexShrink:0}})]})}function X6({width:i,height:s}){return(0,g.jsxs)("svg",{width:"100%",height:"100%",viewBox:`0 0 ${i} ${s}`,fill:"none",children:[(0,g.jsx)("rect",{x:"0",y:"0",width:i,height:s,rx:s/2,stroke:"var(--agd-stroke)",strokeWidth:"0.8"}),(0,g.jsx)("rect",{x:"1",y:"1",width:i*.65,height:s-2,rx:(s-2)/2,fill:"var(--agd-bar)"})]})}function q6({width:i,height:s}){let u=Math.max(3,Math.min(7,Math.floor(i/50))),f=i/(u*2);return(0,g.jsx)("div",{style:{height:"100%",display:"flex",alignItems:"flex-end",justifyContent:"space-around",padding:"0 4px",borderBottom:"1px solid var(--agd-stroke)"},children:Array.from({length:u},(h,y)=>{let k=30+(y*37+17)%55;return(0,g.jsx)(un,{w:f,h:`${k}%`,radius:2},y)})})}function V6({width:i,height:s}){let u=Math.min(i,s)*.12;return(0,g.jsxs)("div",{style:{height:"100%",position:"relative",display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,g.jsx)(un,{w:"100%",h:"100%",radius:4}),(0,g.jsx)("div",{style:{position:"absolute",width:u*2,height:u*2,borderRadius:"50%",border:"1.5px solid var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,g.jsx)("div",{style:{width:0,height:0,borderLeft:`${u*.6}px solid var(--agd-bar-strong)`,borderTop:`${u*.4}px solid transparent`,borderBottom:`${u*.4}px solid transparent`,marginLeft:u*.15}})})]})}function Q6({width:i,height:s}){return(0,g.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,g.jsx)("div",{style:{flex:1,width:"100%",borderRadius:6,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,g.jsx)(ce,{w:"60%",h:2})}),(0,g.jsx)("div",{style:{width:8,height:8,background:"var(--agd-fill)",border:"1px dashed var(--agd-stroke)",borderTop:"none",borderLeft:"none",transform:"rotate(45deg)",marginTop:-5}})]})}function W6({width:i,height:s}){let u=Math.max(2,Math.min(4,Math.floor(i/80)));return(0,g.jsx)("div",{style:{display:"flex",alignItems:"center",height:"100%",gap:4},children:Array.from({length:u},(f,h)=>(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:4},children:[h>0&&(0,g.jsx)("span",{style:{color:"var(--agd-stroke)",fontSize:10},children:"/"}),(0,g.jsx)(ce,{w:40+h*13%20,h:2,strong:h===u-1})]},h))})}function G6({width:i,height:s}){let u=Math.max(3,Math.min(5,Math.floor(i/40))),f=Math.min(28,s*.8);return(0,g.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",gap:4},children:Array.from({length:u},(h,y)=>(0,g.jsx)(un,{w:f,h:f,radius:4,style:y===1?{background:"var(--agd-bar)"}:void 0},y))})}function Z6({width:i}){return(0,g.jsx)("div",{style:{display:"flex",alignItems:"center",height:"100%"},children:(0,g.jsx)("div",{style:{width:"100%",height:1,background:"var(--agd-stroke)"}})})}function P6({width:i,height:s}){let u=Math.max(2,Math.min(4,Math.floor(s/40)));return(0,g.jsx)("div",{style:{display:"flex",flexDirection:"column",height:"100%"},children:Array.from({length:u},(f,h)=>(0,g.jsxs)("div",{style:{borderBottom:"1px solid var(--agd-stroke)",padding:"8px 6px",display:"flex",alignItems:"center",justifyContent:"space-between",flex:h===0?2:1},children:[(0,g.jsx)(ce,{w:`${40+h*17%25}%`,h:3,strong:!0}),(0,g.jsx)("span",{style:{fontSize:8,color:"var(--agd-stroke)"},children:h===0?"\u25BC":"\u25B6"})]},h))})}function F6({width:i,height:s}){return(0,g.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",gap:6},children:[(0,g.jsxs)("div",{style:{flex:1,display:"flex",gap:6,alignItems:"center"},children:[(0,g.jsx)("span",{style:{fontSize:12,color:"var(--agd-stroke)"},children:"\u2039"}),(0,g.jsx)(un,{w:"100%",h:"100%",radius:4}),(0,g.jsx)("span",{style:{fontSize:12,color:"var(--agd-stroke)"},children:"\u203A"})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"center",gap:4},children:[(0,g.jsx)(tl,{size:5}),(0,g.jsx)(tl,{size:5}),(0,g.jsx)(tl,{size:5})]})]})}function J6({width:i,height:s}){return(0,g.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",padding:10,gap:s*.04},children:[(0,g.jsx)(ce,{w:i*.4,h:3,strong:!0}),(0,g.jsx)(ce,{w:i*.3,h:6,strong:!0}),(0,g.jsx)("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:4,width:"100%",padding:"8px 0"},children:Array.from({length:4},(u,f)=>(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:4},children:[(0,g.jsx)(tl,{size:5}),(0,g.jsx)(ce,{w:`${50+f*17%35}%`,h:2})]},f))}),(0,g.jsx)(un,{w:i*.7,h:Math.min(32,s*.1),radius:6,style:{background:"var(--agd-bar)"}})]})}function K6({width:i,height:s}){return(0,g.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",padding:10,gap:8},children:[(0,g.jsx)("span",{style:{fontSize:18,lineHeight:1,color:"var(--agd-stroke)",fontFamily:"serif"},children:"\u201C"}),(0,g.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:4},children:[(0,g.jsx)(ce,{w:"90%",h:2}),(0,g.jsx)(ce,{w:"75%",h:2}),(0,g.jsx)(ce,{w:"60%",h:2})]}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:6},children:[(0,g.jsx)(tl,{size:20}),(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:2},children:[(0,g.jsx)(ce,{w:60,h:3,strong:!0}),(0,g.jsx)(ce,{w:40,h:2})]})]})]})}function e3({width:i,height:s}){return(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:s*.08},children:[(0,g.jsx)(ce,{w:i*.5,h:Math.max(4,s*.05),strong:!0}),(0,g.jsx)(ce,{w:i*.35}),(0,g.jsx)(un,{w:Math.min(140,i*.25),h:Math.min(32,s*.15),radius:6,style:{marginTop:s*.04,background:"var(--agd-bar)"}})]})}function t3({width:i,height:s}){return(0,g.jsxs)("div",{style:{height:"100%",borderRadius:6,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:"0 10px",gap:8},children:[(0,g.jsx)("div",{style:{width:16,height:16,borderRadius:"50%",border:"1.5px solid var(--agd-bar-strong)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:(0,g.jsx)("div",{style:{width:2,height:6,background:"var(--agd-bar-strong)",borderRadius:1}})}),(0,g.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:3},children:[(0,g.jsx)(ce,{w:"40%",h:3,strong:!0}),(0,g.jsx)(ce,{w:"70%",h:2})]})]})}function n3({width:i,height:s}){return(0,g.jsxs)("div",{style:{height:"100%",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"0 12px"},children:[(0,g.jsx)(ce,{w:i*.4,h:3,strong:!0}),(0,g.jsx)(un,{w:60,h:Math.min(24,s*.6),radius:4})]})}function o3({width:i,height:s}){return(0,g.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:s*.06},children:[(0,g.jsx)(ce,{w:i*.5,h:2}),(0,g.jsx)(ce,{w:i*.4,h:Math.max(8,s*.18),strong:!0}),(0,g.jsx)(ce,{w:i*.3,h:2})]})}function l3({width:i,height:s}){let u=Math.max(3,Math.min(5,Math.floor(i/100))),f=Math.min(12,s*.35);return(0,g.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",height:"100%",padding:"0 8px"},children:Array.from({length:u},(h,y)=>(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:0,flex:1},children:[(0,g.jsx)("div",{style:{width:f,height:f,borderRadius:"50%",border:"1.5px solid var(--agd-stroke)",background:y===0?"var(--agd-bar)":"transparent",flexShrink:0}}),y<u-1&&(0,g.jsx)("div",{style:{flex:1,height:1,background:"var(--agd-stroke)",margin:"0 4px"}})]},y))})}function a3({width:i,height:s}){return(0,g.jsxs)("div",{style:{height:"100%",borderRadius:4,border:"1px solid var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center",gap:4,padding:"0 6px"},children:[(0,g.jsx)(ce,{w:Math.max(16,i*.5),h:2,strong:!0}),(0,g.jsx)("div",{style:{width:8,height:8,borderRadius:"50%",border:"1px solid var(--agd-stroke)",flexShrink:0}})]})}function i3({width:i,height:s}){let f=Math.min(s*.7,i/7.5);return(0,g.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",gap:f*.2},children:Array.from({length:5},(h,y)=>(0,g.jsx)("svg",{width:f,height:f,viewBox:"0 0 16 16",fill:"none",children:(0,g.jsx)("path",{d:"M8 1.5l2 4 4.5.7-3.25 3.1.75 4.5L8 11.4l-4 2.4.75-4.5L1.5 6.2 6 5.5z",stroke:"var(--agd-stroke)",strokeWidth:"0.8",fill:y<3?"var(--agd-bar)":"none"})},y))})}function r3({width:i,height:s}){return(0,g.jsxs)("div",{style:{height:"100%",position:"relative",borderRadius:4,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",overflow:"hidden"},children:[(0,g.jsxs)("svg",{width:"100%",height:"100%",viewBox:`0 0 ${i} ${s}`,fill:"none",style:{position:"absolute",inset:0},children:[(0,g.jsx)("line",{x1:0,y1:s*.3,x2:i,y2:s*.7,stroke:"var(--agd-stroke)",strokeWidth:"0.5",opacity:".2"}),(0,g.jsx)("line",{x1:0,y1:s*.6,x2:i,y2:s*.2,stroke:"var(--agd-stroke)",strokeWidth:"0.5",opacity:".15"}),(0,g.jsx)("line",{x1:i*.4,y1:0,x2:i*.6,y2:s,stroke:"var(--agd-stroke)",strokeWidth:"0.5",opacity:".15"})]}),(0,g.jsx)("div",{style:{position:"absolute",left:"50%",top:"40%",transform:"translate(-50%, -100%)"},children:(0,g.jsxs)("svg",{width:"16",height:"22",viewBox:"0 0 16 22",fill:"none",children:[(0,g.jsx)("path",{d:"M8 0C3.6 0 0 3.6 0 8c0 6 8 14 8 14s8-8 8-14c0-4.4-3.6-8-8-8z",fill:"var(--agd-bar)",opacity:".4"}),(0,g.jsx)("circle",{cx:"8",cy:"8",r:"3",fill:"var(--agd-fill)"})]})})]})}function s3({width:i,height:s}){let u=Math.max(3,Math.min(5,Math.floor(s/60)));return(0,g.jsxs)("div",{style:{display:"flex",height:"100%",padding:"8px 0"},children:[(0,g.jsx)("div",{style:{width:16,display:"flex",flexDirection:"column",alignItems:"center"},children:Array.from({length:u},(f,h)=>(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1},children:[(0,g.jsx)(tl,{size:8}),h<u-1&&(0,g.jsx)("div",{style:{flex:1,width:1,background:"var(--agd-stroke)"}})]},h))}),(0,g.jsx)("div",{style:{flex:1,display:"flex",flexDirection:"column",justifyContent:"space-around",paddingLeft:8},children:Array.from({length:u},(f,h)=>(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:3},children:[(0,g.jsx)(ce,{w:`${35+h*13%25}%`,h:3,strong:!0}),(0,g.jsx)(ce,{w:`${50+h*17%30}%`,h:2})]},h))})]})}function c3({width:i,height:s}){return(0,g.jsxs)("div",{style:{height:"100%",borderRadius:8,border:"2px dashed var(--agd-stroke)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:s*.06},children:[(0,g.jsxs)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",children:[(0,g.jsx)("path",{d:"M12 16V4m0 0l-4 4m4-4l4 4",stroke:"var(--agd-stroke)",strokeWidth:"1.5"}),(0,g.jsx)("path",{d:"M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2",stroke:"var(--agd-stroke)",strokeWidth:"1.5"})]}),(0,g.jsx)(ce,{w:i*.4,h:2}),(0,g.jsx)(ce,{w:i*.25,h:2})]})}function u3({width:i,height:s}){let u=Math.max(3,Math.min(8,Math.floor(s/20)));return(0,g.jsxs)("div",{style:{height:"100%",borderRadius:6,background:"var(--agd-fill)",border:"1px solid var(--agd-stroke)",padding:8,display:"flex",flexDirection:"column",gap:4},children:[(0,g.jsxs)("div",{style:{display:"flex",gap:3,marginBottom:4},children:[(0,g.jsx)(tl,{size:6}),(0,g.jsx)(tl,{size:6}),(0,g.jsx)(tl,{size:6})]}),Array.from({length:u},(f,h)=>(0,g.jsx)("div",{style:{display:"flex",gap:6,paddingLeft:h>0&&h<u-1?12:0},children:(0,g.jsx)(ce,{w:`${25+h*23%50}%`,h:2,strong:h===0})},h))]})}function d3({width:i,height:s}){let h=Math.min((i-16)/7,(s-40)/6);return(0,g.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 8px"},children:[(0,g.jsx)("span",{style:{fontSize:8,color:"var(--agd-stroke)"},children:"\u2039"}),(0,g.jsx)(ce,{w:i*.3,h:3,strong:!0}),(0,g.jsx)("span",{style:{fontSize:8,color:"var(--agd-stroke)"},children:"\u203A"})]}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(7, 1fr)",gap:2,padding:"0 4px",flex:1},children:[Array.from({length:7},(y,k)=>(0,g.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:h*.6},children:(0,g.jsx)(ce,{w:h*.5,h:2})},`h${k}`)),Array.from({length:35},(y,k)=>(0,g.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:h},children:(0,g.jsx)("div",{style:{width:h*.6,height:h*.6,borderRadius:"50%",background:k===12?"var(--agd-bar)":"transparent",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,g.jsx)("div",{style:{width:2,height:2,borderRadius:1,background:"var(--agd-bar-strong)",opacity:k===12?1:.3}})})},k))]})]})}function f3({width:i,height:s}){return(0,g.jsxs)("div",{style:{height:"100%",borderRadius:8,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:"0 10px",gap:8},children:[(0,g.jsx)(tl,{size:Math.min(32,s*.55)}),(0,g.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:3},children:[(0,g.jsx)(ce,{w:"50%",h:3,strong:!0}),(0,g.jsx)(ce,{w:"75%",h:2})]}),(0,g.jsx)(ce,{w:30,h:2})]})}function h3({width:i,height:s}){return(0,g.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[(0,g.jsx)("div",{style:{height:"50%",background:"var(--agd-fill)",borderBottom:"1px dashed var(--agd-stroke)"}}),(0,g.jsxs)("div",{style:{flex:1,padding:10,display:"flex",flexDirection:"column",gap:5},children:[(0,g.jsx)(ce,{w:"65%",h:4,strong:!0}),(0,g.jsx)(ce,{w:"40%",h:3}),(0,g.jsx)("div",{style:{flex:1}}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,g.jsx)(ce,{w:"30%",h:5,strong:!0}),(0,g.jsx)(un,{w:Math.min(70,i*.3),h:26,radius:4,style:{background:"var(--agd-bar)"}})]})]})]})}function _3({width:i,height:s}){let u=Math.min(48,s*.3);return(0,g.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:s*.06},children:[(0,g.jsx)(tl,{size:u}),(0,g.jsx)(ce,{w:i*.45,h:4,strong:!0}),(0,g.jsx)(ce,{w:i*.3,h:2}),(0,g.jsxs)("div",{style:{display:"flex",gap:i*.08,marginTop:s*.04},children:[(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[(0,g.jsx)(ce,{w:20,h:3,strong:!0}),(0,g.jsx)(ce,{w:28,h:2})]}),(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[(0,g.jsx)(ce,{w:20,h:3,strong:!0}),(0,g.jsx)(ce,{w:28,h:2})]}),(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[(0,g.jsx)(ce,{w:20,h:3,strong:!0}),(0,g.jsx)(ce,{w:28,h:2})]})]})]})}function m3({width:i,height:s}){let u=Math.max(i*.6,80),f=Math.max(3,Math.floor(s/40));return(0,g.jsxs)("div",{style:{height:"100%",display:"flex"},children:[(0,g.jsx)("div",{style:{width:i-u,background:"var(--agd-fill)",opacity:.3}}),(0,g.jsxs)("div",{style:{flex:1,borderLeft:"1px solid var(--agd-stroke)",display:"flex",flexDirection:"column",padding:i*.04},children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:s*.06},children:[(0,g.jsx)(ce,{w:u*.4,h:4,strong:!0}),(0,g.jsx)("div",{style:{width:12,height:12,border:"1px solid var(--agd-stroke)",borderRadius:3}})]}),Array.from({length:f},(h,y)=>(0,g.jsx)("div",{style:{padding:"6px 0"},children:(0,g.jsx)(ce,{w:`${50+y*17%35}%`,h:2,strong:y===0})},y))]})]})}function p3({width:i,height:s}){return(0,g.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,g.jsxs)("div",{style:{flex:1,width:"100%",borderRadius:8,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",padding:10,display:"flex",flexDirection:"column",gap:5},children:[(0,g.jsx)(ce,{w:"70%",h:3,strong:!0}),(0,g.jsx)(ce,{w:"90%",h:2}),(0,g.jsx)(ce,{w:"60%",h:2})]}),(0,g.jsx)("div",{style:{width:10,height:10,background:"var(--agd-fill)",border:"1px dashed var(--agd-stroke)",borderTop:"none",borderLeft:"none",transform:"rotate(45deg)",marginTop:-6}})]})}function g3({width:i,height:s}){let u=Math.min(s*.7,i*.3);return(0,g.jsxs)("div",{style:{height:"100%",display:"flex",alignItems:"center",gap:i*.08},children:[(0,g.jsx)(un,{w:u,h:u,radius:u*.25}),(0,g.jsx)(ce,{w:i*.45,h:Math.max(4,s*.2),strong:!0})]})}function y3({width:i,height:s}){let u=Math.max(2,Math.min(5,Math.floor(s/56)));return(0,g.jsx)("div",{style:{display:"flex",flexDirection:"column",height:"100%"},children:Array.from({length:u},(f,h)=>(0,g.jsxs)("div",{style:{borderBottom:"1px solid var(--agd-stroke)",padding:"8px 6px",display:"flex",alignItems:"center",justifyContent:"space-between",flex:h===0?2:1},children:[(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:6},children:[(0,g.jsx)("span",{style:{fontSize:9,fontWeight:700,color:"var(--agd-stroke)"},children:"Q"}),(0,g.jsx)(ce,{w:i*(.3+h*13%25/100),h:3,strong:!0})]}),(0,g.jsx)("span",{style:{fontSize:8,color:"var(--agd-stroke)"},children:h===0?"\u25BC":"\u25B6"})]},h))})}function b3({width:i,height:s}){let u=Math.max(2,Math.min(4,Math.floor(i/120))),f=Math.max(1,Math.min(3,Math.floor(s/120)));return(0,g.jsx)("div",{style:{display:"grid",gridTemplateColumns:`repeat(${u}, 1fr)`,gridTemplateRows:`repeat(${f}, 1fr)`,gap:4,height:"100%"},children:Array.from({length:u*f},(h,y)=>(0,g.jsx)("div",{style:{borderRadius:4,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",position:"relative",overflow:"hidden"},children:(0,g.jsxs)("svg",{width:"100%",height:"100%",viewBox:"0 0 100 100",preserveAspectRatio:"none",fill:"none",children:[(0,g.jsx)("line",{x1:"0",y1:"0",x2:"100",y2:"100",stroke:"var(--agd-stroke)",strokeWidth:"0.5"}),(0,g.jsx)("line",{x1:"100",y1:"0",x2:"0",y2:"100",stroke:"var(--agd-stroke)",strokeWidth:"0.5"})]})},y))})}function v3({width:i,height:s}){let u=Math.min(i,s);return(0,g.jsxs)("svg",{width:"100%",height:"100%",viewBox:`0 0 ${i} ${s}`,fill:"none",children:[(0,g.jsx)("rect",{x:"1",y:(s-u+2)/2,width:u-2,height:u-2,rx:u*.15,stroke:"var(--agd-stroke)",strokeWidth:"1.5"}),(0,g.jsx)("path",{d:`M${u*.25} ${s/2}l${u*.2} ${u*.2} ${u*.3}-${u*.35}`,stroke:"var(--agd-bar)",strokeWidth:"1.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})]})}function x3({width:i,height:s}){let u=Math.min(i,s)/2-1;return(0,g.jsxs)("svg",{width:"100%",height:"100%",viewBox:`0 0 ${i} ${s}`,fill:"none",children:[(0,g.jsx)("circle",{cx:i/2,cy:s/2,r:u,stroke:"var(--agd-stroke)",strokeWidth:"1.5"}),(0,g.jsx)("circle",{cx:i/2,cy:s/2,r:u*.45,fill:"var(--agd-bar)"})]})}function w3({width:i,height:s}){let u=Math.max(2,s*.12),f=Math.min(s*.35,10),h=i*.55;return(0,g.jsxs)("div",{style:{height:"100%",display:"flex",alignItems:"center",position:"relative"},children:[(0,g.jsx)("div",{style:{width:"100%",height:u,borderRadius:u/2,background:"var(--agd-fill)",border:"1px solid var(--agd-stroke)",position:"relative"},children:(0,g.jsx)("div",{style:{width:h,height:"100%",borderRadius:u/2,background:"var(--agd-bar)"}})}),(0,g.jsx)("div",{style:{position:"absolute",left:h-f,width:f*2,height:f*2,borderRadius:"50%",border:"1.5px solid var(--agd-stroke)",background:"var(--agd-fill)"}})]})}function S3({width:i,height:s}){let u=Math.min(36,s*.15),f=7,h=4,y=Math.min((i-16)/f,(s-u-40)/(h+1));return(0,g.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",gap:4},children:[(0,g.jsxs)("div",{style:{height:u,borderRadius:4,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:"0 8px",justifyContent:"space-between"},children:[(0,g.jsx)(ce,{w:"40%",h:2}),(0,g.jsxs)("svg",{width:"12",height:"12",viewBox:"0 0 16 16",fill:"none",children:[(0,g.jsx)("rect",{x:"2",y:"3",width:"12",height:"11",rx:"1",stroke:"var(--agd-stroke)",strokeWidth:"1"}),(0,g.jsx)("line",{x1:"2",y1:"6",x2:"14",y2:"6",stroke:"var(--agd-stroke)",strokeWidth:"0.5"})]})]}),(0,g.jsxs)("div",{style:{flex:1,borderRadius:6,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",flexDirection:"column"},children:[(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"4px 6px"},children:[(0,g.jsx)("span",{style:{fontSize:7,color:"var(--agd-stroke)"},children:"\u2039"}),(0,g.jsx)(ce,{w:i*.25,h:2,strong:!0}),(0,g.jsx)("span",{style:{fontSize:7,color:"var(--agd-stroke)"},children:"\u203A"})]}),(0,g.jsx)("div",{style:{display:"grid",gridTemplateColumns:`repeat(${f}, 1fr)`,gap:1,padding:"0 4px",flex:1},children:Array.from({length:f*h},(k,E)=>(0,g.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:y},children:(0,g.jsx)("div",{style:{width:y*.5,height:y*.5,borderRadius:"50%",background:E===10?"var(--agd-bar)":"transparent"},children:(0,g.jsx)("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,g.jsx)("div",{style:{width:1.5,height:1.5,borderRadius:1,background:"var(--agd-bar-strong)",opacity:E===10?1:.25}})})})},E))})]})]})}function C3({width:i,height:s}){return(0,g.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",gap:s*.08,padding:4},children:[(0,g.jsx)("div",{style:{width:"100%",height:s*.2,borderRadius:4,background:"var(--agd-fill)"}}),(0,g.jsx)("div",{style:{width:"70%",height:Math.max(6,s*.1),borderRadius:3,background:"var(--agd-fill)"}}),(0,g.jsx)("div",{style:{width:"90%",height:Math.max(4,s*.06),borderRadius:3,background:"var(--agd-fill)"}}),(0,g.jsx)("div",{style:{width:"50%",height:Math.max(4,s*.06),borderRadius:3,background:"var(--agd-fill)"}})]})}function k3({width:i,height:s}){return(0,g.jsx)("div",{style:{height:"100%",display:"flex",alignItems:"center",gap:6},children:(0,g.jsxs)("div",{style:{height:"100%",flex:1,borderRadius:s/2,border:"1px solid var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:`0 ${s*.3}px`,gap:4},children:[(0,g.jsx)(ce,{w:"60%",h:2,strong:!0}),(0,g.jsx)("div",{style:{width:Math.max(6,s*.3),height:Math.max(6,s*.3),borderRadius:"50%",border:"1px solid var(--agd-stroke)",flexShrink:0,marginLeft:"auto"}})]})})}function E3({width:i,height:s}){let u=Math.min(i,s);return(0,g.jsx)("svg",{width:"100%",height:"100%",viewBox:`0 0 ${i} ${s}`,fill:"none",children:(0,g.jsx)("path",{d:`M${i/2} ${(s-u)/2+u*.1}l${u*.12} ${u*.25} ${u*.28} ${u*.04}-${u*.2} ${u*.2} ${u*.05} ${u*.28}-${u*.25}-${u*.12}-${u*.25} ${u*.12} ${u*.05}-${u*.28}-${u*.2}-${u*.2} ${u*.28}-${u*.04}z`,stroke:"var(--agd-stroke)",strokeWidth:"1",fill:"var(--agd-fill)"})})}function M3({width:i,height:s}){let u=Math.min(i,s)/2-2;return(0,g.jsxs)("svg",{width:"100%",height:"100%",viewBox:`0 0 ${i} ${s}`,fill:"none",children:[(0,g.jsx)("circle",{cx:i/2,cy:s/2,r:u,stroke:"var(--agd-stroke)",strokeWidth:"1.5",opacity:".2"}),(0,g.jsx)("path",{d:`M${i/2} ${s/2-u}a${u} ${u} 0 0 1 ${u} ${u}`,stroke:"var(--agd-bar-strong)",strokeWidth:"1.5",strokeLinecap:"round"})]})}function T3({width:i,height:s}){let u=Math.min(36,s*.25,i*.12),f=Math.max(1,Math.min(3,Math.floor(s/80)));return(0,g.jsx)("div",{style:{display:"flex",flexDirection:"column",height:"100%",justifyContent:"space-around",padding:8},children:Array.from({length:f},(h,y)=>(0,g.jsxs)("div",{style:{display:"flex",gap:i*.04,alignItems:"flex-start"},children:[(0,g.jsx)(un,{w:u,h:u,radius:u*.25}),(0,g.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:4},children:[(0,g.jsx)(ce,{w:`${40+y*13%20}%`,h:3,strong:!0}),(0,g.jsx)(ce,{w:`${60+y*17%25}%`,h:2})]})]},y))})}function R3({width:i,height:s}){let u=Math.max(2,Math.min(4,Math.floor(i/120))),f=Math.min(36,s*.25);return(0,g.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:s*.06,padding:s*.06},children:[(0,g.jsx)(ce,{w:i*.3,h:4,strong:!0}),(0,g.jsx)("div",{style:{display:"flex",gap:i*.06,justifyContent:"center",flex:1,alignItems:"center"},children:Array.from({length:u},(h,y)=>(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6},children:[(0,g.jsx)(tl,{size:f}),(0,g.jsx)(ce,{w:i*.12,h:3,strong:!0}),(0,g.jsx)(ce,{w:i*.08,h:2})]},y))})]})}function D3({width:i,height:s}){let u=Math.max(2,Math.min(3,Math.floor(s/80)));return(0,g.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",padding:i*.06,gap:s*.04},children:[(0,g.jsx)(ce,{w:i*.5,h:Math.max(5,s*.04),strong:!0}),(0,g.jsx)(ce,{w:i*.35,h:2}),(0,g.jsx)("div",{style:{width:"100%",display:"flex",flexDirection:"column",gap:s*.03,marginTop:s*.04},children:Array.from({length:u},(f,h)=>(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:3},children:[(0,g.jsx)(ce,{w:Math.min(60,i*.2),h:2}),(0,g.jsx)(un,{w:"100%",h:Math.min(32,s*.1),radius:4})]},h))}),(0,g.jsx)(un,{w:"100%",h:Math.min(36,s*.12),radius:6,style:{marginTop:s*.03,background:"var(--agd-bar)"}}),(0,g.jsx)(ce,{w:i*.4,h:2})]})}function A3({width:i,height:s}){return(0,g.jsxs)("div",{style:{height:"100%",display:"flex",flexDirection:"column",padding:i*.04,gap:s*.03},children:[(0,g.jsx)(ce,{w:i*.4,h:4,strong:!0}),(0,g.jsx)(ce,{w:i*.6,h:2}),(0,g.jsxs)("div",{style:{display:"flex",gap:6,marginTop:s*.03},children:[(0,g.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:3},children:[(0,g.jsx)(ce,{w:50,h:2}),(0,g.jsx)(un,{w:"100%",h:Math.min(28,s*.1),radius:4})]}),(0,g.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:3},children:[(0,g.jsx)(ce,{w:40,h:2}),(0,g.jsx)(un,{w:"100%",h:Math.min(28,s*.1),radius:4})]})]}),(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:3},children:[(0,g.jsx)(ce,{w:50,h:2}),(0,g.jsx)(un,{w:"100%",h:Math.min(28,s*.1),radius:4})]}),(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:3,flex:1},children:[(0,g.jsx)(ce,{w:60,h:2}),(0,g.jsx)(un,{w:"100%",h:"100%",radius:4})]}),(0,g.jsx)(un,{w:Math.min(120,i*.3),h:Math.min(30,s*.1),radius:6,style:{alignSelf:"flex-end",background:"var(--agd-bar)"}})]})}function z3({type:i,width:s,height:u,text:f}){let h=O3[i];return h?(0,g.jsx)("div",{style:{width:"100%",height:"100%",padding:8,position:"relative",pointerEvents:"none"},children:(0,g.jsx)(h,{width:s,height:u,text:f})}):(0,g.jsx)("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,g.jsx)("span",{style:{fontSize:10,fontWeight:600,color:"var(--agd-text-3)",textTransform:"uppercase",letterSpacing:"0.06em",opacity:.5},children:i})})}function Bb(i,s,u,f,h){let y=1/0,k=1/0,E=i.x,A=i.x+i.width,ie=i.x+i.width/2,B=i.y,$=i.y+i.height,v=i.y+i.height/2,Z=!f,X=Z?[E,A,ie]:[...f.left?[E]:[],...f.right?[A]:[]],re=Z?[B,$,v]:[...f.top?[B]:[],...f.bottom?[$]:[]],j=[];for(let Ve of s)u.has(Ve.id)||j.push(Ve);h&&j.push(...h);for(let Ve of j){let Ye=Ve.x,Be=Ve.x+Ve.width,Fe=Ve.x+Ve.width/2,ne=Ve.y,me=Ve.y+Ve.height,ye=Ve.y+Ve.height/2;for(let oe of X)for(let Ee of[Ye,Be,Fe]){let vt=Ee-oe;Math.abs(vt)<Uh&&Math.abs(vt)<Math.abs(y)&&(y=vt)}for(let oe of re)for(let Ee of[ne,me,ye]){let vt=Ee-oe;Math.abs(vt)<Uh&&Math.abs(vt)<Math.abs(k)&&(k=vt)}}let J=Math.abs(y)<Uh?y:0,De=Math.abs(k)<Uh?k:0,Ie=[],Ge=new Set,$t=E+J,jt=A+J,Me=ie+J,Xe=B+De,wt=$+De,ue=v+De;for(let Ve of j){let Ye=Ve.x,Be=Ve.x+Ve.width,Fe=Ve.x+Ve.width/2,ne=Ve.y,me=Ve.y+Ve.height,ye=Ve.y+Ve.height/2;for(let oe of[Ye,Fe,Be])for(let Ee of[$t,Me,jt])if(Math.abs(Ee-oe)<.5){let vt=`x:${Math.round(oe)}`;Ge.has(vt)||(Ge.add(vt),Ie.push({axis:"x",pos:oe}))}for(let oe of[ne,ye,me])for(let Ee of[Xe,ue,wt])if(Math.abs(Ee-oe)<.5){let vt=`y:${Math.round(oe)}`;Ge.has(vt)||(Ge.add(vt),Ie.push({axis:"y",pos:oe}))}}return{dx:J,dy:De,guides:Ie}}function Hb(){return`dp-${Date.now()}-${Math.random().toString(36).slice(2,7)}`}function $3({placements:i,onChange:s,activeComponent:u,onActiveComponentChange:f,isDarkMode:h,exiting:y,onInteractionChange:k,className:E,passthrough:A,extraSnapRects:ie,onSelectionChange:B,deselectSignal:$,onDragMove:v,onDragEnd:Z,clearSignal:X,wireframe:re}){let[j,J]=(0,Jt.useState)(new Set),[De,Ie]=(0,Jt.useState)(null),[Ge,$t]=(0,Jt.useState)(null),[jt,Me]=(0,Jt.useState)(null),[Xe,wt]=(0,Jt.useState)([]),[ue,Ve]=(0,Jt.useState)(null),[Ye,Be]=(0,Jt.useState)(!1),Fe=(0,Jt.useRef)(!1),[ne,me]=(0,Jt.useState)(new Set),ye=(0,Jt.useRef)(new Map),oe=(0,Jt.useRef)(null),Ee=(0,Jt.useRef)(null),vt=(0,Jt.useRef)(i);vt.current=i;let Q=(0,Jt.useRef)(B);Q.current=B;let qe=(0,Jt.useRef)(v);qe.current=v;let at=(0,Jt.useRef)(Z);at.current=Z;let ht=(0,Jt.useRef)($);(0,Jt.useEffect)(()=>{$!==ht.current&&(ht.current=$,J(new Set))},[$]);let Rn=(0,Jt.useRef)(X);(0,Jt.useEffect)(()=>{if(X!==void 0&&X!==Rn.current){Rn.current=X;let pe=new Set(vt.current.map(Se=>Se.id));pe.size>0&&(me(pe),J(new Set),Ee.current=null,rt(()=>{s([]),me(new Set)},180))}},[X,s]),(0,Jt.useEffect)(()=>{let pe=Se=>{let lt=Se.target;if(!(lt.tagName==="INPUT"||lt.tagName==="TEXTAREA"||lt.isContentEditable)){if((Se.key==="Backspace"||Se.key==="Delete")&&j.size>0){Se.preventDefault();let Je=new Set(j);me(Je),J(new Set),rt(()=>{s(vt.current.filter(Bt=>!Je.has(Bt.id))),me(new Set)},180);return}if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(Se.key)&&j.size>0){Se.preventDefault();let Je=Se.shiftKey?20:1,Bt=Se.key==="ArrowLeft"?-Je:Se.key==="ArrowRight"?Je:0,Zt=Se.key==="ArrowUp"?-Je:Se.key==="ArrowDown"?Je:0;s(i.map(Ot=>j.has(Ot.id)?{...Ot,x:Math.max(0,Ot.x+Bt),y:Math.max(0,Ot.y+Zt)}:Ot));return}if(Se.key==="Escape"){u?f(null):j.size>0&&J(new Set);return}}};return document.addEventListener("keydown",pe),()=>document.removeEventListener("keydown",pe)},[j,u,i,s,f]);let Oo=(0,Jt.useCallback)(pe=>{if(pe.button!==0||A||pe.target.closest(`.${ee.placement}`))return;pe.preventDefault(),pe.stopPropagation();let lt=window.scrollY,it=pe.clientX,Je=pe.clientY;if(u){Ee.current="place",k?.(!0);let Bt=!1,Zt=it,Ot=Je,kt=H=>{Zt=H.clientX,Ot=H.clientY;let I=Math.abs(Zt-it),te=Math.abs(Ot-Je);if((I>5||te>5)&&(Bt=!0),Bt){let le=Math.min(it,Zt),Oe=Math.min(Je,Ot),Ue=Math.abs(Zt-it),de=Math.abs(Ot-Je);Ie({x:le,y:Oe,w:Ue,h:de}),Me({x:H.clientX+12,y:H.clientY+12,text:`${Math.round(Ue)} \xD7 ${Math.round(de)}`})}},Ze=H=>{window.removeEventListener("mousemove",kt),window.removeEventListener("mouseup",Ze),Ie(null),Me(null),Ee.current=null,k?.(!1);let I=He[u],te,le,Oe,Ue;Bt?(te=Math.min(it,Zt),le=Math.min(Je,Ot)+lt,Oe=Math.max(kc,Math.abs(Zt-it)),Ue=Math.max(kc,Math.abs(Ot-Je))):(Oe=I.width,Ue=I.height,te=it-Oe/2,le=Je+lt-Ue/2),te=Math.max(0,te),le=Math.max(0,le);let de={id:Hb(),type:u,x:te,y:le,width:Oe,height:Ue,scrollY:lt,timestamp:Date.now()},_=[...i,de];s(_),J(new Set([de.id])),f(null)};window.addEventListener("mousemove",kt),window.addEventListener("mouseup",Ze)}else{pe.shiftKey||J(new Set),Ee.current="select";let Bt=!1,Zt=kt=>{let Ze=Math.abs(kt.clientX-it),H=Math.abs(kt.clientY-Je);if((Ze>4||H>4)&&(Bt=!0),Bt){let I=Math.min(it,kt.clientX),te=Math.min(Je,kt.clientY);$t({x:I,y:te,w:Math.abs(kt.clientX-it),h:Math.abs(kt.clientY-Je)})}},Ot=kt=>{if(window.removeEventListener("mousemove",Zt),window.removeEventListener("mouseup",Ot),Ee.current=null,Bt){let Ze=Math.min(it,kt.clientX),H=Math.min(Je,kt.clientY)+lt,I=Math.abs(kt.clientX-it),te=Math.abs(kt.clientY-Je),le=new Set(pe.shiftKey?j:new Set);for(let Oe of i){let Ue=Oe.y-lt;Oe.x+Oe.width>Ze&&Oe.x<Ze+I&&Oe.y+Oe.height>H&&Oe.y<H+te&&le.add(Oe.id)}J(le)}$t(null)};window.addEventListener("mousemove",Zt),window.addEventListener("mouseup",Ot)}},[u,A,i,s,j]),It=(0,Jt.useCallback)((pe,Se)=>{if(pe.button!==0)return;let lt=pe.target;if(lt.closest(`.${ee.handle}`)||lt.closest(`.${ee.deleteButton}`))return;pe.preventDefault(),pe.stopPropagation();let it;pe.shiftKey?(it=new Set(j),it.has(Se)?it.delete(Se):it.add(Se)):j.has(Se)?it=new Set(j):it=new Set([Se]),J(it),(it.size!==j.size||[...it].some(_=>!j.has(_)))&&Q.current?.(it,pe.shiftKey);let Bt=window.scrollY,Zt=pe.clientX,Ot=pe.clientY,kt=new Map;for(let _ of i)it.has(_.id)&&kt.set(_.id,{x:_.x,y:_.y});Ee.current="move",k?.(!0);let Ze=!1,H=!1,I=i,te=0,le=0,Oe=new Map;for(let _ of i)kt.has(_.id)&&Oe.set(_.id,{w:_.width,h:_.height});let Ue=_=>{let T=_.clientX-Zt,W=_.clientY-Ot;if((Math.abs(T)>2||Math.abs(W)>2)&&(Ze=!0),!Ze)return;if(_.altKey&&!H){H=!0;let ct=[];for(let Kt of i)kt.has(Kt.id)&&ct.push({...Kt,id:Hb(),timestamp:Date.now()});I=[...i,...ct]}let se=1/0,K=1/0,Ae=-1/0,be=-1/0;for(let[ct,Kt]of kt){let Nn=Oe.get(ct);Nn&&(se=Math.min(se,Kt.x+T),K=Math.min(K,Kt.y+W),Ae=Math.max(Ae,Kt.x+T+Nn.w),be=Math.max(be,Kt.y+W+Nn.h))}let Te={x:se,y:K,width:Ae-se,height:be-K},{dx:ae,dy:xt,guides:pt}=Bb(Te,I,new Set(kt.keys()),void 0,ie);wt(pt);let st=T+ae,Ht=W+xt;te=st,le=Ht,s(I.map(ct=>{let Kt=kt.get(ct.id);return Kt?{...ct,x:Math.max(0,Kt.x+st),y:Math.max(0,Kt.y+Ht)}:ct})),qe.current?.(st,Ht)},de=()=>{window.removeEventListener("mousemove",Ue),window.removeEventListener("mouseup",de),Ee.current=null,k?.(!1),wt([]),at.current?.(te,le,Ze)};window.addEventListener("mousemove",Ue),window.addEventListener("mouseup",de)},[j,i,s,k]),En=(0,Jt.useCallback)((pe,Se,lt)=>{pe.preventDefault(),pe.stopPropagation();let it=i.find(le=>le.id===Se);if(!it)return;J(new Set([Se])),Ee.current="resize",k?.(!0);let Je=pe.clientX,Bt=pe.clientY,Zt=it.width,Ot=it.height,kt=it.x,Ze=it.y,H={left:lt.includes("w"),right:lt.includes("e"),top:lt.includes("n"),bottom:lt.includes("s")},I=le=>{let Oe=le.clientX-Je,Ue=le.clientY-Bt,de=Zt,_=Ot,T=kt,W=Ze;lt.includes("e")&&(de=Math.max(kc,Zt+Oe)),lt.includes("w")&&(de=Math.max(kc,Zt-Oe),T=kt+Zt-de),lt.includes("s")&&(_=Math.max(kc,Ot+Ue)),lt.includes("n")&&(_=Math.max(kc,Ot-Ue),W=Ze+Ot-_);let se={x:T,y:W,width:de,height:_},{dx:K,dy:Ae,guides:be}=Bb(se,vt.current,new Set([Se]),H,ie);wt(be),K!==0&&(H.right?de+=K:H.left&&(T+=K,de-=K)),Ae!==0&&(H.bottom?_+=Ae:H.top&&(W+=Ae,_-=Ae)),s(vt.current.map(Te=>Te.id===Se?{...Te,x:T,y:W,width:de,height:_}:Te)),Me({x:le.clientX+12,y:le.clientY+12,text:`${Math.round(de)} \xD7 ${Math.round(_)}`})},te=()=>{window.removeEventListener("mousemove",I),window.removeEventListener("mouseup",te),Me(null),Ee.current=null,k?.(!1),wt([])};window.addEventListener("mousemove",I),window.addEventListener("mouseup",te)},[i,s,k]),eo=(0,Jt.useCallback)(pe=>{Ee.current=null,me(Se=>{let lt=new Set(Se);return lt.add(pe),lt}),J(Se=>{let lt=new Set(Se);return lt.delete(pe),lt}),rt(()=>{s(vt.current.filter(Se=>Se.id!==pe)),me(Se=>{let lt=new Set(Se);return lt.delete(pe),lt})},180)},[s]),nl=new Set(["text","hero","button","badge","cta","toast","modal","card","navigation","tabs","input","search","breadcrumb","pricing","testimonial","alert","banner","tag","notification","stat","productCard"]),xe={hero:"Headline text",button:"Button label",badge:"Badge label",cta:"Call to action text",toast:"Notification message",modal:"Dialog title",card:"Card title",navigation:"Brand / nav items",tabs:"Tab labels",input:"Placeholder text",search:"Search placeholder",pricing:"Plan name or price",testimonial:"Quote text",alert:"Alert message",banner:"Banner text",tag:"Tag label",notification:"Notification message",stat:"Metric value",productCard:"Product name"},po=(0,Jt.useCallback)(pe=>{let Se=i.find(lt=>lt.id===pe);Se&&(Fe.current=!!Se.text,Ve(pe),Be(!1))},[i]),Yn=(0,Jt.useCallback)(()=>{ue&&(Be(!0),rt(()=>{Ve(null),Be(!1)},150))},[ue]);(0,Jt.useEffect)(()=>{y&&ue&&Yn()},[y]);let fo=(0,Jt.useCallback)(pe=>{ue&&(s(i.map(Se=>Se.id===ue?{...Se,text:pe.trim()||void 0}:Se)),Yn())},[ue,i,s,Yn]),sn=typeof window<"u"?window.scrollY:0,Qt=["nw","ne","se","sw"],So=re?"#f97316":"#3c82f7",we=[{dir:"n",cls:ee.edgeN,arrow:(0,xn.jsx)("svg",{width:"8",height:"6",viewBox:"0 0 8 6",fill:"none",children:(0,xn.jsx)("path",{d:"M4 0.5L1 4.5h6z",fill:So})})},{dir:"e",cls:ee.edgeE,arrow:(0,xn.jsx)("svg",{width:"6",height:"8",viewBox:"0 0 6 8",fill:"none",children:(0,xn.jsx)("path",{d:"M5.5 4L1.5 1v6z",fill:So})})},{dir:"s",cls:ee.edgeS,arrow:(0,xn.jsx)("svg",{width:"8",height:"6",viewBox:"0 0 8 6",fill:"none",children:(0,xn.jsx)("path",{d:"M4 5.5L1 1.5h6z",fill:So})})},{dir:"w",cls:ee.edgeW,arrow:(0,xn.jsx)("svg",{width:"6",height:"8",viewBox:"0 0 6 8",fill:"none",children:(0,xn.jsx)("path",{d:"M0.5 4L4.5 1v6z",fill:So})})}];return(0,xn.jsxs)(xn.Fragment,{children:[(0,xn.jsx)("div",{ref:oe,className:`${ee.overlay} ${h?"":ee.light} ${u?ee.placing:""} ${A?ee.passthrough:""} ${y?ee.overlayExiting:""} ${re?ee.wireframe:""}${E?` ${E}`:""}`,"data-feedback-toolbar":!0,onMouseDown:Oo,children:i.map(pe=>{let Se=j.has(pe.id),lt=_a[pe.type]?.label||pe.type,it=pe.y-sn;return(0,xn.jsxs)("div",{"data-design-placement":pe.id,className:`${ee.placement} ${Se?ee.selected:""} ${ne.has(pe.id)?ee.exiting:""}`,style:{left:pe.x,top:it,width:pe.width,height:pe.height,position:"fixed"},onMouseDown:Je=>It(Je,pe.id),onDoubleClick:()=>po(pe.id),children:[(0,xn.jsx)("span",{className:ee.placementLabel,children:lt}),(0,xn.jsx)("span",{className:`${ee.placementAnnotation} ${pe.text?ee.annotationVisible:""}`,children:(pe.text&&ye.current.set(pe.id,pe.text),pe.text||ye.current.get(pe.id)||"")}),(0,xn.jsx)("div",{className:ee.placementContent,children:(0,xn.jsx)(z3,{type:pe.type,width:pe.width,height:pe.height,text:pe.text})}),(0,xn.jsx)("div",{className:ee.deleteButton,onMouseDown:Je=>Je.stopPropagation(),onClick:()=>eo(pe.id),children:"\u2715"}),Qt.map(Je=>(0,xn.jsx)("div",{className:`${ee.handle} ${ee[`handle${Je.charAt(0).toUpperCase()}${Je.slice(1)}`]}`,onMouseDown:Bt=>En(Bt,pe.id,Je)},Je)),we.map(({dir:Je,cls:Bt,arrow:Zt})=>(0,xn.jsx)("div",{className:`${ee.edgeHandle} ${Bt}`,onMouseDown:Ot=>En(Ot,pe.id,Je),children:Zt},Je))]},pe.id)})}),ue&&(()=>{let pe=i.find(Ze=>Ze.id===ue);if(!pe)return null;let Se=pe.y-sn,lt=pe.x+pe.width/2,it=Se-8,Je=Se+pe.height+8,Bt=it>200,Zt=Je<window.innerHeight-100,Ot=Math.max(160,Math.min(window.innerWidth-160,lt)),kt;return Bt?kt={left:Ot,bottom:window.innerHeight-it}:Zt?kt={left:Ot,top:Je}:kt={left:Ot,top:Math.max(80,window.innerHeight/2-80)},(0,xn.jsx)(Fh,{element:_a[pe.type]?.label||pe.type,placeholder:xe[pe.type]||"Label or content text",initialValue:pe.text??"",submitLabel:Fe.current?"Save":"Set",onSubmit:fo,onCancel:Yn,onDelete:Fe.current?()=>{fo("")}:void 0,isExiting:Ye,lightMode:!h,style:kt})})(),De&&(0,xn.jsx)("div",{className:ee.drawBox,style:{left:De.x,top:De.y,width:De.w,height:De.h},"data-feedback-toolbar":!0}),Ge&&(0,xn.jsx)("div",{className:ee.selectBox,style:{left:Ge.x,top:Ge.y,width:Ge.w,height:Ge.h},"data-feedback-toolbar":!0}),jt&&(0,xn.jsx)("div",{className:ee.sizeIndicator,style:{left:jt.x,top:jt.y},"data-feedback-toolbar":!0,children:jt.text}),Xe.map((pe,Se)=>(0,xn.jsx)("div",{className:ee.guideLine,style:pe.axis==="x"?{position:"fixed",left:pe.pos,top:0,width:1,bottom:0}:{position:"fixed",left:0,top:pe.pos-sn,right:0,height:1},"data-feedback-toolbar":!0},`${pe.axis}-${pe.pos}-${Se}`))]})}function B3(i){if(!i)return"";let s=i.scrollTop>2,u=i.scrollTop+i.clientHeight<i.scrollHeight-2;return`${s?ee.fadeTop:""} ${u?ee.fadeBottom:""}`}function H3({type:i}){switch(i){case"navigation":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"1",y:"4",width:"18",height:"8",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"2.5",y:"7",width:"3",height:"1.5",rx:".5",fill:x,opacity:".4"}),(0,m.jsx)("rect",{x:"7",y:"7",width:"2.5",height:"1.5",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("rect",{x:"11",y:"7",width:"2.5",height:"1.5",rx:".5",fill:x,opacity:".25"})]});case"header":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"1",y:"2",width:"18",height:"12",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"3",y:"5.5",width:"8",height:"2",rx:".5",fill:x,opacity:".35"}),(0,m.jsx)("rect",{x:"3",y:"9",width:"12",height:"1",rx:".5",fill:x,opacity:".15"})]});case"hero":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"1",y:"1",width:"18",height:"14",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"5",y:"5",width:"10",height:"1.5",rx:".5",fill:x,opacity:".35"}),(0,m.jsx)("rect",{x:"7",y:"8",width:"6",height:"1",rx:".5",fill:x,opacity:".15"}),(0,m.jsx)("rect",{x:"7.5",y:"10.5",width:"5",height:"2.5",rx:"1",stroke:x,strokeWidth:F})]});case"section":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"1",y:"1",width:"18",height:"14",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"3",y:"4",width:"6",height:"1",rx:".5",fill:x,opacity:".3"}),(0,m.jsx)("rect",{x:"3",y:"6.5",width:"14",height:"1",rx:".5",fill:x,opacity:".15"}),(0,m.jsx)("rect",{x:"3",y:"9",width:"10",height:"1",rx:".5",fill:x,opacity:".15"})]});case"sidebar":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"1",y:"1",width:"7",height:"14",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"2.5",y:"4",width:"4",height:"1",rx:".5",fill:x,opacity:".3"}),(0,m.jsx)("rect",{x:"2.5",y:"6.5",width:"3.5",height:"1",rx:".5",fill:x,opacity:".15"}),(0,m.jsx)("rect",{x:"2.5",y:"9",width:"4",height:"1",rx:".5",fill:x,opacity:".15"})]});case"footer":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"1",y:"7",width:"18",height:"8",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"3",y:"9.5",width:"4",height:"1",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("rect",{x:"9",y:"9.5",width:"4",height:"1",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("rect",{x:"15",y:"9.5",width:"3",height:"1",rx:".5",fill:x,opacity:".2"})]});case"modal":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"3",y:"2",width:"14",height:"12",rx:"1.5",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"5",y:"4.5",width:"7",height:"1",rx:".5",fill:x,opacity:".3"}),(0,m.jsx)("rect",{x:"5",y:"7",width:"10",height:"1",rx:".5",fill:x,opacity:".15"}),(0,m.jsx)("rect",{x:"11",y:"11",width:"5",height:"2",rx:".75",stroke:x,strokeWidth:F})]});case"divider":return(0,m.jsx)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:(0,m.jsx)("line",{x1:"2",y1:"8",x2:"18",y2:"8",stroke:x,strokeWidth:"0.5",opacity:".3"})});case"card":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"1",width:"16",height:"14",rx:"1.5",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"2",y:"1",width:"16",height:"5.5",rx:"1",fill:x,opacity:".04"}),(0,m.jsx)("rect",{x:"4",y:"8.5",width:"8",height:"1",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("rect",{x:"4",y:"11",width:"11",height:"1",rx:".5",fill:x,opacity:".12"})]});case"text":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"4",width:"14",height:"1.5",rx:".5",fill:x,opacity:".3"}),(0,m.jsx)("rect",{x:"2",y:"7",width:"11",height:"1",rx:".5",fill:x,opacity:".15"}),(0,m.jsx)("rect",{x:"2",y:"9.5",width:"13",height:"1",rx:".5",fill:x,opacity:".15"}),(0,m.jsx)("rect",{x:"2",y:"12",width:"8",height:"1",rx:".5",fill:x,opacity:".12"})]});case"image":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"2",width:"16",height:"12",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("line",{x1:"2",y1:"2",x2:"18",y2:"14",stroke:x,strokeWidth:".3",opacity:".25"}),(0,m.jsx)("line",{x1:"18",y1:"2",x2:"2",y2:"14",stroke:x,strokeWidth:".3",opacity:".25"})]});case"video":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"2",width:"16",height:"12",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("path",{d:"M8.5 5.5v5l4.5-2.5z",stroke:x,strokeWidth:F,fill:x,opacity:".15"})]});case"table":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"1",y:"2",width:"18",height:"12",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("line",{x1:"1",y1:"5.5",x2:"19",y2:"5.5",stroke:x,strokeWidth:".3",opacity:".25"}),(0,m.jsx)("line",{x1:"1",y1:"9",x2:"19",y2:"9",stroke:x,strokeWidth:".3",opacity:".25"}),(0,m.jsx)("line",{x1:"7",y1:"2",x2:"7",y2:"14",stroke:x,strokeWidth:".3",opacity:".25"}),(0,m.jsx)("line",{x1:"13",y1:"2",x2:"13",y2:"14",stroke:x,strokeWidth:".3",opacity:".25"})]});case"grid":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"1.5",y:"2",width:"7",height:"5.5",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"11.5",y:"2",width:"7",height:"5.5",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"1.5",y:"9.5",width:"7",height:"5.5",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"11.5",y:"9.5",width:"7",height:"5.5",rx:"1",stroke:x,strokeWidth:F})]});case"list":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("circle",{cx:"3.5",cy:"4.5",r:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"6.5",y:"4",width:"10",height:"1",rx:".5",fill:x,opacity:".2"}),(0,m.jsx)("circle",{cx:"3.5",cy:"8",r:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"6.5",y:"7.5",width:"8",height:"1",rx:".5",fill:x,opacity:".2"}),(0,m.jsx)("circle",{cx:"3.5",cy:"11.5",r:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"6.5",y:"11",width:"11",height:"1",rx:".5",fill:x,opacity:".2"})]});case"chart":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"3",y:"9",width:"2.5",height:"4",rx:".5",fill:x,opacity:".2"}),(0,m.jsx)("rect",{x:"7",y:"6",width:"2.5",height:"7",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("rect",{x:"11",y:"3",width:"2.5",height:"10",rx:".5",fill:x,opacity:".3"}),(0,m.jsx)("rect",{x:"15",y:"5",width:"2.5",height:"8",rx:".5",fill:x,opacity:".2"})]});case"accordion":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"1.5",y:"2",width:"17",height:"4",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"3",y:"3.5",width:"6",height:"1",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("rect",{x:"1.5",y:"7.5",width:"17",height:"3",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"1.5",y:"12",width:"17",height:"3",rx:"1",stroke:x,strokeWidth:F})]});case"carousel":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"3",y:"2",width:"14",height:"10",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("path",{d:"M1.5 7L3 8.5 1.5 10",stroke:x,strokeWidth:F,opacity:".35"}),(0,m.jsx)("path",{d:"M18.5 7L17 8.5 18.5 10",stroke:x,strokeWidth:F,opacity:".35"}),(0,m.jsx)("circle",{cx:"8.5",cy:"14",r:".6",fill:x,opacity:".35"}),(0,m.jsx)("circle",{cx:"10",cy:"14",r:".6",fill:x,opacity:".15"}),(0,m.jsx)("circle",{cx:"11.5",cy:"14",r:".6",fill:x,opacity:".15"})]});case"button":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"3",y:"5",width:"14",height:"6",rx:"2",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"6.5",y:"7.5",width:"7",height:"1",rx:".5",fill:x,opacity:".25"})]});case"input":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"4",width:"5.5",height:"1",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("rect",{x:"2",y:"6.5",width:"16",height:"5.5",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"3.5",y:"8.5",width:"7",height:"1",rx:".5",fill:x,opacity:".12"})]});case"search":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"4.5",width:"16",height:"7",rx:"3.5",stroke:x,strokeWidth:F}),(0,m.jsx)("circle",{cx:"6",cy:"8",r:"2",stroke:x,strokeWidth:F,opacity:".3"}),(0,m.jsx)("line",{x1:"7.5",y1:"9.5",x2:"9",y2:"11",stroke:x,strokeWidth:F,opacity:".3"}),(0,m.jsx)("rect",{x:"9.5",y:"7.5",width:"6",height:"1",rx:".5",fill:x,opacity:".12"})]});case"form":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"1.5",width:"5.5",height:"1",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("rect",{x:"2",y:"3.5",width:"16",height:"3",rx:".75",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"2",y:"8",width:"7",height:"1",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("rect",{x:"2",y:"10",width:"16",height:"3",rx:".75",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"12",y:"14",width:"6",height:"2",rx:".75",stroke:x,strokeWidth:F})]});case"tabs":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"1",y:"5",width:"18",height:"10",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"1",y:"2",width:"6",height:"3.5",rx:".75",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"2.5",y:"3.25",width:"3",height:"1",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("rect",{x:"7",y:"2",width:"6",height:"3.5",rx:".75",stroke:x,strokeWidth:F})]});case"dropdown":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"2",width:"16",height:"4",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"3.5",y:"3.5",width:"7",height:"1",rx:".5",fill:x,opacity:".2"}),(0,m.jsx)("path",{d:"M15 3.5l1.5 1.5L18 3.5",stroke:x,strokeWidth:F,opacity:".3"}),(0,m.jsx)("rect",{x:"2",y:"7",width:"16",height:"7",rx:"1",stroke:x,strokeWidth:F,strokeDasharray:"2 1",opacity:".3"})]});case"toggle":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"4",y:"5",width:"12",height:"6",rx:"3",stroke:x,strokeWidth:F}),(0,m.jsx)("circle",{cx:"13",cy:"8",r:"2",fill:x,opacity:".3"})]});case"avatar":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("circle",{cx:"10",cy:"8",r:"6",stroke:x,strokeWidth:F}),(0,m.jsx)("circle",{cx:"10",cy:"6.5",r:"2",stroke:x,strokeWidth:F}),(0,m.jsx)("path",{d:"M6.5 13c0-2 1.5-3.5 3.5-3.5s3.5 1.5 3.5 3.5",stroke:x,strokeWidth:F})]});case"badge":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"3",y:"5",width:"14",height:"6",rx:"3",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"6",y:"7.5",width:"8",height:"1",rx:".5",fill:x,opacity:".25"})]});case"breadcrumb":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"1.5",y:"7",width:"3.5",height:"1",rx:".5",fill:x,opacity:".3"}),(0,m.jsx)("path",{d:"M6.5 7l1 1-1 1",stroke:x,strokeWidth:F,opacity:".2"}),(0,m.jsx)("rect",{x:"9",y:"7",width:"3.5",height:"1",rx:".5",fill:x,opacity:".2"}),(0,m.jsx)("path",{d:"M14 7l1 1-1 1",stroke:x,strokeWidth:F,opacity:".2"}),(0,m.jsx)("rect",{x:"16.5",y:"7",width:"2",height:"1",rx:".5",fill:x,opacity:".15"})]});case"pagination":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"5.5",width:"3.5",height:"5",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"6.5",y:"5.5",width:"3.5",height:"5",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"11",y:"5.5",width:"3.5",height:"5",rx:"1",fill:x,opacity:".15",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"15.5",y:"5.5",width:"3.5",height:"5",rx:"1",stroke:x,strokeWidth:F})]});case"progress":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"7",width:"16",height:"2",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"2",y:"7",width:"10",height:"2",rx:"1",fill:x,opacity:".2"})]});case"toast":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"4",width:"16",height:"8",rx:"1.5",stroke:x,strokeWidth:F}),(0,m.jsx)("circle",{cx:"5",cy:"8",r:"1.5",stroke:x,strokeWidth:F,opacity:".3"}),(0,m.jsx)("rect",{x:"8",y:"6.5",width:"7",height:"1",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("rect",{x:"8",y:"9",width:"5",height:"1",rx:".5",fill:x,opacity:".12"})]});case"tooltip":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"3",y:"3",width:"14",height:"7",rx:"1.5",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"5.5",y:"5.5",width:"9",height:"1",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("path",{d:"M9 10l1 2.5 1-2.5",stroke:x,strokeWidth:F})]});case"pricing":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"1",width:"16",height:"14",rx:"1.5",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"6",y:"3",width:"8",height:"1.5",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("rect",{x:"7",y:"5.5",width:"6",height:"2",rx:".5",fill:x,opacity:".15"}),(0,m.jsx)("rect",{x:"5",y:"9",width:"10",height:"1",rx:".5",fill:x,opacity:".1"}),(0,m.jsx)("rect",{x:"5",y:"11",width:"10",height:"1",rx:".5",fill:x,opacity:".1"}),(0,m.jsx)("rect",{x:"6",y:"13",width:"8",height:"1.5",rx:".5",fill:x,opacity:".2"})]});case"testimonial":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"1",width:"16",height:"14",rx:"1.5",stroke:x,strokeWidth:F}),(0,m.jsx)("text",{x:"4",y:"5.5",fontSize:"4",fill:x,opacity:".2",fontFamily:"serif",children:"\u201C"}),(0,m.jsx)("rect",{x:"4",y:"7",width:"12",height:"1",rx:".5",fill:x,opacity:".15"}),(0,m.jsx)("rect",{x:"4",y:"9",width:"9",height:"1",rx:".5",fill:x,opacity:".12"}),(0,m.jsx)("circle",{cx:"5.5",cy:"12.5",r:"1.5",stroke:x,strokeWidth:F,opacity:".25"}),(0,m.jsx)("rect",{x:"8",y:"12",width:"5",height:"1",rx:".5",fill:x,opacity:".15"})]});case"cta":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"1",y:"2",width:"18",height:"12",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"5",y:"4.5",width:"10",height:"1.5",rx:".5",fill:x,opacity:".3"}),(0,m.jsx)("rect",{x:"6",y:"7.5",width:"8",height:"1",rx:".5",fill:x,opacity:".15"}),(0,m.jsx)("rect",{x:"7",y:"10",width:"6",height:"2.5",rx:"1",stroke:x,strokeWidth:F})]});case"alert":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"4",width:"16",height:"8",rx:"1.5",stroke:x,strokeWidth:F}),(0,m.jsx)("circle",{cx:"6",cy:"8",r:"2",stroke:x,strokeWidth:F,opacity:".3"}),(0,m.jsx)("line",{x1:"6",y1:"7",x2:"6",y2:"8.5",stroke:x,strokeWidth:"0.6",opacity:".5"}),(0,m.jsx)("circle",{cx:"6",cy:"9.3",r:".3",fill:x,opacity:".5"}),(0,m.jsx)("rect",{x:"9.5",y:"7",width:"6",height:"1",rx:".5",fill:x,opacity:".2"})]});case"banner":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"1",y:"5",width:"18",height:"6",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"4",y:"7.5",width:"8",height:"1",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("rect",{x:"14",y:"7",width:"3.5",height:"2",rx:".75",stroke:x,strokeWidth:F})]});case"stat":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"3",y:"2",width:"14",height:"12",rx:"1.5",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"6",y:"4.5",width:"8",height:"1",rx:".5",fill:x,opacity:".15"}),(0,m.jsx)("rect",{x:"5",y:"7",width:"10",height:"2.5",rx:".5",fill:x,opacity:".3"}),(0,m.jsx)("rect",{x:"7",y:"11",width:"6",height:"1",rx:".5",fill:x,opacity:".12"})]});case"stepper":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("circle",{cx:"4",cy:"8",r:"2",fill:x,opacity:".2",stroke:x,strokeWidth:F}),(0,m.jsx)("line",{x1:"6",y1:"8",x2:"8",y2:"8",stroke:x,strokeWidth:".4",opacity:".3"}),(0,m.jsx)("circle",{cx:"10",cy:"8",r:"2",stroke:x,strokeWidth:F}),(0,m.jsx)("line",{x1:"12",y1:"8",x2:"14",y2:"8",stroke:x,strokeWidth:".4",opacity:".3"}),(0,m.jsx)("circle",{cx:"16",cy:"8",r:"2",stroke:x,strokeWidth:F})]});case"tag":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"3",y:"5",width:"14",height:"6",rx:"1.5",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"5.5",y:"7.5",width:"6",height:"1",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("line",{x1:"14",y1:"6.5",x2:"15.5",y2:"9.5",stroke:x,strokeWidth:F,opacity:".2"}),(0,m.jsx)("line",{x1:"15.5",y1:"6.5",x2:"14",y2:"9.5",stroke:x,strokeWidth:F,opacity:".2"})]});case"rating":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("path",{d:"M4 5.5l1 2 2.2.3-1.6 1.5.4 2.2L4 10.3l-2 1.2.4-2.2L.8 7.8 3 7.5z",fill:x,opacity:".25"}),(0,m.jsx)("path",{d:"M10 5.5l1 2 2.2.3-1.6 1.5.4 2.2L10 10.3l-2 1.2.4-2.2L6.8 7.8 9 7.5z",fill:x,opacity:".25"}),(0,m.jsx)("path",{d:"M16 5.5l1 2 2.2.3-1.6 1.5.4 2.2L16 10.3l-2 1.2.4-2.2-1.6-1.5 2.2-.3z",stroke:x,strokeWidth:F,opacity:".25"})]});case"map":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"2",width:"16",height:"12",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("line",{x1:"2",y1:"6",x2:"18",y2:"10",stroke:x,strokeWidth:".3",opacity:".15"}),(0,m.jsx)("line",{x1:"7",y1:"2",x2:"11",y2:"14",stroke:x,strokeWidth:".3",opacity:".15"}),(0,m.jsx)("path",{d:"M10 5c-1.7 0-3 1.3-3 3 0 2.5 3 5 3 5s3-2.5 3-5c0-1.7-1.3-3-3-3z",fill:x,opacity:".15",stroke:x,strokeWidth:F})]});case"timeline":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("line",{x1:"5",y1:"2",x2:"5",y2:"14",stroke:x,strokeWidth:".4",opacity:".25"}),(0,m.jsx)("circle",{cx:"5",cy:"4",r:"1.5",fill:x,opacity:".2",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"8",y:"3",width:"8",height:"1",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("circle",{cx:"5",cy:"8.5",r:"1.5",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"8",y:"7.5",width:"6",height:"1",rx:".5",fill:x,opacity:".15"}),(0,m.jsx)("circle",{cx:"5",cy:"13",r:"1.5",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"8",y:"12",width:"7",height:"1",rx:".5",fill:x,opacity:".15"})]});case"fileUpload":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"3",y:"2",width:"14",height:"12",rx:"1.5",stroke:x,strokeWidth:F,strokeDasharray:"2 1"}),(0,m.jsx)("path",{d:"M10 10V5.5m0 0L7.5 8m2.5-2.5L12.5 8",stroke:x,strokeWidth:F,opacity:".3"}),(0,m.jsx)("rect",{x:"7",y:"11.5",width:"6",height:"1",rx:".5",fill:x,opacity:".15"})]});case"codeBlock":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"2",width:"16",height:"12",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("circle",{cx:"4",cy:"4",r:".6",fill:x,opacity:".3"}),(0,m.jsx)("circle",{cx:"5.5",cy:"4",r:".6",fill:x,opacity:".3"}),(0,m.jsx)("circle",{cx:"7",cy:"4",r:".6",fill:x,opacity:".3"}),(0,m.jsx)("rect",{x:"4",y:"7",width:"7",height:"1",rx:".5",fill:x,opacity:".2"}),(0,m.jsx)("rect",{x:"6",y:"9",width:"5",height:"1",rx:".5",fill:x,opacity:".15"}),(0,m.jsx)("rect",{x:"4",y:"11",width:"8",height:"1",rx:".5",fill:x,opacity:".12"})]});case"calendar":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"3",width:"16",height:"12",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("line",{x1:"2",y1:"6.5",x2:"18",y2:"6.5",stroke:x,strokeWidth:".4",opacity:".25"}),(0,m.jsx)("rect",{x:"5",y:"4",width:"1",height:"1.5",rx:".3",fill:x,opacity:".2"}),(0,m.jsx)("rect",{x:"14",y:"4",width:"1",height:"1.5",rx:".3",fill:x,opacity:".2"}),(0,m.jsx)("circle",{cx:"7",cy:"9",r:".6",fill:x,opacity:".2"}),(0,m.jsx)("circle",{cx:"10",cy:"9",r:".6",fill:x,opacity:".2"}),(0,m.jsx)("circle",{cx:"13",cy:"9",r:".6",fill:x,opacity:".3"}),(0,m.jsx)("circle",{cx:"7",cy:"12",r:".6",fill:x,opacity:".2"}),(0,m.jsx)("circle",{cx:"10",cy:"12",r:".6",fill:x,opacity:".2"})]});case"notification":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"3",width:"16",height:"10",rx:"1.5",stroke:x,strokeWidth:F}),(0,m.jsx)("circle",{cx:"5.5",cy:"8",r:"2",stroke:x,strokeWidth:F,opacity:".25"}),(0,m.jsx)("rect",{x:"9",y:"6",width:"6",height:"1",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("rect",{x:"9",y:"8.5",width:"4.5",height:"1",rx:".5",fill:x,opacity:".12"}),(0,m.jsx)("circle",{cx:"16.5",cy:"4.5",r:"1.5",fill:x,opacity:".25"})]});case"productCard":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"3",y:"1",width:"14",height:"14",rx:"1.5",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"3",y:"1",width:"14",height:"6",rx:"1",fill:x,opacity:".04"}),(0,m.jsx)("rect",{x:"5",y:"8.5",width:"7",height:"1",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("rect",{x:"5",y:"10.5",width:"4",height:"1.5",rx:".5",fill:x,opacity:".15"}),(0,m.jsx)("rect",{x:"12",y:"12",width:"4",height:"2",rx:".75",stroke:x,strokeWidth:F})]});case"profile":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("circle",{cx:"10",cy:"5",r:"3",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"5",y:"10",width:"10",height:"1.5",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("rect",{x:"7",y:"12.5",width:"6",height:"1",rx:".5",fill:x,opacity:".12"})]});case"drawer":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"9",y:"1",width:"10",height:"14",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"10.5",y:"4",width:"5",height:"1",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("rect",{x:"10.5",y:"6.5",width:"7",height:"1",rx:".5",fill:x,opacity:".15"}),(0,m.jsx)("rect",{x:"10.5",y:"9",width:"6",height:"1",rx:".5",fill:x,opacity:".15"}),(0,m.jsx)("rect",{x:"1",y:"1",width:"7",height:"14",rx:"1",stroke:x,strokeWidth:F,opacity:".15"})]});case"popover":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"3",y:"2",width:"14",height:"9",rx:"1.5",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"5",y:"4.5",width:"8",height:"1",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("rect",{x:"5",y:"7",width:"6",height:"1",rx:".5",fill:x,opacity:".15"}),(0,m.jsx)("path",{d:"M9 11l1 2.5 1-2.5",stroke:x,strokeWidth:F})]});case"logo":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"3",width:"10",height:"10",rx:"2",stroke:x,strokeWidth:F}),(0,m.jsx)("path",{d:"M5 9.5l2-4 2 4",stroke:x,strokeWidth:F,opacity:".3"}),(0,m.jsx)("rect",{x:"14",y:"6",width:"4",height:"1",rx:".5",fill:x,opacity:".2"}),(0,m.jsx)("rect",{x:"14",y:"8.5",width:"3",height:"1",rx:".5",fill:x,opacity:".12"})]});case"faq":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("text",{x:"2.5",y:"5.5",fontSize:"4",fill:x,opacity:".3",fontWeight:"bold",children:"?"}),(0,m.jsx)("rect",{x:"7",y:"3",width:"10",height:"1",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("rect",{x:"7",y:"5.5",width:"8",height:"1",rx:".5",fill:x,opacity:".12"}),(0,m.jsx)("text",{x:"2.5",y:"11.5",fontSize:"4",fill:x,opacity:".3",fontWeight:"bold",children:"?"}),(0,m.jsx)("rect",{x:"7",y:"9",width:"9",height:"1",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("rect",{x:"7",y:"11.5",width:"7",height:"1",rx:".5",fill:x,opacity:".12"})]});case"gallery":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"1.5",y:"1.5",width:"5",height:"5",rx:".75",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"7.5",y:"1.5",width:"5",height:"5",rx:".75",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"13.5",y:"1.5",width:"5",height:"5",rx:".75",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"1.5",y:"9.5",width:"5",height:"5",rx:".75",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"7.5",y:"9.5",width:"5",height:"5",rx:".75",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"13.5",y:"9.5",width:"5",height:"5",rx:".75",stroke:x,strokeWidth:F})]});case"checkbox":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"5",y:"4",width:"8",height:"8",rx:"1.5",stroke:x,strokeWidth:F}),(0,m.jsx)("path",{d:"M7.5 8l1.5 1.5 3-3",stroke:x,strokeWidth:F,opacity:".35"})]});case"radio":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("circle",{cx:"10",cy:"8",r:"4",stroke:x,strokeWidth:F}),(0,m.jsx)("circle",{cx:"10",cy:"8",r:"2",fill:x,opacity:".3"})]});case"slider":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"7.5",width:"16",height:"1",rx:".5",fill:x,opacity:".15"}),(0,m.jsx)("rect",{x:"2",y:"7.5",width:"10",height:"1",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("circle",{cx:"12",cy:"8",r:"2.5",stroke:x,strokeWidth:F})]});case"datePicker":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"1",width:"16",height:"5",rx:"1",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"3.5",y:"3",width:"5",height:"1",rx:".5",fill:x,opacity:".2"}),(0,m.jsx)("rect",{x:"14",y:"2.5",width:"2.5",height:"2",rx:".5",fill:x,opacity:".12"}),(0,m.jsx)("rect",{x:"2",y:"7",width:"16",height:"8",rx:"1",stroke:x,strokeWidth:F,strokeDasharray:"2 1",opacity:".3"}),(0,m.jsx)("circle",{cx:"6",cy:"10",r:".6",fill:x,opacity:".2"}),(0,m.jsx)("circle",{cx:"10",cy:"10",r:".6",fill:x,opacity:".3"}),(0,m.jsx)("circle",{cx:"14",cy:"10",r:".6",fill:x,opacity:".2"}),(0,m.jsx)("circle",{cx:"6",cy:"13",r:".6",fill:x,opacity:".2"}),(0,m.jsx)("circle",{cx:"10",cy:"13",r:".6",fill:x,opacity:".2"})]});case"skeleton":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"2",width:"16",height:"3",rx:"1",fill:x,opacity:".08"}),(0,m.jsx)("rect",{x:"2",y:"7",width:"10",height:"2",rx:".75",fill:x,opacity:".08"}),(0,m.jsx)("rect",{x:"2",y:"11",width:"13",height:"2",rx:".75",fill:x,opacity:".08"})]});case"chip":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"1.5",y:"5",width:"10",height:"6",rx:"3",fill:x,opacity:".08",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"4",y:"7.5",width:"4",height:"1",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("line",{x1:"9.5",y1:"6.5",x2:"10.5",y2:"9.5",stroke:x,strokeWidth:F,opacity:".2"}),(0,m.jsx)("line",{x1:"10.5",y1:"6.5",x2:"9.5",y2:"9.5",stroke:x,strokeWidth:F,opacity:".2"}),(0,m.jsx)("rect",{x:"13",y:"5",width:"5.5",height:"6",rx:"3",stroke:x,strokeWidth:F,opacity:".25"})]});case"icon":return(0,m.jsx)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:(0,m.jsx)("path",{d:"M10 3l1.5 3 3.5.5-2.5 2.5.5 3.5L10 11l-3 1.5.5-3.5L5 6.5l3.5-.5z",stroke:x,strokeWidth:F,opacity:".3"})});case"spinner":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("circle",{cx:"10",cy:"8",r:"5",stroke:x,strokeWidth:F,opacity:".12"}),(0,m.jsx)("path",{d:"M10 3a5 5 0 0 1 5 5",stroke:x,strokeWidth:F,opacity:".35",strokeLinecap:"round"})]});case"feature":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"2",width:"5",height:"5",rx:"1.5",stroke:x,strokeWidth:F}),(0,m.jsx)("path",{d:"M4.5 3.5v3m-1.5-1.5h3",stroke:x,strokeWidth:F,opacity:".25"}),(0,m.jsx)("rect",{x:"9",y:"2.5",width:"8",height:"1.5",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("rect",{x:"9",y:"5.5",width:"6",height:"1",rx:".5",fill:x,opacity:".12"}),(0,m.jsx)("rect",{x:"2",y:"10",width:"5",height:"5",rx:"1.5",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"9",y:"10.5",width:"7",height:"1.5",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("rect",{x:"9",y:"13.5",width:"5",height:"1",rx:".5",fill:x,opacity:".12"})]});case"team":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("circle",{cx:"5",cy:"5",r:"2.5",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"2.5",y:"9",width:"5",height:"1",rx:".5",fill:x,opacity:".2"}),(0,m.jsx)("circle",{cx:"15",cy:"5",r:"2.5",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"12.5",y:"9",width:"5",height:"1",rx:".5",fill:x,opacity:".2"}),(0,m.jsx)("circle",{cx:"10",cy:"5",r:"2.5",stroke:x,strokeWidth:F,opacity:".5"}),(0,m.jsx)("rect",{x:"7.5",y:"9",width:"5",height:"1",rx:".5",fill:x,opacity:".15"}),(0,m.jsx)("rect",{x:"4",y:"12",width:"12",height:"1",rx:".5",fill:x,opacity:".1"})]});case"login":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"3",y:"1",width:"14",height:"14",rx:"1.5",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"6",y:"3",width:"8",height:"1.5",rx:".5",fill:x,opacity:".25"}),(0,m.jsx)("rect",{x:"5",y:"5.5",width:"10",height:"3",rx:".75",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"5",y:"9.5",width:"10",height:"3",rx:".75",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"6.5",y:"13.5",width:"7",height:"2",rx:".75",fill:x,opacity:".2"})]});case"contact":return(0,m.jsxs)("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[(0,m.jsx)("rect",{x:"2",y:"1",width:"16",height:"14",rx:"1.5",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"4",y:"3",width:"5",height:"1",rx:".5",fill:x,opacity:".2"}),(0,m.jsx)("rect",{x:"4",y:"5",width:"12",height:"2.5",rx:".75",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"4",y:"8.5",width:"12",height:"4",rx:".75",stroke:x,strokeWidth:F}),(0,m.jsx)("rect",{x:"11",y:"13.5",width:"5",height:"1.5",rx:".5",fill:x,opacity:".2"})]});default:return null}}function U3({activeType:i,onSelect:s,onDragStart:u,scrollRef:f,fadeClass:h,blankCanvas:y}){return(0,m.jsx)("div",{ref:f,className:`${ee.placeScroll} ${h||""}`,children:uv.map(k=>(0,m.jsxs)("div",{className:ee.paletteSection,children:[(0,m.jsx)("div",{className:ee.paletteSectionTitle,children:k.section}),k.items.map(E=>(0,m.jsxs)("div",{className:`${ee.paletteItem} ${i===E.type?ee.active:""} ${y?ee.wireframe:""}`,onClick:()=>s(E.type),onMouseDown:A=>{A.button===0&&u(E.type,A)},children:[(0,m.jsx)("div",{className:ee.paletteItemIcon,children:(0,m.jsx)(H3,{type:E.type})}),(0,m.jsx)("span",{className:ee.paletteItemLabel,children:E.label})]},E.type))]},k.section))})}function j3({value:i,suffix:s}){let[u,f]=(0,In.useState)(null),[h,y]=(0,In.useState)(s),[k,E]=(0,In.useState)("up"),A=(0,In.useRef)(i),ie=(0,In.useRef)(s),B=(0,In.useRef)(),$=u!==null&&h!==s;return(0,In.useEffect)(()=>{if(i!==A.current){if(i===0){A.current=i,ie.current=s,f(null);return}E(i>A.current?"up":"down"),f(A.current),y(ie.current),A.current=i,ie.current=s,clearTimeout(B.current),B.current=rt(()=>f(null),250)}else ie.current=s},[i,s]),u===null?(0,m.jsxs)(m.Fragment,{children:[i,s?` ${s}`:""]}):$?(0,m.jsxs)("span",{className:ee.rollingWrap,children:[(0,m.jsxs)("span",{style:{visibility:"hidden"},children:[i," ",s]}),(0,m.jsxs)("span",{className:`${ee.rollingNum} ${k==="up"?ee.exitUp:ee.exitDown}`,children:[u," ",h]},`o${u}-${i}`),(0,m.jsxs)("span",{className:`${ee.rollingNum} ${k==="up"?ee.enterUp:ee.enterDown}`,children:[i," ",s]},`n${i}`)]}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("span",{className:ee.rollingWrap,children:[(0,m.jsx)("span",{style:{visibility:"hidden"},children:i}),(0,m.jsx)("span",{className:`${ee.rollingNum} ${k==="up"?ee.exitUp:ee.exitDown}`,children:u},`o${u}-${i}`),(0,m.jsx)("span",{className:`${ee.rollingNum} ${k==="up"?ee.enterUp:ee.enterDown}`,children:i},`n${i}`)]}),s?` ${s}`:""]})}function I3({activeType:i,onSelect:s,isDarkMode:u,sectionCount:f,onDetectSections:h,visible:y,onExited:k,placementCount:E,onClearPlacements:A,onDragStart:ie,blankCanvas:B,onBlankCanvasChange:$,wireframePurpose:v,onWireframePurposeChange:Z,Tooltip:X}){let[re,j]=(0,In.useState)(!1),[J,De]=(0,In.useState)("exit"),[Ie,Ge]=(0,In.useState)(!1),[$t,jt]=(0,In.useState)(!0),Me=(0,In.useRef)(0),Xe=(0,In.useRef)(""),wt=(0,In.useRef)(0),ue=(0,In.useRef)(),Ve=(0,In.useRef)(null),[Ye,Be]=(0,In.useState)("");(0,In.useEffect)(()=>(y?(j(!0),clearTimeout(ue.current),cancelAnimationFrame(wt.current),wt.current=Tc(()=>{wt.current=Tc(()=>{De("enter")})})):(cancelAnimationFrame(wt.current),De("exit"),clearTimeout(ue.current),ue.current=rt(()=>{j(!1),k?.()},200)),()=>cancelAnimationFrame(wt.current)),[y]);let Fe=E>0||f>0,ne=E+f;if(ne>0&&(Me.current=ne,Xe.current=B?ne===1?"Component":"Components":ne===1?"Change":"Changes"),(0,In.useEffect)(()=>{if(Fe)Ie?jt(!1):(jt(!0),Ge(!0),Tc(()=>{Tc(()=>{jt(!1)})}));else{jt(!0);let ye=rt(()=>Ge(!1),300);return()=>clearTimeout(ye)}},[Fe]),(0,In.useEffect)(()=>{if(!re)return;let ye=Ve.current;if(!ye)return;let oe=()=>Be(B3(ye));oe(),ye.addEventListener("scroll",oe,{passive:!0});let Ee=new ResizeObserver(oe);return Ee.observe(ye),()=>{ye.removeEventListener("scroll",oe),Ee.disconnect()}},[re]),!re)return null;let me=[];return E>0&&me.push("placed"),f>0&&me.push("captured"),(0,m.jsxs)("div",{className:`${ee.palette} ${ee[J]} ${u?"":ee.light}`,"data-feedback-toolbar":!0,"data-agentation-palette":!0,onClick:ye=>ye.stopPropagation(),onMouseDown:ye=>ye.stopPropagation(),onTransitionEnd:ye=>{ye.target===ye.currentTarget&&(y||(clearTimeout(ue.current),j(!1),De("exit"),k?.()))},children:[(0,m.jsxs)("div",{className:ee.paletteHeader,children:[(0,m.jsx)("div",{className:ee.paletteHeaderTitle,children:"Layout Mode"}),(0,m.jsxs)("div",{className:ee.paletteHeaderDesc,children:["Rearrange and resize existing elements, add new components, and explore layout ideas. Agent results may vary."," ",(0,m.jsx)("a",{href:"https://agentation.dev/features#layout-mode",target:"_blank",rel:"noopener noreferrer",children:"Learn more."})]})]}),(0,m.jsxs)("div",{className:`${ee.canvasToggle} ${B?ee.active:""}`,onClick:()=>$(!B),children:[(0,m.jsx)("span",{className:ee.canvasToggleIcon,children:(0,m.jsxs)("svg",{viewBox:"0 0 14 14",width:"14",height:"14",fill:"none",children:[(0,m.jsx)("rect",{x:"1",y:"1",width:"12",height:"12",rx:"2",stroke:"currentColor",strokeWidth:"1"}),(0,m.jsx)("circle",{cx:"4.5",cy:"4.5",r:"0.8",fill:"currentColor",opacity:".6"}),(0,m.jsx)("circle",{cx:"7",cy:"4.5",r:"0.8",fill:"currentColor",opacity:".6"}),(0,m.jsx)("circle",{cx:"9.5",cy:"4.5",r:"0.8",fill:"currentColor",opacity:".6"}),(0,m.jsx)("circle",{cx:"4.5",cy:"7",r:"0.8",fill:"currentColor",opacity:".6"}),(0,m.jsx)("circle",{cx:"7",cy:"7",r:"0.8",fill:"currentColor",opacity:".6"}),(0,m.jsx)("circle",{cx:"9.5",cy:"7",r:"0.8",fill:"currentColor",opacity:".6"}),(0,m.jsx)("circle",{cx:"4.5",cy:"9.5",r:"0.8",fill:"currentColor",opacity:".6"}),(0,m.jsx)("circle",{cx:"7",cy:"9.5",r:"0.8",fill:"currentColor",opacity:".6"}),(0,m.jsx)("circle",{cx:"9.5",cy:"9.5",r:"0.8",fill:"currentColor",opacity:".6"})]})}),(0,m.jsx)("span",{className:ee.canvasToggleLabel,children:"Wireframe New Page"})]}),(0,m.jsx)("div",{className:`${ee.wireframePurposeWrap} ${B?"":ee.collapsed}`,children:(0,m.jsx)("div",{className:ee.wireframePurposeInner,children:(0,m.jsx)("textarea",{className:ee.wireframePurposeInput,placeholder:"Describe this page to provide additional context for your agent.",value:v,onChange:ye=>Z(ye.target.value),rows:2})})}),(0,m.jsx)(U3,{activeType:i,onSelect:s,onDragStart:ie,scrollRef:Ve,fadeClass:Ye,blankCanvas:B}),Ie&&(0,m.jsx)("div",{className:`${ee.paletteFooterWrap} ${$t?ee.footerHidden:""}`,children:(0,m.jsx)("div",{className:ee.paletteFooterInner,children:(0,m.jsx)("div",{className:ee.paletteFooterInnerContent,children:(0,m.jsxs)("div",{className:ee.paletteFooter,children:[(0,m.jsx)("span",{className:ee.paletteFooterCount,children:(0,m.jsx)(j3,{value:Me.current,suffix:Xe.current})}),(0,m.jsx)("button",{className:ee.paletteFooterClear,onClick:A,children:"Clear"})]})})})})]})}function Oc(i){if(i.parentElement)return i.parentElement;let s=i.getRootNode();return s instanceof ShadowRoot?s.host:null}function el(i,s){let u=i;for(;u;){if(u.matches(s))return u;u=Oc(u)}return null}function Y3(i,s=4){let u=[],f=i,h=0;for(;f&&h<s;){let y=f.tagName.toLowerCase();if(y==="html"||y==="body")break;let k=y;if(f.id)k=`#${f.id}`;else if(f.className&&typeof f.className=="string"){let A=f.className.split(/\s+/).find(ie=>ie.length>2&&!ie.match(/^[a-z]{1,2}$/)&&!ie.match(/[A-Z0-9]{5,}/));A&&(k=`.${A.split("_")[0]}`)}let E=Oc(f);!f.parentElement&&E&&(k=`\u27E8shadow\u27E9 ${k}`),u.unshift(k),f=E,h++}return u.join(" > ")}function Rc(i){let s=Y3(i);if(i.dataset.element)return{name:i.dataset.element,path:s};let u=i.tagName.toLowerCase();if(["path","circle","rect","line","g"].includes(u)){let f=el(i,"svg");if(f){let h=Oc(f);if(h instanceof HTMLElement)return{name:`graphic in ${Rc(h).name}`,path:s}}return{name:"graphic element",path:s}}if(u==="svg"){let f=Oc(i);if(f?.tagName.toLowerCase()==="button"){let h=f.textContent?.trim();return{name:h?`icon in "${h}" button`:"button icon",path:s}}return{name:"icon",path:s}}if(u==="button"){let f=i.textContent?.trim(),h=i.getAttribute("aria-label");return h?{name:`button [${h}]`,path:s}:{name:f?`button "${f.slice(0,25)}"`:"button",path:s}}if(u==="a"){let f=i.textContent?.trim(),h=i.getAttribute("href");return f?{name:`link "${f.slice(0,25)}"`,path:s}:h?{name:`link to ${h.slice(0,30)}`,path:s}:{name:"link",path:s}}if(u==="input"){let f=i.getAttribute("type")||"text",h=i.getAttribute("placeholder"),y=i.getAttribute("name");return h?{name:`input "${h}"`,path:s}:y?{name:`input [${y}]`,path:s}:{name:`${f} input`,path:s}}if(["h1","h2","h3","h4","h5","h6"].includes(u)){let f=i.textContent?.trim();return{name:f?`${u} "${f.slice(0,35)}"`:u,path:s}}if(u==="p"){let f=i.textContent?.trim();return f?{name:`paragraph: "${f.slice(0,40)}${f.length>40?"...":""}"`,path:s}:{name:"paragraph",path:s}}if(u==="span"||u==="label"){let f=i.textContent?.trim();return f&&f.length<40?{name:`"${f}"`,path:s}:{name:u,path:s}}if(u==="li"){let f=i.textContent?.trim();return f&&f.length<40?{name:`list item: "${f.slice(0,35)}"`,path:s}:{name:"list item",path:s}}if(u==="blockquote")return{name:"blockquote",path:s};if(u==="code"){let f=i.textContent?.trim();return f&&f.length<30?{name:`code: \`${f}\``,path:s}:{name:"code",path:s}}if(u==="pre")return{name:"code block",path:s};if(u==="img"){let f=i.getAttribute("alt");return{name:f?`image "${f.slice(0,30)}"`:"image",path:s}}if(u==="video")return{name:"video",path:s};if(["div","section","article","nav","header","footer","aside","main"].includes(u)){let f=i.className,h=i.getAttribute("role"),y=i.getAttribute("aria-label");if(y)return{name:`${u} [${y}]`,path:s};if(h)return{name:`${h}`,path:s};if(typeof f=="string"&&f){let k=f.split(/[\s_-]+/).map(E=>E.replace(/[A-Z0-9]{5,}.*$/,"")).filter(E=>E.length>2&&!/^[a-z]{1,2}$/.test(E)).slice(0,2);if(k.length>0)return{name:k.join(" "),path:s}}return{name:u==="div"?"container":u,path:s}}return{name:u,path:s}}function yd(i){let s=[],u=i.textContent?.trim();u&&u.length<100&&s.push(u);let f=i.previousElementSibling;if(f){let y=f.textContent?.trim();y&&y.length<50&&s.unshift(`[before: "${y.slice(0,40)}"]`)}let h=i.nextElementSibling;if(h){let y=h.textContent?.trim();y&&y.length<50&&s.push(`[after: "${y.slice(0,40)}"]`)}return s.join(" ")}function jh(i){let s=Oc(i);if(!s)return"";let h=(i.getRootNode()instanceof ShadowRoot&&i.parentElement?Array.from(i.parentElement.children):Array.from(s.children)).filter(B=>B!==i&&B instanceof HTMLElement);if(h.length===0)return"";let y=h.slice(0,4).map(B=>{let $=B.tagName.toLowerCase(),v=B.className,Z="";if(typeof v=="string"&&v){let X=v.split(/\s+/).map(re=>re.replace(/[_][a-zA-Z0-9]{5,}.*$/,"")).find(re=>re.length>2&&!/^[a-z]{1,2}$/.test(re));X&&(Z=`.${X}`)}if($==="button"||$==="a"){let X=B.textContent?.trim().slice(0,15);if(X)return`${$}${Z} "${X}"`}return`${$}${Z}`}),E=s.tagName.toLowerCase();if(typeof s.className=="string"&&s.className){let B=s.className.split(/\s+/).map($=>$.replace(/[_][a-zA-Z0-9]{5,}.*$/,"")).find($=>$.length>2&&!/^[a-z]{1,2}$/.test($));B&&(E=`.${B}`)}let A=s.children.length,ie=A>y.length+1?` (${A} total in ${E})`:"";return y.join(", ")+ie}function bd(i){let s=i.className;return typeof s!="string"||!s?"":s.split(/\s+/).filter(f=>f.length>0).map(f=>{let h=f.match(/^([a-zA-Z][a-zA-Z0-9_-]*?)(?:_[a-zA-Z0-9]{5,})?$/);return h?h[1]:f}).filter((f,h,y)=>y.indexOf(f)===h).join(", ")}function Ih(i){if(typeof window>"u")return{};let s=window.getComputedStyle(i),u={},f=i.tagName.toLowerCase(),h;X3.has(f)?h=["color","fontSize","fontWeight","fontFamily","lineHeight"]:f==="button"||f==="a"&&i.getAttribute("role")==="button"?h=["backgroundColor","color","padding","borderRadius","fontSize"]:q3.has(f)?h=["backgroundColor","color","padding","borderRadius","fontSize"]:V3.has(f)?h=["width","height","objectFit","borderRadius"]:Q3.has(f)?h=["display","padding","margin","gap","backgroundColor"]:h=["color","fontSize","margin","padding","backgroundColor"];for(let y of h){let k=y.replace(/([A-Z])/g,"-$1").toLowerCase(),E=s.getPropertyValue(k);E&&!dv.has(E)&&(u[y]=E)}return u}function Yh(i){if(typeof window>"u")return"";let s=window.getComputedStyle(i),u=[];for(let f of W3){let h=f.replace(/([A-Z])/g,"-$1").toLowerCase(),y=s.getPropertyValue(h);y&&!dv.has(y)&&u.push(`${h}: ${y}`)}return u.join("; ")}function G3(i){if(!i)return;let s={},u=i.split(";").map(f=>f.trim()).filter(Boolean);for(let f of u){let h=f.indexOf(":");if(h>0){let y=f.slice(0,h).trim(),k=f.slice(h+1).trim();y&&k&&(s[y]=k)}}return Object.keys(s).length>0?s:void 0}function Xh(i){let s=[],u=i.getAttribute("role"),f=i.getAttribute("aria-label"),h=i.getAttribute("aria-describedby"),y=i.getAttribute("tabindex"),k=i.getAttribute("aria-hidden");return u&&s.push(`role="${u}"`),f&&s.push(`aria-label="${f}"`),h&&s.push(`aria-describedby="${h}"`),y&&s.push(`tabindex=${y}`),k==="true"&&s.push("aria-hidden"),i.matches("a, button, input, select, textarea, [tabindex]")&&s.push("focusable"),s.join(", ")}function qh(i){let s=[],u=i;for(;u&&u.tagName.toLowerCase()!=="html";){let f=u.tagName.toLowerCase(),h=f;if(u.id)h=`${f}#${u.id}`;else if(u.className&&typeof u.className=="string"){let k=u.className.split(/\s+/).map(E=>E.replace(/[_][a-zA-Z0-9]{5,}.*$/,"")).find(E=>E.length>2);k&&(h=`${f}.${k}`)}let y=Oc(u);!u.parentElement&&y&&(h=`\u27E8shadow\u27E9 ${h}`),s.unshift(h),u=y}return s.join(" > ")}function fv(i){let s=i;for(;s&&s!==document.body&&s!==document.documentElement;){let u=window.getComputedStyle(s).position;if(u==="fixed"||u==="sticky")return!0;s=s.parentElement}return!1}function us(i){let s=i.tagName.toLowerCase();if(["nav","header","footer","main"].includes(s)&&document.querySelectorAll(s).length===1)return s;if(i.id)return`#${CSS.escape(i.id)}`;if(i.className&&typeof i.className=="string"){let h=i.className.split(/\s+/).filter(y=>y.length>0).find(y=>y.length>2&&!/^[a-zA-Z0-9]{6,}$/.test(y)&&!/^[a-z]{1,2}$/.test(y));if(h){let y=`${s}.${CSS.escape(h)}`;if(document.querySelectorAll(y).length===1)return y}}let u=i.parentElement;if(u){let h=Array.from(u.children).indexOf(i)+1;return`${u===document.body?"body":us(u)} > ${s}:nth-child(${h})`}return s}function Jh(i){let s=i.tagName.toLowerCase(),u=i.getAttribute("aria-label");if(u)return u;let f=i.getAttribute("role");if(f&&Ep[f])return Ep[f];if(Ub[s])return Ub[s];let h=i.querySelector("h1, h2, h3, h4, h5, h6");if(h){let k=h.textContent?.trim();if(k&&k.length<=50)return k;if(k)return k.slice(0,47)+"..."}let{name:y}=Rc(i);return y.charAt(0).toUpperCase()+y.slice(1)}function hv(i){let s=i.className;return typeof s!="string"||!s?null:s.split(/\s+/).map(f=>f.replace(/[_][a-zA-Z0-9]{5,}.*$/,"")).find(f=>f.length>2&&!/^[a-z]{1,2}$/.test(f))||null}function _v(i){let s=i.textContent?.trim();if(!s)return null;let u=s.replace(/\s+/g," ");return u.length<=30?u:u.slice(0,30)+"\u2026"}function J3(){let i=document.querySelector("main")||document.body,s=Array.from(i.children),u=s;i!==document.body&&s.length<3&&(u=Array.from(document.body.children));let f=[];return u.forEach((h,y)=>{if(!(h instanceof HTMLElement))return;let k=h.tagName.toLowerCase();if(P3.has(k)||h.hasAttribute("data-feedback-toolbar")||h.closest("[data-feedback-toolbar]"))return;let E=window.getComputedStyle(h);if(E.display==="none"||E.visibility==="hidden")return;let A=h.getBoundingClientRect();if(A.height<F3)return;let ie=Z3.has(k),B=h.getAttribute("role")&&Ep[h.getAttribute("role")],$=k==="div"&&A.height>=60;if(!ie&&!B&&!$)return;let v=window.scrollY,Z=fv(h),X={x:A.x,y:Z?A.y:A.y+v,width:A.width,height:A.height};f.push({id:`rs-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,label:Jh(h),tagName:k,selector:us(h),role:h.getAttribute("role"),className:hv(h),textSnippet:_v(h),originalRect:X,currentRect:{...X},originalIndex:y,isFixed:Z})}),f}function K3(i){let s=window.scrollY,u=i.getBoundingClientRect(),f=fv(i),h={x:u.x,y:f?u.y:u.y+s,width:u.width,height:u.height},y=i.parentElement,k=0;return y&&(k=Array.from(y.children).indexOf(i)),{id:`rs-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,label:Jh(i),tagName:i.tagName.toLowerCase(),selector:us(i),role:i.getAttribute("role"),className:hv(i),textSnippet:_v(i),originalRect:h,currentRect:{...h},originalIndex:k,isFixed:f}}function Xb(i,s,u,f){let h=1/0,y=1/0,k=i.x,E=i.x+i.width,A=i.x+i.width/2,ie=i.y,B=i.y+i.height,$=i.y+i.height/2,v=[];for(let Me of s)u.has(Me.id)||v.push(Me.currentRect);f&&v.push(...f);for(let Me of v){let Xe=Me.x,wt=Me.x+Me.width,ue=Me.x+Me.width/2,Ve=Me.y,Ye=Me.y+Me.height,Be=Me.y+Me.height/2;for(let Fe of[k,E,A])for(let ne of[Xe,wt,ue]){let me=ne-Fe;Math.abs(me)<Qh&&Math.abs(me)<Math.abs(h)&&(h=me)}for(let Fe of[ie,B,$])for(let ne of[Ve,Ye,Be]){let me=ne-Fe;Math.abs(me)<Qh&&Math.abs(me)<Math.abs(y)&&(y=me)}}let Z=Math.abs(h)<Qh?h:0,X=Math.abs(y)<Qh?y:0,re=[],j=new Set,J=k+Z,De=E+Z,Ie=A+Z,Ge=ie+X,$t=B+X,jt=$+X;for(let Me of v){let Xe=Me.x,wt=Me.x+Me.width,ue=Me.x+Me.width/2,Ve=Me.y,Ye=Me.y+Me.height,Be=Me.y+Me.height/2;for(let Fe of[Xe,ue,wt])for(let ne of[J,Ie,De])if(Math.abs(ne-Fe)<.5){let me=`x:${Math.round(Fe)}`;j.has(me)||(j.add(me),re.push({axis:"x",pos:Fe}))}for(let Fe of[Ve,Be,Ye])for(let ne of[Ge,jt,$t])if(Math.abs(ne-Fe)<.5){let me=`y:${Math.round(Fe)}`;j.has(me)||(j.add(me),re.push({axis:"y",pos:Fe}))}}return{dx:Z,dy:X,guides:re}}function qb(i){let s=i;for(;s&&s!==document.body&&s!==document.documentElement;){if(s.closest("[data-feedback-toolbar]"))return null;if(e8.has(s.tagName.toLowerCase())){s=s.parentElement;continue}let u=s.getBoundingClientRect();if(u.width>=Yb&&u.height>=Yb)return s;s=s.parentElement}return null}function t8({rearrangeState:i,onChange:s,isDarkMode:u,exiting:f,className:h,blankCanvas:y,extraSnapRects:k,onSelectionChange:E,deselectSignal:A,onDragMove:ie,onDragEnd:B,clearSignal:$}){let{sections:v}=i,Z=(0,bt.useRef)(i);Z.current=i;let[X,re]=(0,bt.useState)(new Set),[j,J]=(0,bt.useState)(!1),De=(0,bt.useRef)($);(0,bt.useEffect)(()=>{$!==void 0&&$!==De.current&&(De.current=$,v.length>0&&J(!0))},[$,v.length]);let Ie=(0,bt.useRef)(A);(0,bt.useEffect)(()=>{A!==Ie.current&&(Ie.current=A,re(new Set))},[A]);let[Ge,$t]=(0,bt.useState)(null),[jt,Me]=(0,bt.useState)(!1),Xe=(0,bt.useRef)(!1),wt=(0,bt.useCallback)(H=>{let I=v.find(te=>te.id===H);I&&(Xe.current=!!I.note,$t(H),Me(!1))},[v]),ue=(0,bt.useCallback)(()=>{Ge&&(Me(!0),rt(()=>{$t(null),Me(!1)},150))},[Ge]),Ve=(0,bt.useCallback)(H=>{Ge&&(s({...i,sections:v.map(I=>I.id===Ge?{...I,note:H.trim()||void 0}:I)}),ue())},[Ge,v,i,s,ue]);(0,bt.useEffect)(()=>{f&&Ge&&ue()},[f]);let[Ye,Be]=(0,bt.useState)(new Set),Fe=(0,bt.useRef)(new Map),[ne,me]=(0,bt.useState)(null),[ye,oe]=(0,bt.useState)(null),[Ee,vt]=(0,bt.useState)([]),[Q,qe]=(0,bt.useState)(0),at=(0,bt.useRef)(null),ht=(0,bt.useRef)(new Set),Rn=(0,bt.useRef)(new Map),[Oo,It]=(0,bt.useState)(new Map),[En,eo]=(0,bt.useState)(new Map),nl=(0,bt.useRef)(new Set),xe=(0,bt.useRef)(new Map),po=(0,bt.useRef)(E);po.current=E;let Yn=(0,bt.useRef)(ie);Yn.current=ie;let fo=(0,bt.useRef)(B);fo.current=B,(0,bt.useEffect)(()=>{y&&re(new Set)},[y]);let[sn,Qt]=(0,bt.useState)(()=>!i.sections.some(H=>{let I=H.originalRect,te=H.currentRect;return Math.abs(I.x-te.x)>1||Math.abs(I.y-te.y)>1||Math.abs(I.width-te.width)>1||Math.abs(I.height-te.height)>1}));(0,bt.useEffect)(()=>{if(!sn){let H=rt(()=>Qt(!0),380);return()=>clearTimeout(H)}},[]);let So=(0,bt.useRef)(new Set);(0,bt.useEffect)(()=>{So.current=new Set(v.map(H=>H.selector))},[v]),(0,bt.useEffect)(()=>{let H=()=>qe(window.scrollY);return H(),window.addEventListener("scroll",H,{passive:!0}),window.addEventListener("resize",H,{passive:!0}),()=>{window.removeEventListener("scroll",H),window.removeEventListener("resize",H)}},[]),(0,bt.useEffect)(()=>{let H=I=>{if(at.current){me(null);return}let te=document.elementFromPoint(I.clientX,I.clientY);if(!te){me(null);return}if(te.closest("[data-feedback-toolbar]")){me(null);return}if(te.closest("[data-design-placement]")){me(null);return}if(te.closest("[data-annotation-popup]")){me(null);return}let le=qb(te);if(!le){me(null);return}for(let Ue of So.current)try{let de=document.querySelector(Ue);if(de&&(de===le||le.contains(de))){me(null);return}}catch{}let Oe=le.getBoundingClientRect();me({x:Oe.x,y:Oe.y,w:Oe.width,h:Oe.height})};return document.addEventListener("mousemove",H,{passive:!0}),()=>document.removeEventListener("mousemove",H)},[v]),(0,bt.useEffect)(()=>{let H=document.body.style.userSelect;return document.body.style.userSelect="none",()=>{document.body.style.userSelect=H}},[]),(0,bt.useEffect)(()=>{let H=I=>{if(at.current||I.button!==0)return;let te=I.target;if(!te||te.closest("[data-feedback-toolbar]")||te.closest("[data-design-placement]")||te.closest("[data-annotation-popup]"))return;let le=qb(te),Oe=!1;if(le)for(let de of So.current)try{let _=document.querySelector(de);if(_&&(_===le||le.contains(_))){Oe=!0;break}}catch{}let Ue=!!(I.shiftKey||I.metaKey||I.ctrlKey);if(le&&!Oe){I.preventDefault(),I.stopPropagation();let de=K3(le),_=[...v,de],T=[...i.originalOrder,de.id];s({...i,sections:_,originalOrder:T});let W=new Set([de.id]);re(W),po.current?.(W,Ue),me(null);let se=I.clientX,K=I.clientY,Ae={x:de.currentRect.x,y:de.currentRect.y},be=de.originalRect,Te=!1,ae=0,xt=0;at.current="move";let pt=Ht=>{let ct=Ht.clientX-se,Kt=Ht.clientY-K;if(!Te&&(Math.abs(ct)>2||Math.abs(Kt)>2)&&(Te=!0),!Te)return;let Nn={x:Ae.x+ct,y:Ae.y+Kt,width:de.currentRect.width,height:de.currentRect.height},Xn=Xb(Nn,_,new Set([de.id]),k);vt(Xn.guides);let $n=ct+Xn.dx,Co=Kt+Xn.dy;ae=$n,xt=Co;let ea=document.querySelector(`[data-rearrange-section="${de.id}"]`);ea&&(ea.style.transform=`translate(${$n}px, ${Co}px)`),It(new Map([[de.id,{x:Ae.x+$n,y:Ae.y+Co,width:de.currentRect.width,height:de.currentRect.height}]])),Yn.current?.($n,Co)},st=()=>{window.removeEventListener("mousemove",pt),window.removeEventListener("mouseup",st),at.current=null,vt([]),It(new Map);let Ht=document.querySelector(`[data-rearrange-section="${de.id}"]`);Ht&&(Ht.style.transform=""),Te&&s({...i,sections:_.map(ct=>ct.id===de.id?{...ct,currentRect:{...ct.currentRect,x:Math.max(0,Ae.x+ae),y:Math.max(0,Ae.y+xt)}}:ct),originalOrder:T}),fo.current?.(ae,xt,Te)};window.addEventListener("mousemove",pt),window.addEventListener("mouseup",st)}else if(Oe&&le){I.preventDefault();for(let de of v)try{let _=document.querySelector(de.selector);if(_&&_===le){let T=new Set([de.id]);re(T),po.current?.(T,Ue);return}}catch{}Ue||(re(new Set),po.current?.(new Set,!1))}else Ue||(re(new Set),po.current?.(new Set,!1))};return document.addEventListener("mousedown",H,!0),()=>document.removeEventListener("mousedown",H,!0)},[v,i,s]),(0,bt.useEffect)(()=>{let H=I=>{let te=I.target;if(!(te.tagName==="INPUT"||te.tagName==="TEXTAREA"||te.isContentEditable)){if((I.key==="Backspace"||I.key==="Delete")&&X.size>0){I.preventDefault();let le=new Set(X);Be(Oe=>{let Ue=new Set(Oe);for(let de of le)Ue.add(de);return Ue}),re(new Set),rt(()=>{let Oe=Z.current;s({...Oe,sections:Oe.sections.filter(Ue=>!le.has(Ue.id)),originalOrder:Oe.originalOrder.filter(Ue=>!le.has(Ue))}),Be(Ue=>{let de=new Set(Ue);for(let _ of le)de.delete(_);return de})},180);return}if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(I.key)&&X.size>0){I.preventDefault();let le=I.shiftKey?20:1,Oe=I.key==="ArrowLeft"?-le:I.key==="ArrowRight"?le:0,Ue=I.key==="ArrowUp"?-le:I.key==="ArrowDown"?le:0;s({...i,sections:v.map(de=>X.has(de.id)?{...de,currentRect:{...de.currentRect,x:Math.max(0,de.currentRect.x+Oe),y:Math.max(0,de.currentRect.y+Ue)}}:de)});return}I.key==="Escape"&&X.size>0&&re(new Set)}};return document.addEventListener("keydown",H),()=>document.removeEventListener("keydown",H)},[X,v,i,s]);let we=(0,bt.useCallback)((H,I)=>{if(H.button!==0)return;let te=H.target;if(te.closest(`.${ee.handle}`)||te.closest(`.${ee.deleteButton}`))return;H.preventDefault(),H.stopPropagation();let le;H.shiftKey||H.metaKey||H.ctrlKey?(le=new Set(X),le.has(I)?le.delete(I):le.add(I)):X.has(I)?le=new Set(X):le=new Set([I]),re(le),(le.size!==X.size||[...le].some(Te=>!X.has(Te)))&&po.current?.(le,!!(H.shiftKey||H.metaKey||H.ctrlKey));let Ue=H.clientX,de=H.clientY,_=new Map;for(let Te of v)le.has(Te.id)&&_.set(Te.id,{x:Te.currentRect.x,y:Te.currentRect.y});at.current="move";let T=!1,W=0,se=0,K=new Map;for(let Te of v)if(le.has(Te.id)){let ae=document.querySelector(`[data-rearrange-section="${Te.id}"]`);K.set(Te.id,{outlineEl:ae,curW:Te.currentRect.width,curH:Te.currentRect.height})}let Ae=Te=>{let ae=Te.clientX-Ue,xt=Te.clientY-de;if(ae===0&&xt===0)return;T=!0;let pt=1/0,st=1/0,Ht=-1/0,ct=-1/0;for(let[Co,{curW:ea,curH:Ei}]of K){let Dn=_.get(Co);if(!Dn)continue;let ol=Dn.x+ae,ko=Dn.y+xt;pt=Math.min(pt,ol),st=Math.min(st,ko),Ht=Math.max(Ht,ol+ea),ct=Math.max(ct,ko+Ei)}let Kt=Xb({x:pt,y:st,width:Ht-pt,height:ct-st},v,le,k),Nn=ae+Kt.dx,Xn=xt+Kt.dy;W=Nn,se=Xn,vt(Kt.guides);for(let[,{outlineEl:Co}]of K)Co&&(Co.style.transform=`translate(${Nn}px, ${Xn}px)`);let $n=new Map;for(let[Co,{curW:ea,curH:Ei}]of K){let Dn=_.get(Co);if(Dn){let ol={x:Math.max(0,Dn.x+Nn),y:Math.max(0,Dn.y+Xn),width:ea,height:Ei};$n.set(Co,ol)}}It($n),Yn.current?.(Nn,Xn)},be=Te=>{window.removeEventListener("mousemove",Ae),window.removeEventListener("mouseup",be),at.current=null,vt([]),It(new Map);for(let[,{outlineEl:ae}]of K)ae&&(ae.style.transform="");if(T){let ae=Te.clientX-Ue,xt=Te.clientY-de;if(Math.abs(ae)<5&&Math.abs(xt)<5)s({...i,sections:v.map(pt=>{let st=_.get(pt.id);return st?{...pt,currentRect:{...pt.currentRect,x:st.x,y:st.y}}:pt})});else{s({...i,sections:v.map(pt=>{let st=_.get(pt.id);return st?{...pt,currentRect:{...pt.currentRect,x:Math.max(0,st.x+W),y:Math.max(0,st.y+se)}}:pt})}),fo.current?.(W,se,!0);return}}fo.current?.(0,0,!1)};window.addEventListener("mousemove",Ae),window.addEventListener("mouseup",be)},[X,v,i,s]),pe=(0,bt.useCallback)((H,I,te)=>{H.preventDefault(),H.stopPropagation();let le=v.find(be=>be.id===I);if(!le)return;re(new Set([I])),at.current="resize";let Oe=H.clientX,Ue=H.clientY,de={...le.currentRect},_=le.originalRect,T=de.width/de.height,W={...de},se=document.querySelector(`[data-rearrange-section="${I}"]`),K=be=>{let Te=be.clientX-Oe,ae=be.clientY-Ue,xt=de.x,pt=de.y,st=de.width,Ht=de.height;if(te.includes("e")&&(st=Math.max(Vh,de.width+Te)),te.includes("w")&&(st=Math.max(Vh,de.width-Te),xt=de.x+de.width-st),te.includes("s")&&(Ht=Math.max(Vh,de.height+ae)),te.includes("n")&&(Ht=Math.max(Vh,de.height-ae),pt=de.y+de.height-Ht),be.shiftKey)if(te.length===2){let Kt=Math.abs(st-de.width),Nn=Math.abs(Ht-de.height);Kt>Nn?Ht=st/T:st=Ht*T,te.includes("w")&&(xt=de.x+de.width-st),te.includes("n")&&(pt=de.y+de.height-Ht)}else te==="e"||te==="w"?Ht=st/T:st=Ht*T,te==="w"&&(xt=de.x+de.width-st),te==="n"&&(pt=de.y+de.height-Ht);W={x:xt,y:pt,width:st,height:Ht},se&&(se.style.left=`${xt}px`,se.style.top=`${pt-Q}px`,se.style.width=`${st}px`,se.style.height=`${Ht}px`),oe({x:be.clientX+12,y:be.clientY+12,text:`${Math.round(st)} \xD7 ${Math.round(Ht)}`}),It(new Map([[I,W]]))},Ae=()=>{window.removeEventListener("mousemove",K),window.removeEventListener("mouseup",Ae),oe(null),at.current=null,It(new Map),s({...i,sections:v.map(be=>be.id===I?{...be,currentRect:W}:be)})};window.addEventListener("mousemove",K),window.addEventListener("mouseup",Ae)},[v,i,s,Q]),Se=(0,bt.useCallback)(H=>{Be(I=>{let te=new Set(I);return te.add(H),te}),re(I=>{let te=new Set(I);return te.delete(H),te}),rt(()=>{let I=Z.current;s({...I,sections:I.sections.filter(te=>te.id!==H),originalOrder:I.originalOrder.filter(te=>te!==H)}),Be(te=>{let le=new Set(te);return le.delete(H),le})},180)},[s]),lt=H=>{let I=H.originalRect,te=H.currentRect;return Math.abs(I.x-te.x)>1||Math.abs(I.y-te.y)>1||Math.abs(I.width-te.width)>1||Math.abs(I.height-te.height)>1},it=H=>{let I=H.originalRect,te=H.currentRect;return Math.abs(I.x-te.x)>1||Math.abs(I.y-te.y)>1},Je=H=>{let I=H.originalRect,te=H.currentRect;return Math.abs(I.width-te.width)>1||Math.abs(I.height-te.height)>1};for(let H of v)Rn.current.has(H.id)||(it(H)?Rn.current.set(H.id,"move"):Je(H)&&Rn.current.set(H.id,"resize"));for(let H of Rn.current.keys())v.some(I=>I.id===H)||Rn.current.delete(H);let Bt=v.filter(H=>{try{if(Ye.has(H.id)||X.has(H.id))return!0;let I=document.querySelector(H.selector);if(!I)return!1;let te=I.getBoundingClientRect(),le=H.originalRect;return Math.abs(te.width-le.width)+Math.abs(te.height-le.height)<200}catch{return!1}}),Zt=Bt.filter(H=>lt(H)),Ot=Bt.filter(H=>!lt(H)),kt=new Set(Zt.map(H=>H.id));for(let H of ht.current)kt.has(H)||ht.current.delete(H);let Ze=[...kt].sort().join(",");for(let H of Zt)xe.current.set(H.id,{currentRect:H.currentRect,originalRect:H.originalRect,isFixed:H.isFixed});return(0,bt.useEffect)(()=>{let H=nl.current;nl.current=kt;let I=new Map;for(let te of H)if(!kt.has(te)){if(!v.some(Oe=>Oe.id===te))continue;let le=xe.current.get(te);le&&(I.set(te,{orig:le.originalRect,target:le.currentRect,isFixed:le.isFixed}),xe.current.delete(te))}if(I.size>0){eo(le=>{let Oe=new Map(le);for(let[Ue,de]of I)Oe.set(Ue,de);return Oe});let te=rt(()=>{eo(le=>{let Oe=new Map(le);for(let Ue of I.keys())Oe.delete(Ue);return Oe})},250);return()=>clearTimeout(te)}},[Ze,v]),(0,Ft.jsxs)(Ft.Fragment,{children:[(0,Ft.jsxs)("div",{className:`${ee.rearrangeOverlay} ${u?"":ee.light} ${f?ee.overlayExiting:""}${h?` ${h}`:""}`,"data-feedback-toolbar":!0,children:[ne&&(0,Ft.jsx)("div",{className:ee.hoverHighlight,style:{left:ne.x,top:ne.y,width:ne.w,height:ne.h}}),Ot.map(H=>{let I=H.currentRect,te=H.isFixed?I.y:I.y-Q,le=jb,Oe=X.has(H.id);return(0,Ft.jsxs)("div",{"data-rearrange-section":H.id,className:`${ee.sectionOutline} ${Oe?ee.selected:""} ${j||f||Ye.has(H.id)?ee.exiting:""}`,style:{left:I.x,top:te,width:I.width,height:I.height,borderColor:le.border,backgroundColor:le.bg,...sn?{}:{opacity:0,animation:"none",transition:"none"}},onMouseDown:Ue=>we(Ue,H.id),onDoubleClick:()=>wt(H.id),children:[(0,Ft.jsx)("span",{className:ee.sectionLabel,style:{backgroundColor:le.pill},children:H.label}),(0,Ft.jsx)("span",{className:`${ee.sectionAnnotation} ${H.note?ee.annotationVisible:""}`,children:(H.note&&Fe.current.set(H.id,H.note),H.note||Fe.current.get(H.id)||"")}),(0,Ft.jsxs)("span",{className:ee.sectionDimensions,children:[Math.round(I.width)," \xD7 ",Math.round(I.height)]}),(0,Ft.jsx)("div",{className:ee.deleteButton,onMouseDown:Ue=>Ue.stopPropagation(),onClick:()=>Se(H.id),children:"\u2715"}),Ib.map(Ue=>(0,Ft.jsx)("div",{className:`${ee.handle} ${ee[`handle${Ue.charAt(0).toUpperCase()}${Ue.slice(1)}`]}`,onMouseDown:de=>pe(de,H.id,Ue)},Ue))]},H.id)}),Zt.map(H=>{let I=H.currentRect,te=H.isFixed?I.y:I.y-Q,le=X.has(H.id),Oe=it(H),Ue=Je(H);if(y&&!le)return null;let _=!ht.current.has(H.id);return _&&ht.current.add(H.id),(0,Ft.jsxs)("div",{"data-rearrange-section":H.id,className:`${ee.ghostOutline} ${le?ee.selected:""} ${j||f||Ye.has(H.id)?ee.exiting:""}`,style:{left:I.x,top:te,width:I.width,height:I.height,...sn?{}:{opacity:0,animation:"none",transition:"none"},..._?{}:{animation:"none"}},onMouseDown:T=>we(T,H.id),onDoubleClick:()=>wt(H.id),children:[(0,Ft.jsx)("span",{className:ee.sectionLabel,style:{backgroundColor:jb.pill},children:H.label}),(0,Ft.jsx)("span",{className:`${ee.sectionAnnotation} ${H.note?ee.annotationVisible:""}`,children:(H.note&&Fe.current.set(H.id,H.note),H.note||Fe.current.get(H.id)||"")}),(0,Ft.jsxs)("span",{className:ee.sectionDimensions,children:[Math.round(I.width)," \xD7 ",Math.round(I.height)]}),(0,Ft.jsx)("div",{className:ee.deleteButton,onMouseDown:T=>T.stopPropagation(),onClick:()=>Se(H.id),children:"\u2715"}),Ib.map(T=>(0,Ft.jsx)("div",{className:`${ee.handle} ${ee[`handle${T.charAt(0).toUpperCase()}${T.slice(1)}`]}`,onMouseDown:W=>pe(W,H.id,T)},T)),(0,Ft.jsx)("span",{className:ee.ghostBadge,children:(()=>{let T=Rn.current.get(H.id);if(Oe&&Ue){let[W,se]=T==="resize"?["Resize","Move"]:["Move","Resize"];return(0,Ft.jsxs)(Ft.Fragment,{children:["Suggested ",W," ",(0,Ft.jsxs)("span",{className:ee.ghostBadgeExtra,children:["& ",se]})]})}return`Suggested ${Ue?"Resize":"Move"}`})()})]},H.id)})]}),!y&&(()=>{let H=[];for(let I of Zt){let te=Oo.get(I.id);H.push({id:I.id,orig:I.originalRect,target:te||I.currentRect,isFixed:I.isFixed,isSelected:X.has(I.id),isExiting:Ye.has(I.id)})}for(let[I,te]of Oo)if(!H.some(le=>le.id===I)){let le=v.find(Oe=>Oe.id===I);le&&H.push({id:I,orig:le.originalRect,target:te,isFixed:le.isFixed,isSelected:X.has(I)})}for(let[I,te]of En)H.some(le=>le.id===I)||H.push({id:I,orig:te.orig,target:te.target,isFixed:te.isFixed,isSelected:!1,isExiting:!0});return H.length===0?null:(0,Ft.jsxs)("svg",{className:`${ee.connectorSvg} ${j||f?ee.connectorExiting:""}`,children:[H.map(({id:I,orig:te,target:le,isFixed:Oe,isSelected:Ue,isExiting:de})=>{let _=te.x+te.width/2,T=(Oe?te.y:te.y-Q)+te.height/2,W=le.x+le.width/2,se=(Oe?le.y:le.y-Q)+le.height/2,K=W-_,Ae=se-T,be=Math.sqrt(K*K+Ae*Ae);if(be<2)return null;let Te=Math.min(1,be/40),ae=Math.min(be*.3,60),xt=be>0?-Ae/be:0,pt=be>0?K/be:0,st=(_+W)/2+xt*ae,Ht=(T+se)/2+pt*ae,ct=Oo.has(I),Kt=ct||Ue?1:.4,Nn=ct||Ue?1:.5;return(0,Ft.jsxs)("g",{className:de?ee.connectorExiting:"",children:[(0,Ft.jsx)("path",{className:ee.connectorLine,d:`M ${_} ${T} Q ${st} ${Ht} ${W} ${se}`,fill:"none",stroke:"rgba(59, 130, 246, 0.45)",strokeWidth:"1.5",opacity:Kt*Te}),(0,Ft.jsx)("circle",{className:ee.connectorDot,cx:_,cy:T,r:4*Te,fill:"rgba(59, 130, 246, 0.8)",stroke:"#fff",strokeWidth:"1.5",opacity:Nn*Te,filter:"url(#connDotShadow)"}),(0,Ft.jsx)("circle",{className:ee.connectorDot,cx:W,cy:se,r:4*Te,fill:"rgba(59, 130, 246, 0.8)",stroke:"#fff",strokeWidth:"1.5",opacity:Nn*Te,filter:"url(#connDotShadow)"})]},`conn-${I}`)}),(0,Ft.jsx)("defs",{children:(0,Ft.jsx)("filter",{id:"connDotShadow",x:"-50%",y:"-50%",width:"200%",height:"200%",children:(0,Ft.jsx)("feDropShadow",{dx:"0",dy:"0.5",stdDeviation:"1",floodOpacity:"0.15"})})})]})})(),Ge&&(()=>{let H=v.find(se=>se.id===Ge);if(!H)return null;let I=H.currentRect,te=H.isFixed?I.y:I.y-Q,le=I.x+I.width/2,Oe=te-8,Ue=te+I.height+8,de=Oe>200,_=Ue<window.innerHeight-100,T=Math.max(160,Math.min(window.innerWidth-160,le)),W;return de?W={left:T,bottom:window.innerHeight-Oe}:_?W={left:T,top:Ue}:W={left:T,top:Math.max(80,window.innerHeight/2-80)},(0,Ft.jsx)(Fh,{element:H.label,placeholder:"Add a note about this section",initialValue:H.note??"",submitLabel:Xe.current?"Save":"Set",onSubmit:Ve,onCancel:ue,onDelete:Xe.current?()=>{Ve("")}:void 0,isExiting:jt,lightMode:!u,style:W})})(),ye&&(0,Ft.jsx)("div",{className:ee.sizeIndicator,style:{left:ye.x,top:ye.y},"data-feedback-toolbar":!0,children:ye.text}),Ee.map((H,I)=>(0,Ft.jsx)("div",{className:ee.guideLine,style:H.axis==="x"?{position:"fixed",left:H.pos,top:0,width:1,height:"100vh"}:{position:"fixed",left:0,top:H.pos-Q,width:"100vw",height:1}},`${H.axis}-${H.pos}-${I}`))]})}function n8(){let i=document.querySelector("main")||document.body,s=[],u=Array.from(i.children),f=i!==document.body&&u.length<3?Array.from(document.body.children):u;for(let h of f){if(!(h instanceof HTMLElement)||Mp.has(h.tagName.toLowerCase())||h.hasAttribute("data-feedback-toolbar"))continue;let y=window.getComputedStyle(h);if(y.display==="none"||y.visibility==="hidden")continue;let k=h.getBoundingClientRect();if(!(k.height<10||k.width<10)){s.push({label:Jh(h),selector:us(h),top:k.top,bottom:k.bottom,left:k.left,right:k.right,area:k.width*k.height});for(let E of Array.from(h.children)){if(!(E instanceof HTMLElement)||Mp.has(E.tagName.toLowerCase())||E.hasAttribute("data-feedback-toolbar"))continue;let A=window.getComputedStyle(E);if(A.display==="none"||A.visibility==="hidden")continue;let ie=E.getBoundingClientRect();ie.height<10||ie.width<10||s.push({label:Jh(E),selector:us(E),top:ie.top,bottom:ie.bottom,left:ie.left,right:ie.right,area:ie.width*ie.height})}}}return s}function o8(i){let s=window.scrollY;return i.map(({label:u,selector:f,rect:h})=>{let y=h.y-s;return{label:u,selector:f,top:y,bottom:y+h.height,left:h.x,right:h.x+h.width,area:h.width*h.height}})}function l8(i){let s=window.scrollY,u=i.y-s,f=i.x;return{top:u,bottom:u+i.height,left:f,right:f+i.width,area:i.width*i.height}}function Tp(i,s){let u=s?o8(s):n8(),f=l8(i),h=null,y=null,k=null,E=null,A=null;for(let X of u){if(Math.abs(X.left-f.left)<2&&Math.abs(X.top-f.top)<2&&Math.abs(X.right-X.left-i.width)<2&&Math.abs(X.bottom-X.top-i.height)<2)continue;X.left<=f.left+2&&X.right>=f.right-2&&X.top<=f.top+2&&X.bottom>=f.bottom-2&&X.area>f.area*1.5&&(!A||X.area<A._area)&&(A={label:X.label,selector:X.selector,_area:X.area});let re=f.right>X.left+5&&f.left<X.right-5,j=f.bottom>X.top+5&&f.top<X.bottom-5;if(re&&X.bottom<=f.top+5){let J=Math.round(f.top-X.bottom);(!h||J<h._dist)&&(h={label:X.label,selector:X.selector,gap:Math.max(0,J),_dist:J})}if(re&&X.top>=f.bottom-5){let J=Math.round(X.top-f.bottom);(!y||J<y._dist)&&(y={label:X.label,selector:X.selector,gap:Math.max(0,J),_dist:J})}if(j&&X.right<=f.left+5){let J=Math.round(f.left-X.right);(!k||J<k._dist)&&(k={label:X.label,selector:X.selector,gap:Math.max(0,J),_dist:J})}if(j&&X.left>=f.right-5){let J=Math.round(X.left-f.right);(!E||J<E._dist)&&(E={label:X.label,selector:X.selector,gap:Math.max(0,J),_dist:J})}}let ie=window.innerWidth,B=window.innerHeight,$=i8(i,ie),v=X=>X?{label:X.label,selector:X.selector,gap:X.gap}:null,Z=a8(f,i,ie,B,A?{label:A.label,selector:A.selector,_area:A._area}:null,u);return{above:v(h),below:v(y),left:v(k),right:v(E),alignment:$,containedIn:A?{label:A.label,selector:A.selector}:null,outOfBounds:Z}}function a8(i,s,u,f,h,y){let k={},E=!1,A=[];if(i.left<-2&&A.push("left"),i.right>u+2&&A.push("right"),i.top<-2&&A.push("top"),i.bottom>f+2&&A.push("bottom"),A.length>0&&(k.viewport=A,E=!0),h){let ie=y.find(B=>B.label===h.label&&B.selector===h.selector&&Math.abs(B.area-h._area)<10);if(ie){let B=[];i.left<ie.left-2&&B.push("left"),i.right>ie.right+2&&B.push("right"),i.top<ie.top-2&&B.push("top"),i.bottom>ie.bottom+2&&B.push("bottom"),B.length>0&&(k.container={label:h.label,edges:B},E=!0)}}return E?k:null}function i8(i,s){if(i.width/s>.85)return"full-width";let f=i.x+i.width/2,h=s/2,y=f-h,k=s*.08;return Math.abs(y)<k?"center":y<0?"left":"right"}function mv(i){switch(i){case"full-width":return"full-width";case"center":return"centered";case"left":return"left-aligned";case"right":return"right-aligned"}}function pv(i,s={}){let u=[];i.above&&u.push(`Below \`${i.above.label}\`${i.above.gap>0?` (${i.above.gap}px gap)`:""}`),i.below&&u.push(`Above \`${i.below.label}\`${i.below.gap>0?` (${i.below.gap}px gap)`:""}`),s.includeLeftRight&&(i.left&&u.push(`Right of \`${i.left.label}\`${i.left.gap>0?` (${i.left.gap}px gap)`:""}`),i.right&&u.push(`Left of \`${i.right.label}\`${i.right.gap>0?` (${i.right.gap}px gap)`:""}`));let f=mv(i.alignment);return i.containedIn?u.push(`${f.charAt(0).toUpperCase()+f.slice(1)} in \`${i.containedIn.label}\``):u.push(`${f.charAt(0).toUpperCase()+f.slice(1)} in page`),s.includePixelRef&&s.pixelRef&&u.push(`Pixel ref: \`${s.pixelRef}\``),i.outOfBounds&&(i.outOfBounds.viewport&&u.push(`**Outside viewport** (${i.outOfBounds.viewport.join(", ")} edge${i.outOfBounds.viewport.length>1?"s":""})`),i.outOfBounds.container&&u.push(`**Outside \`${i.outOfBounds.container.label}\`** (${i.outOfBounds.container.edges.join(", ")} edge${i.outOfBounds.container.edges.length>1?"s":""})`)),u}function r8(i,s,u){let f=[];i.above&&f.push(`below \`${i.above.label}\``),i.below&&f.push(`above \`${i.below.label}\``),i.left&&f.push(`right of \`${i.left.label}\``),i.right&&f.push(`left of \`${i.right.label}\``),i.containedIn&&f.push(`inside \`${i.containedIn.label}\``),f.push(mv(i.alignment)),i.outOfBounds?.viewport&&f.push(`**outside viewport** (${i.outOfBounds.viewport.join(", ")})`),i.outOfBounds?.container&&f.push(`**outside \`${i.outOfBounds.container.label}\`** (${i.outOfBounds.container.edges.join(", ")})`);let h=u?`, ${Math.round(u.width)}\xD7${Math.round(u.height)}px`:"";return`at (${Math.round(s.x)}, ${Math.round(s.y)})${h}: ${f.join(", ")}`}function Qb(i){if(i.length<2)return[];let s=[],u=new Set;for(let f=0;f<i.length;f++){if(u.has(f))continue;let h=[f];for(let y=f+1;y<i.length;y++)u.has(y)||Math.abs(i[f].rect.y-i[y].rect.y)<Vb&&h.push(y);if(h.length>=2){let y=h.map(A=>i[A]);y.sort((A,ie)=>A.rect.x-ie.rect.x);let k=[];for(let A=0;A<y.length-1;A++)k.push(Math.round(y[A+1].rect.x-(y[A].rect.x+y[A].rect.width)));let E=Math.round(y.reduce((A,ie)=>A+ie.rect.y,0)/y.length);s.push({labels:y.map(A=>A.label),type:"row",sharedEdge:E,gaps:k,avgGap:k.length?Math.round(k.reduce((A,ie)=>A+ie,0)/k.length):0}),h.forEach(A=>u.add(A))}}for(let f=0;f<i.length;f++){if(u.has(f))continue;let h=[f];for(let y=f+1;y<i.length;y++)u.has(y)||Math.abs(i[f].rect.x-i[y].rect.x)<Vb&&h.push(y);if(h.length>=2){let y=h.map(A=>i[A]);y.sort((A,ie)=>A.rect.y-ie.rect.y);let k=[];for(let A=0;A<y.length-1;A++)k.push(Math.round(y[A+1].rect.y-(y[A].rect.y+y[A].rect.height)));let E=Math.round(y.reduce((A,ie)=>A+ie.rect.x,0)/y.length);s.push({labels:y.map(A=>A.label),type:"column",sharedEdge:E,gaps:k,avgGap:k.length?Math.round(k.reduce((A,ie)=>A+ie,0)/k.length):0}),h.forEach(A=>u.add(A))}}return s}function s8(i){if(i.length<2)return[];let s=Qb(i.map(k=>({label:k.label,rect:k.originalRect}))),u=Qb(i.map(k=>({label:k.label,rect:k.currentRect}))),f=[],h=new Set;for(let k of s){let E=new Set(k.labels),A=null,ie=0;for(let B of u){let $=B.labels.filter(v=>E.has(v)).length;$>=2&&$>ie&&(A=B,ie=$)}if(A){let B=A.labels.filter(v=>E.has(v)),$=B.join(", ");if(A.type!==k.type){let v=k.type==="row"?"y":"x",Z=A.type==="row"?"y":"x";f.push(`**${$}**: ${k.type} (${v}\u2248${k.sharedEdge}, ${k.avgGap}px gaps) \u2192 ${A.type} (${Z}\u2248${A.sharedEdge}, ${A.avgGap}px gaps)`)}else if(Math.abs(k.sharedEdge-A.sharedEdge)>20||Math.abs(k.avgGap-A.avgGap)>5){let v=k.type==="row"?"y":"x",Z=Math.abs(k.sharedEdge-A.sharedEdge)>20?` ${v}: ${k.sharedEdge} \u2192 ${A.sharedEdge}`:"",X=Math.abs(k.avgGap-A.avgGap)>5?` gaps: ${k.avgGap}px \u2192 ${A.avgGap}px`:"";f.push(`**${$}**: ${k.type} shifted \u2014${Z}${X}`)}B.forEach(v=>h.add(v))}else{let B=k.labels.join(", "),$=k.type==="row"?"y":"x";f.push(`**${B}**: ${k.type} (${$}\u2248${k.sharedEdge}) dissolved`),k.labels.forEach(v=>h.add(v))}}for(let k of u){if(k.labels.every(ie=>h.has(ie))||k.labels.filter(ie=>!h.has(ie)).length<2)continue;if(!s.some(ie=>ie.labels.filter($=>k.labels.includes($)).length>=2)){let ie=k.type==="row"?"y":"x";f.push(`**${k.labels.join(", ")}**: new ${k.type} (${ie}\u2248${k.sharedEdge}, ${k.avgGap}px gaps)`),k.labels.forEach(B=>h.add(B))}}let y=i.filter(k=>!h.has(k.label));if(y.length>=2){let k={};for(let E of y){let A=Math.round(E.currentRect.x/5)*5;(k[A]??(k[A]=[])).push(E.label)}for(let[E,A]of Object.entries(k))A.length>=2&&f.push(`**${A.join(", ")}**: shared left edge at x\u2248${E}`)}return f}function gv(i){if(typeof document>"u")return{viewport:i,contentArea:null};let s=[],u=new Set,f=E=>{u.has(E)||E instanceof HTMLElement&&(E.hasAttribute("data-feedback-toolbar")||Mp.has(E.tagName.toLowerCase())||(u.add(E),s.push(E)))},h=document.querySelector("main");h&&f(h);let y=document.querySelector("[role='main']");y&&f(y);for(let E of Array.from(document.body.children))if(f(E),E.children){for(let A of Array.from(E.children))if(f(A),A.children)for(let ie of Array.from(A.children))f(ie)}let k=null;for(let E of s){let A=E.getBoundingClientRect();if(A.height<50)continue;let ie=getComputedStyle(E);if(ie.maxWidth&&ie.maxWidth!=="none"&&ie.maxWidth!=="0px"){(!k||A.width<k.rect.width)&&(k={el:E,rect:A});continue}!k&&A.width<i.width-20&&A.width>100&&(k={el:E,rect:A})}if(k){let{el:E,rect:A}=k;return{viewport:i,contentArea:{width:Math.round(A.width),left:Math.round(A.left),right:Math.round(A.right),centerX:Math.round(A.left+A.width/2),selector:us(E)}}}return{viewport:i,contentArea:null}}function c8(i){if(typeof document>"u")return null;let s=document.querySelector(i);if(!s?.parentElement)return null;let u=getComputedStyle(s.parentElement),f={parentDisplay:u.display,parentSelector:us(s.parentElement)};return u.display.includes("flex")&&(f.flexDirection=u.flexDirection),u.display.includes("grid")&&u.gridTemplateColumns!=="none"&&(f.gridCols=u.gridTemplateColumns),u.gap&&u.gap!=="normal"&&u.gap!=="0px"&&(f.gap=u.gap),f}function yv(i,s){let u=s.contentArea,f=u?u.width:s.viewport.width,h=u?u.left:0,y=u?u.centerX:Math.round(s.viewport.width/2),k=Math.round(i.x-h),E=Math.round(h+f-(i.x+i.width)),A=(i.width/f*100).toFixed(1),ie=i.x+i.width/2,B=Math.abs(ie-y)<20,$=i.width/f>.95,v=[];return $?v.push("`width: 100%` of container"):v.push(`left \`${k}px\` in container, right \`${E}px\`, width \`${A}%\` (\`${Math.round(i.width)}px\`)`),B&&!$&&v.push("centered \u2014 `margin-inline: auto`"),v.join(" \u2014 ")}function bv(i){let{viewport:s,contentArea:u}=i,f=`### Reference Frame
`;if(f+=`- Viewport: \`${s.width}\xD7${s.height}px\`
`,u){let h=u;f+=`- Content area: \`${h.width}px\` wide, left edge at \`x=${h.left}\`, right at \`x=${h.right}\` (\`${h.selector}\`)
`,f+=`- Pixel \u2192 CSS translation:
`,f+=`  - **Horizontal position in container**: \`element.x - ${h.left}\` \u2192 use as \`margin-left\` or \`left\`
`,f+=`  - **Width as % of container**: \`element.width / ${h.width} \xD7 100\` \u2192 use as \`width: X%\`
`,f+="  - **Vertical gap between elements**: `nextElement.y - (prevElement.y + prevElement.height)` \u2192 use as `margin-top` or `gap`\n",f+=`  - **Centered**: if \`|element.centerX - ${h.centerX}| < 20px\` \u2192 use \`margin-inline: auto\`
`}else f+=`- No distinct content container \u2014 elements positioned relative to full viewport
`,f+=`- Pixel \u2192 CSS translation:
`,f+=`  - **Width as % of viewport**: \`element.width / ${s.width} \xD7 100\` \u2192 use as \`width: X%\`
`,f+=`  - **Centered**: if \`|(element.x + element.width/2) - ${Math.round(s.width/2)}| < 20px\` \u2192 use \`margin-inline: auto\`
`;return f+=`
`,f}function u8(i){let s=c8(i);if(!s)return null;let u=`\`${s.parentDisplay}\``;return s.flexDirection&&(u+=`, flex-direction: \`${s.flexDirection}\``),s.gridCols&&(u+=`, grid-template-columns: \`${s.gridCols}\``),s.gap&&(u+=`, gap: \`${s.gap}\``),`Parent: ${u} (\`${s.parentSelector}\`)`}function Wb(i,s,u,f="standard"){if(i.length===0)return"";let h=[...i].sort((j,J)=>Math.abs(j.y-J.y)<20?j.x-J.x:j.y-J.y),y="";if(u?.blankCanvas?(y+=`## Wireframe: New Page

`,u.wireframePurpose&&(y+=`> **Purpose:** ${u.wireframePurpose}
>
`),y+=`> ${i.length} component${i.length!==1?"s":""} placed \u2014 this is a standalone wireframe, not related to the current page.
>
> This wireframe is a rough sketch for exploring ideas.

`):y+=`## Design Layout

> ${i.length} component${i.length!==1?"s":""} placed

`,f==="compact")return y+=`### Components
`,h.forEach((j,J)=>{let De=_a[j.type]?.label||j.type;y+=`${J+1}. **${De}** \u2014 \`${Math.round(j.width)}\xD7${Math.round(j.height)}px\` at \`(${Math.round(j.x)}, ${Math.round(j.y)})\`
`}),y;let k=gv(s);y+=bv(k),y+=`### Components
`,h.forEach((j,J)=>{let De=_a[j.type]?.label||j.type,Ie={x:j.x,y:j.y,width:j.width,height:j.height};y+=`${J+1}. **${De}** \u2014 \`${Math.round(j.width)}\xD7${Math.round(j.height)}px\` at \`(${Math.round(j.x)}, ${Math.round(j.y)})\`
`;let Ge=Tp(Ie),jt=pv(Ge,{includeLeftRight:f==="detailed"||f==="forensic"});for(let Xe of jt)y+=`   - ${Xe}
`;let Me=yv(Ie,k);Me&&(y+=`   - CSS: ${Me}
`)}),y+=`
### Layout Analysis
`;let E=[];for(let j of h){let J=E.find(De=>Math.abs(De.y-j.y)<30);J?J.items.push(j):E.push({y:j.y,items:[j]})}if(E.sort((j,J)=>j.y-J.y),E.forEach((j,J)=>{j.items.sort((Ie,Ge)=>Ie.x-Ge.x);let De=j.items.map(Ie=>_a[Ie.type]?.label||Ie.type);if(j.items.length===1){let Ge=j.items[0].width>s.width*.8;y+=`- Row ${J+1} (y\u2248${Math.round(j.y)}): ${De[0]}${Ge?" \u2014 full width":""}
`}else y+=`- Row ${J+1} (y\u2248${Math.round(j.y)}): ${De.join(" | ")} \u2014 ${j.items.length} items side by side
`}),f==="detailed"||f==="forensic"){y+=`
### Spacing & Gaps
`;for(let j=0;j<h.length-1;j++){let J=h[j],De=h[j+1],Ie=_a[J.type]?.label||J.type,Ge=_a[De.type]?.label||De.type,$t=Math.round(De.y-(J.y+J.height)),jt=Math.round(De.x-(J.x+J.width));Math.abs(J.y-De.y)<30?y+=`- ${Ie} \u2192 ${Ge}: \`${jt}px\` horizontal gap
`:y+=`- ${Ie} \u2192 ${Ge}: \`${$t}px\` vertical gap
`}if(f==="forensic"&&h.length>2){y+=`
### All Pairwise Gaps
`;for(let j=0;j<h.length;j++)for(let J=j+1;J<h.length;J++){let De=h[j],Ie=h[J],Ge=_a[De.type]?.label||De.type,$t=_a[Ie.type]?.label||Ie.type,jt=Math.round(Ie.y-(De.y+De.height)),Me=Math.round(Ie.x-(De.x+De.width));y+=`- ${Ge} \u2194 ${$t}: h=\`${Me}px\` v=\`${jt}px\`
`}}f==="forensic"&&(y+=`
### Z-Order (placement order)
`,i.forEach((j,J)=>{let De=_a[j.type]?.label||j.type;y+=`${J}. ${De} at \`(${Math.round(j.x)}, ${Math.round(j.y)})\`
`}))}y+=`
### Suggested Implementation
`;let A=h.some(j=>j.type==="navigation"),ie=h.some(j=>j.type==="hero"),B=h.some(j=>j.type==="sidebar"),$=h.some(j=>j.type==="footer"),v=h.filter(j=>j.type==="card"),Z=h.filter(j=>j.type==="form"),X=h.filter(j=>j.type==="table"),re=h.filter(j=>j.type==="modal");if(A&&(y+=`- Top navigation bar with logo + nav links + CTA
`),ie&&(y+=`- Hero section with heading, subtext, and call-to-action
`),B&&(y+=`- Sidebar layout \u2014 use CSS Grid with sidebar + main content area
`),v.length>1?y+=`- ${v.length}-column card grid \u2014 use CSS Grid or Flexbox
`:v.length===1&&(y+=`- Card component with image + content area
`),Z.length>0&&(y+=`- ${Z.length} form${Z.length>1?"s":""} \u2014 add proper labels, validation, and submit handling
`),X.length>0&&(y+=`- Data table \u2014 consider sortable columns and pagination
`),re.length>0&&(y+=`- Modal dialog \u2014 add overlay backdrop and focus trapping
`),$&&(y+=`- Multi-column footer with links
`),f==="detailed"||f==="forensic"){if(y+=`
### CSS Suggestions
`,B){let j=h.find(J=>J.type==="sidebar");y+=`- \`display: grid; grid-template-columns: ${Math.round(j.width)}px 1fr;\`
`}if(v.length>1){let j=Math.round(v[0].width);y+=`- \`display: grid; grid-template-columns: repeat(${v.length}, ${j}px); gap: 16px;\`
`}A&&(y+="- Navigation: `position: sticky; top: 0; z-index: 50;`\n")}return y}function Gb(i,s="standard",u){let{sections:f}=i,h=[];for(let B of f){let $=B.originalRect,v=B.currentRect,Z=Math.abs($.x-v.x)>1||Math.abs($.y-v.y)>1,X=Math.abs($.width-v.width)>1||Math.abs($.height-v.height)>1;if(!Z&&!X){s==="forensic"&&h.push({section:B,posMoved:!1,sizeChanged:!1});continue}h.push({section:B,posMoved:Z,sizeChanged:X})}if(h.length===0||s!=="forensic"&&h.every(B=>!B.posMoved&&!B.sizeChanged))return"";let y=`## Suggested Layout Changes

`,k=u?u.width:typeof window<"u"?window.innerWidth:0,E=u?u.height:typeof window<"u"?window.innerHeight:0,A=gv({width:k,height:E});s!=="compact"&&(y+=bv(A)),s==="forensic"&&(y+=`> Detected at: \`${new Date(i.detectedAt).toISOString()}\`
`,y+=`> Total sections: ${f.length}

`);let ie=B=>f.map($=>({label:$.label,selector:$.selector,rect:B==="original"?$.originalRect:$.currentRect}));y+=`**Changes:**
`;for(let{section:B,posMoved:$,sizeChanged:v}of h){let Z=B.originalRect,X=B.currentRect;if(!$&&!v){y+=`- ${B.label} \u2014 unchanged at (${Math.round(X.x)}, ${Math.round(X.y)}) ${Math.round(X.width)}\xD7${Math.round(X.height)}px
`;continue}if(s==="compact"){$&&v?y+=`- Suggested: move **${B.label}** to (${Math.round(X.x)}, ${Math.round(X.y)}) ${Math.round(X.width)}\xD7${Math.round(X.height)}px
`:$?y+=`- Suggested: move **${B.label}** to (${Math.round(X.x)}, ${Math.round(X.y)})
`:y+=`- Suggested: resize **${B.label}** to ${Math.round(X.width)}\xD7${Math.round(X.height)}px
`;continue}if($&&v?y+=`- Suggested: move and resize **${B.label}**
`:$?y+=`- Suggested: move **${B.label}**
`:y+=`- Suggested: resize **${B.label}** from ${Math.round(Z.width)}\xD7${Math.round(Z.height)}px to ${Math.round(X.width)}\xD7${Math.round(X.height)}px
`,$){let j=Tp(Z,ie("original")),J=Tp(X,ie("current")),De=v?{width:Z.width,height:Z.height}:void 0;y+=`  - Currently ${r8(j,{x:Z.x,y:Z.y},De)}
`;let Ie=v?{width:X.width,height:X.height}:void 0,Ge=`at (${Math.round(X.x)}, ${Math.round(X.y)})`,$t=Ie?`, ${Math.round(Ie.width)}\xD7${Math.round(Ie.height)}px`:"",Me=pv(J,{includeLeftRight:s==="detailed"||s==="forensic"});if(Me.length>0){y+=`  - Suggested position ${Ge}${$t}: ${Me[0]}
`;for(let wt=1;wt<Me.length;wt++)y+=`    ${Me[wt]}
`}else y+=`  - Suggested position ${Ge}${$t}
`;let Xe=yv(X,A);Xe&&(y+=`  - CSS: ${Xe}
`)}let re=u8(B.selector);if(re&&(y+=`  - ${re}
`),y+=`  - Selector: \`${B.selector}\`
`,s==="detailed"||s==="forensic"){let j=B.className?`${B.tagName}.${B.className.split(" ")[0]}`:B.tagName;j!==B.selector&&(y+=`  - Element: \`${j}\`
`),B.role&&(y+=`  - Role: \`${B.role}\`
`),s==="forensic"&&B.textSnippet&&(y+=`  - Text: "${B.textSnippet}"
`)}s==="forensic"&&(y+=`  - Original rect: \`{ x: ${Math.round(Z.x)}, y: ${Math.round(Z.y)}, w: ${Math.round(Z.width)}, h: ${Math.round(Z.height)} }\`
`,y+=`  - Current rect: \`{ x: ${Math.round(X.x)}, y: ${Math.round(X.y)}, w: ${Math.round(X.width)}, h: ${Math.round(X.height)} }\`
`)}if(s!=="compact"){let B=h.filter(v=>v.posMoved).map(v=>({label:v.section.label,originalRect:v.section.originalRect,currentRect:v.section.currentRect})),$=s8(B);if($.length>0){y+=`
### Layout Summary
`;for(let v of $)y+=`- ${v}
`}}if(s!=="compact"&&f.length>1){y+=`
### All Sections (current positions)
`;let B=[...f].sort(($,v)=>Math.abs($.currentRect.y-v.currentRect.y)<20?$.currentRect.x-v.currentRect.x:$.currentRect.y-v.currentRect.y);for(let $ of B){let v=$.currentRect,Z=Math.abs(v.x-$.originalRect.x)>1||Math.abs(v.y-$.originalRect.y)>1||Math.abs(v.width-$.originalRect.width)>1||Math.abs(v.height-$.originalRect.height)>1;y+=`- ${$.label}: \`${Math.round(v.width)}\xD7${Math.round(v.height)}px\` at \`(${Math.round(v.x)}, ${Math.round(v.y)})\`${Z?" \u2190 suggested":""}
`}}return y}function Kh(i){return`${Rp}${i}`}function mp(i){if(typeof window>"u")return[];try{let s=localStorage.getItem(Kh(i));if(!s)return[];let u=JSON.parse(s),f=Date.now()-vv*24*60*60*1e3;return u.filter(h=>!h.timestamp||h.timestamp>f)}catch{return[]}}function xv(i,s){if(!(typeof window>"u"))try{localStorage.setItem(Kh(i),JSON.stringify(s))}catch{}}function d8(){let i=new Map;if(typeof window>"u")return i;try{let s=Date.now()-vv*24*60*60*1e3;for(let u=0;u<localStorage.length;u++){let f=localStorage.key(u);if(f?.startsWith(Rp)){let h=f.slice(Rp.length),y=localStorage.getItem(f);if(y){let E=JSON.parse(y).filter(A=>!A.timestamp||A.timestamp>s);E.length>0&&i.set(h,E)}}}}catch{}return i}function vd(i,s,u){let f=s.map(h=>({...h,_syncedTo:u}));xv(i,f)}function f8(i){if(typeof window>"u")return[];try{let s=localStorage.getItem(`${Op}${i}`);return s?JSON.parse(s):[]}catch{return[]}}function h8(i,s){if(!(typeof window>"u"))try{localStorage.setItem(`${Op}${i}`,JSON.stringify(s))}catch{}}function _8(i){if(!(typeof window>"u"))try{localStorage.removeItem(`${Op}${i}`)}catch{}}function m8(i){if(typeof window>"u")return null;try{let s=localStorage.getItem(`${zp}${i}`);return s?JSON.parse(s):null}catch{return null}}function p8(i,s){if(!(typeof window>"u"))try{localStorage.setItem(`${zp}${i}`,JSON.stringify(s))}catch{}}function g8(i){if(!(typeof window>"u"))try{localStorage.removeItem(`${zp}${i}`)}catch{}}function y8(i){if(typeof window>"u")return null;try{let s=localStorage.getItem(`${Lp}${i}`);return s?JSON.parse(s):null}catch{return null}}function Zb(i,s){if(!(typeof window>"u"))try{localStorage.setItem(`${Lp}${i}`,JSON.stringify(s))}catch{}}function Wh(i){if(!(typeof window>"u"))try{localStorage.removeItem(`${Lp}${i}`)}catch{}}function Np(i){return`${wv}${i}`}function b8(i){if(typeof window>"u")return null;try{return localStorage.getItem(Np(i))}catch{return null}}function pp(i,s){if(!(typeof window>"u"))try{localStorage.setItem(Np(i),s)}catch{}}function v8(i){if(!(typeof window>"u"))try{localStorage.removeItem(Np(i))}catch{}}function x8(){if(typeof window>"u")return!1;try{return sessionStorage.getItem(Dp)==="1"}catch{return!1}}function w8(i){if(!(typeof window>"u"))try{i?sessionStorage.setItem(Dp,"1"):sessionStorage.removeItem(Dp)}catch{}}async function gp(i,s){let u=await fetch(`${i}/sessions`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:s})});if(!u.ok)throw new Error(`Failed to create session: ${u.status}`);return u.json()}async function Pb(i,s){let u=await fetch(`${i}/sessions/${s}`);if(!u.ok)throw new Error(`Failed to get session: ${u.status}`);return u.json()}async function Ec(i,s,u){let f=await fetch(`${i}/sessions/${s}/annotations`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(u)});if(!f.ok)throw new Error(`Failed to sync annotation: ${f.status}`);return f.json()}async function Fb(i,s,u){let f=await fetch(`${i}/annotations/${s}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(u)});if(!f.ok)throw new Error(`Failed to update annotation: ${f.status}`);return f.json()}async function yr(i,s){let u=await fetch(`${i}/annotations/${s}`,{method:"DELETE"});if(!u.ok)throw new Error(`Failed to delete annotation: ${u.status}`)}function C8(i){let s=i?.mode??"filtered",u=Jb;if(i?.skipExact){let f=i.skipExact instanceof Set?i.skipExact:new Set(i.skipExact);u=new Set([...Jb,...f])}return{maxComponents:i?.maxComponents??6,maxDepth:i?.maxDepth??30,mode:s,skipExact:u,skipPatterns:i?.skipPatterns?[...Kb,...i.skipPatterns]:Kb,userPatterns:i?.userPatterns??S8,filter:i?.filter}}function k8(i){return i.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/([A-Z])([A-Z][a-z])/g,"$1-$2").toLowerCase()}function E8(i,s=10){let u=new Set,f=i,h=0;for(;f&&h<s;)f.className&&typeof f.className=="string"&&f.className.split(/\s+/).forEach(y=>{if(y.length>1){let k=y.replace(/[_][a-zA-Z0-9]{5,}.*$/,"").toLowerCase();k.length>1&&u.add(k)}}),f=f.parentElement,h++;return u}function M8(i,s){let u=k8(i);for(let f of s){if(f===u)return!0;let h=u.split("-").filter(k=>k.length>2),y=f.split("-").filter(k=>k.length>2);for(let k of h)for(let E of y)if(k===E||k.includes(E)||E.includes(k))return!0}return!1}function T8(i,s,u,f){if(u.filter)return u.filter(i,s);switch(u.mode){case"all":return!0;case"filtered":return!(u.skipExact.has(i)||u.skipPatterns.some(h=>h.test(i)));case"smart":return u.skipExact.has(i)||u.skipPatterns.some(h=>h.test(i))?!1:!!(f&&M8(i,f)||u.userPatterns.some(h=>h.test(i)));default:return!0}}function yp(i){return Object.keys(i).some(s=>s.startsWith("__reactFiber$")||s.startsWith("__reactInternalInstance$")||s.startsWith("__reactProps$"))}function D8(){if(Mc!==null)return Mc;if(typeof document>"u")return!1;if(document.body&&yp(document.body))return Mc=!0,!0;let i=["#root","#app","#__next","[data-reactroot]"];for(let s of i){let u=document.querySelector(s);if(u&&yp(u))return Mc=!0,!0}if(document.body){for(let s of document.body.children)if(yp(s))return Mc=!0,!0}return Mc=!1,!1}function A8(i){return Object.keys(i).find(u=>u.startsWith("__reactFiber$")||u.startsWith("__reactInternalInstance$"))||null}function O8(i){let s=A8(i);return s?i[s]:null}function as(i){return i?i.displayName?i.displayName:i.name?i.name:null:null}function z8(i){let{tag:s,type:u,elementType:f}=i;if(s===on.HostComponent||s===on.HostText||s===on.HostHoistable||s===on.HostSingleton||s===on.Fragment||s===on.Mode||s===on.Profiler||s===on.DehydratedFragment||s===on.HostRoot||s===on.HostPortal||s===on.ScopeComponent||s===on.OffscreenComponent||s===on.LegacyHiddenComponent||s===on.CacheComponent||s===on.TracingMarkerComponent||s===on.Throw||s===on.ViewTransitionComponent||s===on.ActivityComponent)return null;if(s===on.ForwardRef){let h=f;if(h?.render){let y=as(h.render);if(y)return y}return h?.displayName?h.displayName:as(u)}if(s===on.MemoComponent||s===on.SimpleMemoComponent){let h=f;if(h?.type){let y=as(h.type);if(y)return y}return h?.displayName?h.displayName:as(u)}if(s===on.ContextProvider){let h=u;return h?._context?.displayName?`${h._context.displayName}.Provider`:null}if(s===on.ContextConsumer){let h=u;return h?.displayName?`${h.displayName}.Consumer`:null}if(s===on.LazyComponent){let h=f;return h?._status===1&&h._result?as(h._result):null}return s===on.SuspenseComponent||s===on.SuspenseListComponent?null:s===on.IncompleteClassComponent||s===on.IncompleteFunctionComponent||s===on.FunctionComponent||s===on.ClassComponent||s===on.IndeterminateComponent?as(u):null}function L8(i){return i.length<=2||i.length<=3&&i===i.toLowerCase()}function N8(i,s){let u=C8(s),f=u.mode==="all";if(f){let A=xd.map.get(i);if(A!==void 0)return A}if(!D8()){let A={path:null,components:[]};return f&&xd.map.set(i,A),A}let h=u.mode==="smart"?E8(i):void 0,y=[];try{let A=O8(i),ie=0;for(;A&&ie<u.maxDepth&&y.length<u.maxComponents;){let B=z8(A);B&&!L8(B)&&T8(B,ie,u,h)&&y.push(B),A=A.return,ie++}}catch{let A={path:null,components:[]};return f&&xd.map.set(i,A),A}if(y.length===0){let A={path:null,components:[]};return f&&xd.map.set(i,A),A}let E={path:y.slice().reverse().map(A=>`<${A}>`).join(" "),components:y};return f&&xd.map.set(i,E),E}function $8(i){if(!i||typeof i!="object")return null;let s=Object.keys(i),u=s.find(y=>y.startsWith("__reactFiber$"));if(u)return i[u]||null;let f=s.find(y=>y.startsWith("__reactInternalInstance$"));if(f)return i[f]||null;let h=s.find(y=>{if(!y.startsWith("__react"))return!1;let k=i[y];return k&&typeof k=="object"&&"_debugSource"in k});return h&&i[h]||null}function kd(i){if(!i.type||typeof i.type=="string")return null;if(typeof i.type=="object"||typeof i.type=="function"){let s=i.type;if(s.displayName)return s.displayName;if(s.name)return s.name}return null}function B8(i,s=50){let u=i,f=0;for(;u&&f<s;){if(u._debugSource)return{source:u._debugSource,componentName:kd(u)};if(u._debugOwner?._debugSource)return{source:u._debugOwner._debugSource,componentName:kd(u._debugOwner)};u=u.return,f++}return null}function H8(i){let s=i,u=0,f=50;for(;s&&u<f;){let h=s,y=["_debugSource","__source","_source","debugSource"];for(let k of y){let E=h[k];if(E&&typeof E=="object"&&"fileName"in E)return{source:E,componentName:kd(s)}}if(s.memoizedProps){let k=s.memoizedProps;if(k.__source&&typeof k.__source=="object"){let E=k.__source;if(E.fileName&&E.lineNumber)return{source:{fileName:E.fileName,lineNumber:E.lineNumber,columnNumber:E.columnNumber},componentName:kd(s)}}}s=s.return,u++}return null}function U8(i){let s=i.tag,u=i.type,f=i.elementType;if(typeof u=="string"||u==null||typeof u=="function"&&u.prototype?.isReactComponent)return null;if((s===wd.FunctionComponent||s===wd.IndeterminateComponent)&&typeof u=="function")return u;if(s===wd.ForwardRef&&f){let h=f.render;if(typeof h=="function")return h}if((s===wd.MemoComponent||s===wd.SimpleMemoComponent)&&f){let h=f.type;if(typeof h=="function")return h}return typeof u=="function"?u:null}function j8(){let i=Sv.default,s=i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;if(s&&"H"in s)return{get:()=>s.H,set:f=>{s.H=f}};let u=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;if(u){let f=u.ReactCurrentDispatcher;if(f&&"current"in f)return{get:()=>f.current,set:h=>{f.current=h}}}return null}function I8(i){let s=i.split(`
`),u=[/source-location/,/\/dist\/index\./,/node_modules\//,/react-dom/,/react\.development/,/react\.production/,/chunk-[A-Z0-9]+/i,/react-stack-bottom-frame/,/react-reconciler/,/scheduler/,/<anonymous>/],f=/^\s*at\s+(?:.*?\s+\()?(.+?):(\d+):(\d+)\)?$/,h=/^[^@]*@(.+?):(\d+):(\d+)$/;for(let y of s){let k=y.trim();if(!k||u.some(A=>A.test(k)))continue;let E=f.exec(k)||h.exec(k);if(E)return{fileName:E[1],line:parseInt(E[2],10),column:parseInt(E[3],10)}}return null}function Y8(i){let s=i;return s=s.replace(/[?#].*$/,""),s=s.replace(/^turbopack:\/\/\/\[project\]\//,""),s=s.replace(/^webpack-internal:\/\/\/\.\//,""),s=s.replace(/^webpack-internal:\/\/\//,""),s=s.replace(/^webpack:\/\/\/\.\//,""),s=s.replace(/^webpack:\/\/\//,""),s=s.replace(/^turbopack:\/\/\//,""),s=s.replace(/^https?:\/\/[^/]+\//,""),s=s.replace(/^file:\/\/\//,"/"),s=s.replace(/^\([^)]+\)\/\.\//,""),s=s.replace(/^\.\//,""),s}function X8(i){let s=U8(i);if(!s)return null;if(Gh.has(s))return Gh.get(s);let u=j8();if(!u)return Gh.set(s,null),null;let f=u.get(),h=null;try{let y=new Proxy({},{get(){throw new Error("probe")}});u.set(y);try{s({})}catch(k){if(k instanceof Error&&k.message==="probe"&&k.stack){let E=I8(k.stack);E&&(h={fileName:Y8(E.fileName),lineNumber:E.line,columnNumber:E.column,componentName:kd(i)||void 0})}}}finally{u.set(f)}return Gh.set(s,h),h}function q8(i,s=15){let u=i,f=0;for(;u&&f<s;){let h=X8(u);if(h)return h;u=u.return,f++}return null}function Ap(i){let s=$8(i);if(!s)return{found:!1,reason:"no-fiber",isReactApp:!1,isProduction:!1};let u=B8(s);if(u||(u=H8(s)),u?.source)return{found:!0,source:{fileName:u.source.fileName,lineNumber:u.source.lineNumber,columnNumber:u.source.columnNumber,componentName:u.componentName||void 0},isReactApp:!0,isProduction:!1};let f=q8(s);return f?{found:!0,source:f,isReactApp:!0,isProduction:!1}:{found:!1,reason:"no-debug-source",isReactApp:!0,isProduction:!1}}function V8(i,s="path"){let{fileName:u,lineNumber:f,columnNumber:h}=i,y=`${u}:${f}`;return h!==void 0&&(y+=`:${h}`),s==="vscode"?`vscode://file${u.startsWith("/")?"":"/"}${y}`:y}function Q8(i,s=10){let u=i,f=0;for(;u&&f<s;){let h=Ap(u);if(h.found)return h;u=u.parentElement,f++}return Ap(i)}function ev(i,s,u="standard"){if(i.length===0)return"";let f=typeof window<"u"?`${window.innerWidth}\xD7${window.innerHeight}`:"unknown",h=`## Page Feedback: ${s}
`;return u==="forensic"?(h+=`
**Environment:**
`,h+=`- Viewport: ${f}
`,typeof window<"u"&&(h+=`- URL: ${window.location.href}
`,h+=`- User Agent: ${navigator.userAgent}
`,h+=`- Timestamp: ${new Date().toISOString()}
`,h+=`- Device Pixel Ratio: ${window.devicePixelRatio}
`),h+=`
---
`):u!=="compact"&&(h+=`**Viewport:** ${f}
`),h+=`
`,i.forEach((y,k)=>{u==="compact"?(h+=`${k+1}. **${y.element}**${y.sourceFile?` (${y.sourceFile})`:""}: ${y.comment}`,y.selectedText&&(h+=` (re: "${y.selectedText.slice(0,30)}${y.selectedText.length>30?"...":""}")`),h+=`
`):u==="forensic"?(h+=`### ${k+1}. ${y.element}
`,y.isMultiSelect&&y.fullPath&&(h+=`*Forensic data shown for first element of selection*
`),y.fullPath&&(h+=`**Full DOM Path:** ${y.fullPath}
`),y.cssClasses&&(h+=`**CSS Classes:** ${y.cssClasses}
`),y.boundingBox&&(h+=`**Position:** x:${Math.round(y.boundingBox.x)}, y:${Math.round(y.boundingBox.y)} (${Math.round(y.boundingBox.width)}\xD7${Math.round(y.boundingBox.height)}px)
`),h+=`**Annotation at:** ${y.x.toFixed(1)}% from left, ${Math.round(y.y)}px from top
`,y.selectedText&&(h+=`**Selected text:** "${y.selectedText}"
`),y.nearbyText&&!y.selectedText&&(h+=`**Context:** ${y.nearbyText.slice(0,100)}
`),y.computedStyles&&(h+=`**Computed Styles:** ${y.computedStyles}
`),y.accessibility&&(h+=`**Accessibility:** ${y.accessibility}
`),y.nearbyElements&&(h+=`**Nearby Elements:** ${y.nearbyElements}
`),y.sourceFile&&(h+=`**Source:** ${y.sourceFile}
`),y.reactComponents&&(h+=`**React:** ${y.reactComponents}
`),h+=`**Feedback:** ${y.comment}

`):(h+=`### ${k+1}. ${y.element}
`,h+=`**Location:** ${y.elementPath}
`,y.sourceFile&&(h+=`**Source:** ${y.sourceFile}
`),y.reactComponents&&(h+=`**React:** ${y.reactComponents}
`),u==="detailed"&&(y.cssClasses&&(h+=`**Classes:** ${y.cssClasses}
`),y.boundingBox&&(h+=`**Position:** ${Math.round(y.boundingBox.x)}px, ${Math.round(y.boundingBox.y)}px (${Math.round(y.boundingBox.width)}\xD7${Math.round(y.boundingBox.height)}px)
`)),y.selectedText&&(h+=`**Selected text:** "${y.selectedText}"
`),u==="detailed"&&y.nearbyText&&!y.selectedText&&(h+=`**Context:** ${y.nearbyText.slice(0,100)}
`),h+=`**Feedback:** ${y.comment}

`)}),h.trim()}function tv({annotation:i,globalIndex:s,layerIndex:u,layerSize:f,isExiting:h,isClearing:y,isAnimated:k,isHovered:E,isDeleting:A,isEditingAny:ie,renumberFrom:B,markerClickBehavior:$,tooltipStyle:v,onHoverEnter:Z,onHoverLeave:X,onClick:re,onContextMenu:j}){let J=(E||A)&&!ie,De=J&&$==="delete",Ie=i.isMultiSelect,Ge=Ie?"var(--agentation-color-green)":"var(--agentation-color-accent)",$t=h?Kn.exit:y?Kn.clearing:k?"":Kn.enter,jt=h?`${(f-1-u)*20}ms`:`${u*20}ms`;return(0,Al.jsxs)("div",{className:`${Kn.marker} ${Ie?Kn.multiSelect:""} ${$t} ${De?Kn.hovered:""}`,"data-annotation-marker":!0,style:{left:`${i.x}%`,top:i.y,backgroundColor:De?void 0:Ge,animationDelay:jt},onMouseEnter:()=>Z(i),onMouseLeave:X,onClick:Me=>{Me.stopPropagation(),h||re(i)},onContextMenu:j?Me=>{$==="delete"&&(Me.preventDefault(),Me.stopPropagation(),h||j(i))}:void 0,children:[J?De?(0,Al.jsx)(rv,{size:Ie?18:16}):(0,Al.jsx)(c6,{size:16}):(0,Al.jsx)("span",{className:B!==null&&s>=B?Kn.renumber:void 0,children:s+1}),E&&!ie&&(0,Al.jsxs)("div",{className:`${Kn.markerTooltip} ${Kn.enter}`,style:v,children:[(0,Al.jsxs)("span",{className:Kn.markerQuote,children:[i.element,i.selectedText&&` "${i.selectedText.slice(0,30)}${i.selectedText.length>30?"...":""}"`]}),(0,Al.jsx)("span",{className:Kn.markerNote,children:i.comment})]})]})}function F8({x:i,y:s,isMultiSelect:u,isExiting:f}){return(0,Al.jsx)("div",{className:`${Kn.marker} ${Kn.pending} ${u?Kn.multiSelect:""} ${f?Kn.exit:Kn.enter}`,style:{left:`${i}%`,top:s,backgroundColor:u?"var(--agentation-color-green)":"var(--agentation-color-accent)"},children:(0,Al.jsx)(F4,{size:12})})}function nv({annotation:i,fixed:s}){let u=i.isMultiSelect;return(0,Al.jsx)("div",{className:`${Kn.marker} ${s?Kn.fixed:""} ${Kn.hovered} ${u?Kn.multiSelect:""} ${Kn.exit}`,"data-annotation-marker":!0,style:{left:`${i.x}%`,top:i.y},children:(0,Al.jsx)(rv,{size:u?12:10})})}function r7({settings:i,onSettingsChange:s,isDarkMode:u,onToggleTheme:f,isDevMode:h,connectionStatus:y,endpoint:k,isVisible:E,toolbarNearBottom:A,settingsPage:ie,onSettingsPageChange:B,onHideToolbar:$}){return(0,Ne.jsx)("div",{className:`${je.settingsPanel} ${E?je.enter:je.exit}`,style:A?{bottom:"auto",top:"calc(100% + 0.5rem)"}:void 0,"data-agentation-settings-panel":!0,children:(0,Ne.jsxs)("div",{className:je.settingsPanelContainer,children:[(0,Ne.jsxs)("div",{className:`${je.settingsPage} ${ie==="automations"?je.slideLeft:""}`,children:[(0,Ne.jsxs)("div",{className:je.settingsHeader,children:[(0,Ne.jsx)("a",{className:je.settingsBrand,href:"https://agentation.com",target:"_blank",rel:"noopener noreferrer",children:(0,Ne.jsx)("svg",{width:"72",height:"16",viewBox:"0 0 676 151",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,Ne.jsx)("path",{d:"M79.6666 100.561L104.863 15.5213C107.828 4.03448 99.1201 -3.00582 88.7449 1.25541L3.52015 39.6065C1.48217 40.5329 0 42.7562 0 45.1647C0 48.6848 2.77907 51.4639 6.29922 51.4639C7.22558 51.4639 8.15193 51.2786 9.07829 50.9081L93.7472 12.7422C97.2674 11.0748 93.7472 8.29572 92.6356 12.1864L67.624 97.2259C66.5123 100.931 69.4767 105.193 73.7379 105.193C76.517 105.193 79.1108 103.155 79.6666 100.561ZM663.641 100.005C665.679 107.231 677.537 104.081 675.499 96.8553L666.05 66.2856C663.456 57.7631 655.489 55.7251 648.82 61.098L618.991 86.6654C617.324 87.9623 621.029 89.815 621.214 88.1476L625.846 61.6538C626.958 55.3546 624.179 50.5375 615.841 50.5375L579.158 51.0934C576.008 51.0934 578.417 53.8724 578.417 57.022C578.417 60.1716 580.825 61.6538 583.975 61.6538L616.212 60.9127C616.397 60.9127 614.544 59.6158 614.544 59.8011L609.727 88.7034C607.875 99.6344 617.694 102.784 626.031 95.7437L655.86 70.1763L654.192 69.6205L663.641 100.005ZM571.191 89.0739C555.443 88.7034 562.298 61.4685 578.787 61.8391C594.72 62.0243 587.124 89.2592 571.191 89.0739ZM571.006 100.375C601.575 100.931 611.024 51.6492 579.158 51.0934C547.847 50.5375 540.065 99.8197 571.006 100.375ZM521.909 46.4616C525.985 46.4616 529.505 42.9414 529.505 38.6802C529.505 34.4189 525.985 31.0841 521.909 31.0841C517.833 31.0841 514.127 34.6042 514.127 38.6802C514.127 42.7562 517.648 46.4616 521.909 46.4616ZM472.256 103.525C493.192 103.71 515.98 73.3259 519.13 62.3949L509.866 60.9127C505.234 73.3259 497.638 101.672 519.871 102.043C536.545 102.228 552.479 85.3685 563.595 70.1763C564.151 69.2499 564.706 68.1383 564.706 66.8414C564.706 63.6918 563.965 61.098 560.816 61.098C558.963 61.098 557.296 62.0243 556.184 63.5065C546.365 77.0313 530.802 90.9266 522.094 90.7414C511.904 90.5561 517.462 71.4732 519.871 64.9887C523.391 55.7251 512.831 53.5019 509.681 60.9127C506.531 68.6941 488.19 92.4088 475.035 92.2235C467.439 92.0383 464.29 83.8863 472.441 59.9864L486.707 17.7445C487.634 14.4097 485.41 10.519 481.334 10.519C478.741 10.519 476.517 12.1864 475.962 14.4097L461.696 56.4662C451.506 86.4801 455.211 103.155 472.256 103.525ZM447.43 42.5709L496.527 41.4593C499.306 41.4593 501.529 39.0507 501.529 36.2717C501.529 33.3073 499.306 31.0841 496.341 31.0841L447.245 32.1957C444.466 32.1957 442.242 34.4189 442.242 37.3833C442.242 40.1624 444.466 42.5709 447.43 42.5709ZM422.974 106.304C435.387 106.489 457.249 94.8173 472.441 53.8724C473.553 50.7228 472.071 48.3143 468.365 48.3143C466.142 48.3143 464.29 49.6112 463.548 51.6492C450.394 87.2212 431.682 96.1142 424.456 95.929C419.454 95.929 417.972 93.3352 418.713 85.5538C419.454 78.1429 410.376 74.9933 406.114 81.1073C401.297 87.777 394.442 94.2615 385.549 94.0763C370.172 93.891 376.471 67.0267 399.815 67.3972C408.338 67.5825 414.452 71.4732 417.045 76.6608C417.786 78.3282 419.454 79.6251 421.492 79.6251C424.271 79.6251 426.679 77.2166 426.679 74.4375C426.679 73.6964 426.494 72.9553 426.124 72.2143C421.862 63.6918 412.414 57.3926 400 57.2073C363.502 56.6515 353.497 104.451 383.326 104.822C397.036 105.193 410.005 94.0763 413.34 85.9243C412.599 86.8507 408.338 86.6654 408.523 84.4422C407.411 97.4111 410.931 106.119 422.974 106.304ZM335.897 104.266C335.897 115.012 347.569 117.606 347.569 103.34C347.569 89.0739 358.5 54.4282 361.464 45.1647L396.666 43.6825C405.929 43.1267 404.262 33.1221 397.036 33.3073L364.984 34.4189L368.875 22.7469C369.801 20.1531 370.542 17.9298 370.542 16.2624C370.542 13.4833 368.504 11.8159 365.911 11.8159C362.946 11.8159 360.352 12.7422 357.573 21.0794L352.942 35.16L330.153 36.0864C326.263 36.4569 323.483 38.1244 323.483 41.6445C323.483 45.5352 326.448 47.0174 330.709 46.8321L349.421 45.9058C345.901 56.6515 335.897 90.7414 335.897 104.266ZM186.939 78.6988C193.979 56.4662 212.877 54.984 212.877 62.9507C212.877 68.3236 203.984 77.0313 186.939 78.6988ZM113.942 150.955C142.844 152.437 159.704 111.492 160.63 80.5515C161.556 73.3259 153.96 70.3616 148.773 75.7344C141.918 83.1453 129.505 93.1499 119.685 93.1499C103.011 93.1499 116.165 59.8011 143.956 59.8011C149.514 59.8011 153.59 61.6538 156.184 64.0623C160.815 68.3236 170.82 62.0243 165.818 56.0957C161.927 51.4639 155.072 48.129 144.882 48.129C102.455 48.129 83.7426 105.007 116.721 105.007C134.692 105.007 151.367 88.3329 155.257 82.7747C154.516 83.5158 149.329 81.2925 149.699 79.4398L149.143 83.5158C148.958 107.045 134.322 141.506 116.536 139.838C113.386 139.468 112.089 137.43 112.089 134.836C112.089 128.907 122.094 119.273 145.067 113.53C159.518 109.824 152.293 101.487 143.4 104.081C111.163 113.53 99.6759 127.425 99.6759 137.8C99.6759 145.026 105.605 150.584 113.942 150.955ZM194.72 109.454C214.359 109.454 239 95.3732 251.228 77.9577C250.301 82.96 246.596 96.8553 246.596 101.487C246.596 110.01 254.748 109.454 261.232 102.784L288.097 75.5491L290.32 85.7391C293.284 99.4491 299.213 104.822 308.847 104.822C326.263 104.822 342.196 85.7391 349.421 74.8081L344.049 63.6918C339.787 74.8081 321.631 92.5941 311.626 92.5941C306.994 92.5941 304.771 89.815 303.289 83.7011L300.325 71.2879C297.916 60.7275 289.023 58.3189 279.018 68.1383L261.788 84.8127L264.382 69.991C266.235 59.2453 255.674 58.1337 250.116 65.915C241.779 77.0313 216.767 97.7817 196.387 97.7817C187.865 97.7817 185.456 93.7057 185.456 88.3329C230.848 84.998 239.185 47.2027 208.986 47.2027C172.858 47.2027 157.11 109.454 194.72 109.454Z",fill:"currentColor"})})}),(0,Ne.jsxs)("p",{className:je.settingsVersion,children:["v","3.0.2"]}),(0,Ne.jsx)("button",{className:je.themeToggle,onClick:f,title:u?"Switch to light mode":"Switch to dark mode",children:(0,Ne.jsx)("span",{className:je.themeIconWrapper,children:(0,Ne.jsx)("span",{className:je.themeIcon,children:u?(0,Ne.jsx)(r6,{size:20}):(0,Ne.jsx)(s6,{size:20})},u?"sun":"moon")})})]}),(0,Ne.jsx)("div",{className:je.divider}),(0,Ne.jsxs)("div",{className:je.settingsSection,children:[(0,Ne.jsxs)("div",{className:je.settingsRow,children:[(0,Ne.jsxs)("div",{className:je.settingsLabel,children:["Output Detail",(0,Ne.jsx)(ss,{content:"Controls how much detail is included in the copied output"})]}),(0,Ne.jsxs)("button",{className:je.cycleButton,onClick:()=>{let Z=(Sd.findIndex(X=>X.value===i.outputDetail)+1)%Sd.length;s({outputDetail:Sd[Z].value})},children:[(0,Ne.jsx)("span",{className:je.cycleButtonText,children:Sd.find(v=>v.value===i.outputDetail)?.label},i.outputDetail),(0,Ne.jsx)("span",{className:je.cycleDots,children:Sd.map(v=>(0,Ne.jsx)("span",{className:`${je.cycleDot} ${i.outputDetail===v.value?je.active:""}`},v.value))})]})]}),(0,Ne.jsxs)("div",{className:`${je.settingsRow} ${je.settingsRowMarginTop} ${h?"":je.settingsRowDisabled}`,children:[(0,Ne.jsxs)("div",{className:je.settingsLabel,children:["React Components",(0,Ne.jsx)(ss,{content:h?"Include React component names in annotations":"Disabled \u2014 production builds minify component names, making detection unreliable. Use in development mode."})]}),(0,Ne.jsx)(vp,{checked:h&&i.reactEnabled,onChange:v=>s({reactEnabled:v.target.checked}),disabled:!h})]}),(0,Ne.jsxs)("div",{className:`${je.settingsRow} ${je.settingsRowMarginTop}`,children:[(0,Ne.jsxs)("div",{className:je.settingsLabel,children:["Hide Until Restart",(0,Ne.jsx)(ss,{content:"Hides the toolbar until you open a new tab"})]}),(0,Ne.jsx)(vp,{checked:!1,onChange:v=>{v.target.checked&&$()}})]})]}),(0,Ne.jsx)("div",{className:je.divider}),(0,Ne.jsxs)("div",{className:je.settingsSection,children:[(0,Ne.jsx)("div",{className:`${je.settingsLabel} ${je.settingsLabelMarker}`,children:"Marker Color"}),(0,Ne.jsx)("div",{className:je.colorOptions,children:Cd.map(v=>(0,Ne.jsx)("button",{className:`${je.colorOption} ${i.annotationColorId===v.id?je.selected:""}`,style:{"--swatch":v.srgb,"--swatch-p3":v.p3},onClick:()=>s({annotationColorId:v.id}),title:v.label,type:"button"},v.id))})]}),(0,Ne.jsx)("div",{className:je.divider}),(0,Ne.jsxs)("div",{className:je.settingsSection,children:[(0,Ne.jsx)(lv,{className:"checkbox-field",label:"Clear on copy/send",checked:i.autoClearAfterCopy,onChange:v=>s({autoClearAfterCopy:v.target.checked}),tooltip:"Automatically clear annotations after copying"}),(0,Ne.jsx)(lv,{className:je.checkboxField,label:"Block page interactions",checked:i.blockInteractions,onChange:v=>s({blockInteractions:v.target.checked})})]}),(0,Ne.jsx)("div",{className:je.divider}),(0,Ne.jsxs)("button",{className:je.settingsNavLink,onClick:()=>B("automations"),children:[(0,Ne.jsx)("span",{children:"Manage MCP & Webhooks"}),(0,Ne.jsxs)("span",{className:je.settingsNavLinkRight,children:[k&&y!=="disconnected"&&(0,Ne.jsx)("span",{className:`${je.mcpNavIndicator} ${je[y]}`}),(0,Ne.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,Ne.jsx)("path",{d:"M7.5 12.5L12 8L7.5 3.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]})]})]}),(0,Ne.jsxs)("div",{className:`${je.settingsPage} ${je.automationsPage} ${ie==="automations"?je.slideIn:""}`,children:[(0,Ne.jsxs)("button",{className:je.settingsBackButton,onClick:()=>B("main"),children:[(0,Ne.jsx)(d6,{size:16}),(0,Ne.jsx)("span",{children:"Manage MCP & Webhooks"})]}),(0,Ne.jsx)("div",{className:je.divider}),(0,Ne.jsxs)("div",{className:je.settingsSection,children:[(0,Ne.jsxs)("div",{className:je.settingsRow,children:[(0,Ne.jsxs)("span",{className:je.automationHeader,children:["MCP Connection",(0,Ne.jsx)(ss,{content:"Connect via Model Context Protocol to let AI agents like Claude Code receive annotations in real-time."})]}),k&&(0,Ne.jsx)("div",{className:`${je.mcpStatusDot} ${je[y]}`,title:y==="connected"?"Connected":y==="connecting"?"Connecting...":"Disconnected"})]}),(0,Ne.jsxs)("p",{className:je.automationDescription,style:{paddingBottom:6},children:["MCP connection allows agents to receive and act on annotations."," ",(0,Ne.jsx)("a",{href:"https://agentation.dev/mcp",target:"_blank",rel:"noopener noreferrer",className:je.learnMoreLink,children:"Learn more"})]})]}),(0,Ne.jsx)("div",{className:je.divider}),(0,Ne.jsxs)("div",{className:`${je.settingsSection} ${je.settingsSectionGrow}`,children:[(0,Ne.jsxs)("div",{className:je.settingsRow,children:[(0,Ne.jsxs)("span",{className:je.automationHeader,children:["Webhooks",(0,Ne.jsx)(ss,{content:"Send annotation data to any URL endpoint when annotations change. Useful for custom integrations."})]}),(0,Ne.jsxs)("div",{className:je.autoSendContainer,children:[(0,Ne.jsx)("label",{htmlFor:"agentation-auto-send",className:`${je.autoSendLabel} ${i.webhooksEnabled?je.active:""} ${i.webhookUrl?"":je.disabled}`,children:"Auto-Send"}),(0,Ne.jsx)(vp,{id:"agentation-auto-send",checked:i.webhooksEnabled,onChange:v=>s({webhooksEnabled:v.target.checked}),disabled:!i.webhookUrl})]})]}),(0,Ne.jsx)("p",{className:je.automationDescription,children:"The webhook URL will receive live annotation changes and annotation data."}),(0,Ne.jsx)("textarea",{className:je.webhookUrlInput,placeholder:"Webhook URL",value:i.webhookUrl,onKeyDown:v=>v.stopPropagation(),onChange:v=>s({webhookUrl:v.target.value})})]})]})]})})}function xp(i,s="filtered"){let{name:u,path:f}=Rc(i);if(s==="off")return{name:u,elementName:u,path:f,reactComponents:null};let h=N8(i,{mode:s});return{name:h.path?`${h.path} ${u}`:u,elementName:u,path:f,reactComponents:h.path}}function is(i,s){let u=document.elementFromPoint(i,s);if(!u)return null;for(;u?.shadowRoot;){let f=u.shadowRoot.elementFromPoint(i,s);if(!f||f===u)break;u=f}return u}function Sp(i){let s=i;for(;s&&s!==document.body;){let f=window.getComputedStyle(s).position;if(f==="fixed"||f==="sticky")return!0;s=s.parentElement}return!1}function rs(i){return i.status!=="resolved"&&i.status!=="dismissed"}function Ph(i){let s=Ap(i),u=s.found?s:Q8(i);if(u.found&&u.source)return V8(u.source,"path")}function kv({demoAnnotations:i,demoDelay:s=1e3,enableDemoMode:u=!1,onAnnotationAdd:f,onAnnotationDelete:h,onAnnotationUpdate:y,onAnnotationsClear:k,onCopy:E,onSubmit:A,copyToClipboard:ie=!0,endpoint:B,sessionId:$,onSessionCreated:v,webhookUrl:Z,className:X}={}){let[re,j]=(0,U.useState)(!1),[J,De]=(0,U.useState)([]),[Ie,Ge]=(0,U.useState)(!0),[$t,jt]=(0,U.useState)(()=>x8()),[Me,Xe]=(0,U.useState)(!1),wt=(0,U.useRef)(null);(0,U.useEffect)(()=>{let b=D=>{let R=wt.current;R&&R.contains(D.target)&&D.stopPropagation()},w=["mousedown","click","pointerdown"];return w.forEach(D=>document.body.addEventListener(D,b)),()=>{w.forEach(D=>document.body.removeEventListener(D,b))}},[]);let[ue,Ve]=(0,U.useState)(!1),[Ye,Be]=(0,U.useState)(!1),[Fe,ne]=(0,U.useState)(null),[me,ye]=(0,U.useState)({x:0,y:0}),[oe,Ee]=(0,U.useState)(null),[vt,Q]=(0,U.useState)(!1),[qe,at]=(0,U.useState)("idle"),[ht,Rn]=(0,U.useState)(!1),[Oo,It]=(0,U.useState)(!1),[En,eo]=(0,U.useState)(null),[nl,xe]=(0,U.useState)(null),[po,Yn]=(0,U.useState)([]),[fo,sn]=(0,U.useState)(null),[Qt,So]=(0,U.useState)(null),[we,pe]=(0,U.useState)(null),[Se,lt]=(0,U.useState)(null),[it,Je]=(0,U.useState)([]),[Bt,Zt]=(0,U.useState)(0),[Ot,kt]=(0,U.useState)(!1),[Ze,H]=(0,U.useState)(!1),[I,te]=(0,U.useState)(!1),[le,Oe]=(0,U.useState)(!1),[Ue,de]=(0,U.useState)(!1),[_,T]=(0,U.useState)("main"),[W,se]=(0,U.useState)(!1),[K,Ae]=(0,U.useState)(!1),[be,Te]=(0,U.useState)(!1),[ae,xt]=(0,U.useState)([]),[pt,st]=(0,U.useState)(null),Ht=(0,U.useRef)(!1),[ct,Kt]=(0,U.useState)(!1),[Nn,Xn]=(0,U.useState)(!1),[$n,Co]=(0,U.useState)(1),[ea,Ei]=(0,U.useState)("new-page"),[Dn,ol]=(0,U.useState)(""),[ko,Md]=(0,U.useState)(!1),[ft,Uo]=(0,U.useState)(null),br=(0,U.useRef)(!1),ds=(0,U.useRef)({rearrange:null,placements:[]}),ma=(0,U.useRef)({rearrange:null,placements:[]}),[Mi,zc]=(0,U.useState)(0),[Td,Rd]=(0,U.useState)(0),[Dd,fs]=(0,U.useState)(0),[jo,Va]=(0,U.useState)(0),fl=(0,U.useRef)(new Set),vr=(0,U.useRef)(new Set),Eo=(0,U.useRef)(null),Qa=(0,U.useRef)(),hs=K&&re&&!be&&ct;(0,U.useEffect)(()=>{if(hs){Xn(!1);let b=Tc(()=>{Xn(!0)});return()=>cancelAnimationFrame(b)}else Xn(!1)},[hs]);let ta=(0,U.useRef)(new Map),Ol=(0,U.useRef)(new Map),Wa=(0,U.useRef)(),[hl,Lc]=(0,U.useState)(!1),[Io,Nc]=(0,U.useState)([]),$c=(0,U.useRef)(Io);$c.current=Io;let[Bc,e_]=(0,U.useState)(null),_s=(0,U.useRef)(null),$p=(0,U.useRef)(!1),t_=(0,U.useRef)([]),Ad=(0,U.useRef)(0),Hc=(0,U.useRef)(null),ms=(0,U.useRef)(null),Bp=(0,U.useRef)(1),[Uc,jc]=(0,U.useState)(!1),zl=(0,U.useRef)(null),[Bn,Ti]=(0,U.useState)([]),Ll=(0,U.useRef)({cmd:!1,shift:!1}),go=()=>{se(!0)},n_=()=>{se(!1)},xr=()=>{Uc||(zl.current=rt(()=>jc(!0),850))},na=()=>{zl.current&&(clearTimeout(zl.current),zl.current=null),jc(!1),n_()};(0,U.useEffect)(()=>()=>{zl.current&&clearTimeout(zl.current)},[]);let[Mt,Od]=(0,U.useState)(()=>{try{let b=JSON.parse(localStorage.getItem("feedback-toolbar-settings")??"");return{...wp,...b,annotationColorId:Cd.find(w=>w.id===b.annotationColorId)?b.annotationColorId:wp.annotationColorId}}catch{return wp}}),[_l,Ri]=(0,U.useState)(!0),[Ic,wr]=(0,U.useState)(!1),ps=()=>{wt.current?.classList.add(fe.disableTransitions),Ri(b=>!b),Tc(()=>{wt.current?.classList.remove(fe.disableTransitions)})},Yc=!0,qn=Yc&&Mt.reactEnabled?s7[Mt.outputDetail]:"off",[Zn,Sr]=(0,U.useState)($??null),Xc=(0,U.useRef)(!1),[ll,Ga]=(0,U.useState)(B?"connecting":"disconnected"),[Mn,gs]=(0,U.useState)(null),[Za,qc]=(0,U.useState)(!1),[Di,Cr]=(0,U.useState)(null),ys=(0,U.useRef)(!1),[Vc,Ai]=(0,U.useState)(new Set),[zd,bs]=(0,U.useState)(new Set),[kr,vs]=(0,U.useState)(!1),[o_,Nl]=(0,U.useState)(!1),[$l,Qc]=(0,U.useState)(!1),Pa=(0,U.useRef)(null),ml=(0,U.useRef)(null),Fa=(0,U.useRef)(null),Oi=(0,U.useRef)(null),Bl=(0,U.useRef)(!1),pa=(0,U.useRef)(0),zo=(0,U.useRef)(null),Ld=(0,U.useRef)(null),Er=8,Hl=50,Wc=(0,U.useRef)(null),Lo=(0,U.useRef)(null),No=(0,U.useRef)(null),nt=typeof window<"u"?window.location.pathname:"/";(0,U.useEffect)(()=>{if(le)de(!0);else{se(!1),T("main");let b=rt(()=>de(!1),0);return()=>clearTimeout(b)}},[le]);let zi=re&&Ie&&!K;(0,U.useEffect)(()=>{if(zi){Be(!1),Ve(!0),Ai(new Set);let b=rt(()=>{Ai(w=>{let D=new Set(w);return J.forEach(R=>D.add(R.id)),D})},350);return()=>clearTimeout(b)}else if(ue){Be(!0);let b=rt(()=>{Ve(!1),Be(!1)},250);return()=>clearTimeout(b)}},[zi]),(0,U.useEffect)(()=>{H(!0),Zt(window.scrollY);let b=mp(nt);De(b.filter(rs)),av||(wr(!0),av=!0,rt(()=>wr(!1),750));try{let w=localStorage.getItem("feedback-toolbar-theme");w!==null&&Ri(w==="dark")}catch{}try{let w=localStorage.getItem("feedback-toolbar-position");if(w){let D=JSON.parse(w);typeof D.x=="number"&&typeof D.y=="number"&&gs(D)}}catch{}},[nt]),(0,U.useEffect)(()=>{Ze&&localStorage.setItem("feedback-toolbar-settings",JSON.stringify(Mt))},[Mt,Ze]),(0,U.useEffect)(()=>{Ze&&localStorage.setItem("feedback-toolbar-theme",_l?"dark":"light")},[_l,Ze]);let xs=(0,U.useRef)(!1);(0,U.useEffect)(()=>{let b=xs.current;xs.current=Za,b&&!Za&&Mn&&Ze&&localStorage.setItem("feedback-toolbar-position",JSON.stringify(Mn))},[Za,Mn,Ze]),(0,U.useEffect)(()=>{if(!B||!Ze||Xc.current)return;Xc.current=!0,Ga("connecting"),(async()=>{try{let w=b8(nt),D=$||w,R=!1;if(D)try{let z=await Pb(B,D);Sr(z.id),Ga("connected"),pp(nt,z.id),R=!0;let G=mp(nt),ge=new Set(z.annotations.map($e=>$e.id)),Ce=G.filter($e=>!ge.has($e.id));if(Ce.length>0){let We=`${typeof window<"u"?window.location.origin:""}${nt}`,ot=(await Promise.allSettled(Ce.map(et=>Ec(B,z.id,{...et,sessionId:z.id,url:We})))).map((et,Le)=>et.status==="fulfilled"?et.value:(console.warn("[Agentation] Failed to sync annotation:",et.reason),Ce[Le])),St=[...z.annotations,...ot];De(St.filter(rs)),vd(nt,St.filter(rs),z.id)}else De(z.annotations.filter(rs)),vd(nt,z.annotations.filter(rs),z.id)}catch(z){console.warn("[Agentation] Could not join session, creating new:",z),v8(nt)}if(!R){let z=typeof window<"u"?window.location.href:"/",G=await gp(B,z);Sr(G.id),Ga("connected"),pp(nt,G.id),v?.(G.id);let ge=d8(),Ce=typeof window<"u"?window.location.origin:"",$e=[];for(let[We,Pe]of ge){let ot=Pe.filter(Le=>!Le._syncedTo);if(ot.length===0)continue;let St=`${Ce}${We}`,et=We===nt;$e.push((async()=>{try{let Le=et?G:await gp(B,St),Vn=(await Promise.allSettled(ot.map(Wt=>Ec(B,Le.id,{...Wt,sessionId:Le.id,url:St})))).map((Wt,cn)=>Wt.status==="fulfilled"?Wt.value:(console.warn("[Agentation] Failed to sync annotation:",Wt.reason),ot[cn])).filter(rs);if(vd(We,Vn,Le.id),et){let Wt=new Set(ot.map(cn=>cn.id));De(cn=>{let ut=cn.filter(mt=>!Wt.has(mt.id));return[...Vn,...ut]})}}catch(Le){console.warn(`[Agentation] Failed to sync annotations for ${We}:`,Le)}})())}await Promise.allSettled($e)}}catch(w){Ga("disconnected"),console.warn("[Agentation] Failed to initialize session, using local storage:",w)}})()},[B,$,Ze,v,nt]),(0,U.useEffect)(()=>{if(!B||!Ze)return;let b=async()=>{try{(await fetch(`${B}/health`)).ok?Ga("connected"):Ga("disconnected")}catch{Ga("disconnected")}};b();let w=_6(b,1e4);return()=>clearInterval(w)},[B,Ze]),(0,U.useEffect)(()=>{if(!B||!Ze||!Zn)return;let b=new EventSource(`${B}/sessions/${Zn}/events`),w=["resolved","dismissed"],D=R=>{try{let z=JSON.parse(R.data);if(w.includes(z.payload?.status)){let G=z.payload.id,ge=z.payload.kind;if(ge==="placement"){for(let[Ce,$e]of ta.current)if($e===G){ta.current.delete(Ce),xt(We=>We.filter(Pe=>Pe.id!==Ce));break}}else if(ge==="rearrange"){for(let[Ce,$e]of Ol.current)if($e===G){Ol.current.delete(Ce),Uo(We=>{if(!We)return null;let Pe=We.sections.filter(ot=>ot.id!==Ce);return Pe.length===0?null:{...We,sections:Pe}});break}}else bs(Ce=>new Set(Ce).add(G)),rt(()=>{De(Ce=>Ce.filter($e=>$e.id!==G)),bs(Ce=>{let $e=new Set(Ce);return $e.delete(G),$e})},150)}}catch{}};return b.addEventListener("annotation.updated",D),()=>{b.removeEventListener("annotation.updated",D),b.close()}},[B,Ze,Zn]),(0,U.useEffect)(()=>{if(!B||!Ze)return;let b=Ld.current==="disconnected",w=ll==="connected";Ld.current=ll,b&&w&&(async()=>{try{let R=mp(nt);if(R.length===0)return;let G=`${typeof window<"u"?window.location.origin:""}${nt}`,ge=Zn,Ce=[];if(ge)try{Ce=(await Pb(B,ge)).annotations}catch{ge=null}ge||(ge=(await gp(B,G)).id,Sr(ge),pp(nt,ge));let $e=new Set(Ce.map(Pe=>Pe.id)),We=R.filter(Pe=>!$e.has(Pe.id));if(We.length>0){let ot=(await Promise.allSettled(We.map(Le=>Ec(B,ge,{...Le,sessionId:ge,url:G})))).map((Le,ln)=>Le.status==="fulfilled"?Le.value:(console.warn("[Agentation] Failed to sync annotation on reconnect:",Le.reason),We[ln])),et=[...Ce,...ot].filter(rs);De(et),vd(nt,et,ge)}}catch(R){console.warn("[Agentation] Failed to sync on reconnect:",R)}})()},[ll,B,Ze,Zn,nt]);let Ul=(0,U.useCallback)(()=>{Me||(Xe(!0),Oe(!1),j(!1),rt(()=>{w8(!0),jt(!0),Xe(!1)},400))},[Me]);(0,U.useEffect)(()=>{if(!u||!Ze||!i||i.length===0||J.length>0)return;let b=[];return b.push(rt(()=>{j(!0)},s-200)),i.forEach((w,D)=>{let R=s+D*300;b.push(rt(()=>{let z=document.querySelector(w.selector);if(!z)return;let G=z.getBoundingClientRect(),{name:ge,path:Ce}=Rc(z),$e={id:`demo-${Date.now()}-${D}`,x:(G.left+G.width/2)/window.innerWidth*100,y:G.top+G.height/2+window.scrollY,comment:w.comment,element:ge,elementPath:Ce,timestamp:Date.now(),selectedText:w.selectedText,boundingBox:{x:G.left,y:G.top+window.scrollY,width:G.width,height:G.height},nearbyText:yd(z),cssClasses:bd(z)};De(We=>[...We,$e])},R))}),()=>{b.forEach(clearTimeout)}},[u,Ze,i,s]),(0,U.useEffect)(()=>{let b=()=>{Zt(window.scrollY),kt(!0),No.current&&clearTimeout(No.current),No.current=rt(()=>{kt(!1)},150)};return window.addEventListener("scroll",b,{passive:!0}),()=>{window.removeEventListener("scroll",b),No.current&&clearTimeout(No.current)}},[]),(0,U.useEffect)(()=>{Ze&&J.length>0?Zn?vd(nt,J,Zn):xv(nt,J):Ze&&J.length===0&&localStorage.removeItem(Kh(nt))},[J,nt,Ze,Zn]),(0,U.useEffect)(()=>{if(Ze&&!Ht.current){Ht.current=!0;let b=f8(nt);b.length>0&&xt(b)}},[Ze,nt]),(0,U.useEffect)(()=>{Ze&&Ht.current&&!ct&&(ae.length>0?h8(nt,ae):_8(nt))},[ae,nt,Ze,ct]),(0,U.useEffect)(()=>{if(Ze&&!br.current){br.current=!0;let b=m8(nt);if(b){let w={...b,sections:b.sections.map(D=>({...D,currentRect:D.currentRect??{...D.originalRect}}))};Uo(w)}}},[Ze,nt]),(0,U.useEffect)(()=>{Ze&&br.current&&!ct&&(ft?p8(nt,ft):g8(nt))},[ft,nt,Ze,ct]);let Gc=(0,U.useRef)(!1);(0,U.useEffect)(()=>{if(Ze&&!Gc.current){Gc.current=!0;let b=y8(nt);b&&(ma.current={rearrange:b.rearrange,placements:b.placements||[]},b.purpose&&ol(b.purpose))}},[Ze,nt]),(0,U.useEffect)(()=>{if(!Ze||!Gc.current)return;let b=ma.current;ct?(ft?.sections?.length??0)>0||ae.length>0||Dn?Zb(nt,{rearrange:ft,placements:ae,purpose:Dn}):Wh(nt):(b.rearrange?.sections?.length??0)>0||b.placements.length>0||Dn?Zb(nt,{rearrange:b.rearrange,placements:b.placements,purpose:Dn}):Wh(nt)},[ft,ae,Dn,ct,nt,Ze]),(0,U.useEffect)(()=>{K&&!ft&&Uo({sections:[],originalOrder:[],detectedAt:Date.now()})},[K,ft]),(0,U.useEffect)(()=>{if(!B||!Zn)return;let b=ta.current,w=new Set(ae.map(D=>D.id));for(let D of ae){if(b.has(D.id))continue;b.set(D.id,"");let R=typeof window<"u"?window.location.pathname+window.location.search+window.location.hash:nt;Ec(B,Zn,{id:D.id,x:D.x/window.innerWidth*100,y:D.y,comment:`Place ${D.type} at (${Math.round(D.x)}, ${Math.round(D.y)}), ${D.width}\xD7${D.height}px${D.text?` \u2014 "${D.text}"`:""}`,element:`[design:${D.type}]`,elementPath:"[placement]",timestamp:D.timestamp,url:R,intent:"change",severity:"important",kind:"placement",placement:{componentType:D.type,width:D.width,height:D.height,scrollY:D.scrollY,text:D.text}}).then(z=>{b.has(D.id)&&b.set(D.id,z.id)}).catch(z=>{console.warn("[Agentation] Failed to sync placement annotation:",z),b.delete(D.id)})}for(let[D,R]of b)w.has(D)||(b.delete(D),R&&yr(B,R).catch(()=>{}))},[ae,B,Zn,nt]),(0,U.useEffect)(()=>{if(!(!B||!Zn))return Wa.current&&clearTimeout(Wa.current),Wa.current=rt(()=>{let b=Ol.current;if(!ft||ft.sections.length===0){for(let[,R]of b)R&&yr(B,R).catch(()=>{});b.clear();return}let w=new Set(ft.sections.map(R=>R.id)),D=typeof window<"u"?window.location.pathname+window.location.search+window.location.hash:nt;for(let R of ft.sections){let z=R.originalRect,G=R.currentRect;if(!(Math.abs(z.x-G.x)>1||Math.abs(z.y-G.y)>1||Math.abs(z.width-G.width)>1||Math.abs(z.height-G.height)>1)){let $e=b.get(R.id);$e&&(b.delete(R.id),yr(B,$e).catch(()=>{}));continue}let Ce=b.get(R.id);Ce?Fb(B,Ce,{comment:`Move ${R.label} section (${R.tagName}) \u2014 from (${Math.round(z.x)},${Math.round(z.y)}) ${Math.round(z.width)}\xD7${Math.round(z.height)} to (${Math.round(G.x)},${Math.round(G.y)}) ${Math.round(G.width)}\xD7${Math.round(G.height)}`}).catch($e=>{console.warn("[Agentation] Failed to update rearrange annotation:",$e)}):(b.set(R.id,""),Ec(B,Zn,{id:R.id,x:G.x/window.innerWidth*100,y:G.y,comment:`Move ${R.label} section (${R.tagName}) \u2014 from (${Math.round(z.x)},${Math.round(z.y)}) ${Math.round(z.width)}\xD7${Math.round(z.height)} to (${Math.round(G.x)},${Math.round(G.y)}) ${Math.round(G.width)}\xD7${Math.round(G.height)}`,element:R.selector,elementPath:"[rearrange]",timestamp:Date.now(),url:D,intent:"change",severity:"important",kind:"rearrange",rearrange:{selector:R.selector,label:R.label,tagName:R.tagName,originalRect:z,currentRect:G}}).then($e=>{b.has(R.id)&&b.set(R.id,$e.id)}).catch($e=>{console.warn("[Agentation] Failed to sync rearrange annotation:",$e),b.delete(R.id)}))}for(let[R,z]of b)w.has(R)||(b.delete(R),z&&yr(B,z).catch(()=>{}))},300),()=>{Wa.current&&clearTimeout(Wa.current)}},[ft,B,Zn,nt]);let Ja=(0,U.useRef)(new Map);(0,U.useLayoutEffect)(()=>{let b=ft?.sections??[],w=new Set;if((K||be)&&re)for(let D of b){w.add(D.id);try{let R=document.querySelector(D.selector);if(!R)continue;if(!Ja.current.has(D.id)){let z={transform:R.style.transform,transformOrigin:R.style.transformOrigin,opacity:R.style.opacity,position:R.style.position,zIndex:R.style.zIndex,display:R.style.display},G=[],ge=R.parentElement;for(;ge&&ge!==document.body;){let $e=getComputedStyle(ge);($e.overflow!=="visible"||$e.overflowX!=="visible"||$e.overflowY!=="visible")&&(G.push({el:ge,overflow:ge.style.overflow}),ge.style.overflow="visible"),ge=ge.parentElement}getComputedStyle(R).display==="inline"&&(R.style.display="inline-block"),Ja.current.set(D.id,{el:R,origStyles:z,ancestors:G}),R.style.transformOrigin="top left",R.style.zIndex="9999"}}catch{}}for(let[D,R]of Ja.current)if(!w.has(D)){let{el:z,origStyles:G,ancestors:ge}=R;z.style.transition="transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)",z.style.transform=G.transform,z.style.transformOrigin=G.transformOrigin,z.style.opacity=G.opacity,z.style.position=G.position,z.style.zIndex=G.zIndex,Ja.current.delete(D),rt(()=>{z.style.transition="",z.style.display=G.display;for(let Ce of ge)Ce.el.style.overflow=Ce.overflow},450)}},[ft,K,be,re]),(0,U.useEffect)(()=>()=>{for(let[,b]of Ja.current){let{el:w,origStyles:D,ancestors:R}=b;w.style.transition="transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)",w.style.transform=D.transform,w.style.transformOrigin=D.transformOrigin,w.style.opacity=D.opacity,w.style.position=D.position,w.style.zIndex=D.zIndex,rt(()=>{w.style.transition="",w.style.display=D.display;for(let z of R)z.el.style.overflow=z.overflow},450)}Ja.current.clear()},[]);let Mr=(0,U.useCallback)(()=>{Te(!0),Ae(!1),st(null),clearTimeout(Qa.current),Qa.current=rt(()=>{Te(!1)},300)},[]),Nd=(0,U.useCallback)(()=>{K&&(Te(!0),Ae(!1),st(null),clearTimeout(Qa.current),Qa.current=rt(()=>{Te(!1)},300)),j(!1)},[K]),ws=(0,U.useCallback)(()=>{I||(p6(),te(!0))},[I]),Ss=(0,U.useCallback)(()=>{I&&(Nb(),te(!1))},[I]),Cs=(0,U.useCallback)(()=>{I?Ss():ws()},[I,ws,Ss]),Li=(0,U.useCallback)(()=>{if(Bn.length===0)return;let b=Bn[0],w=b.element,D=Bn.length>1,R=Bn.map(z=>z.element.getBoundingClientRect());if(D){let z={left:Math.min(...R.map(Le=>Le.left)),top:Math.min(...R.map(Le=>Le.top)),right:Math.max(...R.map(Le=>Le.right)),bottom:Math.max(...R.map(Le=>Le.bottom))},G=Bn.slice(0,5).map(Le=>Le.name).join(", "),ge=Bn.length>5?` +${Bn.length-5} more`:"",Ce=R.map(Le=>({x:Le.left,y:Le.top+window.scrollY,width:Le.width,height:Le.height})),We=Bn[Bn.length-1].element,Pe=R[R.length-1],ot=Pe.left+Pe.width/2,St=Pe.top+Pe.height/2,et=Sp(We);Ee({x:ot/window.innerWidth*100,y:et?St:St+window.scrollY,clientY:St,element:`${Bn.length} elements: ${G}${ge}`,elementPath:"multi-select",boundingBox:{x:z.left,y:z.top+window.scrollY,width:z.right-z.left,height:z.bottom-z.top},isMultiSelect:!0,isFixed:et,elementBoundingBoxes:Ce,multiSelectElements:Bn.map(Le=>Le.element),targetElement:We,fullPath:qh(w),accessibility:Xh(w),computedStyles:Yh(w),computedStylesObj:Ih(w),nearbyElements:jh(w),cssClasses:bd(w),nearbyText:yd(w),sourceFile:Ph(w)})}else{let z=R[0],G=Sp(w);Ee({x:z.left/window.innerWidth*100,y:G?z.top:z.top+window.scrollY,clientY:z.top,element:b.name,elementPath:b.path,boundingBox:{x:z.left,y:G?z.top:z.top+window.scrollY,width:z.width,height:z.height},isFixed:G,fullPath:qh(w),accessibility:Xh(w),computedStyles:Yh(w),computedStylesObj:Ih(w),nearbyElements:jh(w),cssClasses:bd(w),nearbyText:yd(w),reactComponents:b.reactComponents,sourceFile:Ph(w)})}Ti([]),ne(null)},[Bn]);(0,U.useEffect)(()=>{re||(Ee(null),pe(null),lt(null),Je([]),ne(null),Oe(!1),Ti([]),Ll.current={cmd:!1,shift:!1},I&&Ss())},[re,I,Ss]),(0,U.useEffect)(()=>()=>{Nb()},[]),(0,U.useEffect)(()=>{if(!re)return;let b=["p","span","h1","h2","h3","h4","h5","h6","li","td","th","label","blockquote","figcaption","caption","legend","dt","dd","pre","code","em","strong","b","i","u","s","a","time","address","cite","q","abbr","dfn","mark","small","sub","sup","[contenteditable]"].join(", "),w=":not([data-agentation-root]):not([data-agentation-root] *)",D=document.createElement("style");return D.id="feedback-cursor-styles",D.textContent=`
      body ${w} {
        cursor: crosshair !important;
      }

      body :is(${b})${w} {
        cursor: text !important;
      }
    `,document.head.appendChild(D),()=>{let R=document.getElementById("feedback-cursor-styles");R&&R.remove()}},[re]),(0,U.useEffect)(()=>{if(Bc!==null&&re)return document.documentElement.setAttribute("data-drawing-hover",""),()=>document.documentElement.removeAttribute("data-drawing-hover")},[Bc,re]),(0,U.useEffect)(()=>{if(!re||oe||hl||K)return;let b=w=>{let D=w.composedPath()[0]||w.target;if(el(D,"[data-feedback-toolbar]")){ne(null);return}let R=is(w.clientX,w.clientY);if(!R||el(R,"[data-feedback-toolbar]")){ne(null);return}let{name:z,elementName:G,path:ge,reactComponents:Ce}=xp(R,qn),$e=R.getBoundingClientRect();ne({element:z,elementName:G,elementPath:ge,rect:$e,reactComponents:Ce}),ye({x:w.clientX,y:w.clientY})};return document.addEventListener("mousemove",b),()=>document.removeEventListener("mousemove",b)},[re,oe,hl,K,qn,Io]);let Ka=(0,U.useCallback)(b=>{if(pe(b),eo(null),xe(null),Yn([]),b.elementBoundingBoxes?.length){let w=[];for(let D of b.elementBoundingBoxes){let R=D.x+D.width/2,z=D.y+D.height/2-window.scrollY,G=is(R,z);G&&w.push(G)}Je(w),lt(null)}else if(b.boundingBox){let w=b.boundingBox,D=w.x+w.width/2,R=b.isFixed?w.y+w.height/2:w.y+w.height/2-window.scrollY,z=is(D,R);if(z){let G=z.getBoundingClientRect(),ge=G.width/w.width,Ce=G.height/w.height;ge<.5||Ce<.5?lt(null):lt(z)}else lt(null);Je([])}else lt(null),Je([])},[]);(0,U.useEffect)(()=>{if(!re||hl||K)return;let b=w=>{if(Bl.current){Bl.current=!1;return}let D=w.composedPath()[0]||w.target;if(el(D,"[data-feedback-toolbar]")||el(D,"[data-annotation-popup]")||el(D,"[data-annotation-marker]"))return;if(w.metaKey&&w.shiftKey&&!oe&&!we){w.preventDefault(),w.stopPropagation();let en=is(w.clientX,w.clientY);if(!en)return;let Vn=en.getBoundingClientRect(),{name:Wt,path:cn,reactComponents:ut}=xp(en,qn),mt=Bn.findIndex(pn=>pn.element===en);mt>=0?Ti(pn=>pn.filter((gn,no)=>no!==mt)):Ti(pn=>[...pn,{element:en,rect:Vn,name:Wt,path:cn,reactComponents:ut??void 0}]);return}let R=el(D,"button, a, input, select, textarea, [role='button'], [onclick]");if(Mt.blockInteractions&&R&&(w.preventDefault(),w.stopPropagation()),oe){if(R&&!Mt.blockInteractions)return;w.preventDefault(),Wc.current?.shake();return}if(we){if(R&&!Mt.blockInteractions)return;w.preventDefault(),Lo.current?.shake();return}w.preventDefault();let z=is(w.clientX,w.clientY);if(!z)return;let{name:G,path:ge,reactComponents:Ce}=xp(z,qn),$e=z.getBoundingClientRect(),We=w.clientX/window.innerWidth*100,Pe=Sp(z),ot=Pe?w.clientY:w.clientY+window.scrollY,St=window.getSelection(),et;St&&St.toString().trim().length>0&&(et=St.toString().trim().slice(0,500));let Le=Ih(z),ln=Yh(z);Ee({x:We,y:ot,clientY:w.clientY,element:G,elementPath:ge,selectedText:et,boundingBox:{x:$e.left,y:Pe?$e.top:$e.top+window.scrollY,width:$e.width,height:$e.height},nearbyText:yd(z),cssClasses:bd(z),isFixed:Pe,fullPath:qh(z),accessibility:Xh(z),computedStyles:ln,computedStylesObj:Le,nearbyElements:jh(z),reactComponents:Ce??void 0,sourceFile:Ph(z),targetElement:z}),ne(null)};return document.addEventListener("click",b,!0),()=>document.removeEventListener("click",b,!0)},[re,hl,K,oe,we,Mt.blockInteractions,qn,Bn]),(0,U.useEffect)(()=>{if(!re)return;let b=R=>{R.key==="Meta"&&(Ll.current.cmd=!0),R.key==="Shift"&&(Ll.current.shift=!0)},w=R=>{let z=Ll.current.cmd&&Ll.current.shift;R.key==="Meta"&&(Ll.current.cmd=!1),R.key==="Shift"&&(Ll.current.shift=!1);let G=Ll.current.cmd&&Ll.current.shift;z&&!G&&Bn.length>0&&Li()},D=()=>{Ll.current={cmd:!1,shift:!1},Ti([])};return document.addEventListener("keydown",b),document.addEventListener("keyup",w),window.addEventListener("blur",D),()=>{document.removeEventListener("keydown",b),document.removeEventListener("keyup",w),window.removeEventListener("blur",D)}},[re,Bn,Li]),(0,U.useEffect)(()=>{if(!re||oe||hl||K)return;let b=w=>{let D=w.composedPath()[0]||w.target;el(D,"[data-feedback-toolbar]")||el(D,"[data-annotation-marker]")||el(D,"[data-annotation-popup]")||new Set(["P","SPAN","H1","H2","H3","H4","H5","H6","LI","TD","TH","LABEL","BLOCKQUOTE","FIGCAPTION","CAPTION","LEGEND","DT","DD","PRE","CODE","EM","STRONG","B","I","U","S","A","TIME","ADDRESS","CITE","Q","ABBR","DFN","MARK","SMALL","SUB","SUP"]).has(D.tagName)||D.isContentEditable||(w.preventDefault(),Pa.current={x:w.clientX,y:w.clientY})};return document.addEventListener("mousedown",b),()=>document.removeEventListener("mousedown",b)},[re,oe,hl,K]),(0,U.useEffect)(()=>{if(!re||oe)return;let b=w=>{if(!Pa.current)return;let D=w.clientX-Pa.current.x,R=w.clientY-Pa.current.y,z=D*D+R*R,G=Er*Er;if(!$l&&z>=G&&(ml.current=Pa.current,Qc(!0),w.preventDefault()),($l||z>=G)&&ml.current){if(Fa.current){let ut=Math.min(ml.current.x,w.clientX),mt=Math.min(ml.current.y,w.clientY),pn=Math.abs(w.clientX-ml.current.x),gn=Math.abs(w.clientY-ml.current.y);Fa.current.style.transform=`translate(${ut}px, ${mt}px)`,Fa.current.style.width=`${pn}px`,Fa.current.style.height=`${gn}px`}let ge=Date.now();if(ge-pa.current<Hl)return;pa.current=ge;let Ce=ml.current.x,$e=ml.current.y,We=Math.min(Ce,w.clientX),Pe=Math.min($e,w.clientY),ot=Math.max(Ce,w.clientX),St=Math.max($e,w.clientY),et=(We+ot)/2,Le=(Pe+St)/2,ln=new Set,en=[[We,Pe],[ot,Pe],[We,St],[ot,St],[et,Le],[et,Pe],[et,St],[We,Le],[ot,Le]];for(let[ut,mt]of en){let pn=document.elementsFromPoint(ut,mt);for(let gn of pn)gn instanceof HTMLElement&&ln.add(gn)}let Vn=document.querySelectorAll("button, a, input, img, p, h1, h2, h3, h4, h5, h6, li, label, td, th, div, span, section, article, aside, nav");for(let ut of Vn)if(ut instanceof HTMLElement){let mt=ut.getBoundingClientRect(),pn=mt.left+mt.width/2,gn=mt.top+mt.height/2,no=pn>=We&&pn<=ot&&gn>=Pe&&gn<=St,Qn=Math.min(mt.right,ot)-Math.max(mt.left,We),Pn=Math.min(mt.bottom,St)-Math.max(mt.top,Pe),oi=Qn>0&&Pn>0?Qn*Pn:0,al=mt.width*mt.height,pl=al>0?oi/al:0;(no||pl>.5)&&ln.add(ut)}let Wt=[],cn=new Set(["BUTTON","A","INPUT","IMG","P","H1","H2","H3","H4","H5","H6","LI","LABEL","TD","TH","SECTION","ARTICLE","ASIDE","NAV"]);for(let ut of ln){if(el(ut,"[data-feedback-toolbar]")||el(ut,"[data-annotation-marker]"))continue;let mt=ut.getBoundingClientRect();if(!(mt.width>window.innerWidth*.8&&mt.height>window.innerHeight*.5)&&!(mt.width<10||mt.height<10)&&mt.left<ot&&mt.right>We&&mt.top<St&&mt.bottom>Pe){let pn=ut.tagName,gn=cn.has(pn);if(!gn&&(pn==="DIV"||pn==="SPAN")){let no=ut.textContent&&ut.textContent.trim().length>0,Qn=ut.onclick!==null||ut.getAttribute("role")==="button"||ut.getAttribute("role")==="link"||ut.classList.contains("clickable")||ut.hasAttribute("data-clickable");(no||Qn)&&!ut.querySelector("p, h1, h2, h3, h4, h5, h6, button, a")&&(gn=!0)}if(gn){let no=!1;for(let Qn of Wt)if(Qn.left<=mt.left&&Qn.right>=mt.right&&Qn.top<=mt.top&&Qn.bottom>=mt.bottom){no=!0;break}no||Wt.push(mt)}}}if(Oi.current){let ut=Oi.current;for(;ut.children.length>Wt.length;)ut.removeChild(ut.lastChild);Wt.forEach((mt,pn)=>{let gn=ut.children[pn];gn||(gn=document.createElement("div"),gn.className=fe.selectedElementHighlight,ut.appendChild(gn)),gn.style.transform=`translate(${mt.left}px, ${mt.top}px)`,gn.style.width=`${mt.width}px`,gn.style.height=`${mt.height}px`})}}};return document.addEventListener("mousemove",b,{passive:!0}),()=>document.removeEventListener("mousemove",b)},[re,oe,$l,Er]),(0,U.useEffect)(()=>{if(!re)return;let b=w=>{let D=$l,R=ml.current;if($l&&R){Bl.current=!0;let z=Math.min(R.x,w.clientX),G=Math.min(R.y,w.clientY),ge=Math.max(R.x,w.clientX),Ce=Math.max(R.y,w.clientY),$e=[];document.querySelectorAll("button, a, input, img, p, h1, h2, h3, h4, h5, h6, li, label, td, th").forEach(et=>{if(!(et instanceof HTMLElement)||el(et,"[data-feedback-toolbar]")||el(et,"[data-annotation-marker]"))return;let Le=et.getBoundingClientRect();Le.width>window.innerWidth*.8&&Le.height>window.innerHeight*.5||Le.width<10||Le.height<10||Le.left<ge&&Le.right>z&&Le.top<Ce&&Le.bottom>G&&$e.push({element:et,rect:Le})});let Pe=$e.filter(({element:et})=>!$e.some(({element:Le})=>Le!==et&&et.contains(Le))),ot=w.clientX/window.innerWidth*100,St=w.clientY+window.scrollY;if(Pe.length>0){let et=Pe.reduce((cn,{rect:ut})=>({left:Math.min(cn.left,ut.left),top:Math.min(cn.top,ut.top),right:Math.max(cn.right,ut.right),bottom:Math.max(cn.bottom,ut.bottom)}),{left:1/0,top:1/0,right:-1/0,bottom:-1/0}),Le=Pe.slice(0,5).map(({element:cn})=>Rc(cn).name).join(", "),ln=Pe.length>5?` +${Pe.length-5} more`:"",en=Pe[0].element,Vn=Ih(en),Wt=Yh(en);Ee({x:ot,y:St,clientY:w.clientY,element:`${Pe.length} elements: ${Le}${ln}`,elementPath:"multi-select",boundingBox:{x:et.left,y:et.top+window.scrollY,width:et.right-et.left,height:et.bottom-et.top},isMultiSelect:!0,fullPath:qh(en),accessibility:Xh(en),computedStyles:Wt,computedStylesObj:Vn,nearbyElements:jh(en),cssClasses:bd(en),nearbyText:yd(en),sourceFile:Ph(en)})}else{let et=Math.abs(ge-z),Le=Math.abs(Ce-G);et>20&&Le>20&&Ee({x:ot,y:St,clientY:w.clientY,element:"Area selection",elementPath:`region at (${Math.round(z)}, ${Math.round(G)})`,boundingBox:{x:z,y:G+window.scrollY,width:et,height:Le},isMultiSelect:!0})}ne(null)}else D&&(Bl.current=!0);Pa.current=null,ml.current=null,Qc(!1),Oi.current&&(Oi.current.innerHTML="")};return document.addEventListener("mouseup",b),()=>document.removeEventListener("mouseup",b)},[re,$l]);let Yo=(0,U.useCallback)(async(b,w,D)=>{let R=Mt.webhookUrl||Z;if(!R||!Mt.webhooksEnabled&&!D)return!1;try{return(await fetch(R,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({event:b,timestamp:Date.now(),url:typeof window<"u"?window.location.href:void 0,...w})})).ok}catch(z){return console.warn("[Agentation] Webhook failed:",z),!1}},[Z,Mt.webhookUrl,Mt.webhooksEnabled]),Zc=(0,U.useCallback)(b=>{if(!oe)return;let w={id:Date.now().toString(),x:oe.x,y:oe.y,comment:b,element:oe.element,elementPath:oe.elementPath,timestamp:Date.now(),selectedText:oe.selectedText,boundingBox:oe.boundingBox,nearbyText:oe.nearbyText,cssClasses:oe.cssClasses,isMultiSelect:oe.isMultiSelect,isFixed:oe.isFixed,fullPath:oe.fullPath,accessibility:oe.accessibility,computedStyles:oe.computedStyles,nearbyElements:oe.nearbyElements,reactComponents:oe.reactComponents,sourceFile:oe.sourceFile,elementBoundingBoxes:oe.elementBoundingBoxes,...B&&Zn?{sessionId:Zn,url:typeof window<"u"?window.location.href:void 0,status:"pending"}:{}};De(D=>[...D,w]),zo.current=w.id,rt(()=>{zo.current=null},300),rt(()=>{Ai(D=>new Set(D).add(w.id))},250),f?.(w),Yo("annotation.add",{annotation:w}),vs(!0),rt(()=>{Ee(null),vs(!1)},150),window.getSelection()?.removeAllRanges(),B&&Zn&&Ec(B,Zn,w).then(D=>{D.id!==w.id&&(De(R=>R.map(z=>z.id===w.id?{...z,id:D.id}:z)),Ai(R=>{let z=new Set(R);return z.delete(w.id),z.add(D.id),z}))}).catch(D=>{console.warn("[Agentation] Failed to sync annotation:",D)})},[oe,f,Yo,B,Zn]),to=(0,U.useCallback)(()=>{vs(!0),rt(()=>{Ee(null),vs(!1)},150)},[]),ks=(0,U.useCallback)(b=>{let w=J.findIndex(R=>R.id===b),D=J[w];we?.id===b&&(Nl(!0),rt(()=>{pe(null),lt(null),Je([]),Nl(!1)},150)),sn(b),bs(R=>new Set(R).add(b)),D&&(h?.(D),Yo("annotation.delete",{annotation:D})),B&&yr(B,b).catch(R=>{console.warn("[Agentation] Failed to delete annotation from server:",R)}),rt(()=>{De(R=>R.filter(z=>z.id!==b)),bs(R=>{let z=new Set(R);return z.delete(b),z}),sn(null),w<J.length-1&&(So(w),rt(()=>So(null),200))},150)},[J,we,h,Yo,B]),ei=(0,U.useCallback)(b=>{if(!b){eo(null),xe(null),Yn([]);return}if(eo(b.id),b.elementBoundingBoxes?.length){let w=[];for(let D of b.elementBoundingBoxes){let R=D.x+D.width/2,z=D.y+D.height/2-window.scrollY,ge=document.elementsFromPoint(R,z).find(Ce=>!Ce.closest("[data-annotation-marker]")&&!Ce.closest("[data-agentation-root]"));ge&&w.push(ge)}Yn(w),xe(null)}else if(b.boundingBox){let w=b.boundingBox,D=w.x+w.width/2,R=b.isFixed?w.y+w.height/2:w.y+w.height/2-window.scrollY,z=is(D,R);if(z){let G=z.getBoundingClientRect(),ge=G.width/w.width,Ce=G.height/w.height;ge<.5||Ce<.5?xe(null):xe(z)}else xe(null);Yn([])}else xe(null),Yn([])},[]),ti=(0,U.useCallback)(b=>{if(!we)return;let w={...we,comment:b};De(D=>D.map(R=>R.id===we.id?w:R)),y?.(w),Yo("annotation.update",{annotation:w}),B&&Fb(B,we.id,{comment:b}).catch(D=>{console.warn("[Agentation] Failed to update annotation on server:",D)}),Nl(!0),rt(()=>{pe(null),lt(null),Je([]),Nl(!1)},150)},[we,y,Yo,B]),Pc=(0,U.useCallback)(()=>{Nl(!0),rt(()=>{pe(null),lt(null),Je([]),Nl(!1)},150)},[]),ga=(0,U.useCallback)(()=>{let b=J.length,w=ae.length>0||!!ft;if(b===0&&Io.length===0&&!w)return;if(k?.(J),Yo("annotations.clear",{annotations:J}),B){Promise.all(J.map(z=>yr(B,z.id).catch(G=>{console.warn("[Agentation] Failed to delete annotation from server:",G)})));for(let[,z]of ta.current)z&&yr(B,z).catch(()=>{});ta.current.clear();for(let[,z]of Ol.current)z&&yr(B,z).catch(()=>{});Ol.current.clear()}It(!0),Rn(!0),Nc([]);let D=_s.current;if(D){let z=D.getContext("2d");z&&z.clearRect(0,0,D.width,D.height)}(ae.length>0||ft)&&(fs(z=>z+1),Va(z=>z+1),rt(()=>{xt([]),Uo(null)},200)),ct&&Kt(!1),Dn&&ol(""),ma.current={rearrange:null,placements:[]},Wh(nt);let R=b*30+200;rt(()=>{De([]),Ai(new Set),localStorage.removeItem(Kh(nt)),It(!1)},R),rt(()=>Rn(!1),1500)},[nt,J,Io,ae,ft,ct,Dn,k,Yo,B]),Es=(0,U.useCallback)(async()=>{let b=typeof window<"u"?window.location.pathname+window.location.search+window.location.hash:nt,w=K&&ct,D;if(w){if(ae.length===0&&!ft&&!Dn)return;D=""}else{if(D=ev(J,b,Mt.outputDetail),!D&&Io.length===0&&ae.length===0&&!ft)return;D||(D=`## Page Feedback: ${b}
`)}if(!w&&Io.length>0){let R=new Set;for(let Ce of J)Ce.drawingIndex!=null&&R.add(Ce.drawingIndex);let z=_s.current;z&&(z.style.visibility="hidden");let G=[],ge=window.scrollY;for(let Ce=0;Ce<Io.length;Ce++){if(R.has(Ce))continue;let $e=Io[Ce];if($e.points.length<2)continue;let We=$e.fixed?$e.points:$e.points.map(dn=>({x:dn.x,y:dn.y-ge})),Pe=1/0,ot=1/0,St=-1/0,et=-1/0;for(let dn of We)Pe=Math.min(Pe,dn.x),ot=Math.min(ot,dn.y),St=Math.max(St,dn.x),et=Math.max(et,dn.y);let Le=St-Pe,ln=et-ot,en=Math.hypot(Le,ln),Vn=We[0],Wt=We[We.length-1],cn=Math.hypot(Wt.x-Vn.x,Wt.y-Vn.y),ut,mt=cn<en*.35,pn=Le/Math.max(ln,1);if(mt&&en>20){let dn=Math.max(Le,ln)*.15,Pt=0;for(let jl of We){let Bd=jl.x-Pe<dn,Fc=St-jl.x<dn,li=jl.y-ot<dn,Rr=et-jl.y<dn;(Bd||Fc)&&(li||Rr)&&Pt++}ut=Pt>We.length*.15?"box":"circle"}else pn>3&&ln<40?ut="underline":cn>en*.5?ut="arrow":ut="drawing";let gn=Math.min(10,We.length),no=Math.max(1,Math.floor(We.length/gn)),Qn=new Set,Pn=[],oi=[Vn];for(let dn=no;dn<We.length-1;dn+=no)oi.push(We[dn]);oi.push(Wt);for(let dn of oi){let Pt=is(dn.x,dn.y);if(!Pt||Qn.has(Pt)||el(Pt,"[data-feedback-toolbar]"))continue;Qn.add(Pt);let{name:jl}=Rc(Pt);Pn.includes(jl)||Pn.push(jl)}let al=`${Math.round(Pe)},${Math.round(ot)} \u2192 ${Math.round(St)},${Math.round(et)}`,pl;(ut==="circle"||ut==="box")&&Pn.length>0?pl=`${ut==="box"?"Boxed":"Circled"} **${Pn[0]}**${Pn.length>1?` (and ${Pn.slice(1).join(", ")})`:""} (region: ${al})`:ut==="underline"&&Pn.length>0?pl=`Underlined **${Pn[0]}** (${al})`:ut==="arrow"&&Pn.length>=2?pl=`Arrow from **${Pn[0]}** to **${Pn[Pn.length-1]}** (${Math.round(Vn.x)},${Math.round(Vn.y)} \u2192 ${Math.round(Wt.x)},${Math.round(Wt.y)})`:Pn.length>0?pl=`${ut==="arrow"?"Arrow":"Drawing"} near **${Pn.join("**, **")}** (region: ${al})`:pl=`Drawing at ${al}`,G.push(pl)}z&&(z.style.visibility=""),G.length>0&&(D+=`
**Drawings:**
`,G.forEach((Ce,$e)=>{D+=`${$e+1}. ${Ce}
`}))}if((ae.length>0||w&&Dn)&&(D+=`
`+Wb(ae,{width:window.innerWidth,height:window.innerHeight},{blankCanvas:ct,wireframePurpose:Dn||void 0},Mt.outputDetail)),ft){let R=Gb(ft,Mt.outputDetail,{width:window.innerWidth,height:window.innerHeight});R&&(D+=`
`+R)}if(ie)try{await navigator.clipboard.writeText(D)}catch{}E?.(D),Q(!0),rt(()=>Q(!1),2e3),Mt.autoClearAfterCopy&&rt(()=>ga(),500)},[J,Io,ae,ft,ct,K,ea,Dn,nt,Mt.outputDetail,qn,Mt.autoClearAfterCopy,ga,ie,E]),Ms=(0,U.useCallback)(async()=>{let b=typeof window<"u"?window.location.pathname+window.location.search+window.location.hash:nt,w=ev(J,b,Mt.outputDetail);if(!w&&ae.length===0&&!ft)return;if(w||(w=`## Page Feedback: ${b}
`),ae.length>0&&(w+=`
`+Wb(ae,{width:window.innerWidth,height:window.innerHeight},{blankCanvas:ct,wireframePurpose:Dn||void 0},Mt.outputDetail)),ft){let R=Gb(ft,Mt.outputDetail,{width:window.innerWidth,height:window.innerHeight});R&&(w+=`
`+R)}A&&A(w,J),at("sending"),await new Promise(R=>rt(R,150));let D=await Yo("submit",{output:w,annotations:J},!0);at(D?"sent":"failed"),rt(()=>at("idle"),2500),D&&Mt.autoClearAfterCopy&&rt(()=>ga(),500)},[A,Yo,J,ae,ft,ct,ea,nt,Mt.outputDetail,qn,Mt.autoClearAfterCopy,ga]);(0,U.useEffect)(()=>{if(!Di)return;let b=10,w=R=>{let z=R.clientX-Di.x,G=R.clientY-Di.y,ge=Math.sqrt(z*z+G*G);if(!Za&&ge>b&&qc(!0),Za||ge>b){let Ce=Di.toolbarX+z,$e=Di.toolbarY+G,We=20,Pe=337,ot=44,et=Pe-(re?ll==="connected"?297:257:44),Le=We-et,ln=window.innerWidth-We-Pe;Ce=Math.max(Le,Math.min(ln,Ce)),$e=Math.max(We,Math.min(window.innerHeight-ot-We,$e)),gs({x:Ce,y:$e})}},D=()=>{Za&&(ys.current=!0),qc(!1),Cr(null)};return document.addEventListener("mousemove",w),document.addEventListener("mouseup",D),()=>{document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",D)}},[Di,Za,re,ll]);let l_=(0,U.useCallback)(b=>{if(b.target.closest("button")||b.target.closest("[data-agentation-settings-panel]"))return;let w=b.currentTarget.parentElement;if(!w)return;let D=w.getBoundingClientRect(),R=Mn?.x??D.left,z=Mn?.y??D.top;Cr({x:b.clientX,y:b.clientY,toolbarX:R,toolbarY:z})},[Mn]);if((0,U.useEffect)(()=>{if(!Mn)return;let b=()=>{let z=Mn.x,G=Mn.y,$e=20-(337-(re?ll==="connected"?297:257:44)),We=window.innerWidth-20-337;z=Math.max($e,Math.min(We,z)),G=Math.max(20,Math.min(window.innerHeight-44-20,G)),(z!==Mn.x||G!==Mn.y)&&gs({x:z,y:G})};return b(),window.addEventListener("resize",b),()=>window.removeEventListener("resize",b)},[Mn,re,ll]),(0,U.useEffect)(()=>{let b=w=>{let D=w.target,R=D.tagName==="INPUT"||D.tagName==="TEXTAREA"||D.isContentEditable;if(w.key==="Escape"){if(K){pt?st(null):Mr();return}if(hl){Lc(!1);return}if(Bn.length>0){Ti([]);return}oe||re&&(go(),j(!1))}if((w.metaKey||w.ctrlKey)&&w.shiftKey&&(w.key==="f"||w.key==="F")){w.preventDefault(),go(),re?Nd():j(!0);return}if(!(R||w.metaKey||w.ctrlKey)&&((w.key==="p"||w.key==="P")&&(w.preventDefault(),go(),Cs()),(w.key==="l"||w.key==="L")&&(w.preventDefault(),go(),hl&&Lc(!1),le&&Oe(!1),oe&&to(),K?Mr():Ae(!0)),(w.key==="h"||w.key==="H")&&J.length>0&&(w.preventDefault(),go(),Ge(z=>!z)),(w.key==="c"||w.key==="C")&&(J.length>0||ae.length>0||ft)&&(w.preventDefault(),go(),Es()),(w.key==="x"||w.key==="X")&&(J.length>0||ae.length>0||ft)&&(w.preventDefault(),go(),ga(),ae.length>0&&xt([]),ft&&Uo(null)),w.key==="s"||w.key==="S")){let z=Xa(Mt.webhookUrl)||Xa(Z||"");J.length>0&&z&&qe==="idle"&&(w.preventDefault(),go(),Ms())}};return document.addEventListener("keydown",b),()=>document.removeEventListener("keydown",b)},[re,hl,K,pt,ae,ft,oe,J.length,Mt.webhookUrl,Z,qe,Ms,Cs,Es,ga,Bn]),!Ze||$t)return null;let ni=J.length>0,$o=J.filter(b=>!zd.has(b.id)&&b.kind!=="placement"&&b.kind!=="rearrange"),$d=$o.length>0,Ts=J.filter(b=>zd.has(b.id)),Tr=b=>{let G=b.x/100*window.innerWidth,ge=typeof b.y=="string"?parseFloat(b.y):b.y,Ce={};window.innerHeight-ge-22-10<80&&(Ce.top="auto",Ce.bottom="calc(100% + 10px)");let We=G-200/2,Pe=10;if(We<Pe){let ot=Pe-We;Ce.left=`calc(50% + ${ot}px)`}else if(We+200>window.innerWidth-Pe){let ot=We+200-(window.innerWidth-Pe);Ce.left=`calc(50% - ${ot}px)`}return Ce};return(0,iv.createPortal)((0,he.jsxs)("div",{ref:wt,style:{display:"contents"},"data-agentation-theme":_l?"dark":"light","data-agentation-accent":Mt.annotationColorId,"data-agentation-root":"",children:[(0,he.jsx)("div",{className:`${fe.toolbar}${X?` ${X}`:""}`,"data-feedback-toolbar":!0,"data-agentation-toolbar":!0,style:Mn?{left:Mn.x,top:Mn.y,right:"auto",bottom:"auto"}:void 0,children:(0,he.jsxs)("div",{className:`${fe.toolbarContainer} ${re?fe.expanded:fe.collapsed} ${Ic?fe.entrance:""} ${Me?fe.hiding:""} ${!Mt.webhooksEnabled&&(Xa(Mt.webhookUrl)||Xa(Z||""))?fe.serverConnected:""}`,onClick:re?void 0:b=>{if(ys.current){ys.current=!1,b.preventDefault();return}j(!0)},onMouseDown:l_,role:re?void 0:"button",tabIndex:re?-1:0,title:re?void 0:"Start feedback mode",children:[(0,he.jsxs)("div",{className:`${fe.toggleContent} ${re?fe.hidden:fe.visible}`,children:[(0,he.jsx)(J4,{size:24}),$d&&(0,he.jsx)("span",{className:`${fe.badge} ${re?fe.fadeOut:""} ${Ic?fe.entrance:""}`,children:$o.length})]}),(0,he.jsxs)("div",{className:`${fe.controlsContent} ${re?fe.visible:fe.hidden} ${Mn&&Mn.y<100?fe.tooltipBelow:""} ${W||le?fe.tooltipsHidden:""} ${Uc?fe.tooltipsInSession:""}`,onMouseEnter:xr,onMouseLeave:na,children:[(0,he.jsxs)("div",{className:`${fe.buttonWrapper} ${Mn&&Mn.x<120?fe.buttonWrapperAlignLeft:""}`,children:[(0,he.jsx)("button",{className:fe.controlButton,onClick:b=>{b.stopPropagation(),go(),Cs()},"data-active":I,children:(0,he.jsx)(o6,{size:24,isPaused:I})}),(0,he.jsxs)("span",{className:fe.buttonTooltip,children:[I?"Resume animations":"Pause animations",(0,he.jsx)("span",{className:fe.shortcut,children:"P"})]})]}),(0,he.jsxs)("div",{className:fe.buttonWrapper,children:[(0,he.jsx)("button",{className:`${fe.controlButton} ${_l?"":fe.light}`,onClick:b=>{b.stopPropagation(),go(),hl&&Lc(!1),le&&Oe(!1),oe&&to(),K?Mr():Ae(!0)},"data-active":K,style:K&&ct?{color:"#f97316",background:"rgba(249, 115, 22, 0.25)"}:void 0,children:(0,he.jsx)(f6,{size:21})}),(0,he.jsxs)("span",{className:fe.buttonTooltip,children:[K?"Exit layout mode":"Layout mode",(0,he.jsx)("span",{className:fe.shortcut,children:"L"})]})]}),(0,he.jsxs)("div",{className:fe.buttonWrapper,children:[(0,he.jsx)("button",{className:fe.controlButton,onClick:b=>{b.stopPropagation(),go(),Ge(!Ie)},disabled:!ni||K,children:(0,he.jsx)(n6,{size:24,isOpen:Ie})}),(0,he.jsxs)("span",{className:fe.buttonTooltip,children:[Ie?"Hide markers":"Show markers",(0,he.jsx)("span",{className:fe.shortcut,children:"H"})]})]}),(0,he.jsxs)("div",{className:fe.buttonWrapper,children:[(0,he.jsx)("button",{className:`${fe.controlButton} ${vt?fe.statusShowing:""}`,onClick:b=>{b.stopPropagation(),go(),Es()},disabled:K&&ct?ae.length===0&&!ft?.sections?.length:!ni&&Io.length===0&&ae.length===0&&!ft?.sections?.length,"data-active":vt,children:(0,he.jsx)(e6,{size:24,copied:vt,tint:K&&ct&&(ae.length>0||ft?.sections?.length)?"#f97316":void 0})}),(0,he.jsxs)("span",{className:fe.buttonTooltip,children:[K&&ct?"Copy layout":"Copy feedback",(0,he.jsx)("span",{className:fe.shortcut,children:"C"})]})]}),(0,he.jsxs)("div",{className:`${fe.buttonWrapper} ${fe.sendButtonWrapper} ${re&&!Mt.webhooksEnabled&&(Xa(Mt.webhookUrl)||Xa(Z||""))?fe.sendButtonVisible:""}`,children:[(0,he.jsxs)("button",{className:`${fe.controlButton} ${qe==="sent"||qe==="failed"?fe.statusShowing:""}`,onClick:b=>{b.stopPropagation(),go(),Ms()},disabled:!ni||!Xa(Mt.webhookUrl)&&!Xa(Z||"")||qe==="sending","data-no-hover":qe==="sent"||qe==="failed",tabIndex:Xa(Mt.webhookUrl)||Xa(Z||"")?0:-1,children:[(0,he.jsx)(t6,{size:24,state:qe}),ni&&qe==="idle"&&(0,he.jsx)("span",{className:fe.buttonBadge,children:J.length})]}),(0,he.jsxs)("span",{className:fe.buttonTooltip,children:["Send Annotations",(0,he.jsx)("span",{className:fe.shortcut,children:"S"})]})]}),(0,he.jsxs)("div",{className:fe.buttonWrapper,children:[(0,he.jsx)("button",{className:fe.controlButton,onClick:b=>{b.stopPropagation(),go(),ga()},disabled:!ni&&Io.length===0&&ae.length===0&&!ft?.sections?.length,"data-danger":!0,children:(0,he.jsx)(a6,{size:24})}),(0,he.jsxs)("span",{className:fe.buttonTooltip,children:["Clear all",(0,he.jsx)("span",{className:fe.shortcut,children:"X"})]})]}),(0,he.jsxs)("div",{className:fe.buttonWrapper,children:[(0,he.jsx)("button",{className:fe.controlButton,onClick:b=>{b.stopPropagation(),go(),K&&Mr(),Oe(!le)},children:(0,he.jsx)(l6,{size:24})}),B&&ll!=="disconnected"&&(0,he.jsx)("span",{className:`${fe.mcpIndicator} ${fe[ll]} ${le?fe.hidden:""}`,title:ll==="connected"?"MCP Connected":"MCP Connecting..."}),(0,he.jsx)("span",{className:fe.buttonTooltip,children:"Settings"})]}),(0,he.jsx)("div",{className:fe.divider}),(0,he.jsxs)("div",{className:`${fe.buttonWrapper} ${Mn&&typeof window<"u"&&Mn.x>window.innerWidth-120?fe.buttonWrapperAlignRight:""}`,children:[(0,he.jsx)("button",{className:fe.controlButton,onClick:b=>{b.stopPropagation(),go(),Nd()},children:(0,he.jsx)(i6,{size:24})}),(0,he.jsxs)("span",{className:fe.buttonTooltip,children:["Exit",(0,he.jsx)("span",{className:fe.shortcut,children:"Esc"})]})]})]}),(0,he.jsx)(I3,{visible:K&&re,activeType:pt,onSelect:b=>{st(pt===b?null:b)},isDarkMode:_l,sectionCount:ft?.sections.length??0,onDetectSections:()=>{let b=J3(),w=ft?.sections??[],D=new Set(w.map(ge=>ge.selector)),R=b.filter(ge=>!D.has(ge.selector)),z=[...w,...R],G=[...ft?.originalOrder??[],...R.map(ge=>ge.id)];Uo({sections:z,originalOrder:G,detectedAt:Date.now()})},placementCount:ae.length,onClearPlacements:()=>{fs(b=>b+1),Va(b=>b+1),rt(()=>{Uo({sections:[],originalOrder:[],detectedAt:Date.now()})},200)},blankCanvas:ct,onBlankCanvasChange:b=>{let w={sections:[],originalOrder:[],detectedAt:Date.now()};b?(ds.current={rearrange:ft,placements:ae},Uo(ma.current.rearrange||w),xt(ma.current.placements),st(null)):(ma.current={rearrange:ft,placements:ae},Uo(ds.current.rearrange||w),xt(ds.current.placements)),Kt(b)},wireframePurpose:Dn,onWireframePurposeChange:ol,Tooltip:ss,onDragStart:(b,w)=>{w.preventDefault();let D=He[b],R=null,z=!1,G=w.clientX,ge=w.clientY,$e=w.target.closest("[data-feedback-toolbar]")?.getBoundingClientRect().top??window.innerHeight,We=ot=>{let St=ot.clientX-G,et=ot.clientY-ge;if(!z&&(Math.abs(St)>4||Math.abs(et)>4)&&(z=!0,R=document.createElement("div"),R.className=`${ee.dragPreview}${ct?` ${ee.dragPreviewWireframe}`:""}`,document.body.appendChild(R)),!R)return;let Le=Math.max(0,$e-ot.clientY),ln=Math.min(1,Le/180),en=1-Math.pow(1-ln,2),Vn=28,Wt=20,cn=Math.min(140,D.width*.18),ut=Math.min(90,D.height*.18),mt=Vn+(cn-Vn)*en,pn=Wt+(ut-Wt)*en;R.style.width=`${mt}px`,R.style.height=`${pn}px`,R.style.left=`${ot.clientX-mt/2}px`,R.style.top=`${ot.clientY-pn/2}px`,R.style.opacity=`${.5+.5*en}`,R.textContent=en>.25?b:""},Pe=ot=>{if(window.removeEventListener("mousemove",We),window.removeEventListener("mouseup",Pe),R&&document.body.removeChild(R),z){let St=D.width,et=D.height,Le=window.scrollY,ln=Math.max(0,ot.clientX-St/2),en=Math.max(0,ot.clientY+Le-et/2),Vn={id:`dp-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,type:b,x:ln,y:en,width:St,height:et,scrollY:Le,timestamp:Date.now()};xt(Wt=>[...Wt,Vn]),st(null),fl.current=new Set,zc(Wt=>Wt+1)}};window.addEventListener("mousemove",We),window.addEventListener("mouseup",Pe)}}),(0,he.jsx)(r7,{settings:Mt,onSettingsChange:b=>Od(w=>({...w,...b})),isDarkMode:_l,onToggleTheme:ps,isDevMode:Yc,connectionStatus:ll,endpoint:B,isVisible:Ue,toolbarNearBottom:!!Mn&&Mn.y<230,settingsPage:_,onSettingsPageChange:T,onHideToolbar:Ul})]})}),(K||be)&&(0,he.jsx)("div",{className:`${ee.blankCanvas} ${Nn?ee.visible:""} ${ko?ee.gridActive:""}`,style:{"--canvas-opacity":$n},"data-feedback-toolbar":!0}),K&&ct&&Nn&&(0,he.jsxs)("div",{className:ee.wireframeNotice,"data-feedback-toolbar":!0,children:[(0,he.jsxs)("div",{className:ee.wireframeOpacityRow,children:[(0,he.jsx)("span",{className:ee.wireframeOpacityLabel,children:"Toggle Opacity"}),(0,he.jsx)("input",{type:"range",className:ee.wireframeOpacitySlider,min:0,max:1,step:.01,value:$n,onChange:b=>Co(Number(b.target.value))})]}),(0,he.jsxs)("div",{className:ee.wireframeNoticeTitleRow,children:[(0,he.jsx)("span",{className:ee.wireframeNoticeTitle,children:"Wireframe Mode"}),(0,he.jsx)("span",{className:ee.wireframeNoticeDivider}),(0,he.jsx)("button",{className:ee.wireframeStartOver,onClick:()=>{fs(b=>b+1),Uo({sections:[],originalOrder:[],detectedAt:Date.now()}),ma.current={rearrange:null,placements:[]},ol(""),Wh(nt)},children:"Start Over"})]}),"Drag components onto the canvas.",(0,he.jsx)("br",{}),"Copied output will only include the wireframed layout."]}),(K||be)&&(0,he.jsx)($3,{placements:ae,onChange:xt,activeComponent:be?null:pt,onActiveComponentChange:st,isDarkMode:_l,exiting:be,onInteractionChange:Md,passthrough:!pt,extraSnapRects:ft?.sections.map(b=>b.currentRect),deselectSignal:Mi,clearSignal:Dd,wireframe:ct,onSelectionChange:(b,w)=>{fl.current=b,w||(vr.current=new Set,Rd(D=>D+1))},onDragMove:(b,w)=>{let D=vr.current;if(!(!D.size||!ft)){if(!Eo.current){Eo.current=new Map;for(let R of ft.sections)D.has(R.id)&&Eo.current.set(R.id,{x:R.currentRect.x,y:R.currentRect.y})}for(let R of ft.sections){if(!D.has(R.id)||!Eo.current.get(R.id))continue;let G=document.querySelector(`[data-rearrange-section="${R.id}"]`);G&&(G.style.transform=`translate(${b}px, ${w}px)`)}}},onDragEnd:(b,w,D)=>{let R=vr.current,z=Eo.current;if(Eo.current=null,!(!R.size||!ft||!z)){for(let G of R){let ge=document.querySelector(`[data-rearrange-section="${G}"]`);ge&&(ge.style.transform="")}D&&Uo(G=>G&&{...G,sections:G.sections.map(ge=>{let Ce=z.get(ge.id);return Ce?{...ge,currentRect:{...ge.currentRect,x:Math.max(0,Ce.x+b),y:Math.max(0,Ce.y+w)}}:ge})})}}}),(K||be)&&ft&&(0,he.jsx)(t8,{rearrangeState:ft,onChange:Uo,isDarkMode:_l,exiting:be,blankCanvas:ct,extraSnapRects:ae.map(b=>({x:b.x,y:b.y,width:b.width,height:b.height})),clearSignal:jo,deselectSignal:Td,onSelectionChange:(b,w)=>{vr.current=b,w||(fl.current=new Set,zc(D=>D+1))},onDragMove:(b,w)=>{let D=fl.current;if(D.size){if(!Eo.current){Eo.current=new Map;for(let R of ae)D.has(R.id)&&Eo.current.set(R.id,{x:R.x,y:R.y})}for(let R of D){let z=document.querySelector(`[data-design-placement="${R}"]`);z&&(z.style.transform=`translate(${b}px, ${w}px)`)}}},onDragEnd:(b,w,D)=>{let R=fl.current,z=Eo.current;if(Eo.current=null,!(!R.size||!z)){for(let G of R){let ge=document.querySelector(`[data-design-placement="${G}"]`);ge&&(ge.style.transform="")}D&&xt(G=>G.map(ge=>{let Ce=z.get(ge.id);return Ce?{...ge,x:Math.max(0,Ce.x+b),y:Math.max(0,Ce.y+w)}:ge}))}}}),(0,he.jsx)("canvas",{ref:_s,className:`${fe.drawCanvas} ${hl?fe.active:""}`,style:{opacity:zi?1:0,transition:"opacity 0.15s ease"},"data-feedback-toolbar":!0}),(0,he.jsxs)("div",{className:fe.markersLayer,"data-feedback-toolbar":!0,children:[ue&&$o.filter(b=>!b.isFixed).map((b,w,D)=>(0,he.jsx)(tv,{annotation:b,globalIndex:$o.findIndex(R=>R.id===b.id),layerIndex:w,layerSize:D.length,isExiting:Ye,isClearing:Oo,isAnimated:Vc.has(b.id),isHovered:!Ye&&En===b.id,isDeleting:fo===b.id,isEditingAny:!!we,renumberFrom:Qt,markerClickBehavior:Mt.markerClickBehavior,tooltipStyle:Tr(b),onHoverEnter:R=>!Ye&&R.id!==zo.current&&ei(R),onHoverLeave:()=>ei(null),onClick:R=>Mt.markerClickBehavior==="delete"?ks(R.id):Ka(R),onContextMenu:Ka},b.id)),ue&&!Ye&&Ts.filter(b=>!b.isFixed).map(b=>(0,he.jsx)(nv,{annotation:b},b.id))]}),(0,he.jsxs)("div",{className:fe.fixedMarkersLayer,"data-feedback-toolbar":!0,children:[ue&&$o.filter(b=>b.isFixed).map((b,w,D)=>(0,he.jsx)(tv,{annotation:b,globalIndex:$o.findIndex(R=>R.id===b.id),layerIndex:w,layerSize:D.length,isExiting:Ye,isClearing:Oo,isAnimated:Vc.has(b.id),isHovered:!Ye&&En===b.id,isDeleting:fo===b.id,isEditingAny:!!we,renumberFrom:Qt,markerClickBehavior:Mt.markerClickBehavior,tooltipStyle:Tr(b),onHoverEnter:R=>!Ye&&R.id!==zo.current&&ei(R),onHoverLeave:()=>ei(null),onClick:R=>Mt.markerClickBehavior==="delete"?ks(R.id):Ka(R),onContextMenu:Ka},b.id)),ue&&!Ye&&Ts.filter(b=>b.isFixed).map(b=>(0,he.jsx)(nv,{annotation:b,fixed:!0},b.id))]}),re&&(0,he.jsxs)("div",{className:fe.overlay,"data-feedback-toolbar":!0,style:oe||we?{zIndex:99999}:void 0,children:[Fe?.rect&&!oe&&!Ot&&!$l&&(0,he.jsx)("div",{className:`${fe.hoverHighlight} ${fe.enter}`,style:{left:Fe.rect.left,top:Fe.rect.top,width:Fe.rect.width,height:Fe.rect.height,borderColor:"color-mix(in srgb, var(--agentation-color-accent) 50%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 4%, transparent)"}}),Bn.filter(b=>document.contains(b.element)).map((b,w)=>{let D=b.element.getBoundingClientRect(),R=Bn.length>1;return(0,he.jsx)("div",{className:R?fe.multiSelectOutline:fe.singleSelectOutline,style:{position:"fixed",left:D.left,top:D.top,width:D.width,height:D.height,...R?{}:{borderColor:"color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"}}},w)}),En&&!oe&&(()=>{let b=J.find(z=>z.id===En);if(!b?.boundingBox)return null;if(b.elementBoundingBoxes?.length)return po.length>0?po.filter(z=>document.contains(z)).map((z,G)=>{let ge=z.getBoundingClientRect();return(0,he.jsx)("div",{className:`${fe.multiSelectOutline} ${fe.enter}`,style:{left:ge.left,top:ge.top,width:ge.width,height:ge.height}},`hover-outline-live-${G}`)}):b.elementBoundingBoxes.map((z,G)=>(0,he.jsx)("div",{className:`${fe.multiSelectOutline} ${fe.enter}`,style:{left:z.x,top:z.y-Bt,width:z.width,height:z.height}},`hover-outline-${G}`));let w=nl&&document.contains(nl)?nl.getBoundingClientRect():null,D=w?{x:w.left,y:w.top,width:w.width,height:w.height}:{x:b.boundingBox.x,y:b.isFixed?b.boundingBox.y:b.boundingBox.y-Bt,width:b.boundingBox.width,height:b.boundingBox.height},R=b.isMultiSelect;return(0,he.jsx)("div",{className:`${R?fe.multiSelectOutline:fe.singleSelectOutline} ${fe.enter}`,style:{left:D.x,top:D.y,width:D.width,height:D.height,...R?{}:{borderColor:"color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"}}})})(),Fe&&!oe&&!Ot&&!$l&&(0,he.jsxs)("div",{className:`${fe.hoverTooltip} ${fe.enter}`,style:{left:Math.max(8,Math.min(me.x,window.innerWidth-100)),top:Math.max(me.y-(Fe.reactComponents?48:32),8)},children:[Fe.reactComponents&&(0,he.jsx)("div",{className:fe.hoverReactPath,children:Fe.reactComponents}),(0,he.jsx)("div",{className:fe.hoverElementName,children:Fe.elementName})]}),oe&&(0,he.jsxs)(he.Fragment,{children:[oe.multiSelectElements?.length?oe.multiSelectElements.filter(b=>document.contains(b)).map((b,w)=>{let D=b.getBoundingClientRect();return(0,he.jsx)("div",{className:`${fe.multiSelectOutline} ${kr?fe.exit:fe.enter}`,style:{left:D.left,top:D.top,width:D.width,height:D.height}},`pending-multi-${w}`)}):oe.targetElement&&document.contains(oe.targetElement)?(()=>{let b=oe.targetElement.getBoundingClientRect();return(0,he.jsx)("div",{className:`${fe.singleSelectOutline} ${kr?fe.exit:fe.enter}`,style:{left:b.left,top:b.top,width:b.width,height:b.height,borderColor:"color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"}})})():oe.boundingBox&&(0,he.jsx)("div",{className:`${oe.isMultiSelect?fe.multiSelectOutline:fe.singleSelectOutline} ${kr?fe.exit:fe.enter}`,style:{left:oe.boundingBox.x,top:oe.boundingBox.y-Bt,width:oe.boundingBox.width,height:oe.boundingBox.height,...oe.isMultiSelect?{}:{borderColor:"color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"}}}),(()=>{let b=oe.x,w=oe.isFixed?oe.y:oe.y-Bt;return(0,he.jsxs)(he.Fragment,{children:[(0,he.jsx)(F8,{x:b,y:w,isMultiSelect:oe.isMultiSelect,isExiting:kr}),(0,he.jsx)(Fh,{ref:Wc,element:oe.element,selectedText:oe.selectedText,computedStyles:oe.computedStylesObj,placeholder:oe.element==="Area selection"?"What should change in this area?":oe.isMultiSelect?"Feedback for this group of elements...":"What should change?",onSubmit:Zc,onCancel:to,isExiting:kr,lightMode:!_l,accentColor:oe.isMultiSelect?"var(--agentation-color-green)":"var(--agentation-color-accent)",style:{left:Math.max(160,Math.min(window.innerWidth-160,b/100*window.innerWidth)),...w>window.innerHeight-290?{bottom:window.innerHeight-w+20}:{top:w+20}}})]})})()]}),we&&(0,he.jsxs)(he.Fragment,{children:[we.elementBoundingBoxes?.length?it.length>0?it.filter(b=>document.contains(b)).map((b,w)=>{let D=b.getBoundingClientRect();return(0,he.jsx)("div",{className:`${fe.multiSelectOutline} ${fe.enter}`,style:{left:D.left,top:D.top,width:D.width,height:D.height}},`edit-multi-live-${w}`)}):we.elementBoundingBoxes.map((b,w)=>(0,he.jsx)("div",{className:`${fe.multiSelectOutline} ${fe.enter}`,style:{left:b.x,top:b.y-Bt,width:b.width,height:b.height}},`edit-multi-${w}`)):(()=>{let b=Se&&document.contains(Se)?Se.getBoundingClientRect():null,w=b?{x:b.left,y:b.top,width:b.width,height:b.height}:we.boundingBox?{x:we.boundingBox.x,y:we.isFixed?we.boundingBox.y:we.boundingBox.y-Bt,width:we.boundingBox.width,height:we.boundingBox.height}:null;return w?(0,he.jsx)("div",{className:`${we.isMultiSelect?fe.multiSelectOutline:fe.singleSelectOutline} ${fe.enter}`,style:{left:w.x,top:w.y,width:w.width,height:w.height,...we.isMultiSelect?{}:{borderColor:"color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"}}}):null})(),(0,he.jsx)(Fh,{ref:Lo,element:we.element,selectedText:we.selectedText,computedStyles:G3(we.computedStyles),placeholder:"Edit your feedback...",initialValue:we.comment,submitLabel:"Save",onSubmit:ti,onCancel:Pc,onDelete:()=>ks(we.id),isExiting:o_,lightMode:!_l,accentColor:we.isMultiSelect?"var(--agentation-color-green)":"var(--agentation-color-accent)",style:(()=>{let b=we.isFixed?we.y:we.y-Bt;return{left:Math.max(160,Math.min(window.innerWidth-160,we.x/100*window.innerWidth)),...b>window.innerHeight-290?{bottom:window.innerHeight-b+20}:{top:b+20}}})()})]}),$l&&(0,he.jsxs)(he.Fragment,{children:[(0,he.jsx)("div",{ref:Fa,className:fe.dragSelection}),(0,he.jsx)("div",{ref:Oi,className:fe.highlightsContainer})]})]})]}),document.body)}var U,iv,jn,ke,Ln,qa,cv,cs,kp,Jt,g,xn,In,m,bt,Ft,Sv,Al,Ed,Cv,Dc,Ac,Ne,he,W4,G4,vn,Z4,P4,mn,F4,J4,K4,e6,t6,n6,o6,l6,a6,rv,i6,r6,s6,c6,u6,d6,f6,sv,fp,Cp,hp,Xt,rt,_6,Tc,Fh,g6,y6,b6,$b,ss,He,uv,_a,O3,L3,N3,ee,kc,Uh,x,F,dv,X3,q3,V3,Q3,W3,Z3,Ep,Ub,P3,F3,jb,Ib,Vh,Yb,Qh,e8,Mp,Vb,Rp,vv,Op,zp,Lp,wv,Dp,on,Jb,Kb,S8,Mc,R8,xd,wd,Gh,W8,G8,fe,Sd,Z8,P8,Kn,J8,K8,bp,vp,e7,t7,Zh,n7,o7,l7,ov,lv,a7,i7,je,av,wp,Xa,s7,Cd,c7,Ev=V4(()=>{"use client";U=kn(Dl(),1),iv=kn($h(),1),jn=kn(Dl(),1),ke=kn(Ko(),1),Ln=kn(Ko(),1),qa=kn(Dl(),1),cv=kn($h(),1),cs=kn(Ko(),1),kp=kn(Ko(),1),Jt=kn(Dl(),1),g=kn(Ko(),1),xn=kn(Ko(),1),In=kn(Dl(),1),m=kn(Ko(),1),bt=kn(Dl(),1),Ft=kn(Ko(),1),Sv=kn(Dl(),1),Al=kn(Ko(),1),Ed=kn(Ko(),1),Cv=kn(Dl(),1),Dc=kn(Ko(),1),Ac=kn(Ko(),1),Ne=kn(Ko(),1),he=kn(Ko(),1),W4=`.styles-module__popup___IhzrD svg[fill=none] {
  fill: none !important;
}
.styles-module__popup___IhzrD svg[fill=none] :not([fill]) {
  fill: none !important;
}

@keyframes styles-module__popupEnter___AuQDN {
  from {
    opacity: 0;
    transform: translateX(-50%) scale(0.95) translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) scale(1) translateY(0);
  }
}
@keyframes styles-module__popupExit___JJKQX {
  from {
    opacity: 1;
    transform: translateX(-50%) scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) scale(0.95) translateY(4px);
  }
}
@keyframes styles-module__shake___jdbWe {
  0%, 100% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(0);
  }
  20% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(-3px);
  }
  40% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(3px);
  }
  60% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(-2px);
  }
  80% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(2px);
  }
}
.styles-module__popup___IhzrD {
  position: fixed;
  transform: translateX(-50%);
  width: 280px;
  padding: 0.75rem 1rem 14px;
  background: #1a1a1a;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
  z-index: 100001;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  will-change: transform, opacity;
  opacity: 0;
}
.styles-module__popup___IhzrD.styles-module__enter___L7U7N {
  animation: styles-module__popupEnter___AuQDN 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
.styles-module__popup___IhzrD.styles-module__entered___COX-w {
  opacity: 1;
  transform: translateX(-50%) scale(1) translateY(0);
}
.styles-module__popup___IhzrD.styles-module__exit___5eGjE {
  animation: styles-module__popupExit___JJKQX 0.15s ease-in forwards;
}
.styles-module__popup___IhzrD.styles-module__entered___COX-w.styles-module__shake___jdbWe {
  animation: styles-module__shake___jdbWe 0.25s ease-out;
}

.styles-module__header___wWsSi {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5625rem;
}

.styles-module__element___fTV2z {
  font-size: 0.75rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.styles-module__headerToggle___WpW0b {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  flex: 1;
  min-width: 0;
  text-align: left;
}
.styles-module__headerToggle___WpW0b .styles-module__element___fTV2z {
  flex: 1;
}

.styles-module__chevron___ZZJlR {
  color: rgba(255, 255, 255, 0.5);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}
.styles-module__chevron___ZZJlR.styles-module__expanded___2Hxgv {
  transform: rotate(90deg);
}

.styles-module__stylesWrapper___pnHgy {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.styles-module__stylesWrapper___pnHgy.styles-module__expanded___2Hxgv {
  grid-template-rows: 1fr;
}

.styles-module__stylesInner___YYZe2 {
  overflow: hidden;
}

.styles-module__stylesBlock___VfQKn {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.375rem;
  padding: 0.5rem 0.625rem;
  margin-bottom: 0.5rem;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  font-size: 0.6875rem;
  line-height: 1.5;
}

.styles-module__styleLine___1YQiD {
  color: rgba(255, 255, 255, 0.85);
  word-break: break-word;
}

.styles-module__styleProperty___84L1i {
  color: #c792ea;
}

.styles-module__styleValue___q51-h {
  color: rgba(255, 255, 255, 0.85);
}

.styles-module__timestamp___Dtpsv {
  font-size: 0.625rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.35);
  font-variant-numeric: tabular-nums;
  margin-left: 0.5rem;
  flex-shrink: 0;
}

.styles-module__quote___mcMmQ {
  font-size: 12px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.5rem;
  padding: 0.4rem 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.25rem;
  line-height: 1.45;
}

.styles-module__textarea___jrSae {
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem 0.625rem;
  font-size: 0.8125rem;
  font-family: inherit;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  resize: none;
  outline: none;
  transition: border-color 0.15s ease;
}
.styles-module__textarea___jrSae:focus {
  border-color: var(--agentation-color-blue);
}
.styles-module__textarea___jrSae.styles-module__green___99l3h:focus {
  border-color: var(--agentation-color-green);
}
.styles-module__textarea___jrSae::placeholder {
  color: rgba(255, 255, 255, 0.35);
}
.styles-module__textarea___jrSae::-webkit-scrollbar {
  width: 6px;
}
.styles-module__textarea___jrSae::-webkit-scrollbar-track {
  background: transparent;
}
.styles-module__textarea___jrSae::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.styles-module__actions___D6x3f {
  display: flex;
  justify-content: flex-end;
  gap: 0.375rem;
  margin-top: 0.5rem;
}

.styles-module__cancel___hRjnL,
.styles-module__submit___K-mIR {
  padding: 0.4rem 0.875rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease, opacity 0.15s ease;
}

.styles-module__cancel___hRjnL {
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
}
.styles-module__cancel___hRjnL:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

.styles-module__submit___K-mIR {
  color: white;
}
.styles-module__submit___K-mIR:hover:not(:disabled) {
  filter: brightness(0.9);
}
.styles-module__submit___K-mIR:disabled {
  cursor: not-allowed;
}

.styles-module__deleteWrapper___oSjdo {
  margin-right: auto;
}

.styles-module__deleteButton___4VuAE {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.4);
  transition: background-color 0.15s ease, color 0.15s ease, transform 0.1s ease;
}
.styles-module__deleteButton___4VuAE:hover {
  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);
  color: var(--agentation-color-red);
}
.styles-module__deleteButton___4VuAE:active {
  transform: scale(0.92);
}

.styles-module__light___6AaSQ.styles-module__popup___IhzrD {
  background: #fff;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06);
}
.styles-module__light___6AaSQ .styles-module__element___fTV2z {
  color: rgba(0, 0, 0, 0.6);
}
.styles-module__light___6AaSQ .styles-module__timestamp___Dtpsv {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___6AaSQ .styles-module__chevron___ZZJlR {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___6AaSQ .styles-module__stylesBlock___VfQKn {
  background: rgba(0, 0, 0, 0.03);
}
.styles-module__light___6AaSQ .styles-module__styleLine___1YQiD {
  color: rgba(0, 0, 0, 0.75);
}
.styles-module__light___6AaSQ .styles-module__styleProperty___84L1i {
  color: #7c3aed;
}
.styles-module__light___6AaSQ .styles-module__styleValue___q51-h {
  color: rgba(0, 0, 0, 0.75);
}
.styles-module__light___6AaSQ .styles-module__quote___mcMmQ {
  color: rgba(0, 0, 0, 0.55);
  background: rgba(0, 0, 0, 0.04);
}
.styles-module__light___6AaSQ .styles-module__textarea___jrSae {
  background: rgba(0, 0, 0, 0.03);
  color: #1a1a1a;
  border-color: rgba(0, 0, 0, 0.12);
}
.styles-module__light___6AaSQ .styles-module__textarea___jrSae::placeholder {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___6AaSQ .styles-module__textarea___jrSae::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
}
.styles-module__light___6AaSQ .styles-module__cancel___hRjnL {
  color: rgba(0, 0, 0, 0.5);
}
.styles-module__light___6AaSQ .styles-module__cancel___hRjnL:hover {
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.75);
}
.styles-module__light___6AaSQ .styles-module__deleteButton___4VuAE {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___6AaSQ .styles-module__deleteButton___4VuAE:hover {
  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);
  color: var(--agentation-color-red);
}`,G4={popup:"styles-module__popup___IhzrD",enter:"styles-module__enter___L7U7N",popupEnter:"styles-module__popupEnter___AuQDN",entered:"styles-module__entered___COX-w",exit:"styles-module__exit___5eGjE",popupExit:"styles-module__popupExit___JJKQX",shake:"styles-module__shake___jdbWe",header:"styles-module__header___wWsSi",element:"styles-module__element___fTV2z",headerToggle:"styles-module__headerToggle___WpW0b",chevron:"styles-module__chevron___ZZJlR",expanded:"styles-module__expanded___2Hxgv",stylesWrapper:"styles-module__stylesWrapper___pnHgy",stylesInner:"styles-module__stylesInner___YYZe2",stylesBlock:"styles-module__stylesBlock___VfQKn",styleLine:"styles-module__styleLine___1YQiD",styleProperty:"styles-module__styleProperty___84L1i",styleValue:"styles-module__styleValue___q51-h",timestamp:"styles-module__timestamp___Dtpsv",quote:"styles-module__quote___mcMmQ",textarea:"styles-module__textarea___jrSae",green:"styles-module__green___99l3h",actions:"styles-module__actions___D6x3f",cancel:"styles-module__cancel___hRjnL",submit:"styles-module__submit___K-mIR",deleteWrapper:"styles-module__deleteWrapper___oSjdo",deleteButton:"styles-module__deleteButton___4VuAE",light:"styles-module__light___6AaSQ"};if(typeof document<"u"){let i=document.getElementById("feedback-tool-styles-annotation-popup-css-styles");i||(i=document.createElement("style"),i.id="feedback-tool-styles-annotation-popup-css-styles",document.head.appendChild(i)),i.textContent=W4}vn=G4,Z4=`.icon-transitions-module__iconState___uqK9J {
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform-origin: center;
}

.icon-transitions-module__iconStateFast___HxlMm {
  transition: opacity 0.15s ease, transform 0.15s ease;
  transform-origin: center;
}

.icon-transitions-module__iconFade___nPwXg {
  transition: opacity 0.2s ease;
}

.icon-transitions-module__iconFadeFast___Ofb2t {
  transition: opacity 0.15s ease;
}

.icon-transitions-module__visible___PlHsU {
  opacity: 1 !important;
}

.icon-transitions-module__visibleScaled___8Qog- {
  opacity: 1 !important;
  transform: scale(1);
}

.icon-transitions-module__hidden___ETykt {
  opacity: 0 !important;
}

.icon-transitions-module__hiddenScaled___JXn-m {
  opacity: 0 !important;
  transform: scale(0.8);
}

.icon-transitions-module__sending___uaLN- {
  opacity: 0.5 !important;
  transform: scale(0.8);
}`,P4={iconState:"icon-transitions-module__iconState___uqK9J",iconStateFast:"icon-transitions-module__iconStateFast___HxlMm",iconFade:"icon-transitions-module__iconFade___nPwXg",iconFadeFast:"icon-transitions-module__iconFadeFast___Ofb2t",visible:"icon-transitions-module__visible___PlHsU",visibleScaled:"icon-transitions-module__visibleScaled___8Qog-",hidden:"icon-transitions-module__hidden___ETykt",hiddenScaled:"icon-transitions-module__hiddenScaled___JXn-m",sending:"icon-transitions-module__sending___uaLN-"};if(typeof document<"u"){let i=document.getElementById("feedback-tool-styles-components-icon-transitions");i||(i=document.createElement("style"),i.id="feedback-tool-styles-components-icon-transitions",document.head.appendChild(i)),i.textContent=Z4}mn=P4,F4=({size:i=16})=>(0,ke.jsx)("svg",{width:i,height:i,viewBox:"0 0 16 16",fill:"none",children:(0,ke.jsx)("path",{d:"M8 3v10M3 8h10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})}),J4=({size:i=24,style:s={}})=>(0,ke.jsxs)("svg",{width:i,height:i,viewBox:"0 0 24 24",fill:"none",style:s,children:[(0,ke.jsxs)("g",{clipPath:"url(#clip0_list_sparkle)",children:[(0,ke.jsx)("path",{d:"M11.5 12L5.5 12",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ke.jsx)("path",{d:"M18.5 6.75L5.5 6.75",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ke.jsx)("path",{d:"M9.25 17.25L5.5 17.25",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ke.jsx)("path",{d:"M16 12.75L16.5179 13.9677C16.8078 14.6494 17.3506 15.1922 18.0323 15.4821L19.25 16L18.0323 16.5179C17.3506 16.8078 16.8078 17.3506 16.5179 18.0323L16 19.25L15.4821 18.0323C15.1922 17.3506 14.6494 16.8078 13.9677 16.5179L12.75 16L13.9677 15.4821C14.6494 15.1922 15.1922 14.6494 15.4821 13.9677L16 12.75Z",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})]}),(0,ke.jsx)("defs",{children:(0,ke.jsx)("clipPath",{id:"clip0_list_sparkle",children:(0,ke.jsx)("rect",{width:"24",height:"24",fill:"white"})})})]}),K4=({size:i=20,...s})=>(0,ke.jsxs)("svg",{width:i,height:i,viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",...s,children:[(0,ke.jsx)("circle",{cx:"10",cy:"10",r:"5.375",stroke:"currentColor",strokeWidth:"1.25"}),(0,ke.jsx)("path",{d:"M8.5 8.5C8.73 7.85 9.31 7.49 10 7.5C10.86 7.51 11.5 8.13 11.5 9C11.5 10.08 10 10.5 10 10.5V10.75",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ke.jsx)("circle",{cx:"10",cy:"12.625",r:"0.625",fill:"currentColor"})]}),e6=({size:i=24,copied:s=!1,tint:u})=>(0,ke.jsxs)("svg",{width:i,height:i,viewBox:"0 0 24 24",fill:"none",style:u?{color:u,transition:"color 0.3s ease"}:void 0,children:[(0,ke.jsxs)("g",{className:`${mn.iconState} ${s?mn.hiddenScaled:mn.visibleScaled}`,children:[(0,ke.jsx)("path",{d:"M4.75 11.25C4.75 10.4216 5.42157 9.75 6.25 9.75H12.75C13.5784 9.75 14.25 10.4216 14.25 11.25V17.75C14.25 18.5784 13.5784 19.25 12.75 19.25H6.25C5.42157 19.25 4.75 18.5784 4.75 17.75V11.25Z",stroke:"currentColor",strokeWidth:"1.5"}),(0,ke.jsx)("path",{d:"M17.25 14.25H17.75C18.5784 14.25 19.25 13.5784 19.25 12.75V6.25C19.25 5.42157 18.5784 4.75 17.75 4.75H11.25C10.4216 4.75 9.75 5.42157 9.75 6.25V6.75",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),(0,ke.jsxs)("g",{className:`${mn.iconState} ${s?mn.visibleScaled:mn.hiddenScaled}`,children:[(0,ke.jsx)("path",{d:"M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20Z",stroke:"var(--agentation-color-green)",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ke.jsx)("path",{d:"M15 10L11 14.25L9.25 12.25",stroke:"var(--agentation-color-green)",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]})]}),t6=({size:i=24,state:s="idle"})=>{let u=s==="idle",f=s==="sent",h=s==="failed",y=s==="sending";return(0,ke.jsxs)("svg",{width:i,height:i,viewBox:"0 0 24 24",fill:"none",children:[(0,ke.jsx)("g",{className:`${mn.iconStateFast} ${u?mn.visibleScaled:y?mn.sending:mn.hiddenScaled}`,children:(0,ke.jsx)("path",{d:"M9.875 14.125L12.3506 19.6951C12.7184 20.5227 13.9091 20.4741 14.2083 19.6193L18.8139 6.46032C19.0907 5.6695 18.3305 4.90933 17.5397 5.18611L4.38072 9.79174C3.52589 10.0909 3.47731 11.2816 4.30494 11.6494L9.875 14.125ZM9.875 14.125L13.375 10.625",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})}),(0,ke.jsxs)("g",{className:`${mn.iconStateFast} ${f?mn.visibleScaled:mn.hiddenScaled}`,children:[(0,ke.jsx)("path",{d:"M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20Z",stroke:"var(--agentation-color-green)",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ke.jsx)("path",{d:"M15 10L11 14.25L9.25 12.25",stroke:"var(--agentation-color-green)",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]}),(0,ke.jsxs)("g",{className:`${mn.iconStateFast} ${h?mn.visibleScaled:mn.hiddenScaled}`,children:[(0,ke.jsx)("path",{d:"M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20Z",stroke:"var(--agentation-color-red)",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ke.jsx)("path",{d:"M12 8V12",stroke:"var(--agentation-color-red)",strokeWidth:"1.5",strokeLinecap:"round"}),(0,ke.jsx)("circle",{cx:"12",cy:"15",r:"0.5",fill:"var(--agentation-color-red)",stroke:"var(--agentation-color-red)",strokeWidth:"1"})]})]})},n6=({size:i=24,isOpen:s=!0})=>(0,ke.jsxs)("svg",{width:i,height:i,viewBox:"0 0 24 24",fill:"none",children:[(0,ke.jsxs)("g",{className:`${mn.iconFade} ${s?mn.visible:mn.hidden}`,children:[(0,ke.jsx)("path",{d:"M3.91752 12.7539C3.65127 12.2996 3.65037 11.7515 3.9149 11.2962C4.9042 9.59346 7.72688 5.49994 12 5.49994C16.2731 5.49994 19.0958 9.59346 20.0851 11.2962C20.3496 11.7515 20.3487 12.2996 20.0825 12.7539C19.0908 14.4459 16.2694 18.4999 12 18.4999C7.73064 18.4999 4.90918 14.4459 3.91752 12.7539Z",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ke.jsx)("path",{d:"M12 14.8261C13.5608 14.8261 14.8261 13.5608 14.8261 12C14.8261 10.4392 13.5608 9.17392 12 9.17392C10.4392 9.17392 9.17391 10.4392 9.17391 12C9.17391 13.5608 10.4392 14.8261 12 14.8261Z",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]}),(0,ke.jsxs)("g",{className:`${mn.iconFade} ${s?mn.hidden:mn.visible}`,children:[(0,ke.jsx)("path",{d:"M18.6025 9.28503C18.9174 8.9701 19.4364 8.99481 19.7015 9.35271C20.1484 9.95606 20.4943 10.507 20.7342 10.9199C21.134 11.6086 21.1329 12.4454 20.7303 13.1328C20.2144 14.013 19.2151 15.5225 17.7723 16.8193C16.3293 18.1162 14.3852 19.2497 12.0008 19.25C11.4192 19.25 10.8638 19.1823 10.3355 19.0613C9.77966 18.934 9.63498 18.2525 10.0382 17.8493C10.2412 17.6463 10.5374 17.573 10.8188 17.6302C11.1993 17.7076 11.5935 17.75 12.0008 17.75C13.8848 17.7497 15.4867 16.8568 16.7693 15.7041C18.0522 14.5511 18.9606 13.1867 19.4363 12.375C19.5656 12.1543 19.5659 11.8943 19.4373 11.6729C19.2235 11.3049 18.921 10.8242 18.5364 10.3003C18.3085 9.98991 18.3302 9.5573 18.6025 9.28503ZM12.0008 4.75C12.5814 4.75006 13.1358 4.81803 13.6632 4.93953C14.2182 5.06741 14.362 5.74812 13.9593 6.15091C13.7558 6.35435 13.4589 6.42748 13.1771 6.36984C12.7983 6.29239 12.4061 6.25006 12.0008 6.25C10.1167 6.25 8.51415 7.15145 7.23028 8.31543C5.94678 9.47919 5.03918 10.8555 4.56426 11.6729C4.43551 11.8945 4.43582 12.1542 4.56524 12.375C4.77587 12.7343 5.07189 13.2012 5.44718 13.7105C5.67623 14.0213 5.65493 14.4552 5.38193 14.7282C5.0671 15.0431 4.54833 15.0189 4.28292 14.6614C3.84652 14.0736 3.50813 13.5369 3.27129 13.1328C2.86831 12.4451 2.86717 11.6088 3.26739 10.9199C3.78185 10.0345 4.77959 8.51239 6.22247 7.2041C7.66547 5.89584 9.61202 4.75 12.0008 4.75Z",fill:"currentColor"}),(0,ke.jsx)("path",{d:"M5 19L19 5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})]}),o6=({size:i=24,isPaused:s=!1})=>(0,ke.jsxs)("svg",{width:i,height:i,viewBox:"0 0 24 24",fill:"none",children:[(0,ke.jsxs)("g",{className:`${mn.iconFadeFast} ${s?mn.hidden:mn.visible}`,children:[(0,ke.jsx)("path",{d:"M8 6L8 18",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),(0,ke.jsx)("path",{d:"M16 18L16 6",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),(0,ke.jsx)("path",{className:`${mn.iconFadeFast} ${s?mn.visible:mn.hidden}`,d:"M17.75 10.701C18.75 11.2783 18.75 12.7217 17.75 13.299L8.75 18.4952C7.75 19.0725 6.5 18.3509 6.5 17.1962L6.5 6.80384C6.5 5.64914 7.75 4.92746 8.75 5.50481L17.75 10.701Z",stroke:"currentColor",strokeWidth:"1.5"})]}),l6=({size:i=16})=>(0,ke.jsxs)("svg",{width:i,height:i,viewBox:"0 0 24 24",fill:"none",children:[(0,ke.jsx)("path",{d:"M10.6504 5.81117C10.9939 4.39628 13.0061 4.39628 13.3496 5.81117C13.5715 6.72517 14.6187 7.15891 15.4219 6.66952C16.6652 5.91193 18.0881 7.33479 17.3305 8.57815C16.8411 9.38134 17.2748 10.4285 18.1888 10.6504C19.6037 10.9939 19.6037 13.0061 18.1888 13.3496C17.2748 13.5715 16.8411 14.6187 17.3305 15.4219C18.0881 16.6652 16.6652 18.0881 15.4219 17.3305C14.6187 16.8411 13.5715 17.2748 13.3496 18.1888C13.0061 19.6037 10.9939 19.6037 10.6504 18.1888C10.4285 17.2748 9.38135 16.8411 8.57815 17.3305C7.33479 18.0881 5.91193 16.6652 6.66952 15.4219C7.15891 14.6187 6.72517 13.5715 5.81117 13.3496C4.39628 13.0061 4.39628 10.9939 5.81117 10.6504C6.72517 10.4285 7.15891 9.38134 6.66952 8.57815C5.91193 7.33479 7.33479 5.91192 8.57815 6.66952C9.38135 7.15891 10.4285 6.72517 10.6504 5.81117Z",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ke.jsx)("circle",{cx:"12",cy:"12",r:"2.5",stroke:"currentColor",strokeWidth:"1.5"})]}),a6=({size:i=16})=>(0,ke.jsx)("svg",{width:i,height:i,viewBox:"0 0 24 24",fill:"none",children:(0,ke.jsx)("path",{d:"M13.5 4C14.7426 4 15.75 5.00736 15.75 6.25V7H18.5C18.9142 7 19.25 7.33579 19.25 7.75C19.25 8.16421 18.9142 8.5 18.5 8.5H17.9678L17.6328 16.2217C17.61 16.7475 17.5912 17.1861 17.5469 17.543C17.5015 17.9087 17.4225 18.2506 17.2461 18.5723C16.9747 19.0671 16.5579 19.4671 16.0518 19.7168C15.7227 19.8791 15.3772 19.9422 15.0098 19.9717C14.6514 20.0004 14.2126 20 13.6865 20H10.3135C9.78735 20 9.34856 20.0004 8.99023 19.9717C8.62278 19.9422 8.27729 19.8791 7.94824 19.7168C7.44205 19.4671 7.02532 19.0671 6.75391 18.5723C6.57751 18.2506 6.49853 17.9087 6.45312 17.543C6.40883 17.1861 6.39005 16.7475 6.36719 16.2217L6.03223 8.5H5.5C5.08579 8.5 4.75 8.16421 4.75 7.75C4.75 7.33579 5.08579 7 5.5 7H8.25V6.25C8.25 5.00736 9.25736 4 10.5 4H13.5ZM7.86621 16.1562C7.89013 16.7063 7.90624 17.0751 7.94141 17.3584C7.97545 17.6326 8.02151 17.7644 8.06934 17.8516C8.19271 18.0763 8.38239 18.2577 8.6123 18.3711C8.70153 18.4151 8.83504 18.4545 9.11035 18.4766C9.39482 18.4994 9.76335 18.5 10.3135 18.5H13.6865C14.2367 18.5 14.6052 18.4994 14.8896 18.4766C15.165 18.4545 15.2985 18.4151 15.3877 18.3711C15.6176 18.2577 15.8073 18.0763 15.9307 17.8516C15.9785 17.7644 16.0245 17.6326 16.0586 17.3584C16.0938 17.0751 16.1099 16.7063 16.1338 16.1562L16.4668 8.5H7.5332L7.86621 16.1562ZM9.97656 10.75C10.3906 10.7371 10.7371 11.0626 10.75 11.4766L10.875 15.4766C10.8879 15.8906 10.5624 16.2371 10.1484 16.25C9.73443 16.2629 9.38794 15.9374 9.375 15.5234L9.25 11.5234C9.23706 11.1094 9.56255 10.7629 9.97656 10.75ZM14.0244 10.75C14.4384 10.7635 14.7635 11.1105 14.75 11.5244L14.6201 15.5244C14.6066 15.9384 14.2596 16.2634 13.8457 16.25C13.4317 16.2365 13.1067 15.8896 13.1201 15.4756L13.251 11.4756C13.2645 11.0617 13.6105 10.7366 14.0244 10.75ZM10.5 5.5C10.0858 5.5 9.75 5.83579 9.75 6.25V7H14.25V6.25C14.25 5.83579 13.9142 5.5 13.5 5.5H10.5Z",fill:"currentColor"})}),rv=({size:i=16})=>(0,ke.jsxs)("svg",{width:i,height:i,viewBox:"0 0 24 24",fill:"none",children:[(0,ke.jsxs)("g",{clipPath:"url(#clip0_2_53)",children:[(0,ke.jsx)("path",{d:"M16.25 16.25L7.75 7.75",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ke.jsx)("path",{d:"M7.75 16.25L16.25 7.75",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]}),(0,ke.jsx)("defs",{children:(0,ke.jsx)("clipPath",{id:"clip0_2_53",children:(0,ke.jsx)("rect",{width:"24",height:"24",fill:"white"})})})]}),i6=({size:i=24})=>(0,ke.jsx)("svg",{width:i,height:i,viewBox:"0 0 24 24",fill:"none",children:(0,ke.jsx)("path",{d:"M16.7198 6.21973C17.0127 5.92683 17.4874 5.92683 17.7803 6.21973C18.0732 6.51262 18.0732 6.9874 17.7803 7.28027L13.0606 12L17.7803 16.7197C18.0732 17.0126 18.0732 17.4874 17.7803 17.7803C17.4875 18.0731 17.0127 18.0731 16.7198 17.7803L12.0001 13.0605L7.28033 17.7803C6.98746 18.0731 6.51268 18.0731 6.21979 17.7803C5.92689 17.4874 5.92689 17.0126 6.21979 16.7197L10.9395 12L6.21979 7.28027C5.92689 6.98738 5.92689 6.51262 6.21979 6.21973C6.51268 5.92683 6.98744 5.92683 7.28033 6.21973L12.0001 10.9395L16.7198 6.21973Z",fill:"currentColor"})}),r6=({size:i=16})=>(0,ke.jsxs)("svg",{width:i,height:i,viewBox:"0 0 20 20",fill:"none",children:[(0,ke.jsx)("path",{d:"M9.99999 12.7082C11.4958 12.7082 12.7083 11.4956 12.7083 9.99984C12.7083 8.50407 11.4958 7.2915 9.99999 7.2915C8.50422 7.2915 7.29166 8.50407 7.29166 9.99984C7.29166 11.4956 8.50422 12.7082 9.99999 12.7082Z",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ke.jsx)("path",{d:"M10 3.9585V5.05698",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ke.jsx)("path",{d:"M10 14.9429V16.0414",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ke.jsx)("path",{d:"M5.7269 5.72656L6.50682 6.50649",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ke.jsx)("path",{d:"M13.4932 13.4932L14.2731 14.2731",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ke.jsx)("path",{d:"M3.95834 10H5.05683",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ke.jsx)("path",{d:"M14.9432 10H16.0417",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ke.jsx)("path",{d:"M5.7269 14.2731L6.50682 13.4932",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),(0,ke.jsx)("path",{d:"M13.4932 6.50649L14.2731 5.72656",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"})]}),s6=({size:i=16})=>(0,ke.jsx)("svg",{width:i,height:i,viewBox:"0 0 20 20",fill:"none",children:(0,ke.jsx)("path",{d:"M15.5 10.4955C15.4037 11.5379 15.0124 12.5314 14.3721 13.3596C13.7317 14.1878 12.8688 14.8165 11.8841 15.1722C10.8995 15.5278 9.83397 15.5957 8.81217 15.3679C7.79038 15.1401 6.8546 14.6259 6.11434 13.8857C5.37408 13.1454 4.85995 12.2096 4.63211 11.1878C4.40427 10.166 4.47215 9.10048 4.82781 8.11585C5.18346 7.13123 5.81218 6.26825 6.64039 5.62791C7.4686 4.98756 8.46206 4.59634 9.5045 4.5C8.89418 5.32569 8.60049 6.34302 8.67685 7.36695C8.75321 8.39087 9.19454 9.35339 9.92058 10.0794C10.6466 10.8055 11.6091 11.2468 12.6331 11.3231C13.657 11.3995 14.6743 11.1058 15.5 10.4955Z",stroke:"currentColor",strokeWidth:"1.13793",strokeLinecap:"round",strokeLinejoin:"round"})}),c6=({size:i=16})=>(0,ke.jsx)("svg",{width:i,height:i,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,ke.jsx)("path",{d:"M11.3799 6.9572L9.05645 4.63375M11.3799 6.9572L6.74949 11.5699C6.61925 11.6996 6.45577 11.791 6.277 11.8339L4.29549 12.3092C3.93194 12.3964 3.60478 12.0683 3.69297 11.705L4.16585 9.75693C4.20893 9.57947 4.29978 9.4172 4.42854 9.28771L9.05645 4.63375M11.3799 6.9572L12.3455 5.98759C12.9839 5.34655 12.9839 4.31002 12.3455 3.66897C11.7033 3.02415 10.6594 3.02415 10.0172 3.66897L9.06126 4.62892L9.05645 4.63375",stroke:"currentColor",strokeWidth:"0.9",strokeLinecap:"round",strokeLinejoin:"round"})}),u6=({size:i=24})=>(0,ke.jsx)("svg",{width:i,height:i,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,ke.jsx)("path",{d:"M13.5 4C14.7426 4 15.75 5.00736 15.75 6.25V7H18.5C18.9142 7 19.25 7.33579 19.25 7.75C19.25 8.16421 18.9142 8.5 18.5 8.5H17.9678L17.6328 16.2217C17.61 16.7475 17.5912 17.1861 17.5469 17.543C17.5015 17.9087 17.4225 18.2506 17.2461 18.5723C16.9747 19.0671 16.5579 19.4671 16.0518 19.7168C15.7227 19.8791 15.3772 19.9422 15.0098 19.9717C14.6514 20.0004 14.2126 20 13.6865 20H10.3135C9.78735 20 9.34856 20.0004 8.99023 19.9717C8.62278 19.9422 8.27729 19.8791 7.94824 19.7168C7.44205 19.4671 7.02532 19.0671 6.75391 18.5723C6.57751 18.2506 6.49853 17.9087 6.45312 17.543C6.40883 17.1861 6.39005 16.7475 6.36719 16.2217L6.03223 8.5H5.5C5.08579 8.5 4.75 8.16421 4.75 7.75C4.75 7.33579 5.08579 7 5.5 7H8.25V6.25C8.25 5.00736 9.25736 4 10.5 4H13.5ZM7.86621 16.1562C7.89013 16.7063 7.90624 17.0751 7.94141 17.3584C7.97545 17.6326 8.02151 17.7644 8.06934 17.8516C8.19271 18.0763 8.38239 18.2577 8.6123 18.3711C8.70153 18.4151 8.83504 18.4545 9.11035 18.4766C9.39482 18.4994 9.76335 18.5 10.3135 18.5H13.6865C14.2367 18.5 14.6052 18.4994 14.8896 18.4766C15.165 18.4545 15.2985 18.4151 15.3877 18.3711C15.6176 18.2577 15.8073 18.0763 15.9307 17.8516C15.9785 17.7644 16.0245 17.6326 16.0586 17.3584C16.0938 17.0751 16.1099 16.7063 16.1338 16.1562L16.4668 8.5H7.5332L7.86621 16.1562ZM9.97656 10.75C10.3906 10.7371 10.7371 11.0626 10.75 11.4766L10.875 15.4766C10.8879 15.8906 10.5624 16.2371 10.1484 16.25C9.73443 16.2629 9.38794 15.9374 9.375 15.5234L9.25 11.5234C9.23706 11.1094 9.56255 10.7629 9.97656 10.75ZM14.0244 10.75C14.4383 10.7635 14.7635 11.1105 14.75 11.5244L14.6201 15.5244C14.6066 15.9384 14.2596 16.2634 13.8457 16.25C13.4317 16.2365 13.1067 15.8896 13.1201 15.4756L13.251 11.4756C13.2645 11.0617 13.6105 10.7366 14.0244 10.75ZM10.5 5.5C10.0858 5.5 9.75 5.83579 9.75 6.25V7H14.25V6.25C14.25 5.83579 13.9142 5.5 13.5 5.5H10.5Z",fill:"currentColor"})}),d6=({size:i=16})=>(0,ke.jsx)("svg",{width:i,height:i,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,ke.jsx)("path",{d:"M8.5 3.5L4 8L8.5 12.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})}),f6=({size:i=24})=>(0,ke.jsxs)("svg",{width:i,height:i,viewBox:"0 0 24 24",fill:"none",children:[(0,ke.jsx)("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",stroke:"currentColor",strokeWidth:"1.5"}),(0,ke.jsx)("line",{x1:"3",y1:"9",x2:"21",y2:"9",stroke:"currentColor",strokeWidth:"1.5"}),(0,ke.jsx)("line",{x1:"9",y1:"9",x2:"9",y2:"21",stroke:"currentColor",strokeWidth:"1.5"})]}),sv=["data-feedback-toolbar","data-annotation-popup","data-annotation-marker"],fp=sv.flatMap(i=>[`:not([${i}])`,`:not([${i}] *)`]).join(""),Cp="feedback-freeze-styles",hp="__agentation_freeze";Xt=h6();typeof window<"u"&&!Xt.installed&&(Xt.origSetTimeout=window.setTimeout.bind(window),Xt.origSetInterval=window.setInterval.bind(window),Xt.origRAF=window.requestAnimationFrame.bind(window),window.setTimeout=(i,s,...u)=>typeof i=="string"?Xt.origSetTimeout(i,s):Xt.origSetTimeout((...f)=>{Xt.frozen?Xt.frozenTimeoutQueue.push(()=>i(...f)):i(...f)},s,...u),window.setInterval=(i,s,...u)=>typeof i=="string"?Xt.origSetInterval(i,s):Xt.origSetInterval((...f)=>{Xt.frozen||i(...f)},s,...u),window.requestAnimationFrame=i=>Xt.origRAF(s=>{Xt.frozen?Xt.frozenRAFQueue.push(i):i(s)}),Xt.installed=!0);rt=Xt.origSetTimeout,_6=Xt.origSetInterval,Tc=Xt.origRAF;Fh=(0,jn.forwardRef)(function({element:s,timestamp:u,selectedText:f,placeholder:h="What should change?",initialValue:y="",submitLabel:k="Add",onSubmit:E,onCancel:A,onDelete:ie,style:B,accentColor:$="#3c82f7",isExiting:v=!1,lightMode:Z=!1,computedStyles:X},re){let[j,J]=(0,jn.useState)(y),[De,Ie]=(0,jn.useState)(!1),[Ge,$t]=(0,jn.useState)("initial"),[jt,Me]=(0,jn.useState)(!1),[Xe,wt]=(0,jn.useState)(!1),ue=(0,jn.useRef)(null),Ve=(0,jn.useRef)(null),Ye=(0,jn.useRef)(null),Be=(0,jn.useRef)(null);(0,jn.useEffect)(()=>{v&&Ge!=="exit"&&$t("exit")},[v,Ge]),(0,jn.useEffect)(()=>{rt(()=>{$t("enter")},0);let Ee=rt(()=>{$t("entered")},200),vt=rt(()=>{let Q=ue.current;Q&&(_p(Q),Q.selectionStart=Q.selectionEnd=Q.value.length,Q.scrollTop=Q.scrollHeight)},50);return()=>{clearTimeout(Ee),clearTimeout(vt),Ye.current&&clearTimeout(Ye.current),Be.current&&clearTimeout(Be.current)}},[]);let Fe=(0,jn.useCallback)(()=>{Be.current&&clearTimeout(Be.current),Ie(!0),Be.current=rt(()=>{Ie(!1),_p(ue.current)},250)},[]);(0,jn.useImperativeHandle)(re,()=>({shake:Fe}),[Fe]);let ne=(0,jn.useCallback)(()=>{$t("exit"),Ye.current=rt(()=>{A()},150)},[A]),me=(0,jn.useCallback)(()=>{j.trim()&&E(j.trim())},[j,E]),ye=(0,jn.useCallback)(Ee=>{Ee.stopPropagation(),!Ee.nativeEvent.isComposing&&(Ee.key==="Enter"&&!Ee.shiftKey&&(Ee.preventDefault(),me()),Ee.key==="Escape"&&ne())},[me,ne]),oe=[vn.popup,Z?vn.light:"",Ge==="enter"?vn.enter:"",Ge==="entered"?vn.entered:"",Ge==="exit"?vn.exit:"",De?vn.shake:""].filter(Boolean).join(" ");return(0,Ln.jsxs)("div",{ref:Ve,className:oe,"data-annotation-popup":!0,style:B,onClick:Ee=>Ee.stopPropagation(),children:[(0,Ln.jsxs)("div",{className:vn.header,children:[X&&Object.keys(X).length>0?(0,Ln.jsxs)("button",{className:vn.headerToggle,onClick:()=>{let Ee=Xe;wt(!Xe),Ee&&rt(()=>_p(ue.current),0)},type:"button",children:[(0,Ln.jsx)("svg",{className:`${vn.chevron} ${Xe?vn.expanded:""}`,width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,Ln.jsx)("path",{d:"M5.5 10.25L9 7.25L5.75 4",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})}),(0,Ln.jsx)("span",{className:vn.element,children:s})]}):(0,Ln.jsx)("span",{className:vn.element,children:s}),u&&(0,Ln.jsx)("span",{className:vn.timestamp,children:u})]}),X&&Object.keys(X).length>0&&(0,Ln.jsx)("div",{className:`${vn.stylesWrapper} ${Xe?vn.expanded:""}`,children:(0,Ln.jsx)("div",{className:vn.stylesInner,children:(0,Ln.jsx)("div",{className:vn.stylesBlock,children:Object.entries(X).map(([Ee,vt])=>(0,Ln.jsxs)("div",{className:vn.styleLine,children:[(0,Ln.jsx)("span",{className:vn.styleProperty,children:Ee.replace(/([A-Z])/g,"-$1").toLowerCase()}),": ",(0,Ln.jsx)("span",{className:vn.styleValue,children:vt}),";"]},Ee))})})}),f&&(0,Ln.jsxs)("div",{className:vn.quote,children:["\u201C",f.slice(0,80),f.length>80?"...":"","\u201D"]}),(0,Ln.jsx)("textarea",{ref:ue,className:vn.textarea,style:{borderColor:jt?$:void 0},placeholder:h,value:j,onChange:Ee=>J(Ee.target.value),onFocus:()=>Me(!0),onBlur:()=>Me(!1),rows:2,onKeyDown:ye}),(0,Ln.jsxs)("div",{className:vn.actions,children:[ie&&(0,Ln.jsx)("div",{className:vn.deleteWrapper,children:(0,Ln.jsx)("button",{className:vn.deleteButton,onClick:ie,type:"button",children:(0,Ln.jsx)(u6,{size:22})})}),(0,Ln.jsx)("button",{className:vn.cancel,onClick:ne,children:"Cancel"}),(0,Ln.jsx)("button",{className:vn.submit,style:{backgroundColor:$,opacity:j.trim()?1:.4},onClick:me,disabled:!j.trim(),children:k})]})]})}),g6=({content:i,children:s,...u})=>{let[f,h]=(0,qa.useState)(!1),[y,k]=(0,qa.useState)(!1),[E,A]=(0,qa.useState)({top:0,right:0}),ie=(0,qa.useRef)(null),B=(0,qa.useRef)(null),$=(0,qa.useRef)(null),v=()=>{if(ie.current){let re=ie.current.getBoundingClientRect();A({top:re.top+re.height/2,right:window.innerWidth-re.left+8})}},Z=()=>{k(!0),$.current&&(clearTimeout($.current),$.current=null),v(),B.current=rt(()=>{h(!0)},500)},X=()=>{B.current&&(clearTimeout(B.current),B.current=null),h(!1),$.current=rt(()=>{k(!1)},150)};return(0,qa.useEffect)(()=>()=>{B.current&&clearTimeout(B.current),$.current&&clearTimeout($.current)},[]),(0,cs.jsxs)(cs.Fragment,{children:[(0,cs.jsx)("span",{ref:ie,onMouseEnter:Z,onMouseLeave:X,...u,children:s}),y&&(0,cv.createPortal)((0,cs.jsx)("div",{"data-feedback-toolbar":!0,style:{position:"fixed",top:E.top,right:E.right,transform:"translateY(-50%)",padding:"6px 10px",background:"#383838",color:"rgba(255, 255, 255, 0.7)",fontSize:"11px",fontWeight:400,lineHeight:"14px",borderRadius:"10px",width:"180px",textAlign:"left",zIndex:100020,pointerEvents:"none",boxShadow:"0px 1px 8px rgba(0, 0, 0, 0.28)",opacity:f?1:0,transition:"opacity 0.15s ease"},children:i}),document.body)]})},y6=`.styles-module__tooltip___mcXL2 {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: help;
}

.styles-module__tooltipIcon___Nq2nD {
  transform: translateY(0.5px);
  color: #fff;
  opacity: 0.2;
  transition: opacity 0.15s ease;
  will-change: transform;
}
.styles-module__tooltip___mcXL2:hover .styles-module__tooltipIcon___Nq2nD {
  opacity: 0.5;
}
[data-agentation-theme=light] .styles-module__tooltipIcon___Nq2nD {
  color: #000;
}`,b6={tooltip:"styles-module__tooltip___mcXL2",tooltipIcon:"styles-module__tooltipIcon___Nq2nD"};if(typeof document<"u"){let i=document.getElementById("feedback-tool-styles-help-tooltip-styles");i||(i=document.createElement("style"),i.id="feedback-tool-styles-help-tooltip-styles",document.head.appendChild(i)),i.textContent=y6}$b=b6,ss=({content:i})=>(0,kp.jsx)(g6,{className:$b.tooltip,content:i,children:(0,kp.jsx)(K4,{className:$b.tooltipIcon})}),He={navigation:{width:800,height:56},hero:{width:800,height:320},header:{width:800,height:80},section:{width:800,height:400},sidebar:{width:240,height:400},footer:{width:800,height:160},modal:{width:480,height:300},card:{width:280,height:240},text:{width:400,height:120},image:{width:320,height:200},video:{width:480,height:270},table:{width:560,height:220},grid:{width:600,height:300},list:{width:300,height:180},chart:{width:400,height:240},button:{width:140,height:40},input:{width:280,height:56},form:{width:360,height:320},tabs:{width:480,height:240},dropdown:{width:200,height:200},toggle:{width:44,height:24},search:{width:320,height:44},avatar:{width:48,height:48},badge:{width:80,height:28},breadcrumb:{width:300,height:24},pagination:{width:300,height:36},progress:{width:240,height:8},divider:{width:600,height:1},accordion:{width:400,height:200},carousel:{width:600,height:300},toast:{width:320,height:64},tooltip:{width:180,height:40},pricing:{width:300,height:360},testimonial:{width:360,height:200},cta:{width:600,height:160},alert:{width:400,height:56},banner:{width:800,height:48},stat:{width:200,height:120},stepper:{width:480,height:48},tag:{width:72,height:28},rating:{width:160,height:28},map:{width:480,height:300},timeline:{width:360,height:320},fileUpload:{width:360,height:180},codeBlock:{width:480,height:200},calendar:{width:300,height:300},notification:{width:360,height:72},productCard:{width:280,height:360},profile:{width:280,height:200},drawer:{width:320,height:400},popover:{width:240,height:160},logo:{width:120,height:40},faq:{width:560,height:320},gallery:{width:560,height:360},checkbox:{width:20,height:20},radio:{width:20,height:20},slider:{width:240,height:32},datePicker:{width:300,height:320},skeleton:{width:320,height:120},chip:{width:96,height:32},icon:{width:24,height:24},spinner:{width:32,height:32},feature:{width:360,height:200},team:{width:560,height:280},login:{width:360,height:360},contact:{width:400,height:320}},uv=[{section:"Layout",items:[{type:"navigation",label:"Navigation",...He.navigation},{type:"header",label:"Header",...He.header},{type:"hero",label:"Hero",...He.hero},{type:"section",label:"Section",...He.section},{type:"sidebar",label:"Sidebar",...He.sidebar},{type:"footer",label:"Footer",...He.footer},{type:"modal",label:"Modal",...He.modal},{type:"banner",label:"Banner",...He.banner},{type:"drawer",label:"Drawer",...He.drawer},{type:"popover",label:"Popover",...He.popover},{type:"divider",label:"Divider",...He.divider}]},{section:"Content",items:[{type:"card",label:"Card",...He.card},{type:"text",label:"Text",...He.text},{type:"image",label:"Image",...He.image},{type:"video",label:"Video",...He.video},{type:"table",label:"Table",...He.table},{type:"grid",label:"Grid",...He.grid},{type:"list",label:"List",...He.list},{type:"chart",label:"Chart",...He.chart},{type:"codeBlock",label:"Code Block",...He.codeBlock},{type:"map",label:"Map",...He.map},{type:"timeline",label:"Timeline",...He.timeline},{type:"calendar",label:"Calendar",...He.calendar},{type:"accordion",label:"Accordion",...He.accordion},{type:"carousel",label:"Carousel",...He.carousel},{type:"logo",label:"Logo",...He.logo},{type:"faq",label:"FAQ",...He.faq},{type:"gallery",label:"Gallery",...He.gallery}]},{section:"Controls",items:[{type:"button",label:"Button",...He.button},{type:"input",label:"Input",...He.input},{type:"search",label:"Search",...He.search},{type:"form",label:"Form",...He.form},{type:"tabs",label:"Tabs",...He.tabs},{type:"dropdown",label:"Dropdown",...He.dropdown},{type:"toggle",label:"Toggle",...He.toggle},{type:"stepper",label:"Stepper",...He.stepper},{type:"rating",label:"Rating",...He.rating},{type:"fileUpload",label:"File Upload",...He.fileUpload},{type:"checkbox",label:"Checkbox",...He.checkbox},{type:"radio",label:"Radio",...He.radio},{type:"slider",label:"Slider",...He.slider},{type:"datePicker",label:"Date Picker",...He.datePicker}]},{section:"Elements",items:[{type:"avatar",label:"Avatar",...He.avatar},{type:"badge",label:"Badge",...He.badge},{type:"tag",label:"Tag",...He.tag},{type:"breadcrumb",label:"Breadcrumb",...He.breadcrumb},{type:"pagination",label:"Pagination",...He.pagination},{type:"progress",label:"Progress",...He.progress},{type:"alert",label:"Alert",...He.alert},{type:"toast",label:"Toast",...He.toast},{type:"notification",label:"Notification",...He.notification},{type:"tooltip",label:"Tooltip",...He.tooltip},{type:"stat",label:"Stat",...He.stat},{type:"skeleton",label:"Skeleton",...He.skeleton},{type:"chip",label:"Chip",...He.chip},{type:"icon",label:"Icon",...He.icon},{type:"spinner",label:"Spinner",...He.spinner}]},{section:"Blocks",items:[{type:"pricing",label:"Pricing",...He.pricing},{type:"testimonial",label:"Testimonial",...He.testimonial},{type:"cta",label:"CTA",...He.cta},{type:"productCard",label:"Product Card",...He.productCard},{type:"profile",label:"Profile",...He.profile},{type:"feature",label:"Feature",...He.feature},{type:"team",label:"Team",...He.team},{type:"login",label:"Login",...He.login},{type:"contact",label:"Contact",...He.contact}]}],_a={};for(let i of uv)for(let s of i.items)_a[s.type]=s;O3={navigation:v6,hero:x6,sidebar:w6,footer:S6,modal:C6,card:k6,text:E6,image:M6,table:T6,list:R6,button:D6,input:A6,form:O6,tabs:z6,avatar:L6,badge:N6,header:$6,section:B6,grid:H6,dropdown:U6,toggle:j6,search:I6,toast:Y6,progress:X6,chart:q6,video:V6,tooltip:Q6,breadcrumb:W6,pagination:G6,divider:Z6,accordion:P6,carousel:F6,pricing:J6,testimonial:K6,cta:e3,alert:t3,banner:n3,stat:o3,stepper:l3,tag:a3,rating:i3,map:r3,timeline:s3,fileUpload:c3,codeBlock:u3,calendar:d3,notification:f3,productCard:h3,profile:_3,drawer:m3,popover:p3,logo:g3,faq:y3,gallery:b3,checkbox:v3,radio:x3,slider:w3,datePicker:S3,skeleton:C3,chip:k3,icon:E3,spinner:M3,feature:T3,team:R3,login:D3,contact:A3};L3=`svg[fill=none] {
  fill: none !important;
}

.styles-module__overlayExiting___iEmYr {
  opacity: 0 !important;
  transition: opacity 0.25s ease !important;
  pointer-events: none !important;
}

.styles-module__overlay___aWh-q {
  position: fixed;
  inset: 0;
  z-index: 99995;
  pointer-events: auto;
  cursor: default;
  animation: styles-module__overlayFadeIn___aECVy 0.15s ease;
  --agd-stroke: rgba(59, 130, 246, 0.35);
  --agd-fill: rgba(59, 130, 246, 0.06);
  --agd-bar: rgba(59, 130, 246, 0.18);
  --agd-bar-strong: rgba(59, 130, 246, 0.28);
  --agd-text-3: rgba(255, 255, 255, 0.6);
  --agd-surface: #fff;
}
.styles-module__overlay___aWh-q.styles-module__light___ORIft {
  --agd-surface: #fff;
}
.styles-module__overlay___aWh-q:not(.styles-module__light___ORIft) {
  --agd-surface: #141414;
}
.styles-module__overlay___aWh-q.styles-module__wireframe___itvQU {
  --agd-stroke: rgba(249, 115, 22, 0.35);
  --agd-fill: rgba(249, 115, 22, 0.06);
  --agd-bar: rgba(249, 115, 22, 0.18);
  --agd-bar-strong: rgba(249, 115, 22, 0.28);
}
.styles-module__overlay___aWh-q.styles-module__placing___45yD8 {
  cursor: crosshair;
}
.styles-module__overlay___aWh-q.styles-module__passthrough___xaFeE {
  pointer-events: none;
}

.styles-module__blankCanvas___t2Eue {
  position: fixed;
  inset: 0;
  z-index: 99994;
  background: #fff;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
}
.styles-module__blankCanvas___t2Eue.styles-module__visible___OKKqX {
  opacity: var(--canvas-opacity, 1);
  pointer-events: auto;
}
.styles-module__blankCanvas___t2Eue::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.08) 1px, transparent 1px);
  background-size: 24px 24px;
  background-position: 12px 12px;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.styles-module__blankCanvas___t2Eue.styles-module__gridActive___OZ-cf::after {
  opacity: 1;
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.22) 1px, transparent 1px);
}

.styles-module__paletteHeader___-Q5gQ {
  padding: 0 1rem 0.375rem;
}

.styles-module__paletteHeaderTitle___oHqZC {
  font-size: 0.8125rem;
  font-weight: 500;
  color: #fff;
  letter-spacing: -0.0094em;
}
.styles-module__light___ORIft .styles-module__paletteHeaderTitle___oHqZC {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__paletteHeaderDesc___6i74T {
  font-size: 0.6875rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 2px;
  line-height: 14px;
}
.styles-module__light___ORIft .styles-module__paletteHeaderDesc___6i74T {
  color: rgba(0, 0, 0, 0.45);
}
.styles-module__paletteHeaderDesc___6i74T a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: underline dotted;
  text-decoration-color: rgba(255, 255, 255, 0.2);
  text-underline-offset: 2px;
  transition: color 0.15s ease;
}
.styles-module__paletteHeaderDesc___6i74T a:hover {
  color: #fff;
}
.styles-module__light___ORIft .styles-module__paletteHeaderDesc___6i74T a {
  color: rgba(0, 0, 0, 0.6);
  text-decoration-color: rgba(0, 0, 0, 0.2);
}
.styles-module__light___ORIft .styles-module__paletteHeaderDesc___6i74T a:hover {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__wireframePurposeWrap___To-tS {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 0.2s ease, opacity 0.15s ease;
  opacity: 1;
}
.styles-module__wireframePurposeWrap___To-tS.styles-module__collapsed___Ms9vS {
  grid-template-rows: 0fr;
  opacity: 0;
}

.styles-module__wireframePurposeInner___Lrahs {
  overflow: hidden;
}

.styles-module__wireframePurposeInput___7EtBN {
  display: block;
  width: calc(100% - 2rem);
  margin: 0.25rem 1rem 0.375rem;
  padding: 0.375rem 0.5rem;
  font-size: 0.8125rem;
  font-family: inherit;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.375rem;
  resize: none;
  outline: none;
  transition: border-color 0.15s ease;
  letter-spacing: -0.0094em;
}
.styles-module__wireframePurposeInput___7EtBN::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
.styles-module__wireframePurposeInput___7EtBN:focus {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.05);
}
.styles-module__light___ORIft .styles-module__wireframePurposeInput___7EtBN {
  color: rgba(0, 0, 0, 0.7);
  background: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.1);
}
.styles-module__light___ORIft .styles-module__wireframePurposeInput___7EtBN::placeholder {
  color: rgba(0, 0, 0, 0.3);
}
.styles-module__light___ORIft .styles-module__wireframePurposeInput___7EtBN:focus {
  border-color: rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.05);
}

.styles-module__canvasToggle___-QqSy {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  margin: 0.25rem 1rem 0.25rem;
  padding: 0.375rem 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  background: transparent;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.styles-module__canvasToggle___-QqSy:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.15);
}
.styles-module__canvasToggle___-QqSy.styles-module__active___hosp7 {
  background: #f97316;
  border-color: transparent;
  border-style: solid;
  box-shadow: none;
}
.styles-module__light___ORIft .styles-module__canvasToggle___-QqSy {
  border-color: rgba(0, 0, 0, 0.08);
}
.styles-module__light___ORIft .styles-module__canvasToggle___-QqSy:hover {
  background: rgba(0, 0, 0, 0.02);
  border-color: rgba(0, 0, 0, 0.12);
}
.styles-module__light___ORIft .styles-module__canvasToggle___-QqSy.styles-module__active___hosp7 {
  background: #f97316;
  border-color: transparent;
  border-style: solid;
  box-shadow: none;
}

.styles-module__canvasToggleIcon___7pJ82 {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.35);
}
.styles-module__active___hosp7 .styles-module__canvasToggleIcon___7pJ82 {
  color: rgba(255, 255, 255, 0.85);
}
.styles-module__light___ORIft .styles-module__canvasToggleIcon___7pJ82 {
  color: rgba(0, 0, 0, 0.25);
}
.styles-module__light___ORIft .styles-module__active___hosp7 .styles-module__canvasToggleIcon___7pJ82 {
  color: rgba(255, 255, 255, 0.85);
}

.styles-module__canvasToggleLabel___OanpY {
  font-size: 0.8125rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: -0.0094em;
}
.styles-module__active___hosp7 .styles-module__canvasToggleLabel___OanpY {
  color: #fff;
}
.styles-module__light___ORIft .styles-module__canvasToggleLabel___OanpY {
  color: rgba(0, 0, 0, 0.5);
}
.styles-module__light___ORIft .styles-module__active___hosp7 .styles-module__canvasToggleLabel___OanpY {
  color: #fff;
}

.styles-module__canvasPurposeWrap___hj6zk {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 0.2s ease, opacity 0.15s ease;
  opacity: 1;
}
.styles-module__canvasPurposeWrap___hj6zk.styles-module__collapsed___Ms9vS {
  grid-template-rows: 0fr;
  opacity: 0;
}

.styles-module__canvasPurposeInner___VWiyu {
  overflow: hidden;
}

.styles-module__canvasPurposeToggle___byDH2 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  margin: 0.375rem 1rem 0.375rem 1.1875rem;
}
.styles-module__canvasPurposeToggle___byDH2 input[type=checkbox] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.styles-module__canvasPurposeCheck___xqd7l {
  position: relative;
  width: 14px;
  height: 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.25s ease, border-color 0.25s ease;
}
.styles-module__canvasPurposeCheck___xqd7l svg {
  color: #1a1a1a;
  opacity: 1;
  transition: opacity 0.15s ease;
}
.styles-module__canvasPurposeCheck___xqd7l.styles-module__checked___-1JGH {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgb(255, 255, 255);
}
.styles-module__light___ORIft .styles-module__canvasPurposeCheck___xqd7l {
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: #fff;
}
.styles-module__light___ORIft .styles-module__canvasPurposeCheck___xqd7l.styles-module__checked___-1JGH {
  border-color: #1a1a1a;
  background: #1a1a1a;
}
.styles-module__light___ORIft .styles-module__canvasPurposeCheck___xqd7l.styles-module__checked___-1JGH svg {
  color: #fff;
}

.styles-module__canvasPurposeLabel___Zu-tD {
  font-size: 0.8125rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: -0.0094em;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.styles-module__light___ORIft .styles-module__canvasPurposeLabel___Zu-tD {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__canvasPurposeHelp___jijwR {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: help;
}
.styles-module__canvasPurposeHelp___jijwR svg {
  color: rgba(255, 255, 255, 0.2);
  transform: translateY(2px);
  transition: color 0.15s ease;
}
.styles-module__canvasPurposeHelp___jijwR:hover svg {
  color: rgba(255, 255, 255, 0.5);
}
.styles-module__light___ORIft .styles-module__canvasPurposeHelp___jijwR svg {
  color: rgba(0, 0, 0, 0.2);
}
.styles-module__light___ORIft .styles-module__canvasPurposeHelp___jijwR:hover svg {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__placement___zcxv8 {
  position: absolute;
  border: 1.5px dashed rgba(59, 130, 246, 0.4);
  border-radius: 6px;
  background: rgba(59, 130, 246, 0.08);
  cursor: grab;
  transition: box-shadow 0.15s, border-color 0.15s, opacity 0.15s ease, transform 0.15s ease;
  user-select: none;
  pointer-events: auto;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  animation: styles-module__placementEnter___TdRhf 0.25s cubic-bezier(0.34, 1.2, 0.64, 1);
}
.styles-module__placement___zcxv8:active {
  cursor: grabbing;
}
.styles-module__placement___zcxv8:hover {
  border-color: rgba(59, 130, 246, 0.5);
  background: rgba(59, 130, 246, 0.1);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.12);
}
.styles-module__placement___zcxv8.styles-module__selected___6yrp6 {
  border-color: #3c82f7;
  border-style: solid;
  background: rgba(59, 130, 246, 0.1);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);
}
.styles-module__placement___zcxv8.styles-module__selected___6yrp6:hover {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);
}
.styles-module__wireframe___itvQU .styles-module__placement___zcxv8 {
  border-color: rgba(249, 115, 22, 0.4);
  background: rgba(249, 115, 22, 0.08);
}
.styles-module__wireframe___itvQU .styles-module__placement___zcxv8:hover {
  border-color: rgba(249, 115, 22, 0.5);
  background: rgba(249, 115, 22, 0.1);
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.12);
}
.styles-module__wireframe___itvQU .styles-module__placement___zcxv8.styles-module__selected___6yrp6 {
  border-color: #f97316;
  background: rgba(249, 115, 22, 0.1);
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.15), 0 2px 8px rgba(249, 115, 22, 0.15);
}
.styles-module__wireframe___itvQU .styles-module__placement___zcxv8.styles-module__selected___6yrp6:hover {
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.15), 0 2px 8px rgba(249, 115, 22, 0.15);
}
.styles-module__placement___zcxv8.styles-module__dragging___le6KZ {
  opacity: 0.85;
  z-index: 50;
}
.styles-module__placement___zcxv8.styles-module__exiting___YrM8F {
  opacity: 0;
  transform: scale(0.97);
  pointer-events: none;
  animation: none;
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.32, 0.72, 0, 1);
}

.styles-module__placementContent___f64A4 {
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.styles-module__placementLabel___0KvWl {
  position: absolute;
  top: -18px;
  left: 0;
  font-size: 10px;
  font-weight: 600;
  color: rgba(59, 130, 246, 0.7);
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.8), 0 0 8px rgba(255, 255, 255, 0.5);
}
.styles-module__selected___6yrp6 .styles-module__placementLabel___0KvWl {
  color: #3c82f7;
}
.styles-module__wireframe___itvQU .styles-module__placementLabel___0KvWl {
  color: rgba(249, 115, 22, 0.7);
}
.styles-module__wireframe___itvQU .styles-module__selected___6yrp6 .styles-module__placementLabel___0KvWl {
  color: #f97316;
}

.styles-module__placementAnnotation___78pTr {
  position: absolute;
  bottom: -18px;
  left: 0;
  right: 0;
  font-weight: 450;
  color: rgba(0, 0, 0, 0.5);
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.9), 0 0 8px rgba(255, 255, 255, 0.6);
  opacity: 0;
  transform: translateY(-2px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.styles-module__placementAnnotation___78pTr.styles-module__annotationVisible___mrUyA {
  opacity: 1;
  transform: translateY(0);
}

.styles-module__sectionAnnotation___aUIs0 {
  position: absolute;
  bottom: -18px;
  left: 0;
  right: 0;
  font-weight: 450;
  color: rgba(59, 130, 246, 0.6);
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.9), 0 0 8px rgba(255, 255, 255, 0.6);
  opacity: 0;
  transform: translateY(-2px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.styles-module__sectionAnnotation___aUIs0.styles-module__annotationVisible___mrUyA {
  opacity: 1;
  transform: translateY(0);
}

.styles-module__handle___Ikbxm {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #fff;
  border: 1.5px solid #3c82f7;
  border-radius: 2px;
  z-index: 12;
  box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.12);
  opacity: 0;
  transform: scale(0.3);
  pointer-events: none;
  will-change: opacity, transform;
  transition: opacity 0.2s ease-out, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.styles-module__placement___zcxv8:hover .styles-module__handle___Ikbxm, .styles-module__sectionOutline___s0hy-:hover .styles-module__handle___Ikbxm, .styles-module__ghostOutline___po-kO:hover .styles-module__handle___Ikbxm, .styles-module__placement___zcxv8:active .styles-module__handle___Ikbxm, .styles-module__sectionOutline___s0hy-:active .styles-module__handle___Ikbxm, .styles-module__ghostOutline___po-kO:active .styles-module__handle___Ikbxm, .styles-module__selected___6yrp6 .styles-module__handle___Ikbxm {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}
.styles-module__sectionOutline___s0hy- .styles-module__handle___Ikbxm {
  border-color: inherit;
}
.styles-module__wireframe___itvQU .styles-module__handle___Ikbxm {
  border-color: #f97316;
}

.styles-module__handleNw___4TMIj {
  top: -4px;
  left: -4px;
  cursor: nw-resize;
}

.styles-module__handleNe___mnsTh {
  top: -4px;
  right: -4px;
  cursor: ne-resize;
}

.styles-module__handleSe___oSFnk {
  bottom: -4px;
  right: -4px;
  cursor: se-resize;
}

.styles-module__handleSw___pi--Z {
  bottom: -4px;
  left: -4px;
  cursor: sw-resize;
}

.styles-module__handleN___aBA-Q, .styles-module__handleE___0hM5u, .styles-module__handleS___JjDRv, .styles-module__handleW___ERWGQ {
  opacity: 0 !important;
  pointer-events: none !important;
}

.styles-module__edgeHandle___XxXdT {
  position: absolute;
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
}
.styles-module__edgeHandle___XxXdT::after {
  content: "";
  position: absolute;
  border-radius: 4px;
  background: #3c82f7;
}
.styles-module__wireframe___itvQU .styles-module__edgeHandle___XxXdT::after {
  background: #f97316;
}
.styles-module__edgeHandle___XxXdT::after {
  opacity: 0;
  transition: opacity 0.1s ease, transform 0.1s ease;
  transform: scale(0.8);
}
.styles-module__edgeHandle___XxXdT:hover::after {
  opacity: 0.85;
  transform: scale(1);
}
.styles-module__edgeHandle___XxXdT svg {
  position: relative;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.1s ease;
  filter: drop-shadow(0 0 2px var(--agd-surface));
}
.styles-module__edgeHandle___XxXdT:hover svg {
  opacity: 1;
}

.styles-module__edgeN___-JJDj, .styles-module__edgeS___66lMX {
  left: 12px;
  right: 12px;
  height: 12px;
  cursor: n-resize;
}
.styles-module__edgeN___-JJDj::after, .styles-module__edgeS___66lMX::after {
  width: 24px;
  height: 4px;
}

.styles-module__edgeN___-JJDj {
  top: -6px;
}

.styles-module__edgeS___66lMX {
  bottom: -6px;
  cursor: s-resize;
}

.styles-module__edgeE___1bGDa, .styles-module__edgeW___lHQNo {
  top: 12px;
  bottom: 12px;
  width: 12px;
  cursor: e-resize;
}
.styles-module__edgeE___1bGDa::after, .styles-module__edgeW___lHQNo::after {
  width: 4px;
  height: 24px;
}

.styles-module__edgeE___1bGDa {
  right: -6px;
}

.styles-module__edgeW___lHQNo {
  left: -6px;
  cursor: w-resize;
}

.styles-module__deleteButton___LkGCb {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.35);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  line-height: 1;
  z-index: 15;
  pointer-events: none;
  opacity: 0;
  transform: scale(0.8);
  will-change: opacity, transform;
  transition: opacity 0.2s ease-out, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.12s ease, color 0.12s ease, border-color 0.12s ease, box-shadow 0.12s ease;
}
.styles-module__placement___zcxv8:hover .styles-module__deleteButton___LkGCb, .styles-module__selected___6yrp6 .styles-module__deleteButton___LkGCb, .styles-module__sectionOutline___s0hy-:hover .styles-module__deleteButton___LkGCb, .styles-module__sectionOutline___s0hy-.styles-module__selected___6yrp6 .styles-module__deleteButton___LkGCb, .styles-module__ghostOutline___po-kO:hover .styles-module__deleteButton___LkGCb, .styles-module__ghostOutline___po-kO.styles-module__selected___6yrp6 .styles-module__deleteButton___LkGCb {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}
.styles-module__deleteButton___LkGCb:hover {
  background: #ef4444;
  color: #fff;
  border-color: #ef4444;
  box-shadow: 0 1px 4px rgba(239, 68, 68, 0.3);
  transform: scale(1.1);
}
.styles-module__overlay___aWh-q:not(.styles-module__light___ORIft) .styles-module__deleteButton___LkGCb, .styles-module__rearrangeOverlay___-3R3t:not(.styles-module__light___ORIft) .styles-module__deleteButton___LkGCb {
  background: rgba(40, 40, 40, 0.9);
  border-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}
.styles-module__overlay___aWh-q:not(.styles-module__light___ORIft) .styles-module__deleteButton___LkGCb:hover, .styles-module__rearrangeOverlay___-3R3t:not(.styles-module__light___ORIft) .styles-module__deleteButton___LkGCb:hover {
  background: #ef4444;
  color: #fff;
  border-color: #ef4444;
}

.styles-module__drawBox___BrVAa {
  position: fixed;
  pointer-events: none;
  z-index: 99996;
  border: 2px solid #3c82f7;
  border-radius: 6px;
  background: rgba(59, 130, 246, 0.15);
}

.styles-module__selectBox___Iu8kB {
  position: fixed;
  pointer-events: none;
  z-index: 99996;
  border: 1px dashed #3c82f7;
  background: rgba(59, 130, 246, 0.08);
  border-radius: 2px;
}

.styles-module__sizeIndicator___7zJ4y {
  position: fixed;
  pointer-events: none;
  z-index: 100001;
  font-size: 10px;
  color: #fff;
  background: #3c82f7;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.styles-module__guideLine___DUQY2 {
  pointer-events: none;
  z-index: 100001;
  background: #f0f;
  opacity: 0.5;
}

.styles-module__dragPreview___onPbU {
  position: fixed;
  z-index: 100002;
  pointer-events: none;
  border: 1.5px dashed #3c82f7;
  border-radius: 6px;
  background: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 600;
  color: #3c82f7;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
  transition: width 0.08s ease, height 0.08s ease, opacity 0.08s ease;
}

.styles-module__dragPreviewWireframe___jsg0G {
  border-color: #f97316;
  background: rgba(249, 115, 22, 0.1);
  color: #f97316;
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.15);
}

.styles-module__palette___C7iSH {
  position: absolute;
  right: 5px;
  bottom: calc(100% + 0.5rem);
  width: 256px;
  overflow: hidden;
  background: #1c1c1c;
  border: none;
  border-radius: 1rem;
  padding: 13px 0 16px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.04);
  z-index: 100001;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  cursor: default;
  opacity: 0;
  filter: blur(5px);
}
.styles-module__palette___C7iSH .styles-module__paletteItem___6TlnA,
.styles-module__palette___C7iSH .styles-module__paletteItemLabel___6ncO4,
.styles-module__palette___C7iSH .styles-module__paletteSectionTitle___PqnjX,
.styles-module__palette___C7iSH .styles-module__paletteFooter___QYnAG {
  transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}
.styles-module__palette___C7iSH.styles-module__enter___6LYk5 {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0px);
  transition: opacity 0.2s ease, transform 0.2s ease, filter 0.2s ease;
}
.styles-module__palette___C7iSH.styles-module__exit___iSGRw {
  opacity: 0;
  transform: translateY(6px);
  filter: blur(5px);
  pointer-events: none;
  transition: opacity 0.1s ease, transform 0.1s ease, filter 0.1s ease;
}
.styles-module__palette___C7iSH.styles-module__light___ORIft {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
}

.styles-module__paletteSection___V8DEA {
  padding: 0 1rem;
}
.styles-module__paletteSection___V8DEA + .styles-module__paletteSection___V8DEA {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}
.styles-module__light___ORIft .styles-module__paletteSection___V8DEA + .styles-module__paletteSection___V8DEA {
  border-top-color: rgba(0, 0, 0, 0.07);
}

.styles-module__paletteSectionTitle___PqnjX {
  font-size: 0.6875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: -0.0094em;
  padding: 0 0 3px 3px;
}
.styles-module__light___ORIft .styles-module__paletteSectionTitle___PqnjX {
  color: rgba(0, 0, 0, 0.4);
}

.styles-module__paletteItem___6TlnA {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.25rem;
  margin-bottom: 1px;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
  border: 1px solid transparent;
  user-select: none;
  min-height: 24px;
}
.styles-module__paletteItem___6TlnA:hover {
  background: rgba(255, 255, 255, 0.1);
}
.styles-module__paletteItem___6TlnA.styles-module__active___hosp7 {
  background: #3c82f7;
  border-color: transparent;
}
.styles-module__paletteItem___6TlnA.styles-module__wireframe___itvQU.styles-module__active___hosp7 {
  background: #f97316;
}
.styles-module__light___ORIft .styles-module__paletteItem___6TlnA:hover {
  background: rgba(0, 0, 0, 0.05);
}
.styles-module__light___ORIft .styles-module__paletteItem___6TlnA.styles-module__active___hosp7 {
  background: #3c82f7;
  border-color: transparent;
}
.styles-module__light___ORIft .styles-module__paletteItem___6TlnA.styles-module__wireframe___itvQU.styles-module__active___hosp7 {
  background: #f97316;
}

.styles-module__paletteItemIcon___0NPQK {
  width: 20px;
  height: 16px;
  border-radius: 2px;
  border: 1px dashed rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.45);
}
.styles-module__paletteItemIcon___0NPQK svg {
  display: block;
  width: 20px;
  height: 16px;
}
.styles-module__active___hosp7 .styles-module__paletteItemIcon___0NPQK {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}
.styles-module__light___ORIft .styles-module__paletteItemIcon___0NPQK {
  border-color: rgba(0, 0, 0, 0.12);
  background: rgba(0, 0, 0, 0.02);
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___ORIft .styles-module__active___hosp7 .styles-module__paletteItemIcon___0NPQK {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.styles-module__paletteItemLabel___6ncO4 {
  font-size: 0.8125rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: -0.0094em;
  line-height: 1;
  min-width: 0;
}
.styles-module__active___hosp7 .styles-module__paletteItemLabel___6ncO4 {
  color: #fff;
  font-weight: 600;
}
.styles-module__light___ORIft .styles-module__paletteItemLabel___6ncO4 {
  color: rgba(0, 0, 0, 0.7);
}
.styles-module__light___ORIft .styles-module__active___hosp7 .styles-module__paletteItemLabel___6ncO4 {
  color: #fff;
  font-weight: 600;
}

.styles-module__placeScroll___7sClM {
  max-height: 240px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 0.25rem;
}
.styles-module__placeScroll___7sClM.styles-module__fadeTop___KT9tF {
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 32px);
  mask-image: linear-gradient(to bottom, transparent 0, black 32px);
}
.styles-module__placeScroll___7sClM.styles-module__fadeBottom___x3ShT {
  -webkit-mask-image: linear-gradient(to bottom, black calc(100% - 32px), transparent 100%);
  mask-image: linear-gradient(to bottom, black calc(100% - 32px), transparent 100%);
}
.styles-module__placeScroll___7sClM.styles-module__fadeTop___KT9tF.styles-module__fadeBottom___x3ShT {
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 32px, black calc(100% - 32px), transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0, black 32px, black calc(100% - 32px), transparent 100%);
}
.styles-module__placeScroll___7sClM::-webkit-scrollbar {
  width: 3px;
}
.styles-module__placeScroll___7sClM::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 2px;
}
.styles-module__light___ORIft .styles-module__placeScroll___7sClM::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
}

.styles-module__paletteFooterWrap___71-fI {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 0.25s cubic-bezier(0.32, 0.72, 0, 1);
}
.styles-module__paletteFooterWrap___71-fI.styles-module__footerHidden___fJUik {
  grid-template-rows: 0fr;
}

.styles-module__paletteFooterInnerContent___VC26h {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.styles-module__footerHidden___fJUik .styles-module__paletteFooterInnerContent___VC26h {
  opacity: 0;
  transform: translateY(4px);
}

.styles-module__paletteFooterInner___dfylY {
  overflow: hidden;
}

.styles-module__paletteFooter___QYnAG {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
  padding: 0 1rem;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}
.styles-module__light___ORIft .styles-module__paletteFooter___QYnAG {
  border-top-color: rgba(0, 0, 0, 0.07);
}

.styles-module__paletteFooterCount___D3Fia {
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: -0.0094em;
  color: rgba(255, 255, 255, 0.5);
}
.styles-module__light___ORIft .styles-module__paletteFooterCount___D3Fia {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__paletteFooterClear___ybBoa {
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: -0.0094em;
  color: rgba(255, 255, 255, 0.5);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
  transition: color 0.15s ease;
}
.styles-module__paletteFooterClear___ybBoa:hover {
  color: rgba(255, 255, 255, 0.7);
}
.styles-module__light___ORIft .styles-module__paletteFooterClear___ybBoa {
  color: rgba(0, 0, 0, 0.5);
}
.styles-module__light___ORIft .styles-module__paletteFooterClear___ybBoa:hover {
  color: rgba(0, 0, 0, 0.6);
}

.styles-module__paletteFooterActions___fLzv8 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.styles-module__rollingWrap___S75jM {
  display: inline-block;
  overflow: hidden;
  height: 1.15em;
  position: relative;
  vertical-align: bottom;
}

.styles-module__rollingNum___1RKDx {
  position: absolute;
  left: 0;
  top: 0;
}

.styles-module__exitUp___AFDRW {
  animation: styles-module__numExitUp___FRQqx 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;
}

.styles-module__enterUp___CPlXb {
  animation: styles-module__numEnterUp___2Yd-w 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;
}

.styles-module__exitDown___-1yAy {
  animation: styles-module__numExitDown___xm5by 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;
}

.styles-module__enterDown___DDuFR {
  animation: styles-module__numEnterDown___hpxBk 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;
}

@keyframes styles-module__numExitUp___FRQqx {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-110%);
    opacity: 0;
  }
}
@keyframes styles-module__numEnterUp___2Yd-w {
  from {
    transform: translateY(110%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes styles-module__numExitDown___xm5by {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(110%);
    opacity: 0;
  }
}
@keyframes styles-module__numEnterDown___hpxBk {
  from {
    transform: translateY(-110%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.styles-module__rearrangeOverlay___-3R3t {
  position: fixed;
  inset: 0;
  z-index: 99995;
  pointer-events: none;
  cursor: default;
  user-select: none;
  animation: styles-module__overlayFadeIn___aECVy 0.15s ease;
}

.styles-module__hoverHighlight___8eT-v {
  position: fixed;
  pointer-events: none;
  z-index: 99994;
  border: 2px dashed rgba(59, 130, 246, 0.5);
  border-radius: 4px;
  background: rgba(59, 130, 246, 0.06);
  animation: styles-module__highlightFadeIn___Lg7KY 0.12s ease;
}

.styles-module__sectionOutline___s0hy- {
  position: fixed;
  border: 2px solid;
  border-radius: 4px;
  cursor: grab;
}
.styles-module__sectionOutline___s0hy-:active {
  cursor: grabbing;
}
.styles-module__sectionOutline___s0hy- {
  transition: box-shadow 0.15s, border-color 0.3s, background-color 0.3s, border-style 0s;
  user-select: none;
  pointer-events: auto;
  animation: styles-module__sectionEnter___-8BXT 0.2s ease;
}
.styles-module__sectionOutline___s0hy-:hover {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.15);
}
.styles-module__sectionOutline___s0hy-.styles-module__selected___6yrp6 {
  border-style: solid;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);
}
.styles-module__sectionOutline___s0hy-.styles-module__selected___6yrp6:hover {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6) {
  border: 1.5px dashed rgba(150, 150, 150, 0.35);
  background-color: transparent !important;
  box-shadow: none;
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6):hover {
  border-color: rgba(150, 150, 150, 0.6);
  box-shadow: none;
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6) .styles-module__sectionLabel___F80HQ {
  opacity: 0;
  transition: opacity 0.15s ease;
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6):hover .styles-module__sectionLabel___F80HQ {
  opacity: 1;
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6) .styles-module__movedBadge___s8z-q,
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6) .styles-module__sectionDimensions___RcJSL {
  opacity: 0;
  transition: opacity 0.15s ease;
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6):hover .styles-module__sectionDimensions___RcJSL {
  opacity: 1;
}
.styles-module__sectionOutline___s0hy-.styles-module__exiting___YrM8F {
  opacity: 0;
  transform: scale(0.97);
  pointer-events: none;
  animation: none;
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.32, 0.72, 0, 1);
}

.styles-module__sectionLabel___F80HQ {
  position: absolute;
  top: 4px;
  left: 4px;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  max-width: calc(100% - 8px);
  overflow: hidden;
  text-overflow: ellipsis;
}

.styles-module__movedBadge___s8z-q {
  position: absolute;
  bottom: 22px;
  right: 4px;
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  background: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.styles-module__movedBadge___s8z-q.styles-module__badgeVisible___npbdS {
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.2s cubic-bezier(0.34, 1.2, 0.64, 1), transform 0.2s cubic-bezier(0.34, 1.2, 0.64, 1);
}

.styles-module__resizedBadge___u51V8 {
  background: #3c82f7;
  bottom: 40px;
}

.styles-module__sectionDimensions___RcJSL {
  position: absolute;
  bottom: 4px;
  right: 4px;
  font-size: 9px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(0, 0, 0, 0.5);
  padding: 1px 5px;
  border-radius: 3px;
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
.styles-module__light___ORIft .styles-module__sectionDimensions___RcJSL {
  color: rgba(0, 0, 0, 0.5);
  background: rgba(255, 255, 255, 0.7);
}

.styles-module__wireframeNotice___4GJyB {
  position: fixed;
  bottom: 16px;
  left: 24px;
  z-index: 99995;
  font-size: 9.5px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.4);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  pointer-events: auto;
  animation: styles-module__overlayFadeIn___aECVy 0.3s ease;
  line-height: 1.5;
  max-width: 280px;
}

.styles-module__wireframeOpacityRow___CJXzi {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.styles-module__wireframeOpacityLabel___afkfT {
  font-size: 9px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.32);
  letter-spacing: 0.02em;
  white-space: nowrap;
  user-select: none;
}

.styles-module__wireframeOpacitySlider___YcoEs {
  -webkit-appearance: none;
  appearance: none;
  width: 56px;
  height: 4px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s ease;
}
.styles-module__wireframeOpacitySlider___YcoEs:hover {
  background: rgba(0, 0, 0, 0.13);
}
.styles-module__wireframeOpacitySlider___YcoEs::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #f97316;
  cursor: pointer;
  transition: background 0.15s ease;
}
.styles-module__wireframeOpacitySlider___YcoEs::-webkit-slider-thumb:hover {
  background: rgb(224.4209205021, 95.3548117155, 5.7790794979);
}
.styles-module__wireframeOpacitySlider___YcoEs::-moz-range-thumb {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #f97316;
  border: none;
  cursor: pointer;
}
.styles-module__wireframeOpacitySlider___YcoEs::-moz-range-track {
  background: rgba(0, 0, 0, 0.08);
  height: 4px;
  border-radius: 2px;
}

.styles-module__wireframeNoticeTitleRow___PJqyG {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 2px;
}

.styles-module__wireframeNoticeTitle___okr08 {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.55);
}

.styles-module__wireframeNoticeDivider___PNKQ6 {
  width: 1px;
  height: 8px;
  background: rgba(0, 0, 0, 0.12);
  margin: 0 8px;
  flex-shrink: 0;
}

.styles-module__wireframeStartOver___YFk-I {
  font-size: 9.5px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.35);
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  text-decoration: none;
  transition: color 0.12s ease;
  white-space: nowrap;
}
.styles-module__wireframeStartOver___YFk-I:hover {
  color: rgba(0, 0, 0, 0.6);
}

.styles-module__ghostOutline___po-kO {
  position: fixed;
  border: 1.5px dashed rgba(59, 130, 246, 0.4);
  border-radius: 4px;
  background: rgba(59, 130, 246, 0.04);
  cursor: grab;
  opacity: 0.5;
  user-select: none;
  pointer-events: auto;
  animation: styles-module__ghostEnter___EC3Mb 0.25s ease;
  transition: box-shadow 0.15s, border-color 0.3s, opacity 0.25s;
}
.styles-module__ghostOutline___po-kO:active {
  cursor: grabbing;
}
.styles-module__ghostOutline___po-kO:hover {
  opacity: 0.7;
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.1), 0 4px 12px rgba(0, 0, 0, 0.08);
}
.styles-module__ghostOutline___po-kO.styles-module__selected___6yrp6 {
  opacity: 1;
  border-style: solid;
  border-width: 2px;
  border-color: #3c82f7;
  background: rgba(59, 130, 246, 0.08);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);
}
.styles-module__ghostOutline___po-kO.styles-module__exiting___YrM8F {
  opacity: 0;
  transform: scale(0.97);
  pointer-events: none;
  animation: none;
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.32, 0.72, 0, 1);
}

.styles-module__ghostBadge___tsQUK {
  position: absolute;
  bottom: calc(100% + 4px);
  left: -1px;
  font-size: 9px;
  font-weight: 600;
  color: rgba(59, 130, 246, 0.9);
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.2);
  padding: 1px 5px;
  border-radius: 3px;
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  letter-spacing: 0.02em;
  line-height: 1.2;
  animation: styles-module__badgeSlideIn___typJ7 0.2s ease both;
}

@keyframes styles-module__badgeSlideIn___typJ7 {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.styles-module__ghostBadgeExtra___6CVoD {
  display: inline;
  animation: styles-module__badgeExtraIn___i4W8F 0.2s ease both;
}

@keyframes styles-module__badgeExtraIn___i4W8F {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.styles-module__originalOutline___Y6DD1 {
  position: fixed;
  border: 1.5px dashed rgba(150, 150, 150, 0.3);
  border-radius: 4px;
  background: transparent;
  pointer-events: none;
  user-select: none;
  animation: styles-module__sectionEnter___-8BXT 0.2s ease;
}

.styles-module__originalLabel___HqI9g {
  position: absolute;
  top: 4px;
  left: 4px;
  font-size: 9px;
  font-weight: 500;
  color: rgba(150, 150, 150, 0.5);
  padding: 1px 6px;
  border-radius: 3px;
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: rgba(150, 150, 150, 0.08);
}

.styles-module__connectorSvg___Lovld {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 99996;
}

.styles-module__connectorLine___XeWh- {
  transition: opacity 0.2s ease;
  animation: styles-module__connectorDraw___8sK5I 0.3s ease both;
}

.styles-module__connectorDot___yvf7C {
  transform-box: fill-box;
  transform-origin: center;
  animation: styles-module__connectorDotIn___NwTUq 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both;
}

@keyframes styles-module__connectorDraw___8sK5I {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes styles-module__connectorDotIn___NwTUq {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.styles-module__connectorExiting___2lLOs {
  animation: styles-module__connectorOut___5QoPl 0.2s ease forwards;
}
.styles-module__connectorExiting___2lLOs .styles-module__connectorDot___yvf7C {
  animation: styles-module__connectorDotOut___FEq7e 0.2s ease forwards;
}

@keyframes styles-module__connectorOut___5QoPl {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes styles-module__connectorDotOut___FEq7e {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0);
    opacity: 0;
  }
}
@keyframes styles-module__placementEnter___TdRhf {
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__sectionEnter___-8BXT {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__highlightFadeIn___Lg7KY {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes styles-module__overlayFadeIn___aECVy {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes styles-module__ghostEnter___EC3Mb {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 0.6;
    transform: scale(1);
  }
}`,N3={overlayExiting:"styles-module__overlayExiting___iEmYr",overlay:"styles-module__overlay___aWh-q",overlayFadeIn:"styles-module__overlayFadeIn___aECVy",light:"styles-module__light___ORIft",wireframe:"styles-module__wireframe___itvQU",placing:"styles-module__placing___45yD8",passthrough:"styles-module__passthrough___xaFeE",blankCanvas:"styles-module__blankCanvas___t2Eue",visible:"styles-module__visible___OKKqX",gridActive:"styles-module__gridActive___OZ-cf",paletteHeader:"styles-module__paletteHeader___-Q5gQ",paletteHeaderTitle:"styles-module__paletteHeaderTitle___oHqZC",paletteHeaderDesc:"styles-module__paletteHeaderDesc___6i74T",wireframePurposeWrap:"styles-module__wireframePurposeWrap___To-tS",collapsed:"styles-module__collapsed___Ms9vS",wireframePurposeInner:"styles-module__wireframePurposeInner___Lrahs",wireframePurposeInput:"styles-module__wireframePurposeInput___7EtBN",canvasToggle:"styles-module__canvasToggle___-QqSy",active:"styles-module__active___hosp7",canvasToggleIcon:"styles-module__canvasToggleIcon___7pJ82",canvasToggleLabel:"styles-module__canvasToggleLabel___OanpY",canvasPurposeWrap:"styles-module__canvasPurposeWrap___hj6zk",canvasPurposeInner:"styles-module__canvasPurposeInner___VWiyu",canvasPurposeToggle:"styles-module__canvasPurposeToggle___byDH2",canvasPurposeCheck:"styles-module__canvasPurposeCheck___xqd7l",checked:"styles-module__checked___-1JGH",canvasPurposeLabel:"styles-module__canvasPurposeLabel___Zu-tD",canvasPurposeHelp:"styles-module__canvasPurposeHelp___jijwR",placement:"styles-module__placement___zcxv8",placementEnter:"styles-module__placementEnter___TdRhf",selected:"styles-module__selected___6yrp6",dragging:"styles-module__dragging___le6KZ",exiting:"styles-module__exiting___YrM8F",placementContent:"styles-module__placementContent___f64A4",placementLabel:"styles-module__placementLabel___0KvWl",placementAnnotation:"styles-module__placementAnnotation___78pTr",annotationVisible:"styles-module__annotationVisible___mrUyA",sectionAnnotation:"styles-module__sectionAnnotation___aUIs0",handle:"styles-module__handle___Ikbxm",sectionOutline:"styles-module__sectionOutline___s0hy-",ghostOutline:"styles-module__ghostOutline___po-kO",handleNw:"styles-module__handleNw___4TMIj",handleNe:"styles-module__handleNe___mnsTh",handleSe:"styles-module__handleSe___oSFnk",handleSw:"styles-module__handleSw___pi--Z",handleN:"styles-module__handleN___aBA-Q",handleE:"styles-module__handleE___0hM5u",handleS:"styles-module__handleS___JjDRv",handleW:"styles-module__handleW___ERWGQ",edgeHandle:"styles-module__edgeHandle___XxXdT",edgeN:"styles-module__edgeN___-JJDj",edgeS:"styles-module__edgeS___66lMX",edgeE:"styles-module__edgeE___1bGDa",edgeW:"styles-module__edgeW___lHQNo",deleteButton:"styles-module__deleteButton___LkGCb",rearrangeOverlay:"styles-module__rearrangeOverlay___-3R3t",drawBox:"styles-module__drawBox___BrVAa",selectBox:"styles-module__selectBox___Iu8kB",sizeIndicator:"styles-module__sizeIndicator___7zJ4y",guideLine:"styles-module__guideLine___DUQY2",dragPreview:"styles-module__dragPreview___onPbU",dragPreviewWireframe:"styles-module__dragPreviewWireframe___jsg0G",palette:"styles-module__palette___C7iSH",paletteItem:"styles-module__paletteItem___6TlnA",paletteItemLabel:"styles-module__paletteItemLabel___6ncO4",paletteSectionTitle:"styles-module__paletteSectionTitle___PqnjX",paletteFooter:"styles-module__paletteFooter___QYnAG",enter:"styles-module__enter___6LYk5",exit:"styles-module__exit___iSGRw",paletteSection:"styles-module__paletteSection___V8DEA",paletteItemIcon:"styles-module__paletteItemIcon___0NPQK",placeScroll:"styles-module__placeScroll___7sClM",fadeTop:"styles-module__fadeTop___KT9tF",fadeBottom:"styles-module__fadeBottom___x3ShT",paletteFooterWrap:"styles-module__paletteFooterWrap___71-fI",footerHidden:"styles-module__footerHidden___fJUik",paletteFooterInnerContent:"styles-module__paletteFooterInnerContent___VC26h",paletteFooterInner:"styles-module__paletteFooterInner___dfylY",paletteFooterCount:"styles-module__paletteFooterCount___D3Fia",paletteFooterClear:"styles-module__paletteFooterClear___ybBoa",paletteFooterActions:"styles-module__paletteFooterActions___fLzv8",rollingWrap:"styles-module__rollingWrap___S75jM",rollingNum:"styles-module__rollingNum___1RKDx",exitUp:"styles-module__exitUp___AFDRW",numExitUp:"styles-module__numExitUp___FRQqx",enterUp:"styles-module__enterUp___CPlXb",numEnterUp:"styles-module__numEnterUp___2Yd-w",exitDown:"styles-module__exitDown___-1yAy",numExitDown:"styles-module__numExitDown___xm5by",enterDown:"styles-module__enterDown___DDuFR",numEnterDown:"styles-module__numEnterDown___hpxBk",hoverHighlight:"styles-module__hoverHighlight___8eT-v",highlightFadeIn:"styles-module__highlightFadeIn___Lg7KY",sectionEnter:"styles-module__sectionEnter___-8BXT",settled:"styles-module__settled___b5U5o",sectionLabel:"styles-module__sectionLabel___F80HQ",movedBadge:"styles-module__movedBadge___s8z-q",sectionDimensions:"styles-module__sectionDimensions___RcJSL",badgeVisible:"styles-module__badgeVisible___npbdS",resizedBadge:"styles-module__resizedBadge___u51V8",wireframeNotice:"styles-module__wireframeNotice___4GJyB",wireframeOpacityRow:"styles-module__wireframeOpacityRow___CJXzi",wireframeOpacityLabel:"styles-module__wireframeOpacityLabel___afkfT",wireframeOpacitySlider:"styles-module__wireframeOpacitySlider___YcoEs",wireframeNoticeTitleRow:"styles-module__wireframeNoticeTitleRow___PJqyG",wireframeNoticeTitle:"styles-module__wireframeNoticeTitle___okr08",wireframeNoticeDivider:"styles-module__wireframeNoticeDivider___PNKQ6",wireframeStartOver:"styles-module__wireframeStartOver___YFk-I",ghostEnter:"styles-module__ghostEnter___EC3Mb",ghostBadge:"styles-module__ghostBadge___tsQUK",badgeSlideIn:"styles-module__badgeSlideIn___typJ7",ghostBadgeExtra:"styles-module__ghostBadgeExtra___6CVoD",badgeExtraIn:"styles-module__badgeExtraIn___i4W8F",originalOutline:"styles-module__originalOutline___Y6DD1",originalLabel:"styles-module__originalLabel___HqI9g",connectorSvg:"styles-module__connectorSvg___Lovld",connectorLine:"styles-module__connectorLine___XeWh-",connectorDraw:"styles-module__connectorDraw___8sK5I",connectorDot:"styles-module__connectorDot___yvf7C",connectorDotIn:"styles-module__connectorDotIn___NwTUq",connectorExiting:"styles-module__connectorExiting___2lLOs",connectorOut:"styles-module__connectorOut___5QoPl",connectorDotOut:"styles-module__connectorDotOut___FEq7e"};if(typeof document<"u"){let i=document.getElementById("feedback-tool-styles-design-mode-styles");i||(i=document.createElement("style"),i.id="feedback-tool-styles-design-mode-styles",document.head.appendChild(i)),i.textContent=L3}ee=N3,kc=24,Uh=5;x="currentColor",F="0.5";dv=new Set(["none","normal","auto","0px","rgba(0, 0, 0, 0)","transparent","static","visible"]),X3=new Set(["p","span","h1","h2","h3","h4","h5","h6","label","li","td","th","blockquote","figcaption","caption","legend","dt","dd","pre","code","em","strong","b","i","a","time","cite","q"]),q3=new Set(["input","textarea","select"]),V3=new Set(["img","video","canvas","svg"]),Q3=new Set(["div","section","article","nav","header","footer","aside","main","ul","ol","form","fieldset"]);W3=["color","backgroundColor","borderColor","fontSize","fontWeight","fontFamily","lineHeight","letterSpacing","textAlign","width","height","padding","margin","border","borderRadius","display","position","top","right","bottom","left","zIndex","flexDirection","justifyContent","alignItems","gap","opacity","visibility","overflow","boxShadow","transform"];Z3=new Set(["nav","header","main","section","article","footer","aside"]),Ep={banner:"Header",navigation:"Navigation",main:"Main Content",contentinfo:"Footer",complementary:"Sidebar",region:"Section"},Ub={nav:"Navigation",header:"Header",main:"Main Content",section:"Section",article:"Article",footer:"Footer",aside:"Sidebar"},P3=new Set(["script","style","noscript","link","meta"]),F3=40;jb={bg:"rgba(59, 130, 246, 0.08)",border:"rgba(59, 130, 246, 0.5)",pill:"#3b82f6"},Ib=["nw","n","ne","e","se","s","sw","w"],Vh=24,Yb=16,Qh=5;e8=new Set(["script","style","noscript","link","meta","br","hr"]);Mp=new Set(["script","style","noscript","link","meta","br","hr"]);Vb=15;Rp="feedback-annotations-",vv=7;Op="agentation-design-";zp="agentation-rearrange-";Lp="agentation-wireframe-";wv="agentation-session-";Dp=`${wv}toolbar-hidden`;on={FunctionComponent:0,ClassComponent:1,IndeterminateComponent:2,HostRoot:3,HostPortal:4,HostComponent:5,HostText:6,Fragment:7,Mode:8,ContextConsumer:9,ContextProvider:10,ForwardRef:11,Profiler:12,SuspenseComponent:13,MemoComponent:14,SimpleMemoComponent:15,LazyComponent:16,IncompleteClassComponent:17,DehydratedFragment:18,SuspenseListComponent:19,ScopeComponent:21,OffscreenComponent:22,LegacyHiddenComponent:23,CacheComponent:24,TracingMarkerComponent:25,HostHoistable:26,HostSingleton:27,IncompleteFunctionComponent:28,Throw:29,ViewTransitionComponent:30,ActivityComponent:31},Jb=new Set(["Component","PureComponent","Fragment","Suspense","Profiler","StrictMode","Routes","Route","Outlet","Root","ErrorBoundaryHandler","HotReload","Hot"]),Kb=[/Boundary$/,/BoundaryHandler$/,/Provider$/,/Consumer$/,/^(Inner|Outer)/,/Router$/,/^Client(Page|Segment|Root)/,/^Segment(ViewNode|Node)$/,/^LayoutSegment/,/^Server(Root|Component|Render)/,/^RSC/,/Context$/,/^Hot(Reload)?$/,/^(Dev|React)(Overlay|Tools|Root)/,/Overlay$/,/Handler$/,/^With[A-Z]/,/Wrapper$/,/^Root$/],S8=[/Page$/,/View$/,/Screen$/,/Section$/,/Card$/,/List$/,/Item$/,/Form$/,/Modal$/,/Dialog$/,/Button$/,/Nav$/,/Header$/,/Footer$/,/Layout$/,/Panel$/,/Tab$/,/Menu$/];Mc=null,R8=new WeakMap;xd={map:R8};wd={FunctionComponent:0,ClassComponent:1,IndeterminateComponent:2,HostRoot:3,HostPortal:4,HostComponent:5,HostText:6,Fragment:7,Mode:8,ContextConsumer:9,ContextProvider:10,ForwardRef:11,Profiler:12,SuspenseComponent:13,MemoComponent:14,SimpleMemoComponent:15,LazyComponent:16};Gh=new Map;W8=`.styles-module__toolbar___wNsdK svg[fill=none],
.styles-module__markersLayer___-25j1 svg[fill=none],
.styles-module__fixedMarkersLayer___ffyX6 svg[fill=none] {
  fill: none !important;
}
.styles-module__toolbar___wNsdK svg[fill=none] :not([fill]),
.styles-module__markersLayer___-25j1 svg[fill=none] :not([fill]),
.styles-module__fixedMarkersLayer___ffyX6 svg[fill=none] :not([fill]) {
  fill: none !important;
}

.styles-module__controlsContent___9GJWU :where(button, input, select, textarea, label) {
  background: unset;
  border: unset;
  border-radius: unset;
  padding: unset;
  margin: unset;
  color: unset;
  font-family: unset;
  font-weight: unset;
  font-style: unset;
  line-height: unset;
  letter-spacing: unset;
  text-transform: unset;
  text-decoration: unset;
  box-shadow: unset;
  outline: unset;
}

@keyframes styles-module__toolbarEnter___u8RRu {
  from {
    opacity: 0;
    transform: scale(0.5) rotate(90deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}
@keyframes styles-module__toolbarHide___y8kaT {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
}
@keyframes styles-module__badgeEnter___mVQLj {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__scaleIn___c-r1K {
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__scaleOut___Wctwz {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.85);
  }
}
@keyframes styles-module__slideUp___kgD36 {
  from {
    opacity: 0;
    transform: scale(0.85) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
@keyframes styles-module__slideDown___zcdje {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.85) translateY(8px);
  }
}
@keyframes styles-module__fadeIn___b9qmf {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes styles-module__fadeOut___6Ut6- {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes styles-module__hoverHighlightIn___6WYHY {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__hoverTooltipIn___FYGQx {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(4px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.styles-module__disableTransitions___EopxO :is(*, *::before, *::after) {
  transition: none !important;
}

.styles-module__toolbar___wNsdK {
  position: fixed;
  bottom: 1.25rem;
  right: 1.25rem;
  width: 337px;
  z-index: 100000;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  pointer-events: none;
  transition: left 0s, top 0s, right 0s, bottom 0s;
}

:where(.styles-module__toolbar___wNsdK) {
  bottom: 1.25rem;
  right: 1.25rem;
}

.styles-module__toolbarContainer___dIhma {
  position: relative;
  user-select: none;
  margin-left: auto;
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
  color: #fff;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1);
  pointer-events: auto;
  transition: width 0.4s cubic-bezier(0.19, 1, 0.22, 1), transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}
.styles-module__toolbarContainer___dIhma.styles-module__entrance___sgHd8 {
  animation: styles-module__toolbarEnter___u8RRu 0.5s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
}
.styles-module__toolbarContainer___dIhma.styles-module__hiding___1td44 {
  animation: styles-module__toolbarHide___y8kaT 0.4s cubic-bezier(0.4, 0, 1, 1) forwards;
  pointer-events: none;
}
.styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn {
  width: 44px;
  height: 44px;
  border-radius: 22px;
  padding: 0;
  cursor: pointer;
}
.styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn svg {
  margin-top: -1px;
}
.styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn:hover {
  background: #2a2a2a;
}
.styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn:active {
  transform: scale(0.95);
}
.styles-module__toolbarContainer___dIhma.styles-module__expanded___ofKPx {
  height: 44px;
  border-radius: 1.5rem;
  padding: 0.375rem;
  width: 297px;
}
.styles-module__toolbarContainer___dIhma.styles-module__expanded___ofKPx.styles-module__serverConnected___Gfbou {
  width: 337px;
}

.styles-module__toggleContent___0yfyP {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.1s cubic-bezier(0.19, 1, 0.22, 1);
}
.styles-module__toggleContent___0yfyP.styles-module__visible___KHwEW {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}
.styles-module__toggleContent___0yfyP.styles-module__hidden___Ae8H4 {
  opacity: 0;
  pointer-events: none;
}

.styles-module__controlsContent___9GJWU {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  transition: filter 0.8s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1), transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
}
.styles-module__controlsContent___9GJWU.styles-module__visible___KHwEW {
  opacity: 1;
  filter: blur(0px);
  transform: scale(1);
  visibility: visible;
  pointer-events: auto;
}
.styles-module__controlsContent___9GJWU.styles-module__hidden___Ae8H4 {
  pointer-events: none;
  opacity: 0;
  filter: blur(10px);
  transform: scale(0.4);
}

.styles-module__badge___2XsgF {
  position: absolute;
  top: -13px;
  right: -13px;
  user-select: none;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background-color: var(--agentation-color-accent);
  color: white;
  font-size: 0.625rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.04);
  opacity: 1;
  transition: transform 0.3s ease, opacity 0.2s ease;
  transform: scale(1);
}
.styles-module__badge___2XsgF.styles-module__fadeOut___6Ut6- {
  opacity: 0;
  transform: scale(0);
  pointer-events: none;
}
.styles-module__badge___2XsgF.styles-module__entrance___sgHd8 {
  animation: styles-module__badgeEnter___mVQLj 0.3s cubic-bezier(0.34, 1.2, 0.64, 1) 0.4s both;
}

.styles-module__controlButton___8Q0jc {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  transition: background-color 0.15s ease, color 0.15s ease, transform 0.1s ease, opacity 0.2s ease;
}
.styles-module__controlButton___8Q0jc:hover:not(:disabled):not([data-active=true]):not([data-failed=true]):not([data-auto-sync=true]):not([data-error=true]):not([data-no-hover=true]) {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}
.styles-module__controlButton___8Q0jc:active:not(:disabled) {
  transform: scale(0.92);
}
.styles-module__controlButton___8Q0jc:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.styles-module__controlButton___8Q0jc[data-active=true] {
  color: var(--agentation-color-blue);
  background-color: color-mix(in srgb, var(--agentation-color-blue) 25%, transparent);
}
.styles-module__controlButton___8Q0jc[data-error=true] {
  color: var(--agentation-color-red);
  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);
}
.styles-module__controlButton___8Q0jc[data-danger]:hover:not(:disabled):not([data-active=true]):not([data-failed=true]) {
  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);
  color: var(--agentation-color-red);
}
.styles-module__controlButton___8Q0jc[data-no-hover=true], .styles-module__controlButton___8Q0jc.styles-module__statusShowing___te6iu {
  cursor: default;
  pointer-events: none;
  background: transparent !important;
}
.styles-module__controlButton___8Q0jc[data-auto-sync=true] {
  color: var(--agentation-color-green);
  background: transparent;
  cursor: default;
}
.styles-module__controlButton___8Q0jc[data-failed=true] {
  color: var(--agentation-color-red);
  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);
}

.styles-module__buttonBadge___NeFWb {
  position: absolute;
  top: 0px;
  right: 0px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 8px;
  background-color: var(--agentation-color-accent);
  color: white;
  font-size: 0.625rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 2px #1a1a1a, 0 1px 3px rgba(0, 0, 0, 0.2);
  pointer-events: none;
}
[data-agentation-theme=light] .styles-module__buttonBadge___NeFWb {
  box-shadow: 0 0 0 2px #fff, 0 1px 3px rgba(0, 0, 0, 0.2);
}

@keyframes styles-module__mcpIndicatorPulseConnected___EDodZ {
  0%, 100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 50%, transparent);
  }
  50% {
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--agentation-color-green) 0%, transparent);
  }
}
@keyframes styles-module__mcpIndicatorPulseConnecting___cCYte {
  0%, 100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-yellow) 50%, transparent);
  }
  50% {
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--agentation-color-yellow) 0%, transparent);
  }
}
.styles-module__mcpIndicator___zGJeL {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  pointer-events: none;
  transition: background-color 0.3s ease, opacity 0.15s ease, transform 0.15s ease;
  opacity: 1;
  transform: scale(1);
}
.styles-module__mcpIndicator___zGJeL.styles-module__connected___7c28g {
  background-color: var(--agentation-color-green);
  animation: styles-module__mcpIndicatorPulseConnected___EDodZ 2.5s ease-in-out infinite;
}
.styles-module__mcpIndicator___zGJeL.styles-module__connecting___uo-CW {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__mcpIndicatorPulseConnecting___cCYte 1.5s ease-in-out infinite;
}
.styles-module__mcpIndicator___zGJeL.styles-module__hidden___Ae8H4 {
  opacity: 0;
  transform: scale(0);
  animation: none;
}

@keyframes styles-module__connectionPulse___-Zycw {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.9);
  }
}
.styles-module__connectionIndicatorWrapper___L-e-3 {
  width: 8px;
  height: 34px;
  margin-left: 6px;
  margin-right: 6px;
}

.styles-module__connectionIndicator___afk9p {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease, background-color 0.3s ease;
  cursor: default;
}

.styles-module__connectionIndicatorVisible___C-i5B {
  opacity: 1;
}

.styles-module__connectionIndicatorConnected___IY8pR {
  background-color: var(--agentation-color-green);
  animation: styles-module__connectionPulse___-Zycw 2.5s ease-in-out infinite;
}

.styles-module__connectionIndicatorDisconnected___kmpaZ {
  background-color: var(--agentation-color-red);
  animation: none;
}

.styles-module__connectionIndicatorConnecting___QmSLH {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__connectionPulse___-Zycw 1s ease-in-out infinite;
}

.styles-module__buttonWrapper___rBcdv {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.styles-module__buttonWrapper___rBcdv:hover .styles-module__buttonTooltip___Burd9 {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) scale(1);
  transition-delay: 0.85s;
}
.styles-module__buttonWrapper___rBcdv:has(.styles-module__controlButton___8Q0jc:disabled):hover .styles-module__buttonTooltip___Burd9 {
  opacity: 0;
  visibility: hidden;
}

.styles-module__tooltipsInSession___-0lHH .styles-module__buttonWrapper___rBcdv:hover .styles-module__buttonTooltip___Burd9 {
  transition-delay: 0s;
}

.styles-module__sendButtonWrapper___UUxG6 {
  width: 0;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  margin-left: -0.375rem;
  transition: width 0.4s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s cubic-bezier(0.19, 1, 0.22, 1), margin 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}
.styles-module__sendButtonWrapper___UUxG6 .styles-module__controlButton___8Q0jc {
  transform: scale(0.8);
  transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}
.styles-module__sendButtonWrapper___UUxG6.styles-module__sendButtonVisible___WPSQU {
  width: 34px;
  opacity: 1;
  overflow: visible;
  pointer-events: auto;
  margin-left: 0;
}
.styles-module__sendButtonWrapper___UUxG6.styles-module__sendButtonVisible___WPSQU .styles-module__controlButton___8Q0jc {
  transform: scale(1);
}

.styles-module__buttonTooltip___Burd9 {
  position: absolute;
  bottom: calc(100% + 14px);
  left: 50%;
  transform: translateX(-50%) scale(0.95);
  padding: 6px 10px;
  background: #1a1a1a;
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  font-weight: 500;
  border-radius: 8px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 100001;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: opacity 0.135s ease, transform 0.135s ease, visibility 0.135s ease;
}
.styles-module__buttonTooltip___Burd9::after {
  content: "";
  position: absolute;
  top: calc(100% - 4px);
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 8px;
  height: 8px;
  background: #1a1a1a;
  border-radius: 0 0 2px 0;
}

.styles-module__shortcut___lEAQk {
  margin-left: 4px;
  opacity: 0.5;
}

.styles-module__tooltipBelow___m6ats .styles-module__buttonTooltip___Burd9 {
  bottom: auto;
  top: calc(100% + 14px);
  transform: translateX(-50%) scale(0.95);
}
.styles-module__tooltipBelow___m6ats .styles-module__buttonTooltip___Burd9::after {
  top: -4px;
  bottom: auto;
  border-radius: 2px 0 0 0;
}

.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapper___rBcdv:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(-50%) scale(1);
}

.styles-module__tooltipsHidden___VtLJG .styles-module__buttonTooltip___Burd9 {
  opacity: 0 !important;
  visibility: hidden !important;
  transition: none !important;
}

.styles-module__tooltipVisible___0jcCv,
.styles-module__tooltipsHidden___VtLJG .styles-module__tooltipVisible___0jcCv {
  opacity: 1 !important;
  visibility: visible !important;
  transform: translateX(-50%) scale(1) !important;
  transition-delay: 0s !important;
}

.styles-module__buttonWrapperAlignLeft___myzIp .styles-module__buttonTooltip___Burd9 {
  left: 50%;
  transform: translateX(-12px) scale(0.95);
}
.styles-module__buttonWrapperAlignLeft___myzIp .styles-module__buttonTooltip___Burd9::after {
  left: 16px;
}
.styles-module__buttonWrapperAlignLeft___myzIp:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(-12px) scale(1);
}

.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignLeft___myzIp .styles-module__buttonTooltip___Burd9 {
  transform: translateX(-12px) scale(0.95);
}
.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignLeft___myzIp:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(-12px) scale(1);
}

.styles-module__buttonWrapperAlignRight___HCQFR .styles-module__buttonTooltip___Burd9 {
  left: 50%;
  transform: translateX(calc(-100% + 12px)) scale(0.95);
}
.styles-module__buttonWrapperAlignRight___HCQFR .styles-module__buttonTooltip___Burd9::after {
  left: auto;
  right: 8px;
}
.styles-module__buttonWrapperAlignRight___HCQFR:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(calc(-100% + 12px)) scale(1);
}

.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignRight___HCQFR .styles-module__buttonTooltip___Burd9 {
  transform: translateX(calc(-100% + 12px)) scale(0.95);
}
.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignRight___HCQFR:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(calc(-100% + 12px)) scale(1);
}

.styles-module__divider___c--s1 {
  width: 1px;
  height: 12px;
  background: rgba(255, 255, 255, 0.15);
  margin: 0 0.125rem;
}

.styles-module__overlay___Q1O9y {
  position: fixed;
  inset: 0;
  z-index: 99997;
  pointer-events: none;
}
.styles-module__overlay___Q1O9y > * {
  pointer-events: auto;
}

.styles-module__hoverHighlight___ogakW {
  position: fixed;
  border: 2px solid color-mix(in srgb, var(--agentation-color-accent) 50%, transparent);
  border-radius: 4px;
  background-color: color-mix(in srgb, var(--agentation-color-accent) 4%, transparent);
  pointer-events: none !important;
  box-sizing: border-box;
  will-change: opacity;
  contain: layout style;
}
.styles-module__hoverHighlight___ogakW.styles-module__enter___WFIki {
  animation: styles-module__hoverHighlightIn___6WYHY 0.12s ease-out forwards;
}

.styles-module__multiSelectOutline___cSJ-m {
  position: fixed;
  border: 2px dashed color-mix(in srgb, var(--agentation-color-green) 60%, transparent);
  border-radius: 4px;
  pointer-events: none !important;
  background-color: color-mix(in srgb, var(--agentation-color-green) 5%, transparent);
  box-sizing: border-box;
  will-change: opacity;
}
.styles-module__multiSelectOutline___cSJ-m.styles-module__enter___WFIki {
  animation: styles-module__fadeIn___b9qmf 0.15s ease-out forwards;
}
.styles-module__multiSelectOutline___cSJ-m.styles-module__exit___fyOJ0 {
  animation: styles-module__fadeOut___6Ut6- 0.15s ease-out forwards;
}

.styles-module__singleSelectOutline___QhX-O {
  position: fixed;
  border: 2px solid color-mix(in srgb, var(--agentation-color-blue) 60%, transparent);
  border-radius: 4px;
  pointer-events: none !important;
  background-color: color-mix(in srgb, var(--agentation-color-blue) 5%, transparent);
  box-sizing: border-box;
  will-change: opacity;
}
.styles-module__singleSelectOutline___QhX-O.styles-module__enter___WFIki {
  animation: styles-module__fadeIn___b9qmf 0.15s ease-out forwards;
}
.styles-module__singleSelectOutline___QhX-O.styles-module__exit___fyOJ0 {
  animation: styles-module__fadeOut___6Ut6- 0.15s ease-out forwards;
}

.styles-module__hoverTooltip___bvLk7 {
  position: fixed;
  font-size: 0.6875rem;
  font-weight: 500;
  color: #fff;
  background: rgba(0, 0, 0, 0.85);
  padding: 0.35rem 0.6rem;
  border-radius: 0.375rem;
  pointer-events: none !important;
  white-space: nowrap;
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.styles-module__hoverTooltip___bvLk7.styles-module__enter___WFIki {
  animation: styles-module__hoverTooltipIn___FYGQx 0.1s ease-out forwards;
}

.styles-module__hoverReactPath___gx1IJ {
  font-size: 0.625rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.15rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.styles-module__hoverElementName___QMLMl {
  overflow: hidden;
  text-overflow: ellipsis;
}

.styles-module__markersLayer___-25j1 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0;
  z-index: 99998;
  pointer-events: none;
}
.styles-module__markersLayer___-25j1 > * {
  pointer-events: auto;
}

.styles-module__fixedMarkersLayer___ffyX6 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99998;
  pointer-events: none;
}
.styles-module__fixedMarkersLayer___ffyX6 > * {
  pointer-events: auto;
}

.styles-module__marker___6sQrs {
  position: absolute;
  width: 22px;
  height: 22px;
  background: var(--agentation-color-blue);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 600;
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(0, 0, 0, 0.04);
  user-select: none;
  will-change: transform, opacity;
  contain: layout style;
  z-index: 1;
}
.styles-module__marker___6sQrs:hover {
  z-index: 2;
}
.styles-module__marker___6sQrs:not(.styles-module__enter___WFIki):not(.styles-module__exit___fyOJ0):not(.styles-module__clearing___FQ--7) {
  transition: background-color 0.15s ease, transform 0.1s ease;
}
.styles-module__marker___6sQrs.styles-module__enter___WFIki {
  animation: styles-module__markerIn___5FaAP 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.styles-module__marker___6sQrs.styles-module__exit___fyOJ0 {
  animation: styles-module__markerOut___GU5jX 0.2s ease-out both;
  pointer-events: none;
}
.styles-module__marker___6sQrs.styles-module__clearing___FQ--7 {
  animation: styles-module__markerOut___GU5jX 0.15s ease-out both;
  pointer-events: none;
}
.styles-module__marker___6sQrs:not(.styles-module__enter___WFIki):not(.styles-module__exit___fyOJ0):not(.styles-module__clearing___FQ--7):hover {
  transform: translate(-50%, -50%) scale(1.1);
}
.styles-module__marker___6sQrs.styles-module__pending___2IHLC {
  position: fixed;
  background-color: var(--agentation-color-blue);
  cursor: default;
}
.styles-module__marker___6sQrs.styles-module__fixed___dBMHC {
  position: fixed;
}
.styles-module__marker___6sQrs.styles-module__multiSelect___YWiuz {
  background-color: var(--agentation-color-green);
  width: 26px;
  height: 26px;
  border-radius: 6px;
  font-size: 0.75rem;
}
.styles-module__marker___6sQrs.styles-module__multiSelect___YWiuz.styles-module__pending___2IHLC {
  background-color: var(--agentation-color-green);
}
.styles-module__marker___6sQrs.styles-module__hovered___ZgXIy {
  background-color: var(--agentation-color-red);
}

.styles-module__renumber___nCTxD {
  display: block;
  animation: styles-module__renumberRoll___Wgbq3 0.2s ease-out;
}

@keyframes styles-module__renumberRoll___Wgbq3 {
  0% {
    transform: translateX(-40%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
.styles-module__markerTooltip___aLJID {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) scale(0.909);
  z-index: 100002;
  background: #1a1a1a;
  padding: 8px 0.75rem;
  border-radius: 0.75rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-weight: 400;
  color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
  min-width: 120px;
  max-width: 200px;
  pointer-events: none;
  cursor: default;
}
.styles-module__markerTooltip___aLJID.styles-module__enter___WFIki {
  animation: styles-module__tooltipIn___0N31w 0.1s ease-out forwards;
}

.styles-module__markerQuote___FHmrz {
  display: block;
  font-size: 12px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.3125rem;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.styles-module__markerNote___QkrrS {
  display: block;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 2px;
}

.styles-module__markerHint___2iF-6 {
  display: block;
  font-size: 0.625rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 0.375rem;
  white-space: nowrap;
}

.styles-module__settingsPanel___OxX3Y {
  position: absolute;
  right: 5px;
  bottom: calc(100% + 0.5rem);
  z-index: 1;
  overflow: hidden;
  background: #1c1c1c;
  border-radius: 1rem;
  padding: 13px 0 16px;
  min-width: 205px;
  cursor: default;
  opacity: 1;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.04);
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
}
.styles-module__settingsPanel___OxX3Y::before, .styles-module__settingsPanel___OxX3Y::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 16px;
  z-index: 2;
  pointer-events: none;
}
.styles-module__settingsPanel___OxX3Y::before {
  left: 0;
  background: linear-gradient(to right, #1c1c1c 0%, transparent 100%);
}
.styles-module__settingsPanel___OxX3Y::after {
  right: 0;
  background: linear-gradient(to left, #1c1c1c 0%, transparent 100%);
}
.styles-module__settingsPanel___OxX3Y .styles-module__settingsHeader___pwDY9,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsBrand___0gJeM,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsBrandSlash___uTG18,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsVersion___TUcFq,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsSection___m-YM2,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsLabel___8UjfX,
.styles-module__settingsPanel___OxX3Y .styles-module__cycleButton___FMKfw,
.styles-module__settingsPanel___OxX3Y .styles-module__cycleDot___nPgLY,
.styles-module__settingsPanel___OxX3Y .styles-module__dropdownButton___16NPz,
.styles-module__settingsPanel___OxX3Y .styles-module__toggleLabel___Xm8Aa,
.styles-module__settingsPanel___OxX3Y .styles-module__customCheckbox___U39ax,
.styles-module__settingsPanel___OxX3Y .styles-module__sliderLabel___U8sPr,
.styles-module__settingsPanel___OxX3Y .styles-module__slider___GLdxp,
.styles-module__settingsPanel___OxX3Y .styles-module__themeToggle___2rUjA {
  transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}
.styles-module__settingsPanel___OxX3Y.styles-module__enter___WFIki {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0px);
  transition: opacity 0.2s ease, transform 0.2s ease, filter 0.2s ease;
}
.styles-module__settingsPanel___OxX3Y.styles-module__exit___fyOJ0 {
  opacity: 0;
  transform: translateY(8px) scale(0.95);
  filter: blur(5px);
  pointer-events: none;
  transition: opacity 0.1s ease, transform 0.1s ease, filter 0.1s ease;
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y {
  background: #1a1a1a;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__settingsLabel___8UjfX {
  color: rgba(255, 255, 255, 0.6);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__settingsOption___UNa12 {
  color: rgba(255, 255, 255, 0.85);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__settingsOption___UNa12:hover {
  background: rgba(255, 255, 255, 0.1);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__settingsOption___UNa12.styles-module__selected___OwRqP {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__toggleLabel___Xm8Aa {
  color: rgba(255, 255, 255, 0.85);
}

.styles-module__settingsPanelContainer___Xksv8 {
  overflow: visible;
  position: relative;
  display: flex;
  padding: 0 1rem;
}

.styles-module__settingsPage___6YfHH {
  min-width: 100%;
  flex-shrink: 0;
  transition: transform 0.2s ease, opacity 0.2s ease;
  transition-delay: 0s;
  opacity: 1;
}

.styles-module__settingsPage___6YfHH.styles-module__slideLeft___Ps01J {
  transform: translateX(-24px);
  opacity: 0;
  pointer-events: none;
}

.styles-module__automationsPage___uvCq6 {
  position: absolute;
  top: 0;
  left: 24px;
  width: 100%;
  height: 100%;
  padding: 3px 1rem 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, opacity 0.2s ease;
  opacity: 0;
  pointer-events: none;
}

.styles-module__automationsPage___uvCq6.styles-module__slideIn___4-qXe {
  transform: translateX(-24px);
  opacity: 1;
  pointer-events: auto;
}

.styles-module__settingsNavLink___wCzJt {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: color 0.15s ease;
}
.styles-module__settingsNavLink___wCzJt:hover {
  color: rgba(255, 255, 255, 0.9);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___wCzJt {
  color: rgba(0, 0, 0, 0.5);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___wCzJt:hover {
  color: rgba(0, 0, 0, 0.8);
}
.styles-module__settingsNavLink___wCzJt svg {
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.15s ease;
}
.styles-module__settingsNavLink___wCzJt:hover svg {
  color: #fff;
}
[data-agentation-theme=light] .styles-module__settingsNavLink___wCzJt svg {
  color: rgba(0, 0, 0, 0.25);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___wCzJt:hover svg {
  color: rgba(0, 0, 0, 0.8);
}

.styles-module__settingsNavLinkRight___ZWwhj {
  display: flex;
  align-items: center;
  gap: 6px;
}

.styles-module__mcpNavIndicator___cl9pO {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.styles-module__mcpNavIndicator___cl9pO.styles-module__connected___7c28g {
  background-color: var(--agentation-color-green);
  animation: styles-module__mcpPulse___uNggr 2.5s ease-in-out infinite;
}
.styles-module__mcpNavIndicator___cl9pO.styles-module__connecting___uo-CW {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__mcpPulse___uNggr 1.5s ease-in-out infinite;
}

.styles-module__settingsBackButton___bIe2j {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 0 12px 0;
  margin: -6px 0 0.5rem 0;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 0;
  background: transparent;
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: -0.15px;
  color: #fff;
  cursor: pointer;
  transition: transform 0.12s cubic-bezier(0.32, 0.72, 0, 1);
}
.styles-module__settingsBackButton___bIe2j svg {
  opacity: 0.4;
  flex-shrink: 0;
  transition: opacity 0.15s ease, transform 0.18s cubic-bezier(0.32, 0.72, 0, 1);
}
.styles-module__settingsBackButton___bIe2j:hover {
  border-bottom-color: rgba(255, 255, 255, 0.07);
}
.styles-module__settingsBackButton___bIe2j:hover svg {
  opacity: 1;
}
[data-agentation-theme=light] .styles-module__settingsBackButton___bIe2j {
  color: rgba(0, 0, 0, 0.85);
  border-bottom-color: rgba(0, 0, 0, 0.08);
}
[data-agentation-theme=light] .styles-module__settingsBackButton___bIe2j:hover {
  border-bottom-color: rgba(0, 0, 0, 0.08);
}

.styles-module__automationHeader___InP0r {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  font-size: 0.8125rem;
  font-weight: 400;
  color: #fff;
}
[data-agentation-theme=light] .styles-module__automationHeader___InP0r {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__automationDescription___NKlmo {
  font-size: 0.6875rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
  line-height: 14px;
}
[data-agentation-theme=light] .styles-module__automationDescription___NKlmo {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__learnMoreLink___8xv-x {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: underline dotted;
  text-decoration-color: rgba(255, 255, 255, 0.2);
  text-underline-offset: 2px;
  transition: color 0.15s ease;
}
.styles-module__learnMoreLink___8xv-x:hover {
  color: #fff;
}
[data-agentation-theme=light] .styles-module__learnMoreLink___8xv-x {
  color: rgba(0, 0, 0, 0.6);
  text-decoration-color: rgba(0, 0, 0, 0.2);
}
[data-agentation-theme=light] .styles-module__learnMoreLink___8xv-x:hover {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__autoSendRow___UblX5 {
  display: flex;
  align-items: center;
  gap: 8px;
}

.styles-module__autoSendLabel___icDc2 {
  font-size: 0.6875rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.15s ease;
}
.styles-module__autoSendLabel___icDc2.styles-module__active___-zoN6 {
  color: #66b8ff;
  color: color(display-p3 0.4 0.72 1);
}
[data-agentation-theme=light] .styles-module__autoSendLabel___icDc2 {
  color: rgba(0, 0, 0, 0.4);
}
[data-agentation-theme=light] .styles-module__autoSendLabel___icDc2.styles-module__active___-zoN6 {
  color: var(--agentation-color-blue);
}

.styles-module__webhookUrlInput___2375C {
  display: block;
  width: 100%;
  flex: 1;
  min-height: 60px;
  box-sizing: border-box;
  margin-top: 11px;
  padding: 8px 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.03);
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 400;
  color: #fff;
  outline: none;
  resize: none;
  user-select: text;
  transition: border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;
}
.styles-module__webhookUrlInput___2375C::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
.styles-module__webhookUrlInput___2375C:focus {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.08);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___2375C {
  border-color: rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.03);
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___2375C::placeholder {
  color: rgba(0, 0, 0, 0.3);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___2375C:focus {
  border-color: rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.05);
}

.styles-module__settingsHeader___pwDY9 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
  margin-bottom: 0.5rem;
  padding-bottom: 9px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.styles-module__settingsBrand___0gJeM {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: -0.0094em;
  color: #fff;
  text-decoration: none;
}

.styles-module__settingsBrandSlash___uTG18 {
  color: var(--agentation-color-accent);
  transition: color 0.2s ease;
}

.styles-module__settingsVersion___TUcFq {
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  margin-left: auto;
  letter-spacing: -0.0094em;
}

.styles-module__settingsSection___m-YM2 + .styles-module__settingsSection___m-YM2 {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}
.styles-module__settingsSection___m-YM2.styles-module__settingsSectionExtraPadding___jdhFV {
  padding-top: calc(0.5rem + 4px);
}

.styles-module__settingsSectionGrow___h-5HZ {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.styles-module__settingsRow___3sdhc {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
}
.styles-module__settingsRow___3sdhc.styles-module__settingsRowMarginTop___zA0Sp {
  margin-top: 8px;
}

.styles-module__dropdownContainer___BVnxe {
  position: relative;
}

.styles-module__dropdownButton___16NPz {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
  letter-spacing: -0.0094em;
}
.styles-module__dropdownButton___16NPz:hover {
  background: rgba(255, 255, 255, 0.08);
}
.styles-module__dropdownButton___16NPz svg {
  opacity: 0.6;
}

.styles-module__cycleButton___FMKfw {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  letter-spacing: -0.0094em;
}
[data-agentation-theme=light] .styles-module__cycleButton___FMKfw {
  color: rgba(0, 0, 0, 0.85);
}
.styles-module__cycleButton___FMKfw:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.styles-module__settingsRowDisabled___EgS0V .styles-module__settingsLabel___8UjfX {
  color: rgba(255, 255, 255, 0.2);
}
[data-agentation-theme=light] .styles-module__settingsRowDisabled___EgS0V .styles-module__settingsLabel___8UjfX {
  color: rgba(0, 0, 0, 0.2);
}
.styles-module__settingsRowDisabled___EgS0V .styles-module__toggleSwitch___l4Ygm {
  opacity: 0.4;
  cursor: not-allowed;
}

@keyframes styles-module__cycleTextIn___Q6zJf {
  0% {
    opacity: 0;
    transform: translateY(-6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.styles-module__cycleButtonText___fD1LR {
  display: inline-block;
  animation: styles-module__cycleTextIn___Q6zJf 0.2s ease-out;
}

.styles-module__cycleDots___LWuoQ {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.styles-module__cycleDot___nPgLY {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0.667);
  transition: background-color 0.25s ease-out, transform 0.25s ease-out;
}
.styles-module__cycleDot___nPgLY.styles-module__active___-zoN6 {
  background: #fff;
  transform: scale(1);
}
[data-agentation-theme=light] .styles-module__cycleDot___nPgLY {
  background: rgba(0, 0, 0, 0.2);
}
[data-agentation-theme=light] .styles-module__cycleDot___nPgLY.styles-module__active___-zoN6 {
  background: rgba(0, 0, 0, 0.7);
}

.styles-module__dropdownMenu___k73ER {
  position: absolute;
  right: 0;
  top: calc(100% + 0.25rem);
  background: #1a1a1a;
  border-radius: 0.5rem;
  padding: 0.25rem;
  min-width: 120px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);
  z-index: 10;
  animation: styles-module__scaleIn___c-r1K 0.15s ease-out;
}

.styles-module__dropdownItem___ylsLj {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.625rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  text-align: left;
  transition: background-color 0.15s ease, color 0.15s ease;
  letter-spacing: -0.0094em;
}
.styles-module__dropdownItem___ylsLj:hover {
  background: rgba(255, 255, 255, 0.08);
}
.styles-module__dropdownItem___ylsLj.styles-module__selected___OwRqP {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-weight: 600;
}

.styles-module__settingsLabel___8UjfX {
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: -0.0094em;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  gap: 0.125rem;
}
[data-agentation-theme=light] .styles-module__settingsLabel___8UjfX {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__settingsLabelMarker___ewdtV {
  padding-top: 3px;
  margin-bottom: 10px;
}

.styles-module__settingsOptions___LyrBA {
  display: flex;
  gap: 0.25rem;
}

.styles-module__settingsOption___UNa12 {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.375rem 0.5rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  font-size: 0.6875rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.styles-module__settingsOption___UNa12:hover {
  background: rgba(0, 0, 0, 0.05);
}
.styles-module__settingsOption___UNa12.styles-module__selected___OwRqP {
  background: color-mix(in srgb, var(--agentation-color-blue) 15%, transparent);
  color: var(--agentation-color-blue);
}

.styles-module__sliderContainer___ducXj {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.styles-module__slider___GLdxp {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}
.styles-module__slider___GLdxp::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
.styles-module__slider___GLdxp::-moz-range-thumb {
  width: 14px;
  height: 14px;
  background: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
.styles-module__slider___GLdxp:hover::-webkit-slider-thumb {
  transform: scale(1.15);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}
.styles-module__slider___GLdxp:hover::-moz-range-thumb {
  transform: scale(1.15);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

.styles-module__sliderLabels___FhLDB {
  display: flex;
  justify-content: space-between;
}

.styles-module__sliderLabel___U8sPr {
  font-size: 0.625rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: color 0.15s ease;
}
.styles-module__sliderLabel___U8sPr:hover {
  color: rgba(255, 255, 255, 0.7);
}
.styles-module__sliderLabel___U8sPr.styles-module__active___-zoN6 {
  color: rgba(255, 255, 255, 0.9);
}

.styles-module__colorOptions___iHCNX {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.375rem;
  margin-bottom: 1px;
}

.styles-module__colorOption___IodiY {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid transparent;
  background-color: var(--swatch);
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
}
@supports (color: color(display-p3 0 0 0)) {
  .styles-module__colorOption___IodiY {
    background-color: var(--swatch-p3);
  }
}
.styles-module__colorOption___IodiY:hover {
  transform: scale(1.15);
}
.styles-module__colorOption___IodiY.styles-module__selected___OwRqP {
  transform: scale(0.83);
}

.styles-module__colorOptionRing___U2xpo {
  display: flex;
  width: 24px;
  height: 24px;
  border: 2px solid transparent;
  border-radius: 50%;
  transition: border-color 0.3s ease;
}
.styles-module__colorOptionRing___U2xpo.styles-module__selected___OwRqP {
  border-color: var(--swatch);
}
@supports (color: color(display-p3 0 0 0)) {
  .styles-module__colorOptionRing___U2xpo.styles-module__selected___OwRqP {
    border-color: var(--swatch-p3);
  }
}

.styles-module__settingsToggle___fBrFn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
.styles-module__settingsToggle___fBrFn + .styles-module__settingsToggle___fBrFn {
  margin-top: calc(0.5rem + 6px);
}
.styles-module__settingsToggle___fBrFn input[type=checkbox] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.styles-module__settingsToggle___fBrFn.styles-module__settingsToggleMarginBottom___MZUyF {
  margin-bottom: calc(0.5rem + 6px);
}

.styles-module__customCheckbox___U39ax {
  position: relative;
  width: 14px;
  height: 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background-color 0.25s ease, border-color 0.25s ease;
}
.styles-module__customCheckbox___U39ax svg {
  color: #1a1a1a;
  opacity: 1;
  transition: opacity 0.15s ease;
}
input[type=checkbox]:checked + .styles-module__customCheckbox___U39ax {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgb(255, 255, 255);
}
[data-agentation-theme=light] .styles-module__customCheckbox___U39ax {
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: #fff;
}
[data-agentation-theme=light] .styles-module__customCheckbox___U39ax.styles-module__checked___mnZLo {
  border-color: #1a1a1a;
  background: #1a1a1a;
}
[data-agentation-theme=light] .styles-module__customCheckbox___U39ax.styles-module__checked___mnZLo svg {
  color: #fff;
}

.styles-module__toggleLabel___Xm8Aa {
  font-size: 0.8125rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: -0.0094em;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
[data-agentation-theme=light] .styles-module__toggleLabel___Xm8Aa {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__toggleSwitch___l4Ygm {
  position: relative;
  display: inline-block;
  width: 24px;
  height: 16px;
  flex-shrink: 0;
  cursor: pointer;
  transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.styles-module__toggleSwitch___l4Ygm input {
  opacity: 0;
  width: 0;
  height: 0;
}
.styles-module__toggleSwitch___l4Ygm input:checked + .styles-module__toggleSlider___wprIn {
  background-color: var(--agentation-color-blue);
}
.styles-module__toggleSwitch___l4Ygm input:checked + .styles-module__toggleSlider___wprIn::before {
  transform: translateX(8px);
}
.styles-module__toggleSwitch___l4Ygm.styles-module__disabled___332Jw {
  opacity: 0.4;
}
.styles-module__toggleSwitch___l4Ygm.styles-module__disabled___332Jw .styles-module__toggleSlider___wprIn {
  cursor: not-allowed;
}

.styles-module__toggleSlider___wprIn {
  position: absolute;
  cursor: pointer;
  inset: 0;
  border-radius: 16px;
  background: #484848;
}
[data-agentation-theme=light] .styles-module__toggleSlider___wprIn {
  background: #dddddd;
}
.styles-module__toggleSlider___wprIn::before {
  content: "";
  position: absolute;
  height: 12px;
  width: 12px;
  left: 2px;
  bottom: 2px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes styles-module__mcpPulse___uNggr {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 50%, transparent);
  }
  70% {
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--agentation-color-green) 0%, transparent);
  }
  100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 0%, transparent);
  }
}
@keyframes styles-module__mcpPulseError___fov9B {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-red) 50%, transparent);
  }
  70% {
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--agentation-color-red) 0%, transparent);
  }
  100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-red) 0%, transparent);
  }
}
.styles-module__mcpStatusDot___ibgkc {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.styles-module__mcpStatusDot___ibgkc.styles-module__connecting___uo-CW {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__mcpPulse___uNggr 1.5s infinite;
}
.styles-module__mcpStatusDot___ibgkc.styles-module__connected___7c28g {
  background-color: var(--agentation-color-green);
  animation: styles-module__mcpPulse___uNggr 2.5s ease-in-out infinite;
}
.styles-module__mcpStatusDot___ibgkc.styles-module__disconnected___cHPxR {
  background-color: var(--agentation-color-red);
  animation: styles-module__mcpPulseError___fov9B 2s infinite;
}

.styles-module__drawCanvas___7cG9U {
  position: fixed;
  inset: 0;
  z-index: 99996;
  pointer-events: none !important;
}
.styles-module__drawCanvas___7cG9U.styles-module__active___-zoN6 {
  pointer-events: auto !important;
  cursor: crosshair !important;
}
.styles-module__drawCanvas___7cG9U.styles-module__active___-zoN6[data-stroke-hover] {
  cursor: pointer !important;
}

.styles-module__dragSelection___kZLq2 {
  position: fixed;
  top: 0;
  left: 0;
  border: 2px solid color-mix(in srgb, var(--agentation-color-green) 60%, transparent);
  border-radius: 4px;
  background-color: color-mix(in srgb, var(--agentation-color-green) 8%, transparent);
  pointer-events: none;
  z-index: 99997;
  will-change: transform, width, height;
  contain: layout style;
}

.styles-module__dragCount___KM90j {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--agentation-color-green);
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  min-width: 1.5rem;
  text-align: center;
}

.styles-module__highlightsContainer___-0xzG {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 99996;
}

.styles-module__selectedElementHighlight___fyVlI {
  position: fixed;
  top: 0;
  left: 0;
  border: 2px solid color-mix(in srgb, var(--agentation-color-green) 50%, transparent);
  border-radius: 4px;
  background: color-mix(in srgb, var(--agentation-color-green) 6%, transparent);
  pointer-events: none;
  will-change: transform, width, height;
  contain: layout style;
}

[data-agentation-theme=light] .styles-module__toolbarContainer___dIhma {
  background: #fff;
  color: rgba(0, 0, 0, 0.85);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
}
[data-agentation-theme=light] .styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn:hover {
  background: #f5f5f5;
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc {
  color: rgba(0, 0, 0, 0.5);
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc:hover:not(:disabled):not([data-active=true]):not([data-failed=true]):not([data-auto-sync=true]):not([data-error=true]):not([data-no-hover=true]) {
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-active=true] {
  color: var(--agentation-color-blue);
  background: color-mix(in srgb, var(--agentation-color-blue) 15%, transparent);
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-error=true] {
  color: var(--agentation-color-red);
  background: color-mix(in srgb, var(--agentation-color-red) 15%, transparent);
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-danger]:hover:not(:disabled):not([data-active=true]):not([data-failed=true]) {
  color: var(--agentation-color-red);
  background: color-mix(in srgb, var(--agentation-color-red) 15%, transparent);
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-auto-sync=true] {
  color: var(--agentation-color-green);
  background: transparent;
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-failed=true] {
  color: var(--agentation-color-red);
  background: color-mix(in srgb, var(--agentation-color-red) 15%, transparent);
}
[data-agentation-theme=light] .styles-module__buttonTooltip___Burd9 {
  background: #fff;
  color: rgba(0, 0, 0, 0.85);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
}
[data-agentation-theme=light] .styles-module__buttonTooltip___Burd9::after {
  background: #fff;
}
[data-agentation-theme=light] .styles-module__divider___c--s1 {
  background: rgba(0, 0, 0, 0.1);
}`,G8={toolbar:"styles-module__toolbar___wNsdK",markersLayer:"styles-module__markersLayer___-25j1",fixedMarkersLayer:"styles-module__fixedMarkersLayer___ffyX6",controlsContent:"styles-module__controlsContent___9GJWU",disableTransitions:"styles-module__disableTransitions___EopxO",toolbarContainer:"styles-module__toolbarContainer___dIhma",entrance:"styles-module__entrance___sgHd8",toolbarEnter:"styles-module__toolbarEnter___u8RRu",hiding:"styles-module__hiding___1td44",toolbarHide:"styles-module__toolbarHide___y8kaT",collapsed:"styles-module__collapsed___Rydsn",expanded:"styles-module__expanded___ofKPx",serverConnected:"styles-module__serverConnected___Gfbou",toggleContent:"styles-module__toggleContent___0yfyP",visible:"styles-module__visible___KHwEW",hidden:"styles-module__hidden___Ae8H4",badge:"styles-module__badge___2XsgF",fadeOut:"styles-module__fadeOut___6Ut6-",badgeEnter:"styles-module__badgeEnter___mVQLj",controlButton:"styles-module__controlButton___8Q0jc",statusShowing:"styles-module__statusShowing___te6iu",buttonBadge:"styles-module__buttonBadge___NeFWb",mcpIndicator:"styles-module__mcpIndicator___zGJeL",connected:"styles-module__connected___7c28g",mcpIndicatorPulseConnected:"styles-module__mcpIndicatorPulseConnected___EDodZ",connecting:"styles-module__connecting___uo-CW",mcpIndicatorPulseConnecting:"styles-module__mcpIndicatorPulseConnecting___cCYte",connectionIndicatorWrapper:"styles-module__connectionIndicatorWrapper___L-e-3",connectionIndicator:"styles-module__connectionIndicator___afk9p",connectionIndicatorVisible:"styles-module__connectionIndicatorVisible___C-i5B",connectionIndicatorConnected:"styles-module__connectionIndicatorConnected___IY8pR",connectionPulse:"styles-module__connectionPulse___-Zycw",connectionIndicatorDisconnected:"styles-module__connectionIndicatorDisconnected___kmpaZ",connectionIndicatorConnecting:"styles-module__connectionIndicatorConnecting___QmSLH",buttonWrapper:"styles-module__buttonWrapper___rBcdv",buttonTooltip:"styles-module__buttonTooltip___Burd9",tooltipsInSession:"styles-module__tooltipsInSession___-0lHH",sendButtonWrapper:"styles-module__sendButtonWrapper___UUxG6",sendButtonVisible:"styles-module__sendButtonVisible___WPSQU",shortcut:"styles-module__shortcut___lEAQk",tooltipBelow:"styles-module__tooltipBelow___m6ats",tooltipsHidden:"styles-module__tooltipsHidden___VtLJG",tooltipVisible:"styles-module__tooltipVisible___0jcCv",buttonWrapperAlignLeft:"styles-module__buttonWrapperAlignLeft___myzIp",buttonWrapperAlignRight:"styles-module__buttonWrapperAlignRight___HCQFR",divider:"styles-module__divider___c--s1",overlay:"styles-module__overlay___Q1O9y",hoverHighlight:"styles-module__hoverHighlight___ogakW",enter:"styles-module__enter___WFIki",hoverHighlightIn:"styles-module__hoverHighlightIn___6WYHY",multiSelectOutline:"styles-module__multiSelectOutline___cSJ-m",fadeIn:"styles-module__fadeIn___b9qmf",exit:"styles-module__exit___fyOJ0",singleSelectOutline:"styles-module__singleSelectOutline___QhX-O",hoverTooltip:"styles-module__hoverTooltip___bvLk7",hoverTooltipIn:"styles-module__hoverTooltipIn___FYGQx",hoverReactPath:"styles-module__hoverReactPath___gx1IJ",hoverElementName:"styles-module__hoverElementName___QMLMl",marker:"styles-module__marker___6sQrs",clearing:"styles-module__clearing___FQ--7",markerIn:"styles-module__markerIn___5FaAP",markerOut:"styles-module__markerOut___GU5jX",pending:"styles-module__pending___2IHLC",fixed:"styles-module__fixed___dBMHC",multiSelect:"styles-module__multiSelect___YWiuz",hovered:"styles-module__hovered___ZgXIy",renumber:"styles-module__renumber___nCTxD",renumberRoll:"styles-module__renumberRoll___Wgbq3",markerTooltip:"styles-module__markerTooltip___aLJID",tooltipIn:"styles-module__tooltipIn___0N31w",markerQuote:"styles-module__markerQuote___FHmrz",markerNote:"styles-module__markerNote___QkrrS",markerHint:"styles-module__markerHint___2iF-6",settingsPanel:"styles-module__settingsPanel___OxX3Y",settingsHeader:"styles-module__settingsHeader___pwDY9",settingsBrand:"styles-module__settingsBrand___0gJeM",settingsBrandSlash:"styles-module__settingsBrandSlash___uTG18",settingsVersion:"styles-module__settingsVersion___TUcFq",settingsSection:"styles-module__settingsSection___m-YM2",settingsLabel:"styles-module__settingsLabel___8UjfX",cycleButton:"styles-module__cycleButton___FMKfw",cycleDot:"styles-module__cycleDot___nPgLY",dropdownButton:"styles-module__dropdownButton___16NPz",toggleLabel:"styles-module__toggleLabel___Xm8Aa",customCheckbox:"styles-module__customCheckbox___U39ax",sliderLabel:"styles-module__sliderLabel___U8sPr",slider:"styles-module__slider___GLdxp",themeToggle:"styles-module__themeToggle___2rUjA",settingsOption:"styles-module__settingsOption___UNa12",selected:"styles-module__selected___OwRqP",settingsPanelContainer:"styles-module__settingsPanelContainer___Xksv8",settingsPage:"styles-module__settingsPage___6YfHH",slideLeft:"styles-module__slideLeft___Ps01J",automationsPage:"styles-module__automationsPage___uvCq6",slideIn:"styles-module__slideIn___4-qXe",settingsNavLink:"styles-module__settingsNavLink___wCzJt",settingsNavLinkRight:"styles-module__settingsNavLinkRight___ZWwhj",mcpNavIndicator:"styles-module__mcpNavIndicator___cl9pO",mcpPulse:"styles-module__mcpPulse___uNggr",settingsBackButton:"styles-module__settingsBackButton___bIe2j",automationHeader:"styles-module__automationHeader___InP0r",automationDescription:"styles-module__automationDescription___NKlmo",learnMoreLink:"styles-module__learnMoreLink___8xv-x",autoSendRow:"styles-module__autoSendRow___UblX5",autoSendLabel:"styles-module__autoSendLabel___icDc2",active:"styles-module__active___-zoN6",webhookUrlInput:"styles-module__webhookUrlInput___2375C",settingsSectionExtraPadding:"styles-module__settingsSectionExtraPadding___jdhFV",settingsSectionGrow:"styles-module__settingsSectionGrow___h-5HZ",settingsRow:"styles-module__settingsRow___3sdhc",settingsRowMarginTop:"styles-module__settingsRowMarginTop___zA0Sp",dropdownContainer:"styles-module__dropdownContainer___BVnxe",settingsRowDisabled:"styles-module__settingsRowDisabled___EgS0V",toggleSwitch:"styles-module__toggleSwitch___l4Ygm",cycleButtonText:"styles-module__cycleButtonText___fD1LR",cycleTextIn:"styles-module__cycleTextIn___Q6zJf",cycleDots:"styles-module__cycleDots___LWuoQ",dropdownMenu:"styles-module__dropdownMenu___k73ER",scaleIn:"styles-module__scaleIn___c-r1K",dropdownItem:"styles-module__dropdownItem___ylsLj",settingsLabelMarker:"styles-module__settingsLabelMarker___ewdtV",settingsOptions:"styles-module__settingsOptions___LyrBA",sliderContainer:"styles-module__sliderContainer___ducXj",sliderLabels:"styles-module__sliderLabels___FhLDB",colorOptions:"styles-module__colorOptions___iHCNX",colorOption:"styles-module__colorOption___IodiY",colorOptionRing:"styles-module__colorOptionRing___U2xpo",settingsToggle:"styles-module__settingsToggle___fBrFn",settingsToggleMarginBottom:"styles-module__settingsToggleMarginBottom___MZUyF",checked:"styles-module__checked___mnZLo",toggleSlider:"styles-module__toggleSlider___wprIn",disabled:"styles-module__disabled___332Jw",mcpStatusDot:"styles-module__mcpStatusDot___ibgkc",disconnected:"styles-module__disconnected___cHPxR",mcpPulseError:"styles-module__mcpPulseError___fov9B",drawCanvas:"styles-module__drawCanvas___7cG9U",dragSelection:"styles-module__dragSelection___kZLq2",dragCount:"styles-module__dragCount___KM90j",highlightsContainer:"styles-module__highlightsContainer___-0xzG",selectedElementHighlight:"styles-module__selectedElementHighlight___fyVlI",scaleOut:"styles-module__scaleOut___Wctwz",slideUp:"styles-module__slideUp___kgD36",slideDown:"styles-module__slideDown___zcdje"};if(typeof document<"u"){let i=document.getElementById("feedback-tool-styles-page-toolbar-css-styles");i||(i=document.createElement("style"),i.id="feedback-tool-styles-page-toolbar-css-styles",document.head.appendChild(i)),i.textContent=W8}fe=G8,Sd=[{value:"compact",label:"Compact"},{value:"standard",label:"Standard"},{value:"detailed",label:"Detailed"},{value:"forensic",label:"Forensic"}];Z8=`@keyframes styles-module__markerIn___x4G8D {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.3);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
@keyframes styles-module__markerOut___6VhQN {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.3);
  }
}
@keyframes styles-module__tooltipIn___aJslQ {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(2px) scale(0.891);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(0.909);
  }
}
@keyframes styles-module__renumberRoll___akV9B {
  0% {
    transform: translateX(-40%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
.styles-module__marker___9CKF7 {
  position: absolute;
  width: 22px;
  height: 22px;
  background: var(--agentation-color-blue);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 600;
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(0, 0, 0, 0.04);
  user-select: none;
  will-change: transform, opacity;
  contain: layout style;
  z-index: 1;
}
.styles-module__marker___9CKF7:hover {
  z-index: 2;
}
.styles-module__marker___9CKF7:not(.styles-module__enter___8kI3q):not(.styles-module__exit___KBdR3):not(.styles-module__clearing___8rM7K) {
  transition: background-color 0.15s ease, transform 0.1s ease;
}
.styles-module__marker___9CKF7.styles-module__enter___8kI3q {
  animation: styles-module__markerIn___x4G8D 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.styles-module__marker___9CKF7.styles-module__exit___KBdR3 {
  animation: styles-module__markerOut___6VhQN 0.2s ease-out both;
  pointer-events: none;
}
.styles-module__marker___9CKF7.styles-module__clearing___8rM7K {
  animation: styles-module__markerOut___6VhQN 0.15s ease-out both;
  pointer-events: none;
}
.styles-module__marker___9CKF7:not(.styles-module__enter___8kI3q):not(.styles-module__exit___KBdR3):not(.styles-module__clearing___8rM7K):hover {
  transform: translate(-50%, -50%) scale(1.1);
}
.styles-module__marker___9CKF7.styles-module__pending___BiY-U {
  position: fixed;
  background-color: var(--agentation-color-blue);
  cursor: default;
}
.styles-module__marker___9CKF7.styles-module__fixed___aKrQO {
  position: fixed;
}
.styles-module__marker___9CKF7.styles-module__multiSelect___CPfTC {
  background-color: var(--agentation-color-green);
  width: 26px;
  height: 26px;
  border-radius: 6px;
  font-size: 0.75rem;
}
.styles-module__marker___9CKF7.styles-module__multiSelect___CPfTC.styles-module__pending___BiY-U {
  background-color: var(--agentation-color-green);
}
.styles-module__marker___9CKF7.styles-module__hovered___-mg2N {
  background-color: var(--agentation-color-red);
}

.styles-module__renumber___16lvD {
  display: block;
  animation: styles-module__renumberRoll___akV9B 0.2s ease-out;
}

.styles-module__markerTooltip___-VUm- {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) scale(0.909);
  z-index: 100002;
  background: #1a1a1a;
  padding: 8px 0.75rem;
  border-radius: 0.75rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-weight: 400;
  color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
  min-width: 120px;
  max-width: 200px;
  pointer-events: none;
  cursor: default;
}
.styles-module__markerTooltip___-VUm-.styles-module__enter___8kI3q {
  animation: styles-module__tooltipIn___aJslQ 0.1s ease-out forwards;
}

.styles-module__markerQuote___tQake {
  display: block;
  font-size: 12px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.3125rem;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.styles-module__markerNote___Rh4eI {
  display: block;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 2px;
}

[data-agentation-theme=light] .styles-module__markerTooltip___-VUm- {
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06);
}
[data-agentation-theme=light] .styles-module__markerTooltip___-VUm- .styles-module__markerQuote___tQake {
  color: rgba(0, 0, 0, 0.5);
}
[data-agentation-theme=light] .styles-module__markerTooltip___-VUm- .styles-module__markerNote___Rh4eI {
  color: rgba(0, 0, 0, 0.85);
}`,P8={marker:"styles-module__marker___9CKF7",enter:"styles-module__enter___8kI3q",exit:"styles-module__exit___KBdR3",clearing:"styles-module__clearing___8rM7K",markerIn:"styles-module__markerIn___x4G8D",markerOut:"styles-module__markerOut___6VhQN",pending:"styles-module__pending___BiY-U",fixed:"styles-module__fixed___aKrQO",multiSelect:"styles-module__multiSelect___CPfTC",hovered:"styles-module__hovered___-mg2N",renumber:"styles-module__renumber___16lvD",renumberRoll:"styles-module__renumberRoll___akV9B",markerTooltip:"styles-module__markerTooltip___-VUm-",tooltipIn:"styles-module__tooltipIn___aJslQ",markerQuote:"styles-module__markerQuote___tQake",markerNote:"styles-module__markerNote___Rh4eI"};if(typeof document<"u"){let i=document.getElementById("feedback-tool-styles-annotation-marker-styles");i||(i=document.createElement("style"),i.id="feedback-tool-styles-annotation-marker-styles",document.head.appendChild(i)),i.textContent=Z8}Kn=P8;J8=`.styles-module__switchContainer___Ka-AB {
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px;
  width: 24px;
  height: 16px;
  border-radius: 8px;
  background-color: #cdcdcd;
  transition: background-color 0.15s, opacity 0.15s;
}
[data-agentation-theme=dark] .styles-module__switchContainer___Ka-AB {
  background-color: #484848;
}
.styles-module__switchContainer___Ka-AB:has(.styles-module__switchInput___kYDSD:checked) {
  background-color: var(--agentation-color-blue);
}
.styles-module__switchContainer___Ka-AB:has(.styles-module__switchInput___kYDSD:disabled) {
  opacity: 0.3;
}

.styles-module__switchInput___kYDSD {
  position: absolute;
  z-index: 1;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  cursor: pointer;
}
.styles-module__switchInput___kYDSD:disabled {
  cursor: not-allowed;
}

.styles-module__switchThumb___4sCPH {
  border-radius: 50%;
  width: 12px;
  height: 12px;
  background-color: #fff;
  transition: transform 0.15s;
}
.styles-module__switchContainer___Ka-AB:has(.styles-module__switchInput___kYDSD:checked) .styles-module__switchThumb___4sCPH {
  transform: translateX(8px);
}`,K8={switchContainer:"styles-module__switchContainer___Ka-AB",switchInput:"styles-module__switchInput___kYDSD",switchThumb:"styles-module__switchThumb___4sCPH"};if(typeof document<"u"){let i=document.getElementById("feedback-tool-styles-switch-styles");i||(i=document.createElement("style"),i.id="feedback-tool-styles-switch-styles",document.head.appendChild(i)),i.textContent=J8}bp=K8,vp=({className:i="",...s})=>(0,Ed.jsxs)("div",{className:`${bp.switchContainer} ${i}`,children:[(0,Ed.jsx)("input",{className:bp.switchInput,type:"checkbox",...s}),(0,Ed.jsx)("div",{className:bp.switchThumb})]}),e7=`.styles-module__checkboxContainer___joqZk {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px solid rgba(26, 26, 26, 0.2);
  border-radius: 4px;
  width: 14px;
  height: 14px;
  background-color: #fff;
  transition: background-color 0.2s ease;
}
[data-agentation-theme=dark] .styles-module__checkboxContainer___joqZk {
  border-color: rgba(255, 255, 255, 0.2);
  background-color: #252525;
}
.styles-module__checkboxContainer___joqZk:has(.styles-module__checkboxInput___ECzzO:checked) {
  background-color: #1a1a1a;
}
[data-agentation-theme=dark] .styles-module__checkboxContainer___joqZk:has(.styles-module__checkboxInput___ECzzO:checked) {
  background-color: #fff;
}

.styles-module__checkboxInput___ECzzO {
  position: absolute;
  z-index: 1;
  inset: -1px;
  border-radius: inherit;
  opacity: 0;
  cursor: pointer;
}

.styles-module__checkboxCheck___fUXpr {
  color: #fafafa;
}
[data-agentation-theme=dark] .styles-module__checkboxCheck___fUXpr {
  color: #1a1a1a;
}

.styles-module__checkboxCheckPath___cDyh8 {
  stroke-dasharray: 9.29px;
  stroke-dashoffset: 9.29px;
  color: #fafafa;
  transition: stroke-dashoffset 0.1s ease;
}
[data-agentation-theme=dark] .styles-module__checkboxCheckPath___cDyh8 {
  color: #1a1a1a;
}
.styles-module__checkboxContainer___joqZk:has(.styles-module__checkboxInput___ECzzO:checked) .styles-module__checkboxCheckPath___cDyh8 {
  transition-duration: 0.2s;
  stroke-dashoffset: 0;
}`,t7={checkboxContainer:"styles-module__checkboxContainer___joqZk",checkboxInput:"styles-module__checkboxInput___ECzzO",checkboxCheck:"styles-module__checkboxCheck___fUXpr",checkboxCheckPath:"styles-module__checkboxCheckPath___cDyh8"};if(typeof document<"u"){let i=document.getElementById("feedback-tool-styles-checkbox-styles");i||(i=document.createElement("style"),i.id="feedback-tool-styles-checkbox-styles",document.head.appendChild(i)),i.textContent=e7}Zh=t7,n7=({className:i="",...s})=>(0,Dc.jsxs)("div",{className:`${Zh.checkboxContainer} ${i}`,children:[(0,Dc.jsx)("input",{className:Zh.checkboxInput,type:"checkbox",...s}),(0,Dc.jsx)("svg",{className:Zh.checkboxCheck,width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",children:(0,Dc.jsx)("path",{className:Zh.checkboxCheckPath,d:"M3.94 7L6.13 9.19L10.5 4.81",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]}),o7=`.styles-module__container___w8eAF {
  display: flex;
  align-items: center;
  height: 24px;
}

.styles-module__label___J5mxE {
  padding-inline: 8px 2px;
  line-height: 20px;
  font-size: 13px;
  letter-spacing: -0.15px;
  color: rgba(26, 26, 26, 0.5);
  cursor: pointer;
}
[data-agentation-theme=dark] .styles-module__label___J5mxE {
  color: rgba(255, 255, 255, 0.5);
}`,l7={container:"styles-module__container___w8eAF",label:"styles-module__label___J5mxE"};if(typeof document<"u"){let i=document.getElementById("feedback-tool-styles-checkbox-field-styles");i||(i=document.createElement("style"),i.id="feedback-tool-styles-checkbox-field-styles",document.head.appendChild(i)),i.textContent=o7}ov=l7,lv=({className:i="",label:s,tooltip:u,checked:f,onChange:h,...y})=>{let k=(0,Cv.useId)();return(0,Ac.jsxs)("div",{className:`${ov.container} ${i}`,...y,children:[(0,Ac.jsx)(n7,{id:k,onChange:h,checked:f}),(0,Ac.jsx)("label",{className:ov.label,htmlFor:k,children:s}),u&&(0,Ac.jsx)(ss,{content:u})]})},a7=`@keyframes styles-module__cycleTextIn___VBNTi {
  0% {
    opacity: 0;
    transform: translateY(-6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes styles-module__scaleIn___QpQ8E {
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__mcpPulse___5Q3Jj {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 50%, transparent);
  }
  70% {
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--agentation-color-green) 0%, transparent);
  }
  100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 0%, transparent);
  }
}
@keyframes styles-module__mcpPulseError___VHxhx {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-red) 50%, transparent);
  }
  70% {
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--agentation-color-red) 0%, transparent);
  }
  100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-red) 0%, transparent);
  }
}
@keyframes styles-module__themeIconIn___qUWMV {
  0% {
    opacity: 0;
    transform: scale(0.8) rotate(-30deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}
.styles-module__settingsPanel___qNkn- {
  position: absolute;
  right: 5px;
  bottom: calc(100% + 0.5rem);
  z-index: 1;
  overflow: hidden;
  background: #1c1c1c;
  border-radius: 16px;
  padding: 12px 0;
  width: 100%;
  max-width: 253px;
  min-width: 205px;
  cursor: default;
  opacity: 1;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.04);
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
}
.styles-module__settingsPanel___qNkn-::before, .styles-module__settingsPanel___qNkn-::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 16px;
  z-index: 2;
  pointer-events: none;
}
.styles-module__settingsPanel___qNkn-::before {
  left: 0;
  background: linear-gradient(to right, #1c1c1c 0%, transparent 100%);
}
.styles-module__settingsPanel___qNkn-::after {
  right: 0;
  background: linear-gradient(to left, #1c1c1c 0%, transparent 100%);
}
.styles-module__settingsPanel___qNkn- .styles-module__settingsHeader___Fn1DP,
.styles-module__settingsPanel___qNkn- .styles-module__settingsBrand___OoKlM,
.styles-module__settingsPanel___qNkn- .styles-module__settingsBrandSlash___Q-AU9,
.styles-module__settingsPanel___qNkn- .styles-module__settingsVersion___rXmL9,
.styles-module__settingsPanel___qNkn- .styles-module__settingsSection___n5V-4,
.styles-module__settingsPanel___qNkn- .styles-module__settingsLabel___VCVOQ,
.styles-module__settingsPanel___qNkn- .styles-module__cycleButton___XMBx3,
.styles-module__settingsPanel___qNkn- .styles-module__cycleDot___zgSXY,
.styles-module__settingsPanel___qNkn- .styles-module__dropdownButton___mKHe8,
.styles-module__settingsPanel___qNkn- .styles-module__sliderLabel___6K5v1,
.styles-module__settingsPanel___qNkn- .styles-module__slider___v5z-c,
.styles-module__settingsPanel___qNkn- .styles-module__themeToggle___3imlT {
  transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}
.styles-module__settingsPanel___qNkn-.styles-module__enter___wginS {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0px);
  transition: opacity 0.2s ease, transform 0.2s ease, filter 0.2s ease;
}
.styles-module__settingsPanel___qNkn-.styles-module__exit___A4iJc {
  opacity: 0;
  transform: translateY(8px) scale(0.95);
  filter: blur(5px);
  pointer-events: none;
  transition: opacity 0.1s ease, transform 0.1s ease, filter 0.1s ease;
}
[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- {
  background: #1a1a1a;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- .styles-module__settingsLabel___VCVOQ {
  color: rgba(255, 255, 255, 0.6);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- .styles-module__settingsOption___JoyH- {
  color: rgba(255, 255, 255, 0.85);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- .styles-module__settingsOption___JoyH-:hover {
  background: rgba(255, 255, 255, 0.1);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- .styles-module__settingsOption___JoyH-.styles-module__selected___k1-Vq {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.styles-module__settingsPanelContainer___5it-H {
  overflow: visible;
  position: relative;
  display: flex;
  padding: 0 16px;
}

.styles-module__settingsPage___BMn-3 {
  min-width: 100%;
  flex-basis: 0;
  flex-shrink: 0;
  transition: transform 0.2s ease, opacity 0.2s ease;
  transition-delay: 0s;
  opacity: 1;
}

.styles-module__settingsPage___BMn-3.styles-module__slideLeft___qUvW4 {
  transform: translateX(-24px);
  opacity: 0;
  pointer-events: none;
}

.styles-module__automationsPage___N7By0 {
  position: absolute;
  top: 0;
  left: 24px;
  width: 100%;
  height: 100%;
  padding: 0 16px 4px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, opacity 0.2s ease;
  opacity: 0;
  pointer-events: none;
}

.styles-module__automationsPage___N7By0.styles-module__slideIn___uXDSu {
  transform: translateX(-24px);
  opacity: 1;
  pointer-events: auto;
}

.styles-module__settingsHeader___Fn1DP {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 24px;
}

.styles-module__settingsBrand___OoKlM {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: -0.0094em;
  color: #fff;
  text-decoration: none;
}

.styles-module__settingsBrandSlash___Q-AU9 {
  color: var(--agentation-color-accent);
  transition: color 0.2s ease;
}

.styles-module__settingsVersion___rXmL9 {
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  margin-left: auto;
  letter-spacing: -0.0094em;
}

.styles-module__themeToggle___3imlT {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  margin-left: 8px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: rgba(255, 255, 255, 0.4);
  transition: background-color 0.15s ease, color 0.15s ease;
  cursor: pointer;
}
.styles-module__themeToggle___3imlT:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}
[data-agentation-theme=light] .styles-module__themeToggle___3imlT {
  color: rgba(0, 0, 0, 0.4);
}
[data-agentation-theme=light] .styles-module__themeToggle___3imlT:hover {
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.7);
}

.styles-module__themeIconWrapper___pyaYa {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 20px;
  height: 20px;
}

.styles-module__themeIcon___w7lAm {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: styles-module__themeIconIn___qUWMV 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.styles-module__settingsSectionGrow___eZTRw {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.styles-module__settingsRow___y-tDE {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
}
.styles-module__settingsRow___y-tDE.styles-module__settingsRowMarginTop___uLpGb {
  margin-top: 8px;
}

.styles-module__settingsRowDisabled___ydl3Q .styles-module__settingsLabel___VCVOQ {
  color: rgba(255, 255, 255, 0.2);
}
[data-agentation-theme=light] .styles-module__settingsRowDisabled___ydl3Q .styles-module__settingsLabel___VCVOQ {
  color: rgba(0, 0, 0, 0.2);
}

.styles-module__settingsLabel___VCVOQ {
  display: flex;
  align-items: center;
  column-gap: 2px;
  line-height: 20px;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: -0.15px;
  color: rgba(255, 255, 255, 0.5);
}
[data-agentation-theme=light] .styles-module__settingsLabel___VCVOQ {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__cycleButton___XMBx3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  letter-spacing: -0.0094em;
}
[data-agentation-theme=light] .styles-module__cycleButton___XMBx3 {
  color: rgba(0, 0, 0, 0.85);
}
.styles-module__cycleButton___XMBx3:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.styles-module__cycleButtonText___mbbnD {
  display: inline-block;
  animation: styles-module__cycleTextIn___VBNTi 0.2s ease-out;
}

.styles-module__cycleDots___ehp6i {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.styles-module__cycleDot___zgSXY {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0.667);
  transition: background-color 0.25s ease-out, transform 0.25s ease-out;
}
.styles-module__cycleDot___zgSXY.styles-module__active___dpAhM {
  background: #fff;
  transform: scale(1);
}
[data-agentation-theme=light] .styles-module__cycleDot___zgSXY {
  background: rgba(0, 0, 0, 0.2);
}
[data-agentation-theme=light] .styles-module__cycleDot___zgSXY.styles-module__active___dpAhM {
  background: rgba(0, 0, 0, 0.7);
}

.styles-module__colorOptions___pbxZx {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
  height: 26px;
}

.styles-module__colorOption___Co955 {
  padding: 0;
  position: relative;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-color: #fff;
  cursor: pointer;
}
[data-agentation-theme=dark] .styles-module__colorOption___Co955 {
  background-color: #1a1a1a;
}
.styles-module__colorOption___Co955::before, .styles-module__colorOption___Co955::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background-color: var(--swatch);
  transition: opacity 0.2s, transform 0.2s;
}
@supports (color: color(display-p3 0 0 0)) {
  .styles-module__colorOption___Co955::before, .styles-module__colorOption___Co955::after {
    --color: var(--swatch-p3);
  }
}
.styles-module__colorOption___Co955::after {
  z-index: -1;
  transform: scale(1.2);
  opacity: 0;
}
.styles-module__colorOption___Co955.styles-module__selected___k1-Vq::before {
  transform: scale(0.8);
}
.styles-module__colorOption___Co955.styles-module__selected___k1-Vq::after {
  opacity: 1;
}

.styles-module__settingsNavLink___uYIwM {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  font-family: inherit;
  line-height: 20px;
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.15s ease;
  cursor: pointer;
}
.styles-module__settingsNavLink___uYIwM:hover {
  color: rgba(255, 255, 255, 0.9);
}
.styles-module__settingsNavLink___uYIwM svg {
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.15s ease;
}
.styles-module__settingsNavLink___uYIwM:hover svg {
  color: #fff;
}
[data-agentation-theme=light] .styles-module__settingsNavLink___uYIwM {
  color: rgba(0, 0, 0, 0.5);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___uYIwM:hover {
  color: rgba(0, 0, 0, 0.8);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___uYIwM svg {
  color: rgba(0, 0, 0, 0.25);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___uYIwM:hover svg {
  color: rgba(0, 0, 0, 0.8);
}

.styles-module__settingsNavLinkRight___XBUzC {
  display: flex;
  align-items: center;
  gap: 6px;
}

.styles-module__settingsBackButton___fflll {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 24px;
  background: transparent;
  font-family: inherit;
  line-height: 20px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.15px;
  color: #fff;
  cursor: pointer;
  transition: transform 0.12s cubic-bezier(0.32, 0.72, 0, 1);
}
.styles-module__settingsBackButton___fflll svg {
  opacity: 0.4;
  flex-shrink: 0;
  transition: opacity 0.15s ease, transform 0.18s cubic-bezier(0.32, 0.72, 0, 1);
}
.styles-module__settingsBackButton___fflll:hover svg {
  opacity: 1;
}
[data-agentation-theme=light] .styles-module__settingsBackButton___fflll {
  color: rgba(0, 0, 0, 0.85);
  border-bottom-color: rgba(0, 0, 0, 0.08);
}

.styles-module__automationHeader___Avra9 {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  font-size: 0.8125rem;
  font-weight: 400;
  color: #fff;
}
[data-agentation-theme=light] .styles-module__automationHeader___Avra9 {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__automationDescription___vFTmJ {
  font-size: 0.6875rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
  line-height: 14px;
}
[data-agentation-theme=light] .styles-module__automationDescription___vFTmJ {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__learnMoreLink___cG7OI {
  color: rgba(255, 255, 255, 0.8);
  text-decoration-line: underline;
  text-decoration-style: dotted;
  text-decoration-color: rgba(255, 255, 255, 0.2);
  text-underline-offset: 2px;
  transition: color 0.15s ease;
}
.styles-module__learnMoreLink___cG7OI:hover {
  color: #fff;
}
[data-agentation-theme=light] .styles-module__learnMoreLink___cG7OI {
  color: rgba(0, 0, 0, 0.6);
  text-decoration-color: rgba(0, 0, 0, 0.2);
}
[data-agentation-theme=light] .styles-module__learnMoreLink___cG7OI:hover {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__autoSendContainer___VpkXk {
  display: flex;
  align-items: center;
}

.styles-module__autoSendLabel___ngNdC {
  padding-inline-end: 8px;
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.15s, opacity 0.15s;
  cursor: pointer;
}
.styles-module__autoSendLabel___ngNdC.styles-module__active___dpAhM {
  color: #66b8ff;
  color: color(display-p3 0.4 0.72 1);
}
[data-agentation-theme=light] .styles-module__autoSendLabel___ngNdC {
  color: rgba(0, 0, 0, 0.4);
}
[data-agentation-theme=light] .styles-module__autoSendLabel___ngNdC.styles-module__active___dpAhM {
  color: var(--agentation-color-blue);
}
.styles-module__autoSendLabel___ngNdC.styles-module__disabled___9AZYS {
  opacity: 0.3;
  cursor: not-allowed;
}

.styles-module__mcpStatusDot___8AMxP {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.styles-module__mcpStatusDot___8AMxP.styles-module__connecting___QEO1r {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__mcpPulse___5Q3Jj 1.5s infinite;
}
.styles-module__mcpStatusDot___8AMxP.styles-module__connected___WyFkx {
  background-color: var(--agentation-color-green);
  animation: styles-module__mcpPulse___5Q3Jj 2.5s ease-in-out infinite;
}
.styles-module__mcpStatusDot___8AMxP.styles-module__disconnected___mvmvQ {
  background-color: var(--agentation-color-red);
  animation: styles-module__mcpPulseError___VHxhx 2s infinite;
}

.styles-module__mcpNavIndicator___auBHI {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.styles-module__mcpNavIndicator___auBHI.styles-module__connected___WyFkx {
  background-color: var(--agentation-color-green);
  animation: styles-module__mcpPulse___5Q3Jj 2.5s ease-in-out infinite;
}
.styles-module__mcpNavIndicator___auBHI.styles-module__connecting___QEO1r {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__mcpPulse___5Q3Jj 1.5s ease-in-out infinite;
}

.styles-module__webhookUrlInput___WDDDC {
  display: block;
  width: 100%;
  flex: 1;
  min-height: 60px;
  box-sizing: border-box;
  margin-top: 11px;
  padding: 8px 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.03);
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 400;
  color: #fff;
  outline: none;
  resize: none;
  user-select: text;
  transition: border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;
}
.styles-module__webhookUrlInput___WDDDC::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
.styles-module__webhookUrlInput___WDDDC:focus {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.08);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___WDDDC {
  border-color: rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.03);
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___WDDDC::placeholder {
  color: rgba(0, 0, 0, 0.3);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___WDDDC:focus {
  border-color: rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.05);
}

[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn-::before {
  background: linear-gradient(to right, #fff 0%, transparent 100%);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn-::after {
  background: linear-gradient(to left, #fff 0%, transparent 100%);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsHeader___Fn1DP {
  border-bottom-color: rgba(0, 0, 0, 0.08);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsBrand___OoKlM {
  color: #E5484D;
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsVersion___rXmL9 {
  color: rgba(0, 0, 0, 0.4);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsSection___n5V-4 {
  border-top-color: rgba(0, 0, 0, 0.08);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsLabel___VCVOQ {
  color: rgba(0, 0, 0, 0.5);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__cycleButton___XMBx3 {
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__cycleDot___zgSXY {
  background: rgba(0, 0, 0, 0.2);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__cycleDot___zgSXY.styles-module__active___dpAhM {
  background: rgba(0, 0, 0, 0.7);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__dropdownButton___mKHe8 {
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__dropdownButton___mKHe8:hover {
  background: rgba(0, 0, 0, 0.05);
}

.styles-module__checkboxField___ZrSqv:not(:first-child) {
  margin-top: 8px;
}

.styles-module__divider___h6Yux {
  margin-block: 8px;
  width: 100%;
  height: 1px;
  background-color: rgba(26, 26, 26, 0.07);
}
[data-agentation-theme=dark] .styles-module__divider___h6Yux {
  background-color: rgba(255, 255, 255, 0.07);
}`,i7={settingsPanel:"styles-module__settingsPanel___qNkn-",settingsHeader:"styles-module__settingsHeader___Fn1DP",settingsBrand:"styles-module__settingsBrand___OoKlM",settingsBrandSlash:"styles-module__settingsBrandSlash___Q-AU9",settingsVersion:"styles-module__settingsVersion___rXmL9",settingsSection:"styles-module__settingsSection___n5V-4",settingsLabel:"styles-module__settingsLabel___VCVOQ",cycleButton:"styles-module__cycleButton___XMBx3",cycleDot:"styles-module__cycleDot___zgSXY",dropdownButton:"styles-module__dropdownButton___mKHe8",sliderLabel:"styles-module__sliderLabel___6K5v1",slider:"styles-module__slider___v5z-c",themeToggle:"styles-module__themeToggle___3imlT",enter:"styles-module__enter___wginS",exit:"styles-module__exit___A4iJc",settingsOption:"styles-module__settingsOption___JoyH-",selected:"styles-module__selected___k1-Vq",settingsPanelContainer:"styles-module__settingsPanelContainer___5it-H",settingsPage:"styles-module__settingsPage___BMn-3",slideLeft:"styles-module__slideLeft___qUvW4",automationsPage:"styles-module__automationsPage___N7By0",slideIn:"styles-module__slideIn___uXDSu",themeIconWrapper:"styles-module__themeIconWrapper___pyaYa",themeIcon:"styles-module__themeIcon___w7lAm",themeIconIn:"styles-module__themeIconIn___qUWMV",settingsSectionGrow:"styles-module__settingsSectionGrow___eZTRw",settingsRow:"styles-module__settingsRow___y-tDE",settingsRowMarginTop:"styles-module__settingsRowMarginTop___uLpGb",settingsRowDisabled:"styles-module__settingsRowDisabled___ydl3Q",cycleButtonText:"styles-module__cycleButtonText___mbbnD",cycleTextIn:"styles-module__cycleTextIn___VBNTi",cycleDots:"styles-module__cycleDots___ehp6i",active:"styles-module__active___dpAhM",colorOptions:"styles-module__colorOptions___pbxZx",colorOption:"styles-module__colorOption___Co955",settingsNavLink:"styles-module__settingsNavLink___uYIwM",settingsNavLinkRight:"styles-module__settingsNavLinkRight___XBUzC",settingsBackButton:"styles-module__settingsBackButton___fflll",automationHeader:"styles-module__automationHeader___Avra9",automationDescription:"styles-module__automationDescription___vFTmJ",learnMoreLink:"styles-module__learnMoreLink___cG7OI",autoSendContainer:"styles-module__autoSendContainer___VpkXk",autoSendLabel:"styles-module__autoSendLabel___ngNdC",disabled:"styles-module__disabled___9AZYS",mcpStatusDot:"styles-module__mcpStatusDot___8AMxP",connecting:"styles-module__connecting___QEO1r",mcpPulse:"styles-module__mcpPulse___5Q3Jj",connected:"styles-module__connected___WyFkx",disconnected:"styles-module__disconnected___mvmvQ",mcpPulseError:"styles-module__mcpPulseError___VHxhx",mcpNavIndicator:"styles-module__mcpNavIndicator___auBHI",webhookUrlInput:"styles-module__webhookUrlInput___WDDDC",checkboxField:"styles-module__checkboxField___ZrSqv",divider:"styles-module__divider___h6Yux",scaleIn:"styles-module__scaleIn___QpQ8E"};if(typeof document<"u"){let i=document.getElementById("feedback-tool-styles-settings-panel-styles");i||(i=document.createElement("style"),i.id="feedback-tool-styles-settings-panel-styles",document.head.appendChild(i)),i.textContent=a7}je=i7;av=!1,wp={outputDetail:"standard",autoClearAfterCopy:!1,annotationColorId:"blue",blockInteractions:!0,reactEnabled:!0,markerClickBehavior:"edit",webhookUrl:"",webhooksEnabled:!0},Xa=i=>{if(!i||!i.trim())return!1;try{let s=new URL(i.trim());return s.protocol==="http:"||s.protocol==="https:"}catch{return!1}},s7={compact:"off",standard:"filtered",detailed:"smart",forensic:"all"},Cd=[{id:"indigo",label:"Indigo",srgb:"#6155F5",p3:"color(display-p3 0.38 0.33 0.96)"},{id:"blue",label:"Blue",srgb:"#0088FF",p3:"color(display-p3 0.00 0.53 1.00)"},{id:"cyan",label:"Cyan",srgb:"#00C3D0",p3:"color(display-p3 0.00 0.76 0.82)"},{id:"green",label:"Green",srgb:"#34C759",p3:"color(display-p3 0.20 0.78 0.35)"},{id:"yellow",label:"Yellow",srgb:"#FFCC00",p3:"color(display-p3 1.00 0.80 0.00)"},{id:"orange",label:"Orange",srgb:"#FF8D28",p3:"color(display-p3 1.00 0.55 0.16)"},{id:"red",label:"Red",srgb:"#FF383C",p3:"color(display-p3 1.00 0.22 0.24)"}],c7=()=>{if(typeof document>"u"||document.getElementById("agentation-color-tokens"))return;let i=document.createElement("style");i.id="agentation-color-tokens",i.textContent=[...Cd.map(s=>`
      [data-agentation-accent="${s.id}"] {
        --agentation-color-accent: ${s.srgb};
      }

      @supports (color: color(display-p3 0 0 0)) {
        [data-agentation-accent="${s.id}"] {
          --agentation-color-accent: ${s.p3};
        }
      }
    `),`:root {
      ${Cd.map(s=>`--agentation-color-${s.id}: ${s.srgb};`).join(`
`)}
    }`,`@supports (color: color(display-p3 0 0 0)) {
      :root {
        ${Cd.map(s=>`--agentation-color-${s.id}: ${s.p3};`).join(`
`)}
      }
    }`].join(""),document.head.appendChild(i)};c7()});var u7=ha(()=>{var Mv=kn(Dl()),Tv=kn(Ob());Ev();if(typeof document<"u"){let i=()=>{let s=document.getElementById("agentation-root");s||(s=document.createElement("div"),s.id="agentation-root",document.body.appendChild(s)),(0,Tv.createRoot)(s).render(Mv.default.createElement(kv))};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",i):i()}});u7();})();
/*! Bundled license information:

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.development.js:
  (**
   * @license React
   * scheduler.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.development.js:
  (**
   * @license React
   * react-dom.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.development.js:
  (**
   * @license React
   * react-dom-client.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
