"use client";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { IoLogInOutline } from "react-icons/io5";
import Image from "next/image";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { registerUser } from "@/lib/actions";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full gap-2 text-foreground" disabled={pending}>
      <IoLogInOutline className="font-bold text-lg" />
      Create Account
    </Button>
  );
};

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const [formState, formAction] = useFormState(registerUser, {
    message: "",
    errors: undefined,
    fieldValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  return (
    <div className="w-screen min-h-screen flex justify-center items-center flex-col authBg">
      <div className="flex justify-center items-center gap-x-2 my-8">
        <Image width={100} height={100} alt="" src="/landingLogo.png" className="w-16 h-16 select-none"></Image>
        <h1 className="text-foreground text-3xl font-bold">Meetmate</h1>
      </div>
      <div className="max-w-screen-sm w-[70%] max-sm:w-[90%] py-11 border-primary border-2 rounded-lg shadow-md shadow-primary flex justify-center items-center flex-col bg-background">
        <div className="flex justify-center items-center flex-col w-[70%] max-sm:w-[85%] h-[60%] gap-y-4 max-w-[650px]">
          <h2 className="text-3xl font-semibold">Sign Up</h2>
          <p className="text-base">
            Already have an account?{" "}
            <Link className="text-primary hover:underline" href="/login">
              Log In
            </Link>
          </p>
          <Separator className="w-full my-2 bg-foreground" />
          <div className="flex justify-center items-center gap-x-4">
            <Link href="#" className="group">
              <Button variant="ghost" className="px-20 max-sm:px-8" size={"sm"}>
                <FaGoogle className="text-foreground text-3xl group-hover:text-primary transition-colors" />
              </Button>
            </Link>
            <Link href="#" className="group">
              <Button variant="ghost" className="px-20 max-sm:px-8" size={"sm"}>
                <FaGithub className="text-foreground text-3xl group-hover:text-primary transition-colors" />
              </Button>
            </Link>
          </div>

          <div className="flex justify-between items-center flex-row w-full text-foreground h-1 mb-4">
            <Separator className="w-[45%] bg-foreground" />
            <p className="w-[10%] flex justify-center items-center">or</p>
            <Separator className="w-[45%] bg-foreground" />
          </div>

          <form action={formAction} className="w-full h-full flex justify-center flex-col gap-y-6">
            <Input
              name="name"
              placeholder="Name"
              type="text"
              className="border-primary text-background"
              disabled={loading}
            />
            <Input name="email" placeholder="Email" className="border-primary text-background" disabled={loading} />
            <Input
              placeholder="Password"
              name="password"
              type="password"
              className="border-primary text-foreground"
              disabled={loading}
            />

            <Input
              placeholder="Repeat Password"
              name="confirmPasword"
              type="password"
              className="border-primary text-foreground"
              disabled={loading}
            />
            {error && <p className="text-red-800">{error}</p>}
            <div className="w-full flex justify-between items-center">
              <div className="flex justify-start items-center text-foreground gap-x-1">
                <Checkbox defaultChecked id="terms" />
                <div className="grid leading-none">
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I agree to the{" "}
                    <Link href="#" className="text-primary hover:underline text-sm">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-primary hover:underline text-sm">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full gap-2 text-foreground" disabled={loading}>
              <IoLogInOutline className="font-bold text-lg" />
              Create Account
            </Button>
            <SubmitButton />
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col my-8">
        <h1 className="text-2xl font-semibold text-center">Hello, friend!</h1>
        <h3 className="text-center mx-10">Enter your personal details and start journey with us</h3>
      </div>
    </div>
  );
};

export default SignupForm;
