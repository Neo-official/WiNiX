"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[462],{3610:(e,t,n)=>{n.d(t,{m:()=>r});function r(e,t,{checkForDefaultPrevented:n=!0}={}){return function(r){if(e?.(r),!1===n||!r.defaultPrevented)return t?.(r)}}},9741:(e,t,n)=>{n.d(t,{N:()=>s});var r=n(2115),o=n(8166),i=n(8068),u=n(2317),l=n(5155);function s(e){let t=e+"CollectionProvider",[n,s]=(0,o.A)(t),[a,d]=n(t,{collectionRef:{current:null},itemMap:new Map}),c=e=>{let{scope:t,children:n}=e,o=r.useRef(null),i=r.useRef(new Map).current;return(0,l.jsx)(a,{scope:t,itemMap:i,collectionRef:o,children:n})};c.displayName=t;let f=e+"CollectionSlot",v=r.forwardRef((e,t)=>{let{scope:n,children:r}=e,o=d(f,n),s=(0,i.s)(t,o.collectionRef);return(0,l.jsx)(u.DX,{ref:s,children:r})});v.displayName=f;let m=e+"CollectionItemSlot",p="data-radix-collection-item",y=r.forwardRef((e,t)=>{let{scope:n,children:o,...s}=e,a=r.useRef(null),c=(0,i.s)(t,a),f=d(m,n);return r.useEffect(()=>(f.itemMap.set(a,{ref:a,...s}),()=>void f.itemMap.delete(a))),(0,l.jsx)(u.DX,{[p]:"",ref:c,children:o})});return y.displayName=m,[{Provider:c,Slot:v,ItemSlot:y},function(t){let n=d(e+"CollectionConsumer",t);return r.useCallback(()=>{let e=n.collectionRef.current;if(!e)return[];let t=Array.from(e.querySelectorAll("[".concat(p,"]")));return Array.from(n.itemMap.values()).sort((e,n)=>t.indexOf(e.ref.current)-t.indexOf(n.ref.current))},[n.collectionRef,n.itemMap])},s]}},8166:(e,t,n)=>{n.d(t,{A:()=>u,q:()=>i});var r=n(2115),o=n(5155);function i(e,t){let n=r.createContext(t),i=e=>{let{children:t,...i}=e,u=r.useMemo(()=>i,Object.values(i));return(0,o.jsx)(n.Provider,{value:u,children:t})};return i.displayName=e+"Provider",[i,function(o){let i=r.useContext(n);if(i)return i;if(void 0!==t)return t;throw Error(`\`${o}\` must be used within \`${e}\``)}]}function u(e,t=[]){let n=[],i=()=>{let t=n.map(e=>r.createContext(e));return function(n){let o=n?.[e]||t;return r.useMemo(()=>({[`__scope${e}`]:{...n,[e]:o}}),[n,o])}};return i.scopeName=e,[function(t,i){let u=r.createContext(i),l=n.length;n=[...n,i];let s=t=>{let{scope:n,children:i,...s}=t,a=n?.[e]?.[l]||u,d=r.useMemo(()=>s,Object.values(s));return(0,o.jsx)(a.Provider,{value:d,children:i})};return s.displayName=t+"Provider",[s,function(n,o){let s=o?.[e]?.[l]||u,a=r.useContext(s);if(a)return a;if(void 0!==i)return i;throw Error(`\`${n}\` must be used within \`${t}\``)}]},function(...e){let t=e[0];if(1===e.length)return t;let n=()=>{let n=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(e){let o=n.reduce((t,{useScope:n,scopeName:r})=>{let o=n(e)[`__scope${r}`];return{...t,...o}},{});return r.useMemo(()=>({[`__scope${t.scopeName}`]:o}),[o])}};return n.scopeName=t.scopeName,n}(i,...t)]}},9674:(e,t,n)=>{n.d(t,{lg:()=>E,qW:()=>f,bL:()=>y});var r,o=n(2115),i=n(3610),u=n(3360),l=n(8068),s=n(1524),a=n(5155),d="dismissableLayer.update",c=o.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),f=o.forwardRef((e,t)=>{var n,f;let{disableOutsidePointerEvents:v=!1,onEscapeKeyDown:y,onPointerDownOutside:E,onFocusOutside:b,onInteractOutside:w,onDismiss:h,...N}=e,g=o.useContext(c),[C,O]=o.useState(null),P=null!==(f=null==C?void 0:C.ownerDocument)&&void 0!==f?f:null===(n=globalThis)||void 0===n?void 0:n.document,[,R]=o.useState({}),M=(0,l.s)(t,e=>O(e)),L=Array.from(g.layers),[D]=[...g.layersWithOutsidePointerEventsDisabled].slice(-1),x=L.indexOf(D),T=C?L.indexOf(C):-1,S=g.layersWithOutsidePointerEventsDisabled.size>0,A=T>=x,k=function(e){var t;let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null===(t=globalThis)||void 0===t?void 0:t.document,r=(0,s.c)(e),i=o.useRef(!1),u=o.useRef(()=>{});return o.useEffect(()=>{let e=e=>{if(e.target&&!i.current){let t=function(){p("dismissableLayer.pointerDownOutside",r,o,{discrete:!0})},o={originalEvent:e};"touch"===e.pointerType?(n.removeEventListener("click",u.current),u.current=t,n.addEventListener("click",u.current,{once:!0})):t()}else n.removeEventListener("click",u.current);i.current=!1},t=window.setTimeout(()=>{n.addEventListener("pointerdown",e)},0);return()=>{window.clearTimeout(t),n.removeEventListener("pointerdown",e),n.removeEventListener("click",u.current)}},[n,r]),{onPointerDownCapture:()=>i.current=!0}}(e=>{let t=e.target,n=[...g.branches].some(e=>e.contains(t));!A||n||(null==E||E(e),null==w||w(e),e.defaultPrevented||null==h||h())},P),_=function(e){var t;let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null===(t=globalThis)||void 0===t?void 0:t.document,r=(0,s.c)(e),i=o.useRef(!1);return o.useEffect(()=>{let e=e=>{e.target&&!i.current&&p("dismissableLayer.focusOutside",r,{originalEvent:e},{discrete:!1})};return n.addEventListener("focusin",e),()=>n.removeEventListener("focusin",e)},[n,r]),{onFocusCapture:()=>i.current=!0,onBlurCapture:()=>i.current=!1}}(e=>{let t=e.target;[...g.branches].some(e=>e.contains(t))||(null==b||b(e),null==w||w(e),e.defaultPrevented||null==h||h())},P);return!function(e,t=globalThis?.document){let n=(0,s.c)(e);o.useEffect(()=>{let e=e=>{"Escape"===e.key&&n(e)};return t.addEventListener("keydown",e,{capture:!0}),()=>t.removeEventListener("keydown",e,{capture:!0})},[n,t])}(e=>{T!==g.layers.size-1||(null==y||y(e),!e.defaultPrevented&&h&&(e.preventDefault(),h()))},P),o.useEffect(()=>{if(C)return v&&(0===g.layersWithOutsidePointerEventsDisabled.size&&(r=P.body.style.pointerEvents,P.body.style.pointerEvents="none"),g.layersWithOutsidePointerEventsDisabled.add(C)),g.layers.add(C),m(),()=>{v&&1===g.layersWithOutsidePointerEventsDisabled.size&&(P.body.style.pointerEvents=r)}},[C,P,v,g]),o.useEffect(()=>()=>{C&&(g.layers.delete(C),g.layersWithOutsidePointerEventsDisabled.delete(C),m())},[C,g]),o.useEffect(()=>{let e=()=>R({});return document.addEventListener(d,e),()=>document.removeEventListener(d,e)},[]),(0,a.jsx)(u.sG.div,{...N,ref:M,style:{pointerEvents:S?A?"auto":"none":void 0,...e.style},onFocusCapture:(0,i.m)(e.onFocusCapture,_.onFocusCapture),onBlurCapture:(0,i.m)(e.onBlurCapture,_.onBlurCapture),onPointerDownCapture:(0,i.m)(e.onPointerDownCapture,k.onPointerDownCapture)})});f.displayName="DismissableLayer";var v=o.forwardRef((e,t)=>{let n=o.useContext(c),r=o.useRef(null),i=(0,l.s)(t,r);return o.useEffect(()=>{let e=r.current;if(e)return n.branches.add(e),()=>{n.branches.delete(e)}},[n.branches]),(0,a.jsx)(u.sG.div,{...e,ref:i})});function m(){let e=new CustomEvent(d);document.dispatchEvent(e)}function p(e,t,n,r){let{discrete:o}=r,i=n.originalEvent.target,l=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});t&&i.addEventListener(e,t,{once:!0}),o?(0,u.hO)(i,l):i.dispatchEvent(l)}v.displayName="DismissableLayerBranch";var y=f,E=v},7323:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(2115),o=n(7650),i=n(3360),u=n(6611),l=n(5155),s=r.forwardRef((e,t)=>{var n,s;let{container:a,...d}=e,[c,f]=r.useState(!1);(0,u.N)(()=>f(!0),[]);let v=a||c&&(null===(s=globalThis)||void 0===s?void 0:null===(n=s.document)||void 0===n?void 0:n.body);return v?o.createPortal((0,l.jsx)(i.sG.div,{...d,ref:t}),v):null});s.displayName="Portal"},7028:(e,t,n)=>{n.d(t,{C:()=>u});var r=n(2115),o=n(8068),i=n(6611),u=e=>{let{present:t,children:n}=e,u=function(e){var t,n;let[o,u]=r.useState(),s=r.useRef({}),a=r.useRef(e),d=r.useRef("none"),[c,f]=(t=e?"mounted":"unmounted",n={mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}},r.useReducer((e,t)=>{let r=n[e][t];return null!=r?r:e},t));return r.useEffect(()=>{let e=l(s.current);d.current="mounted"===c?e:"none"},[c]),(0,i.N)(()=>{let t=s.current,n=a.current;if(n!==e){let r=d.current,o=l(t);e?f("MOUNT"):"none"===o||(null==t?void 0:t.display)==="none"?f("UNMOUNT"):n&&r!==o?f("ANIMATION_OUT"):f("UNMOUNT"),a.current=e}},[e,f]),(0,i.N)(()=>{if(o){var e;let t;let n=null!==(e=o.ownerDocument.defaultView)&&void 0!==e?e:window,r=e=>{let r=l(s.current).includes(e.animationName);if(e.target===o&&r&&(f("ANIMATION_END"),!a.current)){let e=o.style.animationFillMode;o.style.animationFillMode="forwards",t=n.setTimeout(()=>{"forwards"===o.style.animationFillMode&&(o.style.animationFillMode=e)})}},i=e=>{e.target===o&&(d.current=l(s.current))};return o.addEventListener("animationstart",i),o.addEventListener("animationcancel",r),o.addEventListener("animationend",r),()=>{n.clearTimeout(t),o.removeEventListener("animationstart",i),o.removeEventListener("animationcancel",r),o.removeEventListener("animationend",r)}}f("ANIMATION_END")},[o,f]),{isPresent:["mounted","unmountSuspended"].includes(c),ref:r.useCallback(e=>{e&&(s.current=getComputedStyle(e)),u(e)},[])}}(t),s="function"==typeof n?n({present:u.isPresent}):r.Children.only(n),a=(0,o.s)(u.ref,function(e){var t,n;let r=null===(t=Object.getOwnPropertyDescriptor(e.props,"ref"))||void 0===t?void 0:t.get,o=r&&"isReactWarning"in r&&r.isReactWarning;return o?e.ref:(o=(r=null===(n=Object.getOwnPropertyDescriptor(e,"ref"))||void 0===n?void 0:n.get)&&"isReactWarning"in r&&r.isReactWarning)?e.props.ref:e.props.ref||e.ref}(s));return"function"==typeof n||u.isPresent?r.cloneElement(s,{ref:a}):null};function l(e){return(null==e?void 0:e.animationName)||"none"}u.displayName="Presence"},3360:(e,t,n)=>{n.d(t,{hO:()=>s,sG:()=>l});var r=n(2115),o=n(7650),i=n(2317),u=n(5155),l=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce((e,t)=>{let n=r.forwardRef((e,n)=>{let{asChild:r,...o}=e,l=r?i.DX:t;return"undefined"!=typeof window&&(window[Symbol.for("radix-ui")]=!0),(0,u.jsx)(l,{...o,ref:n})});return n.displayName=`Primitive.${t}`,{...e,[t]:n}},{});function s(e,t){e&&o.flushSync(()=>e.dispatchEvent(t))}},1524:(e,t,n)=>{n.d(t,{c:()=>o});var r=n(2115);function o(e){let t=r.useRef(e);return r.useEffect(()=>{t.current=e}),r.useMemo(()=>(...e)=>t.current?.(...e),[])}},1488:(e,t,n)=>{n.d(t,{i:()=>i});var r=n(2115),o=n(1524);function i({prop:e,defaultProp:t,onChange:n=()=>{}}){let[i,u]=function({defaultProp:e,onChange:t}){let n=r.useState(e),[i]=n,u=r.useRef(i),l=(0,o.c)(t);return r.useEffect(()=>{u.current!==i&&(l(i),u.current=i)},[i,u,l]),n}({defaultProp:t,onChange:n}),l=void 0!==e,s=l?e:i,a=(0,o.c)(n);return[s,r.useCallback(t=>{if(l){let n="function"==typeof t?t(e):t;n!==e&&a(n)}else u(t)},[l,e,u,a])]}},6611:(e,t,n)=>{n.d(t,{N:()=>o});var r=n(2115),o=globalThis?.document?r.useLayoutEffect:()=>{}},3543:(e,t,n)=>{n.d(t,{s:()=>u});var r=n(2115),o=n(3360),i=n(5155),u=r.forwardRef((e,t)=>(0,i.jsx)(o.sG.span,{...e,ref:t,style:{position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal",...e.style}}));u.displayName="VisuallyHidden"},689:(e,t,n)=>{n.d(t,{A:()=>r});let r=(0,n(4057).A)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])}}]);