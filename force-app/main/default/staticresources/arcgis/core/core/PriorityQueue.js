/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
class t{constructor(t=e){this._data=[],this._compare=t}get size(){return this._data.length}enqueue(t){if(null==t)return;const{_data:e,_compare:n}=this;e.push(t);let l=e.length-1>>>0;const r=e[l];for(;l>0;){const t=l-1>>1,s=e[t];if(!(n(s,r)<=0))break;e[t]=r,e[l]=s,l=t}}dequeue(){const{_data:t,_compare:e}=this,n=t[0],l=t.pop();if(0===t.length)return n;t[0]=l;let r=0;const s=t.length,u=t[0];let a,o,c=null;for(;;){const n=2*r+1,l=2*r+2;if(c=null,n<s&&(a=t[n],e(a,u)>0&&(c=n)),l<s&&(o=t[l],(null===c&&e(o,u)<=0||null!==c&&e(o,a)<=0)&&(c=l)),null===c)break;t[r]=t[c],t[c]=u,r=c}return n}}const e=(t,e)=>t<e?-1:t>e?1:0;export{t as default};