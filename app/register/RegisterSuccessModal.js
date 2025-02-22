import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function RegisterSuccessModal() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[#4FB755] text-3xl sm:text-4xl text-center font-bold uppercase">
        амжилттай Бүртгэгдлээ
      </span>
      <Image
        src={"/brand-register-success.png"}
        width={209}
        height={220}
        alt="recieved"
      />
      <button
        onClick={() => router.push("/login")}
        className="mt-8 w-full py-4 text-white font-semibold bg-[#4D55F5] text-2xl border border-[#2D262D] rounded-2xl"
      >
        Нэвтрэх
      </button>
    </div>
  );
}

export default RegisterSuccessModal;
