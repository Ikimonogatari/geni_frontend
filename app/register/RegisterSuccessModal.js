import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";

function RegisterSuccessModal({ brandVerificationSuccess }) {
  const router = useRouter();
  return (
    <div>
      <Dialog
        //   open={brandVerificationSuccess}
        open={false}
      >
        <DialogContent className="max-w-md w-full flex flex-col items-center gap-2 rounded-3xl">
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
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RegisterSuccessModal;
