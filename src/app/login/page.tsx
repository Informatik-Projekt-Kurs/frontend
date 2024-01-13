"use client";
import { login } from "@/services/authService";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { IoLogInOutline } from "react-icons/io5";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { FetchEventResult } from "next/dist/server/web/types";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email" }).min(5),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" })
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const result = (await login(dispatch, values)) as PromiseFulfilledResult<FetchEventResult>;
      setError(result?.status === undefined ? "Invalid email or password" : "");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Invalid email or password");
      setLoading(false);
      throw error;
    }
  }

  return (
    <div className="w-screen min-h-screen flex justify-center items-center flex-col authBg">
      <div className="flex justify-center items-center gap-x-2 my-8">
        <Image width={100} height={100} alt="" src="/landingLogo.png" className="w-16 h-16 select-none"></Image>
        <h1 className="text-foreground text-3xl font-bold">Meetmate</h1>
      </div>
      <div className="max-w-screen-sm w-[70%] max-sm:w-[90%] py-11 border-primary border-2 rounded-lg shadow-md shadow-primary flex justify-center items-center flex-col bg-subtle">
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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full flex justify-center flex-col gap-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        className="border-primary text-foreground"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        className="border-primary text-foreground"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-red-800">{error}</p>}
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
              <Button type="submit" className="w-full gap-2 text-foreground" disabled={loading}>
                <IoLogInOutline className="font-bold text-lg" />
                Log In
              </Button>
            </form>
          </Form>
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
