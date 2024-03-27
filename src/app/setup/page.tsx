"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

function Setup() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inputs, setInputs] = React.useState({ name: "", ownerEmail: "", ownerName: "", ownerPassword: "", logo: "" });
  return (
    <div className={"flex h-screen flex-col items-center justify-start"}>
      <div className={"flex h-1/6 items-center justify-center gap-2"}>
        <Image src={"/landingLogo.png"} width={40} height={40} alt={""} />
        <h1 className={"text-2xl font-semibold"}>MeetMate</h1>
      </div>
      <div className={"mt-[-16.667svh] flex h-full flex-col items-center justify-center"}>
        <Input
          maxLength={45}
          placeholder="Full Company Name"
          className={"border-0 text-lg font-medium text-foreground focus-visible:ring-0"}
        />
        <Progress className={"h-1 max-sm:w-[350px] sm:w-[450px] md:w-[600px] lg:w-[960px]"} value={33} />
        <Button className={"mt-2 self-end"}>Next</Button>
      </div>
    </div>
  );
}

export default Setup;
