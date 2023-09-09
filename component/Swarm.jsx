import { useRef, useState, useEffect, useMemo,Suspense } from "react";

import { useFrame, extend, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { lerp, damp } from "three/src/math/MathUtils";
function Effect({ down }) {
  const composer = useRef();
  const { scene, gl, size, camera } = useThree();
  const aspect = useMemo(
    () => new THREE.Vector2(size.width, size.height),
    [size]
  );
  useEffect(
    () => void composer.current.setSize(size.width, size.height),
    [size]
  );
  useFrame(() => composer.current.render(), 1);
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <waterPass attachArray="passes" factor={1.5} />
      <unrealBloomPass attachArray="passes" args={[aspect, 2, 1, 0]} />
      <glitchPass attachArray="passes" factor={down ? 1 : 0} />
    </effectComposer>
  );
}

export default function Swarm({ count, mouse }) {
  const mesh = useRef();
  const light = useRef();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const dummy = useMemo(() => new THREE.Object3D(), []);
  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);
  // The innards of this hook will run every frame
  useFrame((state) => {
    // Makes the light follow the mouse
    light.current.position.set(
      mouse.current[0] / aspect,
      -mouse.current[1] / aspect,
      0
    );
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      // There is no sense or reason to any of this, just messing around with trigonometric functions
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      particle.mx += (mouse.current[0] - particle.mx) * 0.01;
      particle.my += (mouse.current[1] * -1 - particle.my) * 0.01;
      // Update the dummy object
      dummy.position.set(
        (particle.mx / 10) * a +
          xFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b +
          yFactor +
          Math.sin((t / 10) * factor) +
          (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b +
          zFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      // And apply the matrix to the instanced item
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <>
      <pointLight ref={light} distance={40} intensity={8} color="lightblue" />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronBufferGeometry attach="geometry" args={[0.2, 0]} />
        <meshPhongMaterial attach="material" color="#050505" />
      </instancedMesh>
    </>
  );
}

export function Ellipse(props) {
  const geometry = useMemo(() => {
    // const curve = new THREE.EllipseCurve(0, 0, 10, 3, 0, 2 * Math.PI, false, 0);
    const path = new THREE.Path();

    path.lineTo(0, 0);
    // path.quadraticCurveTo(0, 1, 0.2, 1);
    path.lineTo(1, 1);
    path.lineTo(1, 2);
    path.lineTo(1, -2);
    path.lineTo(0, 0);
    const points = path.getPoints(50);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);
  return (
    <line geometry={geometry} {...props}>
      <meshBasicMaterial attach="material" />
    </line>
  );
}



export function Number({ mouse, hover }) {
  const ref = useRef()
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width
  useFrame(state => {
    if (ref.current) {
      ref.current.position.x = lerp(ref.current.position.x, mouse.current[0] / aspect / 10, 0.1)
      ref.current.rotation.x = lerp(ref.current.rotation.x, 0 + mouse.current[1] / aspect / 50, 0.1)
      ref.current.rotation.y = 0.8
    }
  })

  return (
    <Suspense fallback={null}>
      <group ref={ref}>
        {/* <Text
          size={10}
          onClick={e => window.open('https://github.com/react-spring/react-three-fiber/blob/v4/whatsnew.md', '_blank')}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}>
          4
        </Text> */}
        <group position={[0, 0, 0]} scale={[3, 3, 3]}>
          <Ellipse />
          <Ellipse rotation={[0, 0, Math.PI / 3]} />
          <Ellipse rotation={[0, 0, -Math.PI / 3]} />
          {/* <mesh>
            <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32]} />
            <meshBasicMaterial attach="material" color="red" />
          </mesh> */}
        </group>
      </group>
    </Suspense>
  )
}
