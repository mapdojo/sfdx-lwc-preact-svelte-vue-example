/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{assert as e}from"./assert.js";import{Character as t}from"./character.js";import{UpdateOperators as i,UnaryOperators as s,LogicalOperators as n,AssignmentOperators as r,BinaryOperators as h,ParsingErrorCodes as c,Keywords as o,TokenType as a}from"./types.js";function d(e){return"0123456789abcdef".indexOf(e.toLowerCase())}function l(e){return"01234567".indexOf(e)}const u=[[],[],[]];i.forEach((e=>u[e.length-1].push(e))),s.forEach((e=>u[e.length-1].push(e))),n.forEach((e=>u[e.length-1].push(e))),r.forEach((e=>u[e.length-1].push(e))),h.forEach((e=>u[e.length-1].push(e)));class x{constructor(e,t){this.source=e,this.errorHandler=t,this._length=e.length,this.index=0,this.lineNumber=1,this.lineStart=0,this.curlyStack=[]}saveState(){return{index:this.index,lineNumber:this.lineNumber,lineStart:this.lineStart,curlyStack:this.curlyStack.slice()}}restoreState(e){this.index=e.index,this.lineNumber=e.lineNumber,this.lineStart=e.lineStart,this.curlyStack=e.curlyStack}eof(){return this.index>=this._length}throwUnexpectedToken(e=c.UnexpectedToken){this.errorHandler.throwError({code:e,index:this.index,line:this.lineNumber,column:this.index-this.lineStart+1})}tolerateUnexpectedToken(e=c.UnexpectedToken){this.errorHandler.tolerateError({code:e,index:this.index,line:this.lineNumber,column:this.index-this.lineStart+1})}skipSingleLineComment(e){const i=[],s=this.index-e,n={start:{line:this.lineNumber,column:this.index-this.lineStart-e},end:{line:0,column:0}};for(;!this.eof();){const r=this.source.charCodeAt(this.index);if(++this.index,t.isLineTerminator(r)){if(n){n.end={line:this.lineNumber,column:this.index-this.lineStart-1};const t={multiLine:!1,start:s+e,end:this.index-1,range:[s,this.index-1],loc:n};i.push(t)}return 13===r&&10===this.source.charCodeAt(this.index)&&++this.index,++this.lineNumber,this.lineStart=this.index,i}}if(n){n.end={line:this.lineNumber,column:this.index-this.lineStart};const t={multiLine:!1,start:s+e,end:this.index,range:[s,this.index],loc:n};i.push(t)}return i}skipMultiLineComment(){const e=[],i=this.index-2,s={start:{line:this.lineNumber,column:this.index-this.lineStart-2},end:{line:0,column:0}};for(;!this.eof();){const n=this.source.charCodeAt(this.index);if(t.isLineTerminator(n))13===n&&10===this.source.charCodeAt(this.index+1)&&++this.index,++this.lineNumber,++this.index,this.lineStart=this.index;else if(42===n){if(47===this.source.charCodeAt(this.index+1)){if(this.index+=2,s){s.end={line:this.lineNumber,column:this.index-this.lineStart};const t={multiLine:!0,start:i+2,end:this.index-2,range:[i,this.index],loc:s};e.push(t)}return e}++this.index}else++this.index}if(s){s.end={line:this.lineNumber,column:this.index-this.lineStart};const t={multiLine:!0,start:i+2,end:this.index,range:[i,this.index],loc:s};e.push(t)}return this.tolerateUnexpectedToken(),e}scanComments(){let e=[];for(;!this.eof();){let i=this.source.charCodeAt(this.index);if(t.isWhiteSpace(i))++this.index;else if(t.isLineTerminator(i))++this.index,13===i&&10===this.source.charCodeAt(this.index)&&++this.index,++this.lineNumber,this.lineStart=this.index;else{if(47!==i)break;if(i=this.source.charCodeAt(this.index+1),47===i){this.index+=2;const t=this.skipSingleLineComment(2);e=[...e,...t]}else{if(42!==i)break;{this.index+=2;const t=this.skipMultiLineComment();e=[...e,...t]}}}}return e}isKeyword(e){switch((e=e.toLowerCase()).length){case 2:return e===o.If||e===o.In;case 3:return e===o.Var||e===o.For;case 4:return e===o.Else;case 5:return e===o.Break||e===o.While;case 6:return e===o.Return||e===o.Import||e===o.Export;case 8:return e===o.Function||e===o.Continue;default:return!1}}codePointAt(e){let t=this.source.charCodeAt(e);if(t>=55296&&t<=56319){const i=this.source.charCodeAt(e+1);if(i>=56320&&i<=57343){t=1024*(t-55296)+i-56320+65536}}return t}scanHexEscape(e){const i="u"===e?4:2;let s=0;for(let n=0;n<i;++n){if(this.eof()||!t.isHexDigit(this.source.charCodeAt(this.index)))return null;s=16*s+d(this.source[this.index++])}return String.fromCharCode(s)}scanUnicodeCodePointEscape(){let e=this.source[this.index],i=0;for("}"===e&&this.throwUnexpectedToken();!this.eof()&&(e=this.source[this.index++],t.isHexDigit(e.charCodeAt(0)));)i=16*i+d(e);return(i>1114111||"}"!==e)&&this.throwUnexpectedToken(),t.fromCodePoint(i)}getIdentifier(){const e=this.index++;for(;!this.eof();){const i=this.source.charCodeAt(this.index);if(92===i)return this.index=e,this.getComplexIdentifier();if(i>=55296&&i<57343)return this.index=e,this.getComplexIdentifier();if(!t.isIdentifierPart(i))break;++this.index}return this.source.slice(e,this.index)}getComplexIdentifier(){let e,i=this.codePointAt(this.index),s=t.fromCodePoint(i);for(this.index+=s.length,92===i&&(117!==this.source.charCodeAt(this.index)&&this.throwUnexpectedToken(),++this.index,"{"===this.source[this.index]?(++this.index,e=this.scanUnicodeCodePointEscape()):(e=this.scanHexEscape("u"),null!==e&&"\\"!==e&&t.isIdentifierStart(e.charCodeAt(0))||this.throwUnexpectedToken()),s=e);!this.eof()&&(i=this.codePointAt(this.index),t.isIdentifierPart(i));)e=t.fromCodePoint(i),s+=e,this.index+=e.length,92===i&&(s=s.substring(0,s.length-1),117!==this.source.charCodeAt(this.index)&&this.throwUnexpectedToken(),++this.index,"{"===this.source[this.index]?(++this.index,e=this.scanUnicodeCodePointEscape()):(e=this.scanHexEscape("u"),null!==e&&"\\"!==e&&t.isIdentifierPart(e.charCodeAt(0))||this.throwUnexpectedToken()),s+=e);return s}octalToDecimal(e){let i="0"!==e,s=l(e);return!this.eof()&&t.isOctalDigit(this.source.charCodeAt(this.index))&&(i=!0,s=8*s+l(this.source[this.index++]),"0123".includes(e)&&!this.eof()&&t.isOctalDigit(this.source.charCodeAt(this.index))&&(s=8*s+l(this.source[this.index++]))),{code:s,octal:i}}scanIdentifier(){let e;const t=this.index,i=92===this.source.charCodeAt(t)?this.getComplexIdentifier():this.getIdentifier();if(e=1===i.length?a.Identifier:this.isKeyword(i)?a.Keyword:i.toLowerCase()===o.Null?a.NullLiteral:i.toLowerCase()===o.True||i.toLowerCase()===o.False?a.BooleanLiteral:a.Identifier,e!==a.Identifier&&t+i.length!==this.index){const e=this.index;this.index=t,this.tolerateUnexpectedToken(c.InvalidEscapedReservedWord),this.index=e}return{type:e,value:i,lineNumber:this.lineNumber,lineStart:this.lineStart,start:t,end:this.index}}scanPunctuator(){const e=this.index;let t=this.source[this.index];switch(t){case"(":case"{":"{"===t&&this.curlyStack.push("{"),++this.index;break;case".":case")":case";":case",":case"[":case"]":case":":case"?":case"~":++this.index;break;case"}":++this.index,this.curlyStack.pop();break;default:for(let e=u.length;e>0;e--)if(t=this.source.substring(this.index,this.index+e),u[e-1].includes(t)){this.index+=e;break}}return this.index===e&&this.throwUnexpectedToken(),{type:a.Punctuator,value:t,lineNumber:this.lineNumber,lineStart:this.lineStart,start:e,end:this.index}}scanHexLiteral(e){let i="";for(;!this.eof()&&t.isHexDigit(this.source.charCodeAt(this.index));)i+=this.source[this.index++];return 0===i.length&&this.throwUnexpectedToken(),t.isIdentifierStart(this.source.charCodeAt(this.index))&&this.throwUnexpectedToken(),{type:a.NumericLiteral,value:parseInt("0x"+i,16),lineNumber:this.lineNumber,lineStart:this.lineStart,start:e,end:this.index}}scanBinaryLiteral(e){let i="";for(;!this.eof();){const e=this.source[this.index];if("0"!==e&&"1"!==e)break;i+=this.source[this.index++]}if(0===i.length&&this.throwUnexpectedToken(),!this.eof()){const e=this.source.charCodeAt(this.index);(t.isIdentifierStart(e)||t.isDecimalDigit(e))&&this.throwUnexpectedToken()}return{type:a.NumericLiteral,value:parseInt(i,2),lineNumber:this.lineNumber,lineStart:this.lineStart,start:e,end:this.index}}scanOctalLiteral(e,i){let s="",n=!1;for(t.isOctalDigit(e.charCodeAt(0))?(n=!0,s="0"+this.source[this.index++]):++this.index;!this.eof()&&t.isOctalDigit(this.source.charCodeAt(this.index));)s+=this.source[this.index++];return n||0!==s.length||this.throwUnexpectedToken(),(t.isIdentifierStart(this.source.charCodeAt(this.index))||t.isDecimalDigit(this.source.charCodeAt(this.index)))&&this.throwUnexpectedToken(),{type:a.NumericLiteral,value:parseInt(s,8),lineNumber:this.lineNumber,lineStart:this.lineStart,start:i,end:this.index}}scanNumericLiteral(){const i=this.index;let s=this.source[i];e(t.isDecimalDigit(s.charCodeAt(0))||"."===s,"Numeric literal must start with a decimal digit or a decimal point");let n="";if("."!==s){if(n=this.source[this.index++],s=this.source[this.index],"0"===n){if("x"===s||"X"===s)return++this.index,this.scanHexLiteral(i);if("b"===s||"B"===s)return++this.index,this.scanBinaryLiteral(i);if("o"===s||"O"===s)return this.scanOctalLiteral(s,i)}for(;t.isDecimalDigit(this.source.charCodeAt(this.index));)n+=this.source[this.index++];s=this.source[this.index]}if("."===s){for(n+=this.source[this.index++];t.isDecimalDigit(this.source.charCodeAt(this.index));)n+=this.source[this.index++];s=this.source[this.index]}if("e"===s||"E"===s)if(n+=this.source[this.index++],s=this.source[this.index],"+"!==s&&"-"!==s||(n+=this.source[this.index++]),t.isDecimalDigit(this.source.charCodeAt(this.index)))for(;t.isDecimalDigit(this.source.charCodeAt(this.index));)n+=this.source[this.index++];else this.throwUnexpectedToken();return t.isIdentifierStart(this.source.charCodeAt(this.index))&&this.throwUnexpectedToken(),{type:a.NumericLiteral,value:parseFloat(n),lineNumber:this.lineNumber,lineStart:this.lineStart,start:i,end:this.index}}scanStringLiteral(){const i=this.index;let s=this.source[i];e("'"===s||'"'===s,"String literal must starts with a quote"),++this.index;let n=!1,r="";for(;!this.eof();){let e=this.source[this.index++];if(e===s){s="";break}if("\\"===e)if(e=this.source[this.index++],e&&t.isLineTerminator(e.charCodeAt(0)))++this.lineNumber,"\r"===e&&"\n"===this.source[this.index]&&++this.index,this.lineStart=this.index;else switch(e){case"u":if("{"===this.source[this.index])++this.index,r+=this.scanUnicodeCodePointEscape();else{const t=this.scanHexEscape(e);null===t&&this.throwUnexpectedToken(),r+=t}break;case"x":{const t=this.scanHexEscape(e);null===t&&this.throwUnexpectedToken(c.InvalidHexEscapeSequence),r+=t;break}case"n":r+="\n";break;case"r":r+="\r";break;case"t":r+="\t";break;case"b":r+="\b";break;case"f":r+="\f";break;case"v":r+="\v";break;case"8":case"9":r+=e,this.tolerateUnexpectedToken();break;default:if(e&&t.isOctalDigit(e.charCodeAt(0))){const t=this.octalToDecimal(e);n=t.octal||n,r+=String.fromCharCode(t.code)}else r+=e}else{if(t.isLineTerminator(e.charCodeAt(0)))break;r+=e}}return""!==s&&(this.index=i,this.throwUnexpectedToken()),{type:a.StringLiteral,value:r,lineNumber:this.lineNumber,lineStart:this.lineStart,start:i,end:this.index}}scanTemplate(){let e="",i=!1;const s=this.index,n="`"===this.source[s];let r=!1,h=2;for(++this.index;!this.eof();){let s=this.source[this.index++];if("`"===s){h=1,r=!0,i=!0;break}if("$"!==s)if("\\"!==s)t.isLineTerminator(s.charCodeAt(0))?(++this.lineNumber,"\r"===s&&"\n"===this.source[this.index]&&++this.index,this.lineStart=this.index,e+="\n"):e+=s;else if(s=this.source[this.index++],t.isLineTerminator(s.charCodeAt(0)))++this.lineNumber,"\r"===s&&"\n"===this.source[this.index]&&++this.index,this.lineStart=this.index;else switch(s){case"n":e+="\n";break;case"r":e+="\r";break;case"t":e+="\t";break;case"u":if("{"===this.source[this.index])++this.index,e+=this.scanUnicodeCodePointEscape();else{const t=this.index,i=this.scanHexEscape(s);null!==i?e+=i:(this.index=t,e+=s)}break;case"x":{const t=this.scanHexEscape(s);null===t&&this.throwUnexpectedToken(c.InvalidHexEscapeSequence),e+=t;break}case"b":e+="\b";break;case"f":e+="\f";break;case"v":e+="\v";break;default:"0"===s?(t.isDecimalDigit(this.source.charCodeAt(this.index))&&this.throwUnexpectedToken(c.TemplateOctalLiteral),e+="\0"):t.isOctalDigit(s.charCodeAt(0))?this.throwUnexpectedToken(c.TemplateOctalLiteral):e+=s}else{if("{"===this.source[this.index]){this.curlyStack.push("${"),++this.index,i=!0;break}e+=s}}return i||this.throwUnexpectedToken(),n||this.curlyStack.pop(),{type:a.Template,value:this.source.slice(s+1,this.index-h),cooked:e,head:n,tail:r,lineNumber:this.lineNumber,lineStart:this.lineStart,start:s,end:this.index}}lex(){if(this.eof())return{type:a.EOF,value:"",lineNumber:this.lineNumber,lineStart:this.lineStart,start:this.index,end:this.index};const e=this.source.charCodeAt(this.index);return t.isIdentifierStart(e)?this.scanIdentifier():40===e||41===e||59===e?this.scanPunctuator():39===e||34===e?this.scanStringLiteral():46===e?t.isDecimalDigit(this.source.charCodeAt(this.index+1))?this.scanNumericLiteral():this.scanPunctuator():t.isDecimalDigit(e)?this.scanNumericLiteral():96===e||125===e&&"${"===this.curlyStack[this.curlyStack.length-1]?this.scanTemplate():e>=55296&&e<57343&&t.isIdentifierStart(this.codePointAt(this.index))?this.scanIdentifier():this.scanPunctuator()}}export{x as Scanner};