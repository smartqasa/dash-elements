/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,e$3=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$1=Symbol(),o$4=new WeakMap;let n$4 = class n{constructor(t,e,o){if(this._$cssResult$=!0,o!==s$1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$3&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$5=t=>new n$4("string"==typeof t?t:t+"",void 0,s$1),i$6=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$4(o,t,s$1)},S$1=(s,o)=>{if(e$3)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$3.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$3?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$5(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$5,defineProperty:e$2,getOwnPropertyDescriptor:r$4,getOwnPropertyNames:h$1,getOwnPropertySymbols:o$3,getPrototypeOf:n$3}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$5(t,s),y$1={attribute:!0,type:String,converter:u$1,reflect:!1,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;class b extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=y$1){if(s.state&&(s.attribute=!1),this._$Ei(),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,s);void 0!==r&&e$2(this.prototype,t,r);}}static getPropertyDescriptor(t,s,i){const{get:e,set:h}=r$4(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get(){return e?.call(this)},set(s){const r=e?.call(this);h.call(this,s),this.requestUpdate(t,r,i);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$3(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...h$1(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return !1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$EC(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==r?this.removeAttribute(e):this.setAttribute(e,r),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e,this[e]=r.fromAttribute(s,t.type),this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??f$1)(this[t],s))return;this.P(t,s,i);}!1===this.isUpdatePending&&(this._$ES=this._$ET());}P(t,s,i){this._$AL.has(t)||this._$AL.set(t,s),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t);}async _$ET(){this.isUpdatePending=!0;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t)!0!==i.wrapped||this._$AL.has(s)||void 0===this[s]||this.P(s,this[s],i);}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EU();}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EU(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return !0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU();}updated(t){}firstUpdated(t){}}b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[d$1("elementProperties")]=new Map,b[d$1("finalized")]=new Map,p$1?.({ReactiveElement:b}),(a$1.reactiveElementVersions??=[]).push("2.0.4");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,i$4=t$2.trustedTypes,s=i$4?i$4.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$1="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o$2="?"+h,n$2=`<${o$2}>`,r$3=document,l=()=>r$3.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r$3.createTreeWalker(r$3,129);function P(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s?s.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n$2:d>=0?(o.push(a),s.slice(0,d)+e$1+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [P(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e$1)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H:"?"===e[1]?I:"@"===e[1]?L:k}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$4?i$4.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$2)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r$3.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){if(i===T)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=S(t,h._$AS(t,i.values),h,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r$3).importNode(i,!0);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r$3,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),c(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r$3.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new N(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E;}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=S(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S(this,e[s+n],i,n),r===T&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===E?t=E:t!==E&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?void 0:t;}}class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}}class L extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S(this,t,i,0)??E)===T)return;const s=this._$AH,e=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E&&(s===E||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j=t$2.litHtmlPolyfillSupport;j?.(N,R),(t$2.litHtmlVersions??=[]).push("3.2.1");const B=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let r$2 = class r extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B(s,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1);}render(){return T}};r$2._$litElement$=!0,r$2["finalized"]=!0,globalThis.litElementHydrateSupport?.({LitElement:r$2});const i$3=globalThis.litElementPolyfillSupport;i$3?.({LitElement:r$2});(globalThis.litElementVersions??=[]).push("4.1.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=t=>(e,o)=>{void 0!==o?o.addInitializer((()=>{customElements.define(t,e);})):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$1={attribute:!0,type:String,converter:u$1,reflect:!1,hasChanged:f$1},r$1=(t=o$1,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t);},init(e){return void 0!==e&&this.P(o,void 0,t),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t);}}throw Error("Unsupported decorator location: "+n)};function n$1(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,r?{...t,wrapped:!0}:t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n$1({...r,state:!0,attribute:!1})}

const formattedDate = (date = new Date()) => {
    const options = {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
};
const formattedTime = (date = new Date()) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes}`;
};
const formattedTime2 = (date = new Date()) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return x `
        <span
            >${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes}</span
        ><span style="opacity: 0;">:${seconds}</span>
    `;
};

function executeFullyAction(action) {
    if (!window.fully)
        return;
    if (!window.fully.isInForeground()) {
        window.fully.bringToForeground();
    }
    setTimeout(() => window.fully?.clearCache(), 500);
    setTimeout(() => window.fully?.[action](), 1000);
}
const deviceRefresh = (hass, deviceRefreshState) => {
    const state = hass.states['input_button.refresh_devices']?.state;
    if (deviceRefreshState === undefined || deviceRefreshState === state) {
        return state;
    }
    if (window.fully) {
        executeFullyAction('restartApp');
    }
    else {
        window.browser_mod?.service('refresh');
    }
    return state;
};
const deviceReboot = (hass, deviceRebootState) => {
    const state = hass.states['input_button.reboot_devices']?.state;
    if (deviceRebootState === undefined || deviceRebootState === state) {
        return state;
    }
    executeFullyAction('reboot');
    return state;
};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e=t=>(...e)=>({_$litDirective$:t,values:e});let i$2 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const n="important",i$1=" !"+n,o=e(class extends i$2{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||t$1.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(r)),this.render(r);for(const t of this.ft)null==r[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in r){const e=r[t];if(null!=e){this.ft.add(t);const r="string"==typeof e&&e.endsWith(i$1);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?n:""):s[t]=e;}}return T}});

function getDeviceOrientation() {
    return window.screen.orientation.type.startsWith('portrait')
        ? 'portrait'
        : 'landscape';
}
function getDeviceType() {
    const { width, height } = window.screen;
    const orientation = window.screen.orientation.type.startsWith('portrait')
        ? 'portrait'
        : 'landscape';
    if ((orientation === 'portrait' && width < 600 && width != 534) ||
        (orientation === 'landscape' && height < 600 && height != 534)) {
        return 'phone';
    }
    else {
        return 'tablet';
    }
}
const deviceType = getDeviceType();

const createElement = (config, hass) => {
    if (!config || typeof config !== 'object' || !config.type) {
        console.error("Error: Invalid or missing 'type' in config:", config);
        return undefined;
    }
    const tag = config.type.startsWith('custom:')
        ? config.type.replace('custom:', '')
        : `hui-${config.type}-card`;
    if (!customElements.get(tag)) {
        console.error(`Error: Custom element '${tag}' is not registered.`);
        return undefined;
    }
    const element = document.createElement(tag);
    if (typeof element.setConfig !== 'function') {
        console.error(`Error: The element '${tag}' does not implement 'setConfig'.`, element);
        return undefined;
    }
    try {
        element.setConfig(config);
    }
    catch (err) {
        console.error(`Error: Failed to set config for element '${tag}'.`, err);
        return undefined;
    }
    if (hass)
        element.hass = hass;
    return element;
};

const createElements = (config, hass) => {
    if (!Array.isArray(config)) {
        return [];
    }
    if (config.length === 0)
        return [];
    return config.map((elementConfig) => {
        const element = createElement(elementConfig, hass);
        return element;
    });
};

async function dialogPopup(dialogConfig, callingDialogConfig) {
    if (callingDialogConfig && Object.keys(callingDialogConfig).length > 0) {
        dialogConfig.dismiss_action = {
            service: 'browser_mod.popup',
            data: callingDialogConfig,
        };
    }
    await window.browser_mod?.service('popup', dialogConfig);
}

/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function isNothing(subject) {
  return (typeof subject === 'undefined') || (subject === null);
}


function isObject(subject) {
  return (typeof subject === 'object') && (subject !== null);
}


function toArray(sequence) {
  if (Array.isArray(sequence)) return sequence;
  else if (isNothing(sequence)) return [];

  return [ sequence ];
}


function extend(target, source) {
  var index, length, key, sourceKeys;

  if (source) {
    sourceKeys = Object.keys(source);

    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
      key = sourceKeys[index];
      target[key] = source[key];
    }
  }

  return target;
}


function repeat(string, count) {
  var result = '', cycle;

  for (cycle = 0; cycle < count; cycle += 1) {
    result += string;
  }

  return result;
}


function isNegativeZero(number) {
  return (number === 0) && (Number.NEGATIVE_INFINITY === 1 / number);
}


var isNothing_1      = isNothing;
var isObject_1       = isObject;
var toArray_1        = toArray;
var repeat_1         = repeat;
var isNegativeZero_1 = isNegativeZero;
var extend_1         = extend;

var common = {
	isNothing: isNothing_1,
	isObject: isObject_1,
	toArray: toArray_1,
	repeat: repeat_1,
	isNegativeZero: isNegativeZero_1,
	extend: extend_1
};

// YAML error class. http://stackoverflow.com/questions/8458984


function formatError(exception, compact) {
  var where = '', message = exception.reason || '(unknown reason)';

  if (!exception.mark) return message;

  if (exception.mark.name) {
    where += 'in "' + exception.mark.name + '" ';
  }

  where += '(' + (exception.mark.line + 1) + ':' + (exception.mark.column + 1) + ')';

  if (!compact && exception.mark.snippet) {
    where += '\n\n' + exception.mark.snippet;
  }

  return message + ' ' + where;
}


function YAMLException$1(reason, mark) {
  // Super constructor
  Error.call(this);

  this.name = 'YAMLException';
  this.reason = reason;
  this.mark = mark;
  this.message = formatError(this, false);

  // Include stack trace in error object
  if (Error.captureStackTrace) {
    // Chrome and NodeJS
    Error.captureStackTrace(this, this.constructor);
  } else {
    // FF, IE 10+ and Safari 6+. Fallback for others
    this.stack = (new Error()).stack || '';
  }
}


// Inherit from Error
YAMLException$1.prototype = Object.create(Error.prototype);
YAMLException$1.prototype.constructor = YAMLException$1;


YAMLException$1.prototype.toString = function toString(compact) {
  return this.name + ': ' + formatError(this, compact);
};


var exception = YAMLException$1;

// get snippet for a single line, respecting maxLength
function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
  var head = '';
  var tail = '';
  var maxHalfLength = Math.floor(maxLineLength / 2) - 1;

  if (position - lineStart > maxHalfLength) {
    head = ' ... ';
    lineStart = position - maxHalfLength + head.length;
  }

  if (lineEnd - position > maxHalfLength) {
    tail = ' ...';
    lineEnd = position + maxHalfLength - tail.length;
  }

  return {
    str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, '→') + tail,
    pos: position - lineStart + head.length // relative position
  };
}


function padStart(string, max) {
  return common.repeat(' ', max - string.length) + string;
}


function makeSnippet(mark, options) {
  options = Object.create(options || null);

  if (!mark.buffer) return null;

  if (!options.maxLength) options.maxLength = 79;
  if (typeof options.indent      !== 'number') options.indent      = 1;
  if (typeof options.linesBefore !== 'number') options.linesBefore = 3;
  if (typeof options.linesAfter  !== 'number') options.linesAfter  = 2;

  var re = /\r?\n|\r|\0/g;
  var lineStarts = [ 0 ];
  var lineEnds = [];
  var match;
  var foundLineNo = -1;

  while ((match = re.exec(mark.buffer))) {
    lineEnds.push(match.index);
    lineStarts.push(match.index + match[0].length);

    if (mark.position <= match.index && foundLineNo < 0) {
      foundLineNo = lineStarts.length - 2;
    }
  }

  if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;

  var result = '', i, line;
  var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
  var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);

  for (i = 1; i <= options.linesBefore; i++) {
    if (foundLineNo - i < 0) break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo - i],
      lineEnds[foundLineNo - i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]),
      maxLineLength
    );
    result = common.repeat(' ', options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) +
      ' | ' + line.str + '\n' + result;
  }

  line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
  result += common.repeat(' ', options.indent) + padStart((mark.line + 1).toString(), lineNoLength) +
    ' | ' + line.str + '\n';
  result += common.repeat('-', options.indent + lineNoLength + 3 + line.pos) + '^' + '\n';

  for (i = 1; i <= options.linesAfter; i++) {
    if (foundLineNo + i >= lineEnds.length) break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo + i],
      lineEnds[foundLineNo + i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]),
      maxLineLength
    );
    result += common.repeat(' ', options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) +
      ' | ' + line.str + '\n';
  }

  return result.replace(/\n$/, '');
}


var snippet = makeSnippet;

var TYPE_CONSTRUCTOR_OPTIONS = [
  'kind',
  'multi',
  'resolve',
  'construct',
  'instanceOf',
  'predicate',
  'represent',
  'representName',
  'defaultStyle',
  'styleAliases'
];

var YAML_NODE_KINDS = [
  'scalar',
  'sequence',
  'mapping'
];

function compileStyleAliases(map) {
  var result = {};

  if (map !== null) {
    Object.keys(map).forEach(function (style) {
      map[style].forEach(function (alias) {
        result[String(alias)] = style;
      });
    });
  }

  return result;
}

function Type$1(tag, options) {
  options = options || {};

  Object.keys(options).forEach(function (name) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
      throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    }
  });

  // TODO: Add tag format check.
  this.options       = options; // keep original options in case user wants to extend this type later
  this.tag           = tag;
  this.kind          = options['kind']          || null;
  this.resolve       = options['resolve']       || function () { return true; };
  this.construct     = options['construct']     || function (data) { return data; };
  this.instanceOf    = options['instanceOf']    || null;
  this.predicate     = options['predicate']     || null;
  this.represent     = options['represent']     || null;
  this.representName = options['representName'] || null;
  this.defaultStyle  = options['defaultStyle']  || null;
  this.multi         = options['multi']         || false;
  this.styleAliases  = compileStyleAliases(options['styleAliases'] || null);

  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}

var type = Type$1;

/*eslint-disable max-len*/





function compileList(schema, name) {
  var result = [];

  schema[name].forEach(function (currentType) {
    var newIndex = result.length;

    result.forEach(function (previousType, previousIndex) {
      if (previousType.tag === currentType.tag &&
          previousType.kind === currentType.kind &&
          previousType.multi === currentType.multi) {

        newIndex = previousIndex;
      }
    });

    result[newIndex] = currentType;
  });

  return result;
}


function compileMap(/* lists... */) {
  var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {},
        multi: {
          scalar: [],
          sequence: [],
          mapping: [],
          fallback: []
        }
      }, index, length;

  function collectType(type) {
    if (type.multi) {
      result.multi[type.kind].push(type);
      result.multi['fallback'].push(type);
    } else {
      result[type.kind][type.tag] = result['fallback'][type.tag] = type;
    }
  }

  for (index = 0, length = arguments.length; index < length; index += 1) {
    arguments[index].forEach(collectType);
  }
  return result;
}


function Schema$1(definition) {
  return this.extend(definition);
}


Schema$1.prototype.extend = function extend(definition) {
  var implicit = [];
  var explicit = [];

  if (definition instanceof type) {
    // Schema.extend(type)
    explicit.push(definition);

  } else if (Array.isArray(definition)) {
    // Schema.extend([ type1, type2, ... ])
    explicit = explicit.concat(definition);

  } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
    // Schema.extend({ explicit: [ type1, type2, ... ], implicit: [ type1, type2, ... ] })
    if (definition.implicit) implicit = implicit.concat(definition.implicit);
    if (definition.explicit) explicit = explicit.concat(definition.explicit);

  } else {
    throw new exception('Schema.extend argument should be a Type, [ Type ], ' +
      'or a schema definition ({ implicit: [...], explicit: [...] })');
  }

  implicit.forEach(function (type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception('Specified list of YAML types (or a single Type object) contains a non-Type object.');
    }

    if (type$1.loadKind && type$1.loadKind !== 'scalar') {
      throw new exception('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
    }

    if (type$1.multi) {
      throw new exception('There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.');
    }
  });

  explicit.forEach(function (type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception('Specified list of YAML types (or a single Type object) contains a non-Type object.');
    }
  });

  var result = Object.create(Schema$1.prototype);

  result.implicit = (this.implicit || []).concat(implicit);
  result.explicit = (this.explicit || []).concat(explicit);

  result.compiledImplicit = compileList(result, 'implicit');
  result.compiledExplicit = compileList(result, 'explicit');
  result.compiledTypeMap  = compileMap(result.compiledImplicit, result.compiledExplicit);

  return result;
};


var schema = Schema$1;

var str = new type('tag:yaml.org,2002:str', {
  kind: 'scalar',
  construct: function (data) { return data !== null ? data : ''; }
});

var seq = new type('tag:yaml.org,2002:seq', {
  kind: 'sequence',
  construct: function (data) { return data !== null ? data : []; }
});

var map = new type('tag:yaml.org,2002:map', {
  kind: 'mapping',
  construct: function (data) { return data !== null ? data : {}; }
});

var failsafe = new schema({
  explicit: [
    str,
    seq,
    map
  ]
});

function resolveYamlNull(data) {
  if (data === null) return true;

  var max = data.length;

  return (max === 1 && data === '~') ||
         (max === 4 && (data === 'null' || data === 'Null' || data === 'NULL'));
}

function constructYamlNull() {
  return null;
}

function isNull(object) {
  return object === null;
}

var _null = new type('tag:yaml.org,2002:null', {
  kind: 'scalar',
  resolve: resolveYamlNull,
  construct: constructYamlNull,
  predicate: isNull,
  represent: {
    canonical: function () { return '~';    },
    lowercase: function () { return 'null'; },
    uppercase: function () { return 'NULL'; },
    camelcase: function () { return 'Null'; },
    empty:     function () { return '';     }
  },
  defaultStyle: 'lowercase'
});

function resolveYamlBoolean(data) {
  if (data === null) return false;

  var max = data.length;

  return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
         (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'));
}

function constructYamlBoolean(data) {
  return data === 'true' ||
         data === 'True' ||
         data === 'TRUE';
}

function isBoolean(object) {
  return Object.prototype.toString.call(object) === '[object Boolean]';
}

var bool = new type('tag:yaml.org,2002:bool', {
  kind: 'scalar',
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
    lowercase: function (object) { return object ? 'true' : 'false'; },
    uppercase: function (object) { return object ? 'TRUE' : 'FALSE'; },
    camelcase: function (object) { return object ? 'True' : 'False'; }
  },
  defaultStyle: 'lowercase'
});

function isHexCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) ||
         ((0x41/* A */ <= c) && (c <= 0x46/* F */)) ||
         ((0x61/* a */ <= c) && (c <= 0x66/* f */));
}

function isOctCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x37/* 7 */));
}

function isDecCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */));
}

function resolveYamlInteger(data) {
  if (data === null) return false;

  var max = data.length,
      index = 0,
      hasDigits = false,
      ch;

  if (!max) return false;

  ch = data[index];

  // sign
  if (ch === '-' || ch === '+') {
    ch = data[++index];
  }

  if (ch === '0') {
    // 0
    if (index + 1 === max) return true;
    ch = data[++index];

    // base 2, base 8, base 16

    if (ch === 'b') {
      // base 2
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (ch !== '0' && ch !== '1') return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }


    if (ch === 'x') {
      // base 16
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (!isHexCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }


    if (ch === 'o') {
      // base 8
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (!isOctCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }
  }

  // base 10 (except 0)

  // value should not start with `_`;
  if (ch === '_') return false;

  for (; index < max; index++) {
    ch = data[index];
    if (ch === '_') continue;
    if (!isDecCode(data.charCodeAt(index))) {
      return false;
    }
    hasDigits = true;
  }

  // Should have digits and should not end with `_`
  if (!hasDigits || ch === '_') return false;

  return true;
}

function constructYamlInteger(data) {
  var value = data, sign = 1, ch;

  if (value.indexOf('_') !== -1) {
    value = value.replace(/_/g, '');
  }

  ch = value[0];

  if (ch === '-' || ch === '+') {
    if (ch === '-') sign = -1;
    value = value.slice(1);
    ch = value[0];
  }

  if (value === '0') return 0;

  if (ch === '0') {
    if (value[1] === 'b') return sign * parseInt(value.slice(2), 2);
    if (value[1] === 'x') return sign * parseInt(value.slice(2), 16);
    if (value[1] === 'o') return sign * parseInt(value.slice(2), 8);
  }

  return sign * parseInt(value, 10);
}

function isInteger(object) {
  return (Object.prototype.toString.call(object)) === '[object Number]' &&
         (object % 1 === 0 && !common.isNegativeZero(object));
}

var int = new type('tag:yaml.org,2002:int', {
  kind: 'scalar',
  resolve: resolveYamlInteger,
  construct: constructYamlInteger,
  predicate: isInteger,
  represent: {
    binary:      function (obj) { return obj >= 0 ? '0b' + obj.toString(2) : '-0b' + obj.toString(2).slice(1); },
    octal:       function (obj) { return obj >= 0 ? '0o'  + obj.toString(8) : '-0o'  + obj.toString(8).slice(1); },
    decimal:     function (obj) { return obj.toString(10); },
    /* eslint-disable max-len */
    hexadecimal: function (obj) { return obj >= 0 ? '0x' + obj.toString(16).toUpperCase() :  '-0x' + obj.toString(16).toUpperCase().slice(1); }
  },
  defaultStyle: 'decimal',
  styleAliases: {
    binary:      [ 2,  'bin' ],
    octal:       [ 8,  'oct' ],
    decimal:     [ 10, 'dec' ],
    hexadecimal: [ 16, 'hex' ]
  }
});

var YAML_FLOAT_PATTERN = new RegExp(
  // 2.5e4, 2.5 and integers
  '^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?' +
  // .2e4, .2
  // special case, seems not from spec
  '|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?' +
  // .inf
  '|[-+]?\\.(?:inf|Inf|INF)' +
  // .nan
  '|\\.(?:nan|NaN|NAN))$');

function resolveYamlFloat(data) {
  if (data === null) return false;

  if (!YAML_FLOAT_PATTERN.test(data) ||
      // Quick hack to not allow integers end with `_`
      // Probably should update regexp & check speed
      data[data.length - 1] === '_') {
    return false;
  }

  return true;
}

function constructYamlFloat(data) {
  var value, sign;

  value  = data.replace(/_/g, '').toLowerCase();
  sign   = value[0] === '-' ? -1 : 1;

  if ('+-'.indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }

  if (value === '.inf') {
    return (sign === 1) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;

  } else if (value === '.nan') {
    return NaN;
  }
  return sign * parseFloat(value, 10);
}


var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;

function representYamlFloat(object, style) {
  var res;

  if (isNaN(object)) {
    switch (style) {
      case 'lowercase': return '.nan';
      case 'uppercase': return '.NAN';
      case 'camelcase': return '.NaN';
    }
  } else if (Number.POSITIVE_INFINITY === object) {
    switch (style) {
      case 'lowercase': return '.inf';
      case 'uppercase': return '.INF';
      case 'camelcase': return '.Inf';
    }
  } else if (Number.NEGATIVE_INFINITY === object) {
    switch (style) {
      case 'lowercase': return '-.inf';
      case 'uppercase': return '-.INF';
      case 'camelcase': return '-.Inf';
    }
  } else if (common.isNegativeZero(object)) {
    return '-0.0';
  }

  res = object.toString(10);

  // JS stringifier can build scientific format without dots: 5e-100,
  // while YAML requres dot: 5.e-100. Fix it with simple hack

  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
}

function isFloat(object) {
  return (Object.prototype.toString.call(object) === '[object Number]') &&
         (object % 1 !== 0 || common.isNegativeZero(object));
}

var float = new type('tag:yaml.org,2002:float', {
  kind: 'scalar',
  resolve: resolveYamlFloat,
  construct: constructYamlFloat,
  predicate: isFloat,
  represent: representYamlFloat,
  defaultStyle: 'lowercase'
});

var json = failsafe.extend({
  implicit: [
    _null,
    bool,
    int,
    float
  ]
});

var core = json;

var YAML_DATE_REGEXP = new RegExp(
  '^([0-9][0-9][0-9][0-9])'          + // [1] year
  '-([0-9][0-9])'                    + // [2] month
  '-([0-9][0-9])$');                   // [3] day

var YAML_TIMESTAMP_REGEXP = new RegExp(
  '^([0-9][0-9][0-9][0-9])'          + // [1] year
  '-([0-9][0-9]?)'                   + // [2] month
  '-([0-9][0-9]?)'                   + // [3] day
  '(?:[Tt]|[ \\t]+)'                 + // ...
  '([0-9][0-9]?)'                    + // [4] hour
  ':([0-9][0-9])'                    + // [5] minute
  ':([0-9][0-9])'                    + // [6] second
  '(?:\\.([0-9]*))?'                 + // [7] fraction
  '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
  '(?::([0-9][0-9]))?))?$');           // [11] tz_minute

function resolveYamlTimestamp(data) {
  if (data === null) return false;
  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
  return false;
}

function constructYamlTimestamp(data) {
  var match, year, month, day, hour, minute, second, fraction = 0,
      delta = null, tz_hour, tz_minute, date;

  match = YAML_DATE_REGEXP.exec(data);
  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);

  if (match === null) throw new Error('Date resolve error');

  // match: [1] year [2] month [3] day

  year = +(match[1]);
  month = +(match[2]) - 1; // JS month starts with 0
  day = +(match[3]);

  if (!match[4]) { // no hour
    return new Date(Date.UTC(year, month, day));
  }

  // match: [4] hour [5] minute [6] second [7] fraction

  hour = +(match[4]);
  minute = +(match[5]);
  second = +(match[6]);

  if (match[7]) {
    fraction = match[7].slice(0, 3);
    while (fraction.length < 3) { // milli-seconds
      fraction += '0';
    }
    fraction = +fraction;
  }

  // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute

  if (match[9]) {
    tz_hour = +(match[10]);
    tz_minute = +(match[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
    if (match[9] === '-') delta = -delta;
  }

  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));

  if (delta) date.setTime(date.getTime() - delta);

  return date;
}

function representYamlTimestamp(object /*, style*/) {
  return object.toISOString();
}

var timestamp = new type('tag:yaml.org,2002:timestamp', {
  kind: 'scalar',
  resolve: resolveYamlTimestamp,
  construct: constructYamlTimestamp,
  instanceOf: Date,
  represent: representYamlTimestamp
});

function resolveYamlMerge(data) {
  return data === '<<' || data === null;
}

var merge = new type('tag:yaml.org,2002:merge', {
  kind: 'scalar',
  resolve: resolveYamlMerge
});

/*eslint-disable no-bitwise*/





// [ 64, 65, 66 ] -> [ padding, CR, LF ]
var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';


function resolveYamlBinary(data) {
  if (data === null) return false;

  var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;

  // Convert one by one.
  for (idx = 0; idx < max; idx++) {
    code = map.indexOf(data.charAt(idx));

    // Skip CR/LF
    if (code > 64) continue;

    // Fail on illegal characters
    if (code < 0) return false;

    bitlen += 6;
  }

  // If there are any bits left, source was corrupted
  return (bitlen % 8) === 0;
}

function constructYamlBinary(data) {
  var idx, tailbits,
      input = data.replace(/[\r\n=]/g, ''), // remove CR/LF & padding to simplify scan
      max = input.length,
      map = BASE64_MAP,
      bits = 0,
      result = [];

  // Collect by 6*4 bits (3 bytes)

  for (idx = 0; idx < max; idx++) {
    if ((idx % 4 === 0) && idx) {
      result.push((bits >> 16) & 0xFF);
      result.push((bits >> 8) & 0xFF);
      result.push(bits & 0xFF);
    }

    bits = (bits << 6) | map.indexOf(input.charAt(idx));
  }

  // Dump tail

  tailbits = (max % 4) * 6;

  if (tailbits === 0) {
    result.push((bits >> 16) & 0xFF);
    result.push((bits >> 8) & 0xFF);
    result.push(bits & 0xFF);
  } else if (tailbits === 18) {
    result.push((bits >> 10) & 0xFF);
    result.push((bits >> 2) & 0xFF);
  } else if (tailbits === 12) {
    result.push((bits >> 4) & 0xFF);
  }

  return new Uint8Array(result);
}

function representYamlBinary(object /*, style*/) {
  var result = '', bits = 0, idx, tail,
      max = object.length,
      map = BASE64_MAP;

  // Convert every three bytes to 4 ASCII characters.

  for (idx = 0; idx < max; idx++) {
    if ((idx % 3 === 0) && idx) {
      result += map[(bits >> 18) & 0x3F];
      result += map[(bits >> 12) & 0x3F];
      result += map[(bits >> 6) & 0x3F];
      result += map[bits & 0x3F];
    }

    bits = (bits << 8) + object[idx];
  }

  // Dump tail

  tail = max % 3;

  if (tail === 0) {
    result += map[(bits >> 18) & 0x3F];
    result += map[(bits >> 12) & 0x3F];
    result += map[(bits >> 6) & 0x3F];
    result += map[bits & 0x3F];
  } else if (tail === 2) {
    result += map[(bits >> 10) & 0x3F];
    result += map[(bits >> 4) & 0x3F];
    result += map[(bits << 2) & 0x3F];
    result += map[64];
  } else if (tail === 1) {
    result += map[(bits >> 2) & 0x3F];
    result += map[(bits << 4) & 0x3F];
    result += map[64];
    result += map[64];
  }

  return result;
}

function isBinary(obj) {
  return Object.prototype.toString.call(obj) ===  '[object Uint8Array]';
}

var binary = new type('tag:yaml.org,2002:binary', {
  kind: 'scalar',
  resolve: resolveYamlBinary,
  construct: constructYamlBinary,
  predicate: isBinary,
  represent: representYamlBinary
});

var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
var _toString$2       = Object.prototype.toString;

function resolveYamlOmap(data) {
  if (data === null) return true;

  var objectKeys = [], index, length, pair, pairKey, pairHasKey,
      object = data;

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    pairHasKey = false;

    if (_toString$2.call(pair) !== '[object Object]') return false;

    for (pairKey in pair) {
      if (_hasOwnProperty$3.call(pair, pairKey)) {
        if (!pairHasKey) pairHasKey = true;
        else return false;
      }
    }

    if (!pairHasKey) return false;

    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
    else return false;
  }

  return true;
}

function constructYamlOmap(data) {
  return data !== null ? data : [];
}

var omap = new type('tag:yaml.org,2002:omap', {
  kind: 'sequence',
  resolve: resolveYamlOmap,
  construct: constructYamlOmap
});

var _toString$1 = Object.prototype.toString;

function resolveYamlPairs(data) {
  if (data === null) return true;

  var index, length, pair, keys, result,
      object = data;

  result = new Array(object.length);

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];

    if (_toString$1.call(pair) !== '[object Object]') return false;

    keys = Object.keys(pair);

    if (keys.length !== 1) return false;

    result[index] = [ keys[0], pair[keys[0]] ];
  }

  return true;
}

function constructYamlPairs(data) {
  if (data === null) return [];

  var index, length, pair, keys, result,
      object = data;

  result = new Array(object.length);

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];

    keys = Object.keys(pair);

    result[index] = [ keys[0], pair[keys[0]] ];
  }

  return result;
}

var pairs = new type('tag:yaml.org,2002:pairs', {
  kind: 'sequence',
  resolve: resolveYamlPairs,
  construct: constructYamlPairs
});

var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;

function resolveYamlSet(data) {
  if (data === null) return true;

  var key, object = data;

  for (key in object) {
    if (_hasOwnProperty$2.call(object, key)) {
      if (object[key] !== null) return false;
    }
  }

  return true;
}

function constructYamlSet(data) {
  return data !== null ? data : {};
}

var set = new type('tag:yaml.org,2002:set', {
  kind: 'mapping',
  resolve: resolveYamlSet,
  construct: constructYamlSet
});

var _default = core.extend({
  implicit: [
    timestamp,
    merge
  ],
  explicit: [
    binary,
    omap,
    pairs,
    set
  ]
});

/*eslint-disable max-len,no-use-before-define*/







var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;


var CONTEXT_FLOW_IN   = 1;
var CONTEXT_FLOW_OUT  = 2;
var CONTEXT_BLOCK_IN  = 3;
var CONTEXT_BLOCK_OUT = 4;


var CHOMPING_CLIP  = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP  = 3;


var PATTERN_NON_PRINTABLE         = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS       = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE            = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI               = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;


function _class(obj) { return Object.prototype.toString.call(obj); }

function is_EOL(c) {
  return (c === 0x0A/* LF */) || (c === 0x0D/* CR */);
}

function is_WHITE_SPACE(c) {
  return (c === 0x09/* Tab */) || (c === 0x20/* Space */);
}

function is_WS_OR_EOL(c) {
  return (c === 0x09/* Tab */) ||
         (c === 0x20/* Space */) ||
         (c === 0x0A/* LF */) ||
         (c === 0x0D/* CR */);
}

function is_FLOW_INDICATOR(c) {
  return c === 0x2C/* , */ ||
         c === 0x5B/* [ */ ||
         c === 0x5D/* ] */ ||
         c === 0x7B/* { */ ||
         c === 0x7D/* } */;
}

function fromHexCode(c) {
  var lc;

  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
    return c - 0x30;
  }

  /*eslint-disable no-bitwise*/
  lc = c | 0x20;

  if ((0x61/* a */ <= lc) && (lc <= 0x66/* f */)) {
    return lc - 0x61 + 10;
  }

  return -1;
}

function escapedHexLen(c) {
  if (c === 0x78/* x */) { return 2; }
  if (c === 0x75/* u */) { return 4; }
  if (c === 0x55/* U */) { return 8; }
  return 0;
}

function fromDecimalCode(c) {
  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
    return c - 0x30;
  }

  return -1;
}

function simpleEscapeSequence(c) {
  /* eslint-disable indent */
  return (c === 0x30/* 0 */) ? '\x00' :
        (c === 0x61/* a */) ? '\x07' :
        (c === 0x62/* b */) ? '\x08' :
        (c === 0x74/* t */) ? '\x09' :
        (c === 0x09/* Tab */) ? '\x09' :
        (c === 0x6E/* n */) ? '\x0A' :
        (c === 0x76/* v */) ? '\x0B' :
        (c === 0x66/* f */) ? '\x0C' :
        (c === 0x72/* r */) ? '\x0D' :
        (c === 0x65/* e */) ? '\x1B' :
        (c === 0x20/* Space */) ? ' ' :
        (c === 0x22/* " */) ? '\x22' :
        (c === 0x2F/* / */) ? '/' :
        (c === 0x5C/* \ */) ? '\x5C' :
        (c === 0x4E/* N */) ? '\x85' :
        (c === 0x5F/* _ */) ? '\xA0' :
        (c === 0x4C/* L */) ? '\u2028' :
        (c === 0x50/* P */) ? '\u2029' : '';
}

function charFromCodepoint(c) {
  if (c <= 0xFFFF) {
    return String.fromCharCode(c);
  }
  // Encode UTF-16 surrogate pair
  // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
  return String.fromCharCode(
    ((c - 0x010000) >> 10) + 0xD800,
    ((c - 0x010000) & 0x03FF) + 0xDC00
  );
}

var simpleEscapeCheck = new Array(256); // integer, for fast access
var simpleEscapeMap = new Array(256);
for (var i = 0; i < 256; i++) {
  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
  simpleEscapeMap[i] = simpleEscapeSequence(i);
}


function State$1(input, options) {
  this.input = input;

  this.filename  = options['filename']  || null;
  this.schema    = options['schema']    || _default;
  this.onWarning = options['onWarning'] || null;
  // (Hidden) Remove? makes the loader to expect YAML 1.1 documents
  // if such documents have no explicit %YAML directive
  this.legacy    = options['legacy']    || false;

  this.json      = options['json']      || false;
  this.listener  = options['listener']  || null;

  this.implicitTypes = this.schema.compiledImplicit;
  this.typeMap       = this.schema.compiledTypeMap;

  this.length     = input.length;
  this.position   = 0;
  this.line       = 0;
  this.lineStart  = 0;
  this.lineIndent = 0;

  // position of first leading tab in the current line,
  // used to make sure there are no tabs in the indentation
  this.firstTabInLine = -1;

  this.documents = [];

  /*
  this.version;
  this.checkLineBreaks;
  this.tagMap;
  this.anchorMap;
  this.tag;
  this.anchor;
  this.kind;
  this.result;*/

}


function generateError(state, message) {
  var mark = {
    name:     state.filename,
    buffer:   state.input.slice(0, -1), // omit trailing \0
    position: state.position,
    line:     state.line,
    column:   state.position - state.lineStart
  };

  mark.snippet = snippet(mark);

  return new exception(message, mark);
}

function throwError(state, message) {
  throw generateError(state, message);
}

function throwWarning(state, message) {
  if (state.onWarning) {
    state.onWarning.call(null, generateError(state, message));
  }
}


var directiveHandlers = {

  YAML: function handleYamlDirective(state, name, args) {

    var match, major, minor;

    if (state.version !== null) {
      throwError(state, 'duplication of %YAML directive');
    }

    if (args.length !== 1) {
      throwError(state, 'YAML directive accepts exactly one argument');
    }

    match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);

    if (match === null) {
      throwError(state, 'ill-formed argument of the YAML directive');
    }

    major = parseInt(match[1], 10);
    minor = parseInt(match[2], 10);

    if (major !== 1) {
      throwError(state, 'unacceptable YAML version of the document');
    }

    state.version = args[0];
    state.checkLineBreaks = (minor < 2);

    if (minor !== 1 && minor !== 2) {
      throwWarning(state, 'unsupported YAML version of the document');
    }
  },

  TAG: function handleTagDirective(state, name, args) {

    var handle, prefix;

    if (args.length !== 2) {
      throwError(state, 'TAG directive accepts exactly two arguments');
    }

    handle = args[0];
    prefix = args[1];

    if (!PATTERN_TAG_HANDLE.test(handle)) {
      throwError(state, 'ill-formed tag handle (first argument) of the TAG directive');
    }

    if (_hasOwnProperty$1.call(state.tagMap, handle)) {
      throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
    }

    if (!PATTERN_TAG_URI.test(prefix)) {
      throwError(state, 'ill-formed tag prefix (second argument) of the TAG directive');
    }

    try {
      prefix = decodeURIComponent(prefix);
    } catch (err) {
      throwError(state, 'tag prefix is malformed: ' + prefix);
    }

    state.tagMap[handle] = prefix;
  }
};


function captureSegment(state, start, end, checkJson) {
  var _position, _length, _character, _result;

  if (start < end) {
    _result = state.input.slice(start, end);

    if (checkJson) {
      for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
        _character = _result.charCodeAt(_position);
        if (!(_character === 0x09 ||
              (0x20 <= _character && _character <= 0x10FFFF))) {
          throwError(state, 'expected valid JSON character');
        }
      }
    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
      throwError(state, 'the stream contains non-printable characters');
    }

    state.result += _result;
  }
}

function mergeMappings(state, destination, source, overridableKeys) {
  var sourceKeys, key, index, quantity;

  if (!common.isObject(source)) {
    throwError(state, 'cannot merge mappings; the provided source object is unacceptable');
  }

  sourceKeys = Object.keys(source);

  for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
    key = sourceKeys[index];

    if (!_hasOwnProperty$1.call(destination, key)) {
      destination[key] = source[key];
      overridableKeys[key] = true;
    }
  }
}

function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode,
  startLine, startLineStart, startPos) {

  var index, quantity;

  // The output is a plain object here, so keys can only be strings.
  // We need to convert keyNode to a string, but doing so can hang the process
  // (deeply nested arrays that explode exponentially using aliases).
  if (Array.isArray(keyNode)) {
    keyNode = Array.prototype.slice.call(keyNode);

    for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
      if (Array.isArray(keyNode[index])) {
        throwError(state, 'nested arrays are not supported inside keys');
      }

      if (typeof keyNode === 'object' && _class(keyNode[index]) === '[object Object]') {
        keyNode[index] = '[object Object]';
      }
    }
  }

  // Avoid code execution in load() via toString property
  // (still use its own toString for arrays, timestamps,
  // and whatever user schema extensions happen to have @@toStringTag)
  if (typeof keyNode === 'object' && _class(keyNode) === '[object Object]') {
    keyNode = '[object Object]';
  }


  keyNode = String(keyNode);

  if (_result === null) {
    _result = {};
  }

  if (keyTag === 'tag:yaml.org,2002:merge') {
    if (Array.isArray(valueNode)) {
      for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
        mergeMappings(state, _result, valueNode[index], overridableKeys);
      }
    } else {
      mergeMappings(state, _result, valueNode, overridableKeys);
    }
  } else {
    if (!state.json &&
        !_hasOwnProperty$1.call(overridableKeys, keyNode) &&
        _hasOwnProperty$1.call(_result, keyNode)) {
      state.line = startLine || state.line;
      state.lineStart = startLineStart || state.lineStart;
      state.position = startPos || state.position;
      throwError(state, 'duplicated mapping key');
    }

    // used for this specific key only because Object.defineProperty is slow
    if (keyNode === '__proto__') {
      Object.defineProperty(_result, keyNode, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: valueNode
      });
    } else {
      _result[keyNode] = valueNode;
    }
    delete overridableKeys[keyNode];
  }

  return _result;
}

function readLineBreak(state) {
  var ch;

  ch = state.input.charCodeAt(state.position);

  if (ch === 0x0A/* LF */) {
    state.position++;
  } else if (ch === 0x0D/* CR */) {
    state.position++;
    if (state.input.charCodeAt(state.position) === 0x0A/* LF */) {
      state.position++;
    }
  } else {
    throwError(state, 'a line break is expected');
  }

  state.line += 1;
  state.lineStart = state.position;
  state.firstTabInLine = -1;
}

function skipSeparationSpace(state, allowComments, checkIndent) {
  var lineBreaks = 0,
      ch = state.input.charCodeAt(state.position);

  while (ch !== 0) {
    while (is_WHITE_SPACE(ch)) {
      if (ch === 0x09/* Tab */ && state.firstTabInLine === -1) {
        state.firstTabInLine = state.position;
      }
      ch = state.input.charCodeAt(++state.position);
    }

    if (allowComments && ch === 0x23/* # */) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 0x0A/* LF */ && ch !== 0x0D/* CR */ && ch !== 0);
    }

    if (is_EOL(ch)) {
      readLineBreak(state);

      ch = state.input.charCodeAt(state.position);
      lineBreaks++;
      state.lineIndent = 0;

      while (ch === 0x20/* Space */) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
    } else {
      break;
    }
  }

  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
    throwWarning(state, 'deficient indentation');
  }

  return lineBreaks;
}

function testDocumentSeparator(state) {
  var _position = state.position,
      ch;

  ch = state.input.charCodeAt(_position);

  // Condition state.position === state.lineStart is tested
  // in parent on each call, for efficiency. No needs to test here again.
  if ((ch === 0x2D/* - */ || ch === 0x2E/* . */) &&
      ch === state.input.charCodeAt(_position + 1) &&
      ch === state.input.charCodeAt(_position + 2)) {

    _position += 3;

    ch = state.input.charCodeAt(_position);

    if (ch === 0 || is_WS_OR_EOL(ch)) {
      return true;
    }
  }

  return false;
}

function writeFoldedLines(state, count) {
  if (count === 1) {
    state.result += ' ';
  } else if (count > 1) {
    state.result += common.repeat('\n', count - 1);
  }
}


function readPlainScalar(state, nodeIndent, withinFlowCollection) {
  var preceding,
      following,
      captureStart,
      captureEnd,
      hasPendingContent,
      _line,
      _lineStart,
      _lineIndent,
      _kind = state.kind,
      _result = state.result,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (is_WS_OR_EOL(ch)      ||
      is_FLOW_INDICATOR(ch) ||
      ch === 0x23/* # */    ||
      ch === 0x26/* & */    ||
      ch === 0x2A/* * */    ||
      ch === 0x21/* ! */    ||
      ch === 0x7C/* | */    ||
      ch === 0x3E/* > */    ||
      ch === 0x27/* ' */    ||
      ch === 0x22/* " */    ||
      ch === 0x25/* % */    ||
      ch === 0x40/* @ */    ||
      ch === 0x60/* ` */) {
    return false;
  }

  if (ch === 0x3F/* ? */ || ch === 0x2D/* - */) {
    following = state.input.charCodeAt(state.position + 1);

    if (is_WS_OR_EOL(following) ||
        withinFlowCollection && is_FLOW_INDICATOR(following)) {
      return false;
    }
  }

  state.kind = 'scalar';
  state.result = '';
  captureStart = captureEnd = state.position;
  hasPendingContent = false;

  while (ch !== 0) {
    if (ch === 0x3A/* : */) {
      following = state.input.charCodeAt(state.position + 1);

      if (is_WS_OR_EOL(following) ||
          withinFlowCollection && is_FLOW_INDICATOR(following)) {
        break;
      }

    } else if (ch === 0x23/* # */) {
      preceding = state.input.charCodeAt(state.position - 1);

      if (is_WS_OR_EOL(preceding)) {
        break;
      }

    } else if ((state.position === state.lineStart && testDocumentSeparator(state)) ||
               withinFlowCollection && is_FLOW_INDICATOR(ch)) {
      break;

    } else if (is_EOL(ch)) {
      _line = state.line;
      _lineStart = state.lineStart;
      _lineIndent = state.lineIndent;
      skipSeparationSpace(state, false, -1);

      if (state.lineIndent >= nodeIndent) {
        hasPendingContent = true;
        ch = state.input.charCodeAt(state.position);
        continue;
      } else {
        state.position = captureEnd;
        state.line = _line;
        state.lineStart = _lineStart;
        state.lineIndent = _lineIndent;
        break;
      }
    }

    if (hasPendingContent) {
      captureSegment(state, captureStart, captureEnd, false);
      writeFoldedLines(state, state.line - _line);
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
    }

    if (!is_WHITE_SPACE(ch)) {
      captureEnd = state.position + 1;
    }

    ch = state.input.charCodeAt(++state.position);
  }

  captureSegment(state, captureStart, captureEnd, false);

  if (state.result) {
    return true;
  }

  state.kind = _kind;
  state.result = _result;
  return false;
}

