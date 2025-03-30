import Stepper, { CurrentStepStatus } from "@/components/Stepper";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AlignJustify, CirclePlay, Truck, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Formik, FormikProvider, useFormik } from "formik";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import Cookies from "js-cookie";
import ContentReturnModal from "@/app/profile/_components/creator/ContentReturnModal";
import ContentUploadModal from "../ContentUploadModal";
import ContentReviewModal from "../ContentReviewModal";
import FeedbackModal from "../FeedbackModal";
import { DialogType, FormikTypes, myStates } from "./content.services";
import { Content } from "./content.services";
import ViewContent from "./ViewContent";
import EditRequest from "./EditRequest";
import AcceptRequest from "./AcceptRequest";
import { DialogTitle } from "../ui/dialogc";
import Payment from "./Payment";
import ReturnSection from "./ReturnSection";
import ProgressStepper from "./ProgressStepper";

export const getStepIndex = (status: string): number => {
  const arr = [
    ["Request"],
    ["ProdDelivering", "Payment"],
    ["ContentInProgress", "ContentOnHold"],
    [
      "ContentInReview",
      "ContentSent",
      "ProdRejected",
      "ProdApproved",
      "ContentRejected",
    ],
    ["ContentReceived", "ContentApproved", "ContentEditRequest"],
  ];

  const index = arr.findIndex((item) => item.includes(status));
  return index == -1 ? 0 : index;
};

