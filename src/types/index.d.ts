import { type ReactThreeFiber } from "@react-three/fiber";
import { type ShaderMaterialParameters } from "three";
import { type shaderMaterial } from "@react-three/drei";

declare global {
  namespace JSX {
    type IntrinsicElements = {
      customShaderMaterial: ReactThreeFiber.Node<ShaderMaterialParameters, typeof shaderMaterial>;
    };
  }
}

type CompanyAuthObject = {
  id: number;
  name: string;
  email: string;
  role: string;
} | null;
