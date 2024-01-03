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

type CompanyAuthObject = {
  id: number;
  name: string;
  email: string;
  role: string;
} | null;

type LoginInputs = {
  email: string;
  password: string;
};

type RegisterInputs = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};
