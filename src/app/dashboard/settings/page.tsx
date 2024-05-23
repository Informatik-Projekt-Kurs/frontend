"use client";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useDashboardData } from "@/components/dashboard/DashboardContext";

const FormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters."
  }),
  email: z.string().email({ message: "Please enter a valid email address." })
});

function Settings() {
  const user = useDashboardData().user;
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    });
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: ""
    }
  });

  useEffect(() => {
    form.reset({
      name: user?.name,
      email: user?.email
    });
  }, [user]);

  return (
    <div className="flex h-[calc(100%-32px)] flex-col items-start justify-start p-8 px-6">
      <header className="flex w-full flex-row items-center justify-between">
        <h1 className="m-4 font-medium text-foreground md:text-2xl">Settings</h1>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="ml-6 flex flex-col gap-4 text-foreground">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input className="w-[320px]" placeholder="Name" {...field}></Input>
                </FormControl>
                <FormDescription>This is your display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="w-[320px]" placeholder="Email" {...field}></Input>
                </FormControl>
                <FormDescription>This is your email address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className={"w-1/4 self-end"}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Settings;
