import { ReactThreeFiber } from "@react-three/fiber";
import { ShaderMaterialParameters } from "three";
import { shaderMaterial } from "@react-three/drei";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      customShaderMaterial: ReactThreeFiber.Node<ShaderMaterialParameters, typeof shaderMaterial>;
    }
  }
}

type User = {
  id: string;
  name: string;
  email: string;
  admin: boolean;
};
