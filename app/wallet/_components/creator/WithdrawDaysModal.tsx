import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";

function WithdrawDaysModal({
  setDialogOpen,
  dialogOpen,
}: {
  setDialogOpen: (open: boolean) => void;
  dialogOpen: boolean;
}) {
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {/*@ts-ignore*/}
      <DialogContent className="overflow-y-auto h-auto flex flex-col lg:flex-row items-center lg:items-stretch gap-1 lg:gap-10 py-12 w-full lg:w-full max-w-3xl rounded-3xl">
        {/*@ts-ignore*/}
        <div className="flex flex-col gap-4 lg:gap-14 lg:w-1/2">
          <div className="flex flex-row items-center gap-3">
            <Image
              src="/geni-logo.svg"
              alt="geni-logo"
              height={26}
              width={96}
            />
            <Image src={"/point.png"} alt="" width={133} height={37} />
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-sm lg:text-lg">
              Geni Point-оо өөрийн дансруугаа татаж авдаг өдрүүд
            </span>
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-geni-pink">
              САР БҮРИЙН <br className="hidden lg:block" />
              ЭХНИЙ 7 ХОНОГ
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <Image src={"/calendar.png"} alt="" width={145} height={130} />
          <Image
            src={"/creators-image5.png"}
            alt=""
            width={200}
            height={291}
            className="-ml-14"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default WithdrawDaysModal;
