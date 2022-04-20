import{x as L,C as P,i as o,V as D,y as u,z as Z,D as k,U as z,N as T,W as H,A as B,E as G,G as X}from"./index.255e6eef.js";class n extends L{constructor(W,l={}){super(W),this.type="ReflectorForSSRPass";const e=this,A=l.color!==void 0?new P(l.color):new P(8355711),N=l.textureWidth||512,j=l.textureHeight||512,U=l.clipBias||0,w=l.shader||n.ReflectorShader,c=l.useDepthTexture===!0,E=new o(0,1,0),b=new o,M=new o;e.needsUpdate=!1,e.maxDistance=n.ReflectorShader.uniforms.maxDistance.value,e.opacity=n.ReflectorShader.uniforms.opacity.value,e.color=A,e.resolution=l.resolution||new D(window.innerWidth,window.innerHeight),e._distanceAttenuation=n.ReflectorShader.defines.DISTANCE_ATTENUATION,Object.defineProperty(e,"distanceAttenuation",{get(){return e._distanceAttenuation},set(t){e._distanceAttenuation!==t&&(e._distanceAttenuation=t,e.material.defines.DISTANCE_ATTENUATION=t,e.material.needsUpdate=!0)}}),e._fresnel=n.ReflectorShader.defines.FRESNEL,Object.defineProperty(e,"fresnel",{get(){return e._fresnel},set(t){e._fresnel!==t&&(e._fresnel=t,e.material.defines.FRESNEL=t,e.material.needsUpdate=!0)}});const s=new o,f=new o,y=new o,v=new u,h=new o(0,0,-1),d=new o,g=new o,p=new u,r=new Z;let m;c&&(m=new k,m.type=z,m.minFilter=T,m.magFilter=T);const S={depthTexture:c?m:null},x=new H(N,j,S),a=new B({transparent:c,defines:Object.assign({},n.ReflectorShader.defines,{useDepthTexture:c}),uniforms:G.clone(w.uniforms),fragmentShader:w.fragmentShader,vertexShader:w.vertexShader});a.uniforms.tDiffuse.value=x.texture,a.uniforms.color.value=e.color,a.uniforms.textureMatrix.value=p,c&&(a.uniforms.tDepth.value=x.depthTexture),this.material=a;const F=[new X(new o(0,1,0),U)];this.doRender=function(t,I,i){if(a.uniforms.maxDistance.value=e.maxDistance,a.uniforms.color.value=e.color,a.uniforms.opacity.value=e.opacity,b.copy(i.position).normalize(),M.copy(b).reflect(E),a.uniforms.fresnelCoe.value=(b.dot(M)+1)/2,f.setFromMatrixPosition(e.matrixWorld),y.setFromMatrixPosition(i.matrixWorld),v.extractRotation(e.matrixWorld),s.set(0,0,1),s.applyMatrix4(v),d.subVectors(f,y),d.dot(s)>0)return;d.reflect(s).negate(),d.add(f),v.extractRotation(i.matrixWorld),h.set(0,0,-1),h.applyMatrix4(v),h.add(y),g.subVectors(f,h),g.reflect(s).negate(),g.add(f),r.position.copy(d),r.up.set(0,1,0),r.up.applyMatrix4(v),r.up.reflect(s),r.lookAt(g),r.far=i.far,r.updateMatrixWorld(),r.projectionMatrix.copy(i.projectionMatrix),a.uniforms.virtualCameraNear.value=i.near,a.uniforms.virtualCameraFar.value=i.far,a.uniforms.virtualCameraMatrixWorld.value=r.matrixWorld,a.uniforms.virtualCameraProjectionMatrix.value=i.projectionMatrix,a.uniforms.virtualCameraProjectionMatrixInverse.value=i.projectionMatrixInverse,a.uniforms.resolution.value=e.resolution,p.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),p.multiply(r.projectionMatrix),p.multiply(r.matrixWorldInverse),p.multiply(e.matrixWorld),x.texture.encoding=t.outputEncoding;const O=t.getRenderTarget(),R=t.xr.enabled,V=t.shadowMap.autoUpdate,_=t.clippingPlanes;t.xr.enabled=!1,t.shadowMap.autoUpdate=!1,t.clippingPlanes=F,t.setRenderTarget(x),t.state.buffers.depth.setMask(!0),t.autoClear===!1&&t.clear(),t.render(I,r),t.xr.enabled=R,t.shadowMap.autoUpdate=V,t.clippingPlanes=_,t.setRenderTarget(O);const C=i.viewport;C!==void 0&&t.state.viewport(C)},this.getRenderTarget=function(){return x}}}n.prototype.isReflectorForSSRPass=!0;n.ReflectorShader={defines:{DISTANCE_ATTENUATION:!0,FRESNEL:!0},uniforms:{color:{value:null},tDiffuse:{value:null},tDepth:{value:null},textureMatrix:{value:new u},maxDistance:{value:180},opacity:{value:.5},fresnelCoe:{value:null},virtualCameraNear:{value:null},virtualCameraFar:{value:null},virtualCameraProjectionMatrix:{value:new u},virtualCameraMatrixWorld:{value:new u},virtualCameraProjectionMatrixInverse:{value:new u},resolution:{value:new D}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		uniform sampler2D tDepth;
		uniform float maxDistance;
		uniform float opacity;
		uniform float fresnelCoe;
		uniform float virtualCameraNear;
		uniform float virtualCameraFar;
		uniform mat4 virtualCameraProjectionMatrix;
		uniform mat4 virtualCameraProjectionMatrixInverse;
		uniform mat4 virtualCameraMatrixWorld;
		uniform vec2 resolution;
		varying vec4 vUv;
		#include <packing>
		float blendOverlay( float base, float blend ) {
			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );
		}
		vec3 blendOverlay( vec3 base, vec3 blend ) {
			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );
		}
		float getDepth( const in vec2 uv ) {
			return texture2D( tDepth, uv ).x;
		}
		float getViewZ( const in float depth ) {
			return perspectiveDepthToViewZ( depth, virtualCameraNear, virtualCameraFar );
		}
		vec3 getViewPosition( const in vec2 uv, const in float depth/*clip space*/, const in float clipW ) {
			vec4 clipPosition = vec4( ( vec3( uv, depth ) - 0.5 ) * 2.0, 1.0 );//ndc
			clipPosition *= clipW; //clip
			return ( virtualCameraProjectionMatrixInverse * clipPosition ).xyz;//view
		}
		void main() {
			vec4 base = texture2DProj( tDiffuse, vUv );
			#ifdef useDepthTexture
				vec2 uv=(gl_FragCoord.xy-.5)/resolution.xy;
				uv.x=1.-uv.x;
				float depth = texture2DProj( tDepth, vUv ).r;
				float viewZ = getViewZ( depth );
				float clipW = virtualCameraProjectionMatrix[2][3] * viewZ+virtualCameraProjectionMatrix[3][3];
				vec3 viewPosition=getViewPosition( uv, depth, clipW );
				vec3 worldPosition=(virtualCameraMatrixWorld*vec4(viewPosition,1)).xyz;
				if(worldPosition.y>maxDistance) discard;
				float op=opacity;
				#ifdef DISTANCE_ATTENUATION
					float ratio=1.-(worldPosition.y/maxDistance);
					float attenuation=ratio*ratio;
					op=opacity*attenuation;
				#endif
				#ifdef FRESNEL
					op*=fresnelCoe;
				#endif
				gl_FragColor = vec4( blendOverlay( base.rgb, color ), op );
			#else
				gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );
			#endif
		}
	`};export{n as ReflectorForSSRPass};
