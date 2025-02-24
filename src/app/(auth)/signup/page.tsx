"use client";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FaArrowRight, FaGithub, FaGoogle } from "react-icons/fa6";
import { IoLogInOutline } from "react-icons/io5";
import Image from "next/image";
import React, { useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { registerUser } from "@/lib/authActions.server";
import { toast } from "sonner";
import cx from "classnames";
import { useRouter } from "next/navigation";
import { TooltipProvider, TooltipTrigger, Tooltip, TooltipContent } from "@/components/ui/tooltip";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="text-background w-full gap-2" disabled={pending}>
      <IoLogInOutline className="text-lg font-bold" />
      Create Account
    </Button>
  );
};

const SignupForm = () => {
  const router = useRouter();
  const [formState, formAction] = useActionState(registerUser, {
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
      toast.success("Signed Up!", {
        description: "Success! You will be redirected any moment to sign into your account"
      });
      setTimeout(() => {
        router.push("/login");
      }, 2500);
    }
  }, [formState, toast]);

  return (
    <React.Fragment>
      <Button
        onClick={() => {
          router.push("/company/setup");
        }}
        className="bg-subtle text-foreground absolute top-4 right-4 px-6">
        Create a Company <FaArrowRight className="ml-2" />
      </Button>
      <div className="authBg flex min-h-screen w-screen flex-col items-center justify-center">
        <div className="my-8 flex items-center justify-center gap-x-2">
          <Image width={100} height={100} alt="" src="/landingLogo.png" className="size-16 select-none"></Image>
          <h1 className="text-foreground text-3xl font-bold">Meetmate</h1>
        </div>
        <div className="border-primary bg-background shadow-primary flex w-[70%] max-w-screen-sm flex-col items-center justify-center rounded-lg border-2 py-11 shadow-md max-sm:w-[90%]">
          <div className="flex h-3/5 w-[70%] max-w-[650px] flex-col items-center justify-center gap-y-4 max-sm:w-[85%]">
            <h2 className="text-3xl font-semibold">Sign Up</h2>
            <p className="text-base">
              Already have an account?{" "}
              <Link className="text-primary hover:underline" href={"/login"}>
                Log In
              </Link>
            </p>
            <Separator className="bg-foreground my-2 w-full" />
            <div className="flex items-center justify-center gap-x-4">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="#" className="group pointer-events-none opacity-70" aria-label="Google Login">
                      <Button name="Google Login" variant="ghost" className="px-20 max-sm:px-8" size={"sm"}>
                        <FaGoogle className="text-foreground group-hover:text-primary text-3xl transition-colors" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="border-border rounded-full">
                    <p>Not available yet</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="#" className="group pointer-events-none opacity-70" aria-label="Google Login">
                      <Button name="Github Login" variant="ghost" className="px-20 max-sm:px-8" size={"sm"}>
                        <FaGithub className="text-foreground group-hover:text-primary text-3xl transition-colors" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="border-border rounded-full">
                    <p>Not available yet</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="text-foreground mb-4 flex h-1 w-full flex-row items-center justify-between">
              <Separator className="bg-foreground w-[45%]" />
              <p className="flex w-[10%] items-center justify-center">or</p>
              <Separator className="bg-foreground w-[45%]" />
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
                <div className="text-foreground flex items-center justify-start gap-x-1">
                  <Checkbox defaultChecked id="terms" disabled style={{ opacity: 1 }} />
                  <div className="grid leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      I agree to the{" "}
                      <Link href="#" className="text-primary text-sm hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-primary text-sm hover:underline">
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
