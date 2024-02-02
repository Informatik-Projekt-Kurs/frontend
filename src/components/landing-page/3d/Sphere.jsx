/* eslint-disable */
import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import * as THREE from "three";
import { fragmentShader } from "./fragmentShader";
import { vertexShader } from "./vertexShader";
import * as TWEEN from "@tweenjs/tween.js";

function Sphere() {
  const meshRef = React.useRef(null);
  const start = React.useRef(Date.now());
  const uniforms = React.useRef(
    THREE.UniformsUtils.merge([THREE.UniformsLib.lights, THREE.ShaderLib.phong.uniforms, { time: { value: 0 } }])
  );
  const { camera, size } = useThree();
  camera.position.setZ(42);
  camera.position.setX(40);
  camera.position.setY(25);

  useFrame(() => {
    const elapsed = Date.now() - start.current;
    uniforms.current.time.value = 0.00005 * elapsed;
    meshRef.current.rotation.z += 0.001;
    TWEEN.update();
  });

  React.useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      camera.updateProjectionMatrix();

      if (windowWidth <= 696) {
        meshRef.current.position.set(14, 10, 0);
      } else if (windowWidth <= 1024) {
        meshRef.current.position.set(18, 14, 0);
      } else {
        meshRef.current.position.set(22, 16, 0);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      TWEEN.removeAll();
      window.removeEventListener("resize", handleResize);
    };
  }, [camera, size]);

  useEffect(() => {
    const onCanvasMouseMove = (event) => {
      const position = {
        x: event.clientX / size.width,
        y: event.clientY / size.height
      };

      const targetRotation = {
        x: position.y / 2,
        y: position.x / 2
      };

      // Tween update for smooth transition
      if (meshRef.current) {
        TWEEN.removeAll();
        new TWEEN.Tween(meshRef.current.rotation)
          .to({ x: targetRotation.x, y: targetRotation.y }, 2000)
          .easing(TWEEN.Easing.Quartic.Out)
          .start();
      }
    };

    window.addEventListener("mousemove", onCanvasMouseMove);

    return () => {
      window.removeEventListener("mousemove", onCanvasMouseMove);
    };
  }, [size]);

  const CustomShaderMaterial = shaderMaterial(uniforms.current, vertexShader, fragmentShader);

  extend({ CustomShaderMaterial });
  return (
    <mesh visible ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[32, 128, 128]} />
      <customShaderMaterial uniforms={uniforms.current} lights={true} />
    </mesh>
  );
}

export default Sphere;
