/*!
 * PSPDFKit for Web 2022.1.1 (https://pspdfkit.com/web)
 *
 * Copyright (c) 2016-2022 PSPDFKit GmbH. All rights reserved.
 *
 * THIS SOURCE CODE AND ANY ACCOMPANYING DOCUMENTATION ARE PROTECTED BY INTERNATIONAL COPYRIGHT LAW
 * AND MAY NOT BE RESOLD OR REDISTRIBUTED. USAGE IS BOUND TO THE PSPDFKIT LICENSE AGREEMENT.
 * UNAUTHORIZED REPRODUCTION OR DISTRIBUTION IS SUBJECT TO CIVIL AND CRIMINAL PENALTIES.
 * This notice may not be removed from this file.
 *
 * PSPDFKit uses several open source third-party components: https://pspdfkit.com/acknowledgements/web/
 */
(globalThis.webpackChunkPSPDFKit=globalThis.webpackChunkPSPDFKit||[]).push([[4099],{82450:(a,t,e)=>{"use strict";e.r(t),e.d(t,{RESTProvider:()=>m});var s=e(96156),o=e(35369),i=e(51333),r=e(11706),n=e(81928);class l extends(o.WV({alreadyLoadedPages:(0,o.D5)(),serverURL:null,authPayload:null,isLoaded:!1,isFormsEnabled:!0,loadBookmarksPromise:null,ignoredFormFieldNames:null})){}var d=e(11171),c=e(51983),h=e(46232);class m{constructor(a,t,{isFormsEnabled:e}){(0,s.Z)(this,"canCreateBackendOrphanWidgets",!0),(0,s.Z)(this,"setDocumentHandleConflictCallback",(()=>{})),this.state=new l({serverURL:a,authPayload:t,isFormsEnabled:e})}async load(){return this.state=this.state.set("isLoaded",!0),this.state.isFormsEnabled&&await this._initializeFormFieldValues(),this}destroy(){}setReadStateCallbacks(a){this._readStateCallbacks=a}setAnnotationCallbacks(a){this.annotationCallbacks=a}setBookmarkCallbacks(a){this.bookmarkCallbacks=a}setFormFieldValueCallbacks(a){this.formFieldValueCallbacks=a}async createAnnotation(a,t){this._verifyLoaded();const{id:e,...s}=(0,r.Hs)(a),o={id:e,content:s};await this._request("/annotations","POST",o).then((a=>{if(200!==a.status)throw new i.p2("PSPDFKit Server returned an error, when saving an annotation.");a.json().then((a=>{if("attachment_missing"===a.error){const a=function(a,t){const e=new FormData;return e.append("annotation",JSON.stringify(a)),t.forEach(((a,t)=>{t&&a.data&&e.append(t,a.data)})),e}(o,t);return this._request("/annotations","POST",a).then((a=>a.json()))}return a}))}))}async updateAnnotation(a){this._verifyLoaded();const{id:t,...e}=(0,r.Hs)(a);await this._request(`/annotations/${t}`,"PUT",{id:t,content:e})}async deleteAnnotation(a){this._verifyLoaded(),await this._request(`/annotations/${a.id}`,"DELETE")}async createBookmark(a){this._verifyLoaded(),await this.loadBookmarks();const{id:t,...e}=(0,n.a)(a);if(200!==(await this._request("/bookmarks","POST",{id:t,content:e})).status)throw new i.p2("PSPDFKit Server returned an error, when saving an bookmark.")}async updateBookmark(a){this._verifyLoaded(),await this.loadBookmarks();const{id:t,...e}=(0,n.a)(a);await this._request(`/bookmarks/${t}`,"PUT",{id:t,content:e})}async deleteBookmark(a){this._verifyLoaded(),await this.loadBookmarks(),await this._request(`/bookmarks/${a}`,"DELETE")}async setFormFieldValue(a){this._verifyLoaded();const t={id:(0,d.X)(a),content:(0,r.kr)(a)};await this._request("/form-field-values","POST",{formFieldValues:[t]})}async createFormFieldValue(){}async deleteFormFieldValue(){}async loadAnnotationsForPageIndex(a){if(this._verifyLoaded(),this.state.alreadyLoadedPages.has(a))await this.state.alreadyLoadedPages.get(a);else try{const t=this._request(`/page-${a}-annotations`,"GET").then((a=>a.json())).catch((a=>{throw a}));this.state=this.state.setIn(["alreadyLoadedPages",a],t);const e=await t;this.state=this.state.setIn(["alreadyLoadedPages",a],Promise.resolve());const s=(0,o.aV)().withMutations((a=>{e.annotations.forEach((t=>{try{a.push((0,r.vH)(t.id,t.content))}catch(a){(0,i.um)(`Skipped creating annotation #${t.id} from payload because an error occurred while deserializing.`,t.content),(0,i.um)(a)}}))}));s.size>0&&((0,h.k)(this.annotationCallbacks),this.annotationCallbacks.createAnnotations(s,(0,o.D5)(),c.y))}catch(a){this._handleError(a,"annotations")}}async loadBookmarks(){if(this._verifyLoaded(),this.state.loadBookmarksPromise)await this.state.loadBookmarksPromise;else try{const a=this._request("/bookmarks","GET").then((a=>a.json())).then((a=>a.data)).catch((a=>{throw a}));this.state=this.state.set("loadBookmarksPromise",a);const t=await a;this.state=this.state.set("loadBookmarksPromise",Promise.resolve()),(0,h.k)(Array.isArray(t.bookmarks),"Unexpected reply from bookmarks endpoint.");const e=(0,o.aV)().withMutations((a=>{t.bookmarks.forEach((t=>{try{a.push((0,n.i)(t.id,t.content))}catch(a){(0,i.um)(`Skipped creating bookmark #${t.id} from payload because an error occurred while deserializing.`,t),(0,i.um)(a)}}))}));e.size>0&&((0,h.k)(this.bookmarkCallbacks),this.bookmarkCallbacks.createBookmarks(e,c.y))}catch(a){this._handleError(a,"bookmarks")}}async syncChanges(){}async _initializeFormFieldValues(){const a=await this._request("/form-field-values","GET"),t=await a.json();(0,h.k)(Array.isArray(t.formFieldValues),"Unexpected reply from form-values endpoint.");const e=(0,o.aV)(t.formFieldValues.map((({content:a})=>{try{return(0,r.u9)(a)}catch(t){return(0,i.um)(`Skipped form field value ${a.name} from payload because an error occurred while deserializing.`,a),(0,i.um)(t),null}})).filter(Boolean));(0,h.k)(this.formFieldValueCallbacks),this.state.ignoredFormFieldNames&&this.state.ignoredFormFieldNames.size?this.formFieldValueCallbacks.setFormFieldValues(e.filter((a=>{var t;return!(null!==(t=this.state.ignoredFormFieldNames)&&void 0!==t&&t.includes(a.name))}))):this.formFieldValueCallbacks.setFormFieldValues(e)}_handleError(a,t){(0,i.vU)(`Loading or updating ${t} failed:\n\n${a.message}`)}_request(a,t,e){(0,h.k)(null!=this.state.authPayload,"Cannot call request without authPayload");const s=e instanceof FormData||"object"!=typeof e?null:{"Content-Type":"application/json"},o={"X-PSPDFKit-Token":this.state.authPayload.token,"PSPDFKit-Platform":"web","PSPDFKit-Version":"protocol=4, client=2022.1.1, client-git=152f6f16e9",...s};return fetch(`${this.state.serverURL}${a}`,{method:t,headers:o,body:e instanceof FormData?e:"object"==typeof e?JSON.stringify(e):void 0,credentials:"include"})}_verifyLoaded(){if(!this.state.isLoaded)throw new Error("not loaded")}setIgnoredFormFieldNames(a){this.state=this.state.set("ignoredFormFieldNames",a)}}}}]);