/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import t from"../../../../../Color.js";import{toLCH as e,toRGB as r,toLAB as s}from"../../../../../core/colorUtils.js";import{GeometryType as n}from"../../../../../geometry/support/TileClipper.js";import{unitBezier as a}from"../../../unitBezier.js";import{interpolate as o}from"../GeometryUtils.js";import{ValueType as i,StringType as l,ObjectType as u,NumberType as c,BooleanType as h,ColorType as p,typeToString as g,arrayType as f,getType as w,matchType as m,valueToString as y}from"./types.js";class _{constructor(t){this._parent=t,this._vars={}}add(t,e){this._vars[t]=e}get(t){return this._vars[t]?this._vars[t]:this._parent?this._parent.get(t):null}}class v{constructor(){this.type=i}static parse(t){if(t.length>1)throw new Error('"id" does not expect arguments');return new v}evaluate(t,e){return t?.id}}class b{constructor(){this.type=l}static parse(t){if(t.length>1)throw new Error('"geometry-type" does not expect arguments');return new b}evaluate(t,e){if(!t)return null;switch(t.type){case n.Point:return"Point";case n.LineString:return"LineString";case n.Polygon:return"Polygon";default:return null}}}class d{constructor(){this.type=u}static parse(t){if(t.length>1)throw new Error('"properties" does not expect arguments');return new d}evaluate(t,e){return t?.values}}class x{constructor(){this.type=c}static parse(t){if(t.length>1)throw new Error('"zoom" does not expect arguments');return new x}evaluate(t,e){return e}}class E{constructor(t,e,r){this._lhs=t,this._rhs=e,this._compare=r,this.type=h}static parse(t,e,r){if(3!==t.length&&4!==t.length)throw new Error(`"${t[0]}" expects 2 or 3 arguments`);if(4===t.length)throw new Error(`"${t[0]}" collator not supported`);return new E(pt(t[1],e),pt(t[2],e),r)}evaluate(t,e){return this._compare(this._lhs.evaluate(t,e),this._rhs.evaluate(t,e))}}class $ extends E{static parse(t,e){return E.parse(t,e,((t,e)=>t===e))}}class M extends E{static parse(t,e){return E.parse(t,e,((t,e)=>t!==e))}}class k extends E{static parse(t,e){return E.parse(t,e,((t,e)=>t<e))}}class A extends E{static parse(t,e){return E.parse(t,e,((t,e)=>t<=e))}}class j extends E{static parse(t,e){return E.parse(t,e,((t,e)=>t>e))}}class q extends E{static parse(t,e){return E.parse(t,e,((t,e)=>t>=e))}}class N{constructor(t){this._arg=t,this.type=h}static parse(t,e){if(2!==t.length)throw new Error('"!" expects 1 argument');return new N(pt(t[1],e))}evaluate(t,e){return!this._arg.evaluate(t,e)}}class C{constructor(t){this._args=t,this.type=h}static parse(t,e){const r=[];for(let s=1;s<t.length;s++)r.push(pt(t[s],e));return new C(r)}evaluate(t,e){for(const r of this._args)if(!r.evaluate(t,e))return!1;return!0}}class R{constructor(t){this._args=t,this.type=h}static parse(t,e){const r=[];for(let s=1;s<t.length;s++)r.push(pt(t[s],e));return new R(r)}evaluate(t,e){for(const r of this._args)if(r.evaluate(t,e))return!0;return!1}}class z{constructor(t){this._args=t,this.type=h}static parse(t,e){const r=[];for(let s=1;s<t.length;s++)r.push(pt(t[s],e));return new z(r)}evaluate(t,e){for(const r of this._args)if(r.evaluate(t,e))return!1;return!0}}class I{constructor(t,e,r){this.type=t,this._args=e,this._fallback=r}static parse(t,e,r){if(t.length<4)throw new Error('"case" expects at least 3 arguments');if(t.length%2==1)throw new Error('"case" expects an odd number of arguments');let s;const n=[];for(let o=1;o<t.length-1;o+=2){const a=pt(t[o],e),i=pt(t[o+1],e,r);s||(s=i.type),n.push({condition:a,output:i})}const a=pt(t[t.length-1],e,r);return s||(s=a.type),new I(s,n,a)}evaluate(t,e){for(const r of this._args)if(r.condition.evaluate(t,e))return r.output.evaluate(t,e);return this._fallback.evaluate(t,e)}}class L{constructor(t,e){this.type=t,this._args=e}static parse(t,e){if(t.length<2)throw new Error('"coalesce" expects at least 1 argument');let r;const s=[];for(let n=1;n<t.length;n++){const a=pt(t[n],e);r||(r=a.type),s.push(a)}return new L(r,s)}evaluate(t,e){for(const r of this._args){const s=r.evaluate(t,e);if(null!==s)return s}return null}}class U{constructor(t,e,r,s,n){this.type=t,this._input=e,this._labels=r,this._outputs=s,this._fallback=n}static parse(t,e){if(t.length<3)throw new Error('"match" expects at least 3 arguments');if(t.length%2==0)throw new Error('"case" expects an even number of arguments');let r;const s=pt(t[1],e),n=[],a={};let o;for(let i=2;i<t.length-1;i+=2){let s=t[i];Array.isArray(s)||(s=[s]);for(const t of s){const e=typeof t;if("string"!==e&&"number"!==e)throw new Error('"match" requires string or number literal as labels');if(o){if(e!==o)throw new Error('"match" requires labels to have the same type')}else o=e;a[t]=n.length}const l=pt(t[i+1],e);r||(r=l.type),n.push(l)}return new U(r,s,a,n,pt(t[t.length-1],e))}evaluate(t,e){const r=this._input.evaluate(t,e);return(this._outputs[this._labels[r]]||this._fallback).evaluate(t,e)}}class P{constructor(t,e,r,s,n){this._operator=t,this.type=e,this.interpolation=r,this.input=s,this._stops=n}static parse(t,e,r){const s=t[0];if(t.length<5)throw new Error(`"${s}" expects at least 4 arguments`);const n=t[1];if(!Array.isArray(n)||0===n.length)throw new Error(`"${n}" is not a valid interpolation`);switch(n[0]){case"linear":if(1!==n.length)throw new Error("Linear interpolation cannot have parameters");break;case"exponential":if(2!==n.length||"number"!=typeof n[1])throw new Error("Exponential interpolation requires one numeric argument");break;case"cubic-bezier":if(5!==n.length)throw new Error("Cubic bezier interpolation requires four numeric arguments with values between 0 and 1");for(let t=1;t<5;t++){const e=n[t];if("number"!=typeof e||e<0||e>1)throw new Error("Cubic bezier interpolation requires four numeric arguments with values between 0 and 1")}break;default:throw new Error(`"${t[0]}" unknown interpolation type "${n[0]}"`)}if(t.length%2!=1)throw new Error(`"${s}" expects an even number of arguments`);const a=pt(t[2],e,c);let o;"interpolate-hcl"===s||"interpolate-lab"===s?o=p:r&&"value"!==r.kind&&(o=r);const i=[];for(let l=3;l<t.length;l+=2){const r=t[l];if("number"!=typeof r)throw new Error(`"${s}" requires stop inputs as literal numbers`);if(i.length&&i[i.length-1][0]>=r)throw new Error(`"${s}" requires strictly ascending stop inputs`);const n=pt(t[l+1],e,o);o||(o=n.type),i.push([r,n])}if(o&&o!==p&&o!==c&&("array"!==o.kind||o.itemType!==c))throw new Error(`"${s}" cannot interpolate type ${g(o)}`);return new P(s,o,n,a,i)}evaluate(n,a){const i=this._stops;if(1===i.length)return i[0][1].evaluate(n,a);const l=this.input.evaluate(n,a);if(l<=i[0][0])return i[0][1].evaluate(n,a);if(l>=i[i.length-1][0])return i[i.length-1][1].evaluate(n,a);let u=0;for(;++u<i.length&&!(l<i[u][0]););const c=i[u-1][0],h=i[u][0],p=P.interpolationRatio(this.interpolation,l,c,h),f=i[u-1][1].evaluate(n,a),w=i[u][1].evaluate(n,a);if("interpolate"===this._operator){if("array"===this.type.kind&&Array.isArray(f)&&Array.isArray(w))return f.map(((t,e)=>o(t,w[e],p)));if("color"===this.type.kind&&f instanceof t&&w instanceof t){const e=new t(f),r=new t(w);return new t([o(e.r,r.r,p),o(e.g,r.g,p),o(e.b,r.b,p),o(e.a,r.a,p)])}if("number"===this.type.kind&&"number"==typeof f&&"number"==typeof w)return o(f,w,p);throw new Error(`"${this._operator}" cannot interpolate type ${g(this.type)}`)}if("interpolate-hcl"===this._operator){const s=e(f),n=e(w),a=n.h-s.h,i=r({h:s.h+p*(a>180||a<-180?a-360*Math.round(a/360):a),c:o(s.c,n.c,p),l:o(s.l,n.l,p)});return new t({a:o(f.a,w.a,p),...i})}if("interpolate-lab"===this._operator){const e=s(f),n=s(w),a=r({l:o(e.l,n.l,p),a:o(e.a,n.a,p),b:o(e.b,n.b,p)});return new t({a:o(f.a,w.a,p),...a})}throw new Error(`Unexpected operator "${this._operator}"`)}interpolationUniformValue(t,e){const r=this._stops;if(1===r.length)return 0;if(t>=r[r.length-1][0])return 0;let s=0;for(;++s<r.length&&!(t<r[s][0]););const n=r[s-1][0],a=r[s][0];return P.interpolationRatio(this.interpolation,e,n,a)}getInterpolationRange(t){const e=this._stops;if(1===e.length){const t=e[0][0];return[t,t]}const r=e[e.length-1][0];if(t>=r)return[r,r];let s=0;for(;++s<e.length&&!(t<e[s][0]););return[e[s-1][0],e[s][0]]}static interpolationRatio(t,e,r,s){let n=0;if("linear"===t[0])n=P._exponentialInterpolationRatio(e,1,r,s);else if("exponential"===t[0])n=P._exponentialInterpolationRatio(e,t[1],r,s);else if("cubic-bezier"===t[0]){n=a(t[1],t[2],t[3],t[4])(P._exponentialInterpolationRatio(e,1,r,s),1e-5)}return n<0?n=0:n>1&&(n=1),n}static _exponentialInterpolationRatio(t,e,r,s){const n=s-r;if(0===n)return 0;const a=t-r;return 1===e?a/n:(e**a-1)/(e**n-1)}}class S{constructor(t,e,r){this.type=t,this._input=e,this._stops=r}static parse(t,e){if(t.length<5)throw new Error('"step" expects at least 4 arguments');if(t.length%2!=1)throw new Error('"step" expects an even number of arguments');const r=pt(t[1],e,c);let s;const n=[];n.push([-1/0,pt(t[2],e)]);for(let a=3;a<t.length;a+=2){const r=t[a];if("number"!=typeof r)throw new Error('"step" requires stop inputs as literal numbers');if(n.length&&n[n.length-1][0]>=r)throw new Error('"step" requires strictly ascending stop inputs');const o=pt(t[a+1],e);s||(s=o.type),n.push([r,o])}return new S(s,r,n)}evaluate(t,e){const r=this._stops;if(1===r.length)return r[0][1].evaluate(t,e);const s=this._input.evaluate(t,e);let n=0;for(;++n<r.length&&!(s<r[n][0]););return this._stops[n-1][1].evaluate(t,e)}}class B{constructor(t,e){this.type=t,this._output=e}static parse(t,e,r){if(t.length<4)throw new Error('"let" expects at least 3 arguments');if(t.length%2==1)throw new Error('"let" expects an odd number of arguments');const s=new _(e);for(let a=1;a<t.length-1;a+=2){const r=t[a];if("string"!=typeof r)throw new Error(`"let" requires a string to define variable names - found ${r}`);s.add(r,pt(t[a+1],e))}const n=pt(t[t.length-1],s,r);return new B(n.type,n)}evaluate(t,e){return this._output.evaluate(t,e)}}class T{constructor(t,e){this.type=t,this.output=e}static parse(t,e,r){if(2!==t.length||"string"!=typeof t[1])throw new Error('"var" requires just one literal string argument');const s=e.get(t[1]);if(!s)throw new Error(`${t[1]} must be defined before being used in a "var" expression`);return new T(r||i,s)}evaluate(t,e){return this.output.evaluate(t,e)}}class O{constructor(t,e,r){this.type=t,this._index=e,this._array=r}static parse(t,e){if(3!==t.length)throw new Error('"at" expects 2 arguments');const r=pt(t[1],e,c),s=pt(t[2],e);return new O(s.type.itemType,r,s)}evaluate(t,e){const r=this._index.evaluate(t,e),s=this._array.evaluate(t,e);if(r<0||r>=s.length)throw new Error('"at" index out of bounds');if(r!==Math.floor(r))throw new Error('"at" index must be an integer');return s[r]}}class F{constructor(t,e){this._key=t,this._obj=e,this.type=i}static parse(t,e){let r,s;switch(t.length){case 2:return r=pt(t[1],e),new F(r);case 3:return r=pt(t[1],e),s=pt(t[2],e),new F(r,s);default:throw new Error('"get" expects 1 or 2 arguments')}}evaluate(t,e){const r=this._key.evaluate(t,e);if(this._obj){return this._obj.evaluate(t,e)[r]}return t?.values[r]}}class G{constructor(t,e){this._key=t,this._obj=e,this.type=h}static parse(t,e){let r,s;switch(t.length){case 2:return r=pt(t[1],e),new G(r);case 3:return r=pt(t[1],e),s=pt(t[2],e),new G(r,s);default:throw new Error('"has" expects 1 or 2 arguments')}}evaluate(t,e){const r=this._key.evaluate(t,e);if(this._obj){return r in this._obj.evaluate(t,e)}return!!t?.values[r]}}class V{constructor(t,e){this._key=t,this._vals=e,this.type=h}static parse(t,e){if(3!==t.length)throw new Error('"in" expects 2 arguments');return new V(pt(t[1],e),pt(t[2],e))}evaluate(t,e){const r=this._key.evaluate(t,e);return this._vals.evaluate(t,e).includes(r)}}class D{constructor(t,e,r){this._item=t,this._array=e,this._from=r,this.type=c}static parse(t,e){if(t.length<3||t.length>4)throw new Error('"index-of" expects 3 or 4 arguments');const r=pt(t[1],e),s=pt(t[2],e);if(4===t.length){const n=pt(t[3],e,c);return new D(r,s,n)}return new D(r,s)}evaluate(t,e){const r=this._item.evaluate(t,e),s=this._array.evaluate(t,e);if(this._from){const n=this._from.evaluate(t,e);if(n!==Math.floor(n))throw new Error('"index-of" index must be an integer');return s.indexOf(r,n)}return s.indexOf(r)}}class H{constructor(t){this._arg=t,this.type=c}static parse(t,e){if(2!==t.length)throw new Error('"length" expects 2 arguments');const r=pt(t[1],e);return new H(r)}evaluate(t,e){const r=this._arg.evaluate(t,e);if("string"==typeof r)return r.length;if(Array.isArray(r))return r.length;throw new Error('"length" expects string or array')}}class J{constructor(t,e,r,s){this.type=t,this._array=e,this._from=r,this._to=s}static parse(t,e){if(t.length<3||t.length>4)throw new Error('"slice" expects 2 or 3 arguments');const r=pt(t[1],e),s=pt(t[2],e,c);if(s.type!==c)throw new Error('"slice" index must return a number');if(4===t.length){const n=pt(t[3],e,c);if(n.type!==c)throw new Error('"slice" index must return a number');return new J(r.type,r,s,n)}return new J(r.type,r,s)}evaluate(t,e){const r=this._array.evaluate(t,e);if(!Array.isArray(r)&&"string"!=typeof r)throw new Error('"slice" input must be an array or a string');const s=this._from.evaluate(t,e);if(s<0||s>=r.length)throw new Error('"slice" index out of bounds');if(s!==Math.floor(s))throw new Error('"slice" index must be an integer');if(this._to){const n=this._to.evaluate(t,e);if(n<0||n>=r.length)throw new Error('"slice" index out of bounds');if(n!==Math.floor(n))throw new Error('"slice" index must be an integer');return r.slice(s,n)}return r.slice(s)}}class K{constructor(){this.type=h}static parse(t){if(1!==t.length)throw new Error('"has-id" expects no arguments');return new K}evaluate(t,e){return t&&void 0!==t.id}}class Q{constructor(t,e){this._args=t,this._calculate=e,this.type=c}static parse(t,e,r){const s=t.slice(1).map((t=>pt(t,e)));return new Q(s,r)}evaluate(t,e){let r;return this._args&&(r=this._args.map((r=>r.evaluate(t,e)))),this._calculate(r)}}class W extends Q{static parse(t,e){switch(t.length){case 2:return Q.parse(t,e,(t=>-t[0]));case 3:return Q.parse(t,e,(t=>t[0]-t[1]));default:throw new Error('"-" expects 1 or 2 arguments')}}}class X extends Q{static parse(t,e){return Q.parse(t,e,(t=>{let e=1;for(const r of t)e*=r;return e}))}}class Y extends Q{static parse(t,e){if(3===t.length)return Q.parse(t,e,(t=>t[0]/t[1]));throw new Error('"/" expects 2 arguments')}}class Z extends Q{static parse(t,e){if(3===t.length)return Q.parse(t,e,(t=>t[0]%t[1]));throw new Error('"%" expects 2 arguments')}}class tt extends Q{static parse(t,e){if(3===t.length)return Q.parse(t,e,(t=>t[0]**t[1]));throw new Error('"^" expects 1 or 2 arguments')}}class et extends Q{static parse(t,e){return Q.parse(t,e,(t=>{let e=0;for(const r of t)e+=r;return e}))}}class rt{constructor(t,e){this._args=t,this._calculate=e,this.type=c}static parse(t,e){const r=t.slice(1).map((t=>pt(t,e)));return new rt(r,rt.ops[t[0]])}evaluate(t,e){let r;return this._args&&(r=this._args.map((r=>r.evaluate(t,e)))),this._calculate(r)}}rt.ops={abs:t=>Math.abs(t[0]),acos:t=>Math.acos(t[0]),asin:t=>Math.asin(t[0]),atan:t=>Math.atan(t[0]),ceil:t=>Math.ceil(t[0]),cos:t=>Math.cos(t[0]),e:()=>Math.E,floor:t=>Math.floor(t[0]),ln:t=>Math.log(t[0]),ln2:()=>Math.LN2,log10:t=>Math.log(t[0])/Math.LN10,log2:t=>Math.log(t[0])/Math.LN2,max:t=>Math.max(...t),min:t=>Math.min(...t),pi:()=>Math.PI,round:t=>Math.round(t[0]),sin:t=>Math.sin(t[0]),sqrt:t=>Math.sqrt(t[0]),tan:t=>Math.tan(t[0])};class st{constructor(t){this._args=t,this.type=l}static parse(t,e){return new st(t.slice(1).map((t=>pt(t,e))))}evaluate(t,e){return this._args.map((r=>r.evaluate(t,e))).join("")}}class nt{constructor(t,e){this._arg=t,this._calculate=e,this.type=l}static parse(t,e){if(2!==t.length)throw new Error(`${t[0]} expects 1 argument`);const r=pt(t[1],e);return new nt(r,nt.ops[t[0]])}evaluate(t,e){return this._calculate(this._arg.evaluate(t,e))}}nt.ops={downcase:t=>t.toLowerCase(),upcase:t=>t.toUpperCase()};class at{constructor(t){this._args=t,this.type=p}static parse(t,e){if(4!==t.length)throw new Error('"rgb" expects 3 arguments');const r=t.slice(1).map((t=>pt(t,e)));return new at(r)}evaluate(e,r){const s=this._validate(this._args[0].evaluate(e,r)),n=this._validate(this._args[1].evaluate(e,r)),a=this._validate(this._args[2].evaluate(e,r));return new t({r:s,g:n,b:a})}_validate(t){if("number"!=typeof t||t<0||t>255)throw new Error(`${t}: invalid color component`);return Math.round(t)}}class ot{constructor(t){this._args=t,this.type=p}static parse(t,e){if(5!==t.length)throw new Error('"rgba" expects 4 arguments');const r=t.slice(1).map((t=>pt(t,e)));return new ot(r)}evaluate(e,r){const s=this._validate(this._args[0].evaluate(e,r)),n=this._validate(this._args[1].evaluate(e,r)),a=this._validate(this._args[2].evaluate(e,r)),o=this._validateAlpha(this._args[3].evaluate(e,r));return new t({r:s,g:n,b:a,a:o})}_validate(t){if("number"!=typeof t||t<0||t>255)throw new Error(`${t}: invalid color component`);return Math.round(t)}_validateAlpha(t){if("number"!=typeof t||t<0||t>1)throw new Error(`${t}: invalid alpha color component`);return t}}class it{constructor(t){this._color=t,this.type=f(c,4)}static parse(t,e){if(2!==t.length)throw new Error('"to-rgba" expects 1 argument');const r=pt(t[1],e);return new it(r)}evaluate(e,r){return new t(this._color.evaluate(e,r)).toRgba()}}class lt{constructor(t,e){this.type=t,this._args=e}static parse(t,e){const r=t[0];if(t.length<2)throw new Error(`${r} expects at least one argument`);let s,n=1;if("array"===r){if(t.length>2){switch(t[1]){case"string":s=l;break;case"number":s=c;break;case"boolean":s=h;break;default:throw new Error('"array" type argument must be string, number or boolean')}n++}else s=i;let e;if(t.length>3){if(e=t[2],null!==e&&("number"!=typeof e||e<0||e!==Math.floor(e)))throw new Error('"array" length argument must be a positive integer literal');n++}s=f(s,e)}else switch(r){case"string":s=l;break;case"number":s=c;break;case"boolean":s=h;break;case"object":s=u}const a=[];for(;n<t.length;n++){const r=pt(t[n],e);a.push(r)}return new lt(s,a)}evaluate(t,e){let r;for(const s of this._args){const n=s.evaluate(t,e);if(r=w(n),m(r,this.type))return n}throw new Error(`Expected ${g(this.type)} but got ${g(r)}`)}}class ut{constructor(t,e){this.type=t,this._args=e}static parse(t,e){const r=t[0],s=ut.types[r];if(s===h||s===l){if(2!==t.length)throw new Error(`${r} expects one argument`)}else if(t.length<2)throw new Error(`${r} expects at least one argument`);const n=[];for(let a=1;a<t.length;a++){const r=pt(t[a],e);n.push(r)}return new ut(s,n)}evaluate(e,r){if(this.type===h)return Boolean(this._args[0].evaluate(e,r));if(this.type===l)return y(this._args[0].evaluate(e,r));if(this.type===c){for(const t of this._args){const s=Number(t.evaluate(e,r));if(!isNaN(s))return s}return null}if(this.type===p){for(const s of this._args)try{const n=ut.toColor(s.evaluate(e,r));if(n instanceof t)return n}catch{}return null}}static toBoolean(t){return Boolean(t)}static toString(t){return y(t)}static toNumber(t){const e=Number(t);if(isNaN(e))throw new Error(`"${t}" is not a number`);return e}static toColor(e){if(e instanceof t)return e;if("string"==typeof e){const r=t.fromString(e);if(r)return r;throw new Error(`"${e}" is not a color`)}if(Array.isArray(e))return t.fromArray(e);throw new Error(`"${e}" is not a color`)}}ut.types={"to-boolean":h,"to-color":p,"to-number":c,"to-string":l};class ct{constructor(t){this._val=t,this.type=w(t)}static parse(t){if(2!==t.length)throw new Error('"literal" expects 1 argument');return new ct(t[1])}evaluate(t,e){return this._val}}class ht{constructor(t){this._arg=t,this.type=l}static parse(t,e){if(2!==t.length)throw new Error('"typeof" expects 1 argument');return new ht(pt(t[1],e))}evaluate(t,e){return g(w(this._arg.evaluate(t,e)))}}function pt(t,e,r){const s=typeof t;if("string"===s||"boolean"===s||"number"===s||null===t){if(r)switch(r.kind){case"string":"string"!==s&&(t=ut.toString(t));break;case"number":"number"!==s&&(t=ut.toNumber(t));break;case"color":t=ut.toColor(t)}t=["literal",t]}if(!Array.isArray(t)||0===t.length)throw new Error("Expression must be a non empty array");const n=t[0];if("string"!=typeof n)throw new Error("First element of expression must be a string");const a=gt[n];if(void 0===a)throw new Error(`Invalid expression operator "${n}"`);if(!a)throw new Error(`Unimplemented expression operator "${n}"`);return a.parse(t,e,r)}const gt={array:lt,boolean:lt,collator:null,format:null,image:null,literal:ct,number:lt,"number-format":null,object:lt,string:lt,"to-boolean":ut,"to-color":ut,"to-number":ut,"to-string":ut,typeof:ht,accumulated:null,"feature-state":null,"geometry-type":b,id:v,"line-progress":null,properties:d,at:O,get:F,has:G,in:V,"index-of":D,length:H,slice:J,"!":N,"!=":M,"<":k,"<=":A,"==":$,">":j,">=":q,all:C,any:R,case:I,coalesce:L,match:U,within:null,interpolate:P,"interpolate-hcl":P,"interpolate-lab":P,step:S,let:B,var:T,concat:st,downcase:nt,"is-supported-script":null,"resolved-locale":null,upcase:nt,rgb:at,rgba:ot,"to-rgba":it,"-":W,"*":X,"/":Y,"%":Z,"^":tt,"+":et,abs:rt,acos:rt,asin:rt,atan:rt,ceil:rt,cos:rt,e:rt,floor:rt,ln:rt,ln2:rt,log10:rt,log2:rt,max:rt,min:rt,pi:rt,round:rt,sin:rt,sqrt:rt,tan:rt,zoom:x,"heatmap-density":null,"has-id":K,none:z};export{C as ALL,R as ANY,et as Add,lt as Assert,O as At,rt as Calculate,I as Case,L as Coalesce,ut as Coerce,st as Concat,Y as Div,$ as EQ,q as GE,j as GT,b as GeomType,F as Get,G as Has,K as HasID,v as ID,V as In,D as IndexOf,P as Interpolate,A as LE,k as LT,H as Length,B as Let,ct as Literal,U as Match,Z as Mod,X as Mul,M as NE,z as NONE,N as NOT,tt as Pow,d as Properties,at as Rgb,ot as Rgba,J as Slice,S as Step,nt as String,W as Sub,it as ToRgba,ht as TypeOf,T as Var,x as Zoom,pt as createExpression,gt as ops};