import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ShaderMaterial, Vector2 } from 'three';

const LiquidShaderMaterial = {
  uniforms: {
    u_time: { value: 0.0 },
    u_mouse: { value: new Vector2(0, 0) },
    u_resolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec2 u_resolution;
    varying vec2 vUv;

    float random (in vec2 _st) {
        return fract(sin(dot(_st.xy,
                             vec2(12.9898,78.233)))*
            43758.5453123);
    }

    float noise (in vec2 _st) {
        vec2 i = floor(_st);
        vec2 f = fract(_st);

        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        vec2 u = f * f * (3.0 - 2.0 * f);

        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
    }

    #define NUM_OCTAVES 5

    float fbm ( in vec2 _st) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        // Rotate to reduce axial bias
        mat2 rot = mat2(cos(0.5), sin(0.5),
                        -sin(0.5), cos(0.50));
        for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(_st);
            _st = rot * _st * 2.0 + shift;
            a *= 0.5;
        }
        return v;
    }

    void main() {
        vec2 st = vUv;
        st.x *= u_resolution.x / u_resolution.y;

        vec3 color = vec3(0.0);

        vec2 q = vec2(0.);
        q.x = fbm( st + 0.1*u_time);
        q.y = fbm( st + vec2(1.0));

        vec2 r = vec2(0.);
        r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.25*u_time );
        r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.226*u_time);

        float f = fbm(st+r);

        color = mix(vec3(0.1, 0.2, 0.5), // Dark blue
                    vec3(0.2, 0.5, 0.8), // Lighter blue
                    clamp((f*f)*4.0,0.0,1.0));

        color = mix(color,
                    vec3(0.0, 0.0, 0.1), // Deep blue
                    clamp(length(q),0.0,1.0));

        color = mix(color,
                    vec3(0.8, 0.9, 1.0), // White highlights
                    clamp(length(r.x),0.0,1.0));

        gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,1.);
    }
  `,
};

const ShaderPlane = () => {
  const material = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  const onMouseMove = (event) => {
    mouse.current = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    };
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  useFrame((state, delta) => {
    material.current.uniforms.u_time.value += delta;
    material.current.uniforms.u_mouse.value.x += (mouse.current.x - material.current.uniforms.u_mouse.value.x) * 0.05;
    material.current.uniforms.u_mouse.value.y += (mouse.current.y - material.current.uniforms.u_mouse.value.y) * 0.05;
  });

  return (
    <mesh>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial ref={material} {...LiquidShaderMaterial} />
    </mesh>
  );
};

const LiquidBackground = () => {
  return (
    <Canvas style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
      <ShaderPlane />
    </Canvas>
  );
};

export default LiquidBackground;
