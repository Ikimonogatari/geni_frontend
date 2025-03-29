import Stepper, { CurrentStepStatus } from "@/components/Stepper";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AlignJustify, CirclePlay, Truck, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
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

type ContentProgressModalContentProps = {
  content: Content;
};

const ContentProgressModalContent: React.FC<
  ContentProgressModalContentProps
> = ({ content }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [dialogType, setDialogType] = useState<DialogType>(DialogType.PROGRESS);
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
    },
    // validationSchema: addCreatorDetailsSchema,
    onSubmit: async (values) => {
      try {
        if (dialogType == DialogType.EDIT_REQUEST) {
          console.log(pick(values, ["reasons"]));
        } else if (dialogType == DialogType.ACCEPT_REQUEST) {
          console.log(pick(values, ["reasons"]));
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

  const getStepIndex = (status: string): number => {
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
      ["ContentReceived", "ContentApproved"],
    ];

    const index = arr.findIndex((item) => item.includes(status));
    return index == -1 ? 0 : index;
  };

  const getCurrentStepColor = (status: string): CurrentStepStatus => {
    const arr = {
      green: ["Request", "ProdApproved", "ContentApproved", "ContentReceived"],
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

  if (!content) return <></>;

  const createrModalContents = () => {
    return (
      <>
        {/* {content.Status === "Request" ? ( */}
        {dialogType == DialogType.REQUEST ? (
          <ContentReturnModal requestId={content?.ContentId} />
        ) : (
          <></>
        )}
        {/* {content.Status === "ContentRejected" ? ( */}
        {dialogType == DialogType.CONTENT_REJECTED ? (
          <FeedbackModal
            parsedUserInfo={parsedUserInfo}
            contentId={content?.ContentId}
            feedbacks={content?.FeedBacks}
          />
        ) : (
          <></>
        )}
        {/* {content.Status === "ContentInProgress" ? ( */}
        {dialogType == DialogType.CONTENT_IN_PROGRESS ? (
          <ContentUploadModal
            parsedUserInfo={parsedUserInfo}
            contentId={content?.ContentId}
          />
        ) : null}
        {/* {content.Status === "ContentReceived" ? ( */}
        {dialogType == DialogType.CONTENT_RECEIVED ? (
          <ContentReviewModal p={content} />
        ) : null}

        {dialogType == DialogType.PAYMENT && <Payment content={content} />}
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
          <EditRequest content={content} formik={formik} />
        )}

        {dialogType == DialogType.ACCEPT_REQUEST && (
          <AcceptRequest formik={formik} />
        )}
      </>
    );
  };

  const creatorModalTriggersAndMessage = () => {
    return (
      <>
        {content.Status == "ContentOnHold" && (
          <div className="w-full flex flex-col gap-2 border-[2px] border-[#F49D19] rounded-xl p-5 mt-2">
            <h3 className="text-lg font-semibold">Сануулга !</h3>
            <p className="text-sm bg-[#F5F4F0] rounded-lg p-4">
              Та контент илгээх хугацаанаасаа 3 хоног хоцорсон байна. <br />
              Таны дараагийн бүтээгдэхүүн хүсэх эрх 3 хоног хаагдах болно
            </p>
          </div>
        )}
        {content.Status === "Payment" && (
          <button
            onClick={() => setDialogType(DialogType.PAYMENT)}
            className="w-full text-center text-xs sm:text-base bg-secondary px-3 mt-2 sm:px-5 py-2 rounded-lg text-white font-bold"

            // className="bg-secondary text-white py-1 sm:py-2 font-bold rounded-lg transition-all"
          >
            Төлбөр төлөх
          </button>
        )}
        {content.Status === "Request" && (
          <button
            onClick={() => setDialogType(DialogType.REQUEST)}
            // className="text-xs sm:text-base flex flex-row items-center gap-2 bg-[#4D55F5] border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 rounded-lg text-white font-bold"
            className="w-full text-center text-xs sm:text-base bg-geni-gray px-3 mt-2 sm:px-5 py-2 rounded-lg text-white font-bold"
          >
            Хүсэлт буцаах
          </button>
        )}
        {/* {content.Status === "Delivered" && (
          <button
            onClick={() => setDialogType(DialogType.REQUEST)}
            // className="text-xs sm:text-base flex flex-row items-center gap-2 bg-[#4D55F5] border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 rounded-lg text-white font-bold"
            className="w-full text-center text-xs sm:text-base bg-geni-gray px-3 mt-2 sm:px-5 py-2 rounded-lg text-white font-bold"
          >
            Бүтээгдэхүүн буцаах
          </button>
        )} */}
        {content.Status === "ContentRejected" && (
          <button
            onClick={() => setDialogType(DialogType.CONTENT_REJECTED)}
            className="w-full text-center text-xs sm:text-base bg-[#F49D19] mt-2 px-5 py-2 rounded-lg text-white font-bold"
          >
            Дэлгэрэнгүй
          </button>
        )}
        {
          ["ContentInProgress", "ContentOnHold"].includes(content.Status) && (
            <button
              onClick={() => setDialogType(DialogType.CONTENT_IN_PROGRESS)}
              className="w-full text-center text-xs sm:text-base bg-[#CA7FFE] mt-2 px-5 py-2 rounded-lg text-white font-bold"
            >
              Контент илгээх
            </button>
          ) // <ContentUploadModal
          //   parsedUserInfo={parsedUserInfo}
          //   contentId={content?.ContentId}
          // />
        }
        {content.Status === "ContentReceived" && (
          // <ContentReviewModal p={content} />
          <button
            onClick={() => setDialogType(DialogType.CONTENT_RECEIVED)}
            className="bg-[#4D55F5] whitespace-nowrap border-[1px] border-[#2D262D] px-4 py-2 rounded-lg text-white font-bold"
          >
            Сэтгэгдэл харах
          </button>
        )}
      </>
    );
  };

  const brandModalTriggersAndMessage = () => {
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

        {getStepIndex(content.Status) == 4 && (
          <div className="h-[calc(700px-40px)] lg:h-[calc(539px-40px)] w-full flex flex-col p-4">
            <p>Танд контент бүтээгчид өгсөн дундаж оноо: 123</p>
            <div className="flex flex-col gap-3 border-geni-gray border-[1px] rounded-xl p-4 pt-0">
              <div className="flex flex-col gap-2 bg-white rounded-xl p-4">
                <p className="text-xl font-bold mb-2">
                  Контент пост хийх хүсэлт
                </p>
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
          </div>
        )}

        {/* Контент үзэх */}
        {getStepIndex(content.Status) >= 3 && (
          <>
            <button
              onClick={() => setDialogType(DialogType.CONTENT)}
              className="bg-secondary text-white py-1 sm:py-2 font-bold rounded-lg transition-all"
            >
              Контент үзэх
            </button>
          </>
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
          className="overflow-y-auto flex flex-col lg:flex-row items-center lg:items-start p-6 max-h-[739px] max-w-[1000px] w-full sm:w-auto lg:w-full rounded-3xl"
          hideCloseButton={true}
        >
          <DialogTitle></DialogTitle>
          <form
            onSubmit={formik.handleSubmit}
            className="h-full w-full flex flex-col gap-2"
          >
            {dialogType == DialogType.PROGRESS && (
              <div className="flex flex-col gap-6 h-full w-full">
                <div className="flex flex-row items-center gap-4 w-full h-full sm:min-w-[272px] bg-[#F5F4F0] rounded-2xl p-4">
                  <div className="basis-1/3 lg:flex-none">
                    <Image
                      src={content.ContentThumbnail || "/no-content-image.png"}
                      alt=""
                      width={200}
                      height={200}
                      className="rounded-2xl aspect-square object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2 basis-2/3 lg:grow">
                    <div className="flex flex-row gap-2 items-center justify-start">
                      <Image
                        src={"/no-content-image.png"}
                        alt=""
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <p className="text-xl font-bold">{content.Nickname}</p>
                    </div>
                    <p className="text-lg">{content.ProductName}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 w-full border-[1px] border-[#E6E6E6] rounded-xl p-5 lg:p-10">
                  <Stepper
                    steps={steps}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    currentStepStatus={
                      getCurrentStepColor(content.Status) as CurrentStepStatus
                    }
                    horizontal={true}
                  />
                  <div className="flex flex-row gap-8 w-full">
                    <div className="flex-none mx-5 lg:mx-24">
                      <Stepper
                        steps={Object.entries(myStates[activeStep]).map(
                          (_, index) => (
                            <div key={index} />
                          )
                        )}
                        labels={Object.entries(myStates[activeStep]).map(
                          ([key, value]) => ({
                            title: value,
                            // subtitle: "Контент илгээх сүүлийн хугацаа: 12.04.2025",
                            date: "12.04.2025",
                          })
                        )}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        currentStepStatus={
                          getCurrentStepColor(
                            content.Status
                          ) as CurrentStepStatus
                        }
                        horizontal={false}
                        hasBg={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {userType == "Creator" && createrModalContents()}
            {userType == "Brand" && brandModalContents()}
            {userType == "Creator" && creatorModalTriggersAndMessage()}
            {userType == "Brand" && brandModalTriggersAndMessage()}
          </form>

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
