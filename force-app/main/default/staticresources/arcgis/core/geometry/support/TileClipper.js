/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
const i=512;var t,s;!function(i){i[i.Unknown=0]="Unknown",i[i.Point=1]="Point",i[i.LineString=2]="LineString",i[i.Polygon=3]="Polygon"}(t||(t={}));class h{constructor(i,t){this.x=i,this.y=t}clone(){return new h(this.x,this.y)}equals(i,t){return i===this.x&&t===this.y}isEqual(i){return i.x===this.x&&i.y===this.y}setCoords(i,t){this.x=i,this.y=t}normalize(){const i=this.x,t=this.y,s=Math.sqrt(i*i+t*t);this.x/=s,this.y/=s}rightPerpendicular(){const i=this.x;this.x=this.y,this.y=-i}move(i,t){this.x+=i,this.y+=t}assign(i){this.x=i.x,this.y=i.y}assignAdd(i,t){this.x=i.x+t.x,this.y=i.y+t.y}assignSub(i,t){this.x=i.x-t.x,this.y=i.y-t.y}rotate(i,t){const s=this.x,h=this.y;this.x=s*i-h*t,this.y=s*t+h*i}scale(i){this.x*=i,this.y*=i}length(){const i=this.x,t=this.y;return Math.sqrt(i*i+t*t)}static distance(i,t){const s=t.x-i.x,h=t.y-i.y;return Math.sqrt(s*s+h*h)}static add(i,t){return new h(i.x+t.x,i.y+t.y)}static sub(i,t){return new h(i.x-t.x,i.y-t.y)}}class n{constructor(i,t,s){this.ratio=i,this.x=t,this.y=s}}class e{constructor(t,s,h,n=8,e=8){this._lines=[],this._starts=[],this.validateTessellation=!0,this._pixelRatio=n,this._pixelMargin=e,this._tileSize=i*n,this._dz=t,this._yPos=s,this._xPos=h}setPixelMargin(i){i!==this._pixelMargin&&(this._pixelMargin=i,this.setExtent(this._extent))}setExtent(i){this._extent=i,this._finalRatio=this._tileSize/i*(1<<this._dz);let t=this._pixelRatio*this._pixelMargin;t/=this._finalRatio;const s=i>>this._dz;t>s&&(t=s),this._margin=t,this._xmin=s*this._xPos-t,this._ymin=s*this._yPos-t,this._xmax=this._xmin+s+2*t,this._ymax=this._ymin+s+2*t}reset(i){this._type=i,this._lines=[],this._starts=[],this._line=null,this._start=0}moveTo(i,t){this._pushLine(),this._prevIsIn=this._isIn(i,t),this._moveTo(i,t,this._prevIsIn),this._prevPt=new h(i,t),this._firstPt=new h(i,t),this._dist=0}lineTo(i,t){const s=this._isIn(i,t),e=new h(i,t),_=h.distance(this._prevPt,e);let l,x,a,y,o,r,m,u;if(s)this._prevIsIn?this._lineTo(i,t,!0):(l=this._prevPt,x=e,a=this._intersect(x,l),this._start=this._dist+_*(1-this._r),this._lineTo(a.x,a.y,!0),this._lineTo(x.x,x.y,!0));else if(this._prevIsIn)x=this._prevPt,l=e,a=this._intersect(x,l),this._lineTo(a.x,a.y,!0),this._lineTo(l.x,l.y,!1);else{const i=this._prevPt,t=e;if(i.x<=this._xmin&&t.x<=this._xmin||i.x>=this._xmax&&t.x>=this._xmax||i.y<=this._ymin&&t.y<=this._ymin||i.y>=this._ymax&&t.y>=this._ymax)this._lineTo(t.x,t.y,!1);else{const s=[];if((i.x<this._xmin&&t.x>this._xmin||i.x>this._xmin&&t.x<this._xmin)&&(y=(this._xmin-i.x)/(t.x-i.x),u=i.y+y*(t.y-i.y),u<=this._ymin?r=!1:u>=this._ymax?r=!0:s.push(new n(y,this._xmin,u))),(i.x<this._xmax&&t.x>this._xmax||i.x>this._xmax&&t.x<this._xmax)&&(y=(this._xmax-i.x)/(t.x-i.x),u=i.y+y*(t.y-i.y),u<=this._ymin?r=!1:u>=this._ymax?r=!0:s.push(new n(y,this._xmax,u))),(i.y<this._ymin&&t.y>this._ymin||i.y>this._ymin&&t.y<this._ymin)&&(y=(this._ymin-i.y)/(t.y-i.y),m=i.x+y*(t.x-i.x),m<=this._xmin?o=!1:m>=this._xmax?o=!0:s.push(new n(y,m,this._ymin))),(i.y<this._ymax&&t.y>this._ymax||i.y>this._ymax&&t.y<this._ymax)&&(y=(this._ymax-i.y)/(t.y-i.y),m=i.x+y*(t.x-i.x),m<=this._xmin?o=!1:m>=this._xmax?o=!0:s.push(new n(y,m,this._ymax))),0===s.length)o?r?this._lineTo(this._xmax,this._ymax,!0):this._lineTo(this._xmax,this._ymin,!0):r?this._lineTo(this._xmin,this._ymax,!0):this._lineTo(this._xmin,this._ymin,!0);else if(s.length>1&&s[0].ratio>s[1].ratio)this._start=this._dist+_*s[1].ratio,this._lineTo(s[1].x,s[1].y,!0),this._lineTo(s[0].x,s[0].y,!0);else{this._start=this._dist+_*s[0].ratio;for(let i=0;i<s.length;i++)this._lineTo(s[i].x,s[i].y,!0)}this._lineTo(t.x,t.y,!1)}}this._dist+=_,this._prevIsIn=s,this._prevPt=e}close(){if(this._line.length>2){const i=this._firstPt,t=this._prevPt;i.x===t.x&&i.y===t.y||this.lineTo(i.x,i.y);const s=this._line;let h=s.length;for(;h>=4&&(s[0].x===s[1].x&&s[0].x===s[h-2].x||s[0].y===s[1].y&&s[0].y===s[h-2].y);)s.pop(),s[0].x=s[h-2].x,s[0].y=s[h-2].y,--h}}result(i=!0){return this._pushLine(),0===this._lines.length?null:(this._type===t.Polygon&&i&&l.simplify(this._tileSize,this._margin*this._finalRatio,this._lines),this._lines)}resultWithStarts(){if(this._type!==t.LineString)throw new Error("Only valid for lines");this._pushLine();const i=this._lines,s=i.length;if(0===s)return null;const h=[];for(let t=0;t<s;t++)h.push({line:i[t],start:this._starts[t]||0});return h}_isIn(i,t){return i>=this._xmin&&i<=this._xmax&&t>=this._ymin&&t<=this._ymax}_intersect(i,t){let s,n,e;if(t.x>=this._xmin&&t.x<=this._xmax)n=t.y<=this._ymin?this._ymin:this._ymax,e=(n-i.y)/(t.y-i.y),s=i.x+e*(t.x-i.x);else if(t.y>=this._ymin&&t.y<=this._ymax)s=t.x<=this._xmin?this._xmin:this._xmax,e=(s-i.x)/(t.x-i.x),n=i.y+e*(t.y-i.y);else{n=t.y<=this._ymin?this._ymin:this._ymax,s=t.x<=this._xmin?this._xmin:this._xmax;const h=(s-i.x)/(t.x-i.x),_=(n-i.y)/(t.y-i.y);h<_?(e=h,n=i.y+h*(t.y-i.y)):(e=_,s=i.x+_*(t.x-i.x))}return this._r=e,new h(s,n)}_pushLine(){this._line&&(this._type===t.Point?this._line.length>0&&(this._lines.push(this._line),this._starts.push(this._start)):this._type===t.LineString?this._line.length>1&&(this._lines.push(this._line),this._starts.push(this._start)):this._type===t.Polygon&&this._line.length>3&&(this._lines.push(this._line),this._starts.push(this._start))),this._line=[],this._start=0}_moveTo(i,s,n){this._type!==t.Polygon?n&&(i=Math.round((i-(this._xmin+this._margin))*this._finalRatio),s=Math.round((s-(this._ymin+this._margin))*this._finalRatio),this._line.push(new h(i,s))):(n||(i<this._xmin&&(i=this._xmin),i>this._xmax&&(i=this._xmax),s<this._ymin&&(s=this._ymin),s>this._ymax&&(s=this._ymax)),i=Math.round((i-(this._xmin+this._margin))*this._finalRatio),s=Math.round((s-(this._ymin+this._margin))*this._finalRatio),this._line.push(new h(i,s)),this._isH=!1,this._isV=!1)}_lineTo(i,s,n){let e,_;if(this._type!==t.Polygon)if(n){if(i=Math.round((i-(this._xmin+this._margin))*this._finalRatio),s=Math.round((s-(this._ymin+this._margin))*this._finalRatio),this._line.length>0&&(e=this._line[this._line.length-1],e.equals(i,s)))return;this._line.push(new h(i,s))}else this._line&&this._line.length>0&&this._pushLine();else if(n||(i<this._xmin&&(i=this._xmin),i>this._xmax&&(i=this._xmax),s<this._ymin&&(s=this._ymin),s>this._ymax&&(s=this._ymax)),i=Math.round((i-(this._xmin+this._margin))*this._finalRatio),s=Math.round((s-(this._ymin+this._margin))*this._finalRatio),this._line&&this._line.length>0){e=this._line[this._line.length-1];const t=e.x===i,n=e.y===s;if(t&&n)return;this._isH&&t||this._isV&&n?(e.x=i,e.y=s,_=this._line[this._line.length-2],_.x===i&&_.y===s?(this._line.pop(),this._line.length<=1?(this._isH=!1,this._isV=!1):(_=this._line[this._line.length-2],this._isH=_.x===i,this._isV=_.y===s)):(this._isH=_.x===i,this._isV=_.y===s)):(this._line.push(new h(i,s)),this._isH=t,this._isV=n)}else this._line.push(new h(i,s))}}class _{setExtent(i){this._ratio=4096===i?1:4096/i}get validateTessellation(){return this._ratio<1}reset(i){this._lines=[],this._line=null}moveTo(i,t){this._line&&this._lines.push(this._line),this._line=[];const s=this._ratio;this._line.push(new h(i*s,t*s))}lineTo(i,t){const s=this._ratio;this._line.push(new h(i*s,t*s))}close(){const i=this._line;i&&!i[0].isEqual(i[i.length-1])&&i.push(i[0])}result(){return this._line&&this._lines.push(this._line),0===this._lines.length?null:this._lines}}!function(i){i[i.sideLeft=0]="sideLeft",i[i.sideRight=1]="sideRight",i[i.sideTop=2]="sideTop",i[i.sideBottom=3]="sideBottom"}(s||(s={}));class l{static simplify(i,t,h){if(!h)return;const n=-t,e=i+t,_=-t,x=i+t,a=[],y=[],o=h.length;for(let l=0;l<o;++l){const i=h[l];if(!i||i.length<2)continue;let t,o=i[0];const r=i.length;for(let h=1;h<r;++h)t=i[h],o.x===t.x&&(o.x<=n&&(o.y>t.y?(a.push(l),a.push(h),a.push(s.sideLeft),a.push(-1)):(y.push(l),y.push(h),y.push(s.sideLeft),y.push(-1))),o.x>=e&&(o.y<t.y?(a.push(l),a.push(h),a.push(s.sideRight),a.push(-1)):(y.push(l),y.push(h),y.push(s.sideRight),y.push(-1)))),o.y===t.y&&(o.y<=_&&(o.x<t.x?(a.push(l),a.push(h),a.push(s.sideTop),a.push(-1)):(y.push(l),y.push(h),y.push(s.sideTop),y.push(-1))),o.y>=x&&(o.x>t.x?(a.push(l),a.push(h),a.push(s.sideBottom),a.push(-1)):(y.push(l),y.push(h),y.push(s.sideBottom),y.push(-1)))),o=t}if(0===a.length||0===y.length)return;l.fillParent(h,y,a),l.fillParent(h,a,y);const r=[];l.calcDeltas(r,y,a),l.calcDeltas(r,a,y),l.addDeltas(r,h)}static fillParent(i,t,h){const n=h.length,e=t.length;for(let _=0;_<e;_+=4){const e=t[_],l=t[_+1],a=t[_+2],y=i[e][l-1],o=i[e][l];let r=8092,m=-1;for(let t=0;t<n;t+=4){if(h[t+2]!==a)continue;const n=h[t],e=h[t+1],_=i[n][e-1],l=i[n][e];switch(a){case s.sideLeft:case s.sideRight:if(x(y.y,_.y,l.y)&&x(o.y,_.y,l.y)){const i=Math.abs(l.y-_.y);i<r&&(r=i,m=t)}break;case s.sideTop:case s.sideBottom:if(x(y.x,_.x,l.x)&&x(o.x,_.x,l.x)){const i=Math.abs(l.x-_.x);i<r&&(r=i,m=t)}}}t[_+3]=m}}static calcDeltas(i,t,s){const h=t.length;for(let n=0;n<h;n+=4){const h=[],e=l.calcDelta(n,t,s,h);i.push(t[n]),i.push(t[n+1]),i.push(t[n+2]),i.push(e)}}static calcDelta(i,t,s,h){const n=t[i+3];if(-1===n)return 0;const e=h.length;return e>1&&h[e-2]===n?0:(h.push(n),l.calcDelta(n,s,t,h)+1)}static addDeltas(i,t){const h=i.length;let n=0;for(let s=0;s<h;s+=4){const t=i[s+3];t>n&&(n=t)}for(let e=0;e<h;e+=4){const h=t[i[e]],_=i[e+1],l=n-i[e+3];switch(i[e+2]){case s.sideLeft:h[_-1].x-=l,h[_].x-=l,1===_&&(h[h.length-1].x-=l),_===h.length-1&&(h[0].x-=l);break;case s.sideRight:h[_-1].x+=l,h[_].x+=l,1===_&&(h[h.length-1].x+=l),_===h.length-1&&(h[0].x+=l);break;case s.sideTop:h[_-1].y-=l,h[_].y-=l,1===_&&(h[h.length-1].y-=l),_===h.length-1&&(h[0].y-=l);break;case s.sideBottom:h[_-1].y+=l,h[_].y+=l,1===_&&(h[h.length-1].y+=l),_===h.length-1&&(h[0].y+=l)}}}}const x=(i,t,s)=>i>=t&&i<=s||i>=s&&i<=t;export{t as GeometryType,h as Point,_ as SimpleBuilder,e as TileClipper};