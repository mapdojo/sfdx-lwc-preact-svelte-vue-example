/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{isSome as N}from"../../../core/maybe.js";var E,I;function n(E){return N(E)&&N(E.cubeMap)}function R(E){return N(E)&&!E.running}!function(N){N[N.RENDERING=0]="RENDERING",N[N.FINISHED_RENDERING=1]="FINISHED_RENDERING",N[N.FADING_TEXTURE_CHANNELS=2]="FADING_TEXTURE_CHANNELS",N[N.SWITCH_CHANNELS=3]="SWITCH_CHANNELS",N[N.FINISHED=4]="FINISHED"}(E||(E={})),function(N){N[N.RG=0]="RG",N[N.BA=1]="BA"}(I||(I={}));export{E as CloudsRenderingStages,I as CloudsTextureChannels,R as ensureClouds,n as isReadyCloudsData};