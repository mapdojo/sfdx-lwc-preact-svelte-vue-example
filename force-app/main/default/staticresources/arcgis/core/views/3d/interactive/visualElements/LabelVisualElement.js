/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import t from"../../../../Color.js";import e from"../../../../core/Handles.js";import{isSome as o}from"../../../../core/maybe.js";import{watch as i}from"../../../../core/reactiveUtils.js";import{createRenderScreenPointArray as s,createRenderScreenPointArray3 as r,createScreenPointArray as a}from"../../../../core/screenUtils.js";import{j as n,s as h,b as c,n as l,f as m,i as _,a as u}from"../../../../chunks/vec2.js";import{a as d}from"../../../../chunks/vec3.js";import{c as p}from"../../../../chunks/vec3f64.js";import{VisualElement as x}from"./VisualElement.js";import{renderScreenSpaceTangent as b}from"../../../interactive/support/viewUtils.js";import f from"../../../overlay/LineOverlayItem.js";import v from"../../../overlay/TextOverlayItem.js";class g extends x{constructor(o){super(o.view),this._handles=new e,this._textItem=null,this._calloutItem=null,this._showCallout=!0,this._showText=!0,this._geometry=null,this._text="-",this._fontSize=14,this._backgroundColor=new t([0,0,0,.6]),this._textColor=new t([255,255,255]),this._distance=25,this._anchor="right",this.updatePositionOnCameraMove=!0,this.applyProps(o)}get geometry(){return this._geometry}set geometry(t){this._geometry=t,this.updateLabelPosition()}get textItem(){return this._textItem}get text(){return this._text}set text(t){this._text=t,this.attached&&(this._textItem.text=this._text)}get fontSize(){return this._fontSize}set fontSize(t){this._fontSize=t,this.attached&&(this._textItem.fontSize=this._fontSize)}get backgroundColor(){return this._backgroundColor}set backgroundColor(t){this._backgroundColor=t,this.attached&&(this._textItem.backgroundColor=this._backgroundColor)}get textColor(){return this._textColor}set textColor(t){this._textColor=t,this.attached&&(this._textItem.textColor=this._textColor)}get distance(){return this._distance}set distance(t){this._distance!==t&&(this._distance=t,this.updateLabelPosition())}get anchor(){return this._anchor}set anchor(t){this._anchor!==t&&(this._anchor=t,this.updateLabelPosition())}overlaps(t){return!!this.attached&&(this.textItem.visible&&t.textItem.visible&&!!this.view.overlay?.overlaps(this._textItem,t.textItem))}updateLabelPosition(){if(!this.attached)return;this._showText=!1,this._showCallout=!1;const{geometry:t,view:e,visible:i}=this;if(o(t)&&e._stage)switch(t.type){case"point":if(!this._computeLabelPositionFromPoint(t.point,R))break;if(t.callout){const o=e.state.camera,i=t.callout.distance;n(L,L,[0,t.callout.offset]),o.renderToScreen(L,R),h(T,0,1),c(T,T,i*o.pixelRatio),n(T,T,L),o.renderToScreen(T,z),this._showCallout=this._updatePosition(R,z)}else this._textItem.position=[R[0],R[1]],this._textItem.anchor="center";this._showText=!0;break;case"corner":if(!this._computeLabelPositionFromCorner(t,this._distance,R,z))break;this._showCallout=this._updatePosition(R,z),this._showText=!0;break;case"segment":{if(!this._computeLabelPositionFromSegment(t,this._distance,this._anchor,R,z))break;this._showText=!0;const e=this._updatePosition(R,z);this._showCallout=!1!==t.callout&&e,this._showCallout||(this._textItem.anchor="center")}}this.updateVisibility(i)}_computeLabelPositionFromPoint(t,e){const o=this.view.state.camera;return o.projectToRenderScreen(t,L),!(L[2]<0||L[2]>1)&&(o.renderToScreen(L,e),!0)}_computeLabelPositionFromCorner(t,e,o,i){if(!t)return!1;const s=this.view.state.camera;return w(t.left,1,s,k),l(k,k),w(t.right,0,s,P),n(T,k,P),l(T,T),m(T,T),s.projectToRenderScreen(t.left.endRenderSpace,L),!(L[2]<0||L[2]>1)&&(s.renderToScreen(L,o),c(T,T,e*s.pixelRatio),n(T,T,L),s.renderToScreen(T,i),!0)}_computeLabelPositionFromSegment(t,e,o,i,s){if(!t)return!1;const r=t.segment,a=this.view.state.camera;b(r.startRenderSpace,r.endRenderSpace,a,k),h(T,-k[1],k[0]);let m=!1;switch(o){case"top":m=T[1]<0;break;case"bottom":m=T[1]>0;break;case"left":m=T[0]>0;break;case"right":m=T[0]<0}if(m&&l(T,T),0===_(T))switch(o){case"top":T[1]=1;break;case"bottom":T[1]=-1;break;case"left":T[0]=-1;break;case"right":T[0]=1}return r.eval(V[t.sampleLocation],j),a.projectToRenderScreen(j,L),!(L[2]<0||L[2]>1)&&(a.renderToScreen(L,i),c(T,T,e*a.pixelRatio),n(T,T,L),a.renderToScreen(T,s),!0)}_updatePosition(t,e){if(e){const o=e[0]-t[0],i=e[1]-t[1];return this._textItem.position=[e[0],e[1]],this._textItem.anchor=Math.abs(o)>Math.abs(i)?o>0?"left":"right":i>0?"top":"bottom",this._calloutItem.startPosition=[t[0],t[1]],this._calloutItem.endPosition=[e[0],e[1]],!0}return this._textItem.position=[t[0],t[1]],this._textItem.anchor="center",!1}createResources(){this._textItem=new v({visible:!0,text:this._text,fontSize:this._fontSize,backgroundColor:this._backgroundColor,textColor:this._textColor}),this._calloutItem=new f({visible:!0,width:2}),this.updateLabelPosition(),this.view.overlay?.items.addMany([this._textItem,this._calloutItem]),this.updatePositionOnCameraMove&&this._handles.add(i((()=>this.view.state.camera),(()=>this.updateLabelPosition())))}destroyResources(){this.view.overlay&&!this.view.overlay.destroyed&&this.view.overlay.items.removeMany([this._textItem,this._calloutItem]),this._handles.removeAll()}updateVisibility(t){this._textItem.visible=this._showText&&t,this._calloutItem.visible=this._showCallout&&t}}function w(t,e,o,i){t.eval(e,C,y),d(S,C,y),o.projectToRenderScreen(C,F),o.projectToRenderScreen(S,O),u(i,U,M),m(i,i)}function I(t){switch(t){case"top":return"bottom";case"right":return"left";case"bottom":return"top";case"left":return"right"}}const C=p(),S=p(),y=p(),k=s(),P=s(),T=s(),j=p(),L=r(),R=a(),z=a(),F=r(),M=F,O=r(),U=O,V={start:0,center:.5,end:1};export{g as LabelVisualElement,I as mirrorPosition,w as screenSpaceTangent};