function readSingleQuotedScalar(state, nodeIndent) {
  var ch,
      captureStart, captureEnd;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x27/* ' */) {
    return false;
  }

  state.kind = 'scalar';
  state.result = '';
  state.position++;
  captureStart = captureEnd = state.position;

  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 0x27/* ' */) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);

      if (ch === 0x27/* ' */) {
        captureStart = state.position;
        state.position++;
        captureEnd = state.position;
      } else {
        return true;
      }

    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;

    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, 'unexpected end of the document within a single quoted scalar');

    } else {
      state.position++;
      captureEnd = state.position;
    }
  }

  throwError(state, 'unexpected end of the stream within a single quoted scalar');
}

function readDoubleQuotedScalar(state, nodeIndent) {
  var captureStart,
      captureEnd,
      hexLength,
      hexResult,
      tmp,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x22/* " */) {
    return false;
  }

  state.kind = 'scalar';
  state.result = '';
  state.position++;
  captureStart = captureEnd = state.position;

  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 0x22/* " */) {
      captureSegment(state, captureStart, state.position, true);
      state.position++;
      return true;

    } else if (ch === 0x5C/* \ */) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);

      if (is_EOL(ch)) {
        skipSeparationSpace(state, false, nodeIndent);

        // TODO: rework to inline fn with no type cast?
      } else if (ch < 256 && simpleEscapeCheck[ch]) {
        state.result += simpleEscapeMap[ch];
        state.position++;

      } else if ((tmp = escapedHexLen(ch)) > 0) {
        hexLength = tmp;
        hexResult = 0;

        for (; hexLength > 0; hexLength--) {
          ch = state.input.charCodeAt(++state.position);

          if ((tmp = fromHexCode(ch)) >= 0) {
            hexResult = (hexResult << 4) + tmp;

          } else {
            throwError(state, 'expected hexadecimal character');
          }
        }

        state.result += charFromCodepoint(hexResult);

        state.position++;

      } else {
        throwError(state, 'unknown escape sequence');
      }

      captureStart = captureEnd = state.position;

    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;

    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, 'unexpected end of the document within a double quoted scalar');

    } else {
      state.position++;
      captureEnd = state.position;
    }
  }

  throwError(state, 'unexpected end of the stream within a double quoted scalar');
}

function readFlowCollection(state, nodeIndent) {
  var readNext = true,
      _line,
      _lineStart,
      _pos,
      _tag     = state.tag,
      _result,
      _anchor  = state.anchor,
      following,
      terminator,
      isPair,
      isExplicitPair,
      isMapping,
      overridableKeys = Object.create(null),
      keyNode,
      keyTag,
      valueNode,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch === 0x5B/* [ */) {
    terminator = 0x5D;/* ] */
    isMapping = false;
    _result = [];
  } else if (ch === 0x7B/* { */) {
    terminator = 0x7D;/* } */
    isMapping = true;
    _result = {};
  } else {
    return false;
  }

  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }

  ch = state.input.charCodeAt(++state.position);

  while (ch !== 0) {
    skipSeparationSpace(state, true, nodeIndent);

    ch = state.input.charCodeAt(state.position);

    if (ch === terminator) {
      state.position++;
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = isMapping ? 'mapping' : 'sequence';
      state.result = _result;
      return true;
    } else if (!readNext) {
      throwError(state, 'missed comma between flow collection entries');
    } else if (ch === 0x2C/* , */) {
      // "flow collection entries can never be completely empty", as per YAML 1.2, section 7.4
      throwError(state, "expected the node content, but found ','");
    }

    keyTag = keyNode = valueNode = null;
    isPair = isExplicitPair = false;

    if (ch === 0x3F/* ? */) {
      following = state.input.charCodeAt(state.position + 1);

      if (is_WS_OR_EOL(following)) {
        isPair = isExplicitPair = true;
        state.position++;
        skipSeparationSpace(state, true, nodeIndent);
      }
    }

    _line = state.line; // Save the current line.
    _lineStart = state.lineStart;
    _pos = state.position;
    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
    keyTag = state.tag;
    keyNode = state.result;
    skipSeparationSpace(state, true, nodeIndent);

    ch = state.input.charCodeAt(state.position);

    if ((isExplicitPair || state.line === _line) && ch === 0x3A/* : */) {
      isPair = true;
      ch = state.input.charCodeAt(++state.position);
      skipSeparationSpace(state, true, nodeIndent);
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      valueNode = state.result;
    }

    if (isMapping) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
    } else if (isPair) {
      _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
    } else {
      _result.push(keyNode);
    }

    skipSeparationSpace(state, true, nodeIndent);

    ch = state.input.charCodeAt(state.position);

    if (ch === 0x2C/* , */) {
      readNext = true;
      ch = state.input.charCodeAt(++state.position);
    } else {
      readNext = false;
    }
  }

  throwError(state, 'unexpected end of the stream within a flow collection');
}

function readBlockScalar(state, nodeIndent) {
  var captureStart,
      folding,
      chomping       = CHOMPING_CLIP,
      didReadContent = false,
      detectedIndent = false,
      textIndent     = nodeIndent,
      emptyLines     = 0,
      atMoreIndented = false,
      tmp,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch === 0x7C/* | */) {
    folding = false;
  } else if (ch === 0x3E/* > */) {
    folding = true;
  } else {
    return false;
  }

  state.kind = 'scalar';
  state.result = '';

  while (ch !== 0) {
    ch = state.input.charCodeAt(++state.position);

    if (ch === 0x2B/* + */ || ch === 0x2D/* - */) {
      if (CHOMPING_CLIP === chomping) {
        chomping = (ch === 0x2B/* + */) ? CHOMPING_KEEP : CHOMPING_STRIP;
      } else {
        throwError(state, 'repeat of a chomping mode identifier');
      }

    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
      if (tmp === 0) {
        throwError(state, 'bad explicit indentation width of a block scalar; it cannot be less than one');
      } else if (!detectedIndent) {
        textIndent = nodeIndent + tmp - 1;
        detectedIndent = true;
      } else {
        throwError(state, 'repeat of an indentation width identifier');
      }

    } else {
      break;
    }
  }

  if (is_WHITE_SPACE(ch)) {
    do { ch = state.input.charCodeAt(++state.position); }
    while (is_WHITE_SPACE(ch));

    if (ch === 0x23/* # */) {
      do { ch = state.input.charCodeAt(++state.position); }
      while (!is_EOL(ch) && (ch !== 0));
    }
  }

  while (ch !== 0) {
    readLineBreak(state);
    state.lineIndent = 0;

    ch = state.input.charCodeAt(state.position);

    while ((!detectedIndent || state.lineIndent < textIndent) &&
           (ch === 0x20/* Space */)) {
      state.lineIndent++;
      ch = state.input.charCodeAt(++state.position);
    }

    if (!detectedIndent && state.lineIndent > textIndent) {
      textIndent = state.lineIndent;
    }

    if (is_EOL(ch)) {
      emptyLines++;
      continue;
    }

    // End of the scalar.
    if (state.lineIndent < textIndent) {

      // Perform the chomping.
      if (chomping === CHOMPING_KEEP) {
        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
      } else if (chomping === CHOMPING_CLIP) {
        if (didReadContent) { // i.e. only if the scalar is not empty.
          state.result += '\n';
        }
      }

      // Break this `while` cycle and go to the funciton's epilogue.
      break;
    }

    // Folded style: use fancy rules to handle line breaks.
    if (folding) {

      // Lines starting with white space characters (more-indented lines) are not folded.
      if (is_WHITE_SPACE(ch)) {
        atMoreIndented = true;
        // except for the first content line (cf. Example 8.1)
        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);

      // End of more-indented block.
      } else if (atMoreIndented) {
        atMoreIndented = false;
        state.result += common.repeat('\n', emptyLines + 1);

      // Just one line break - perceive as the same line.
      } else if (emptyLines === 0) {
        if (didReadContent) { // i.e. only if we have already read some scalar content.
          state.result += ' ';
        }

      // Several line breaks - perceive as different lines.
      } else {
        state.result += common.repeat('\n', emptyLines);
      }

    // Literal style: just add exact number of line breaks between content lines.
    } else {
      // Keep all line breaks except the header line break.
      state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
    }

    didReadContent = true;
    detectedIndent = true;
    emptyLines = 0;
    captureStart = state.position;

    while (!is_EOL(ch) && (ch !== 0)) {
      ch = state.input.charCodeAt(++state.position);
    }

    captureSegment(state, captureStart, state.position, false);
  }

  return true;
}

function readBlockSequence(state, nodeIndent) {
  var _line,
      _tag      = state.tag,
      _anchor   = state.anchor,
      _result   = [],
      following,
      detected  = false,
      ch;

  // there is a leading tab before this token, so it can't be a block sequence/mapping;
  // it can still be flow sequence/mapping or a scalar
  if (state.firstTabInLine !== -1) return false;

  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }

  ch = state.input.charCodeAt(state.position);

  while (ch !== 0) {
    if (state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, 'tab characters must not be used in indentation');
    }

    if (ch !== 0x2D/* - */) {
      break;
    }

    following = state.input.charCodeAt(state.position + 1);

    if (!is_WS_OR_EOL(following)) {
      break;
    }

    detected = true;
    state.position++;

    if (skipSeparationSpace(state, true, -1)) {
      if (state.lineIndent <= nodeIndent) {
        _result.push(null);
        ch = state.input.charCodeAt(state.position);
        continue;
      }
    }

    _line = state.line;
    composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
    _result.push(state.result);
    skipSeparationSpace(state, true, -1);

    ch = state.input.charCodeAt(state.position);

    if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
      throwError(state, 'bad indentation of a sequence entry');
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }

  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = 'sequence';
    state.result = _result;
    return true;
  }
  return false;
}

function readBlockMapping(state, nodeIndent, flowIndent) {
  var following,
      allowCompact,
      _line,
      _keyLine,
      _keyLineStart,
      _keyPos,
      _tag          = state.tag,
      _anchor       = state.anchor,
      _result       = {},
      overridableKeys = Object.create(null),
      keyTag        = null,
      keyNode       = null,
      valueNode     = null,
      atExplicitKey = false,
      detected      = false,
      ch;

  // there is a leading tab before this token, so it can't be a block sequence/mapping;
  // it can still be flow sequence/mapping or a scalar
  if (state.firstTabInLine !== -1) return false;

  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }

  ch = state.input.charCodeAt(state.position);

  while (ch !== 0) {
    if (!atExplicitKey && state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, 'tab characters must not be used in indentation');
    }

    following = state.input.charCodeAt(state.position + 1);
    _line = state.line; // Save the current line.

    //
    // Explicit notation case. There are two separate blocks:
    // first for the key (denoted by "?") and second for the value (denoted by ":")
    //
    if ((ch === 0x3F/* ? */ || ch === 0x3A/* : */) && is_WS_OR_EOL(following)) {

      if (ch === 0x3F/* ? */) {
        if (atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
          keyTag = keyNode = valueNode = null;
        }

        detected = true;
        atExplicitKey = true;
        allowCompact = true;

      } else if (atExplicitKey) {
        // i.e. 0x3A/* : */ === character after the explicit key.
        atExplicitKey = false;
        allowCompact = true;

      } else {
        throwError(state, 'incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line');
      }

      state.position += 1;
      ch = following;

    //
    // Implicit notation case. Flow-style node as the key first, then ":", and the value.
    //
    } else {
      _keyLine = state.line;
      _keyLineStart = state.lineStart;
      _keyPos = state.position;

      if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
        // Neither implicit nor explicit notation.
        // Reading is done. Go to the epilogue.
        break;
      }

      if (state.line === _line) {
        ch = state.input.charCodeAt(state.position);

        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }

        if (ch === 0x3A/* : */) {
          ch = state.input.charCodeAt(++state.position);

          if (!is_WS_OR_EOL(ch)) {
            throwError(state, 'a whitespace character is expected after the key-value separator within a block mapping');
          }

          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }

          detected = true;
          atExplicitKey = false;
          allowCompact = false;
          keyTag = state.tag;
          keyNode = state.result;

        } else if (detected) {
          throwError(state, 'can not read an implicit mapping pair; a colon is missed');

        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true; // Keep the result of `composeNode`.
        }

      } else if (detected) {
        throwError(state, 'can not read a block mapping entry; a multiline key may not be an implicit key');

      } else {
        state.tag = _tag;
        state.anchor = _anchor;
        return true; // Keep the result of `composeNode`.
      }
    }

    //
    // Common reading code for both explicit and implicit notations.
    //
    if (state.line === _line || state.lineIndent > nodeIndent) {
      if (atExplicitKey) {
        _keyLine = state.line;
        _keyLineStart = state.lineStart;
        _keyPos = state.position;
      }

      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
        if (atExplicitKey) {
          keyNode = state.result;
        } else {
          valueNode = state.result;
        }
      }

      if (!atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
        keyTag = keyNode = valueNode = null;
      }

      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
    }

    if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
      throwError(state, 'bad indentation of a mapping entry');
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }

  //
  // Epilogue.
  //

  // Special case: last mapping's node contains only the key in explicit notation.
  if (atExplicitKey) {
    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
  }

  // Expose the resulting mapping.
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = 'mapping';
    state.result = _result;
  }

  return detected;
}

