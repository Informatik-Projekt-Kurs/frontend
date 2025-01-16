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
import { editUser, getAccessToken } from "@/lib/authActions";

const FormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters."
  }),
  email: z.string().email({ message: "Please enter a valid email address." })
});

function Settings() {
  const { user } = useDashboardData();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const accessToken = await getAccessToken();
    await editUser(data.name, accessToken).finally(() => {
      toast({
        title: "User Data Updated",
        variant: "default",
        className: "border-emerald-300"
      });
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
    <div className="flex h-[calc(100svh-32px)] flex-col items-start justify-start p-8 px-6 lg:h-[calc(100svh-96px)]">
      <header className="flex w-full flex-row items-center justify-between">
        <h1 className="m-4 text-2xl font-medium text-foreground">Settings</h1>
      </header>
      <div className="flex h-[600px] w-full max-w-[500px] flex-col rounded-[20px] px-6">
        <p className={"mt-10 text-foreground"}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input defaultValue={user?.name} placeholder="Display Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input defaultValue={user?.email} placeholder="Email Address" disabled={true} {...field} />
                    </FormControl>
                    <FormDescription>
                      Your email address cannot be changed currently. Instead, submit a request to
                      &quot;boeckmannben@gmail.com&quot;
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type={"submit"}>Submit</Button>
            </form>
          </Form>
        </p>
      </div>
    </div>
  );
}

export default Settings;
