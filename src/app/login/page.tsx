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
import { getUser, loginUser } from "@/lib/actions";
import cx from "classnames";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { setIsAuthenticated, setUser } from "@/store/features/authSlice";
import { useDispatch } from "react-redux";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full gap-2 text-foreground" disabled={pending}>
      <IoLogInOutline className="text-lg font-bold" />
      Log In
    </Button>
  );
};

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
  const dispatch = useDispatch();

  useEffect(() => {
    if (formState.message === "success") {
      void getUser().then((user) => {
        dispatch(setUser(user));
        dispatch(setIsAuthenticated(true));
      });
      toast({
        title: "Logged In!",
        description: "Welcome back! You will be redirected any moment",
        variant: "default",
        className: "border-emerald-300"
      });
    }
  }, [formState, toast, dispatch]);

  return (
    <div className="authBg flex min-h-screen w-screen flex-col items-center justify-center">
      <div className="my-8 flex items-center justify-center gap-x-2">
        <Image width={100} height={100} alt="" src="/landingLogo.png" className="size-16 select-none"></Image>
        <h1 className="text-3xl font-bold text-foreground">Meetmate</h1>
      </div>
      <div className="flex w-[70%] max-w-screen-sm flex-col items-center justify-center rounded-lg border-2 border-primary bg-background py-11 shadow-md shadow-primary max-sm:w-[90%]">
        <div className="flex h-[60%] w-[70%] max-w-[650px] flex-col items-center justify-center gap-y-4 max-sm:w-[85%]">
          <h2 className="text-3xl font-semibold">Log In</h2>
          <p className="text-base">
            Don&apos;t have an account yet?{" "}
            <Link className="text-primary hover:underline" href="/signup">
              Sign Up
            </Link>
          </p>
          <Separator className="my-2 w-full bg-foreground" />
          <div className="flex items-center justify-center gap-x-4">
            <Link href="#" className="group">
              <Button variant="ghost" className="px-20 max-sm:px-8" size={"sm"}>
                <FaGoogle className="text-3xl text-foreground transition-colors group-hover:text-primary" />
              </Button>
            </Link>
            <Link href="#" className="group">
              <Button variant="ghost" className="px-20 max-sm:px-8" size={"sm"}>
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
              placeholder="Email"
              required
              name="email"
              className={cx(
                "text-foreground bg-background border-primary",
                formState.errors?.email !== null && "border-red-700"
              )}
            />

            <Input
              placeholder="Password"
              required
              name="password"
              type="password"
              className={cx(
                "text-foreground bg-background border-primary",
                formState.errors?.password !== null && "border-red-700"
              )}
            />

            {formState?.message === "error" && (
              <div className="my-[-10px] flex flex-col items-start justify-start">
                <p className="text-sm text-red-700 empty:hidden">{formState?.errors?.email}</p>
                <p className="text-sm text-red-700 empty:hidden">{formState?.errors?.password}</p>
              </div>
            )}
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center justify-start gap-x-2 text-foreground">
                <Checkbox defaultChecked id="remember" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Remember me
                  </label>
                </div>
              </div>
              <Link className="text-sm text-primary hover:underline" href="/forgot-password">
                Forgot password?
              </Link>
            </div>
            <SubmitButton />
          </form>
        </div>
      </div>
      <div className="my-8 flex flex-col items-center justify-center">
        <h1 className="text-center text-2xl font-semibold">Welcome back</h1>
        <h3 className="mx-10 text-center">To keep connected with us please login with your info </h3>
      </div>
    </div>
  );
};

export default LoginForm;