function readTagProperty(state) {
  var _position,
      isVerbatim = false,
      isNamed    = false,
      tagHandle,
      tagName,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x21/* ! */) return false;

  if (state.tag !== null) {
    throwError(state, 'duplication of a tag property');
  }

  ch = state.input.charCodeAt(++state.position);

  if (ch === 0x3C/* < */) {
    isVerbatim = true;
    ch = state.input.charCodeAt(++state.position);

  } else if (ch === 0x21/* ! */) {
    isNamed = true;
    tagHandle = '!!';
    ch = state.input.charCodeAt(++state.position);

  } else {
    tagHandle = '!';
  }

  _position = state.position;

  if (isVerbatim) {
    do { ch = state.input.charCodeAt(++state.position); }
    while (ch !== 0 && ch !== 0x3E/* > */);

    if (state.position < state.length) {
      tagName = state.input.slice(_position, state.position);
      ch = state.input.charCodeAt(++state.position);
    } else {
      throwError(state, 'unexpected end of the stream within a verbatim tag');
    }
  } else {
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {

      if (ch === 0x21/* ! */) {
        if (!isNamed) {
          tagHandle = state.input.slice(_position - 1, state.position + 1);

          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
            throwError(state, 'named tag handle cannot contain such characters');
          }

          isNamed = true;
          _position = state.position + 1;
        } else {
          throwError(state, 'tag suffix cannot contain exclamation marks');
        }
      }

      ch = state.input.charCodeAt(++state.position);
    }

    tagName = state.input.slice(_position, state.position);

    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
      throwError(state, 'tag suffix cannot contain flow indicator characters');
    }
  }

  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
    throwError(state, 'tag name cannot contain such characters: ' + tagName);
  }

  try {
    tagName = decodeURIComponent(tagName);
  } catch (err) {
    throwError(state, 'tag name is malformed: ' + tagName);
  }

  if (isVerbatim) {
    state.tag = tagName;

  } else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) {
    state.tag = state.tagMap[tagHandle] + tagName;

  } else if (tagHandle === '!') {
    state.tag = '!' + tagName;

  } else if (tagHandle === '!!') {
    state.tag = 'tag:yaml.org,2002:' + tagName;

  } else {
    throwError(state, 'undeclared tag handle "' + tagHandle + '"');
  }

  return true;
}

function readAnchorProperty(state) {
  var _position,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x26/* & */) return false;

  if (state.anchor !== null) {
    throwError(state, 'duplication of an anchor property');
  }

  ch = state.input.charCodeAt(++state.position);
  _position = state.position;

  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }

  if (state.position === _position) {
    throwError(state, 'name of an anchor node must contain at least one character');
  }

  state.anchor = state.input.slice(_position, state.position);
  return true;
}

function readAlias(state) {
  var _position, alias,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x2A/* * */) return false;

  ch = state.input.charCodeAt(++state.position);
  _position = state.position;

  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }

  if (state.position === _position) {
    throwError(state, 'name of an alias node must contain at least one character');
  }

  alias = state.input.slice(_position, state.position);

  if (!_hasOwnProperty$1.call(state.anchorMap, alias)) {
    throwError(state, 'unidentified alias "' + alias + '"');
  }

  state.result = state.anchorMap[alias];
  skipSeparationSpace(state, true, -1);
  return true;
}

function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
  var allowBlockStyles,
      allowBlockScalars,
      allowBlockCollections,
      indentStatus = 1, // 1: this>parent, 0: this=parent, -1: this<parent
      atNewLine  = false,
      hasContent = false,
      typeIndex,
      typeQuantity,
      typeList,
      type,
      flowIndent,
      blockIndent;

  if (state.listener !== null) {
    state.listener('open', state);
  }

  state.tag    = null;
  state.anchor = null;
  state.kind   = null;
  state.result = null;

  allowBlockStyles = allowBlockScalars = allowBlockCollections =
    CONTEXT_BLOCK_OUT === nodeContext ||
    CONTEXT_BLOCK_IN  === nodeContext;

  if (allowToSeek) {
    if (skipSeparationSpace(state, true, -1)) {
      atNewLine = true;

      if (state.lineIndent > parentIndent) {
        indentStatus = 1;
      } else if (state.lineIndent === parentIndent) {
        indentStatus = 0;
      } else if (state.lineIndent < parentIndent) {
        indentStatus = -1;
      }
    }
  }

  if (indentStatus === 1) {
    while (readTagProperty(state) || readAnchorProperty(state)) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        allowBlockCollections = allowBlockStyles;

        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      } else {
        allowBlockCollections = false;
      }
    }
  }

  if (allowBlockCollections) {
    allowBlockCollections = atNewLine || allowCompact;
  }

  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
    if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
      flowIndent = parentIndent;
    } else {
      flowIndent = parentIndent + 1;
    }

    blockIndent = state.position - state.lineStart;

    if (indentStatus === 1) {
      if (allowBlockCollections &&
          (readBlockSequence(state, blockIndent) ||
           readBlockMapping(state, blockIndent, flowIndent)) ||
          readFlowCollection(state, flowIndent)) {
        hasContent = true;
      } else {
        if ((allowBlockScalars && readBlockScalar(state, flowIndent)) ||
            readSingleQuotedScalar(state, flowIndent) ||
            readDoubleQuotedScalar(state, flowIndent)) {
          hasContent = true;

        } else if (readAlias(state)) {
          hasContent = true;

          if (state.tag !== null || state.anchor !== null) {
            throwError(state, 'alias node should not have any properties');
          }

        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
          hasContent = true;

          if (state.tag === null) {
            state.tag = '?';
          }
        }

        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else if (indentStatus === 0) {
      // Special case: block sequences are allowed to have same indentation level as the parent.
      // http://www.yaml.org/spec/1.2/spec.html#id2799784
      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
    }
  }

  if (state.tag === null) {
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = state.result;
    }

  } else if (state.tag === '?') {
    // Implicit resolving is not allowed for non-scalar types, and '?'
    // non-specific tag is only automatically assigned to plain scalars.
    //
    // We only need to check kind conformity in case user explicitly assigns '?'
    // tag, for example like this: "!<?> [0]"
    //
    if (state.result !== null && state.kind !== 'scalar') {
      throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
    }

    for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
      type = state.implicitTypes[typeIndex];

      if (type.resolve(state.result)) { // `state.result` updated in resolver if matched
        state.result = type.construct(state.result);
        state.tag = type.tag;
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
        break;
      }
    }
  } else if (state.tag !== '!') {
    if (_hasOwnProperty$1.call(state.typeMap[state.kind || 'fallback'], state.tag)) {
      type = state.typeMap[state.kind || 'fallback'][state.tag];
    } else {
      // looking for multi type
      type = null;
      typeList = state.typeMap.multi[state.kind || 'fallback'];

      for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
        if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
          type = typeList[typeIndex];
          break;
        }
      }
    }

    if (!type) {
      throwError(state, 'unknown tag !<' + state.tag + '>');
    }

    if (state.result !== null && type.kind !== state.kind) {
      throwError(state, 'unacceptable node kind for !<' + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
    }

    if (!type.resolve(state.result, state.tag)) { // `state.result` updated in resolver if matched
      throwError(state, 'cannot resolve a node with !<' + state.tag + '> explicit tag');
    } else {
      state.result = type.construct(state.result, state.tag);
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = state.result;
      }
    }
  }

  if (state.listener !== null) {
    state.listener('close', state);
  }
  return state.tag !== null ||  state.anchor !== null || hasContent;
}

function readDocument(state) {
  var documentStart = state.position,
      _position,
      directiveName,
      directiveArgs,
      hasDirectives = false,
      ch;

  state.version = null;
  state.checkLineBreaks = state.legacy;
  state.tagMap = Object.create(null);
  state.anchorMap = Object.create(null);

  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    skipSeparationSpace(state, true, -1);

    ch = state.input.charCodeAt(state.position);

    if (state.lineIndent > 0 || ch !== 0x25/* % */) {
      break;
    }

    hasDirectives = true;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;

    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }

    directiveName = state.input.slice(_position, state.position);
    directiveArgs = [];

    if (directiveName.length < 1) {
      throwError(state, 'directive name must not be less than one character in length');
    }

    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }

      if (ch === 0x23/* # */) {
        do { ch = state.input.charCodeAt(++state.position); }
        while (ch !== 0 && !is_EOL(ch));
        break;
      }

      if (is_EOL(ch)) break;

      _position = state.position;

      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }

      directiveArgs.push(state.input.slice(_position, state.position));
    }

    if (ch !== 0) readLineBreak(state);

    if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
      directiveHandlers[directiveName](state, directiveName, directiveArgs);
    } else {
      throwWarning(state, 'unknown document directive "' + directiveName + '"');
    }
  }

  skipSeparationSpace(state, true, -1);

  if (state.lineIndent === 0 &&
      state.input.charCodeAt(state.position)     === 0x2D/* - */ &&
      state.input.charCodeAt(state.position + 1) === 0x2D/* - */ &&
      state.input.charCodeAt(state.position + 2) === 0x2D/* - */) {
    state.position += 3;
    skipSeparationSpace(state, true, -1);

  } else if (hasDirectives) {
    throwError(state, 'directives end mark is expected');
  }

  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
  skipSeparationSpace(state, true, -1);

  if (state.checkLineBreaks &&
      PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
    throwWarning(state, 'non-ASCII line breaks are interpreted as content');
  }

  state.documents.push(state.result);

  if (state.position === state.lineStart && testDocumentSeparator(state)) {

    if (state.input.charCodeAt(state.position) === 0x2E/* . */) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    }
    return;
  }

  if (state.position < (state.length - 1)) {
    throwError(state, 'end of the stream or a document separator is expected');
  } else {
    return;
  }
}


function loadDocuments(input, options) {
  input = String(input);
  options = options || {};

  if (input.length !== 0) {

    // Add tailing `\n` if not exists
    if (input.charCodeAt(input.length - 1) !== 0x0A/* LF */ &&
        input.charCodeAt(input.length - 1) !== 0x0D/* CR */) {
      input += '\n';
    }

    // Strip BOM
    if (input.charCodeAt(0) === 0xFEFF) {
      input = input.slice(1);
    }
  }

  var state = new State$1(input, options);

  var nullpos = input.indexOf('\0');

  if (nullpos !== -1) {
    state.position = nullpos;
    throwError(state, 'null byte is not allowed in input');
  }

  // Use 0 as string terminator. That significantly simplifies bounds check.
  state.input += '\0';

  while (state.input.charCodeAt(state.position) === 0x20/* Space */) {
    state.lineIndent += 1;
    state.position += 1;
  }

  while (state.position < (state.length - 1)) {
    readDocument(state);
  }

  return state.documents;
}


function loadAll$1(input, iterator, options) {
  if (iterator !== null && typeof iterator === 'object' && typeof options === 'undefined') {
    options = iterator;
    iterator = null;
  }

  var documents = loadDocuments(input, options);

  if (typeof iterator !== 'function') {
    return documents;
  }

  for (var index = 0, length = documents.length; index < length; index += 1) {
    iterator(documents[index]);
  }
}


function load$1(input, options) {
  var documents = loadDocuments(input, options);

  if (documents.length === 0) {
    /*eslint-disable no-undefined*/
    return undefined;
  } else if (documents.length === 1) {
    return documents[0];
  }
  throw new exception('expected a single document in the stream, but found more');
}


var loadAll_1 = loadAll$1;
var load_1    = load$1;

var loader = {
	loadAll: loadAll_1,
	load: load_1
};

/*eslint-disable no-use-before-define*/





var _toString       = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;

var CHAR_BOM                  = 0xFEFF;
var CHAR_TAB                  = 0x09; /* Tab */
var CHAR_LINE_FEED            = 0x0A; /* LF */
var CHAR_CARRIAGE_RETURN      = 0x0D; /* CR */
var CHAR_SPACE                = 0x20; /* Space */
var CHAR_EXCLAMATION          = 0x21; /* ! */
var CHAR_DOUBLE_QUOTE         = 0x22; /* " */
var CHAR_SHARP                = 0x23; /* # */
var CHAR_PERCENT              = 0x25; /* % */
var CHAR_AMPERSAND            = 0x26; /* & */
var CHAR_SINGLE_QUOTE         = 0x27; /* ' */
var CHAR_ASTERISK             = 0x2A; /* * */
var CHAR_COMMA                = 0x2C; /* , */
var CHAR_MINUS                = 0x2D; /* - */
var CHAR_COLON                = 0x3A; /* : */
var CHAR_EQUALS               = 0x3D; /* = */
var CHAR_GREATER_THAN         = 0x3E; /* > */
var CHAR_QUESTION             = 0x3F; /* ? */
var CHAR_COMMERCIAL_AT        = 0x40; /* @ */
var CHAR_LEFT_SQUARE_BRACKET  = 0x5B; /* [ */
var CHAR_RIGHT_SQUARE_BRACKET = 0x5D; /* ] */
var CHAR_GRAVE_ACCENT         = 0x60; /* ` */
var CHAR_LEFT_CURLY_BRACKET   = 0x7B; /* { */
var CHAR_VERTICAL_LINE        = 0x7C; /* | */
var CHAR_RIGHT_CURLY_BRACKET  = 0x7D; /* } */

var ESCAPE_SEQUENCES = {};

ESCAPE_SEQUENCES[0x00]   = '\\0';
ESCAPE_SEQUENCES[0x07]   = '\\a';
ESCAPE_SEQUENCES[0x08]   = '\\b';
ESCAPE_SEQUENCES[0x09]   = '\\t';
ESCAPE_SEQUENCES[0x0A]   = '\\n';
ESCAPE_SEQUENCES[0x0B]   = '\\v';
ESCAPE_SEQUENCES[0x0C]   = '\\f';
ESCAPE_SEQUENCES[0x0D]   = '\\r';
ESCAPE_SEQUENCES[0x1B]   = '\\e';
ESCAPE_SEQUENCES[0x22]   = '\\"';
ESCAPE_SEQUENCES[0x5C]   = '\\\\';
ESCAPE_SEQUENCES[0x85]   = '\\N';
ESCAPE_SEQUENCES[0xA0]   = '\\_';
ESCAPE_SEQUENCES[0x2028] = '\\L';
ESCAPE_SEQUENCES[0x2029] = '\\P';

var DEPRECATED_BOOLEANS_SYNTAX = [
  'y', 'Y', 'yes', 'Yes', 'YES', 'on', 'On', 'ON',
  'n', 'N', 'no', 'No', 'NO', 'off', 'Off', 'OFF'
];

var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;

function compileStyleMap(schema, map) {
  var result, keys, index, length, tag, style, type;

  if (map === null) return {};

  result = {};
  keys = Object.keys(map);

  for (index = 0, length = keys.length; index < length; index += 1) {
    tag = keys[index];
    style = String(map[tag]);

    if (tag.slice(0, 2) === '!!') {
      tag = 'tag:yaml.org,2002:' + tag.slice(2);
    }
    type = schema.compiledTypeMap['fallback'][tag];

    if (type && _hasOwnProperty.call(type.styleAliases, style)) {
      style = type.styleAliases[style];
    }

    result[tag] = style;
  }

  return result;
}

function encodeHex(character) {
  var string, handle, length;

  string = character.toString(16).toUpperCase();

  if (character <= 0xFF) {
    handle = 'x';
    length = 2;
  } else if (character <= 0xFFFF) {
    handle = 'u';
    length = 4;
  } else if (character <= 0xFFFFFFFF) {
    handle = 'U';
    length = 8;
  } else {
    throw new exception('code point within a string may not be greater than 0xFFFFFFFF');
  }

  return '\\' + handle + common.repeat('0', length - string.length) + string;
}


var QUOTING_TYPE_SINGLE = 1,
    QUOTING_TYPE_DOUBLE = 2;

function State(options) {
  this.schema        = options['schema'] || _default;
  this.indent        = Math.max(1, (options['indent'] || 2));
  this.noArrayIndent = options['noArrayIndent'] || false;
  this.skipInvalid   = options['skipInvalid'] || false;
  this.flowLevel     = (common.isNothing(options['flowLevel']) ? -1 : options['flowLevel']);
  this.styleMap      = compileStyleMap(this.schema, options['styles'] || null);
  this.sortKeys      = options['sortKeys'] || false;
  this.lineWidth     = options['lineWidth'] || 80;
  this.noRefs        = options['noRefs'] || false;
  this.noCompatMode  = options['noCompatMode'] || false;
  this.condenseFlow  = options['condenseFlow'] || false;
  this.quotingType   = options['quotingType'] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
  this.forceQuotes   = options['forceQuotes'] || false;
  this.replacer      = typeof options['replacer'] === 'function' ? options['replacer'] : null;

  this.implicitTypes = this.schema.compiledImplicit;
  this.explicitTypes = this.schema.compiledExplicit;

  this.tag = null;
  this.result = '';

  this.duplicates = [];
  this.usedDuplicates = null;
}

// Indents every line in a string. Empty lines (\n only) are not indented.
function indentString(string, spaces) {
  var ind = common.repeat(' ', spaces),
      position = 0,
      next = -1,
      result = '',
      line,
      length = string.length;

  while (position < length) {
    next = string.indexOf('\n', position);
    if (next === -1) {
      line = string.slice(position);
      position = length;
    } else {
      line = string.slice(position, next + 1);
      position = next + 1;
    }

    if (line.length && line !== '\n') result += ind;

    result += line;
  }

  return result;
}

function generateNextLine(state, level) {
  return '\n' + common.repeat(' ', state.indent * level);
}

function testImplicitResolving(state, str) {
  var index, length, type;

  for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
    type = state.implicitTypes[index];

    if (type.resolve(str)) {
      return true;
    }
  }

  return false;
}

// [33] s-white ::= s-space | s-tab
function isWhitespace(c) {
  return c === CHAR_SPACE || c === CHAR_TAB;
}

// Returns true if the character can be printed without escaping.
// From YAML 1.2: "any allowed characters known to be non-printable
// should also be escaped. [However,] This isn’t mandatory"
// Derived from nb-char - \t - #x85 - #xA0 - #x2028 - #x2029.
function isPrintable(c) {
  return  (0x00020 <= c && c <= 0x00007E)
      || ((0x000A1 <= c && c <= 0x00D7FF) && c !== 0x2028 && c !== 0x2029)
      || ((0x0E000 <= c && c <= 0x00FFFD) && c !== CHAR_BOM)
      ||  (0x10000 <= c && c <= 0x10FFFF);
}

// [34] ns-char ::= nb-char - s-white
// [27] nb-char ::= c-printable - b-char - c-byte-order-mark
// [26] b-char  ::= b-line-feed | b-carriage-return
// Including s-white (for some reason, examples doesn't match specs in this aspect)
// ns-char ::= c-printable - b-line-feed - b-carriage-return - c-byte-order-mark
function isNsCharOrWhitespace(c) {
  return isPrintable(c)
    && c !== CHAR_BOM
    // - b-char
    && c !== CHAR_CARRIAGE_RETURN
    && c !== CHAR_LINE_FEED;
}

// [127]  ns-plain-safe(c) ::= c = flow-out  ⇒ ns-plain-safe-out
//                             c = flow-in   ⇒ ns-plain-safe-in
//                             c = block-key ⇒ ns-plain-safe-out
//                             c = flow-key  ⇒ ns-plain-safe-in
// [128] ns-plain-safe-out ::= ns-char
// [129]  ns-plain-safe-in ::= ns-char - c-flow-indicator
// [130]  ns-plain-char(c) ::=  ( ns-plain-safe(c) - “:” - “#” )
//                            | ( /* An ns-char preceding */ “#” )
//                            | ( “:” /* Followed by an ns-plain-safe(c) */ )
function isPlainSafe(c, prev, inblock) {
  var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
  var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
  return (
    // ns-plain-safe
    inblock ? // c = flow-in
      cIsNsCharOrWhitespace
      : cIsNsCharOrWhitespace
        // - c-flow-indicator
        && c !== CHAR_COMMA
        && c !== CHAR_LEFT_SQUARE_BRACKET
        && c !== CHAR_RIGHT_SQUARE_BRACKET
        && c !== CHAR_LEFT_CURLY_BRACKET
        && c !== CHAR_RIGHT_CURLY_BRACKET
  )
    // ns-plain-char
    && c !== CHAR_SHARP // false on '#'
    && !(prev === CHAR_COLON && !cIsNsChar) // false on ': '
    || (isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP) // change to true on '[^ ]#'
    || (prev === CHAR_COLON && cIsNsChar); // change to true on ':[^ ]'
}

// Simplified test for values allowed as the first character in plain style.
function isPlainSafeFirst(c) {
  // Uses a subset of ns-char - c-indicator
  // where ns-char = nb-char - s-white.
  // No support of ( ( “?” | “:” | “-” ) /* Followed by an ns-plain-safe(c)) */ ) part
  return isPrintable(c) && c !== CHAR_BOM
    && !isWhitespace(c) // - s-white
    // - (c-indicator ::=
    // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
    && c !== CHAR_MINUS
    && c !== CHAR_QUESTION
    && c !== CHAR_COLON
    && c !== CHAR_COMMA
    && c !== CHAR_LEFT_SQUARE_BRACKET
    && c !== CHAR_RIGHT_SQUARE_BRACKET
    && c !== CHAR_LEFT_CURLY_BRACKET
    && c !== CHAR_RIGHT_CURLY_BRACKET
    // | “#” | “&” | “*” | “!” | “|” | “=” | “>” | “'” | “"”
    && c !== CHAR_SHARP
    && c !== CHAR_AMPERSAND
    && c !== CHAR_ASTERISK
    && c !== CHAR_EXCLAMATION
    && c !== CHAR_VERTICAL_LINE
    && c !== CHAR_EQUALS
    && c !== CHAR_GREATER_THAN
    && c !== CHAR_SINGLE_QUOTE
    && c !== CHAR_DOUBLE_QUOTE
    // | “%” | “@” | “`”)
    && c !== CHAR_PERCENT
    && c !== CHAR_COMMERCIAL_AT
    && c !== CHAR_GRAVE_ACCENT;
}

// Simplified test for values allowed as the last character in plain style.
function isPlainSafeLast(c) {
  // just not whitespace or colon, it will be checked to be plain character later
  return !isWhitespace(c) && c !== CHAR_COLON;
}

// Same as 'string'.codePointAt(pos), but works in older browsers.
function codePointAt(string, pos) {
  var first = string.charCodeAt(pos), second;
  if (first >= 0xD800 && first <= 0xDBFF && pos + 1 < string.length) {
    second = string.charCodeAt(pos + 1);
    if (second >= 0xDC00 && second <= 0xDFFF) {
      // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
    }
  }
  return first;
}

// Determines whether block indentation indicator is required.
function needIndentIndicator(string) {
  var leadingSpaceRe = /^\n* /;
  return leadingSpaceRe.test(string);
}

var STYLE_PLAIN   = 1,
    STYLE_SINGLE  = 2,
    STYLE_LITERAL = 3,
    STYLE_FOLDED  = 4,
    STYLE_DOUBLE  = 5;

// Determines which scalar styles are possible and returns the preferred style.
// lineWidth = -1 => no limit.
// Pre-conditions: str.length > 0.
// Post-conditions:
//    STYLE_PLAIN or STYLE_SINGLE => no \n are in the string.
//    STYLE_LITERAL => no lines are suitable for folding (or lineWidth is -1).
//    STYLE_FOLDED => a line > lineWidth and can be folded (and lineWidth != -1).
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth,
  testAmbiguousType, quotingType, forceQuotes, inblock) {

  var i;
  var char = 0;
  var prevChar = null;
  var hasLineBreak = false;
  var hasFoldableLine = false; // only checked if shouldTrackWidth
  var shouldTrackWidth = lineWidth !== -1;
  var previousLineBreak = -1; // count the first line correctly
  var plain = isPlainSafeFirst(codePointAt(string, 0))
          && isPlainSafeLast(codePointAt(string, string.length - 1));

  if (singleLineOnly || forceQuotes) {
    // Case: no block styles.
    // Check for disallowed characters to rule out plain and single.
    for (i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
  } else {
    // Case: block styles permitted.
    for (i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (char === CHAR_LINE_FEED) {
        hasLineBreak = true;
        // Check if any line can be folded.
        if (shouldTrackWidth) {
          hasFoldableLine = hasFoldableLine ||
            // Foldable line = too long, and not more-indented.
            (i - previousLineBreak - 1 > lineWidth &&
             string[previousLineBreak + 1] !== ' ');
          previousLineBreak = i;
        }
      } else if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
    // in case the end is missing a \n
    hasFoldableLine = hasFoldableLine || (shouldTrackWidth &&
      (i - previousLineBreak - 1 > lineWidth &&
       string[previousLineBreak + 1] !== ' '));
  }
  // Although every style can represent \n without escaping, prefer block styles
  // for multiline, since they're more readable and they don't add empty lines.
  // Also prefer folding a super-long line.
  if (!hasLineBreak && !hasFoldableLine) {
    // Strings interpretable as another type have to be quoted;
    // e.g. the string 'true' vs. the boolean true.
    if (plain && !forceQuotes && !testAmbiguousType(string)) {
      return STYLE_PLAIN;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
  }
  // Edge case: block indentation indicator can only have one digit.
  if (indentPerLevel > 9 && needIndentIndicator(string)) {
    return STYLE_DOUBLE;
  }
  // At this point we know block styles are valid.
  // Prefer literal style unless we want to fold.
  if (!forceQuotes) {
    return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
  }
  return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
}

// Note: line breaking/folding is implemented for only the folded style.
// NB. We drop the last trailing newline (if any) of a returned block scalar
//  since the dumper adds its own newline. This always works:
//    • No ending newline => unaffected; already using strip "-" chomping.
//    • Ending newline    => removed then restored.
//  Importantly, this keeps the "+" chomp indicator from gaining an extra line.
function writeScalar(state, string, level, iskey, inblock) {
  state.dump = (function () {
    if (string.length === 0) {
      return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
    }
    if (!state.noCompatMode) {
      if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
        return state.quotingType === QUOTING_TYPE_DOUBLE ? ('"' + string + '"') : ("'" + string + "'");
      }
    }

    var indent = state.indent * Math.max(1, level); // no 0-indent scalars
    // As indentation gets deeper, let the width decrease monotonically
    // to the lower bound min(state.lineWidth, 40).
    // Note that this implies
    //  state.lineWidth ≤ 40 + state.indent: width is fixed at the lower bound.
    //  state.lineWidth > 40 + state.indent: width decreases until the lower bound.
    // This behaves better than a constant minimum width which disallows narrower options,
    // or an indent threshold which causes the width to suddenly increase.
    var lineWidth = state.lineWidth === -1
      ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);

    // Without knowing if keys are implicit/explicit, assume implicit for safety.
    var singleLineOnly = iskey
      // No block styles in flow mode.
      || (state.flowLevel > -1 && level >= state.flowLevel);
    function testAmbiguity(string) {
      return testImplicitResolving(state, string);
    }

    switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth,
      testAmbiguity, state.quotingType, state.forceQuotes && !iskey, inblock)) {

      case STYLE_PLAIN:
        return string;
      case STYLE_SINGLE:
        return "'" + string.replace(/'/g, "''") + "'";
      case STYLE_LITERAL:
        return '|' + blockHeader(string, state.indent)
          + dropEndingNewline(indentString(string, indent));
      case STYLE_FOLDED:
        return '>' + blockHeader(string, state.indent)
          + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
      case STYLE_DOUBLE:
        return '"' + escapeString(string) + '"';
      default:
        throw new exception('impossible error: invalid scalar style');
    }
  }());
}

// Pre-conditions: string is valid for a block scalar, 1 <= indentPerLevel <= 9.
function blockHeader(string, indentPerLevel) {
  var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : '';

  // note the special case: the string '\n' counts as a "trailing" empty line.
  var clip =          string[string.length - 1] === '\n';
  var keep = clip && (string[string.length - 2] === '\n' || string === '\n');
  var chomp = keep ? '+' : (clip ? '' : '-');

  return indentIndicator + chomp + '\n';
}

// (See the note for writeScalar.)
function dropEndingNewline(string) {
  return string[string.length - 1] === '\n' ? string.slice(0, -1) : string;
}

// Note: a long line without a suitable break point will exceed the width limit.
// Pre-conditions: every char in str isPrintable, str.length > 0, width > 0.
function foldString(string, width) {
  // In folded style, $k$ consecutive newlines output as $k+1$ newlines—
  // unless they're before or after a more-indented line, or at the very
  // beginning or end, in which case $k$ maps to $k$.
  // Therefore, parse each chunk as newline(s) followed by a content line.
  var lineRe = /(\n+)([^\n]*)/g;

  // first line (possibly an empty line)
  var result = (function () {
    var nextLF = string.indexOf('\n');
    nextLF = nextLF !== -1 ? nextLF : string.length;
    lineRe.lastIndex = nextLF;
    return foldLine(string.slice(0, nextLF), width);
  }());
  // If we haven't reached the first content line yet, don't add an extra \n.
  var prevMoreIndented = string[0] === '\n' || string[0] === ' ';
  var moreIndented;

  // rest of the lines
  var match;
  while ((match = lineRe.exec(string))) {
    var prefix = match[1], line = match[2];
    moreIndented = (line[0] === ' ');
    result += prefix
      + (!prevMoreIndented && !moreIndented && line !== ''
        ? '\n' : '')
      + foldLine(line, width);
    prevMoreIndented = moreIndented;
  }

  return result;
}

