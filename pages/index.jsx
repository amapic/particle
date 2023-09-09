import dynamic from "next/dynamic";
import Head from "next/head";
import * as THREE from "three";
// import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
// import { MeshLine, MeshLineMaterial, MeshLineRaycast } from "threejs-meshline";
import {
  useEffect,
  useRef,
  useMemo,
  useState,
  forwardRef,
  useLayoutEffect,
  Suspense,
} from "react";
import { UnrealBloomPass, WaterPass } from "three-stdlib";
// import {UnrealBloomPass} from "three/addons/postprocessing/UnrealBloomPass.js"
extend({ UnrealBloomPass });
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
// import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
// import { GlitchPass } from './Glitchpass'
// import { WaterPass } from './Waterpass'
// import {
//   Bloom,
//   DepthOfField,
//   EffectComposer,
//   Noise,
//   Vignette,
// } from "@react-three/postprocessing";
// import {
//   Text,
//   Text3D,
//   shaderMaterial,
//   PerspectiveCamera,
//   AdaptiveDpr,
//   PerformanceMonitor,
//   FontData,
// } from "@react-three/drei";

import {
  Canvas,
  useLoader,
  useFrame,
  extend,
  useThree,
} from "@react-three/fiber";
// import {
//   postprocessing,
//   EffectComposer,
//   Bloom,
// } from "@react-three/postprocessing";
// import { GLSL } from "gl-react";
import { lerp, damp } from "three/src/math/MathUtils";

// extend({ MeshLineMaterial, UnrealBloomPass });

import { OrbitControls, Effects } from "@react-three/drei";

import Ttext from "@/component/Ttext";
// import Swarm, { Ellipse, Number } from "@/component/Swarm";
import Sparks from "@/component/Ouaich";

function Home() {
  // const intensity = 0.2;
  // const [hovered, hover] = useState(false);
  // const radius = 0.2;
  // const luminanceThreshold = 1;
  // const luminanceSmoothing = 1;
  // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  // const mouse = useRef([0, 0]);
  // var OrbitControls;
  const options = useMemo(() => {
    return {
      progress: { value: 0, min: 0, max: 1, step: 0.1 },
      z: { value: 10, min: 0, max: 20, step: 1 },
      maxpolarangle: { value: 0.85, min: 0, max: 1, step: 0.01 },
      x: { value: 0, min: 0, max: 50, step: 10 },
    };
  }, []);

  function randomString(strLength, charSet) {
    var result = [];

    strLength = strLength || 10;
    charSet = charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    while (strLength--) {
      // (note, fixed typo)
      result.push(charSet.charAt(Math.floor(Math.random() * charSet.length)));
    }

    return result.join(" ");
  }

  function between(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  useEffect(() => {
    var bb;
    var xx;
    setInterval(() => {
      bb = "";
      var aa = [...Array(10)].map((x, i) => {
        // bb += randomString(10);
        xx = randomString(10);
        var chiffre = between(0, 20);
        xx =
          xx.substring(0, chiffre) +
          "<span class='jjj'>" +
          xx.substring(chiffre, chiffre + 1) +
          "</span>" +
          xx.substring(chiffre + 1, xx.length);

        bb += xx;
        bb += "<br />";
      });

      // document.getElementById("text").innerHTML = bb;
    }, 2000);
    // setInterval(() => {
    //   // document.getElementById("card").position.left = bb;
    // });
  });

  return (
    <>
      {/* <CookieConsent /> */}
      <Head>
        <title>Book A.PICHAT</title>
        {/* <link rel="shortcut icon" href="/particle/favicon.ico" /> */}
      </Head>

      <div
        id="div_canvas"
        style={{
          background: "white",
          height: "100vh",
          width: "50vw",
          position: "fixed",
          zIndex: 3,
          left: "10vw",
        }}
      >
        <Canvas
          gl={{ antialias: true }}
          camera={{
            near: 0.1,
            far: 20000,
            zoom: 1,
            position: [0, 0, 20],
            maxPolarAngle: 0.85,
          }}
        >
          <OrbitControls />
          <axesHelper args={[5]} />
          {/* <TextureScene /> */}
          {/* <Ttext /> */}
          {/* <Swarm count={isMobile ? 100 : 100} mouse={mouse} /> */}
          {/* <Number mouse={mouse} hover={hover} /> */}
          {/* <Lines count={10} mouse={mouse} colors={['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue']} /> */}
          {[...Array(1000)].map((x, i) => {
            return (
              <>
                {/* <Ssphere speed={0.01} key={Math.random()} /> */}
                {/* <Ssphere speed={0.005} key={Math.random()} /> */}
              </>
            );
          })}

          <Sparks colors={new THREE.Color(0xffffff)} count={10} />
          {/* <Effects disableGamma>
            <unrealBloomPass
              threshold={0.9}
              strength={intensity}
              radius={radius}
            /> */}
          {/* </Effects> */}

          {/* <EffectComposer>
 
            <Bloom
              luminanceThreshold={1}
              luminanceSmoothing={0.1}
              height={300}
            />

          </EffectComposer> */}
        </Canvas>
      </div>
      {/* <div id="text"></div> */}
      <div id="card">
        <img src="slide/card.jpg" />
      </div>
    </>
  );
}


export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});

