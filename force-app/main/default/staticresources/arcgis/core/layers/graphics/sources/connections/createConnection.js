/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import e from"./GeoEventConnection.js";import{WebSocketConnection as t}from"./WebSocketConnection.js";import{ClientSideConnection as n}from"../../../support/ClientSideConnection.js";function o(o,r,s,i,c,a,m,p){const f={source:o,sourceSpatialReference:r,spatialReference:s,geometryType:i,filter:c,maxReconnectionAttempts:a,maxReconnectionInterval:m,customParameters:p};if(!o)return new n(f);return o.path.startsWith("wss://")||o.path.startsWith("ws://")?new t(f):new e(f)}export{o as createConnection};