// Greedy line breaking.
// Picks the longest line under the limit each time,
// otherwise settles for the shortest line over the limit.
// NB. More-indented lines *cannot* be folded, as that would add an extra \n.
function foldLine(line, width) {
  if (line === '' || line[0] === ' ') return line;

  // Since a more-indented line adds a \n, breaks can't be followed by a space.
  var breakRe = / [^ ]/g; // note: the match index will always be <= length-2.
  var match;
  // start is an inclusive index. end, curr, and next are exclusive.
  var start = 0, end, curr = 0, next = 0;
  var result = '';

  // Invariants: 0 <= start <= length-1.
  //   0 <= curr <= next <= max(0, length-2). curr - start <= width.
  // Inside the loop:
  //   A match implies length >= 2, so curr and next are <= length-2.
  while ((match = breakRe.exec(line))) {
    next = match.index;
    // maintain invariant: curr - start <= width
    if (next - start > width) {
      end = (curr > start) ? curr : next; // derive end <= length-2
      result += '\n' + line.slice(start, end);
      // skip the space that was output as \n
      start = end + 1;                    // derive start <= length-1
    }
    curr = next;
  }

  // By the invariants, start <= length-1, so there is something left over.
  // It is either the whole string or a part starting from non-whitespace.
  result += '\n';
  // Insert a break if the remainder is too long and there is a break available.
  if (line.length - start > width && curr > start) {
    result += line.slice(start, curr) + '\n' + line.slice(curr + 1);
  } else {
    result += line.slice(start);
  }

  return result.slice(1); // drop extra \n joiner
}

// Escapes a double-quoted string.
function escapeString(string) {
  var result = '';
  var char = 0;
  var escapeSeq;

  for (var i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
    char = codePointAt(string, i);
    escapeSeq = ESCAPE_SEQUENCES[char];

    if (!escapeSeq && isPrintable(char)) {
      result += string[i];
      if (char >= 0x10000) result += string[i + 1];
    } else {
      result += escapeSeq || encodeHex(char);
    }
  }

  return result;
}

function writeFlowSequence(state, level, object) {
  var _result = '',
      _tag    = state.tag,
      index,
      length,
      value;

  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];

    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }

    // Write only valid elements, put null instead of invalid elements.
    if (writeNode(state, level, value, false, false) ||
        (typeof value === 'undefined' &&
         writeNode(state, level, null, false, false))) {

      if (_result !== '') _result += ',' + (!state.condenseFlow ? ' ' : '');
      _result += state.dump;
    }
  }

  state.tag = _tag;
  state.dump = '[' + _result + ']';
}

function writeBlockSequence(state, level, object, compact) {
  var _result = '',
      _tag    = state.tag,
      index,
      length,
      value;

  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];

    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }

    // Write only valid elements, put null instead of invalid elements.
    if (writeNode(state, level + 1, value, true, true, false, true) ||
        (typeof value === 'undefined' &&
         writeNode(state, level + 1, null, true, true, false, true))) {

      if (!compact || _result !== '') {
        _result += generateNextLine(state, level);
      }

      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        _result += '-';
      } else {
        _result += '- ';
      }

      _result += state.dump;
    }
  }

  state.tag = _tag;
  state.dump = _result || '[]'; // Empty sequence if no valid values.
}

function writeFlowMapping(state, level, object) {
  var _result       = '',
      _tag          = state.tag,
      objectKeyList = Object.keys(object),
      index,
      length,
      objectKey,
      objectValue,
      pairBuffer;

  for (index = 0, length = objectKeyList.length; index < length; index += 1) {

    pairBuffer = '';
    if (_result !== '') pairBuffer += ', ';

    if (state.condenseFlow) pairBuffer += '"';

    objectKey = objectKeyList[index];
    objectValue = object[objectKey];

    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }

    if (!writeNode(state, level, objectKey, false, false)) {
      continue; // Skip this pair because of invalid key;
    }

    if (state.dump.length > 1024) pairBuffer += '? ';

    pairBuffer += state.dump + (state.condenseFlow ? '"' : '') + ':' + (state.condenseFlow ? '' : ' ');

    if (!writeNode(state, level, objectValue, false, false)) {
      continue; // Skip this pair because of invalid value.
    }

    pairBuffer += state.dump;

    // Both key and value are valid.
    _result += pairBuffer;
  }

  state.tag = _tag;
  state.dump = '{' + _result + '}';
}

function writeBlockMapping(state, level, object, compact) {
  var _result       = '',
      _tag          = state.tag,
      objectKeyList = Object.keys(object),
      index,
      length,
      objectKey,
      objectValue,
      explicitPair,
      pairBuffer;

  // Allow sorting keys so that the output file is deterministic
  if (state.sortKeys === true) {
    // Default sorting
    objectKeyList.sort();
  } else if (typeof state.sortKeys === 'function') {
    // Custom sort function
    objectKeyList.sort(state.sortKeys);
  } else if (state.sortKeys) {
    // Something is wrong
    throw new exception('sortKeys must be a boolean or a function');
  }

  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = '';

    if (!compact || _result !== '') {
      pairBuffer += generateNextLine(state, level);
    }

    objectKey = objectKeyList[index];
    objectValue = object[objectKey];

    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }

    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
      continue; // Skip this pair because of invalid key.
    }

    explicitPair = (state.tag !== null && state.tag !== '?') ||
                   (state.dump && state.dump.length > 1024);

    if (explicitPair) {
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += '?';
      } else {
        pairBuffer += '? ';
      }
    }

    pairBuffer += state.dump;

    if (explicitPair) {
      pairBuffer += generateNextLine(state, level);
    }

    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
      continue; // Skip this pair because of invalid value.
    }

    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
      pairBuffer += ':';
    } else {
      pairBuffer += ': ';
    }

    pairBuffer += state.dump;

    // Both key and value are valid.
    _result += pairBuffer;
  }

  state.tag = _tag;
  state.dump = _result || '{}'; // Empty mapping if no valid pairs.
}

function detectType(state, object, explicit) {
  var _result, typeList, index, length, type, style;

  typeList = explicit ? state.explicitTypes : state.implicitTypes;

  for (index = 0, length = typeList.length; index < length; index += 1) {
    type = typeList[index];

    if ((type.instanceOf  || type.predicate) &&
        (!type.instanceOf || ((typeof object === 'object') && (object instanceof type.instanceOf))) &&
        (!type.predicate  || type.predicate(object))) {

      if (explicit) {
        if (type.multi && type.representName) {
          state.tag = type.representName(object);
        } else {
          state.tag = type.tag;
        }
      } else {
        state.tag = '?';
      }

      if (type.represent) {
        style = state.styleMap[type.tag] || type.defaultStyle;

        if (_toString.call(type.represent) === '[object Function]') {
          _result = type.represent(object, style);
        } else if (_hasOwnProperty.call(type.represent, style)) {
          _result = type.represent[style](object, style);
        } else {
          throw new exception('!<' + type.tag + '> tag resolver accepts not "' + style + '" style');
        }

        state.dump = _result;
      }

      return true;
    }
  }

  return false;
}

// Serializes `object` and writes it to global `result`.
// Returns true on success, or false on invalid object.
//
function writeNode(state, level, object, block, compact, iskey, isblockseq) {
  state.tag = null;
  state.dump = object;

  if (!detectType(state, object, false)) {
    detectType(state, object, true);
  }

  var type = _toString.call(state.dump);
  var inblock = block;
  var tagStr;

  if (block) {
    block = (state.flowLevel < 0 || state.flowLevel > level);
  }

  var objectOrArray = type === '[object Object]' || type === '[object Array]',
      duplicateIndex,
      duplicate;

  if (objectOrArray) {
    duplicateIndex = state.duplicates.indexOf(object);
    duplicate = duplicateIndex !== -1;
  }

  if ((state.tag !== null && state.tag !== '?') || duplicate || (state.indent !== 2 && level > 0)) {
    compact = false;
  }

  if (duplicate && state.usedDuplicates[duplicateIndex]) {
    state.dump = '*ref_' + duplicateIndex;
  } else {
    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
      state.usedDuplicates[duplicateIndex] = true;
    }
    if (type === '[object Object]') {
      if (block && (Object.keys(state.dump).length !== 0)) {
        writeBlockMapping(state, level, state.dump, compact);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + state.dump;
        }
      } else {
        writeFlowMapping(state, level, state.dump);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
        }
      }
    } else if (type === '[object Array]') {
      if (block && (state.dump.length !== 0)) {
        if (state.noArrayIndent && !isblockseq && level > 0) {
          writeBlockSequence(state, level - 1, state.dump, compact);
        } else {
          writeBlockSequence(state, level, state.dump, compact);
        }
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + state.dump;
        }
      } else {
        writeFlowSequence(state, level, state.dump);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
        }
      }
    } else if (type === '[object String]') {
      if (state.tag !== '?') {
        writeScalar(state, state.dump, level, iskey, inblock);
      }
    } else if (type === '[object Undefined]') {
      return false;
    } else {
      if (state.skipInvalid) return false;
      throw new exception('unacceptable kind of an object to dump ' + type);
    }

    if (state.tag !== null && state.tag !== '?') {
      // Need to encode all characters except those allowed by the spec:
      //
      // [35] ns-dec-digit    ::=  [#x30-#x39] /* 0-9 */
      // [36] ns-hex-digit    ::=  ns-dec-digit
      //                         | [#x41-#x46] /* A-F */ | [#x61-#x66] /* a-f */
      // [37] ns-ascii-letter ::=  [#x41-#x5A] /* A-Z */ | [#x61-#x7A] /* a-z */
      // [38] ns-word-char    ::=  ns-dec-digit | ns-ascii-letter | “-”
      // [39] ns-uri-char     ::=  “%” ns-hex-digit ns-hex-digit | ns-word-char | “#”
      //                         | “;” | “/” | “?” | “:” | “@” | “&” | “=” | “+” | “$” | “,”
      //                         | “_” | “.” | “!” | “~” | “*” | “'” | “(” | “)” | “[” | “]”
      //
      // Also need to encode '!' because it has special meaning (end of tag prefix).
      //
      tagStr = encodeURI(
        state.tag[0] === '!' ? state.tag.slice(1) : state.tag
      ).replace(/!/g, '%21');

      if (state.tag[0] === '!') {
        tagStr = '!' + tagStr;
      } else if (tagStr.slice(0, 18) === 'tag:yaml.org,2002:') {
        tagStr = '!!' + tagStr.slice(18);
      } else {
        tagStr = '!<' + tagStr + '>';
      }

      state.dump = tagStr + ' ' + state.dump;
    }
  }

  return true;
}

function getDuplicateReferences(object, state) {
  var objects = [],
      duplicatesIndexes = [],
      index,
      length;

  inspectNode(object, objects, duplicatesIndexes);

  for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
    state.duplicates.push(objects[duplicatesIndexes[index]]);
  }
  state.usedDuplicates = new Array(length);
}

function inspectNode(object, objects, duplicatesIndexes) {
  var objectKeyList,
      index,
      length;

  if (object !== null && typeof object === 'object') {
    index = objects.indexOf(object);
    if (index !== -1) {
      if (duplicatesIndexes.indexOf(index) === -1) {
        duplicatesIndexes.push(index);
      }
    } else {
      objects.push(object);

      if (Array.isArray(object)) {
        for (index = 0, length = object.length; index < length; index += 1) {
          inspectNode(object[index], objects, duplicatesIndexes);
        }
      } else {
        objectKeyList = Object.keys(object);

        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
          inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
        }
      }
    }
  }
}

function dump$1(input, options) {
  options = options || {};

  var state = new State(options);

  if (!state.noRefs) getDuplicateReferences(input, state);

  var value = input;

  if (state.replacer) {
    value = state.replacer.call({ '': value }, '', value);
  }

  if (writeNode(state, 0, value, true, true)) return state.dump + '\n';

  return '';
}

var dump_1 = dump$1;

var dumper = {
	dump: dump_1
};

function renamed(from, to) {
  return function () {
    throw new Error('Function yaml.' + from + ' is removed in js-yaml 4. ' +
      'Use yaml.' + to + ' instead, which is now safe by default.');
  };
}


var Type                = type;
var Schema              = schema;
var FAILSAFE_SCHEMA     = failsafe;
var JSON_SCHEMA         = json;
var CORE_SCHEMA         = core;
var DEFAULT_SCHEMA      = _default;
var load                = loader.load;
var loadAll             = loader.loadAll;
var dump                = dumper.dump;
var YAMLException       = exception;

// Re-export all types in case user wants to create custom schema
var types = {
  binary:    binary,
  float:     float,
  map:       map,
  null:      _null,
  pairs:     pairs,
  set:       set,
  timestamp: timestamp,
  bool:      bool,
  int:       int,
  merge:     merge,
  omap:      omap,
  seq:       seq,
  str:       str
};

// Removed functions from JS-YAML 3.0.x
var safeLoad            = renamed('safeLoad', 'load');
var safeLoadAll         = renamed('safeLoadAll', 'loadAll');
var safeDump            = renamed('safeDump', 'dump');

var jsYaml = {
	Type: Type,
	Schema: Schema,
	FAILSAFE_SCHEMA: FAILSAFE_SCHEMA,
	JSON_SCHEMA: JSON_SCHEMA,
	CORE_SCHEMA: CORE_SCHEMA,
	DEFAULT_SCHEMA: DEFAULT_SCHEMA,
	load: load,
	loadAll: loadAll,
	dump: dump,
	YAMLException: YAMLException,
	types: types,
	safeLoad: safeLoad,
	safeLoadAll: safeLoadAll,
	safeDump: safeDump
};

const loadYamlAsJson = async (yamlFilePath) => {
    try {
        const response = await fetch(yamlFilePath);
        if (!response.ok) {
            throw new Error(`Failed to fetch YAML file. HTTP Status: ${response.status} - ${response.statusText}`);
        }
        const yamlContent = await response.text();
        return jsYaml.load(yamlContent);
    }
    catch (error) {
        console.error('Error fetching and parsing YAML file:', error);
        return {
            type: 'custom:smartqasa-title-card',
            title: 'Missing file.',
        };
    }
};

const listDialogConfig = (dialogTitle, filterType, filterValue, tileType) => {
    const dialogConfig = {
        title: dialogTitle,
        timeout: 60000,
        content: {
            type: 'custom:smartqasa-group-stack',
            filter_type: filterType,
            filter_value: filterValue,
            tile_type: `custom:smartqasa-${tileType}-tile`,
            callingDialog: {},
        },
    };
    dialogConfig.content.callingDialog = {
        ...dialogConfig,
    };
    return dialogConfig;
};

const playerHeaderStyles = `
  .entity {
    color: rgb(var(--sq-primary-font-rgb)) !important;
    font-weight: var(--sq-primary-font-weight) !important;
    font-size: var(--sq-primary-font-size) !important;
  }
`;
const playerControlsStyles = `
  .icons {
    margin-bottom: 1rem;
    gap: 1rem;
  }
  mxmp-ha-player, ha-icon-button {
    --mdc-icon-size: 2rem !important;
    --mdc-icon-button-size: 3rem !important;
    border-radius: 50%;
    background-color: rgba(var(--sq-inactive-rgb), var(--sq-icon-alpha));
  }
  .big-icon {
    --mdc-icon-size: 3rem !important;
    --mdc-icon-button-size: 4rem !important;
    border-radius: 50%;
    background-color: rgba(var(--sq-inactive-rgb), var(--sq-icon-alpha));
  }
`;
const playerCardStyles = `
  ha-card {
    min-width: 40rem !important;
  }
`;
const mediaPlayerCardMod = {
    style: {
        'ha-card': playerCardStyles,
        'mxmp-player$ mxmp-player-header$': playerHeaderStyles,
        'mxmp-player$ mxmp-player-controls$': playerControlsStyles,
    },
};

const dialogTable = {
    admin_mode: {
        icon: 'hass:tools',
        name: 'Admin Mode',
        data: {
            title: 'Admin Mode',
            timeout: 30000,
            content: {
                type: 'custom:smartqasa-pin-verify-card',
                title: 'Enter Admin PIN',
                pin_entity: 'input_text.admin_pin_code',
                outcome_entity: 'input_boolean.admin_mode',
            },
        },
    },
    air_quality: {
        icon: 'hass:air-filter',
        name: 'Air Quality',
        data: {
            title: 'Air Quality',
            size: 'fullscreen',
            timeout: 120000,
            content: {
                type: 'custom:smartqasa-grid-stack',
                columns: 3,
                cards: [
                    {
                        type: 'custom:mini-graph-card',
                        entities: ['sensor.air_quality_radon'],
                        name: 'Radon Gas',
                        icon: 'mdi:radioactive',
                        hours_to_show: 48,
                        smoothing: true,
                        color_thresholds: [
                            {
                                value: 0,
                                color: '#00ff00',
                            },
                            {
                                value: 48.1,
                                color: '#32cd32',
                            },
                            {
                                value: 96.2,
                                color: '#ffd700',
                            },
                            {
                                value: 148,
                                color: '#ff0000',
                            },
                        ],
                        tap_action: {
                            action: 'none',
                        },
                        color_thresholds_transition: 'hard',
                    },
                    {
                        type: 'custom:mini-graph-card',
                        entities: ['sensor.air_quality_co2'],
                        name: 'Carbon Dioxide',
                        icon: 'mdi:molecule-co2',
                        hours_to_show: 48,
                        smoothing: true,
                        color_thresholds: [
                            {
                                value: 0,
                                color: '#00ff00',
                            },
                            {
                                value: 799,
                                color: '#ffd700',
                            },
                            {
                                value: 999,
                                color: '#ff0000',
                            },
                        ],
                        color_thresholds_transition: 'hard',
                        tap_action: {
                            action: 'none',
                        },
                    },
                    {
                        type: 'custom:mini-graph-card',
                        entities: ['sensor.air_quality_voc'],
                        name: 'VOC (Contaminents)',
                        icon: 'mdi:weather-dust',
                        hours_to_show: 48,
                        smoothing: true,
                        color_thresholds: [
                            {
                                value: 0,
                                color: '#00ff00',
                            },
                            {
                                value: 250,
                                color: '#ffd700',
                            },
                            {
                                value: 2000,
                                color: '#ff0000',
                            },
                        ],
                        color_thresholds_transition: 'hard',
                        tap_action: {
                            action: 'none',
                        },
                    },
                    {
                        type: 'custom:mini-graph-card',
                        entities: ['sensor.air_quality_temperature'],
                        name: 'Temperature',
                        hours_to_show: 48,
                        smoothing: true,
                        color_thresholds: [
                            {
                                value: 0,
                                color: '#0000ff',
                            },
                            {
                                value: 68,
                                color: '#00ff00',
                            },
                            {
                                value: 75,
                                color: '#ffa500',
                            },
                            {
                                value: 85,
                                color: '#ff0000',
                            },
                        ],
                        color_thresholds_transition: 'hard',
                        tap_action: {
                            action: 'none',
                        },
                    },
                    {
                        type: 'custom:mini-graph-card',
                        entities: ['sensor.air_quality_humidity'],
                        name: 'Humidity',
                        hours_to_show: 48,
                        smoothing: true,
                        color_thresholds: [
                            {
                                value: 0,
                                color: '#d0ae8b',
                            },
                            {
                                value: 40,
                                color: '#00ff00',
                            },
                            {
                                value: 60,
                                color: '#52B1D2',
                            },
                        ],
                        color_thresholds_transition: 'hard',
                        tap_action: {
                            action: 'none',
                        },
                    },
                    {
                        type: 'custom:mini-graph-card',
                        entities: ['sensor.air_quality_pressure'],
                        name: 'Barometric Presure',
                        hours_to_show: 48,
                        smoothing: true,
                        color_thresholds: [
                            {
                                value: 0,
                                color: '#52B1D2',
                            },
                            {
                                value: 1009.144,
                                color: '#00ff00',
                            },
                            {
                                value: 1022.689,
                                color: '#d0ae8b',
                            },
                        ],
                        color_thresholds_transition: 'hard',
                        tap_action: {
                            action: 'none',
                        },
                    },
                ],
            },
        },
    },
    areas: {
        icon: 'hass:view-dashboard',
        name: 'Areas',
        data: {
            title: 'Areas',
            timeout: 60000,
            content: {
                type: 'custom:smartqasa-areas-card',
            },
        },
    },
    clean_screen: {
        icon: 'hass:spray-bottle',
        name: 'Clean Screen',
        data: {
            title: 'Clean Screen',
            size: 'fullscreen',
            timeout: 30000,
            dismissable: false,
            content: {
                type: 'custom:smartqasa-clean-card',
            },
        },
    },
    display_mode: {
        icon: 'hass:compare',
        name: 'Display Mode',
        data: {
            title: 'Display Mode',
            timeout: 60000,
            content: {
                type: 'custom:smartqasa-vertical-stack',
                cards: [
                    {
                        type: 'custom:smartqasa-theme-tile',
                        mode: 'light',
                        icon: 'hass:brightness-7',
                        name: 'Light',
                    },
                    {
                        type: 'custom:smartqasa-theme-tile',
                        mode: 'dark',
                        icon: 'hass:weather-night',
                        name: 'Dark',
                    },
                    {
                        type: 'custom:smartqasa-theme-tile',
                        mode: 'auto',
                        icon: 'hass:theme-light-dark',
                        name: 'Auto',
                    },
                ],
            },
        },
    },
    energy_monitor: {
        icon: 'hass:transmission-tower',
        name: 'Energy Monitor',
        data: {
            title: 'Energy Monitor',
            size: 'fullscreen',
            timeout: 120000,
            content: {
                type: 'custom:layout-card',
                layout_type: 'custom:grid-layout',
                layout: {
                    'grid-template-columns': '90vw',
                    'grid-template-rows': 'auto',
                    'grid-gap': 'var(--sq-dialog-grid-gap)',
                    'place-content': 'center',
                    margin: 0,
                },
                cards: [
                    {
                        type: 'horizontal-stack',
                        cards: [
                            { type: 'energy-distribution' },
                            { type: 'energy-date-selection' },
                        ],
                    },
                    { type: 'energy-usage-graph' },
                ],
            },
        },
    },
    garages: {
        icon: 'hass:garage-open-variant',
        name: 'Garage Doors',
        entity: 'cover.all_garage_doors',
        data: listDialogConfig('Garage Doors', 'group', 'cover.all_garage_doors', 'garage'),
    },
    locks: {
        icon: 'hass:lock-open',
        name: 'Door Locks',
        entity: 'lock.all_door_locks',
        data: listDialogConfig('Door Locks', 'group', 'lock.all_door_locks', 'lock'),
    },
    media_player: {
        icon: 'hass:music',
        name: 'Media Player',
        data: {
            title: 'Media Player',
            timeout: 600000,
            style: {
                '--control-button-padding': 0,
            },
            content: {
                type: 'custom:maxi-media-player',
                sections: [
                    'player',
                    'media browser',
                    'groups',
                    'grouping',
                    'volumes',
                ],
                widthPercentage: 100,
                entityPlatform: 'sonos',
                artworkAsBackground: false,
                showVolumeUpAndDownButtons: true,
                showSourceInPlayer: true,
                mediaBrowserTitle: 'Favorites',
                hideBrowseMediaButton: true,
                mediaBrowserHideTitleForThumbnailIcons: false,
                mediaBrowserItemsPerRow: 4,
                card_mod: mediaPlayerCardMod,
            },
        },
    },
    menu: {
        icon: 'hass:menu',
        name: 'Menu',
        data: {
            title: 'Menu',
            timeout: 120000,
            content: {
                type: 'custom:smartqasa-menu-card',
            },
        },
    },
    robots: {
        icon: 'hass:robot-vacuum-variant',
        name: 'Robots',
        data: listDialogConfig('Robots', 'domain', 'vacuum', 'robot'),
    },
    roku_players: {
        icon: 'hass:audio-video',
        name: 'Roku Players',
        data: listDialogConfig('Roku Players', 'group', 'media_player.all_roku_players', 'roku'),
    },
    sensors_doors: {
        icon: 'hass:door-open',
        name: 'Door Sensors',
        entity: 'binary_sensor.all_door_sensors',
        data: listDialogConfig('Door Sensors', 'group', 'binary_sensor.all_door_sensors', 'sensor'),
    },
    sensors_windows: {
        icon: 'hass:window-open',
        name: 'Window Sensors',
        entity: 'binary_sensor.all_window_sensors',
        data: listDialogConfig('Window Sensors', 'group', 'binary_sensor.all_window_sensors', 'sensor'),
    },
    shades: {
        icon: 'hass:roller-shade',
        name: 'Shades',
        data: listDialogConfig('Shades', 'group', 'cover.all_window_shades', 'shade'),
    },
    sonos_players: {
        icon: 'hass:speaker-multiple',
        name: 'Sonos Players',
        data: listDialogConfig('Sonos Players', 'group', 'media_player.all_sonos_players', 'sonos'),
    },
    speed_test: {
        icon: 'hass:gauge',
        name: 'Speed Test',
        data: {
            title: 'Speed Test',
            size: 'wide',
            timeout: 60000,
            content: {
                type: 'statistics-graph',
                entities: [
                    'sensor.speedtest_download',
                    'sensor.speedtest_upload',
                ],
                chart_type: 'line',
                period: 'hour',
                stat_types: ['mean'],
                hide_legend: false,
                days_to_show: 3,
            },
        },
    },
    thermostats: {
        icon: 'hass:thermostat',
        name: 'Thermostats',
        data: listDialogConfig('Thermostats', 'domain', 'climate', 'thermostat'),
    },
    weather: {
        icon: 'hass:sun-wireless',
        name: 'Weather',
        data: {
            title: 'Weather',
            size: 'wide',
            timeout: 60000,
            content: {
                type: 'custom:smartqasa-weather-card',
            },
        },
    },
};

var img$O = "data:image/webp;base64,UklGRg4EAABXRUJQVlA4TAIEAAAvL8ALAP/msG0bSVL2+rn+K/vHFnC5IgykbZPdv+aXcdtGjrSX+y/07hlnrPk3m7YNWZNWd5ghQSIJTJLpKBEtIEmAJIhQUBMIWREggQAJK4ESoIGKaAZIIUCC8PUhCEwQqaIEreMoUoUAQZAgQAJEkK4N34opCwVkgIRoJIEBkipC0gXHSzJ9K4IknX7VZoAYxnA+VAISJDBQG0MXr25oggBpQEiYtJ8ARauPAqoBAxr07KOQKqTRIEGDhBghFYQKBAvo0anaiGsaA5qUhvjdXAYUCISAjwqEkIRNQRAKBYEwMBAQGAyC8Ost5u/BKhoKwgcWQLjfDENNcAC1bdvOSNI9bYxt27Zt27ZtYzXWGr3PlKuSqrRt23mfxY+Z6uStWnyO6P8E4P9y66ggC39xPyS47qYWXgqKgfNi/VzPJao65Kfrlm6BWMH6k4UdsKuGiEisRo8NHwTPCsRtze4r4ndFDm98vNdR8htnq5bEEwGIjPMQkVrGtU/PnntWxyUqESkfA9BJWMgjXi3uHAoAoV2WvhEesje2lTepngoTxwCtBk9ds2bqoFbA2LQ80ofJajfsqsY7gKGnWC/LzS3T+dRQYDdrVyd2ijTVY9axb5t1TUxBzHmRSC0mivMxmCG0ehF3e8VAY5s4UbETT0FvkUSGk0QfTGeyeDSeZ6yrsBAVbkdfdpNJN/fF7jwiux5rDB9UUv5Ga+Ek004Ri3QP+Z7A5PpsEqNwOZEkJl7GGEFFC8z0YPVrjBYkVYzCa5Xbm8GvZfPwyCfH9xBLyt7C7OoSbh/Nn+R84ujOXLzLxCHhzA8ZW0eS68aE1DpqbhoJuVRFvntYlyMrZy0eein3XngLUfcLiRJOYm+arLQ9OBNPlPqytb/Wz1P97EuXlb4Pp+OJCu9H+UP43Vzy3cHWTFmZm/DAS9UXQ2Dweo0zK2RCpazKCSHlDnEAxncWc9sOLIvbd+SSVTD7rmoONEWO8hcWlP4Csx1Z/RLTmuU0T8U3Kvcws6iIxAh875Xh/Q4jBWWvN/PYR8qP6M82czbuh78VUj+YaK3biUo2Yh5bzVh5LrYVEVlEV2PzWfNYiMdjMSvGFF6EyUx2JZE3Gxuw/MZPokET4zDkj2pXS67qP4dgstD0po9HZ3YzBiCi07grGm8AlglRkJSYmFQgxDJgE2tXh7WD5GE6lfwwHOi5cv/hw/tX9gJG/F5M9ZMgvV2jnRTxxezW8NtmzldCIYvoJA8fFSJSKzj55pEjt1K4SiUiT1xkAI4nWtRs/rnEpSUkaK7it1zks2u3EcBZLN6v74HVgoioZic6Lnyi84pAdN/UFZ8frCbKvYbPY+cNDITBC4UZdxHUIfefhwUXolrj/zI=";

var img$N = "data:image/webp;base64,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";

var img$M = "data:image/webp;base64,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";

var img$L = "data:image/webp;base64,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";

