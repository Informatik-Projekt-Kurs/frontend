"use client";
import React, { useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
// import { gql, useMutation } from "@apollo/client";
// import { CREATE_COMPANY} from "@/lib/graphql/mutations";
import Loader from "@/components/layout/Loader";

type Inputs = {
  "Full Company Name": string;
  "CEO Email": string;
  "CEO Name": string;
  "CEO Password": string;
};

function Setup() {
  const [step, setStep] = React.useState(0);

  const [inputs, setInputs] = React.useState<Inputs>({
    "Full Company Name": "",
    "CEO Email": "",
    "CEO Name": "",
    "CEO Password": ""
  });

  const placeholders = ["Full Company Name", "CEO Email", "CEO Name", "CEO Password"];
  const input: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
  const [error, setError] = React.useState<string>("");
  // const [createCompany, { data, loading, error: mutationError }] = useMutation(CREATE_COMPANY);
  const nextStep = () => {
    if (input.current?.value === "") {
      setError("Please fill in the input field");
      return;
    } else if (input.current?.validity.valid === false) {
      setError("Please enter a valid email");
      return;
    } else {
      setError("");
      setStep(step + 1);
    }
  };
  const submit = async () => {
    if (input.current?.value === "") {
      setError("Please fill in the input field");
      return;
    } else setError("");
    if (input.current?.validity.valid === false) {
      setError("Please enter a valid password");
      return;
    } else {
      setError("");
      console.info("submitting", inputs);

      setStep(4);
      // await createCompany({ variables: inputs }).then((res) => {
      //   console.log("done", res);
      // });
    }
  };
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (step === 3)
          submit().catch((err) => {
            console.error(err);
          });
        else nextStep();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [step]);
  return (
    <div className={"flex h-screen flex-col items-center justify-start"}>
      <div className={"flex h-1/6 items-center justify-center gap-2"}>
        <Image src={"/landingLogo.png"} width={40} height={40} alt={""} />
        <h1 className={"text-2xl font-semibold"}>MeetMate</h1>
      </div>
      <div className={"mt-[-16.667svh] flex h-full flex-col items-center justify-center"}>
        {step === 4 ? (
          <Loader />
        ) : (
          <React.Fragment>
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
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default Setup;
