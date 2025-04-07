import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AlignJustify, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { FormikProvider, useFormik } from "formik";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import {
  BrandReceiveContentParams,
  BrandReviewParams,
  ContentProcessRefundParams,
  DialogType,
  DictCode,
  FeedBackResponse,
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
  useBrandReceiveContentMutation,
  useBrandReviewMutation,
  useContentFeedbackMutation,
  useContentProcessOverdueMutation,
  useContentProcessRefundMutation,
  useDictListMutation,
  useGetBrandReviewBrandMutation,
  useGetBrandReviewMutation,
  useGetContentProcessMutation,
  useGetFinalContentXpMutation,
  useReceivedProductMutation,
} from "@/app/services/service";
import moment from "moment";
import FeedbackModalContent from "./partials/FeedbackModalContent";
import ContentReviewModalContent from "./partials/ContentReviewModalContent";
import ContentReturnModalContent from "./partials/ContentReturnModalContent";
import ContentUploadModalContent from "./partials/ContentUploadModalContent";
import InfoBox from "./partials/InfoBox";
import _ from "lodash";

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
    { isLoading: isLoadingContentProcess, data: contentProcessData },
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
  const [
    getBrandReview,
    { isLoading: isLoadingGetBrandReview, data: brandReviewData },
  ] = useGetBrandReviewMutation();
  const [brandReceiveContent, { isLoading: isLoadingBrandReceiveContent }] =
    useBrandReceiveContentMutation();

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
      returnReason: [],
      returnReasonDescription: "",
      BrandFeedBack: [],
      BrandReviewResendFeedback: [],
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
          const data: BrandReceiveContentParams = {
            ContentId: content?.ContentId,
            Comment: values.comment,
            InstructionStar: values.brandStar,
            ContextStar: values.contentStar,
            CreationStar: values.contentDesignStar,
            BrandFeedBack: values.BrandFeedBack,
          };
          brandReceiveContent(data).then(() => {
            setDialogOpen(false);
            refetch();
          });
        } else if (values.returnReason) {
          const data: ContentProcessRefundParams = {
            ContentId: content?.ContentId,
            ReasonId: values.returnReason,
            ReasonDesc: values.returnReasonDescription,
            StatusId: 7,
          };
          contentProcessRefund(data).then(() => {
            setDialogOpen(false);
            refetch();
          });
        }
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

  const [
    getBrandReviewBrand,
    { isLoading: isLoadingGetBrandReviewBrand, data: brandReviewBrandData },
  ] = useGetBrandReviewBrandMutation();

  const [
    getFinalContentXp,
    { isLoading: isLoadingGetFinalContentXp, data: finalContentXpData },
  ] = useGetFinalContentXpMutation();

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
      setActiveStep(content?.CurrentStepId - 1);

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

  const showSendContentButton = (status: STATUS_LIST): boolean => {
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
    setStatus(content.CurrentStepName?.String as STATUS_LIST);

    if (content?.CurrentStepName?.String == STATUS_LIST.ContentFixRequest) {
      getBrandReview(content?.ContentId);
    }

    if (
      content?.CurrentStepName?.String == STATUS_LIST.ContentReSent &&
      userType == "Brand"
    ) {
      getBrandReviewBrand(content?.ContentId);
    }

    if (
      content?.CurrentStepName?.String == STATUS_LIST.ContentApproved &&
      userType == "Creator"
    ) {
      getFinalContentXp(content?.ContentId);
    }
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

  const handleBrandReviewResendFeedbackChange = (reviewId: number) => {
    if (formik.values.BrandReviewResendFeedback.includes(reviewId)) {
      formik.setFieldValue(
        "BrandReviewResendFeedback",
        _.without(formik.values.BrandReviewResendFeedback, reviewId)
      );
    } else {
      formik.setFieldValue(
        "BrandReviewResendFeedback",
        _.union(formik.values.BrandReviewResendFeedback, [reviewId])
      );
    }
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
        {status == STATUS_LIST.DeliverySuccess &&
          DialogType.CONTENT_IN_PROGRESS && (
            <InfoBox title="Сануулга !">
              Та бүтээгдэхүүнээ 24 цагийн хугацаанд буцаах боломжтой.
            </InfoBox>
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
            isResend={status === STATUS_LIST.ContentFixRequest}
          />
        ) : null}

        {status === STATUS_LIST.ContentApproved && (
          <ContentReviewModalContent
            p={content}
            finalContentXpData={finalContentXpData}
          />
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
                  {(brandReviewData as FeedBackResponse).map(
                    (feedback, index) => (
                      <label
                        key={index}
                        className="flex items-center justify-between p-2 border rounded-xl"
                      >
                        <span>{feedback.FixReason}</span>
                        <div className="relative">
                          <input
                            type="checkbox"
                            name="BrandReviewResendFeedback"
                            id={`BrandReviewResendFeedback-${feedback.BrandReviewId}`}
                            className="peer hidden"
                            checked={formik.values.BrandReviewResendFeedback.includes(
                              feedback.BrandReviewId
                            )}
                            onChange={() =>
                              handleBrandReviewResendFeedbackChange(
                                feedback.BrandReviewId
                              )
                            }
                          />
                          <label
                            htmlFor={`BrandReviewResendFeedback-${feedback.BrandReviewId}`}
                            className="w-6 h-6 rounded-lg border-2 border-orange-300 flex items-center justify-center cursor-pointer transition-all peer-checked:border-green-500"
                          >
                            <span
                              className={`text-sm sm:text-base ${
                                formik.values.BrandReviewResendFeedback.includes(
                                  feedback.BrandReviewId
                                )
                                  ? "text-green-500"
                                  : "hidden"
                              } text-center select-none peer-checked:inline-block w-3 h-5 border-white`}
                            >
                              ✓
                            </span>
                          </label>
                        </div>
                      </label>
                    )
                  )}
                </div>
              </div>
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

        {content?.CurrentStepName?.String == STATUS_LIST.ContentReSent &&
          dialogType == DialogType.PROGRESS && (
            <InfoBox
              title="Таны илгээсэн засварууд"
              type="gray"
              className="mb-4 !p-3"
              titleClassName="ml-3 mt-3"
            >
              <div className="flex flex-col gap-2">
                {(brandReviewBrandData as FeedBackResponse)?.map(
                  (item, index) => (
                    <label
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-xl"
                    >
                      <span>{item.FixReason}</span>
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="BrandFeedBack"
                          id={`BrandFeedBack-${item.BrandReviewId}`}
                          className="peer hidden"
                          checked={item.CreatorChecked}
                          disabled={true}
                        />
                        <label
                          htmlFor={`BrandFeedBack-${item.BrandReviewId}`}
                          className="w-6 h-6 rounded-lg border-2 border-orange-300 flex items-center justify-center transition-all peer-checked:border-green-500"
                        >
                          <span
                            className={`text-sm sm:text-base ${
                              item.CreatorChecked ? "text-green-500" : "hidden"
                            } text-center select-none peer-checked:inline-block w-3 h-5 border-white`}
                          >
                            ✓
                          </span>
                        </label>
                      </div>
                    </label>
                  )
                )}
              </div>
            </InfoBox>
          )}
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
        {/* {status === STATUS_LIST.RequestSent &&
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
          )} */}
        {status === STATUS_LIST.DeliverySuccess && (
          <div className="flex flex-col gap-2 border-t pt-2">
            <button
              type="button"
              onClick={() =>
                openReturnSection
                  ? handleReasonSubmit()
                  : handleOpenReturnSection()
              }
              disabled={isLoadingContentProcessRefund}
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
              disabled={isLoadingBrandReceiveContent}
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
              disabled={isLoadingBrandReview}
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
      </>
    );
  };

  const isFullLoading =
    isLoadingContentProcess ||
    isLoadingContentFeedback ||
    isLoadingContentProcessOverdue ||
    isLoadingGetBrandReview ||
    isLoadingGetBrandReviewBrand ||
    isLoadingGetFinalContentXp ||
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
          >
            <AlignJustify />
          </button>
        </DialogTrigger>
        {/* @ts-ignore */}
        <DialogContent
          className="overflow-y-auto bg-white flex flex-col lg:flex-row items-center lg:items-start p-6 max-w-[1000px] w-[95%] min-w-[320px] sm:w-[700px] lg:w-[1000px] rounded-3xl"
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
                    className="h-[calc(539px-40px)] lg:h-[calc(539px-40px)] overflow-y-auto [&::-webkit-scrollbar]:block [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 flex flex-col gap-2 p-1"
                  >
                    {dialogType == DialogType.PROGRESS &&
                      contentProcessData?.length > 0 && (
                        <ProgressStepper
                          content={content}
                          activeStep={activeStep}
                          setActiveStep={setActiveStep}
                          contentProcess={contentProcessData}
                          overdueProcess={contentProcessOverdueData}
                          getContentProcess={getContentProcess}
                          isLoadingContentProcess={isLoadingContentProcess}
                        />
                      )}
                    {contentProcessData?.[contentProcessData.length - 1]
                      ?.ContentStepId == content?.CurrentStepId && (
                      <>
                        {userType == "Creator" && creatorModalContents()}
                        {userType == "Brand" && brandModalContents()}
                        {userType == "Creator" && creatorModalMessages()}
                        {userType == "Brand" && brandModalMessages()}
                      </>
                    )}
                  </div>
                  {contentProcessData?.[contentProcessData.length - 1]
                    ?.ContentStepId == content?.CurrentStepId && (
                    <>
                      {userType == "Creator" && creatorModalFooterActions()}
                      {userType == "Brand" && brandModalFooterActions()}
                    </>
                  )}
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
