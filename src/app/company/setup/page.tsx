"use client";
import React, { useRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { type FetchResult, useMutation } from "@apollo/client";
import { CREATE_COMPANY } from "@/lib/graphql/mutations";
import Loader from "@/components/layout/Loader";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

type DisplayInputs = {
  "Full Company Name": string;
  "CEO Email": string;
  "CEO Name": string;
  "CEO Password": string;
};

type MutationInputs = {
  companyName: string;
  ownerEmail: string;
  ownerName: string;
  ownerPassword: string;
};

function Setup() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const [inputs, setInputs] = useState<DisplayInputs>({
    "Full Company Name": "",
    "CEO Email": "",
    "CEO Name": "",
    "CEO Password": ""
  });

  const placeholders = ["Full Company Name", "CEO Email", "CEO Name", "CEO Password"];
  const input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [createCompany, { loading, error: mutationError }] = useMutation(CREATE_COMPANY);

  const nextStep = () => {
    if (input.current?.value === null) {
      setError("Please fill in the input field");
      return;
    }
    if (step === 1 && input.current?.validity.valid === false) {
      setError("Please enter a valid email");
      return;
    }
    setError("");
    setStep((prev) => prev + 1);
  };

  const submit = async () => {
    if (input.current?.value === null) {
      setError("Please fill in the input field");
      return;
    }
    if (input.current?.validity.valid === false) {
      setError("Please enter a valid password");
      return;
    }

    const allInputsFilled = Object.values(inputs).every((value) => value.trim() !== "");
    if (!allInputsFilled) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    console.info("submitting", inputs);

    const mutationInputs: MutationInputs = {
      companyName: inputs["Full Company Name"],
      ownerEmail: inputs["CEO Email"],
      ownerName: inputs["CEO Name"],
      ownerPassword: inputs["CEO Password"]
    };

    try {
      const res: FetchResult<{ createCompany: string }> = await createCompany({ variables: mutationInputs });
      if (res.data?.createCompany.includes("200") === true) {
        toast({
          title: "Company created!",
          description: "You can now login to your account",
          variant: "default",
          className: "border-emerald-300"
        });
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        setError("An error occurred while creating the company: " + res.data?.createCompany);
      }
    } catch (err) {
      console.error("Mutation error:", err);
      setError("An error occurred while creating the company");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (step === 3) {
          void submit();
        } else {
          nextStep();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [step, inputs]);

  if (loading || step === 4) return <Loader />;

  return (
    <div className="flex h-screen flex-col items-center justify-start">
      <div className="flex h-1/6 items-center justify-center gap-2">
        <Image src="/landingLogo.png" width={40} height={40} alt="" />
        <h1 className="text-2xl font-semibold">MeetMate</h1>
      </div>
      <div className="mt-[-16.667svh] flex h-full flex-col items-center justify-center">
        <Input
          maxLength={45}
          type={step === 1 ? "email" : step === 3 ? "password" : "text"}
          ref={input}
          value={inputs[placeholders[step] as keyof DisplayInputs]}
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, [placeholders[step]]: e.target.value }));
          }}
          placeholder={placeholders[step]}
          className="border-0 text-lg font-medium text-foreground focus-visible:ring-0"
        />
        <Progress
          className="h-1 drop-shadow-glow max-sm:w-[350px] sm:w-[450px] md:w-[600px] lg:w-[960px]"
          value={(step / 3) * 100}
        />

        <div className="mt-2 flex items-center justify-center gap-x-2 self-end">
          <p className="text-sm text-red-500">{error !== "" || (mutationError !== null && mutationError?.message)}</p>
          {step > 0 && (
            <Button
              size="sm"
              onClick={() => {
                setStep((prev) => prev - 1);
              }}>
              Back
            </Button>
          )}
          {step < 3 && (
            <Button size="sm" onClick={nextStep}>
              Next
            </Button>
          )}
          {step === 3 && (
            <Button size="sm" onClick={submit}>
              Finish
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Setup;
