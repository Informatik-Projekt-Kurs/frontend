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

export type CompanyAuthObject = {
  id: number;
  name: string;
  email: string;
  role: string;
} | null;

export type LoginInputs = {
  email: string;
  password: string;
};

export type RegisterInputs = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};