var img$K = "data:image/webp;base64,UklGRtgCAABXRUJQVlA4IMwCAADQDwCdASpAAEAAPlEgjEQjoiEZ+ZysOAUEtQBkhoAash0T8XPyO6tviXwBk98BHvAOsB5gP2Z8gD3Af9vfN/QA6SZnQXQLKVMh8d30BuoHsefrso5OBC8rVFfMBMxQOGDAq+BuO67Y3BgAO5gaWgUThpCyp79azgHSqGYrSj6wBbr1hRVvWgAA/uWs2bTP62KG0jGDR/12c73u1/SDqg8wFf8+ekyTHqBtZ/wMA672fy+jfMZnd+9h4/eJf5mABPXRvvpF85NPj6ZvUM745tsesdBsVYvAC9umOZorovlaKMfFfo+zm2fd26aq05jstQqK9tx+M8yZ9rod6Rfu6bA+jlTlJeUYkX6glz3G0Tx9b1ufs28sU3+UDp+Pur/YNJvYWLukgMYYAZfY/zRwHYemPNz9oZDeAcKv6mOWteM2qqjt6Xe0h+2W420UjYc7hX78+F96NMmYsWmJ2KF3N/u7DIIq39mhCwZxbHH3Dshsc4DwEebfoE0znPtvviQvKazezs0oGXUrJxmp7WPQLX7Ks9ZLvlPIlyO11pdSDiBuyFFCbFuSIi35hZ1GwwahQ2pXGxRQR+tw3P0sp/JlTslel+l4QqPYXg89FtGPdLjlcgTMVOd+8xpVGdAukTsFYuweoZ/1dycE6EWi0SPvVoLbuZ9e8IyZmmP2Fuz8rqfYMI1Zids39uC/fNIfEPWZqC548zadawN+QlSSUXIylwVvypfDY/tw/bactfwtoOB7PQmWI51yANQodpjW/NhPUPBkF6vTwbDXRELbl1bIsPP2S7OsMKJUq1A7i8wWX3yVl5xNf6KTPNNrLuB9BMShjfqslxUnLTrZBBP2skzSgYlnvM+QM/ch2GryLmdu174QW+e6G8/DtFa1Xom4mXg1SIM3t2FIOKftfDyAq62kDgdtVHSnomk1cogfPiYewHpwAfmq93dFPpjKLKgAAA==";

var img$J = "data:image/webp;base64,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";

var img$I = "data:image/webp;base64,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";

var img$H = "data:image/webp;base64,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";

var img$G = "data:image/webp;base64,UklGRswGAABXRUJQVlA4TL8GAAAvP8APABVRmv7/lOX0xLZt28m1Y9u2bdt2rhpj27ZtW+3uy6j7f06f34n35guYrIyu2HayM36xzq4r6/G8gNT8X0D4n3Ww9C413MVa2uZJVVayJck2bWvu86HW9aNt27Zt23g6Ptv2XHNrYY7RYy0Jsm23bUPcz4JKFdvpdf+rMz/YIaL/DCRJatIEE5g9eUNQyx68TQHG3rRfCmxZ94YbLR57dn8EGjdJ205U97amHg33xX7Cre6HTt22JskNGoBYEC2sR+1g+UdfzpcAx25Fsj1LD8Gvm8Q3bjlsTO0rEcACTMAIqFlIC6ktxAApClSFGacafLUVm4+28/hdpGAGViBFgijhaZQppVR+0ds4P+NE7tGj/7MekOuCVJDtSFaw7Txuv6JtnzaCCEEHagqNBSrXFUaeSSeKaqxCzMBIr3hrO+pCcmt4b+1GnBv/tAJpCxKFarqWvwv43Tv4zjGeTSeqYRO38qC9rFBf77vvvsFz9xpC+7NSM2MXw30K9T9KQGlHFre6E9WQmXtV0F4LevJ+2CjUX4pyIchw8fE/hfrZUKDS7iwT1ZxYvLQ7dbyyHysfRk/HGx+UX7xx4NKzb/3RDf7cGAuDtAYYtPCcudvP0B2qAyrtJjJU7H28vnHCKLkhelDwCkJg24KNVQir23Z3koQs6ViygbxMY0D14MHaoCF4HRHRDGLERAtNTQJahEIzR9wh1ezJYYfm3U7O211cN763T13poNmj4Tandk9BOussWaaI7SmlyJPaFYgX5ahq9uS4u7PTmXCbrvy++HgeaMxsyAxkFJjaFYqfymFljLF4u/IGD/cbgEacS8Ug7YUyh1I4WZT9ahdvl255ffO0AWio9K0KEK5ouoT3q51zh/OrO0eggcrPOgIVrFjuRdr9+HwmUA/Bz9cFM4eUyL9I4QfzR0A/W2BQsJLFi8CcbYF66X2PgRGAWkLszELp4kV6YQKVgN/7GPEYIwgoOmsy/9mtIdSmbPFFSrxlui6w7UD8jZuibQVUERHJny6hg5rs0WJkTCLoKle+wvsnsvo/oONAfB03v9c3dcgaSb75EjagTLVK1dtzvV5DXeVr9VdCgu06exz/rgPx0W4Z2z7t8HFV03WPkYkxzQ5trbUYRVwV6xfH/JMNjJd2q9vWEaoj85hmZ2Zsj5HPmu3Gha5KzUqKvzMv9rf69RyIR9NvbNujHa1L+mBRrc+M/VooWW5AdFXRlWOZ7y9f14O4N9xW1EoO9pBn+mzNmGqlpnq1RkSCiHdWdWrYwESIv1NX+lCug/1sdiAhnEu8anhuleYVPPxpa6QcUQND7arryrH66xNmwpoPZrFrUzRTck+fESEUkWqtCR2cNLsy2cjmwhqmkt5a5+nh7XuQ8ateQ2IFiOdWM7Xlr4fqCRe2SXx7UW3MjL1XOHlaI5Dw9mOkDR4esMAzXsUngJyFFzZwm5Ch6VamWpt/vTM6JjknT3ujVK/X5kiq3Wk4Nr29eQUeZJxSSMZyFt6S9d/+GGNMs1ODh6dsf/f3GPtcOa4GQDnqdBuOLW5ssMDVJR1zFmJERK7JI2RIGWNMtVoZYy1rtasLOeq65npGBL6tr24eFEHGyMbMLDIiRigpmi57jEyMSO8VTpaTkau+25Cc219YTgMZPRWzMzLxupavXi1vZbZGqd6szfm+gAau4djx3PImyKhzMS8gw74lkjtPVe/ITL0zKxerkQ3l09A3r5J2Ob3AjDSbCjMyJ8zWc014/6TepPZGfBoHhuOzM0FGmB+Lg/ZIJpc2MMrV+fs2yEtLcAQfXSaSBDL8wlgKtOd5UE+5kNcJejKnksIOzbDAPUzyVgG05ztT5GcUWnDeBdW+PIFKsPEC/2/LERPB4WwLMnju0Vk4NDMcZ8AMln/UhKHCyRwvjB8bQQYtPGrBALQ5gpRoq7ohgQxSfNYCAA+cSkq8Ra+DVRBSyJCSkmxWmPNqAhNEuEjFe5rdmVhe4VOBGTMXMkNihbPaU4EilbS+1bbnBDt0kf/1NOi4Zw63SwB5UitcFgEENW2pWpFvZWeEHZqnKXfX3QdNfo4drxJu/HnqznBlWqYkePGySBABI7enfCIj4u7Imh054ba8xY1twjAFdOx9oiR/Y90a/psR5lNvnW8jz6Q1bKtkyQYpBxqDGCESSGfJ7am9ScJjOd4WXfzPNYEa7xMzBRrrpd0EVT96Og6bGLu3v0ZbSKvaNpglPVMEVAM/NWkSDfZWTejTLaBpuc1E7jphzY+VDyPNpiGy927wp9/GxzSd4eMZOsM4Ngkf8op0K/0ce/x9h1DSfQA=";

var img$F = "data:image/webp;base64,UklGRgYFAABXRUJQVlA4TPkEAAAvP8APEE2YadtGSfd1/AlvICL6PwGAl62ZCJjM2aY8LbS69aECCiwUMpIkFcB+/nTjcjkHpZEkRV1EgESSf1Sr+QNAoI0kJQtoU/ZfCENoBWb2PwHQfAAgjQ09FQ7ASv9BDSs8eAyjtQYAlwEACUkghHsgBBAd6h18Gsrb/xmynaq6tm0buxs7WXHnbPNkZdtZOfkHbO5s2/a1Dq/vqIPpnj59fVefYKaC8wvm3ODk6Zi1yjPR1QZubduqlbX30487LRBSB/WRklMEvwE68Mzd7f13t+xIkhTJ8qxjRulPKf48IfgeTqeAoMj/0Sbg1P891HDT3uey6aeUARZpDa97mS+0WLRoMmMOtYBavWgZhXHMhQVi9SKlKsSYeamFsHoR8oiGI1olxsyjalcvOugKUUKMmCdqVy86DVKeQwNK0YCabxIgi8wbWBGASSxUVRsHpMAnESI1HjsAE+pNypJIdDaP/x3JMr/UiCruqNEQoQmxvANNWMmElLmh3Zzlzdz5b0Ca+DcNZ9asjtB4ZZ3IgsgLP0eOrZdbvMkkFAA69W9veHe0SYTojHcWHwzMXvxhKA/gqQ7g37RiboIQF0JaBLHNIcD4qutENkR0ADjEUQ92FSHWbu9NFyoOoDXO62lN+E10d9lEiqIUZODff0nCN4SadPTK0sgoys8aOOIqNOU3SVYqn6KUdGLmMHZhbAb8fqB4uiOcebCH6AYZhV+ddpx4sqdjR4Bitnd6itaphgCNQZoqwmF2SAgFAaVDjwc++cmyC+A5gP/2TdyVaghEezI5QCvTNuShFYz85iJhNIBGw6kITcHWp7nHdYXzPVorwBNPjdGlDZD/DskYx7foTKWLT8cqzgsNw/mONsHzYLXVARV2LGz7z+SR6Ewh+7HREOcR12S0qgBb1JRS9P4eJ81iYYkmjuhMkcmuKOhoWgigWFdShAp9mmqgILpT7VIWi29dyRZ1qlSKkKFKKiVKUFfywwoO65XQQqJS+kQcdSX8reCw4hCJCOKQEgEFhxUH1gQXDZNyiAPxw2HFgS2yOhqqCsSBOD+HFQe2iEMigTgQR0ArDqzgAImACobQigLiELFWxFqrCSnAKvEIB2DraAA1teoV/hu4/SpvWJyjvoyX/5rJyz+X6fkynv+jjKfFAQZwWSjyrKkhW8l9G17enep25anZRlBDGI5eyIF09ytbQxG0LFefBQsoo9GJKixKs2EfVR+RgIM/o5tYlJLUD93hs50/kMIiRCEjMgoF4Se/yQcyDSFZQGmEtvCZTfdKUTaAVpV9Rfp/5La+FibPKq1AZXnIF7bjw/uUfijkpqHqmp12F8/xSQBjXniP5FvktH5vVTcPj4UMdKEyooHi/sU3DSkU0SDLAZ87emrJjUJjwAUwYAI513b36FuWtfSHtZ6QgaVAU4bY4iNsbh503uG0/VtqhIDu+uPRZIOc6ueWpZfIEMTNqAZgqwgDVGvHt80chOmNENhpyKm9llMG9voDXnn/66qNfUPEAqIntd0fMTKwqjiMxD1eIVCDOcjZIzo4QMYuH1iPbPFL7ypiiMldiXmnbH+w/BpEqyY/R4qR0zvjPBATshbTp5zytVEhDvDnC1+RGggFrOgshDZ1ylnZENQUGhYI10BKkYSkYve/CAttyo6Ig3D54WjaEU47x/FDVBcaKvp7icNCCQLnCTfurBJiVrIEAA==";

var img$E = "data:image/webp;base64,UklGRjwDAABXRUJQVlA4TDADAAAvP8APAAUl2raNzdVqJXm23bXVtf1atm3Etm3bto2yXRU7+Y2q9+/Gvd/33f+vXloR/Z8AXcDYUrd7887qVKsp+wP7F3mtIvQefp8+kXuVmO+OnDHmI8y8XKsGmBmTmVwMMKXXdz8PXnsyV2LAbWfkHcHnG2W58RvQLO8D+P87kwOHgOPyPPYewDWzi+prd/YDuDOZtUxPGC57ajDmPtmbxwB3Z6n8F4BjtpWY8+S3GOiZjdiXWGWW3grQOSr/+UC9u8PYfzR+A3iuQdZ01EMD4AdnJwCmH4Cuko4DbJd9BYxtsUWBiCuAo6qBLrapGVlLrsPcaNEvsMfRJCAkVduOcb2sp7+Ch9oDPF5trIAZbuJAkXy1M1rGAEulqgcB/gpJ+2CQm5XwmYJtBIanZa7HnKECGOjmM8gLcIWqHwd4u8aillGYPWCqGyAR4L5eQF4e8EfIkE59gXWHkxigAMBsSZoDTLdIRZcZ55ychzaB2kdkjXQAdlqkKUBnJ2kgyHXyeSnwUqNFm4G9LgScMqqgu+VaPxcxB+geMzQJcNIDVhiN8MI54xo/7TijicASQ8ABF3mAoaXARJ0Oclw69zw0GquguwsB4w3FuwOzudbPRYa6QZVxGnCyD9hoSE2vANf5udTSGaoNAWkX6gJMtkg7gfYRW6Q9Qa6C807OYRZapBnAHGM2BAJiTnZY+OykRaG/gLw8oNcDARKAnE6Fnpgjmw2p9h2Ax6t1Y4B8+MzNQCjUTMx1lvRwYKOkawJ8BivdDIL9UvgfgPsrpaXA2BYFKwbibmbASkmqeQqg/UPw9WlZb/MVAibJ7R74zZA2YV5fImtmKl41OgIgxxEgZlHLOFgh+3bwcWA6wAlX+gEG2qRoWtaG5wB+k6TvsB+W83qgwMMe7QJwa6lMrF/HlcWeQLGv+ZgrZT1i/F6h7N4NjGn22Ic5OCX7UOiZUbaTdwH021lbXzTneoD3jsnzKHBI2c/8jf8D8k4Dvyony97wE5H36SuBWG5IJ9cO/vm7XlMAFqcs0ekA1crxPMyPx8wY+TZmpXL+xNP4fS+k1pj3hccfZWqtqepdm/fU/a8LGAE=";

var img$D = "data:image/webp;base64,UklGRmgJAABXRUJQVlA4TFsJAAAvP8APAE0oaNvIUdreT/6IF4aI/k8A/wHk3WMQYB3ZJUgkm3M/zoWaSJKi9i+QItwiQsJ3RYgGto0kKar8Az2L+R4MtpEkOel/xHLeW+Qf2ieAiAD6n/joqZ0XI+4A6qYbAfJpB2gqxqrH/GuYFVdArRCX+8RUCyh7J/Dm/15YAJhdXuVfXPHxWJr/T5E0JTNLuvuRcVl3d/dd3K4ON4JXwc1uvAHegLs7J3eHdfdxn9bqzMP0s1Hdxz39cPh3RSTasU9FBd4TW4E7GbEn1l3qgMNE4daDc5oJyrZtm9aeMdc+1/e3bdtMSionz5AncFLPC+QFWLPt1Gz+ts2Lf589KWvbdkiSnvf9I9r22PacgU9ilnOQ2ppL23bWREdl/P/3xgQowOWXS5AXBaksKkgCRDSn4KrlIJfmLDReGaakWZcKczUODHHDJDCjJEaYUw2jF5ekxipKI6gIFnAUMiEUIXjACZSsiiS+6qsymhJT0sWw1jjRJTCPbJIKDye2fD496psmBhenbpybu36iNJg5OF13TRn9k5aBzn9D1S+59lrxkdCSCzAO1CBFdL4RoVCobLYLh3e+99wDExdPO/1YjfAQC7UZSFkZVfCyKzfGwPwcOP87W/0jy/+fNysNMY1GJAeQifWCwd1v/O+xatXc1mBJzDCIQCpMwDqtloZ+/W93XTi4Y404KMhDA3jqXAYXZbdTB/JSZVoCDMDBINQAk9Cxmz3TSqUxn+x7yjrGFXS8oG7TFCCsxWgTZ+qzTKCmISgEQAM3RGmmy8gxFtOZrwNTUKcijAigYrycvyFJyAAGCYW6RgiAJ1Wu7yuaNU42RVMXJc6jHBQ4gsARaicE3IAaN0SIIsBhu+ECtVNASvW4SPwYG4ioFGCpAUAgaOAGEEIsJVGPjfXOkn45JdehIBZdcSat/fMlTUAAYmxRAykQ6QiIiLxid8O5vthvClVFHUY8bBCMcwf3VAZQQkAAAApANTQh1EAU0cK1ceUj89tuGR//wTubx3y7ooRSW+MNvz0ZEGAYUZElIMAAEYAIiNbLY8YPXX8AHz/+/VcfffMlXjiteeK8OPHK5pmFaH5Nxe+Wpo+fk837uM1wCIxbMXGMTfMRCaoRYQkhAg/kkInvde8Xc8Beg9FO/m33iBdfOPnujYNUt/u449d0/Jk6wXtPl9MSF0hmTuhRW/61i15VTpxzSN3zZiY3uYUIwDozhAgKzX6tg5/khEfFIwyPnl2f+fzSi3edXecevtLLkhXTdfepoEXgeD5r5vLgIYLJNOuBk/7kTI4zEkdfeOCe6ki5rpgFAOsEQpC/KQH3eiwbJ+lzpWG96rXdGe+oa5+thrN15g/20vikRUS0RfAnr52gdUYtd7JMCKXcMPLfdvcH/j162Coio37y8I6XvHmyZ+MZu9mYCaEkEJPKI00erkc8tB3R2N/A0Os+/e95j2/bbZPVEpcg7Nyck2P5Josh0CLlT1ErE0IaGyIqALRUSEUV8pjNBw9Z2vfk7xIW9hvuPPDGDxncdIaHKSVZGP2fezxQD2iuVojRzvjn4CmPHGy3pDkTfQ1HTCj0VavJ2K1za3He+FPSqoUYvxYRooQSRfSvqmlM3TrsXa0HTfmwm01FCvXJl5x/eOQobtvMKl3K9hvbI6YtParPTad6Ipuk5RY4jrmAchgV8qqNXTouAm6K4I/HFn9/7kqxAFABM2EQMEVGFVNGDizHPrzdq/qCy676WaMb7XKSNlF7RzHkBc9prk855j265klc+iojqkSSa2KlsNDMWQTFolWQP1UGdYpn4BatIFQCuEKvlJqUc42cWB/48N+H8WPP+Lhjq5CSLM+vby1POMbObeWaTXj6HqQlgVEKlKu13iyeXblDnvEnAEXr69hiSIqyO/Ssnp703OFQ/1auCU7ioQde7Jq07bXxFwt3LOAymEiV9RuGDDVl0nq66s93W0rOzJkItZWACcw1EpfO8pgXb9Q49exlt/SeZZsl38HRXc3UXJOucZGsRu40K9xyXP5YAa7ePKtfFYUBAaEBgVCFVv52f8OBT6T00hee2nnLf0ISSN8sVM0kVCj4yW80c27oWpiqpqYt+eMimfzp/qkHqgYAKAGBiABJfa5y/wdVtNvmxUJ3kERMWTHJKgdoJKmsGZi2+2GUQf5kgapqw70/ZIawRWOMUUiRrWO9dwJbKOUGiTrNu65JCekNadys1hrq/fGhKCf82QAyrPBQ/FC6DkwIwITGYCmnjfbfiuOfKIFIoa/q32gNnaZR+UIf4oeffG6T488m44moL/7JThsSd0KDy2i420jv7YUAnJLRFBC1oK9OkG7FTzLz9F3yxGbjD7ohKHHs0BWfeyM73cJlNMYI2iW91wiakxuwGm+9U2ud4E5vyKHLv/jE7/oAPs8r+ZrYUn/tV887XWqYwMAARMByws23W/FyK1j5fksmIrvP617rgr46U5gDv3AREpJFnT5+KDtjgjHGADBEBGM0k9roCKC2ZiWJFO1rguzyI6eP7hYOj+nsAnyfUVgBLofvPuSfGQAwRIAxALVTLnForzGMrzaDwNiTeM+Bo3b0QJpp4h/GwJLCxXrMfGce0FIABkBT6++1mR2302aoKWWJmR+zYEjIFxVQx4ooWuDSbEETwQTGGAAIbmmHYZh22kymjiLQc1ksRAv4i/XAgrgDAhXrBEFgUDswX12LPxdfGXeaStIJSllCibg9J6O+c4rFhGY2IaNYLQAwUIIMoKE7nw0/970Oy1IqtwlzyI55GlDvsveMNJXpSure38u3BZjQkGlTuHyLIP+KGV4WpnLH3TvUVUXKKtwqlz3qfy5aHOMKlZyL5b13Hn71q490rT5vd2AhELh98aK/Qo5YNO4SHlB29XYWj/9z0OKvNmr9iSjDA0dCI07B+ffaRrJqqYTGacN73vrXPeXT5GbOoileWVgXL/7zc51/qhw5pnC+O4t88L4v925/6XkGvHCvQGOWxRm1ROa7EEqWdbycG6lvvvTmldFLZ2f/3F+yN7LB7Klt83IG5l7fZsrvw40f+9r/V3L7iXD9KVfRRdCwE9JF93CLLcEQpzoWXQQO4y2dVtR8OHiFqluViZlyPqIkT65W7MRwAY38jwk8U9NlOEFqobd3UmY6FFXKUQOF5shggz2jBhEafjyUh4IpOxK9pqOKWl5YqkywsdLGiqEAl18GAA==";

var img$C = "data:image/webp;base64,UklGRm4BAABXRUJQVlA4TGIBAAAvP8APACIo2narVmg8JK9uyWUOzOFm6p0CD5Xq7pbcJbt3h+QS3Tmy1ql3jtR/TYIZMIY1IDrzWPMg9N+Jbdtqc8MZSsYRH1VX29VRxFZyFTMzs2TWDIpJMvR/Al7+EWRvbguNlQ7tcmelvTU62RJFgWW78+ZKMRRHEV/IU2sBFQvUGgmsxwmlEhFFmXj38M+6HFA6kWSUCgTWZYcykBhUygTWYYMyUOxMCKzdCqWTHIQkCmu3QH13obg8Udh4Bv7nwUEwWyax5+/ebH/h78FqtYc/hwyE1TSEt3cUsp/lAwGxFksSPtPA9Lh/gob/zwpIJvePu7vHh+fuNKTIhHyehXIli8EIvH+JIybzLCazKObVqzgqrs4srN4IFZ8zEFYZ0zoD1B/FxZGL1emhvmDAb3xr9VBvigrZONfooF6+UaUx3tVaqBvNBbA9Nu6NZriOxmzJAni8ma3O1x1Xu78WiRY=";

var img$B = "data:image/webp;base64,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";

var img$A = "data:image/webp;base64,UklGRpADAABXRUJQVlA4TIQDAAAvP8APAM8HK5JtV9VscoYvbOAMs5jAQd5rCC9YgBxJkiTFq7mfoL8EiIIq5293obsqIUSSpNiq3gef+Vv6/j18FwfTNf9q0zZgxvTcYUxDoOAoEREDA0tQVfQpRh0RQEJOGRl0lylKzz2YEKzyoA0aJSh1KoFdBK7K0XMPiUL+KiqtEESQgi0NgkzRkalERA665VTuR/eos9jCQpBURkWtnGpVBQoCJ+yqc/GokyMCyKOM2JGpLFXBf6XkoAaPOblx3yejtFzFApfou1O2Qiy5lYAgypEb/F90qgxvkehmN3xY8hvP//H8q0cd+rHG68qnGj1c7N8+DWop8H4M19Xp4x8bw89luu64qf9PAkEBIlARAwIGBAQOIAIBEv5DP30IREEBoo2fL8oSJ4WkQAmSIAkBQfpxSxIQCJX0gBiCgJAESIGQoO9VASVo0RAEBCogCNCFzg7YHPzauRuJ4/uf4bpYvz5ZvbyiAGnYtply8yapbZtxattJ7TY1Utu25qRbdxXbtq3attvU7v8zsztz6l8R/Z8A8n+rdMTF7YSkGJ1v/MXcOVOTLif6uhySxJK03tEF11b2tKwCAGVa99h64XSsj3a/EM5qz+Cs4nWD7GrCwOrWX9e+zAnxVDtzcnm7b2z7BjB6vXZj9r524eLiBAGdXHh4fxHhizcXBxEc/qrZDtu2faiNcvo/ipW9008ZpTaHBBZN/PZtQlFQ9BZTJexyudYdst1SXHaXFW+yz43aoM7SvWsuXNVniXagLvK5Zw7hBvofBHWh7z1ziLc+ugNlge99cyjgUnILuRkB9y0Ak03TRHuT2lBuxQdzAM2y34sWmWAph4oAYJkQIYg9bXrISIrs6OCZNHs+g2lWidfLs5S/FfeDNoSL+xQaYlyXsCx2SQN9kgcP3XKGOs9959Hm+r2oz7BMz+NwPgPaPHH91LUGUK1znuvdtmBMO8aDFNRiQNPbAUEFr4oLg/yftgRjtTMSF99eLDDrHXU1Pf1K+IASYO0SQLge/8wEoHSjxqVhYNhJPiS0kwFGtEognFUfy3E6f5QX0a3hM9+V8A9y5DE+loiY3dd4wzOJkNKpPsYalymJQaRsR+PMTiDiBq2uYFiVjT5EZO3DjoZ8v6UhYqsSNjRhqbQ0Q0WEV5/bUVeu5KjHOqJI/dlVrYDKIx54HSBK1WXs2XnTiyharZfIf64=";

var img$z = "data:image/webp;base64,UklGRlgDAABXRUJQVlA4TEsDAAAvP8APAK8GOZIkRVJkDbz2tRrcl/XX4KTAHzNXVeeREA7bNnIk3n2u4rv41r7unHZnDDuSbdVKH3luuJMEAZE3GfDlbmfNv9q0DRg8O+UNJ924cXBwI9+0FN4XLMUEKdqPyofXMOukWp9oKXr8qfqlGZ+O0NRgVPSA0EUl8g+FEWChJiwxZlEd+Y8a9BuaEix00V8Q41d8/cL4ekf+UApXdPPximkUnuQzviYavN7CIBAcCA4EggOFQUNwQXBDmJEFjTAKguEJv7CCCn/wFzc0ozEGjF/+eQjDOLIlCDNkB2uLKztzCtVsD04sNsKKhHTowoQ0mJuXBithYrExW5NqXeYmC5MJaQKhuy0IWornftP5k/llYcNdP/isH2/eEd68u+x7LTCEuO9XJ7nz6kH3YCAQ7Z+FDYjU2Dvj0zflFwIx/Ipl+Mybi/wxXkF42PxjJdZCmLYcn6r/n/5f26hQoJJL15cbbAqWQord663t+RpLwa6JXQdZt7YdenPHtmrbdmdiu3ZsJ7Xd1LY+1W5j205+UWZezLt6lJOI/k8AJiRPW7h0+aLZ5qJYrEw/GB8THbcvZ32FENMzonyVpdDMVQIsSZV9CeU9mzQ3N1nyJY9fp7GaLMmXNmGGttaG+1L7JWnKKkum8907j8Z62I3Dgl2+DEM3UIzmleQPsVsdwcL3CEX+QP9gvjuzrcEspCwyr+KB/v6SEWbbA5mkmY17/PzN0zsACvsGBvJsmG0JYZILwOXzv+9ff5W9BjwLiwrGwHxZNAv/WMCu7JPBYDDo/rwF4AGOc/aziFwBvPhpUC57AM5pDOTEyUCZQfXLS16Ld9IFbQNsy3UqH97zwu4AGim7CgDBx3fcqjMopLSZAPDbpPLjGTdUpobJBAGZ8zH+UZleQVfuyg+WG1MifGVfX1kKObDDG8qvyow6g85U/hCanLQmNenwoYSczbNA+KSs7G/Zt7vQbPWUqT6gvXffGf/z2xdqG49edhTnXHtDfV19Q8d1Uc429yh33BCjtK1HtavdQYiT9Wo9TVeFaOsmaDgtRGcPYf0JIVq7CBrOCHGqnqDpmhC32tXq2iDm+Ral7s6bguBiR0N9fX1jRymEdbp0rPf4FXtMRAUA";

var img$y = "data:image/webp;base64,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";

var img$x = "data:image/webp;base64,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";

var img$w = "data:image/webp;base64,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";

var img$v = "data:image/webp;base64,UklGRkQDAABXRUJQVlA4IDgDAAAwEgCdASpAAEAAPl0ij0SjoiEqNfLsyUALiWwAnTnA0/0gHsgVb+0/iSqAfbN6o3SA8wG6Af5z+3dZF6DXhAfCP/lf+Z6R2k37cOLsUlEB5++ap6b9GPrJLq3NalY6Ymrn0Ygqg5H9xsRsKP1Iz+ngMuiVgI9R0NL6zlEPrKGQGELL7ogjJbue2D+w3MEIBhsizS4kvX0KmxFAAP7uV89glugr/ewX+7Bf7sFod/kGMxdKO4GYIvV4oitR4km59gr/RLrsdn1hEsZtnk3k6mnm3uvAIM3g6W7WoPny3DW+1COV5G6TOrURteQwOVpE9PJnbKXlVoK7B5jttDjPsCkysIQEKmoqpy835Bsgj6SfuFgSW9v2n/JEkwvFNOOQrUHHn9Z+ypXVIAAOmkkWOPn/DFyq291PncRXDhAnXekafVmdd57Doa0+zDAgv4iuaV8zuPs73tlk7GEVP/8KTgcDxvhTKk69X3eQjbSHCGne4ZBslOExyDvG0rnYAJK1/seWuUpUn3UV+WsaJjrzt4P7KB4EpZ7y805QJ/YkRrTQqo4hCkR4wBwOp7MoqLTBW2lq8noN9n+LJdHEeaUqRt0rWNTLL6vOFumg+cUm1exezjqqi/XRoDEa6UN4OKz3/LqfSfcHML9z4lrhCNiLLcdGaqzWpKu8/4nBfa8JGZ5uO2m/bSPH/gBFIBI+d1yickG0p0uv6iabzndb3gwZoHrJ8gvyf2Bgxs7bWwNAfJq5kOULo+5jDryY5pufysnha7Ff7qnZbmZzLpiDVbB93Njp1Jn7gzZZ4/m4dQJryklJKvDlc3EJkXzt15RF7+BwxRSQ0i+9oSzHPDr9KQor04G5PJPiERnn9vwMdCfinSf0nrqkHgAXdu7Tsx4qZ82vf77nz/vie3kdq0fWyroTWcR2txKz6U6ktkv4mlQuaMtZtxlfdwq1yhesd5OGnI3onfgs8uV1uu2J5GciHp90PRvAN1caMWis8ODMJBY3R1rVvyHPFbK7Tq7ToR5nDGs3VSXV0569gGm/ezHT+61FUgg5/2Rsb50MnkP0hboUAO6cw+k8lv/jjYx8KWGEn1vXWa5+VysTgtgAAA==";

