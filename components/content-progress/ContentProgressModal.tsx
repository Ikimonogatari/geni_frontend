import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AlignJustify, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { FormikProvider, useFormik } from "formik";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import {
  BrandReviewParams,
  ContentProcessRefundParams,
  DialogType,
  DictCode,
  FormikTypes,
  GetContentProcessResponse,
  STATUS_LIST,
  STATUS_LIST_VALUE,
} from "./content.services";
import { Content } from "./content.services";
import ViewContent from "./partials/ViewContent";
import EditRequest from "./partials/EditRequest";
import AcceptRequest from "./partials/AcceptRequest";
import { DialogTitle } from "../ui/dialogc";
import Payment from "./partials/Payment";
import ReturnSection from "./partials/ReturnSection";
import ProgressStepper from "./partials/ProgressStepper";
import {
  useBrandReviewMutation,
  useContentFeedbackMutation,
  useContentProcessOverdueMutation,
  useContentProcessRefundMutation,
  useDictListMutation,
  useGetContentProcessMutation,
  useReceivedProductMutation,
} from "@/app/services/service";
import moment from "moment";
import FeedbackModalContent from "./partials/FeedbackModalContent";
import ContentReviewModalContent from "./partials/ContentReviewModalContent";
import ContentReturnModalContent from "./partials/ContentReturnModalContent";
import ContentUploadModalContent from "./partials/ContentUploadModalContent";
import InfoBox from "./partials/InfoBox";

type ContentProgressModalContentProps = {
  content: Content;
  refetch?: () => void;
};

const ContentProgressModalContent: React.FC<
  ContentProgressModalContentProps
