import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { WebGLRenderTarget, ShaderMaterial, Vector2, PlaneGeometry, Scene, OrthographicCamera, TextureLoader, RepeatWrapping } from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const bufferShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec4 uMouse;
  uniform float uTime;
  uniform vec2 uResolution;

  void main() {
    vec2 texel = 1.0 / uResolution;
    vec4 data = texture2D(uTexture, vUv);

    float pressure = data.x;
    float pVel = data.y;

    float p_right = texture2D(uTexture, vUv + vec2(texel.x, 0.0)).x;
    float p_left = texture2D(uTexture, vUv - vec2(texel.x, 0.0)).x;
    float p_up = texture2D(uTexture, vUv + vec2(0.0, texel.y)).x;
    float p_down = texture2D(uTexture, vUv - vec2(0.0, texel.y)).x;

    pVel += (p_right + p_left + p_up + p_down - 4.0 * pressure) * 0.5;
    pressure += pVel * 0.5;

    pVel *= 0.98;
    pressure *= 0.99;

    if (uMouse.z > 0.0) {
      float dist = distance(vUv * uResolution, uMouse.xy);
      if (dist < 20.0) {
        pressure += (1.0 - dist / 20.0) * 0.1;
      }
    }

    gl_FragColor = vec4(pressure, pVel, 0.0, 1.0);
  }
`;

const renderShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform sampler2D uBgTexture;
  uniform vec2 uResolution;

  void main() {
    vec2 texel = 1.0 / uResolution;
    vec4 data = texture2D(uTexture, vUv);

    float p_right = texture2D(uTexture, vUv + vec2(texel.x, 0.0)).x;
    float p_left = texture2D(uTexture, vUv - vec2(texel.x, 0.0)).x;
    float p_up = texture2D(uTexture, vUv + vec2(0.0, texel.y)).x;
    float p_down = texture2D(uTexture, vUv - vec2(0.0, texel.y)).x;

    vec2 offset = vec2(p_right - p_left, p_up - p_down) * 0.1;
    vec4 color = texture2D(uBgTexture, vUv + offset);

    gl_FragColor = color;
  }
`;

const RipplePass = () => {
  const { gl, size, camera } = useThree();
  const scene = useMemo(() => new Scene(), []);
  const orthoCamera = useMemo(() => new OrthographicCamera(size.width / -2, size.width / 2, size.height / 2, size.height / -2, 1, 1000), [size]);
  
  useEffect(() => {
    orthoCamera.position.z = 1;
  }, [orthoCamera]);

  const [rt1, rt2] = useMemo(() => [
    new WebGLRenderTarget(size.width, size.height),
    new WebGLRenderTarget(size.width, size.height)
  ], [size]);

  const rt = useRef({ read: rt1, write: rt2 });

  const bufferMaterial = useMemo(() => new ShaderMaterial({
    uniforms: {
      uTexture: { value: null },
      uMouse: { value: { x: 0, y: 0, z: 0, w: 0 } },
      uTime: { value: 0 },
      uResolution: { value: new Vector2(size.width, size.height) }
    },
    vertexShader,
    fragmentShader: bufferShader
  }), [size]);

  const renderMaterial = useMemo(() => new ShaderMaterial({
    uniforms: {
      uTexture: { value: rt2.texture },
      uBgTexture: { value: null },
      uResolution: { value: new Vector2(size.width, size.height) }
    },
    vertexShader,
    fragmentShader: renderShader
  }), [rt2, size]);

  const bgTexture = useLoader(TextureLoader, '/src/assets/images/seltronik1.png');
  useEffect(() => {
    if (bgTexture) {
      bgTexture.wrapS = bgTexture.wrapT = RepeatWrapping;
      renderMaterial.uniforms.uBgTexture.value = bgTexture;
    }
  }, [bgTexture, renderMaterial]);

  const plane = useMemo(() => new PlaneGeometry(size.width, size.height), [size]);
  const mesh = useMemo(() => new THREE.Mesh(plane, bufferMaterial), [plane, bufferMaterial]);

  useEffect(() => {
    scene.add(mesh);
  }, [scene, mesh]);

  const mouse = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = size.height - e.clientY;
    };
    const onMouseDown = () => mouse.current.z = 1;
    const onMouseUp = () => mouse.current.z = 0;

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [size]);

  useFrame((state, delta) => {
    bufferMaterial.uniforms.uTime.value += delta;
    bufferMaterial.uniforms.uMouse.value.x = mouse.current.x;
    bufferMaterial.uniforms.uMouse.value.y = mouse.current.y;
    bufferMaterial.uniforms.uMouse.value.z = mouse.current.z;

    // Ping-pong rendering
    bufferMaterial.uniforms.uTexture.value = rt.current.read.texture;
    gl.setRenderTarget(rt.current.write);
    gl.render(scene, orthoCamera);
    gl.setRenderTarget(null);

    renderMaterial.uniforms.uTexture.value = rt.current.write.texture;

    // Swap
    const temp = rt.current.read;
    rt.current.read = rt.current.write;
    rt.current.write = temp;
  });

  return <mesh geometry={plane} material={renderMaterial} />;
};

const WaterRippleEffect = () => {
  return (
    <Canvas style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
      <RipplePass />
    </Canvas>
  );
};

export default WaterRippleEffect;
