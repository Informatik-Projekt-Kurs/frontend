import Image from "next/image";

function Loader() {
  return (
    <div className="flex h-[calc(100%-32px)] flex-col items-center justify-center p-8 px-6">
      <div className="flex size-20 animate-spin items-center justify-center rounded-[50%] border-4 border-x-background border-b-background border-t-primary bg-transparent"></div>
      <Image className={"absolute"} src={"/landingLogo.png"} alt={""} width={40} height={40} />
    </div>
  );
}

export default Loader;
