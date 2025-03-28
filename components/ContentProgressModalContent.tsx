import Stepper, {
  CurrentStepStatus,
} from "@/components/Stepper";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { CirclePlay, Truck, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import WatchContentModalContent from "../app/profile/_components/brand/WatchContentModalContent";
import { Field, FieldArray, Form, useFormik } from "formik";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";

type Content = {
  AdditionalAddress: string;
  BrandComment: string;
  BrandGivenPoint: number;
  BrandId: number;
  BrandInstructionPnt: number;
  BrandName: string;
  BrandProfileLink: string;
  BrandProfilePicId: number;
  BrandTypes: string | null;
  Caption: string;
  ContentId: string;
  ContentPhase: string;
  ContentThumbnail: string;
  ContentVideo: string;
  ContentVideoFileId: number;
  ContextPnt: number;
  CreatedAt: string;
  CreatedBy: number;
  CreatedPnt: number;
  CreatorId: number;
  Deadline: string | null;
  DeliveryPayment: boolean;
  FeedBacks: string | null;
  FirstName: string;
  IsDelivery: boolean;
  LastName: string;
  ModifiedAt: string;
  ModifiedBy: number;
  Nickname: string;
  PointCnfId: number;
  ProductId: string;
  ProductName: string;
  RequestReason: string;
  Star: number;
  Status: string;
};

type ContentProgressModalContentProps = {
  content: Content;
  userType?: "brand" | "creator";
};
const mainStates = {
  Request: "Хүсэлт илгээгдсэн",
  ProdDelivering: "Бүтээгдэхүүн хүргэж байна",
  ContentInProgress: "Контент хүлээгдэж байна",
  ContentSent: "Контент илгээсэн",
  ContentOnHold: "Контент хоцорсон",
  ContentInReview: "Geni шалгаж байна",
  ProdRejected: "Geni-гээс зөвшөөрөгдөөгүй",
  ContentSent2: "Контент илгээсэн",
  ProdApproved: "Geni-гээс зөвшөөрсөн",
  // ContentRejected: "Контент буцаагдсан",
  ContentReceived: "Контент хүлээн авсан",
  ContentApproved: "Контент зөвшөөрөгдсөн",
};

// huselt batalgaajsan
// hurgegdsen

const myStates = [
  {
    CreatorRequested: "Бүтээгч хүссэн",
    RequestAcceped: "Хүсэлт баталгаажсан",
  },
  {
    ProductDelivering: "Хүргэгдэж байна",
    ProductDelivered: "Хүргэгдсэн",
  },
  {
    ContentInProgress: "Контент хүлээгдэж байна",
    ContentDelayed: "Контент хоцорсон",
    // sanuulga
  },
  {
    ContentInProgress: "Контент хүлээгдэж байна",
    ContentSent: "Контент илгээгдсэн",
  },
  {
    ContentInReview: "Geni шалгаж байна",
    ContentSent2: "Контент илгээгдсэн",
  },
  {
    ContentApproved: "Контент зөвшөөрөгдсөн",
    ContentRejected: "Контент буцаагдсан",
    ContentReceived: "Контент хүлээн авсан",
  },
  {
    ContentReceived: "Контент хүлээн авсан",
  },
  {
    EditRequest: "Засах хүсэлт илгээгдсэн",
    ContentReSent: "Контент дахин илгээгдсэн",
    ContentReceived: "Контент хүлээн авсан",
  },
];

enum DialogType {
  PROGRESS = "progress",
  CONTENT = "content",
  EDIT_REQUEST = "editRequest",
  ACCEPT_REQUEST = "acceptRequest",
}

const MAX_REASONS = 3;

const ContentProgressModalContent: React.FC<
  ContentProgressModalContentProps
> = ({ content, userType = "brand" }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [dialogType, setDialogType] = useState<DialogType>(DialogType.PROGRESS);

  const pick = (obj, keys) =>
    Object.fromEntries(
      keys
        .map((key) => [key, obj[key]])
        .filter(([_, value]) => value !== undefined)
    );

  const formik = useFormik({
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

  const addReason = () => {
    if (formik.values.reasons.length < MAX_REASONS) {
      formik.setFieldValue("reasons", [...formik.values.reasons, ""]);
    }
  };

  const removeReason = (index: number) => {
    formik.setFieldValue(
      "reasons",
      formik.values.reasons.filter((_, i) => i !== index)
    );
  };

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

  // Create status labels from myStates array
  const statusLabels = myStates.map((stateGroup, index) => {
    const values = Object.values(stateGroup);
    return values.join(" / ");
  });

  const getStepIndex = (status: string): number => {
    const arr = [
      ["Request"],
      ["ProdDelivering"],
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

    return arr.findIndex((item) => item.includes(status)) || 0;
  };

  const getCurrentStepColor = (status: string): CurrentStepStatus => {
    const arr = {
      green: ["Request", "ProdApproved", "ContentApproved", "ContentReceived"],
      yellow: ["ProdDelivering", "ContentInProgress", "ContentInReview", ""],
      red: ["ContentOnHold", "ProdRejected", "ContentRejected"],
    };

    return Object.keys(arr).find((key) =>
      arr[key].includes(status)
    ) as CurrentStepStatus;
  };

  const handleClose = (currentDialogType: DialogType) => {
    if (currentDialogType == DialogType.CONTENT) {
      setDialogType(DialogType.PROGRESS);
    } else if (currentDialogType == DialogType.EDIT_REQUEST) {
      setDialogType(DialogType.CONTENT);
    } else if (currentDialogType == DialogType.ACCEPT_REQUEST) {
      setDialogType(DialogType.CONTENT);
    }
    formik.resetForm();
  };

  if (!content) return <></>;

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="h-full w-full">
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
                      getCurrentStepColor(content.Status) as CurrentStepStatus
                    }
                    horizontal={false}
                    hasBg={false}
                  />
                </div>
              </div>
            </div>

            {/* Контент хоцорсон сануулга */}
            {content.Status == "ContentOnHold" && (
              <div className="w-full flex flex-col gap-2 border-[2px] border-[#F49D19] rounded-xl p-5">
                <h3 className="text-lg font-semibold">Сануулга !</h3>
                <p className="text-sm bg-[#F5F4F0] rounded-lg p-4">
                  Контент бүтээгчийд 7 хоногоос дээш хоцроосон тохиолдолд бид
                  таны Geni Credit-г нөхөн олгох боломжгүй болно.
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
                {/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="overflow-y-auto flex flex-col lg:flex-row items-center lg:items-start max-h-[739px] max-w-[1000px] min-h-[700px] lg:min-h-[539px] lg:min-w-[700px] w-full sm:w-auto lg:w-full rounded-3xl">
                  <WatchContentModalContent
                    thumbnailImg={content.ContentThumbnail}
                    contentVideo={content.ContentVideo}
                    description={content.Caption}
                    contentId={content.ContentId}
                  />
                </DialogContent>
              </Dialog> */}
              </>
            )}
          </div>
        )}
        {dialogType == DialogType.CONTENT && (
          <div className="h-[calc(700px-40px)] lg:h-[calc(539px-40px)] w-full flex flex-col p-4 gap-3">
            <p className="text-xl font-bold">Контент үзэх</p>
            <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
              <div className="lg:basis-1/2 flex flex-row gap-4">
                <div className="basis-1/2 flex flex-col min-h-0 gap-2">
                  <p className="text-sm font-bold">Контент</p>
                  <video
                    src={content.ContentVideo}
                    className="rounded-lg border-[1px] border-[#E6E6E6] flex-1 min-h-0"
                  />
                </div>
                <div className="basis-1/2 flex flex-col min-h-0 gap-2">
                  <p className="text-sm font-bold">Thumbnail зураг</p>
                  <Image
                    src={content.ContentThumbnail || "/no-content-image.png"}
                    alt="thumbnail"
                    height={0}
                    width={0}
                    className="rounded-lg border-[1px] border-[#E6E6E6] w-full flex-1 object-cover min-h-0"
                  />
                </div>
              </div>
              <div className="lg:basis-1/2 flex flex-col justify-between min-h-0 grow">
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-bold">Тайлбар</p>
                  <caption className="grow text-start text-sm text-[#6F6F6F]">
                    {content.Caption}
                  </caption>
                </div>
                <div className="flex flex-col justify-between gap-2">
                  <button
                    className="bg-[#F49D19] text-white py-1 sm:py-2 font-bold rounded-lg sm:rounded-lg transition-all"
                    onClick={() => setDialogType(DialogType.EDIT_REQUEST)}
                  >
                    Контент засах хүсэлт илгээх
                  </button>
                  <button
                    className="bg-secondary text-white py-1 sm:py-2 font-bold rounded-lg sm:rounded-lg transition-all"
                    onClick={() => setDialogType(DialogType.ACCEPT_REQUEST)}
                  >
                    Контент хүлээж авах
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {dialogType == DialogType.EDIT_REQUEST && (
          <div className="h-[calc(700px-40px)] lg:h-[calc(539px-40px)] w-full flex flex-col p-4">
            <div className="flex-1 overflow-y-auto pr-2">
              <p className="text-xl font-bold mb-3">
                Контент засах хүсэлт илгээх
              </p>
              <div className="flex flex-col gap-3">
                {formik.values.reasons.map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Textarea
                      rows={2}
                      charCount={formik.values.reasons[index].length}
                      maxLength={600}
                      name={`reasons.${index}`}
                      value={formik.values.reasons[index]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Та өөр шалтгаанаа энд бичнэ үү."
                      errorText={formik.errors.reasons?.[index]}
                      errorVisible={
                        formik.touched.reasons?.[index] &&
                        !!formik.errors.reasons?.[index]
                      }
                      wrapperClassName="w-full"
                    />
                    {/* <button
                      type="button"
                      onClick={() => removeReason(index)}
                      disabled={formik.values.reasons.length === 1}
                    >
                      ✖
                    </button> */}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addReason}
                  disabled={formik.values.reasons.length >= MAX_REASONS}
                  className={`w-full border border-geni-gray rounded-xl py-3 flex items-center justify-center hover:bg-gray-50 ${
                    formik.values.reasons.length >= MAX_REASONS
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <span className="text-[#6F6F6F]">➕</span>
                </button>

                <p className="text-sm text-[#6F6F6F] text-center text-white bg-[#F49D19] rounded-lg p-2">
                  Та хамгийн ихдээ {MAX_REASONS} засвар илгээх боломжтой.
                </p>
                {/* {formik.values.reasons.length == MAX_REASONS && (
                )} */}
              </div>
            </div>
            <div className="pt-4 mt-auto border-t">
              <button
                type="submit"
                className="w-full bg-secondary text-white py-3 font-bold rounded-xl"
              >
                Засвар илгээх
              </button>
            </div>
          </div>
        )}

        {dialogType == DialogType.ACCEPT_REQUEST && (
          <div className="h-[calc(700px-40px)] lg:h-[calc(539px-40px)] w-full flex flex-col p-4">
            <div className="flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
              <div className="flex flex-col gap-6">
                <p className="text-xl font-bold">
                  Та контент бүтээгчид оноо өгнө үү
                </p>
                <div className="flex flex-col gap-4 border-[1px] border-[#E6E6E6] rounded-xl p-4">
                  <div className="flex flex-col gap-2">
                    <p>Брэндийн өгсөн чиглүүлгийн дагуу хийсэн эсэх</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() =>
                            formik.setFieldValue("brandStar", star)
                          }
                          className={`text-2xl ${
                            formik.values.brandStar >= star
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p>Контентын агуулга</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() =>
                            formik.setFieldValue("contentStar", star)
                          }
                          className={`text-2xl ${
                            formik.values.contentStar >= star
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p>Контентын хийцлэл</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() =>
                            formik.setFieldValue("contentDesignStar", star)
                          }
                          className={`text-2xl ${
                            formik.values.contentDesignStar >= star
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-xl font-bold">
                    Та контент бүтээгчид сэтгэгдлээ үлдээнэ үү
                  </p>
                  <Textarea
                    rows={3}
                    name="comment"
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Энд бичнэ үү."
                    maxLength={600}
                    max={true}
                    charCount={formik.values.comment?.length}
                    wrapperClassName="w-full"
                  />
                </div>

                <div className="flex flex-col gap-3 border-geni-gray border-[1px] rounded-xl p-4 pt-0">
                  <div className="flex flex-col gap-2 bg-white rounded-xl p-4">
                    <p className="text-xl font-bold mb-2">
                      Контент пост хийх хүсэлт
                    </p>
                    <label className="flex items-center justify-between p-2 border rounded-xl">
                      <span>
                        Контент бүтээгч өөрийн сувaг дээр пост хийх /Instagram,
                        Facebook/
                      </span>
                      <input
                        type="checkbox"
                        name="sharePost"
                        checked={formik.values.sharePost}
                        onChange={formik.handleChange}
                        className="w-5 h-5"
                      />
                    </label>
                    <label className="flex items-center justify-between p-2 border rounded-xl">
                      <span>"Collab" пост хийх /Instagram, Facebook/</span>
                      <input
                        type="checkbox"
                        name="collabPost"
                        checked={formik.values.collabPost}
                        onChange={formik.handleChange}
                        className="w-5 h-5"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 mt-auto border-t">
              <button
                type="submit"
                className="w-full bg-secondary text-white py-3 font-bold rounded-xl"
              >
                Хүлээж авах
              </button>
            </div>
          </div>
        )}
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
    </>
  );
};

export default ContentProgressModalContent;
