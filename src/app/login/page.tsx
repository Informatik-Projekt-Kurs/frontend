"use client";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle, FaArrowRight } from "react-icons/fa6";
import { IoLogInOutline } from "react-icons/io5";
import Image from "next/image";
import { useFormStatus, useFormState } from "react-dom";
import { loginUser } from "@/lib/authActions";
import cx from "classnames";
import React, { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { TooltipProvider, TooltipTrigger, Tooltip, TooltipContent } from "@/components/ui/tooltip";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full gap-2 text-background" disabled={pending}>
      <IoLogInOutline className="text-lg font-bold" />
      Log In
    </Button>
  );
};

const LoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [formState, formAction] = useFormState(loginUser, {
    message: "",
    errors: undefined,
    fieldValues: {
      email: "",
      password: ""
    }
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (formState.message === "success") {
      toast({
        title: "Logged In!",
        description: "Welcome back! You will be redirected any moment",
        variant: "default",
        className: "border-emerald-300"
      });
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    }
  }, [formState, toast, dispatch]);

  return (
    <React.Fragment>
      <Button
        onClick={() => {
          router.push("/company/setup");
        }}
        className="absolute right-4 top-4 bg-subtle px-6 text-foreground">
        Create a Company <FaArrowRight className="ml-2" />
      </Button>
      <div className="authBg flex min-h-screen w-screen flex-col items-center justify-center">
        <div className="my-8 flex items-center justify-center gap-x-2">
          <Image width={100} height={100} alt="" src="/landingLogo.png" className="size-16 select-none"></Image>
          <h1 className="text-3xl font-bold text-foreground">Meetmate</h1>
        </div>
        <div className="flex w-[70%] max-w-screen-sm flex-col items-center justify-center rounded-lg border-2 border-primary bg-background py-11 shadow-md shadow-primary max-sm:w-[90%]">
          <div className="flex h-3/5 w-[70%] max-w-[650px] flex-col items-center justify-center gap-y-4 max-sm:w-[85%]">
            <h2 className="text-3xl font-semibold">Log In</h2>
            <p className="text-base">
              Don&apos;t have an account yet?{" "}
              <Link className="text-primary hover:underline" href={"/signup"}>
                Sign Up
              </Link>
            </p>
            <Separator className="my-2 w-full bg-foreground" />
            <div className="flex items-center justify-center gap-x-4">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href="#" className="group pointer-events-none opacity-70" aria-label="Google Login">
                      <Button name="Google Login" variant="ghost" className="px-20 max-sm:px-8" size={"sm"}>
                        <FaGoogle className="text-3xl text-foreground transition-colors group-hover:text-primary" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="rounded-full border-border">
                    <p>Not available yet</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href="#" className="group pointer-events-none opacity-70" aria-label="Google Login">
                      <Button name="Github Login" variant="ghost" className="px-20 max-sm:px-8" size={"sm"}>
                        <FaGithub className="text-3xl text-foreground transition-colors group-hover:text-primary" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="rounded-full border-border">
                    <p>Not available yet</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="mb-8 flex h-1 w-full flex-row items-center justify-between text-foreground">
              <Separator className="w-[45%] bg-foreground" />
              <p className="flex w-[10%] items-center justify-center">or</p>
              <Separator className="w-[45%] bg-foreground" />
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
              <div className="flex items-center justify-start gap-x-2 text-foreground">
                <Checkbox defaultChecked id="remember" disabled style={{ opacity: 1 }} />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Remember me
                  </label>
                </div>
              </div>
              <Link className="cursor-not-allowed text-sm text-primary hover:underline" href={""}>
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