var img$u = "data:image/webp;base64,UklGRvQEAABXRUJQVlA4TOcEAAAvP8APABo5/P+fn/Lbw9Rsa7Ltmmzbtm3bts72n2fbtv3X4ff7/plrxeb6Tdmc7qr3oxZJtm2blrQ6EKg7ogFG2rbNkm3bNl4t7cySbdu2wraWJFvbDkl6z6k1VS2AQ2Pudq/Att0j27Yd6MhwxB9p2878/7//E5Anv2ssJVjNk0o1Tia7EXBXNfG9ie84fkq3SEg1niCRI/bTb3F5TY7E1+Wgyynvy6nAG6WMzL6yEGeGZVm2sqgqjnuIaaPYJUhx3/8ZzYJTsIUQdoIY8foKH0/y/QDCLrTNkJMtU2nZfeWkWGb3eynKBLKt2/unhRgqTnuIYZs4KiR2CbHfRIvlcNqzgcl55GsrnvG6/ox7WgRkFTzwfnUbscVkE/70ldLKYXsF0FMsdBbdRboFhcyXwynYyOC1/C2fO+4LBTCKStkGcsso5dVzZSx2B5hPeWyM4PtaoX8MGd+z1hwR8BBEv4ftlZTcrrSU4aJCcPLnSHHOXYo5BZtofnte8TgbfcNPwgKKpwfUlJFti+Cl0Flscpa2WuwRpJgvv41mwG7zAk3AXg6nczObcmylvI6SYj46vrogZlkPlcQap8XpJejlyQiiynraf39mTgJw33TBa9VVXsxeQcRl9/GfXUb/sh/1jz9KsR5lmI0iRqNCuqMSl0dlL04q76A8i4JiYnsS+ySZTGpfKmUCUVzVSM30fwFsh291HHSAn3BQGH/FpfUbhwZf+Bm/rNIF0zSffrqtle4/nx49lZo+mlo8mFjVX1pXjBJsrh2Cs78aiTVO0FaL3SJPSoj/IRjOwEsA4LKNwylpeR+qZFmRXYKn4kix1w20veKYyLVACH/71XIVnIJNNI+F97ici38YVZcRYo8baFccPyUiFAjcfUPW6+AUbKQlPg9wOOnQ8rm6PGNw98V/fQeZgt88MtsG6/UDDHAcepvPPa+lknp4KI4QDHmye1rCrHwuqcoCcqsL7k9PaG1BzOfPFivgtGcjQ14NEyY/sOEFp/n36Me5vFoOIO5Dx3pv7WDXqlKkUoK7f3uJnS7SkGVeS1wqxeW/uPAWF+7iyjnoH0NWWT7pj2o0G467VxkA/0DX56U2n0/z4yjSPoxNkPVEF5C5sqCuBE8tvr9BtvRFshkGIK5W9i156Zl5y/f3k6jMXwDCn7/LKcoTkFfHo+/nfM7EnA/HHI+kXc8Vgu41pVUctzN/FFXRvHoOiKupuIZBUsNyKyneFuHZd6DoLR5+l9VyWm4VVQff9w0KuUeIRaEMinSkNbwZxqgOBPqnUxQClg0K3sewpm5lNHykEE/vjeWUUgqpCyaF2h4zraCndzhD8b8rJoWuBsFfmjXRHO4WU7J7ZVE5N3OTW5JFI4O/DE+mKXzYMS1ShIXDgwOx8bBI+1hSVMFKoHKv51BkcSnTDWtGT5JTxqAWdreLnAtFCsX/XX1ya9ITszr6g4qoDAOwgCLtY8nXpVEtzme9n9Z+Cm8U47PavXF+zu7jqUHQl2Zj9Bmdvf1rIu7PKhgc7iwfF4LN1SyFgu1TIj+xYEhgALa4kovKGIVP62jydWXUaV3IziVhuztFRP1qg3+pUBT8oam6kG+tZpiuDyoAJjTxVk0Kw+JsrhI69s6NlUfHqvHhYTFuGTT/N43GGLrHUqIKVheDcyMPoA46hVB0ZFMctx8CAA==";

var img$t = "data:image/webp;base64,UklGRsoBAABXRUJQVlA4TL4BAAAvP8APAK/iIJIkRarq2WPwxP51vIg/G4raNpKc+S1/jMvictRIkiNl1Doux/aw3tvMf6AUJhQKhoYT3k9F91nnMUTwOZRJNEOpD1Car6DMN4e/v+nf8kOs3QIxz00ZOimEogBlnosydlKAkgDvemmNCLoOZfYeopoyFc0ARRGCEigxgUIBilCAIpSE+L2PY78BlmzbaqID7YJLuxLB3eVd9AXygsP85xIrpPqzqyL6r8ht24ZJelruN/CPpL4q5dqh3ivl6sMJKPPB8uAfzQeLyAkkpkwc6lNneuiP8CYlNWDZJ6UUgLuUlPI5+JJS6h5ASkr6DkVMcD4zOnGguOJbANEtX6cckhu+vQY8W75JHoxoMCAa7IDcmASAkM645JCYMv0KgGDTxOG6jXqXSHwgN3Egd8KGuHTUFo9gM+WsvIK45BQ0ya4uTwE2hbFNWGf6r4NqurBLnmD5EUTdRqNLZHgcAgZRt26L8nKonh3jErAbUH8w6NOwBVNPDwGtkT3KoIPDJFfa1rLW5ingqW1wjXOj8wx8r7R1DLhp2qKIXfxA+2K2COC2lC3uAcCfyeXTrwDwWMyW4BLlDf8KCg==";

var img$s = "data:image/webp;base64,UklGRpoCAABXRUJQVlA4TI0CAAAvP8APAP/koG0jQcrw51zf3T8Ih23bSJL6b3j3npgO27aRJF3//f4Xc/4VAgiACDQaGMAGit1xY6OEoIQAIgkQlAA2NhCgSAoDbIJIgmJjs/szMmDYSaAwdqcwikAyiXAHbAIpEma/H9jvJ9jY2Ni4AzZtoA1jY7QRSbAJNsX+p/D/a+z/4447/n//U0WiFMmVQkmuiKRQ6iH8SEmRKJkfiRRJccVGSYorkBSBFCEEpo3heYJs27ZNO1pl27aNpOzcsm3X2te2bVtJPvaevc7dux7zEtH/CcC5yQaPgykxqkS61sd7DyOBEYPNxbXHu8UAk0On3wwAcD+NqP8G5C23yhYp2itA8akV/VM0gIVvoxI4H4DyqjKmjqkBeOEWlzjFgQbWVqkDrU5Y7AyvzUowxuNJYabXnG1586txQEsY1vYr/dCHJ8fyxigMG2cBYN1XN4Ymtu8a3bOGpHGLw0T9+7+aARFDOeWZa5S7XgkQ9QxVTlMeWaVQzYqU37r/oXGZsKSNkurD2WKqolgd3gDiREQOY+PH5N6Nh5evGl09D6hBJkX+/SYA2PAOxngnjDL2z8Hoidmt6nb1Ucb+IVDUxL+pWtdiMuQvgPIvffmAih1NhhIaP4Dy/B7q/tCuDxjK2FvL2VZAzJ6kfM6hlOZXwD0fQ2RByv6qHJmDvMdWRExcIsAXgxRd4DMdIrLyAsKWrgyG97zFbRwNTBHguVWCwE3evqwCDpYQlg0kSB/hXQkrOZ8QQOMT11jKe2lWwv56wqK2MBYBfoZxTO8IcDUmyvKMt7KG/MZuAkSZoOhF3tEUQf+TcjojKL+TdztAwOIxAvzViWkB/5OBomOUXWkx2OpxDUjWdXr8NM41BwA=";

var img$r = "data:image/webp;base64,UklGRkgDAABXRUJQVlA4TDsDAAAvP8APAP/ksJEkJxpE/unCm51ubA4Q27YRJLn/gu/uf2ZEiG3bCJLcf8F39z8z4vyTTdqQuWDfyFZQhHATXLu7voci3FiEEJST8SxwQxGCclmesLkXhSIofQ+FMveiUPoeAQI3gcUNpSV4QX///4QAwf8cFOGm97pNlL5H3FjK/xzA0veAuVff8zuHJeh7KC0BmwVi7uWmxbJ/v4LvOeYcboLt8yFEi5vgvu1GBBQ3InAj1s1ACCBEwOa+2XuBIAC127ZN29FYwY1t2zbLsW3bTrlq3Rnb5o89a5+7z8m3fIro/wTY967t2307nWau/4Pw3y2ze9Rv+mXguYePgK+z6jUb3rpK+0NYWp8+f3FHOWFYTRbyQpnvsa4WO3Fld47W4CAKPYvEmcp2oiLAgzIvv8QSxypaiCQ5aycOnwEpLh05WtyDxKZK+uAFhlvxMNF9LJ6B1GRUFX+/kCRWWNg2wZioA5J0mwpmI0nOwMj2UeCgxdsCsSIfd6IOiZ8KTrdoJAqdRq7pqNhkXOL8G0n8ZjGPI7Ek1+W3gTgQ9UPSXSz+ASXvkakTHolNhZ7ckcT4qCueckbmmYnS8Ou8g9yR9PmExYdQSRbkWV/u3HGQ5HSPxqKy70/n+f15ikMNM5uExGqLuVtK5METr69aOJabWLwSlXbaVMOUyP5natQdb2VAjvYpp3NixVmLr3xUKyNytCvTN7GZNtEqWhqew1JifgI2RsbdVgZXI3oE23F6R2NopZHlv4epG8ztZqMPIb27GNl+WrCsW0hJFCWJaVEXvMyrq3lml3B+HtJr8gUk3SKyxZRhUZ4eeIKeVtyNJNZE9vRJqsn4PPb1YcSPFhec7tFQUjexzLMInP6JHUj6dDKyrSRYlstSHRO/FMSEqJFwumRbSkFMSvz5rHCXyOYQsMHyc6/w4VQ0DIUsj+za66BDBcNwSWJXYTg3IqdHo0OHDh3aDUISM63KdRQEu5b/ww0lnaRL7LVqj1KQ4InKelLiulV9hiA7dKjMjtGsgOsdrIabuJ2NvVbPUeA5HGZabVfAPS/XvAkbOliNG0uA9/L4FbCsi9V95ILTJK8uGm/faJsBI4YPbtj3rQA=";

var img$q = "data:image/webp;base64,UklGRjAFAABXRUJQVlA4ICQFAADQFgCdASpAAEAAPnk0lkckoyIhKhM9EJAPCWwAnTKqgUfI+bbUP7Z+Jt6ZjvzgOXPHh6i/MA51fmV+1X3cPRXvIHoAdLXWOfB/xm/AJZdTI9WRQ8bmk7xu+q5/Vf+D7gPah9H/+T3Df106wfoi/sO10c3BjCbNmge/NdWLKchub1mbeotHMp2baf2KnDGl01oNCtY/Bg0EjfInhruluebMA7RwXxixd66c8FDC0/veEf8k5Gzu1kWfv8OeeO1QAAD+/m6efrMpkNEennp7mJT2Ye9ab/7Af/laf82evw3eY9mG/+KZn2ntVW3HegReRHHOm3Uo8lQiuo6YrvtMinq1sv7KeiPVwyrnwgnlVDa8bd6AneODX82zFXQW2nwM2wvAJbhxvOCfb/dE28ZkLZuNRe1L6or6+jqPCFlU0PNj6gcFLoQQ26ZhwB4TL8VshZ4Iw2hUgtG3viXMO6wu5f6eIQG5I0Utp5L946+Kv65BS92FEUkTgl6hXMX1Bv11HnmKJRF3KlIfd4rqZXiXh15FOJibBabXrIY9A1cMT5FXh3hsgEzknQP7knZys5LyeJNiwTJn47VPMCt3Z+fsxo0Bv/iBOV7a4Jr2P1MPGjLciYzyj2grzHbLWY9i/z93zHA753z5/W0TXN0+bE6F39qQYMMEKmy1DMq/1JuY6Ir1T3cuFlTH7b5UOGid6A956eoKevqx+FU2iRn5QEHndpLspghdyKeGjsDcSI7LDkTV2Va8oqj87wNdKJlhetUsSrSGazlALJc4ghe6SX8PP4c6MFujGwV9tgcjjhd0r+3+61TUJdz7xOIAPM7524Zidr5g+NzxyQFAydQfAPVm0X5/1O0zFqiObOhF0vtnZvZmSDK06nrhyJ2iLTOwYzqVoILiekxd60lvUSPDzsf8zKPfOqCPwdQckxxe08J4v9P+2Ectd+99+7QmDOpOyPTV/PpzO+9xyoIqiBf5HgjzCuZrj8FwhX9B3QTSsjg9KqC2ElZW3c0a6EZbv1zY+I1iXRGlD5MdNY99zBklwgYSENZB1PH+SVE0kqnMUGrlJ+RvJDoFDqtwVtzQqvAtvxED8KFbmz2E/bt+eRuYucnTYdbe8KAR71N+WowByY6GX23vKpH+NWCa8x50p2nelM/rzF5cc1FEZpVsG9bU+KR5IN0v2EdJoViOd6qiLVFW09j78ofjneNajbYbVe+NjbDSzGt4IppGji53aIHFc9cpsO+Lx17WEK5soZxeULGpeRhcoufRc1ChthocYBjuqSosWBXUK+1NQXvuMWfSM75AbOJcqCXGP/MzPTQaycqRE62LU4At0vzH2exzCCz/hmK8o3HGmLjxg9n/T9FaqfzWjDQtd9yVZTzZQiMoraXnLIiLCnqcDsFkldD5zQvSHeOtTeRNfi05yn9on20LqKabb7wZohjxYULFjkTyD2UbVOIzRnSfxFqR1EteV4kFkGsT6BfF5X+s6Oa76DH55gPEdOqDxBoa58GgEsYrxc2GokzujFfRAVACWg/fQjGGCWfgqTwHkgIr5iHL133r1x1aIcAGPjKAhLzKplb1UzHrRnqmjDLKQDR81x2X2GeEWJ2PBHiFiSIj5ZNEkY2rkAtbTLwxRsWITGv5XKzVwdLRGBU6QfHtv9CnW9jgcSAtPphRxIFxqLhHRonuo0f2PdTcdPKDsHDI1mQlTiGviPE/fsDdjzVMMir4BV7wLKN+OX3y9ZO6/9nBeAB8hL5ofOzsDRbPGmQAAA==";

var img$p = "data:image/webp;base64,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";

var img$o = "data:image/webp;base64,UklGRroEAABXRUJQVlA4TK4EAAAvP8APEJkuRPQ/NmTStqGv7RbR/+DdQlm2bdO2NF/atm2bz6W0P8C2XcqSbaNk27Zt29bzWmPOffMHeswdcR/Sdp75h3Pbtqln73M/Gx2S0rat35zUtm22du47Z/4hOJIct1l6xu2D5ixFJX+wb6iHMcJJzwORVLQeuFYonWrEjaSjCCVRVaECKlMojkm8EVEdpksYMs7ZhOOfe5w+J0q4TORaBhh/oQg7gVx2hKfYbkaZqClWyRoyzjshTmIzuoaFRReKMhngkGjAGbmavmjKTUx2FzEI30fpsYOpmnFcB/BDZCyUaMO/ix1Lo4oQRtTstGgC/6zq1fx+DEQPirlUmnEMeZaoCKcr680MQGQP9DqxpBvD62blKevcocGSFMBAdBPqZd9wdcO6B2kKanoK4FWimqu5s6Unh5lQhhkN9GQGabateYcoMSReO8Y3FK2RAd7Ik0oAB5uxrTmHKIMEqSqic3X07Wi8o0xAjoPN6mGXcRSXDyn8ww2dK7QYHejiZm2Wt2u4vEPVAcha5YbUfxLaP/rzcGo5YP6YsLathdyCqg5VbQFqIIDRwJNoE7fW8GFbf75iDMBYoKdj63nVAxR1o5CeNuXDOs3HFAmu0cOouzg722GoPnC1xOgsDZZCAPcznamYXsKKHCawkmcU1dMGE8X8Ng3Sqag+gMsYYwJSTwNAOS/Lc0COzRT1JSKTAai6AsMT9GtIeVd4AapAo6ETdJgAPC5sb2vU7nhGZiQvzvh1fcB1VCcgGogMrDIAiAg9ABFl0mXjNfQZep2gslraIsuIBN1FnQF2tMo4hrQl6iE36TMQmT8AjAmG1RxU28a42+lzHmDEan55y3xJjMmMRgx/hpibAlids58+O1knzlkq/hwVNQhVMSdkBqmDMz4gJrbIRAz/5mneSkSRYUfmKu362yJeqgN4v4iixmeM+gJRDu/tZ4CJ+YZc2Y7y4PMJAgK2j0NFTcrwNCI2riGGA3kRWAU55w79a+0txHIMwD6ebeDIlxqNwUTsVbCDVb8nGLGqFS/pMz0CFEunXd6Zt9WYDABb8ozZ2oIjDSnr525xJd5B09n0exHz9xksu0u/xTmFCUatYZzJnblarb4ApmD202Inh3racJwecwN4l9iX2N+wQsYbF/AVcS5azxoTUQZNE7WENet6tYtvixP8i+AUlnzTzznjLcYbg7pDxDfDZ+fNY9s3M4Pn0R+va1OE+5DzzZ5WPSzF/DBhJkJsoQk5U9ESVpl/06NJ/TNkjP5UhGp/vkdc/sAfJxnwFnqS+QRMSSwEKOpRyoiHJeXvlFy+/83fL4uoWH7R28EpmGUR9dhPVlseEaFEz2jLUE4PejxMnSXnh3Q4vYWMSs3lAhLeYRawzYSJoJJVky1y3QDeLLCCbSZCx1Shygyl+eKb/cEK1ByckfAseobX3xETkArMoLAY/9bp/JMMH95+U21S4JcizSSpfnD4D3WYaEC12R67aYMMelLHa0ela2TyowZGxk2nhbZL2DVnRtBikr1pff1MU079f7HqyVFjDpx4LxTQVUwz6QbCHAoVtFgM0UZcDZgwA8KacpWzAUMPKL8bU5uB276VNRoF";

var img$n = "data:image/webp;base64,UklGRgIDAABXRUJQVlA4TPYCAAAvP8APANcFJ5Ikx1btPgYP3eNvamF9OWn9j8FtJEmSUnun4b9nYMSPhMROdzFo20iSqyVx/GG+mf8zOLBJBWgSkiQgAZkEJCQBSYQkI5mEJETz55FMIIgh2cd8zy9JKmMmVBjyO6kkIElAi73md35ESZJpFKFhQYsxoIWiAclspiFCG6QFKBBQWbCddfI9PyWZgVmdjDIBICszTYEomYS0mUVFkSRKApQtUyobBMQBKCiV38kqCSFDhOTQ+dnpjy+TVJJKIXFnQsOGXwIAiIAY5D8JAWDgeDlOj8tes8/5+H3ej9f99jhfb5C1bZshR29srO3dZG3btm3btm1n81alU1Wd3uqO/ffGM6c5iOj/BLCr7CrjWetpkSoyuDZ/SEtp+YqfnkgJ/WYAIk7XMgXMMUSb90MmnbqE0LJZ0/sBQJYU8ZF0tCLpaIekFOEkKSQATKiwxgQPSgGM9ePS9Dg4t3aXVu7hNYdcIR/9FSHiPmkWAZhTJ0jS8foAuCvjIN5jXE57a8bDtF7j0wurvZGTPZJ6fbalnw70rmV4+R3AFDceHzGv3m0ow/Y6t7bn7Jq3+C1IH4eUvAdgj4pAbyKQ58enlnTOpNeTalt3z5ZNq6Hal+ZT7QXwVYSTVFsAqPi4pLwNn3RO5lv5HBUiKN6oqbYCkGGE88RTRwD8E3G7FeZEgaU/bIZ/GYZ0TgN4IUmKyiwMbNgEwGUSyDvwhy40pPgDYJ0h6ewHMK8c6GGlI2L6AEPKm2GO51rSHzQJlYKk7Q+kOYIU3xB+oX/l4BcRy+dmTcqnfT2y6sJol3RuYGoNSTpHAbQZTapT4X6dP9C5UsZA4ZGk9EiyyiUpKvFJhjAYASB7n/Ft45KQ5cHmqx0Xn4kY4mhmjrIMK6pbEFrcMqZhOIDyulerz67STLBQuO6Eo5SDQwBs+J8JYKmV7zQTrReXBIwsgp1FYY6YlwDwWgomXnuMWgUPN81dsMOl2Q3grmQKSm2MImnXdltWw5TWVrNLaQ==";

var img$m = "data:image/webp;base64,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";

var img$l = "data:image/webp;base64,UklGRnoFAABXRUJQVlA4WAoAAAAIAAAAPwAAPwAAVlA4TDEFAAAvP8APADXRjba9keQYo7rR2J1u9Mqe7cZu/ll2Y+6O/1pnbwBrUzOD3wa1yQDkqaaWv7UpMBT6Y10AVzUeNZnNJkDVoVwU1Nq6ACi8LVpbNT6oxXiUQbS1/m8xCfosZnABoAqOAAAEFNu12Zja7cZmfMG27Trbtm0r2+Zm04HbtpHktLN3fKT/f+tO/xm4bRtHLrLZ6+77C9oTJyPSXhjXdqF/sHl2j0vfwUS/oR0XDPofeWApV5bUXNJwSaN7Silr8vKl71GhvzDKXQvwHgK+pYaA33/XSCz1OUDQf9jwq+H6qM2ojVRSG052ZpX6rY1hVrYFR5LSksJSn30WSAJEHlVS5Uath9WamVmtJT4+rUFWugVbkkxJbm+9tYEoQOSJNSA43QsSExMl+zOqftQGgm1bCY48vkKWh3o3hIyML6xwf+2x8VDkcSX4khSprRAzI9Pw/Gye3dodhgEuNwq+g3Gmu1HrRmMk2cmo91GPYcSBaIDYiF+CqwjVi0o3jFhyaknR7XgxuoAhSS0QVDshZiSm+PzUR0bsqwbIvN/HdMumpSuz6WdtGKNBIsBckLpRa3HEyC+kZrXTceM9HFZiO5jlDpFjRozPThFW+hv6HVnJvmdsNkBsr4tqNc45ZMfJVtbhr1p/ICvagiVwY20I4AJPDRGjQ1Yr2Tr9609khVswNXbdAjKPkN0fYHoQJK6C+Hjy7FVnBVvQBG0E195KXPc6mTjsmBwTn1ojfNosdwuKtiGWRAYzjJg+xWQsONmdrdN/lrVDkibWetBirSRRwNlr5dKhDYuYHExesbPMFeAt8Q0eexuh2etmbPIL5JgdnVqlfrPoNUD5BuPGATXzw2CyBclqK8RIzJgcz+i6+lBLdE/AYysJHYLVqWd6GOSq0h3Lve/+jPZ3gfHlhP1+Tw+1fsF8+jSxzv3uFmAezoGLtzbCcDClEGW1ndIiM77VbWEwr6cnwF2s94chkJ0apnshZ0RtxNBgTBGiJbG9h71uvZUEChj7A1xUuLLk+IXE5m47BYQS39CzWTuJUBxMKwAo3Qk6ZGZ6q9ej9ySmwWezPsLxq069GmZiJD4leR6MckeSCD2btxcElJ0pr6I+atOERlPL7jZSwPW5tR4SX956O11oNhJ3cjLEyER06bv/d8FjO3mlh4k+v1Ob1EaQkZlPLYj93Q1zWGPYPjHFBdYXXsl22BjldNOdOu4Ad6ns7oCSwg31nURMTHg+AFCAWpIIbvwkYLjwwebZvaThC8TsHDeLcg/G+bmFxvqA5cIPdTb4PKgMEl3qNlBie+6hiw05/lv/on4VGR0S74don56D3rfGayLk+m/thnZF8DNufsZmqHEwRdDZzBlDvosA/FiPGh8HVYZEl3sdlCTCPjcqXSwC8eOsjU+OWUhtRVAcoQnaxaQIQskK/XfKMRKzi00OZ3sOPluFvsVG1ZXsjzEz8+X+iObbUqZtshtCZiY+Jdm6ABp7b5ZZ/cC1TFzZDwWwA3GA7ztroF+QZ+9HkR0ycbqX34TIYO89w4wx3Tr9q5U4RiZ2zaJYsPe99Sazeh3+TraHidihu31AN+h15+3EZK8IrVeJiJDpfCgMFBcllRFNEZ2C6au/DnnuaU8RiqOSaasWE5+e+Hjio5Ps5+CZa9VW5NIAsZG8zqrh93L7c636yirXKG/lGZVHVuFWR7NK2gN14VN5/Mpz17+j3sc6+LWK/6ywf8lS3oX5ldkrf1D0NfQDnvrnqMzMdt/eezfVdV230xmMpldkg05CNAMARVhJRiIAAABJSSoACAAAAAEAMQECAAcAAAAaAAAAAAAAAFBpY2FzYQAA";

var img$k = "data:image/webp;base64,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";

var img$j = "data:image/webp;base64,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";

var img$i = "data:image/webp;base64,UklGRvgDAABXRUJQVlA4TOwDAAAvP8APAO8GoZEkR1L2gThYxx+Jv+l4QwKSJEmSmkjM+P8zOe8gdVWGg7aRJMm194A4/jSvM//rwCb/QJIwiUKSBCm0JGUkhhIAJjQk4Pfzn0ISoYUkEZCQYeQYSEISTJ5EATE1oBKx7CYBlRimQQIm7ACSkZItjJKPCv84lQRkkkRoAUrJlGFOg9THCMPsJhlHYZQK0JCksiVBRnZgkpgpZCcWZkQROoDKwDaWYTLEQLrEHw5n45fLzp4stAxo6pxv+uGfTE6yTaTvNMywh1nO9cz9UQMAsgAiICYGiQAQGRgYQAAAMSAmzv8FRCIgBvnCla/b/Jy/RL5v9pwzSYT953iAv9xv5/P+A0Vr2wxJ0j+2bdv29Ni2vbbtHc+svTtrto3/n4jI3OiK2qjstXU1lZWBnAuI6P8EwA29dY9BAwcO6NE2Fa1mHHj+q+ogF0VRWFt84di8tn4tfrxaSY5IsYhcqPoXilr50u5AqeZIxshVxS1dvDhYJZEsowxub+ts1jcZJJeyvMjRvS3XyTFGz7Vx0O1tSR6KkhHWRlZy8pIFcyyNDxh5inqZlZEBkreo51voVsHIOjIueDLCcIzZW5ysIpeq/seXnjxzR2MyYqUdTO6RZBN12UPrx7UDABiTNSBxzmBmC9nEr/+Cwr8bkV6X7MvrVtg7kPA3M6zrlGRfhuy8G9N2ysojtz7aZETigQTtqtDFhjqlpOBkUfUrtFeSg27fIdkW9xcqwWRBmFUZwTFukiLr2NApboGmxHJt77GzVx99+uMg+gAA/nBAmf/iHuPJMosgvuvSk67Ya3EVaLCkQLwTCrvnTVWUGrUyb780UHM9EvflPcsN8NMP33jmrk3TOvrA3sv7Ag0IkXEhVXD1Z3dY1QagVY1R4WiHO/q2F0DPgGzL7YmQcdHcLIzUZIBBOWfIZbah+MojN+/aeVOjSe5vgIGRoyk/fP7w5smdIXZ41iTzjwe/DIGk49JgaJb7B6CvTJOaDtCuFj0aYRT+CgAlvnQfPeffLYFJY3sAuMjcTdz24JvlYVYpSYZ4DQDglHDV9yMtOUOyyZ/IW6hcPdVM1uW2vA6Nrs5ze3pYHlxkjl60h9cgdo1Kizwe17YOU6L7xcGdIh38LBTsE6ZDTygEd4s08EuQsFMdpkANTQIbc/5lboHkL3Pf2Ptg2Kkc/cJgsAlMVehVy3IwL4p8iv4Hm1sjf6ITYHeVRj+w5RDYnlXHfWDhCrDf7XXlTn4yApweUdwN03eC6/7nNbfHolfHgIcTzmqBNlDoV+aAp/1Of6YlzyRBJnXpbaPA57F7zlXsjrv6fVh6+fAkSOFPcX9O7gY3cg==";

var img$h = "data:image/webp;base64,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";

var img$g = "data:image/webp;base64,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";

