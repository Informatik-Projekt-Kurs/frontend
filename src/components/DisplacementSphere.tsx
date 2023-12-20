import useSpline from "@splinetool/r3f-spline";
import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Scene({ ...props }) {
  const { nodes, materials } = useSpline("https://prod.spline.design/TwBXCflNDhiLkDMk/scene.splinecode");
  return (
    <Canvas>
      <color attach="background" args={["#4f5160"]} />
      <group {...props} dispose={null}>
        <scene name="Scene 1">
          <OrthographicCamera
            name="Camera"
            makeDefault={true}
            zoom={7.02}
            far={100000}
            near={-100000}
            position={[18.69, 261.15, 1000]}
            rotation={[0, 0, 0.61]}
          />
          <mesh
            name="Sphere"
            geometry={nodes.Sphere.geometry}
            material={materials["Sphere Material"]}
            position={[0, 40, -200]}
            rotation={[0.62, -0.95, 0.43]}
            scale={1}
          />
          <mesh
            name="Sphere1"
            geometry={nodes.Sphere1.geometry}
            material={materials["Sphere1 Material"]}
            position={[0, 11, 0]}
            rotation={[0.62, -0.95, 0.43]}
            scale={1}
          />
          <directionalLight
            name="Directional Light"
            intensity={0.7}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={-10000}
            shadow-camera-far={100000}
            shadow-camera-left={-1000}
            shadow-camera-right={1000}
            shadow-camera-top={1000}
            shadow-camera-bottom={-1000}
            position={[200, 300, 77.59]}
          />
          <OrthographicCamera name="1" makeDefault={false} far={10000} near={-50000} />
          <hemisphereLight name="Default Ambient Light" intensity={0.75} color="#eaeaea" />
        </scene>
      </group>
    </Canvas>
  );
}
