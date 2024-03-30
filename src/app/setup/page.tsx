"use client";
import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

function Setup() {
  const [step, setStep] = React.useState(0);
  type Inputs = {
    "Full Company Name": string;
    "CEO Email": string;
    "CEO Name": string;
    "CEO Password": string;
    "Company Logo": string;
  };

  const [inputs, setInputs] = React.useState<Inputs>({
    "Full Company Name": "",
    "CEO Email": "",
    "CEO Name": "",
    "CEO Password": "",
    "Company Logo": ""
  });

  const placeholders = ["Full Company Name", "CEO Email", "CEO Name", "CEO Password", "Company Logo"];
  const input: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
  const [error, setError] = React.useState<string>("");
  const nextStep = () => {
    if (input.current?.value === "") {
      setError("Please fill in the input field");
      return;
    } else setError("");
    if (input.current?.validity.valid === false) {
      setError("Please enter a valid email");
      return;
    } else setError("");
    setStep(step + 1);
  };
  const submit = () => {
    if (input.current?.value === "") {
      setError("Please fill in the input field");
      return;
    } else setError("");
    if (input.current?.validity.valid === false) {
      setError("Please enter a valid password");
      return;
    } else setError("");
    console.log(inputs); // send request here
  };
  return (
    <div className={"flex h-screen flex-col items-center justify-start"}>
      <div className={"flex h-1/6 items-center justify-center gap-2"}>
        <Image src={"/landingLogo.png"} width={40} height={40} alt={""} />
        <h1 className={"text-2xl font-semibold"}>MeetMate</h1>
      </div>
      <div className={"mt-[-16.667svh] flex h-full flex-col items-center justify-center"}>
        <Input
          maxLength={45}
          type={step === 1 ? "email" : step === 3 ? "password" : "text"}
          ref={input}
          value={inputs[placeholders[step] as keyof Inputs]}
          onChange={(e) => {
            setInputs({ ...inputs, [placeholders[step]]: e.target.value });
          }}
          placeholder={placeholders[step]}
          className={"border-0 text-lg font-medium text-foreground focus-visible:ring-0"}
        />
        <Progress
          className={"h-1 drop-shadow-glow max-sm:w-[350px] sm:w-[450px] md:w-[600px] lg:w-[960px]"}
          value={(step / 3) * 100}
        />

        <div className={"mt-2 flex items-center justify-center gap-x-2 self-end"}>
          <p className={"text-sm text-red-500"}>{error}</p>
          {step > 0 && (
            <Button
              size={"sm"}
              onClick={() => {
                setStep(step - 1);
              }}>
              Back
            </Button>
          )}
          {step < 3 && (
            <Button size={"sm"} onClick={nextStep}>
              Next
            </Button>
          )}
          {step === 3 && (
            <Button size={"sm"} onClick={submit}>
              Finish
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Setup;
