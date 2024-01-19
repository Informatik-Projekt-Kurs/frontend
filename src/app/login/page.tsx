"use client";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { IoLogInOutline } from "react-icons/io5";
import Image from "next/image";
import { useFormStatus, useFormState } from "react-dom";
import { loginUser } from "@/lib/actions";
import cx from "classnames";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full gap-2 text-foreground" disabled={pending}>
      <IoLogInOutline className="font-bold text-lg" />
      Log In
    </Button>
  );
}

const LoginForm = () => {
  const { toast } = useToast();
  const [formState, formAction] = useFormState(loginUser, {
    message: "",
    errors: undefined,
    fieldValues: {
      email: "",
      password: ""
    }
  });

  useEffect(() => {
    if (formState.message === "success") {
      toast({
        title: "Logged In!",
        description: "Welcome back! You will be redirected any moment",
        variant: "default",
        className: "border-emerald-300"
      });
    }
  }, [formState, toast]);

  return (
    <div className="w-screen min-h-screen flex justify-center items-center flex-col authBg">
      <div className="flex justify-center items-center gap-x-2 my-8">
        <Image width={100} height={100} alt="" src="/landingLogo.png" className="w-16 h-16 select-none"></Image>
        <h1 className="text-foreground text-3xl font-bold">Meetmate</h1>
      </div>
      <div className="max-w-screen-sm w-[70%] max-sm:w-[90%] py-11 border-primary border-2 rounded-lg shadow-md shadow-primary flex justify-center items-center flex-col bg-background">
        <div className="flex justify-center items-center flex-col w-[70%] max-sm:w-[85%] h-[60%] gap-y-4 max-w-[650px]">
          <h2 className="text-3xl font-semibold">Log In</h2>
          <p className="text-base">
            Don&apos;t have an account yet?{" "}
            <Link className="text-primary hover:underline" href="/signup">
              Sign Up
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
              placeholder="Email"
              required
              name="email"
              className={cx(
                "text-foreground bg-background border-primary",
                formState.errors?.email && "border-red-700"
              )}
            />

            <Input
              placeholder="Password"
              required
              name="password"
              type="password"
              className={cx(
                "text-foreground bg-background border-primary",
                formState.errors?.password && "border-red-700"
              )}
            />

            {formState?.message === "error" ? (
              <div className="flex justify-start items-start mt-[-10px] mb-[-10px] flex-col">
                <p className="text-red-700 text-sm empty:hidden">{formState?.errors?.email}</p>
                <p className="text-red-700 text-sm empty:hidden">{formState?.errors?.password}</p>
              </div>
            ) : (
              ""
            )}
            <div className="w-full flex justify-between items-center">
              <div className="flex justify-start items-center text-foreground gap-x-2">
                <Checkbox defaultChecked id="remember" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Remember me
                  </label>
                </div>
              </div>
              <Link className="text-primary hover:underline text-sm" href="/forgot-password">
                Forgot password?
              </Link>
            </div>
            <SubmitButton />
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col my-8">
        <h1 className="text-2xl font-semibold text-center">Welcome back</h1>
        <h3 className="text-center mx-10">To keep connected with us please login with your info </h3>
      </div>
    </div>
  );
};

export default LoginForm;