> = ({ content, refetch }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDisabled, setDialogDisabled] = useState(true);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [dialogType, setDialogType] = useState<DialogType>(DialogType.PROGRESS);
  const [openReturnSection, setOpenReturnSection] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const userType = Cookies.get("userType");
  const userInfo = Cookies.get("user-info");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;
  const [status, setStatus] = useState<STATUS_LIST>(STATUS_LIST.RequestSent);
  // console.log("getCurrentStepColor", getCurrentStepColor(status));
  // const [contentProcessData, setContentProcessData] = useState<GetContentProcessResponse | []>([]);
  const [
    getContentProcess,
    {
      isLoading: isLoadingContentProcess,
      data: contentProcessData,
      error: contentProcessError,
      isSuccess,
    },
  ] = useGetContentProcessMutation();
  const [contentProcessRefund, { isLoading: isLoadingContentProcessRefund }] =
    useContentProcessRefundMutation();
  const [
    contentProcessOverdue,
    {
      isLoading: isLoadingContentProcessOverdue,
      data: contentProcessOverdueData,
    },
  ] = useContentProcessOverdueMutation();
  const [contentFeedback, { isLoading: isLoadingContentFeedback }] =
    useContentFeedbackMutation();
  const [brandReview, { isLoading: isLoadingBrandReview }] =
    useBrandReviewMutation();

  // const isSuccess = true;
  // const isLoadingContentProcess = false;
  // const contentProcessData = [
  //   {
  //     ContentId: "testid",
  //     ContentProccessId: 1,
  //     ContentStepId: 1,
  //     StepName: "Контент хүлээгдэж байна",
  //     ContentStepStatusCode: {
  //       String: content.CurrentStepName.String,
  //       Valid: true,
  //     },
  //     ContentStepStatusId: 1,
  //     Desc: {
  //       String: STATUS_LIST_VALUE[content.CurrentStepName.String],
  //       Valid: true,
  //     },
  //     CreatedAt: "2025-03-20T12:13:28.276835Z",
  //   },
  //   {
  //     ContentId: "testid",
  //     ContentProccessId: 1,
  //     ContentStepId: 1,
  //     StepName: STATUS_LIST_VALUE.ContentOverDue,
  //     ContentStepStatusCode: {
  //       String: STATUS_LIST.ContentOverDue,
  //       Valid: true,
  //     },
  //     ContentStepStatusId: 1,
  //     Desc: {
  //       String: STATUS_LIST_VALUE.ContentOverDue,
  //       Valid: true,
  //     },
  //     CreatedAt: "2025-03-20T12:13:28.276835Z",
  //   },
  //   {
  //     ContentId: "testi2",
  //     ContentProccessId: 1,
  //     ContentStepId: 1,
  //     StepName: STATUS_LIST_VALUE[content.CurrentStepName.String],
  //     ContentStepStatusCode: {
  //       String: content.CurrentStepName.String,
  //       Valid: true,
  //     },
  //     ContentStepStatusId: 1,
  //     Desc: {
  //       String: STATUS_LIST_VALUE[content.CurrentStepName.String],
  //       Valid: true,
  //     },
  //     CreatedAt: "2025-03-20T12:13:28.276835Z",
  //   },
  // ];

  // const contentProcessWhenOverdue = {
  //   days: 10,
  //   xp: 100,
  //   banDate: "2025-03-20T12:13:28.276835Z",
  //   banDays: 10,
  // };

  const pick = (obj, keys) =>
    Object.fromEntries(
      keys
        .map((key) => [key, obj[key]])
        .filter(([_, value]) => value !== undefined)
    );

  const formik = useFormik<FormikTypes>({
    initialValues: {
      reasons: [""],
      brandStar: 0,
      contentStar: 0,
      contentDesignStar: 0,
      comment: "",
      sharePost: false,
      collabPost: false,
      returnReason: [],
      returnReasonDescription: "",
    },
    // validationSchema: addCreatorDetailsSchema,
    onSubmit: async (values) => {
      try {
        if (dialogType == DialogType.EDIT_REQUEST) {
          const data: BrandReviewParams = {
            ContentId: content?.ContentId,
            FixReason: values.reasons,
          };
          brandReview(data).then(() => {
            setDialogOpen(false);
            refetch();
          });
        } else if (dialogType == DialogType.ACCEPT_REQUEST) {
        } else if (values.returnReason) {
          console.log(pick(values, ["returnReason"]));
          const data: ContentProcessRefundParams = {
            ContentId: content?.ContentId,
            ReasonId: values.returnReason,
            ReasonDesc: values.returnReasonDescription,
            StatusId: 7,
          };
          console.log(data);
          contentProcessRefund(data);
        }
        // await creatorApply({
        //   ...values,
        // }).unwrap();
      } catch (error) {
        toast.error("Алдаа гарлаа");
      }
    },
  });

  const [
    dictList,
    {
      isLoading: isDictListLoading,
      data: dictListData,
      isSuccess: isDictListSuccess,
      reset: resetDictList,
    },
  ] = useDictListMutation();

  const [
    receivedProduct,
    {
      isLoading: isReceivedProductLoading,
      data: receivedProductData,
      isSuccess: isReceivedProductSuccess,
    },
  ] = useReceivedProductMutation();

  useEffect(() => {
    if (!dialogOpen) {
      setDialogType(DialogType.PROGRESS);
      setOpenReturnSection(false);
      formik.resetForm();
      resetDictList();
    }
  }, [dialogOpen]);

  useEffect(() => {
    if (content) {
      // setActiveStep(getStepIndex(content.Status));
      setActiveStep(content?.CurrentStepId - 1);
      // setOpenReturnSection(false);

      if (content.Status === null || content.Status === "") {
        setDialogDisabled(false);
      }

      if (
        [STATUS_LIST.ContentOverDue, STATUS_LIST.ContentBanPayment].includes(
          content?.CurrentStepName?.String as STATUS_LIST
        )
      ) {
        contentProcessOverdue(content?.ContentId);
      }

      if (content?.CurrentStepName?.String == STATUS_LIST.ContentRejected) {
        contentFeedback(content?.ContentId);
      }
    }
  }, [content]);

  // useEffect(() => {
  //   if (contentProcessData?.length > 0) {

  //     contentProcessOverdue(content?.ContentId);
  //   }
  // }, [contentProcessData]);

  const steps = [
    <Image
      src={"/content-status-icon1.png"}
      width={24}
      height={24}
      alt=""
      className="w-5 h-5 brightness-0 invert"
    />,
    <Image
      src={"/content-status-icon2.png"}
      width={24}
      height={24}
      alt=""
      className="w-5 h-5 brightness-0 invert"
    />,
    <Image
      src={"/content-status-icon3.png"}
      width={24}
      height={24}
      alt=""
      className="w-5 h-5 brightness-0 invert"
    />,
    <Image
      src={"/content-status-icon4.png"}
      width={24}
      height={24}
      alt=""
      className="w-5 h-5 brightness-0 invert"
    />,
    <Image
      src={"/content-status-icon7.png"}
      width={24}
      height={24}
      alt=""
      className="w-5 h-5 brightness-0 invert"
    />,
  ];

  function getCreatedAtByStatus(
    processList: GetContentProcessResponse,
    status: STATUS_LIST
  ) {
    const foundItem = processList.find(
      (item) => item.ContentStepStatusCode?.String === status
    );
    return foundItem ? foundItem.CreatedAt : null;
  }

  const overdueDays = (created_date: string): number => {
    const date = moment(created_date);
    const now = moment();
    return now.diff(date, "days");
  };

  const showSendContentButton = (status: STATUS_LIST): boolean => {
    // if (status === STATUS_LIST.ContentOverDue) {
    //   return !isOverdueWeek(created_date);
    // }

    return [
      STATUS_LIST.ContentPending,
      STATUS_LIST.ContentRejected,
      STATUS_LIST.ContentFixRequest,
      STATUS_LIST.ContentOverDue,
    ].includes(status);
  };

  const showViewContentButton = (status: STATUS_LIST): boolean => {
    return [
      STATUS_LIST.ContentSent,
      STATUS_LIST.BrandConfirming,
      STATUS_LIST.ContentRejected,
      STATUS_LIST.ContentFixRequest,
      STATUS_LIST.ContentReSent,
      STATUS_LIST.ContentApproved,
    ].includes(status);
  };

  const showPaymentButton = (status: STATUS_LIST): boolean => {
    console.log(
      [STATUS_LIST.DeliveryPaymentPending, STATUS_LIST.ContentBanned].includes(
        status
      )
    );
    console.log("dialog type", dialogType);
    return [
      STATUS_LIST.DeliveryPaymentPending,
      STATUS_LIST.ContentBanned,
    ].includes(status);
  };

  const renderAvgStar = (
    instruction: number,
    context: number,
    creation: number
  ) => {
    const validScores = [instruction, context, creation].filter(
      (score) => typeof score === "number" && !isNaN(score)
    );

    if (validScores.length === 0) return 0; // Avoid division by zero

    return (
      validScores.reduce((sum, score) => sum + score, 0) / validScores.length
    ).toFixed(1);
  };

  const handleOpen = (open: boolean) => {
    setDialogOpen(open);

    getContentProcess({
      UserType: userType,
      ContentId: content?.ContentId,
      ContentStepId: content?.CurrentStepId,
    });

    // setContentProcessData(content["Process"] as any);
    // setStatus("DeliverySuccess" as STATUS_LIST);
    setStatus(content.CurrentStepName.String as STATUS_LIST);
  };

  const handleClose = (currentDialogType: DialogType) => {
    if (userType == "Brand") {
      if (currentDialogType == DialogType.CONTENT) {
        setDialogType(DialogType.PROGRESS);
      } else if (currentDialogType == DialogType.EDIT_REQUEST) {
        setDialogType(DialogType.CONTENT);
      } else if (currentDialogType == DialogType.ACCEPT_REQUEST) {
        setDialogType(DialogType.CONTENT);
      }
    } else if (userType == "Creator") {
      setDialogType(DialogType.PROGRESS);
    }
    formik.resetForm();
  };

  const handleReasonSubmit = () => {
    if (formik.validateField("returnReason")) {
      formik.submitForm();
    }
  };

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleOpenReturnSection = () => {
    setOpenReturnSection(true);
    dictList({
      dictCode: DictCode.REFUND_REASON,
    }).then((res) => {
      scrollToBottom();
    });
  };

  if (!content) return <></>;

  const creatorModalContents = () => {
    return (
      <>
        {dialogType == DialogType.REQUEST ? (
          <ContentReturnModalContent requestId={content?.ContentId} />
        ) : (
          <></>
        )}
        {status === STATUS_LIST.ContentRejected &&
          dialogType != DialogType.CONTENT_IN_PROGRESS && (
            <FeedbackModalContent
              feedbacks={content?.FeedBacks}
              setDialogType={setDialogType}
            />
          )}

        {status === STATUS_LIST.DeliverySuccess && openReturnSection && (
          <ReturnSection isLoading={isDictListLoading} data={dictListData} />
        )}

        {dialogType == DialogType.CONTENT_IN_PROGRESS ? (
          <ContentUploadModalContent
            parsedUserInfo={parsedUserInfo}
            contentId={content?.ContentId}
            refetch={refetch}
            setDialogOpen={setDialogOpen}
          />
        ) : null}

        {status === STATUS_LIST.ContentApproved && (
          <ContentReviewModalContent p={content} />
        )}

        {dialogType == DialogType.PAYMENT && (
          <Payment
            content={content}
            refetch={refetch}
            setDialogOpen={setDialogOpen}
          />
        )}

        {status === STATUS_LIST.ContentFixRequest &&
          dialogType != DialogType.CONTENT_IN_PROGRESS && (
            <>
              <div className="border-[1px] border-[#E6E6E6] p-4 rounded-xl">
                <span className="text-3xl font-bold">Засварлах хүсэлт</span>
                <div className="mt-4 flex flex-col gap-3">
                  {[]?.map((f, i) => (
                    <div
                      key={i}
                      className="flex flex-row items-center gap-3 sm:gap-6 p-3 sm:p-5 bg-[#F5F4F0] rounded-3xl"
                    >
                      <div className="rounded-full w-2 h-2 sm:w-3 sm:h-3 bg-[#D9D9D9]"></div>
                      <span className="text-sm sm:text-base">{f.Feedback}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* <button
                onClick={() => setDialogType(DialogType.CONTENT_IN_PROGRESS)}
                className="mt-5 sm:mt-10 w-full py-2 text-white font-semibold bg-[#CA7FFE] rounded-lg"
              >
                Дахин илгээх
              </button> */}
            </>
          )}
      </>
    );
  };

  const brandModalContents = () => {
    return (
      <>
        {dialogType == DialogType.CONTENT && (
          <ViewContent content={content} setDialogType={setDialogType} />
        )}

        {dialogType == DialogType.EDIT_REQUEST && (
          <EditRequest content={content} />
        )}

        {dialogType == DialogType.ACCEPT_REQUEST && <AcceptRequest />}
      </>
    );
  };

  const creatorModalMessages = () => {
    return (
      <>
        {status == STATUS_LIST.ContentOverDue &&
          DialogType.CONTENT_IN_PROGRESS && (
            <InfoBox title="Сануулга !">
              Та контент илгээх хугацаанаасаа {contentProcessOverdueData?.Days}{" "}
              хоног хоцорсон байна. <br />
              Таны дараагийн бүтээгдэхүүн хүсэх эрх{" "}
              {contentProcessOverdueData?.Days} хоног хаагдах болно
            </InfoBox>
          )}
        {status == STATUS_LIST.ContentBanPayment &&
          DialogType.CONTENT_IN_PROGRESS && (
            <InfoBox title="Сануулга !">
              Та бүтээгдэхүүний төлбөрөө төлөөгүй{" "}
              {contentProcessOverdueData?.BanDays}
              хоног болсон тул дахин бүтээгдэхүүн хүсэх эрх{" "}
              {contentProcessOverdueData?.BanDays} хоногоор хаагдаж байна.{" "}
              <br />
              Эрх нээгдэх хугацаа:{" "}
              {moment(contentProcessOverdueData?.BanDate).format(
                "YYYY.MM.DD - HH:mm"
              )}
            </InfoBox>
          )}
      </>
    );
  };

  const creatorModalFooterActions = () => {
    return (
      <>
        {status === STATUS_LIST.RequestSent &&
          dialogType != DialogType.REQUEST && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setDialogType(DialogType.REQUEST)}
                className="w-full text-center text-xs sm:text-base bg-geni-gray px-3 mt-2 sm:px-5 py-2 rounded-lg text-white font-bold"
              >
                Хүсэлт буцаах
              </button>
            </div>
          )}
        {status === STATUS_LIST.DeliverySuccess && (
          <div className="flex flex-col gap-2 border-t pt-2">
            <button
              type="button"
              onClick={() =>
                openReturnSection
                  ? handleReasonSubmit()
                  : handleOpenReturnSection()
              }
              className={`w-full text-center text-xs sm:text-base ${
                isDictListSuccess ? "bg-secondary" : "bg-geni-gray"
              } px-3 sm:px-5 py-2 rounded-lg text-white font-bold`}
            >
              Бүтээгдэхүүн буцаах
            </button>
            <button
              type="button"
              disabled={isReceivedProductLoading || isReceivedProductSuccess}
              onClick={() =>
                receivedProduct(content?.ContentId).then(() => {
                  toast.success("Бүтээгдэхүүн хүлээн авсан");
                  setDialogOpen(false);
                  refetch && refetch();
                })
              }
              className={`w-full text-center text-xs sm:text-base  bg-secondary px-3 sm:px-5 py-2 rounded-lg text-white font-bold`}
            >
              Бүтээгдэхүүн хүлээн авсан
            </button>
          </div>
        )}
        {/* {content.Status === "ContentRejected" &&
          dialogType != DialogType.CONTENT_REJECTED && (
            <button
              onClick={() => setDialogType(DialogType.CONTENT_REJECTED)}
              className="w-full text-center text-xs sm:text-base bg-[#F49D19] mt-2 px-5 py-2 rounded-lg text-white font-bold"
            >
              Дэлгэрэнгүй
            </button>
          )} */}
        {dialogType != DialogType.CONTENT_IN_PROGRESS &&
          showSendContentButton(status as STATUS_LIST) && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setDialogType(DialogType.CONTENT_IN_PROGRESS)}
                className="w-full text-center text-xs sm:text-base bg-[#CA7FFE] mt-2 px-5 py-2 rounded-lg text-white font-bold"
              >
                {status === STATUS_LIST.ContentRejected ||
                status === STATUS_LIST.ContentFixRequest
                  ? "Дахин илгээх"
                  : "Контент илгээх"}
              </button>
            </div>
          )}
        {showPaymentButton(status as STATUS_LIST) &&
          dialogType == DialogType.PROGRESS && (
            <div className="border-t pt-2">
              <button
                type="button"
                onClick={() => setDialogType(DialogType.PAYMENT)}
                className="w-full text-center text-xs sm:text-base bg-[#CA7FFE] mt-2 px-5 py-2 rounded-lg text-white font-bold"
              >
                Төлбөр төлөх
              </button>
            </div>
          )}
      </>
    );
  };

  const brandModalFooterActions = () => {
    return (
      <>
        {/* {getStepIndex(content.Status) >= 3 && */}
        {showViewContentButton(status as STATUS_LIST) &&
          dialogType == DialogType.PROGRESS && (
            <button
              type="button"
              onClick={() => setDialogType(DialogType.CONTENT)}
              className="w-full bg-secondary text-white py-1 sm:py-2 font-bold rounded-lg transition-all"
            >
              Контент үзэх
            </button>
          )}

        {dialogType == DialogType.ACCEPT_REQUEST && (
          <div className="pt-4 mt-auto border-t">
            <button
              type="submit"
              className="w-full bg-secondary text-white py-3 font-bold rounded-xl"
            >
              Хүлээж авах
            </button>
          </div>
        )}

        {dialogType == DialogType.EDIT_REQUEST && (
          <div className="pt-4 mt-auto border-t">
            <button
              type="submit"
              className="w-full bg-secondary text-white py-3 font-bold rounded-xl"
            >
              Засвар илгээх
            </button>
          </div>
        )}
      </>
    );
  };

  const brandModalMessages = () => {
    return (
      <>
        {/* Контент хоцорсон сануулга */}
        {status == STATUS_LIST.ContentOverDue && (
          <InfoBox title="Сануулга !">
            Контент бүтээгчид контент илгээх ёстой хугацаанаасаа 7-с дээш
            хоногоор хэтрүүлэн контентоо хоцроосон тохиолдолд бид таны Geni
            Credit-г нөхөн олгох болно.
          </InfoBox>
        )}

        {status == STATUS_LIST.ContentApproved && (
          <div className="h-[calc(700px-40px)] lg:h-[calc(539px-40px)] w-full flex flex-col p-4">
            <div>
              Танд контент бүтээгчид өгсөн дундаж оноо:
              <Image
                src={"/star.png"}
                width={28}
                height={28}
                alt=""
                className="w-7 h-7"
              />
              <span>
                {content && (
                  <span className="text-lg font-bold">
                    {renderAvgStar(
                      content?.BrandInstructionPnt || 0,
                      content?.ContextPnt || 0,
                      content?.CreationPnt || 0
                    )}
                  </span>
                )}
              </span>
            </div>
          </div>
        )}

        {/* {status == "ContentEditRequest" && (
          <div className="flex flex-col gap-3 border-geni-gray border-[1px] rounded-xl p-4 pt-0">
            <div className="flex flex-col gap-2 bg-white rounded-xl p-4">
              <p className="text-xl font-bold mb-2">Контент пост хийх хүсэлт</p>
              <label className="flex items-center justify-between p-2 border rounded-xl">
                <span>Үг үсгийн алдаагаа засаарай</span>
                <input
                  type="checkbox"
                  name="sharePost"
                  checked={true}
                  disabled={true}
                  className="w-5 h-5"
                />
              </label>
              <label className="flex items-center justify-between p-2 border rounded-xl">
                <span>
                  Бусад брэндийн бүтээгдэхүүнийг хэт их оруулсан байна
                </span>
                <input
                  type="checkbox"
                  name="collabPost"
                  checked={false}
                  disabled={true}
                  className="w-5 h-5"
                />
              </label>
            </div>
          </div>
        )} */}
      </>
    );
  };

  const isFullLoading =
    isLoadingContentProcess ||
    isLoadingContentFeedback ||
    (content?.CurrentStepName?.String == STATUS_LIST.ContentFixRequest &&
      isLoadingBrandReview) ||
    !content;

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={handleOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            onClick={(e) => dialogDisabled && e.preventDefault()}
            disabled={dialogDisabled}
            className={`${dialogDisabled ? "cursor-not-allowed" : ""}`}
            // className={`w-10 h-10 text-[#6F6F6F] border-[1px] border-[#F5F4F0] rounded-lg p-2 ${
            //   dialogDisabled ? "cursor-not-allowed" : ""
            // }`}
          >
            <AlignJustify />
          </button>
        </DialogTrigger>
        {/* @ts-ignore */}
        <DialogContent
          className="overflow-y-auto flex flex-col lg:flex-row items-center lg:items-start p-6 max-w-[1000px] w-[95%] min-w-[320px] sm:w-[700px] lg:w-[1000px] rounded-3xl"
          hideCloseButton={true}
          aria-describedby={undefined}
        >
          <DialogTitle></DialogTitle>
          {isFullLoading && (
            <div className="w-full h-full flex items-center justify-center">
              <Loader2 className="w-10 h-10 animate-spin" />
            </div>
          )}
          {!isFullLoading && (
            <>
              <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} className="h-full w-full">
                  <div
                    ref={scrollContainerRef}
                    className="h-[calc(539px-40px)] lg:h-[calc(539px-40px)] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 flex flex-col gap-2 p-1"
                  >
                    {dialogType == DialogType.PROGRESS && (
                      <ProgressStepper
                        content={content}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        steps={steps}
                        contentProcess={contentProcessData}
                        overdueProcess={contentProcessOverdueData}
                      />
                    )}
                    {userType == "Creator" && creatorModalContents()}
                    {userType == "Brand" && brandModalContents()}
                    {userType == "Creator" && creatorModalMessages()}
                    {userType == "Brand" && brandModalMessages()}
                  </div>
                  {userType == "Creator" && creatorModalFooterActions()}
                  {userType == "Brand" && brandModalFooterActions()}
                </form>
              </FormikProvider>

              {/* custom close button */}
              {dialogType == DialogType.PROGRESS && (
                <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              )}
              {dialogType != DialogType.PROGRESS && (
                <button
                  type="button"
                  className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none"
                  onClick={() => handleClose(dialogType)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </button>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContentProgressModalContent;
