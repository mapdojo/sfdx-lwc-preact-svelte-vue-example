/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{doSubstitutions as e}from"../../executionError.js";var t;!function(e){e.InvalidFunctionParameters="InvalidFunctionParameters",e.UnsupportedSqlFunction="UnsupportedSqlFunction",e.UnsupportedOperator="UnsupportedOperator",e.UnsupportedSyntax="UnsupportedSyntax",e.UnsupportedIsRhs="UnsupportedIsRhs",e.UnsupportedIsLhs="UnsupportedIsLhs",e.InvalidDataType="InvalidDataType",e.CannotCastValue="CannotCastValue",e.MissingStatisticParameters="MissingStatisticParameters"}(t||(t={}));const a={[t.MissingStatisticParameters]:"Statistic does not have 1 or 0 Parameters",[t.InvalidFunctionParameters]:"Invalid parameters for call to {function}",[t.UnsupportedIsLhs]:"Unsupported left hand expression in is statement",[t.UnsupportedIsRhs]:"Unsupported right hand expression in is statement",[t.UnsupportedOperator]:"Unsupported operator - {operator}",[t.UnsupportedSyntax]:"Unsupported syntax - {node}",[t.UnsupportedSqlFunction]:"Sql function not found = {function}",[t.InvalidDataType]:"Invalid sql data type",[t.CannotCastValue]:"Cannot cast value to the required data type"};class s extends Error{constructor(t,n){super(e(a[t],n)),this.declaredRootClass="esri.arcade.featureset.support.sqlerror",Error.captureStackTrace&&Error.captureStackTrace(this,s)}}var n;!function(e){e.NeverReach="NeverReach",e.NotImplemented="NotImplemented",e.Cancelled="Cancelled",e.InvalidStatResponse="InvalidStatResponse",e.InvalidRequest="InvalidRequest",e.RequestFailed="RequestFailed",e.MissingFeatures="MissingFeatures",e.AggregationFieldNotFound="AggregationFieldNotFound",e.DataElementsNotFound="DataElementsNotFound"}(n||(n={}));const r={[n.Cancelled]:"Cancelled",[n.InvalidStatResponse]:"Invalid statistics response from service",[n.InvalidRequest]:"Invalid request",[n.RequestFailed]:"Request failed - {reason}",[n.MissingFeatures]:"Missing features",[n.AggregationFieldNotFound]:"Aggregation field not found",[n.DataElementsNotFound]:"Data elements not found on service",[n.NeverReach]:"Encountered unreachable logic",[n.NotImplemented]:"Not implemented"};class o extends Error{constructor(t,a){super(e(r[t],a)),this.declaredRootClass="esri.arcade.featureset.support.featureseterror",Error.captureStackTrace&&Error.captureStackTrace(this,o)}}export{o as FeatureSetError,n as FeatureSetErrorCodes,r as FeatureSetErrorMessages,s as SqlError,t as SqlErrorCodes,a as SqlErrorMessages};