/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
class e{constructor(){this.cornerTiles=[null,null,null,null],this.cornerTileSamplerVersions=[-1,-1,-1,-1]}}class l{constructor(){this.cornerNeighborData=[new e,new e,new e,new e],this.edgeResolutions=[-1,-1,-1,-1],this.edgePeerNeighbors=[null,null,null,null],this.edgePeerNeighborSamplerVersions=[-1,-1,-1,-1],this.cornerPeerNeighbors=[null,null,null,null]}}class s{constructor(){this.numVerticesPerSide=0,this.samplerData=null,this.clippingArea=null,this.wireframe=!1,this.shading=!1,this.samplerDataVersion=0,this.neighborData=new l}}export{e as CornerNeighborData,s as GeometryState,l as NeighborhoodData};