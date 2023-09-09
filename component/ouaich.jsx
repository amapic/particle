import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { ShaderMaterial } from '@react-three/drei';
import Random from 'canvas-sketch-util/random';
// import { MeshLine, MeshLineMaterial, MeshLineRaycast } from "@amcdnl/threejs-meshline";
import { MeshLine, MeshLineMaterial } from './MeshLine';
extend({MeshLine, MeshLineMaterial})
const radiusVariance = () => Random.range(0.2, 1);

function SparkLine({ curve, width, color, speed }) {
  const material = useRef();

  useFrame(() => {
    material.current.uniforms.dashOffset.value -= speed;
  });

  return (
    <mesh>
      <meshLine attach="geometry" points={curve} />
      <meshLineMaterial
        ref={material}
        transparent
        depthTest={false}
        lineWidth={width}
        color={new THREE.Color(0x000000)}
        dashArray={0.1}
        dashRatio={0.95}
      />
    </mesh>
  );
}

export default function Sparks({ count, colors, radius = 1 }) {
  const lines = useMemo(
    () =>
      new Array(count).fill().map((_, index) => {
        const pos = new THREE.Vector3(
          Math.sin(0) * radius * radiusVariance(),
          Math.cos(0) * radius * radiusVariance(),
          Math.sin(0) * Math.cos(0) * radius * radiusVariance()
        );
        const points = new Array(30).fill().map((_, index) => {
          const angle = -0.01 + (index / 20) * Math.PI * 2;
          const caca=2 * (0.5 - (index / 30))
          console.log(caca)
          return pos
            .add(
              // new THREE.Vector3(
              //   Math.sin(angle) * radius * radiusVariance(),
              //   Math.cos(angle) * radius * radiusVariance(),
              //   Math.sin(angle) * Math.cos(angle) * radius * radiusVariance()
              // )
              new THREE.Vector3(
                angle,
                Math.atan(angle) * radius * radiusVariance() * caca,
                0
                // Math.atan(angle) * radius * radiusVariance(),
                
                
                
                // Math.sin(angle) * Math.cos(angle) * radius * radiusVariance()
              )
            )
            .clone();
        });
        const curve = new THREE.CatmullRomCurve3(points).getPoints(1000);
        return {
          color: colors[parseInt(colors.length * Math.random(), 10)],
          width: Math.max(0.1, (0.2 * index) / 10),
          speed: Math.max(0.001, 0.004 * Math.random()),
          curve,
        };
      }),
    [count, colors, radius]
  );

  return (
    <group position={[-radius * 2, -radius, 0]} scale={[1, 1.3, 1]}>
      {lines.map((props, index) => (
        <SparkLine key={index} {...props} />
      ))}
    </group>
  );
}