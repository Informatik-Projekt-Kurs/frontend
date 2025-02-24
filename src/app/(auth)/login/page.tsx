"use client";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle, FaArrowRight } from "react-icons/fa6";
import { IoLogInOutline } from "react-icons/io5";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { loginUser } from "@/lib/authActions.server";
import cx from "classnames";
import React, { useEffect, useActionState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TooltipProvider, TooltipTrigger, Tooltip, TooltipContent } from "@/components/ui/tooltip";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="text-background w-full gap-2" disabled={pending}>
      <IoLogInOutline className="text-lg font-bold" />
      Log In
    </Button>
  );
};

const LoginForm = () => {
  const router = useRouter();
  const [formState, formAction] = useActionState(loginUser, {
    message: "",
    errors: undefined,
    fieldValues: {
      email: "",
      password: ""
    }
  });

  useEffect(() => {
    if (formState.message === "success") {
      toast.success("Logged In!", { description: "Redirecting to dashboard..." });
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
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
            <h2 className="text-3xl font-semibold">Log In</h2>
            <p className="text-base">
              Don&apos;t have an account yet?{" "}
              <Link className="text-primary hover:underline" href={"/signup"}>
                Sign Up
              </Link>
            </p>
            <Separator className="bg-foreground my-2 w-full" />
            <div className="flex items-center justify-center gap-x-4">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href="#" className="group pointer-events-none opacity-70" aria-label="Google Login">
                      <Button name="Google Login" variant="ghost" className="px-20 max-sm:px-8" size={"sm"}>
                        <FaGoogle className="text-foreground group-hover:text-primary text-3xl transition-colors" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="border-border bg-background rounded-full">
                    <p>Not available yet</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href="#" className="group pointer-events-none opacity-70" aria-label="Google Login">
                      <Button name="Github Login" variant="ghost" className="px-20 max-sm:px-8" size={"sm"}>
                        <FaGithub className="text-foreground group-hover:text-primary text-3xl transition-colors" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="border-border rounded-full">
                    <p>Not available yet</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="text-foreground mb-8 flex h-1 w-full flex-row items-center justify-between">
              <Separator className="bg-foreground w-[45%]" />
              <p className="flex w-[10%] items-center justify-center">or</p>
              <Separator className="bg-foreground w-[45%]" />
            </div>
          </div>

          <form action={formAction} className="flex size-full w-[70%] flex-col justify-center gap-y-6">
            <Input
              placeholder="Email"
              required
              name="email"
              className={cx(
                "border-primary bg-background text-foreground",
                formState.errors?.email !== undefined && "border-red-700"
              )}
            />

            <Input
              placeholder="Password"
              required
              name="password"
              type="password"
              className={cx(
                "border-primary bg-background text-foreground",
                formState.errors?.password !== undefined && "border-red-700"
              )}
            />

            {formState?.message === "error" && (
              <div className="my-[-10px] flex flex-col items-start justify-start">
                <p className="text-sm text-red-700 empty:hidden">{formState.errors?.email}</p>
                <p className="text-sm text-red-700 empty:hidden">{formState.errors?.password}</p>
              </div>
            )}
            <div className="flex w-full items-center justify-between">
              <div className="text-foreground flex items-center justify-start gap-x-2">
                <Checkbox defaultChecked id="remember" disabled style={{ opacity: 1 }} />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="remember"
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Remember me
                  </label>
                </div>
              </div>
              <Link className="text-primary cursor-not-allowed text-sm hover:underline" href={""}>
                Forgot password?
              </Link>
            </div>
            <SubmitButton />
          </form>
        </div>
        <div className="my-8 flex flex-col items-center justify-center">
          <h1 className="text-center text-2xl font-semibold">Welcome back</h1>
          <h2 className="mx-10 text-center">To keep connected with us please login with your info </h2>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
