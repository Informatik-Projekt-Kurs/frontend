import { Canvas } from "@react-three/fiber";

function Scene() {
  return (
    <Canvas>
      <mesh visible userData={{ test: "hello" }} position={[0, 0, 0]} castShadow>
        <sphereGeometry attach="geometry" args={[1, 16, 16]} />
        <meshStandardMaterial attach="material" color="white" transparent roughness={0.1} metalness={0.1} />
      </mesh>
      <rectAreaLight
        width={3}
        height={3}
        color={"white"}
        intensity={10}
        position={[-2, 0, 5]}
        lookAt={[0, 0, 0]}
        penumbra={1}
        castShadow
      />
    </Canvas>
  );
}

export default Scene;
