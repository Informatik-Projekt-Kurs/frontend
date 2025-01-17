"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { extractNameInitials } from "@/lib/utils";
import React from "react";
import { deleteToken } from "@/lib/authActions";
import Loader from "@/components/layout/Loader";
import { useCompany } from "@/contexts/CompanyContext";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@apollo/client";
import { EDIT_COMPANY } from "@/lib/graphql/mutations";
import HamburgerMenu from "@/components/dashboard/company/HamburgerMenu";

const formSchema = z.object({
  name: z.string().max(30).optional(),
  description: z.string().optional()
});

export default function Page() {
  const { user, loading, company, refreshCompany } = useCompany();
  const { toast } = useToast();

  const [editCompany] = useMutation(EDIT_COMPANY);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: company?.getCompany?.name,
      description: company?.getCompany?.description
    }
  });

  const logout = async () => {
    try {
      await deleteToken();
      window.location.reload();
    } catch (logoutError) {
      console.error("Logout failed", logoutError);
      throw logoutError;
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await editCompany({
      variables: { companyName: values.name, description: values.description },
      onCompleted: () => {
        toast({
          title: "Company Settings updated",
          variant: "default",
          className: "border-emerald-300"
        });
        void refreshCompany();
      },
      onError: (err) => {
        console.error(err);
      }
    });
  }

  if (loading) return <Loader />;

  return (
    <div className="flex h-[calc(100%-32px)] flex-col items-start justify-start p-8 px-6">
      <header className="flex w-full flex-row items-center justify-between">
        <h1 className="m-4 font-medium text-foreground md:text-2xl">Company Settings</h1>
        <div className="flex items-center gap-x-2">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild className={"mr-4"}>
              <Button variant="ghost" className="relative size-8 rounded-full">
                <Avatar className="size-10">
                  <AvatarFallback className={"bg-primary"}>{extractNameInitials(user?.name)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={"end"} className={"w-56 border-border"}>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className={"text-red-500"}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <HamburgerMenu />
        </div>
      </header>

      <div className="mt-8 flex h-[600px] w-full flex-col rounded-[20px] px-12">
        <div className={"mt-6 flex h-[200px] w-full items-center justify-between"}>
          <div className={"flex flex-row items-center justify-center"}>
            <div
              className={
                "hidden size-[200px] items-center justify-center rounded-full bg-primary text-6xl font-medium text-foreground md:flex"
              }>
              {extractNameInitials(company?.getCompany.name)}
            </div>
            <div className={"flex flex-col md:ml-12"}>
              <h1 className={"text-4xl font-semibold"}>{company?.getCompany.name}</h1>
            </div>
          </div>
        </div>
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
                      <Input defaultValue={company?.getCompany?.name} placeholder="Company Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        defaultValue={company?.getCompany?.description}
                        placeholder="Enter Company Description..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      It is also recommended to add an email address to the description in case clients want to cancel
                      an appointment or have any questions.
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
