/* eslint-disable react/no-unknown-property */
"use client";
import { Canvas } from "@react-three/fiber";
import Sphere from "./Sphere";

function Scene() {
  return (
    <Canvas>
      <directionalLight color={0xffffff} intensity={2} position={[100, 100, 200]} />
      <ambientLight color={0xffffff} intensity={0.2} />
      <Sphere />
    </Canvas>
  );
}

export default Scene;