// function Effect({ down }) {
//   const composer = useRef()
//   const { scene, gl, size, camera } = useThree()
//   const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [size])
//   useEffect(() => void composer.current.setSize(size.width, size.height), [size])
//   useFrame(() => composer.current.render(), 1)
//   return (
//     <effectComposer ref={composer} args={[gl]}>
//       <renderPass attachArray="passes" scene={scene} camera={camera} />
//       <waterPass attachArray="passes" factor={1.5} />
//       <unrealBloomPass attachArray="passes" args={[aspect, 2, 1, 0]} />
//       <glitchPass attachArray="passes" factor={down ? 1 : 0} />
//     </effectComposer>
//   )
// }

// function Ssphere({ speed, x }) {
//   const refmesh = useRef();
//   var ellipse = { x: -16.1, y: 5 };

//   // function dist() {
//   //   return (
//   //     Math.pow(refmesh.current.position.x - ellipse.x, 2) / Math.pow(0.1, 2) +
//   //     Math.pow(refmesh.current.position.y - ellipse.y, 2) / Math.pow(5, 2)
//   //   );
//   // }
//   useFrame(() => {
//     refmesh.current.position.x += 0.01;
//     // if (refmesh.current.position.x > -16.1+0.2 && Math.sin(refmesh.current.position.y / 10)>0.4 ) {
//     //   refmesh.current.position.x = -16.25+0;
//     // }

//     // console.log(dist());

//     if (
//       Math.pow(refmesh.current.position.x - ellipse.x, 2) / Math.pow(0.3, 2) +
//         Math.pow(refmesh.current.position.y - ellipse.y, 2) / Math.pow(5, 2) >
//       1
//     ) {
//       refmesh.current.position.x = -16.1;
//     }
//   });
//   return (
//     <mesh
//       ref={refmesh}
//       position={[, 10 * Math.random(), 0]}
//       scale={[0.01, 0.01, 0.01]}
//     >
//       <sphereGeometry args={[1, 1, 1]} />
//       {/* <meshBasicMaterial color="blue" /> */}
//       <meshBasicMaterial color={[0, 0, 255]} toneMapped={false} />
//     </mesh>
//   );
// }

// function gaussianRand() {
//   var rand = 0;

//   for (var i = 0; i < 6; i += 1) {
//     rand += Math.random();
//   }

//   return rand / 6;
// }

// function stdNormalDistribution(x) {
//   var p = Math.pow(Math.E, -Math.pow(x, 2) / 2) / Math.sqrt(2 * Math.PI);
//   // console.log(p);
//   return p;
// }
// function randn_bm() {
//   let u = 0,
//     v = 0;
//   while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
//   while (v === 0) v = Math.random();
//   let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
//   num = num / 10.0 + 0.5; // Translate to 0 -> 1
//   if (num > 1 || num < 0) return randn_bm(); // resample between 0 and 1

//   return num;
// }

// function Lines({ mouse, count, colors, radius = 15 }) {
//   const lines = useMemo(
//     () =>
//       new Array(count).fill().map(() => {
//         const pos = new THREE.Vector3(
//           Math.sin(0) * radius * r(),
//           Math.cos(0) * radius * r(),
//           0
//         );
//         const points = new Array(30).fill().map((_, index) => {
//           const angle = (index / 20) * Math.PI * 2;
//           return pos
//             .add(
//               new THREE.Vector3(
//                 Math.sin(angle) * radius * r(),
//                 Math.cos(angle) * radius * r(),
//                 0
//               )
//             )
//             .clone();
//         });
//         const curve = new THREE.CatmullRomCurve3(points).getPoints(1000);
//         return {
//           color: colors[parseInt(colors.length * Math.random())],
//           width: 0.1,
//           speed: Math.max(0.0005, 0.001 * Math.random()),
//           curve,
//         };
//       }),
//     [count]
//   );

//   const ref = useRef();
//   const { size, viewport } = useThree();
//   const aspect = size.width / viewport.width;
//   useFrame((state) => {
//     if (ref.current) {
//       ref.current.rotation.x = lerp(
//         ref.current.rotation.x,
//         0 + mouse.current[1] / aspect / 50,
//         0.1
//       );
//       ref.current.rotation.y = lerp(
//         ref.current.rotation.y,
//         0 + mouse.current[0] / aspect / 100,
//         0.1
//       );
//     }
//   });

//   return (
//     <group ref={ref}>
//       <group position={[-radius * 2, -radius, 0]}>
//         {lines.map((props, index) => (
//           <Fatline key={index} {...props} />
//         ))}
//       </group>
//     </group>
//   );
// }