var img$f = "data:image/webp;base64,UklGRswEAABXRUJQVlA4TMAEAAAvP8APEOcGKbZtV9E+jzBljozsAEN47/TevbuzBri1batW5pM/iCyCOiiHtompwF3vv3vLjiTZtaJsNHwqc3Aff+TqPeU6kmxV6efv4fBFHERKbgTg7u6iNm0DZkzPHQAKqNqWFApF/CCBUCwmlJ8mA6UlCw5aDAoZExOKxVLLwT99jKB0Y7CpGQIifn1kZ2MMH3//GKoRFJqYYDksI7NG2uESNkTMyHDIeklJJszJwsx/+Zm1HCzkb+Y8DM54pGconFBvMVRj0yMOPKIYDGxZI5S8TY3M+2M5+KT+spsX/LhCkUX730YUhAVBQejAF0OLCAZKlqnlGDslm8OMcXntr1MmUCgUAsEJjRCIwAjku+nXA0X8+0ARoqXlaDbuYTAxmBgMpvzxcfXj1/octsd076E3oIvWYX0ZsjiHA5zCuwH9EFD3AIKuXeq33UzhX3Qfd3XWyMv7H8/Te33CPHC/efNx/WFevFuXv51uX4GitW2GJCmrY2zbtm3bts1SbMc/tpXVKI6n3b1227ZxNYk/MyNuIKL/DNw2UpQcM8/MPUEyra2iKDfT+fzOnefOzNyiCpvE16r89Aw3UEoBQLMld0Z6fhU/itMcQG+BgbcoONKK+VBAKZiW0gLrlDyhYEn6pMQaYdkusKwrO8wC5RS4SMtNk2cHTtrzTJLjAm66ckxRTYGjtNrMsNJybYwH83RzOc40WqHcDty14/sJoyBAGoaRDULMxl4WlxhcJXqegCCf6CikoqCFWsy19zg12s+UKf78+z8+FKukgQn+aGqs//c2jyZNodJhhr9aGhp/f8QDR6Uk5YMp/29t/ofP7HxJSjeY8y7SF/UQAFJTQYPH65UVsIMwmpEu2TJuYbDA1dUrt/ki4P3l6w8VPsTsWb7qWPxLDR9i9i5fdTz+BR4NMmwVbsAI7Saqhz2x7WYEAORLHYji4MevFeSL7YniIA/euCuKAEM+RcZF/3pz+KhPcZ3nBuDVM1LTlpJ4gPT6fhve3CA9T6Qk7Ce13wG1KBedE5rY6eeHP739+jVchQVmkqceBr5zZGsUBKcRv3oQp8n2KHRGbhZKElnhA40q4UlkURAAWOzI0V+Ug1gSAAAWP2zsF4aR5cRg38iGSAz2jWzUHEZgXo8Y9pms1xxEcGGfH4DhfA4YX8kmFOQwAnO6xyms0zK9dwxgPr/LnwUG3L3Dh24WOnee86FrHDrZaMRJORGeRJb5AYAljOiPQp2ZvGDBqeSjDOA7SwbgZOaaZh5Olzh4d430PvNL8kFiRG4R4GzR036WyhYtMzrEAXguENWhk/vhk4sq3ChDjsq6N2jCjkjkMCJ3TgoBgPxt1+Klh36bjS/irrBl3EIbj/4IQl70MLwhBgDstsfnlUNTBv5g6HdDSucWNSJiZAZwP4bM9+PfLSmfVysfIed/eH0pdeTKB4PvZpWDE/cj+5Lxm9d0JPsC6He7ShM3OPng29o+hIw5GWJGcUMq5jbjtvdHfOIX2UTckjiGXcaYqbgpFYiL2wXi8wYdpcLyFuF5k/i8TXjeKDxvFZ43C8/bhdcNwusW4XWT+LrNkmU86kbLFlqrWwuF183crDRXt1dKfLVVFOVmOZ/fvfvcmWXpv4EE";

var img$e = "data:image/webp;base64,UklGRsICAABXRUJQVlA4TLUCAAAvP8APAIfmIJJkV5kfAAv4l4C4fLtDEgGhjSRJUqyW1dJa7PdfpR20bSRIngfxtJ4/lr9r5v8HDqoBKhRQyU02BtKNISjA6MalYiDdPP4eucmNRShKBUEMgRgGsAjlF6AsMctSFGFHUZQsSjdZKGBuKkpFUMQikUpuhGIsEswNpVCefw/DJYtFzE2X2SBzYxTXnz9ljYghKgAZKbIR8/9qVESDJYIsscQsjQHSUMTtBrw2wHgujxtkiYghGophGHR8wGIYoqUwEoawNAxgJIybGAYdBFDAv+ggFEAHUD6BvwsCAAJYAAWwAICwsMPng4/X+fV1en5c3j+Qdtu2sTcrtm3Utm03dm2ltvGc2LZt2079m2J8zhgR/VfYtm3DrM5HWEISa/19fHx8zzosnkOtWTmdLWXtH/UWy8EyKdp26G9YUon6FCqLQGkC3Xal8jC4Phwc+HQAuPLijTtw7nnw+9uPn1wHtc/Bb9fNWTNwKz49CM++hKziiPpn8CC71A8utkcP7zlRkf56wmB0w475NGJD8y9s6JYy78PNUhrI/fgsH9xapW8f5wujXk3olcrtc1arYRKUJ2PGP8IS78LxEhnSvhOf4XGmZbIWgihd7WnSulm3Wyp2gnmrVK6+Fq/EFEjZHhZIX75keGLZLtVrQL9TKrZejZeEcKlynCLy5Xw3jbhVSI+dyrAUnwS7Ommwvhkff/ldkgyvnRT6D+iZj2b4EBdaxaXMkHIdHsWH1nAvPsuL78kyvJFjpdJgp+WdO0+G/UrqDc2OuJC2uoSQsf9Tv2l+SZHhNUbjInVducU11XN0ZKjuF7BjpObnIf2v7aWlde0r4GlnbwBofmut+bNh93hFcfnoUZvfu+bGwtVpOcCKVSu3gP2xU+tVAVtnFytAa5mT0yYM9p7ebwBmpiwdCQAA";

var img$d = "data:image/webp;base64,UklGRqIBAABXRUJQVlA4WAoAAAAIAAAAPwAAPwAAVlA4TFoBAAAvP8APAGfCoG0kR8l87w/knz+8oaGwbduGyv8XdzJqG0lS0j33DJh9LX9mPf/RX6tUqTKuho81vDCDEDghIAiCEBAWEAYbBCkgKEAQJGAJoBRUBotQqTAJ6jRAgtKoC40GhcXz9ZOg0NISaTIM0qST/vlAAjRqJEgSIhnyUxIkDBpAEgAGTRNKirs7Ke42d8Ph/y+qJbmxS0T/J4C092/eyk1l8c0gp6mMb2DcYUtNfHICAPhI5nQU8Q3sjQdsyLPi8zO4/MxkpRXNd3BvPGJDVHx+Ac/fmaycEr6Dn4FHbAqJzy7g81c6J6GEb+C/cY9NtsL0BKwf6RZTYwzcQWSqrNmAbfXva62tsTxut9vtj6vr39b1PsJEjWg0Go2Ybl7NqPsYcdl2Q06HYYKYuV7MCmnatVPEz/KMVdL0m0+TSL/C8IQ1UmR1FhmS6hNZdVIm+ean0+sr740ARVhJRiIAAABJSSoACAAAAAEAMQECAAcAAAAaAAAAAAAAAFBpY2FzYQAA";

var img$c = "data:image/webp;base64,UklGRtIEAABXRUJQVlA4TMYEAAAvP8APEGflNpIkSane48cGXMN/GW337rpkPHDYSJKj9N4/kH9cJOK9h7tpBW3bMB6D8Yf63UaSpEi5J5L/3pwdrDI+80cCIIAAYpDpdwTEgYAIBAsGAlIYjf0HIiBChYFARzkFqQgZIIRMzC/C/sVAsHAgIA4EgcIOogiIE+cXgQ6hQkAMuxCcSSMFxbaCQlhb2miHQEdYwYDwoQG5LBiNFL8jleML0icKgy6g8IXCDyFyvBCQ1RHGB0J/rAkaWUBxrjlu8CEQCATEeCKIFMTCPwXhwwhB2qLI/d5kAf7gFlzBKdiCaEMbAC+x7Xg/0H83clC0ts2QJGUjxrZt27Ztru3NLcYflWUz0bZxldMRf0RU7QVE9N+B20iKlHTtMQ/eEwxlWyZHB/tDYYBwqH9wdLLFqK9TI70BEyilAMA9kxnoHZmqG81jPT5Q0tcz1lwPmoY7KShLO4ebtBnvpqAl7R7XozVogrZmsFWDiS6oi10Tygz5oE76hhQZMKFumgNK9FHAiTk5N6nxYn0q5yWh5WezCblQ0yj52SFT8rac82TG4xmNG2UPmPBJ4h4nvEmm8WT467R2SeIdJgKfLZ0XbcUIyrKPiPzDQMMg1llM5Wwt6b3euNhVuyWPOIhkZR707G7iGaZo7JNIVpeZJnSYH2c6AaN8GUuNjxVPJBNxS6k6m2cYoxjZV0jWONw1GfeHB7fP3rr2oViMKZyMzdADCNH3skTsb/YS0e1Pvai0embGWB9GTpbUnxsI7sK3FWnjnTKMEUDI70YeUQWg1ZdE7h5PViOG0YvA/iUCyysMqHuCqLjOkdBrtAQQkqcFFhcY13zV3Cg5G2iZNBG8uQJ/W0Bd1RByMYu3/clR7LKf8BzJAtSOEYw504sI5s8RtEYHKfLMbwR+i0DiEUG4G/cqTvHxUpH1NtryBvsR4lcEOihUiciqQoJx42j7TvGtfGdh9IcQEnd4FtgQ+QlrfwzAilsAtGOzwME0RigMCDcJbztlDG++tW/vfbIBoDqL8LYBIhaIPRcwGZR28M3XBoDSWkLIigxA8qrA7xFQMvK7wNUkQGbFF9aWAMBezb2ZbSVg/wm8iCmeeAKzqgBgf7z3fQ0AnDWElzHaLnAjgSVEEdIHCO+Wdir8WMwVQ36MgL2A5w4CDfVjWN+J73FXR4xryYnCaiJSBdpBeK7EsScapIBorxff5NLHRafiJe4SxIcJiPwq8CaKtdtR/M6/EMwl0/MI5vEaQPaogJ9h/WbSRCt7kai6z6Vg/UV45npov20JAKq3STUeBVZYJnA6iY4bRi/gOuuUOOV+SWU5EfgXu9zLjZuSs3sUeFmhAFWkBezOScbNKZ+sKm/nS9jwR4pvviJZ2bht9IDMqPdkO8Ler+2ILO/QyaNHmLekxorFD9dvnbl9/yc3Y4Esr7Pyeau5EySikyXfv1ltNZJLZcm8Kc7berIylhM2xedtcd2gSWElkv0ulawbkHWLFqWtePOVrFuwdZPWdf8oB4L4uk0D6yuRQ7J0tUrWjRqHpMAxVxLfhHzdqmzmGMc5RxJzSGHdrF61C4TMflahmutmw+jTqKSbc2LSdXvD9w0N37c0fN/U8H1bo/eNDd+3Nnrf/H/ctzf8fwMD";

var img$b = "data:image/webp;base64,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";

var img$a = "data:image/webp;base64,UklGRrwCAABXRUJQVlA4TK8CAAAvP8APAKfjIJIkRarzb5XpYaHr0YPjRpIUKcd/P5dfcDBUybBtG0e6/Yf93t/W/AtIEhxQO9ItQIAUIAEChBB8At8JhACEEA0FfZQqKUVSfYbq/ru1EUkoUIlUfcazvlSmBBRkFqL2nyqppBTHvUvqWV8IUVKlflTP/6v0T0a1GeM+Udzem6r8wlKlfjKVqLWo9ReFUGXI6LweTpzLTQASwNAJgUAkCAoSrHyeqIOCgkAgEBQICgoK9AcCBMm27ahuZGa7jHKYmZmZOSknDWZmhv8fdJ7U68nDTCL6z8BtI0Xprvh44N4gf7IViqfyhUI+FQ/1h1ixcb67tby0uXveKMb4CTcvF71Gu1MIp93oW7pqhpnJvcxoRRCQgkIz+5RjpX1oFsq9Hg8oJKyHbUZ6G1pAdWIaFdBu9Pj6G0ZA6G6e9YBk2ODq5g5xH9xzjcqCANw95Dkg/GQFjP42Gn41AJb5JcxBc1ZgxHxVyvKqi7iPmSaHuV5qgHjTjxEp/76bgZi6jKmnuES0rpWy/KfSmpNoFovqfa3hDWKsH3+++f3LRhiwtxFSS/zcSLTrJfQqNonGeB5XS2rXjjG9tcoK1SoGjH03pZY89Yz+sckphabHPRjnVl4tBWon+D1YQGxcLqhmmcJmRDJTLKkmv+Uk6unDnUL310RxbuYZt9hOshGFMmc2xi3xCyOxMtJVGllv1E+eiNNuzUfJbxLHJk67lcVFQTRDzU8pQ50RP7WzyOG3WsCy7GekTB5RR2quOBJAc4ZqBspfn/Vhqp1tssStFzNleTu59IGFuA3rU5g7bvoD2dqgn4ybbHGb8tPtPRsZt/uQN8DhACpvsOYtq4D/SJgP27x582lWQ+dN7cxLjj1vXy35cN72Ll42w336b9hcWt7avWgUY33/b/nBlgQA";

var img$9 = "data:image/webp;base64,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";

var img$8 = "data:image/webp;base64,UklGRsQCAABXRUJQVlA4TLcCAAAvP8APADcFsZEkRVJGLRz8++8uGwG5bSRJkhhVPXs+139Tdxi2bRuGSrb/P27m/wwOZQ3lOp/Pv3V9He9V2cNxx3HG9bGevznvzx5Ljd44z4xkD+cdOf2v42aLnVoQFuGrZ1tEJ4Q6ofew6DQm18dKjpMtFiCWjUDuz7EtqJNMLA1lJ2ABQgyycTwLKkHsBIjFgEkL7Iwtxw0BqCScbQSLCFuOO7aEv1YQiUiCCIkQIVREnUSEigh/n5/Uv8JXwH9pkYhQ56sooY5IwEIIpN22tkbNqQt1d3d3dxfqTh3XupA7mjaMhEzHU9zhjwZCV7+zVkT/J0ATRwZ8BP6HwPjs1NdibBSr40dz5y9PKOYx0s4oVqdibnSUZO5bW2wciaPA+bik/E2A+66hwMeLriG5c9dkJWVvANPLCoaUPAFcsn05B2AX3LWUXwY718N+Vwpyql1GD7hSaj6sWwKnc7IPw2a4/dtPgcnDmUyVrZYrrLbT2cgcnpoKwKH25k5P/Cw77LTbBG8jf2EobZfb8tsOD9KtUakdkmEp8okpRQ97Cz2eLGQlmRWsctrhUcGOynf0DXC43go3sDYrSe1TySvAhqUsHwE39I7jtiRjEDojr4BjH0xfsj5fAKqjX1hR8AyAqwCb+uaxx1POQUeSBqDbsBrPADUhX7Ji3Q9ZkO6G71HJqmZxVgE2pNMbAdcogh2WrNfsdSQr3nWHhWlfhdJYfx0lOfMJ02r7BirgfcSTUmEfuGq5yqKfbQMVUBVR8V6ms4nZOT/2FrwvTLlHGfV6WhIr/0jdR3ClwnaYBZS2yt4GM+G56UepazCjzJGMwsuVsLsiJUknb8Uko/2cI8l9XAJbKx1J9mWY9Cwt/5bbmzfljWb62p2IvDFL3pi8Zq63z4nI29LeWzQ1bkNjG/rXhqGxDU0cCQA=";

var img$7 = "data:image/webp;base64,UklGRqYEAABXRUJQVlA4TJkEAAAvP8APAGfmqJEkR8qsNedAHH969/ZXvRwEAilsgxG0bRtnP3/KnX+1bdswaVsC5g2WQGYSGAwe5JBiZIAIRDMEhTzlYe4+4ubZRFklEihCCGV3BEbn1Vw8EREgiyyyOQoRKGIRoYjFEUIRFqEIERGKUnCKEIujlF6JIATyv9SPlEEhPgiUAAkiSqSkAAmU/hghfqoqftwqKGNPGZOY3MiBoCzyIw0V8YEiMIoArW3b0zZSv3B3E8eOO8zQRsPMzMzMzMzMzMzMzEyfJUVKV6P9V3EaO3M2RxH9nwDyV2OFbZmmVS39ZzROhgC6jpk0aVRHgLBZUWyp4L/zz39UKitlVom3JydDuKyYbOh7SUhOMS/lCk+0hdrFkg51vqs5Fupwdb5+rDhqwU7F0FOeWQhNisCyX/xGz/UVqO6b2f4HRx/FO9P2yWqPDH3ln5I1fall/2DoM38D5T6k4QVH3+V58CG08zcWoZ5heGZ3VpjXYZyL3AxntBAH4w29grssh4ms/vb08rH9O7ds23v4/N33TMsMqwKKQ2GPUn01IjrZh1tHmgDBcDQWL41GQgGAjjMPPleS5UFh1/UmeIkjIusKpVYjUmA1MwrGvOtZ4bjtjHnS+J8MIvLTQHIb21bSMIykmaqZJrmNkpDa+kvm0M/gSXKeRER2u6SmFQUw+oybvWjFsnlTBrcBCMZTaUJIvRhsoA4i6n62F6HzHBExu7nZ8H0PfmolpRRCSqUrP17ZNBBCZpqQ8lAPgYhiW6kX8JHmoFBZwRysMuVC4YXxEC8nBN5QRHYr4EEFKKwi5UIqVykyzEFEh6tv6yAeL6WI6HwCD+yu+ahUb09vnDGkW7u2XfqPW3rg5k8tGCI68sfKuR8YImIlpAuzxmTd6MdpCQjHzZRdvUZZyjKiAeiw4u5/giI6QlLM1S3rFGZOkm6qZ7QRIY1TppFIGEmrJiGkLAHW+s+KYn7VvcyPTjEjBMaAqUtWrVk+a0RrgKhZTurFYc4X4Ys1KutG345fdPGLVlIKIWRWs2eHJkLQImkDjog8unmDwqp1VG5IpeAOVpVlFLswFCzStATzZoAUnobKPLkO40JIKYXgDBGR69ejIVRfutGPXhB4R/Mwqb8/PLVr1eIFi1fvPfsqowRFZPr+ji/UjV8NehE+yd3YnbFlAOFYwjCMRDQEMGz/Z80QmXDQXayPe2FOUW4KkrZZGgbXQMRIWVEYdkszrKLuWOZFBaDjIieUtJq+/cyjt5++fnp77/jyXhCxLejzgudjb4F4Gj7BXVD+0lJwRh3HoYwL/eNob0ilSt7SPHJtwpuytsoNHSzQ4f8/HAAlL5mbg8Em3hA4l3HzkqlrjzPoLjfHiMe16/uAyBi6069Q7hWJLdQ+VFEPtoj3cFX4p/YA8bEJvON+yRtAfK1ufuL+yCfQxB9iG2+kH+oGNCJ+14Tz2vGK6t3QhPhfDjNQeOLIr4OAFKcRPyQELYRJ3AwWKdaGYXvnZy2Y40a50G/XBmPlpIjrxqDftlufKrVSOvPx6vpOkGhCit0uDQC06N69OUAwXkb+0HSdsrIG5C9HAA==";

var img$6 = "data:image/webp;base64,UklGRqwCAABXRUJQVlA4TJ8CAAAvP8APAJfksG0jR7LsnbvPodfv+yu4HGqYf7aNJCnqnj14sN/66D7/EHD+BSQJDcgdSkODDhoABYYLAIABMAQCwDbYtxHODH/d0wExaO5eo41IQgoiBHydRJNVeQGh0TSIi5VFEQJN3IBoAGliFV18ouk0EGISAQgQWVM6hP1kaMI0aSzwkxAB+Bgmr8nUAGoKMCnWmEpjQwBAiEoDlSICRCbrrnbxg0yllAWEgCIsIIQIQIjwk7CfhAiK8nMZBeRv23bmzd12rN18xpI8z2zbtu2tszLbzLd7+5ebN03euj9F9H8CZPJsNVfydChVlp/e1otee7y26S3lWH4jSX6+gZzaUco8fvn0f1scwQ9GHoTaUF3JgXuzcRTL1vR/IBlA01O8j+BUP4ZU+woO9tTIAJqa38joI4UYlRWnV6FQwEfyYC41d4nhasbkN5IMD8NHjUR6iwwXYgh+kORDFPaQN3utuRhHseBkSB4u4AM/Q1MqzTWc7axEuyriOggZwukne7w0tA9rNxturVsfuWE+PBFxTpKrCmvI7aU06k8x0XezPRF3IXm6byl5OpdC/igT/goRwQ+uqOIHl1eTU3xJisfyIorGiigaK5IGE7/bIyLii4j4ksr3xK5kBliYO57YNN8SxfWEduXFVu2asnGH4fa/LZFbN6EgFvvFOYaz7aXostjtLjJczMjQHAdabDg/VLyi4ZozRBSGex1D5k/UN+jQkKbnUTyQGyLZM4a/mDU0BAZ+mtk9NFofGchzqGtqbm5u6nSt8hGDfB0EQfDswbysTZLbH8e8s2iT4kkChE2ieJXAvqJNorg/uBN5q0Trdv8eTIdnl0gRl37Gutwh9jtYfefF21+1MKy9OVSvQ0C00j0DkQ0FGbIaKZOVAQA=";

var img$5 = "data:image/webp;base64,UklGRjoBAABXRUJQVlA4TC4BAAAvP8APAIWcbfvPL7vfQW1NbU1a7Zpcb8DabLvNbrPtx7Y227b9XMPv+8+1dRwR/Z8A7SVYVudjSq+LVk3dFvhHrekx44It8IMq012Gdgf2UxdONtvIOHBmKUJS5GirepY3SS/WH7GWh1jPSzW8eQubhJ/9uc3PIUR6w9umlIF/nFUlcHR2k3yR9SoPNMwbSXIC7zLI0LqvqcYg0HOaA8LDw50vMpvPF63/TypWJ/Nr4n9h+1IOrzbgHZ2mtwY70ydCv3Nkadm6v6F4Q65w3xCDYdIQB7rJlGxWbkgKrEhy+2qiSJLrd44qAwolOX6b2CCtwI+rD+Cn4R+Pj1+Dl5IW4fGxa3B7o9T1E/hRf4MJgcNDgCOyNn0B/o5JdXzaECmiKlqrLUmTbffsKO1NCA==";

var img$4 = "data:image/webp;base64,UklGRvwDAABXRUJQVlA4TPADAAAvP8APEL/FqI0kR1W9l17Hn9qByTPHgUDSxvXv/DNo20ZQvN3x5/kg/hS0bcN4hz/klmjaRnYqewN1dwwEMTYDQ8Ejgs21WIEiQGS2lGEo4OpZrWEEQihCCUBEBIFQgDIZw6B4IncJFBAoQBmGUhQFKGKgAwYKKYSS6BpFAd/+M1BuCXgsoknrTIGKUCKg8AjKK+rCTqMU4uV1DAoqCgz67uxVMHH6LY5jH1Dbtu2MJN3r3bFt27Zt27arbWPc7ucdvE89byX19qTHPzBJdTq93+ZLRP8n4MO7Hv7+I/Xwd78SGKOD2AhpI7FzNi0t1T5+tuSoqVy8V+Jme+MJ++QSZqdzMMGJ3QA8C7qCBekcTPkfEPezNToo6XRao4mITZJTJhZTvTPjMHBbgxCRSt+ajj6bGoT44YLb5QvmuHEYMxSBDxwiHoHAhMgpjAXQEQfgjP7csh0oYTsRUxu+OeeAV+YMMK/6hY7FPZdIeTsx6Hs2+nnC7J3ACnsGf3msKZL+XfnXIz8DzZuxNSeRSGQ/Ar6ewUZDmWbUN+xSwJJUQOffKJ+PDM1ZbI3KmYRL4jO7A0Z3BHjA81XYk5PwZz2RM9gSldmLIR4RaQcBeM5EZJ4A3jVM/crM7LrSHaoJWOk6rpoS0qshbT6VA2dEgF2eMZ+2jWo03UByH8CsaUD/gL7ArE0TgLmWuBr4b/OmP4AX3UJO8RAAuHMfM9LZmPxqJACct0SUbJgNAGuI5RjWRUdsm8rqrYh1iK2rbVNpnRXya1dVVImjiIx1KDoipTVlqlhThlpTpBlpDlchscyES4tCC96origRjoH9E+HXpAuq4cDhbI7BgOh0NbBf4vG8xF/8VhGRmJRhJaKVqQeOuMJESkzKiOqGb5r9ioj1pZWLdlaoqxdL3944CSy7dzOHpfXChsXrTjdLdF+U9hOZHATOBE4UI3itfYLguyYy9dr/oo2LAQxbPwwATueHrGIAe09vA/BcRxVa1vEb8NQz3jMAJ4zzHDhqjXkMnP/q2gSwS7qpMg845BKRewg4LroWOGiIywHsuF/faY2iqOoK/T/bzwG1moh0bUANcECI0ssRuKROIvum2S/ngJooyCaW+IA8juoLKT/nAQdcInKPhB02RG3tOu09v7cMGO9EZVtaW1tbW9psL+CxZ7wEAqqBFY6Yi8D1jpT7AxjuRhV62VQCGLxqGAJUC/wrLYClRw6NBA5JJP9kcE2kBIELgSNCzj7fWvfl7whc4FAUcu9W6I0aTWzubFpz4DndvlOhidza27dv5bJ2Hu1aveZAuaVIiCVcExEljRFNzJqISCeTSSYiNsYIU0Q99BeAD+96+Hs=";

var img$3 = "data:image/webp;base64,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";

