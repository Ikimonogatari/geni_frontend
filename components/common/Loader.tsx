import React from "react";
import Image from "next/image";
import { ClipLoader } from "react-spinners";

function Loader() {
  return (
    <div className="bg-white min-h-screen w-full absolute flex flex-col gap-5 justify-center items-center overflow-hidden">
      <Image
        src={"/geni-loader-logo.png"}
        alt=""
        width={86}
        height={26}
        className="w-[100px]"
      />
      <ClipLoader
        loading={true}
        aria-label=""
        data-testid="loader"
        className="aspect-[9/16] w-full h-full rounded-2xl"
        size={60}
      />
    </div>
  );
}

export default Loader;
