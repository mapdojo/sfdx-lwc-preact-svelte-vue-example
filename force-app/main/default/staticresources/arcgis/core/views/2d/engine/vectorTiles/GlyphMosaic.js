/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import t from"./RectangleBinPack.js";import e from"../webgl/Rect.js";import{PixelFormat as i,PixelType as s}from"../../../webgl/enums.js";import{Texture as h}from"../../../webgl/Texture.js";class r{constructor(e,i,s){this.width=0,this.height=0,this._dirties=[],this._glyphData=[],this._currentPage=0,this._glyphIndex={},this._textures=[],this._rangePromises=new Map,this.width=e,this.height=i,this._glyphSource=s,this._binPack=new t(e-4,i-4),this._glyphData.push(new Uint8Array(e*i)),this._dirties.push(!0),this._textures.push(void 0)}getGlyphItems(i,s){const h=[],r=this._glyphSource,n=new Set,a=1/256;for(const t of s){const e=Math.floor(t*a);n.add(e)}const o=[];return n.forEach((t=>{if(t<=256){const e=i+t;if(this._rangePromises.has(e))o.push(this._rangePromises.get(e));else{const s=r.getRange(i,t).then((()=>{this._rangePromises.delete(e)}),(()=>{this._rangePromises.delete(e)}));this._rangePromises.set(e,s),o.push(s)}}})),Promise.all(o).then((()=>{let n=this._glyphIndex[i];n||(n={},this._glyphIndex[i]=n);for(const a of s){const s=n[a];if(s){h[a]={sdf:!0,rect:s.rect,metrics:s.metrics,page:s.page,code:a};continue}const o=r.getGlyph(i,a);if(!o||!o.metrics)continue;const l=o.metrics;let c;if(0===l.width)c=new e(0,0,0,0);else{const e=3,i=l.width+2*e,s=l.height+2*e;let h=i%4?4-i%4:4,r=s%4?4-s%4:4;1===h&&(h=5),1===r&&(r=5),c=this._binPack.allocate(i+h,s+r),c.isEmpty&&(this._dirties[this._currentPage]||(this._glyphData[this._currentPage]=null),this._currentPage=this._glyphData.length,this._glyphData.push(new Uint8Array(this.width*this.height)),this._dirties.push(!0),this._textures.push(void 0),this._binPack=new t(this.width-4,this.height-4),c=this._binPack.allocate(i+h,s+r));const n=this._glyphData[this._currentPage],a=o.bitmap;let g,_;if(a)for(let t=0;t<s;t++){g=i*t,_=this.width*(c.y+t+1)+c.x;for(let t=0;t<i;t++)n[_+t+1]=a[g+t]}}n[a]={rect:c,metrics:l,tileIDs:null,page:this._currentPage},h[a]={sdf:!0,rect:c,metrics:l,page:this._currentPage,code:a},this._dirties[this._currentPage]=!0}return h}))}removeGlyphs(t){for(const e in this._glyphIndex){const i=this._glyphIndex[e];if(!i)continue;let s;for(const e in i)if(s=i[e],s.tileIDs.delete(t),0===s.tileIDs.size){const t=this._glyphData[s.page],h=s.rect;let r,n;for(let e=0;e<h.height;e++)for(r=this.width*(h.y+e)+h.x,n=0;n<h.width;n++)t[r+n]=0;delete i[e],this._dirties[s.page]=!0}}}bind(t,e,r,n=0){this._textures[r]||(this._textures[r]=new h(t,{pixelFormat:i.ALPHA,dataType:s.UNSIGNED_BYTE,width:this.width,height:this.height},new Uint8Array(this.width*this.height)));const a=this._textures[r];a.setSamplingMode(e),this._dirties[r]&&a.setData(this._glyphData[r]),t.bindTexture(a,n),this._dirties[r]=!1}dispose(){this._binPack=null;for(const t of this._textures)t&&t.dispose();this._textures.length=0}}export{r as default};