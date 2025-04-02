import { CurrentStepStatus } from "@/components/Stepper";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AlignJustify, CirclePlay, Loader2, Truck, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FormikProvider, useFormik } from "formik";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import {
  DialogType,
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
import { useGetContentProcessMutation } from "@/app/services/service";
import moment from "moment";
import FeedbackModalContent from "./partials/FeedbackModalContent";
import ContentReviewModalContent from "./partials/ContentReviewModalContent";
import ContentReturnModalContent from "./partials/ContentReturnModalContent";
import ContentUploadModalContent from "./partials/ContentUploadModalContent";

export const getStepIndex = (status: string): number => {
  const arr = [
    ["RequestSent", "RequestApproved", "RequestRejected"],
    ["DeliveryPaymentPending", "Delivery", "DeliverySuccess", "DeliveryRefund"],
    ["ContentPending", "ContentSent", "ContentOverDue"],
    ["GeniConfirming", "ContentSentToBrand", "ContentRejected"],
    ["ContentApproved", "ContentFixRequest", "ContentReSent"],
  ];

  const index = arr.findIndex((item) => item.includes(status));
  return index == -1 ? 0 : index;
};

export const getCurrentStepColor = (status: string): CurrentStepStatus => {
  const arr = {
    green: [
      "Request",
      "RequestApproved",
      "DeliverySuccess",
      "ProdApproved",
      "ContentSent",
      "ContentSentToBrand",
      "ContentApproved",
      "ContentReSent",
    ],
    yellow: [
      "RequestSent",
      // "RequestApproved",
      "DeliveryPaymentPending",
      "Delivery",
      "DeliverySuccess",
      "ContentPending",
      "GeniConfirming",
      "ContentFixRequest",
    ],
    red: [
      "RequestRejected",
      "DeliveryRefund",
      "ContentOverDue",
      "ContentRejected",
    ],
  };

  return Object.keys(arr).find((key) =>
    arr[key].includes(status)
  ) as CurrentStepStatus;
};

type ContentProgressModalContentProps = {
  content: Content;
};

const ContentProgressModalContent: React.FC<
  ContentProgressModalContentProps
> = ({ content }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDisabled, setDialogDisabled] = useState(true);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [dialogType, setDialogType] = useState<DialogType>(DialogType.PROGRESS);
  const [openReturnSection, setOpenReturnSection] = useState<boolean>(false);
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
  // const isSuccess = true;
  // const isLoadingContentProcess = false;
  // const contentProcessData = [
  //   {
  //     ContentId: "testid",
  //     ContentProccessId: 1,
  //     ContentStepId: 1,
  //     StepName: "Контентийн хүсэлт",
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
      returnReason: "",
    },
    // validationSchema: addCreatorDetailsSchema,
    onSubmit: async (values) => {
      try {
        if (dialogType == DialogType.EDIT_REQUEST) {
          console.log(pick(values, ["reasons"]));
        } else if (dialogType == DialogType.ACCEPT_REQUEST) {
          console.log(pick(values, ["reasons"]));
        } else if (values.returnReason) {
          console.log(pick(values, ["returnReason"]));
        }
        // await creatorApply({
        //   ...values,
        // }).unwrap();
      } catch (error) {
        toast.error("Алдаа гарлаа");
      }
    },
  });

  useEffect(() => {
    if (content) {
      // setActiveStep(getStepIndex(content.Status));
      setActiveStep(content?.CurrentStepId - 1);
      setOpenReturnSection(false);

      if (content.Status === null || content.Status === "") {
        setDialogDisabled(false);
      }
    }
  }, [content]);

  const steps = [
    <Image
      src={"/stage-icon1.png"}
      width={24}
      height={24}
      alt=""
      className="w-5 h-5 brightness-0 invert"
    />,
    <Truck className="w-9 h-9 text-[#6F6F6F] p-2" />,
    <Image
      src={"/stage-icon2.png"}
      width={24}
      height={24}
      alt=""
      className="w-5 h-5 brightness-0 invert"
    />,
    <Image
      src={"/stage-icon3.png"}
      width={24}
      height={24}
      alt=""
      className="w-5 h-5 brightness-0 invert"
    />,
    <CirclePlay className="w-10 h-10 text-[#6F6F6F] p-2" />,
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

  const isOverdueWeek = (created_date: string | null): boolean => {
    if (!created_date) return false;
    return overdueDays(created_date) > 7;
  };

  const showSendContentButton = (
    status: STATUS_LIST,
    created_date: string
  ): boolean => {
    if (status === STATUS_LIST.ContentOverDue) {
      return !isOverdueWeek(created_date);
    }

    return [
      STATUS_LIST.ContentPending,
      STATUS_LIST.ContentRejected,
      STATUS_LIST.ContentFixRequest,
    ].includes(status);
  };

  const showViewContentButton = (status: STATUS_LIST): boolean => {
    return [
      STATUS_LIST.ContentSent,
      STATUS_LIST.GeniConfirming,
      STATUS_LIST.ContentRejected,
      STATUS_LIST.ContentFixRequest,
      STATUS_LIST.ContentReSent,
      STATUS_LIST.ContentApproved,
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
    // setContentProcessData(content['Process'] as any);
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
          <ReturnSection />
        )}

        {dialogType == DialogType.CONTENT_IN_PROGRESS ? (
          <ContentUploadModalContent
            parsedUserInfo={parsedUserInfo}
            contentId={content?.ContentId}
          />
        ) : null}

        {status === STATUS_LIST.ContentApproved && (
          <ContentReviewModalContent p={content} />
        )}

        {dialogType == DialogType.PAYMENT && <Payment content={content} />}

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
          ![DialogType.CONTENT_IN_PROGRESS, DialogType.PAYMENT].includes(
            dialogType
          ) && (
            <div className="w-full flex flex-col gap-2 border-[2px] border-[#F49D19] rounded-xl p-5 mt-2">
              <h3 className="text-lg font-semibold">Сануулга !</h3>
              <p className="text-sm bg-[#F5F4F0] rounded-lg p-4">
                Та контент илгээх хугацаанаасаа{" "}
                {overdueDays(contentProcessData.slice(-1)[0].CreatedAt)} хоног
                хоцорсон байна. <br />
                Таны дараагийн бүтээгдэхүүн хүсэх эрх{" "}
                {overdueDays(contentProcessData.slice(-1)[0].CreatedAt)} хоног
                хаагдах болно
              </p>
            </div>
          )}
      </>
    );
  };

  const creatorModalFooterActions = () => {
    return (
      <>
        {status === STATUS_LIST.DeliveryPaymentPending &&
          dialogType != DialogType.PAYMENT && (
            <div className="pt-2">
              <button
                onClick={() => setDialogType(DialogType.PAYMENT)}
                className="w-full text-center text-xs sm:text-base bg-secondary px-3 mt-2 sm:px-5 py-2 rounded-lg text-white font-bold"

                // className="bg-secondary text-white py-1 sm:py-2 font-bold rounded-lg transition-all"
              >
                Төлбөр төлөх
              </button>
            </div>
          )}
        {status === STATUS_LIST.RequestSent &&
          dialogType != DialogType.REQUEST && (
            <div className="pt-2">
              <button
                onClick={() => setDialogType(DialogType.REQUEST)}
                // className="text-xs sm:text-base flex flex-row items-center gap-2 bg-[#4D55F5] border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 rounded-lg text-white font-bold"
                className="w-full text-center text-xs sm:text-base bg-geni-gray px-3 mt-2 sm:px-5 py-2 rounded-lg text-white font-bold"
              >
                Хүсэлт буцаах
              </button>
            </div>
          )}
        {status === STATUS_LIST.DeliverySuccess && (
          <div className="border-t pt-2">
            <button
              onClick={() =>
                openReturnSection
                  ? handleReasonSubmit()
                  : setOpenReturnSection(true)
              }
              className="w-full text-center text-xs sm:text-base bg-geni-gray px-3 sm:px-5 py-2 rounded-lg text-white font-bold"
            >
              Бүтээгдэхүүн буцаах
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
        {
          dialogType != DialogType.CONTENT_IN_PROGRESS &&
            showSendContentButton(
              status as STATUS_LIST,
              getCreatedAtByStatus(
                contentProcessData,
                STATUS_LIST.ContentOverDue
              )
            ) && (
              <div className="pt-2">
                <button
                  onClick={() => setDialogType(DialogType.CONTENT_IN_PROGRESS)}
                  className="w-full text-center text-xs sm:text-base bg-[#CA7FFE] mt-2 px-5 py-2 rounded-lg text-white font-bold"
                >
                  {status === STATUS_LIST.ContentRejected ||
                  status === STATUS_LIST.ContentFixRequest
                    ? "Дахин илгээх"
                    : "Контент илгээх"}
                </button>
              </div>
            )
          // <ContentUploadModal
          //   parsedUserInfo={parsedUserInfo}
          //   contentId={content?.ContentId}
          // />
        }
        {status === STATUS_LIST.ContentOverDue &&
          isOverdueWeek(
            getCreatedAtByStatus(contentProcessData, STATUS_LIST.ContentOverDue)
          ) &&
          ![DialogType.CONTENT_IN_PROGRESS, DialogType.PAYMENT].includes(
            dialogType
          ) && (
            <div className="border-t pt-2">
              <button
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
          ![
            DialogType.ACCEPT_REQUEST,
            DialogType.CONTENT_IN_PROGRESS,
            DialogType.EDIT_REQUEST,
            DialogType.CONTENT,
          ].includes(dialogType) && (
            <button
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
        {status == STATUS_LIST.ContentOverDue &&
          isOverdueWeek(contentProcessData.slice(-1)[0].CreatedAt) && (
            <div className="w-full flex flex-col gap-2 border-[2px] border-[#F49D19] rounded-xl p-5">
              <h3 className="text-lg font-semibold">Сануулга !</h3>
              <p className="text-sm bg-[#F5F4F0] rounded-lg p-4">
                Контент бүтээгчид 7 хоногоос дээш хоцроосон тохиолдолд бид таны
                Geni Credit-г нөхөн олгох боломжгүй болно.
              </p>
            </div>
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

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={handleOpen}>
        <DialogTrigger asChild>
          <button
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
          className="overflow-y-auto flex flex-col lg:flex-row items-center lg:items-start p-6 max-h-[739px] max-w-[1000px] w-full sm:w-auto rounded-3xl"
          hideCloseButton={true}
          aria-describedby="content-progress-modal"
        >
          <DialogTitle></DialogTitle>
          {isLoadingContentProcess && (
            <div className="w-full h-full flex items-center justify-center">
              <Loader2 className="w-10 h-10 animate-spin" />
            </div>
          )}
          {content && isSuccess && (
            <>
              <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} className="h-full w-full">
                  <div className="h-[calc(539px-40px)] lg:h-[calc(539px-40px)] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 flex flex-col gap-2 p-1">
                    {dialogType == DialogType.PROGRESS && (
                      <ProgressStepper
                        content={content}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        steps={steps}
                        contentProcess={contentProcessData}
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
