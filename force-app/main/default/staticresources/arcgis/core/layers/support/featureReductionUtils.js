/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{FeatureReduction as e}from"./FeatureReduction.js";import t from"./FeatureReductionBinning.js";import i from"./FeatureReductionCluster.js";import n from"./FeatureReductionSelection.js";const o={key:"type",base:e,typeMap:{cluster:i,binning:t}},r={types:{key:"type",base:e,typeMap:{selection:n,cluster:i,binning:t}},json:{name:"layerDefinition.featureReduction",write:{allowNull:!0},origins:{"web-map":{types:o},"portal-item":{types:o},"web-scene":{types:{key:"type",base:e,typeMap:{selection:n}}}}}};export{r as featureReductionProperty};