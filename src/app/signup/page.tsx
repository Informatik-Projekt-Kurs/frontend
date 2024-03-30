"use client";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FaArrowRight, FaGithub, FaGoogle } from "react-icons/fa6";
import { IoLogInOutline } from "react-icons/io5";
import Image from "next/image";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { registerUser } from "@/lib/actions";
import { useToast } from "@/components/ui/use-toast";
import cx from "classnames";
import { useRouter } from "next/navigation";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full gap-2 text-background" disabled={pending}>
      <IoLogInOutline className="text-lg font-bold" />
      Create Account
    </Button>
  );
};

const SignupForm = () => {
  const { toast } = useToast();
  const router = useRouter();
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

  useEffect(() => {
    if (formState.message === "success") {
      toast({
        title: "Signed Up!",
        description: "Success! Check your email to verify your account.",
        variant: "default",
        className: "border-emerald-300"
      });
    }
  }, [formState, toast]);

  return (
    <React.Fragment>
      <Button onClick={() => { router.push("/setup"); }} className="absolute right-4 top-4 bg-subtle px-6 text-foreground">
        Create a Company <FaArrowRight className="ml-2" />
      </Button>
      <div className="authBg flex min-h-screen w-screen flex-col items-center justify-center">
        <div className="my-8 flex items-center justify-center gap-x-2">
          <Image width={100} height={100} alt="" src="/landingLogo.png" className="size-16 select-none"></Image>
          <h1 className="text-3xl font-bold text-foreground">Meetmate</h1>
        </div>
        <div className="flex w-[70%] max-w-screen-sm flex-col items-center justify-center rounded-lg border-2 border-primary bg-background py-11 shadow-md shadow-primary max-sm:w-[90%]">
          <div className="flex h-[60%] w-[70%] max-w-[650px] flex-col items-center justify-center gap-y-4 max-sm:w-[85%]">
            <h2 className="text-3xl font-semibold">Sign Up</h2>
            <p className="text-base">
              Already have an account?{" "}
              <Link className="text-primary hover:underline" href={"/login"}>
                Log In
              </Link>
            </p>
            <Separator className="my-2 w-full bg-foreground" />
            <div className="flex items-center justify-center gap-x-4">
              <Link href="#" className="group" aria-label="Google Login">
                <Button name="Google Login" variant="ghost" className="px-20 max-sm:px-8" size={"sm"}>
                  <FaGoogle className="text-3xl text-foreground transition-colors group-hover:text-primary" />
                </Button>
              </Link>
              <Link href="#" className="group" aria-label="Github Login">
                <Button name="Github Login" variant="ghost" className="px-20 max-sm:px-8" size={"sm"}>
                  <FaGithub className="text-3xl text-foreground transition-colors group-hover:text-primary" />
                </Button>
              </Link>
            </div>

            <div className="mb-4 flex h-1 w-full flex-row items-center justify-between text-foreground">
              <Separator className="w-[45%] bg-foreground" />
              <p className="flex w-[10%] items-center justify-center">or</p>
              <Separator className="w-[45%] bg-foreground" />
            </div>

            <form action={formAction} className="flex size-full flex-col justify-center gap-y-6">
              <Input
                name="name"
                placeholder="Name"
                required
                type="text"
                className={cx(
                  "border-primary bg-background text-foreground",
                  formState.errors?.name !== undefined && "border-red-700"
                )}
              />
              <Input
                name="email"
                placeholder="Email"
                required
                className={cx(
                  "border-primary bg-background text-foreground",
                  formState.errors?.email !== undefined && "border-red-700"
                )}
              />
              <Input
                placeholder="Password"
                name="password"
                required
                type="password"
                className={cx(
                  "border-primary bg-background text-foreground",
                  formState.errors?.password !== undefined && "border-red-700"
                )}
              />

              <Input
                placeholder="Repeat Password"
                name="confirmPassword"
                required
                type="password"
                className={cx(
                  "border-primary bg-background text-foreground",
                  formState.errors?.confirmPassword !== undefined && "border-red-700"
                )}
              />
              {formState?.message === "error" && (
                <div className="my-[-10px] flex flex-col items-start justify-start">
                  <p className="text-sm text-red-700 empty:hidden">{formState?.errors?.name}</p>
                  <p className="text-sm text-red-700 empty:hidden">{formState?.errors?.email}</p>
                  <p className="text-sm text-red-700 empty:hidden">{formState?.errors?.password}</p>
                  <p className="text-sm text-red-700 empty:hidden">{formState?.errors?.confirmPassword}</p>
                </div>
              )}
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center justify-start gap-x-1 text-foreground">
                  <Checkbox defaultChecked id="terms" />
                  <div className="grid leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      I agree to the{" "}
                      <Link href="#" className="text-sm text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-sm text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>
              </div>
              <SubmitButton />
            </form>
          </div>
        </div>
        <div className="my-8 flex flex-col items-center justify-center">
          <h1 className="text-center text-2xl font-semibold">Hello, friend!</h1>
          <h2 className="mx-10 text-center">Enter your personal details and start journey with us</h2>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignupForm;