var img$2 = "data:image/webp;base64,UklGRhoWAABXRUJQVlA4TA4WAAAvP8APAE0waNtI0iaze1/4Mz4QEf1P1zKU325ANVWq7ftqsdMKduJsNsAs2DSS5Kh0KJ4/sok/8t7/k2Aa21acI9lB0X9FaGQmFaw6w0SSJEX5/9etWrnB6hgk9T/gZAMMcDAA4GsMF8uvOC6+CbyVFHfkyD7mCZRf5MiRmQcLcPlrIocAAUDkAbDYAZ4LgHsQGAjato3DH/a2n0JETICClmSWTj8KQgHtSLJVSVLkubdeNcPUMKOY8zdqrAIswcrBjMNc9N67Jz+qalYFP7Ztq7Yt2VYu/TBIYIySBYEiY7FhyaJkoqmoMzObrT169SRJtmxbkiQhLanrWmQaMjMZifRkejIFBe0LvM0xAdZuazsmSR7Sue7necNpRbLHtm3btm3btm19s23bnrKzOjoyMjPifd/nuT9UWaK27Zgk6Xr+PyJSVZ3lats+0xzbNne2VjM7z+xs27Zts20XspyIyIj4Xz/Yth3bdNvWfl7P+7Fc1Wzbtm0rs42wZY5sRcxai1uLWmTrt+3vK3zVXt1XTEAdwnQBEBBwRChXP+GK/+6/13B5m6Qzs7zuCTf8d+lup/Zt1GuLnf5duis3tLceOecFK4UJAIDOMY4hbGwWOAYwK9W8BkDjEDOSAMepyABCQImDg4jKLLPMrLvm9tuus+PW2dXus8pqBXd++HmXhund7nTi3uMvuPg+p92wvP9c4xJpgRBCmNhUGGMsx8ZislwGg+KKieSUQkNIHBANAoZpRUXqXVzVqxvqDUdntborueExN157697S2BobbDF7cHGf06+98Y75Zjs2JgeLS2cuycAJAhAIEJmybMRor+7ZebIcxmRhxXCFKR2NitVLt1OO4zRQCjSxpwmrnnZUd/679vZbb3nCNVc46vwVF8/e+eTLO6u7m8kWWyzvueNeZ9x6pxPObKwuL1EuzWWACZcxMgECmpXGVjbGZWwOk87YjJGCtAOSwHOrj5buWC/GTLR1rg41IEwCuXCiTns+veb22y591Pl+BXd90Nn/uv62083RqbWR9ZU5HvicS/91lcFiZff+pcpluDwFcZmeABBAAmWMy2EzVpZ7vqVyXN2z4znRASY4PMucmk4n1jfGUmNJJwwDFxOYCQWlZnFstbPJZinGRx5z/t8eds7Ftzr6jtsff/CcSy944Jk3hun9HnXeTf1d+5deH1eiUjknAQkAsEMXzsHKeMtq8VU0tZpIroOTmA8EQakyCzMH1zr+mmqyLCu7pdBghJFgoEskiGM9Ntlii5XdZ3GPmx59y8POueDh5157g+3zhX3LjeX5HU/af/MD/3jrHeNKU2JCxx1MWLEAQmui5dVE9mrfup3asFtmdS1P6S22oUhQQLd9LPZJaDI7fzBZ37AaVooUBJCiDJj9kZVtky0uZsTJPZ968R9vvm1v/chqae+iv+u2q86MS3cux8VWl3MH/n+Ntq9e3TEFrrMATJIklQMO6YxZs9CCdWlzMU5zpZXp1kBHWObpqxsP08zyBmdcMT8/32ikGkZAFhWbibq8VuMSFnk8u9SxF1zjhN++97dfWFu4zoXh+iEP/srrfvH9i89fITExpM+4gAg+Z8YRJ+xXaeOmrj1bqJUOJZDxoNqrc3h17CGjHPNR18+6OTpdD4ZbsTWZTMc7JAGIlBthjceFOeE9QUsU++OpWevYj9JW/lkPesm93/eN/7x3Z+VkbDog4A6FoPIHZuAD71iNji4zOV4uAKCTMxyqMxSiW+Qmc9ie3xKnR5tXPPYgTboRTkLEEjppmPVxa9vTsFphFaXVhYaK8E6aOd8ab2IyAi4r+khhQrziW2YEiovNzLowLDtwAaA4OU3X2jSyfrtm0JiUWBys9oblNQkRqaGCMsLF9Lpt7RiVKh2L8EQFJBQ1gg4ls8QskhBh8A1nAICxHbv9cZgcAC5AyTWUEIDWRbvIiDEsdlbKtJFoMCCmINTFGGdNXy+WMkaRiB0CVMCAghU6hFJSaCzsg77DAACYmnMZcPEAcPGYtPuMd4AB5mPuKQmGlEiJQJcRTiDpKHcSJCKWTnpet6hkoivJOqdCdZsePSmMLGM+2D/6VdgJB8AWM+vCgJITNMDf3fzZh+w956cPnDwsBpbcsQnJPCUViZoBexggVN06XPsWXdqEMfulpeeadGtEMQzTLhNGnOA44pgpgYCdacd9sgcbuDgAf1+/+TtP8INdl87f/39cLqoxOS5ijMSIERVQkDjS3pRYQ9biqZgymeGCrqMSqgMkVE+aDIxepwghAITZYWETnY0BSk7QJ934wuPeMXfwfq3ZPPn6T5f/9LU7yD75eFzkJ4bUBJwAOEa/Xq3XtboxOiT1gliO8ICr7Ek66vXiPMEIEwQU2iGD/iwBABWps9m92J5N9eTkMSuLi3rlKVLWaPbzvz09Gil0gEkMiEwsDYDDYhcESgwVe3IyQTTvbXGmES4AbbtAmCEAJCrbsx5y1ZxDE5HiaunjvV1AkzR6YhsFAAgBQogsDBMArjphgaQmIMaNgb5e+SiCzfB2WdKqCU95Kjezkxk3/8fORfNRxZOF5HrDeZ0GCEloAAgDQhiImwXcfLi0g0KgaGTCnfZc7AE8TdgWQDtkmj7ja+cpT1Vptu1u7JsJgAl3nub0YAmgaLQcAQBCgIiFlwdLG9ihIKRRaBD3ZWEOm3iblQkQABDbDgDbuIH4z9Gbb/7SBYf6kwQgywWMckxQvFK0BQDCgACj8xzGZekCUTe6uHOpB2zZ2RzuI71e9QqwSdAORK2byDAe4+msCACALCSmgSREaCQAkEDHBJTy2LJAiCr9nf8bH8xvYNKyPJiFhz19GX8+IATAwrb0ff7UH8/8/nx/LB3UevHQ4qMP6NYkAFAk/+66V/vglpO6rna2aLPqWWaPPUTPAuFlz+TyaMre9Pstv/vGL6373mf5g/OXXybNGMzyD1u9/d/eN/7nn13/+y/4TwCAAOCDb5/67c3948nL35/11+OXf176/W+5/zjVGNd/dsw+d+kcQhfK4en42Pxybbw1mN60tOHQDbe9+Wpbn3K8maY+rhCs+EgPJECQKG06RKGbv82R3bMjr/j/yYecO/Dz+f7Xo79PCgQBxP+b5ofn1EVnX3v98P3XXnz/QaNXvgIUAHBiV1/b9pv/t7V4/vkj9itToZft/n/pwXe/66c73eG1vYuvXDnK3vat/7ms5vzgxH90J8dO5fq7z73vqsNPnxmfkc3H+NzPTvjJIOtxTUIYjsiiULUgAuP/5sCu05O1g3A4Np6K3eP0Q87VL8VaKa0AH2k8yclX/Hu8tBtXthoHtnezmPrVmXwoQEHDiV39lOcffuzH1/9yWmYGgKNL86NLXv6kT336yDkPWzyQlG62adZ0uaX7lN35m8w+f2751YPpzSYwGK4uds+bvnrqrwIAjoCcQUEcMYntLfyMfdkggIjLq+Gz2dWN8vDEr0v5+tv94IYahmFdWucs4vZmBYFUYy2bv6jpBwf3m920taWcDIB1GRx759e/4Pu3/+sv17qrW5VmVTsp+u3NHVcev7PMfhEAyMxoVpshaAAQGU+AIBmBsDYDAFDV6PxzyeQdCtVW9u5zuboZYUWJhS/X/FcX+RCA7X3jHb/becbcNZcabxeVcuw5l07T83EAwDYtn3vKDxu7NjePWbX0DkdX/PbI9t6oCjAAAKEF5yVytaedXDK5af/3MdoBABDXFrtfp5varblmra+fHq9QIoSJwTQz917UAuiW6cfnHWzvO4iV0LEuJ9e88F5VAQB1bVxx48Xdw7ORHskwgUZvETKsK9IAAPShmWCdw4C3IKU9cZ2kIfUm+dW7bFido262c+87fHnyduRJVQ+52SZbhGFIRBBK/xMrv9veLnf83OET09u6o53QsapYmUxyh6O7v5AMAFWzM5f/9ez7X84FSCDjSagU3SBNBQhPhbX1wm1T3pF0cpgO9pTdNCCHV+fITcdg41TfPnHDCZoGANCgx28P/0zz9csLt94uRVgxZQglGmf+kYuJDC2nH97dwU6cJnQVugSduOld22sXzx0AihmYhAyArEIx8QAQYbRuXjgv317Vq5Y+Hml9yqvJ+2cUj6wdN1J0s07tqL9/ksEKAAiNZ3uPnmMqn3mHrWyCIZQISwyV5nGj+7j1bZ92arDzpjioomKlKDG1ffO47c1b609YOAAAaGogQ5J4EkqcQgMQ3GbvNbtzt86rO7bCdWVLaNs3gzCpIAPxsVXvoNEWAAnQVTrrrF365XTSnioOKE0QQORxLTxpxNedmT7+kFepYa3YEwfVmq+/fq0113BeNAABualAiHOsNxjTZ3b441oVH/CSqx01q7sotbL1Pjyj/usxeg0AJHZwqm87ndYmcFy84oALUFpHJ1980Dq2vDiGJdZLGo5/vZnanA8BUACEEqaNBiCJW9Z82NSfEjaHACcuhhGuyaWARLFJ/byTmhtAAgQqFyUkHgoX9RAkLmglldW4VognwpIiOfRTQJwPLUEQACNAGgAo3MgW2wAHAE+AVE6a8ixWq5/UJl11khaQkiYF4MUhaKRrd5kf4AkCLkpAiSWWyPjlE4NGn+Oh2sGBshaWUXZNCelYfQ5dGKAEhXYByHMSMNMnRuLUVFinL2xrdoWgERJAHMK72LGLA0/eYveOGgSJgziOY4TW9n/6DFCb0AAAvYWb8MiMhwLNQRvt4d0jWwSAom7nFE9CxQUAuGIQbbJ0F6ZNFDtm9WfbDx4hSBAAEhI0VZ1Hfja94VvDb+8wM1wc1x4E4igp+NsnLWnUgas7AADIxPxN7/nj34d1vH/7wWCf55z4Yh06EpoBALIxmbk+jldo04ZrFwfC0wXaheO17BOvbpaqr/7dIfqkSQF44uKELVP6xOfDI7/6v3sfie2MQBAECJLQZG//+ON7KxxjfpM3vGLZUgAA9Xh28Wd+/62XPe95edzLXnm3DfdIh45uT882OgAQphvVhp/2lk/GDLIedbPUNAAQieZMnPZyKjVfY3OT3nOOMQMhAQSETyteuJ8v+WLv1K29/ld3/7JNjweJiws4sXHguz2rKY3ZwuJf/5kZAOB155kTvj3z4t/o7/eY3XWPsl0UbToAGqmn21tH//JDD3jGzPK5kHUTE8cDjFA0aWWfnOWMraaW2tpucvBwjX+/p9FEUwBCEdLlX04U45kHI8cfstmYaxMLQyEs0D/6VLU2AJhdrcf9ed4c9f5cAND16C6XuPcHjv3hm2c+/uR41nkGa4Li3UYql2+/+ZeTfj0/f8a23Bc5AlhlnxrMdTynFLV5645yWAZd7y1178K1XblHFSKsY12pWaW3nmos7TJtMTGrrtq1HqEwLAltTt4wrAs9AK35CT5+x3jY8dPePAB0ObrL+gUfLfe96ML/vXv478f6ZMs2nJ1d/P3a9DtnNn/nFef89N79Nzs8tbZPkOl7k5xOpdc7G3NwL2QRk0DZmPRm7Q/s+fIGIqxYk/LWKv66y2BQw/XM7M6Zr8/iTBsmhpLIn36a6cMNALCiPnVdHnfeuOcxszIDgKhHdw7d7/qnv+GKT7wPh9mhsTF4x58Gz3roQ35/ie7SxPEazycZ1tgOrGMxjYKQVVcgQELsLqXzsvPptLOkrFhi7ar83N1t+6AGQDwl/3vjzPdX6AuhRqOXs9es/n112XbnSFbU+66qm5/cjz+1F1YrhIqQ43l8dzvccXm9u7z9vfNf/tp3fvKSV13ukefYcyW676jwFrybojAQIDc1JRJBlN3wSBs6L1XRyMvr0VcPx3cf9i0NAF7dP3Xn21unnWsG3WC9T/x58c371/JagwMAIOmbfnxj1b1+2Enr67fZGKl1nTFpcqJ/8vf1zM+M3nnwww9YuPM2jJwwDa3zzfTXHM4TqCATwDbtE0AJBMqA9I4d60Zqa/rwbjyDAwAQBrV+4okfXXDo83P12YX1F+49K9ajOQAOnLvYK/jYbZtopJ8xXbv/8hjU1Nz+3HW3Xvymy4ebRm5UqWozNd6yrLgvQEZABQQUR9cU8ARUWqb2VmFczXYzmlJYAQAvqVpzs42zj6+ffueZLRsrR4d5AACO4wEA0Ieg1CWaTYFOic0MRl23ac5b69a9XtEPifGOSpJAQAUEy6q8QqGaammPJjSxLhl0TlTAk4wD3g1rpjiYKHB+ikOoAFAghKenuskjl7wkHjEjnThRxh2HksWdy43lBECIAEBU1kXa0oJUmA41cvOVSnmZVAqAsVObdklk2ycmpc6deTYX2VJfONun1nlFJQkCWHQsRwQoWmdrbRVvEgiThGGzITY/6JUVVSOLzWNyx+UbyPLEZCYdW5z+hxkJ5mMzquqDendJKB65AQACKQUtR1NhhEXpjMrb5UWaQa+VhFHiAa3rR/EvmsHGKZ3HAgZMOvbaCRxQSsGnGjOwzxUqA+N/ZdCU2uR72Lo0F++aUgiAXzsOinXaJp2YelupjwEGGFCvGbQa6pfPCEPt67r9I/rX8/LF1pTLz/w8wUUwYqYrzWxPwAyccBnzjDkjpKmWke9praiP64QBBrTZJxrekE5O2tIMigHrs4lipcOwNY31Ywu0KG3P/lZ5pm1q/TX+S1xWPvHMdzmCyEMgamXtGpkxY+A/1lSEKMNLnanule1XH4PpYCggMiD6zVX9MMuaYYeFW2kMFNJUwphHnKR5AZ2XvZO117f8fOPnx38/cpK2vCeo7GSQh1IHNpOBGWcs+BcogAHIGSmds1Z/cM8od0rDclyWOwDR/QKTtmHbPa2mQtsKYYmqIQqSSUM+7t5xffQP8dz41sf4yfxv7LGXW4yapAYUTMoANEau8IjgKUEAWzOpOhdfkO7AXOdqjIsNGBfU39Ce1pC1DDBACEkoSlkNUl5djc1/Ov1sB3fNxnfkq3j4kUapURqkFmUbMde5z5IfeE4Am8YkMnU6R25S34VJ0oLsaC6CMUjP8UIv9BrYFJhcBaeJPREGnZtUd3VcDuvxaedBUhMS65qQEABZht5lKi/5QEUAgAFjwAA4cnjjP9PXDL/BM4xBLjahE2w3AqDu1DQUyokSb6pcioadx9FKe38wT4JC0JlWslCGPLWeggAAA8YAABgwiJWv5s/Wv4//88ITFgCYLQlAAFIstbgjWOfwUE+eJo+xGi21HZy8H3Vcd1IzpLKdtLvhtRcDAAa2GgCTONzUTL5e+yI/GAssBgDAABgDQggmoiWpeeJCDWrkBgtdYwd76uvF7Ohk6pUyGYA2pW3wCGwaYQCMMQYMANOe/IXa4cEAGABjYKuAAAKkjcqVXLzi4uLT1qJxE+2z/Kcqe0bFKgYB0OK2DSABA2AAEuHKZ3xUe2e+YRbsNgZACAgkmcbxdI7UJEmm0Wku2j4r8V9d7I61CCoEAuyNR4wBA2AAthnwhlK8vXwfF2Y+YVOAgDIUygk6B9Uto9sM9H4v7YvsbKzu71q9IjwRKgDDmQAAMLDFgAGTJQytvc83AA8AGAMAZkMABEhQQ7qgictu2aHq2Fylc/jeFLc3LQIBABvsMAAGjAEDwOTBuw8Y2AQ=";

var img$1 = "data:image/webp;base64,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";

var img = "data:image/webp;base64,UklGRi4GAABXRUJQVlA4WAoAAAAYAAAAPwAAPwAAVlA4TOUFAAAvP8APEOZQkLYB0/mXfS1ExATwKxYWTPxwKmCao1hd7vMfpTw6OmxQ3+SbzKyAadEQBwhYBby3p4F0QQQuooM6nnj8DwVYWV+gJkamjAFuA+uAq942QpS2keT0X+XdfYKJPTOjSJIix630UKWE64UE2GVSbVsd/ymSEOS3fwYaYMHiOZQgA/62FViAqZuc3efIbSNHkiZuuk2XvU+go///eTvKky5PutS2bds2L2Pbtm3btm3btm075z5nB8EK0qdObVSp3OWWedJxPKe63ZhdNjC2l8ENGO10PDsYnS3MBrKJ6didcjy7OAuYyuZ/ki2MZ3Yw8x7vJd1dAMO2kRT13+Pfzs7xMzPJARiAAJvUtm3bfW3btm3bmG3btm3btr3+K2zbBikMHmh/MLYHLogSEAIrYd/87Vxa+TqV/6uX9dvq4tAPk3UblpjXXl0LLVyoEBgneSMHwa/ueqOzjMW/DIGpk6GncP6ZHoLrROgpLV/SEWAIhwtYz1IQqAsZuoj9BzYBxcW8ZUJsLugdC0J3Ue+516KX/G9ofYGgruA0kW2Yvgb9pyRqV7FOelhcyZfzlFqU5590V/PzLHM95meXKVf0/5RCk8LMmqhJbMxyByhTwYviHnhUbhcEQYUqnhWJKnXEodxsArgntPNrNO7rs9/ttF4M6wJuF1ZEcGFt5lOt55N+FHFoYnsmwL0PpUy7eNb/Hxhzv3MFhHWpUh2kSY1+FXG8V9sQT0bR77jPjO/PtO8XuABq1POl5K0mIKh1V6GqON7HgAhQplxUH9d+OWdRqD/uZub/1wkQvCp1h508YEdQKFSoIXhT3AKfinDkAqknxSVwB/xSWOIKuAZKFBWNy9bRJnEN+h8P6bvfkwmK7tt1Bp2Pg1hXef/jQSDreE+dYfvw62XJZoEz0Hm9NPh8krca3zTx/TLwfBzBhTSdDo17Po6+38UJ2aLVEnZHqlL3DajRb/pNcA7GPZ9oOR+P5pMhS+52CgYcD7lJj4GFsMt6xSOA9DPIunSpBRLFYr8U0JJB6WZxltwDIayHY/A2dYYdMhh7f2g07ofDlz9Ir/22AnI82SH3NBj3gCOgRj2/FFwESWJZ9X4TOBDcAshdjSSPVRAnZNoSoGy7VGfB+7RdzhyB9L4grsGQ8xk9t5syYUfxZh6c3Xm9zNDz+XMJQgGEdr7XwN9JYznsti9AxW6VdwXyBdFaCpdbF+wJKVPdqPstU74fugu+oO182oZQtJ4NRgzfMuH9Yk04BfyQmD4VMuQO3woG3ihR/BDM+P72Pe5uB+R6DaCdOjU8y4jrtQnDoPMJvfZbrzSdDnHYslCwngb+aalCNXyTIVSork4jFuByswYA6LBcMGSY8f+h3rDrFTnyVy5n+vfboSDgj+Af+q1kM3/G/5dJ77c/YoV00LQvNJ+OgPw7jho3QINxt21hyPkU7d+bTIfgOdHotw49/7kDOgr807xytxb+PCSTugGmDarUzpDbdypRIrwLzZg73tkTgNZZy74AtN0jzZg7BYlotJVjnYEi9ayxzwfm5/rB59M286lrksYKb4oT8NBDkt9ecg+WKh5PHEsHno9q9pt/g1SBwtg7rOeBye93NNstZwYcj7YDgOZd7Zez11fu1pVrl1bq1tQfdnXdrk79fqKRt9nVERHSQvV0+MWMYdj1gqOnXXC8CpWXvfXyAyyc20S+cd8GXLf8gqHnc3bpMkTxcVC4nikVhGf+f0m2OaKLLFLPbjYd1v4OgEc6rZc+WamB3LIc8dz07xc3Jwj5XzD9++MKaC2YBFKJ7MezA1r7gxFc6Pl37NBAkOWMdfuCwedTALKV/VJh4VSj3iU7lam4UWO5zZgbSpQ8+Ag8kK+avENcvcGaW0oUeyhhKIoX8pwDqdh6izc331CiqBLF3xBbb+rPbfXcoJ9buic32UwntyXnd6Jq8KyeW9Vzs3puV+8NXdRbUHqX6k1T9d6m3Ru1e6tQb1499abozWISLK+335isOw4Ikvy/wfe1cTUARVhJRiIAAABJSSoACAAAAAEAMQECAAcAAAAaAAAAAAAAAFBpY2FzYQAA";

const appTable = {
    accuweather: {
        name: 'AccuWeather',
        app_icon: img$O,
        launcher: 'package',
        package: 'com.accuweather.android',
        uri_scheme: '',
    },
    alexa: {
        name: 'Alexa',
        app_icon: img$N,
        launcher: 'package',
        package: 'com.amazon.dee.app',
        uri_scheme: 'alexa:',
    },
    amazon_music: {
        name: 'Amazon Music',
        app_icon: img$M,
        launcher: 'uri_scheme',
        package: 'com.amazon.mp3',
        uri_scheme: 'amznmp3:',
    },
    amazon_shopping: {
        name: 'Amazon Shopping',
        app_icon: img$L,
        launcher: 'uri_scheme',
        package: 'com.amazon.windowshop',
        uri_scheme: 'amazon:',
    },
    amcrest_smart_home: {
        name: 'Amcrest Smart Home',
        app_icon: img$K,
        launcher: 'package',
        package: 'com.mm.android.amcrestsmarthome',
        uri_scheme: '',
    },
    apple_music: {
        name: 'Apple Music',
        app_icon: img$J,
        launcher: 'package',
        package: 'com.apple.android.music',
        uri_scheme: '',
    },
    bmw: {
        name: 'My BMW',
        app_icon: img$I,
        launcher: 'package',
        package: 'de.bmw.connected.mobile20.na',
        uri_scheme: 'bmwconnected:',
    },
    bond: {
        name: 'Bond Home',
        app_icon: img$H,
        launcher: 'package',
        package: 'io.olibra.bondapp',
        uri_scheme: '',
    },
    bring: {
        name: 'Bring!',
        app_icon: img$G,
        launcher: 'package',
        package: 'ch.publisheria.bring',
        uri_scheme: '',
    },
    calculator: {
        name: 'Calculator',
        app_icon: img$F,
        launcher: 'package',
        package: 'com.google.android.calculator',
        uri_scheme: '',
    },
    chatgpt: {
        name: 'ChatGPT',
        app_icon: img$E,
        launcher: 'package',
        package: 'com.openai.chatgpt',
        uri_scheme: '',
    },
    clock: {
        name: 'Clock/Timer',
        app_icon: img$D,
        launcher: 'package',
        package: 'com.google.android.deskclock',
        uri_scheme: '',
    },
    doordash: {
        name: 'Doordash',
        app_icon: img$C,
        launcher: 'uri_scheme',
        package: 'com.dd.dashdash',
        uri_scheme: 'doordash:',
    },
    eufy_home: {
        name: 'Eufy Clean',
        app_icon: img$B,
        launcher: 'uri_scheme',
        package: 'com.eufylife.smarthome',
        uri_scheme: 'eufyhome:',
    },
    eufy_security: {
        name: 'Eufy Security',
        app_icon: img$A,
        launcher: 'package',
        package: 'com.oceanwing.battery.cam',
        uri_scheme: 'eufysecurity:',
    },
    google_assistant: {
        name: 'Google Assistant',
        app_icon: img$z,
        launcher: 'package',
        package: 'com.google.android.apps.googleassistant',
        uri_scheme: 'googleassistant:',
    },
    google_chrome: {
        name: 'Google Chrome',
        app_icon: img$y,
        launcher: 'package',
        package: 'com.android.chrome',
        uri_scheme: 'googlechrome:',
    },
    google_maps: {
        name: 'Google Maps',
        app_icon: img$x,
        launcher: 'package',
        package: 'com.google.android.apps.maps',
        uri_scheme: 'googlemaps:',
    },
    grubhub: {
        name: 'Grubhub',
        app_icon: img$w,
        launcher: 'package',
        package: 'com.grubhub.android',
        uri_scheme: 'grubhub:',
    },
    home_connect: {
        name: 'Home Connect',
        app_icon: img$v,
        launcher: 'package',
        package: 'com.bshg.homeconnect.android.release.na',
        uri_scheme: '',
    },
    hue: {
        name: 'Hue',
        app_icon: img$u,
        launcher: 'package',
        package: 'com.philips.lighting.hue2',
        uri_scheme: '',
    },
    hulu: {
        name: 'Hulu',
        app_icon: img$t,
        launcher: 'uri_scheme',
        package: 'com.hulu.plus',
        uri_scheme: 'hulu:',
    },
    irobot: {
        name: 'iRobot',
        app_icon: img$s,
        launcher: 'package',
        package: 'com.irobot.home',
        uri_scheme: '',
    },
    keurig: {
        name: 'Keurig',
        app_icon: img$r,
        launcher: 'package',
        package: 'com.keurig.kconnect',
        uri_scheme: '',
    },
    lionel_chief: {
        name: 'LionChief',
        app_icon: img$q,
        launcher: 'package',
        package: 'com.lionel.lionchief',
        uri_scheme: '',
    },
    lutron: {
        name: 'Lutron',
        app_icon: img$p,
        launcher: 'package',
        package: 'com.lutron.mmw',
        uri_scheme: '',
    },
    lyft: {
        name: 'Lyft',
        app_icon: img$o,
        launcher: 'uri_scheme',
        package: 'me.lyft.android',
        uri_scheme: 'lyft://',
    },
    myq: {
        name: 'MyQ',
        app_icon: img$n,
        launcher: 'package',
        package: 'com.chamberlain.android.liftmaster.myq',
        uri_scheme: '',
    },
    nest: {
        name: 'Nest',
        app_icon: img$m,
        launcher: 'package',
        package: 'com.nest.android',
        uri_scheme: '',
    },
    netflix: {
        name: 'Netflix',
        app_icon: img$l,
        launcher: 'uri_scheme',
        package: 'com.netflix.mediaclient',
        uri_scheme: 'nflx:',
    },
    pandora: {
        name: 'Pandora',
        app_icon: img$k,
        launcher: 'uri_scheme',
        package: 'com.pandora.android',
        uri_scheme: 'pandora:',
    },
    play_store: {
        name: 'Play Store',
        app_icon: img$j,
        launcher: 'package',
        package: 'com.android.vending',
        uri_scheme: '',
    },
    rachio: {
        name: 'Rachio',
        app_icon: img$i,
        launcher: 'package',
        package: 'com.rachio.iro',
        uri_scheme: '',
    },
    rainbird: {
        name: 'Rainbird',
        app_icon: img$h,
        launcher: 'package',
        package: 'com.rainbird',
        uri_scheme: '',
    },
    reolink: {
        name: 'Reolink',
        app_icon: img$g,
        launcher: 'package',
        package: 'com.mcu.reolink',
        uri_scheme: 'reolink:',
    },
    ring: {
        name: 'Ring',
        app_icon: img$f,
        launcher: 'package',
        package: 'com.ringapp',
        uri_scheme: 'ring:',
    },
    roku: {
        name: 'Roku',
        app_icon: img$e,
        launcher: 'package',
        package: 'com.roku.remote',
        uri_scheme: '',
    },
    sense: {
        name: 'Sense Energy',
        app_icon: img$d,
        launcher: 'package',
        package: 'com.sense.androidclient',
        uri_scheme: '',
    },
    shazam: {
        name: 'Shazam',
        app_icon: img$c,
        launcher: 'uri_scheme',
        package: 'com.shazam.android',
        uri_scheme: 'shazam:',
    },
    shipt_shopper: {
        name: 'Shipt Shopper',
        app_icon: img$b,
        launcher: 'package',
        package: 'com.shipt.shopper',
        uri_scheme: '',
    },
    sleep_number: {
        name: 'Sleep Number',
        app_icon: img$a,
        launcher: 'package',
        package: 'com.selectcomfort.SleepIQ',
        uri_scheme: '',
    },
    solitaire: {
        name: 'Solitaire',
        app_icon: img$9,
        launcher: 'package',
        package: 'com.tripledot.solitaire',
        uri_scheme: '',
    },
    sonos: {
        name: 'Sonos',
        app_icon: img$8,
        launcher: 'uri_scheme',
        package: 'com.sonos.acr2',
        uri_scheme: 'sonos:',
    },
    spotify: {
        name: 'Spotify',
        app_icon: img$7,
        launcher: 'uri_scheme',
        package: 'com.spotify.music',
        uri_scheme: 'spotify:',
    },
    tuya_smart: {
        name: 'Tuya Smart',
        app_icon: img$6,
        launcher: 'uri_scheme',
        package: 'com.tuya.smart',
        uri_scheme: 'tuyasmart:',
    },
    uber: {
        name: 'Uber',
        app_icon: img$5,
        launcher: 'uri_scheme',
        package: 'com.ubercab',
        uri_scheme: 'uber:',
    },
    uber_eats: {
        name: 'Uber Eats',
        app_icon: img$4,
        launcher: 'uri_scheme',
        package: 'com.ubercab.eats',
        uri_scheme: 'ubereats:',
    },
    weather_channel: {
        name: 'Weather Channel',
        app_icon: img$3,
        launcher: 'package',
        package: 'com.weather.Weather',
        uri_scheme: '',
    },
    weather_underground: {
        name: 'Weather Underground',
        app_icon: img$2,
        launcher: 'package',
        package: 'com.wunderground.android.weather',
        uri_scheme: '',
    },
    yuka: {
        name: 'Yuka',
        app_icon: img$1,
        launcher: 'package',
        package: 'io.yuka.android',
        uri_scheme: '',
    },
    yummly: {
        name: 'Yummly Recipes',
        app_icon: img,
        launcher: 'package',
        package: 'com.yummly.android',
        uri_scheme: '',
    },
};

function launchApp(app) {
    const appObj = appTable[app];
    if (!appObj) {
        console.error(`App "${app}" not found in App Table.`);
        return;
    }
    if (appObj.launcher === 'uri_scheme' && appObj.uri_scheme) {
        window.location.href = appObj.uri_scheme;
        return;
    }
    if (appObj.launcher === 'package' && appObj.package) {
        if (typeof window.fully !== 'undefined' &&
            window.fully.startApplication) {
            window.fully.startApplication(appObj.package);
        }
        else {
            console.error("Fully Kiosk Browser's startApplication is not available.");
        }
        return;
    }
    console.error(`App "${app}" cannot be launched: neither URI scheme nor package is available.`);
}

function navigateToArea(area) {
    if (!area)
        return;
    const url = new URL(location.href);
    const pathSegments = url.pathname.split('/');
    pathSegments.pop();
    pathSegments.push(area);
    url.pathname = pathSegments.join('/');
    window.history.pushState(null, '', url.toString());
    window.dispatchEvent(new CustomEvent('location-changed'));
}

export { E, __decorate as _, r$2 as a, deviceReboot as b, formattedDate as c, deviceRefresh as d, getDeviceOrientation as e, formattedTime as f, getDeviceType as g, createElement as h, i$6 as i, createElements as j, deviceType as k, dialogPopup as l, loadYamlAsJson as m, n$1 as n, o, r$5 as p, launchApp as q, r, dialogTable as s, t$1 as t, navigateToArea as u, appTable as v, listDialogConfig as w, x, formattedTime2 as y };
