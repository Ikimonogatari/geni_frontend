"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  useGetBankListQuery,
  useGetCreatorWalletHistoryQuery,
  useGetWalletInfoQuery,
  useCheckBankAccountNameMutation,
  useGetConnectedBankAccountQuery,
} from "@/app/services/service";
import AddBalance from "./AddBalance";
import WithdrawCredit from "./WithdrawCredit";
import ListRowLayout from "@/components/common/ListRowLayout";
import { useDateFormatter } from "@/app/hooks/useDateFormatter";

function CreatorWallet() {
  const router = useRouter();
  const userInfo = Cookies.get("user-info");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;
  const contentsPerPage = 16;
  const offset = 0;
  const { formatDate } = useDateFormatter();
  const [accountName, setAccountName] = useState("");
  const [isCheckingName, setIsCheckingName] = useState(false);

  const {
    data: getWalletInfoData,
    error: getWalletInfoError,
    isLoading: getWalletInfoLoading,
    refetch: refetchWalletInfo,
    //@ts-ignore
  } = useGetWalletInfoQuery();
  // @ts-ignore
  const { data: bankList } = useGetBankListQuery();
  // @ts-ignore
  const { data: walletHistory, refetch: refetchWalletHistory } =
    useGetCreatorWalletHistoryQuery(
      { limit: contentsPerPage, offset },
      { refetchOnMountOrArgChange: true }
    );
  // @ts-ignore
  const { data: connectedAccount } = useGetConnectedBankAccountQuery();
  const [checkBankAccountName] = useCheckBankAccountNameMutation();

  const handleTransactionComplete = async () => {
    await Promise.all([refetchWalletInfo(), refetchWalletHistory()]);
  };

  useEffect(() => {
    const checkAccountName = async () => {
      if (connectedAccount?.BankCode && connectedAccount?.AcntNo) {
        setIsCheckingName(true);
        try {
          const response = await checkBankAccountName({
            BankCode: connectedAccount.BankCode,
            AcntNo: connectedAccount.AcntNo,
          }).unwrap();
          setAccountName(response.Name);
        } catch (error) {
          console.error("Failed to check account name:", error);
        } finally {
          setIsCheckingName(false);
        }
      }
    };

    checkAccountName();
  }, [connectedAccount]);

  console.log(walletHistory && walletHistory, "WALLET HISTORY");
  console.log(bankList && bankList, "BANK LIST");
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mt-32 mb-12">
        <div className="max-w-5xl min-h-screen mx-auto px-7 py-11 container">
          <button
            onClick={() => router.back()}
            className="w-12 sm:w-14 h-12 sm:h-14 bg-[#F5F4F0] rounded-lg p-4"
          >
            <Image
              src={"/arrow-left.png"}
              width={24}
              height={24}
              alt="arrow-left"
            />
          </button>
          <p className="text-3xl sm:text-4xl xl:text-5xl font-bold my-7">
            Geni хэтэвч
          </p>
          <div className="rounded-3xl bg-[#F5F4F0] p-5 w-full flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <Image
                src={"/geni-credit-card.png"}
                width={310}
                height={160}
                alt=""
                className="aspect-[310/160] w-full sm:w-auto"
              />
              <div className="flex flex-row gap-3 sm:gap-1 justify-normal items-center sm:items-start sm:flex-col">
                <span className="text-lg sm:text-lg">Geni Credit Point:</span>
                <span className="font-bold text-xl sm:text-3xl">
                  {getWalletInfoLoading
                    ? ""
                    : Number(getWalletInfoData?.CurrBal || 0).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex flex-row justify-center sm:justify-end md:justify-normal md:flex-col gap-4">
              <AddBalance
                walletInfo={getWalletInfoData}
                bankList={bankList}
                onTransactionComplete={handleTransactionComplete}
                accountName={accountName}
                isCheckingName={isCheckingName}
              />
              <WithdrawCredit
                walletInfo={getWalletInfoData}
                bankList={bankList}
                connectedAccount={connectedAccount}
              />
            </div>
          </div>
          <div className="w-full overflow-x-auto pt-3 mt-7 border-t-[1px] border-[#F5F4F0] flex flex-col gap-3">
            <span className="text-2xl font-bold">Дансны түүх</span>
            <div className="flex flex-col gap-3 min-w-[540px]">
              {walletHistory &&
                walletHistory?.Data?.map((walletHistoryItem, i) => (
                  <ListRowLayout
                    key={i}
                    layout="grid grid-cols-[3fr,2fr,2fr,1fr] sm:grid-cols-[3fr,2fr,2fr,1fr]"
                  >
                    <span>{walletHistoryItem.TxnDesc}</span>
                    <span
                      className={`max-w-min rounded-xl text-white py-1 px-4 text-center text-xs sm:text-lg ${
                        walletHistoryItem.IsAdd
                          ? "bg-geni-green"
                          : "bg-geni-red"
                      }`}
                    >
                      {walletHistoryItem.IsAdd ? "Орлого" : "Зарлага"}
                    </span>
                    <span>{formatDate(walletHistoryItem.CreatedAt)}</span>
                    <span>{walletHistoryItem.TxnAmt.split(".")[0]}₮</span>
                  </ListRowLayout>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatorWallet;
