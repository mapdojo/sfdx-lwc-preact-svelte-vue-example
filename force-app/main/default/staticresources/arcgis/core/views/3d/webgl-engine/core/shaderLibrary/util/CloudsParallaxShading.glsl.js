/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{clamp as o}from"../../../../../../core/mathUtils.js";import{isSome as a}from"../../../../../../core/maybe.js";import{earth as t}from"../../../../../../geometry/support/Ellipsoid.js";import{FadeInOutStages as e}from"../../../../environment/CloudsCompositionParameters.js";import{CloudsTextureChannels as r,CloudsRenderingStages as d}from"../../../../environment/CloudsData.js";import{addMainLightDirection as i,addMainLightIntensity as c}from"../shading/MainLighting.glsl.js";import{BooleanPassUniform as n}from"../../shaderModules/BooleanPassUniform.js";import{Float3PassUniform as l}from"../../shaderModules/Float3PassUniform.js";import{FloatPassUniform as s}from"../../shaderModules/FloatPassUniform.js";import{glsl as u}from"../../shaderModules/interfaces.js";import{Matrix4PassUniform as C}from"../../shaderModules/Matrix4PassUniform.js";import{TextureCubePassUniform as m}from"../../shaderModules/TextureCubePassUniform.js";function v(v){const R=v.fragment;R.uniforms.add([new C("rotationMatrixClouds",((o,a)=>a.cloudsFade.parallax.transform)),new C("rotationMatrixCloudsCrossFade",((o,a)=>a.cloudsFade.parallaxNew.transform)),new l("anchorPosition",((o,a)=>a.cloudsFade.parallax.anchorPointClouds)),new l("anchorPositionCrossFade",((o,a)=>a.cloudsFade.parallaxNew.anchorPointClouds)),new s("cloudsHeight",((o,a)=>a.cloudsFade.parallax.cloudsHeight)),new s("radiusCurvatureCorrectionFactor",((o,a)=>a.cloudsFade.parallax.radiusCurvatureCorrectionFactor)),new s("totalFadeInOut",((o,a)=>a.cloudsFade.fadeInOut.stage===e.FINISHED?a.cloudsFade.fadeInOutHeight.factor+1-a.cloudsFade.fadeIn.factor:a.cloudsFade.fadeInOutHeight.factor+1-a.cloudsFade.fadeInOut.factor)),new s("crossFadeAnchorFactor",((a,t)=>o(t.cloudsFade.crossFade.factor,0,1))),new m("cubeMap",((o,t)=>a(t.cloudsFade.data)&&a(t.cloudsFade.data.cubeMap)?t.cloudsFade.data.cubeMap.colorTexture:null)),new n("crossFade",((o,a)=>a.cloudsFade.crossFade.enabled)),new n("readChannelsRG",((o,a)=>a.cloudsFade.readChannels===r.RG)),new n("fadeTextureChannels",((o,a)=>a.cloudsFade.renderingStage===d.FADING_TEXTURE_CHANNELS))]),R.constants.add("planetRadius","float",t.radius),R.code.add(u`vec3 intersectWithCloudLayer(vec3 dir, vec3 cameraPosition, vec3 spherePos)
{
float radiusClouds = planetRadius + cloudsHeight;
float B = 2.0 * dot(cameraPosition, dir);
float C = dot(cameraPosition, cameraPosition) - radiusClouds * radiusClouds;
float det = B * B - 4.0 * C;
float pointIntDist = max(0.0, 0.5 *(-B + sqrt(det)));
vec3 intersectionPont = cameraPosition + dir * pointIntDist;
intersectionPont =  intersectionPont - spherePos;
return intersectionPont;
}`),R.code.add(u`vec3 correctForPlanetCurvature(vec3 dir)
{
dir.z = dir.z*(1.-radiusCurvatureCorrectionFactor) + radiusCurvatureCorrectionFactor;
return dir;
}`),R.code.add(u`vec3 rotateDirectionToAnchorPoint(mat4 rotMat, vec3 inVec)
{
return (rotMat * vec4(inVec, 0.0)).xyz;
}`),i(R),c(R),R.code.add(u`const float SUNSET_TRANSITION_FACTOR = 0.3;
const vec3 RIM_COLOR = vec3(0.28, 0.175, 0.035);
const float RIM_SCATTERING_FACTOR = 140.0;
const float BACKLIGHT_FACTOR = 0.2;
const float BACKLIGHT_SCATTERING_FACTOR = 10.0;
const float BACKLIGHT_TRANSITION_FACTOR = 0.3;
vec3 calculateCloudColor(vec3 cameraPosition, vec3 worldSpaceRay, vec4 clouds)
{
float upDotLight = dot(normalize(cameraPosition), normalize(mainLightDirection));
float dirDotLight = max(dot(normalize(-worldSpaceRay), normalize(mainLightDirection)), 0.0);
float sunsetTransition = clamp(pow(max(upDotLight, 0.0), SUNSET_TRANSITION_FACTOR), 0.0, 1.0);
vec3 ambientLight = calculateAmbientIrradiance(normalize(cameraPosition),  0.0);
vec3 mainLight = evaluateMainLighting(normalize(cameraPosition),  0.0);
vec3 combinedLight = clamp((mainLightIntensity + ambientLight )/PI, vec3(0.0), vec3(1.0));
vec3 baseCloudColor = pow(combinedLight * pow(clouds.xyz, vec3(GAMMA)), vec3(INV_GAMMA));
float scatteringMod = max(clouds.a < 0.5 ? clouds.a / 0.5 : - clouds.a / 0.5 + 2.0, 0.0);
float rimLightIntensity = 0.5 + 0.5 *pow(max(upDotLight, 0.0), 0.35);
vec3 directSunScattering = RIM_COLOR * rimLightIntensity * (pow(dirDotLight, RIM_SCATTERING_FACTOR)) * scatteringMod;
float additionalLight = BACKLIGHT_FACTOR * pow(dirDotLight, BACKLIGHT_SCATTERING_FACTOR) * (1. - pow(sunsetTransition, BACKLIGHT_TRANSITION_FACTOR)) ;
return vec3(baseCloudColor * (1. + additionalLight) + directSunScattering);
}`),R.code.add(u`vec4 getCloudData(vec3 rayDir, bool readOtherChannel)
{
vec4 cloudData = textureCube(cubeMap, rayDir);
float mu = dot(rayDir, vec3(0, 0, 1));
bool readChannels = readChannelsRG ^^ readOtherChannel;
if (readChannels) {
cloudData = vec4(vec3(cloudData.r), cloudData.g);
} else {
cloudData = vec4(vec3(cloudData.b), cloudData.a);
}
if (length(cloudData) == 0.0) {
return vec4(cloudData.rgb, 1.0);
}
return cloudData;
}`),R.code.add(u`vec4 renderCloudsNoFade(vec3 worldRay, vec3 cameraPosition)
{
vec3 intersectionPoint = intersectWithCloudLayer(normalize(worldRay), cameraPosition, anchorPosition);
vec3 worldRayRotated = rotateDirectionToAnchorPoint(rotationMatrixClouds, normalize(intersectionPoint));
vec3 worldRayRotatedCorrected = correctForPlanetCurvature(worldRayRotated);
vec4 cloudData = getCloudData(worldRayRotatedCorrected, false);
float totalTransmittance = clamp(cloudData.a * (1.0 - totalFadeInOut) + totalFadeInOut, 0.0 , 1.0);
if (length(cloudData.rgb) == 0.0) {
totalTransmittance = 1.0;
}
return vec4(calculateCloudColor(cameraPosition, normalize(-worldRay), cloudData), totalTransmittance);
}`),R.code.add(u`vec4 renderCloudsCrossFade(vec3 worldRay, vec3 cameraPosition)
{
vec3 intersectionPoint = intersectWithCloudLayer(normalize(worldRay), cameraPosition, anchorPosition);
vec3 worldRayRotated = rotateDirectionToAnchorPoint(rotationMatrixClouds, normalize(intersectionPoint));
vec3 worldRayRotatedCorrected = correctForPlanetCurvature(worldRayRotated);
vec4 cloudData = getCloudData(worldRayRotatedCorrected, false);
vec4 cloudColor = vec4(calculateCloudColor(cameraPosition, normalize(-worldRay), cloudData), cloudData.a);
intersectionPoint = intersectWithCloudLayer(normalize(worldRay), cameraPosition, anchorPositionCrossFade);
worldRayRotated = rotateDirectionToAnchorPoint(rotationMatrixCloudsCrossFade, normalize(intersectionPoint));
worldRayRotatedCorrected = correctForPlanetCurvature(worldRayRotated);
cloudData = getCloudData(worldRayRotatedCorrected, fadeTextureChannels);
vec4 cloudColorCrossFade = vec4(calculateCloudColor(cameraPosition, normalize(-worldRay), cloudData), cloudData.a);
cloudColor = mix(cloudColor, cloudColorCrossFade, crossFadeAnchorFactor);
float totalTransmittance = clamp(cloudColor.a * (1.0 - totalFadeInOut) + totalFadeInOut, 0.0 , 1.0);
if (length(cloudColor.rgb) == 0.0) {
totalTransmittance = 1.0;
}
return vec4(cloudColor.rgb, totalTransmittance);
}`),R.code.add(u`vec4 renderClouds(vec3 worldRay, vec3 cameraPosition)
{
return crossFade ? renderCloudsCrossFade(worldRay, cameraPosition) : renderCloudsNoFade(worldRay, cameraPosition);
}`)}export{v as CloudsParallaxShading};