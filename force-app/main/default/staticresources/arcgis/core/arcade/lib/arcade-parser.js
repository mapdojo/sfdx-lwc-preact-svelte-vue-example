/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{Parser as e}from"./parser.js";import{Tokenizer as r}from"./tokenizer.js";export{AssignmentOperators,BinaryOperators,Keywords,LogicalOperators,OperatorPrecedence,ParsingError,ParsingErrorCodes,ParsingErrorMessages,Syntax,TokenNames,TokenType,UnaryOperators,UpdateOperators,isArrayExpression,isAssignmentExpression,isBinaryExpression,isBlockComment,isBlockStatement,isBreakStatement,isCallExpression,isContinueStatement,isEmptyStatement,isExpression,isExpressionStatement,isForInStatement,isForStatement,isFunctionDeclaration,isIdentifier,isIfStatement,isLiteral,isLogicalExpression,isMemberExpression,isObjectExpression,isProgram,isProperty,isReturnStatement,isStatement,isTemplateElement,isTemplateLiteral,isUnaryExpression,isUpdateExpression,isVariableDeclaration,isVariableDeclarator}from"./types.js";function s(r,s,t){return new e(r,s,t).parseScript()}function t(e,s,t){const i=new r(e,s),n=[];let o;try{let e;for(;e=i.getNextToken();)t&&(e=t(e)),n.push(e)}catch(a){i.errorHandler.tolerate(a)}return i.errorHandler.tolerant&&(o=i.errors()),{tokens:n,errors:o}}export{s as parse,t as tokenize};