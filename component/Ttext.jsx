import { useRef, useState, useEffect } from "react";

import { useFrame, extend } from "@react-three/fiber";
import { Text} from "@react-three/drei";
import * as THREE from "three";

export default function Ttext() {
  const reftext = useRef();
  const reftext2 = useRef("rr");
  const [textContent, setTextContent] = useState();
  // const [textContent2, setTextContent2] = useState("fdg");
  // const [textContent3, setTextContent3] = useState("AAAdgdAA");
  var bb = "";

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

  useEffect(() => {
    setInterval(() => {
      bb ="";
      var aa = [...Array(10)].map((x, i) => {
        bb+=randomString(20)
        bb+=("\r\n");
      });
      console.log(bb)
      setTextContent(bb);
    }, 2000);
  }, []);

  return (
    <>
      {/* <Html
        // transform
        // distanceFactor={20}
        position={[5, -2, 0]}
        style={{
          width: "50px",
        }}
        backgroundColor="red"
      > */}
        {/* {[...Array(10)].map((x, i) => { */}
          {/* return ( */}
            <>
              <Text
                // ref={reftext}
                scale={[0.5, 0.5, 0.5]}
                anchorX="middle" // default
                anchorY="middle" // default
                color="white"
                toneMapped={true}
                position={[10, 0, 0]}
                // font={"/slide/Roboto-Regular.ttf"}
                outlineWidth="1%"
                outlineColor="grey"
                textAlign="justify"
              >
                {textContent}
              </Text>
            </>
          {/* ); */}
        {/* })} */}
      {/* </Html> */}
    </>
  );
}
