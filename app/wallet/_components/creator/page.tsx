"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useGetBankListQuery,
  useGetCreatorWalletHistoryQuery,
  useGetWalletInfoQuery,
  useGetUserInfoQuery,
  useCheckBankAccountNameMutation,
  useGetConnectedBankAccountQuery,
} from "@/app/services/service";
import AddBalance from "./AddBalance";
import WithdrawCredit from "./WithdrawCredit";
import ListRowLayout from "@/components/common/ListRowLayout";
import { useDateFormatter } from "@/app/hooks/useDateFormatter";
import usePagination from "@/components/hooks/usePagination";
import Pagination from "@/components/common/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import PriceFormatter from "@/components/common/FormatPrice";

function CreatorWallet() {
  const router = useRouter();
  const { data: parsedUserInfo } = useGetUserInfoQuery({});
  const { formatDate } = useDateFormatter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const offset = (currentPage - 1) * itemsPerPage;
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
  const { data: getCreatorWalletHistoryData, refetch: refetchWalletHistory } =
    useGetCreatorWalletHistoryQuery(
      { limit: itemsPerPage, offset },
      { refetchOnMountOrArgChange: true }
    );
  // @ts-ignore
  const { data: connectedAccount } = useGetConnectedBankAccountQuery();
  const [checkBankAccountName] = useCheckBankAccountNameMutation();

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, getTotalPages()));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const getTotalPages = () => {
    const totalCount = getCreatorWalletHistoryData?.RowCount ?? 0;
    return Math.ceil(totalCount / itemsPerPage);
  };

  const totalPages = getTotalPages();
  const pageNumbers = usePagination(totalPages, currentPage);

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

  console.log(bankList && bankList, "BANK LIST");
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="">
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
            <div className="mt-6 w-full min-w-[540px] flex flex-col gap-4">
              {!getCreatorWalletHistoryData?.Data?.length ? (
                <div className="space-y-4">
                  {[...Array(itemsPerPage)].map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-[33px] sm:h-[84px] w-full rounded-2xl"
                    />
                  ))}
                </div>
              ) : (
                getCreatorWalletHistoryData?.Data?.map((history, i) => (
                  <ListRowLayout
                    key={i}
                    layout="grid grid-cols-[3fr,2fr,2fr,1fr] sm:grid-cols-[3fr,2fr,2fr,1fr]"
                  >
                    <span className="col-span-1">{history.TxnDesc}</span>
                    <span className="col-span-1">
                      {formatDate(history.CreatedAt)}
                    </span>
                    <span
                      className={`col-span-1 max-w-min rounded-lg sm:rounded-xl text-white py-1 px-2 sm:px-4 text-center text-[10px] sm:text-lg ${
                        history.Type ? "bg-geni-green" : "bg-geni-red"
                      }`}
                    >
                      {history.Type ? "Нэмэгдсэн" : "Хасагдсан"}
                    </span>{" "}
                    <span
                      className={`col-span-1 ${
                        history.Type ? "text-geni-green" : "text-geni-red"
                      }`}
                    >
                      {history.Type ? "+" : "-"}
                      <PriceFormatter price={history.TxnAmt} />
                    </span>
                  </ListRowLayout>
                ))
              )}
            </div>
            {getCreatorWalletHistoryData && totalPages > 1 ? (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                pageNumbers={pageNumbers}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
                paginate={paginate}
                bg={"bg-geni-pink"}
                border={"border-geni-pink"}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatorWallet;