export const getCurrentStepColor = (status: string): CurrentStepStatus => {
  const arr = {
    green: [
      "Request",
      "ProdApproved",
      "ContentApproved",
      "ContentReceived",
      "ContentEditRequest",
    ],
    yellow: [
      "ProdDelivering",
      "ContentInProgress",
      "ContentInReview",
      "Payment",
    ],
    red: ["ContentOnHold", "ProdRejected", "ContentRejected"],
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
  const [activeStep, setActiveStep] = useState<number>(0);
  const [dialogType, setDialogType] = useState<DialogType>(DialogType.PROGRESS);
  const [openReturnSection, setOpenReturnSection] = useState<boolean>(false);
  const userType = Cookies.get("userType");
  const userInfo = Cookies.get("user-info");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

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
      setActiveStep(getStepIndex(content.Status));
      setOpenReturnSection(false);
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
        {/* {content.Status === "Request" ? ( */}
        {dialogType == DialogType.REQUEST ? (
          <ContentReturnModal requestId={content?.ContentId} />
        ) : (
          <></>
        )}
        {/* {dialogType == DialogType.CONTENT_REJECTED ? ( */}
        {content.Status === "ProdRejected" &&
          dialogType != DialogType.CONTENT_IN_PROGRESS && (
            <FeedbackModal
              parsedUserInfo={parsedUserInfo}
              contentId={content?.ContentId}
              feedbacks={content?.FeedBacks}
              setDialogType={setDialogType}
            />
          )}

        {content.Status === "ProdDelivering" && openReturnSection && (
          <ReturnSection />
        )}
        {/* {content.Status === "ContentInProgress" ? ( */}
        {dialogType == DialogType.CONTENT_IN_PROGRESS ? (
          <ContentUploadModal
            parsedUserInfo={parsedUserInfo}
            contentId={content?.ContentId}
          />
        ) : null}
        {/* {content.Status === "ContentReceived" ? ( */}
        {content.Status === "ContentReceived" && (
          <ContentReviewModal p={content} />
        )}

        {dialogType == DialogType.PAYMENT && <Payment content={content} />}

        {content.Status === "ContentEditRequest" &&
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
              <button
                onClick={() => setDialogType(DialogType.CONTENT_IN_PROGRESS)}
                className="mt-5 sm:mt-10 w-full py-2 text-white font-semibold bg-[#CA7FFE] rounded-lg"
              >
                Дахин илгээх
              </button>
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
        {content.Status == "ContentOnHold" &&
          ![DialogType.CONTENT_IN_PROGRESS, DialogType.PAYMENT].includes(
            dialogType
          ) && (
            <div className="w-full flex flex-col gap-2 border-[2px] border-[#F49D19] rounded-xl p-5 mt-2">
              <h3 className="text-lg font-semibold">Сануулга !</h3>
              <p className="text-sm bg-[#F5F4F0] rounded-lg p-4">
                Та контент илгээх хугацаанаасаа 3 хоног хоцорсон байна. <br />
                Таны дараагийн бүтээгдэхүүн хүсэх эрх 3 хоног хаагдах болно
              </p>
            </div>
          )}
      </>
    );
  };

  const creatorModalFooterActions = () => {
    return (
      <>
        {content.Status === "Payment" && dialogType != DialogType.PAYMENT && (
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
        {content.Status === "Request" && dialogType != DialogType.REQUEST && (
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
        {content.Status === "ProdDelivering" && (
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
          content.Status === "ContentInProgress" &&
            dialogType != DialogType.CONTENT_IN_PROGRESS && (
              <div className="pt-2">
                <button
                  onClick={() => setDialogType(DialogType.CONTENT_IN_PROGRESS)}
                  className="w-full text-center text-xs sm:text-base bg-[#CA7FFE] mt-2 px-5 py-2 rounded-lg text-white font-bold"
                >
                  Контент илгээх
                </button>
              </div>
            )
          // <ContentUploadModal
          //   parsedUserInfo={parsedUserInfo}
          //   contentId={content?.ContentId}
          // />
        }
        {content.Status === "ContentOnHold" &&
          ![DialogType.CONTENT_IN_PROGRESS, DialogType.PAYMENT].includes(
            dialogType
          ) && (
            <div className="border-t pt-2">
              {true ? (
                <button
                  onClick={() => setDialogType(DialogType.CONTENT_IN_PROGRESS)}
                  className="w-full text-center text-xs sm:text-base bg-[#CA7FFE] mt-2 px-5 py-2 rounded-lg text-white font-bold"
                >
                  Контент илгээх
                </button>
              ) : (
                <button
                  onClick={() => setDialogType(DialogType.PAYMENT)}
                  className="w-full text-center text-xs sm:text-base bg-[#CA7FFE] mt-2 px-5 py-2 rounded-lg text-white font-bold"
                >
                  Төлбөр төлөх
                </button>
              )}
            </div>
          )}
        {/* {content.Status === "ContentReceived" &&
          dialogType != DialogType.CONTENT_RECEIVED && (
            // <ContentReviewModal p={content} />
            <button
              onClick={() => setDialogType(DialogType.CONTENT_RECEIVED)}
              className="bg-[#4D55F5] whitespace-nowrap border-[1px] border-[#2D262D] px-4 py-2 rounded-lg text-white font-bold"
            >
              Сэтгэгдэл харах
            </button>
          )} */}
      </>
    );
  };

  const brandModalFooterActions = () => {
    return (
      <>
        {getStepIndex(content.Status) >= 3 &&
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
        {content.Status == "ContentOnHold" && (
          <div className="w-full flex flex-col gap-2 border-[2px] border-[#F49D19] rounded-xl p-5">
            <h3 className="text-lg font-semibold">Сануулга !</h3>
            <p className="text-sm bg-[#F5F4F0] rounded-lg p-4">
              Контент бүтээгчид 7 хоногоос дээш хоцроосон тохиолдолд бид таны
              Geni Credit-г нөхөн олгох боломжгүй болно.
            </p>
          </div>
        )}

        {content.Status == "ContentReceived" && (
          <div className="h-[calc(700px-40px)] lg:h-[calc(539px-40px)] w-full flex flex-col p-4">
            <p>Танд контент бүтээгчид өгсөн дундаж оноо: 123</p>
          </div>
        )}

        {content.Status == "ContentEditRequest" && (
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
        )}
      </>
    );
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <AlignJustify className="w-10 h-10 text-[#6F6F6F] border-[1px] border-[#F5F4F0] rounded-lg p-2" />
        </DialogTrigger>
        {/* @ts-ignore */}
        <DialogContent
          className="overflow-y-auto flex flex-col lg:flex-row items-center lg:items-start p-6 max-h-[739px] max-w-[1000px] w-full sm:w-auto rounded-3xl"
          hideCloseButton={true}
          aria-describedby="content-progress-modal"
        >
          <DialogTitle></DialogTitle>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className="h-full w-full">
              <div className="h-[calc(539px-40px)] lg:h-[calc(539px-40px)] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 flex flex-col gap-2 p-1">
                {dialogType == DialogType.PROGRESS && (
                  <ProgressStepper
                    content={content}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    steps={steps}
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContentProgressModalContent;
