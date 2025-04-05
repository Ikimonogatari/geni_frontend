export type BrandType = {
  BrandId: number;
  BrandTypeId: number;
  CreatedBy: number;
  CreatedAt: string;
  ModifiedBy: number;
  ModifiedAt: string;
  TypeName: string;
};

export type Content = {
  AdditionalAddress: string;
  BrandComment: string;
  BrandGivenPoint: number;
  BrandId: number;
  BrandInstructionPnt: number;
  BrandName: string;
  BrandProfileLink: string;
  BrandProfilePicId: number;
  BrandTypes: BrandType[] | null;
  Caption: string;
  ContentId: string;
  ContentPhase: string;
  ContentThumbnail: string;
  ContentVideo: string;
  ContentVideoFileId: number;
  ContextPnt: number;
  CreationPnt: number;
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
  LevelName: string;
  LvlId: number;
  CurrentStepId: number;
  CurrentStepName: {
    String: string;
    Valid: boolean;
  };
  Status: string;
};

export const STATUS_LIST_VALUE: Record<STATUS_LIST, string> = {
  RequestSent: "Хүсэлт илгээгдсэн",
  RequestApproved: "Хүсэлт баталгаажсан",
  RequestRejected: "Хүсэлт буцаагдсан",
  DeliveryPaymentPending: "Хүргэлтийн төлбөр төлөх",
  Delivery: "Хүргэгдэж байна",
  DeliverySuccess: "Хүргэгдсэн",
  DeliveryRefund: "Хүргэлт буцаагдсан",
  ContentPending: "Контент хүлээгдэж байна",
  ContentSent: "Контент илгээгдсэн",
  ContentOverDue: "Контент хоцорсон",
  ContentBanned: "Контент блоклогдсон",
  ContentBanPayment: "Төлбөр төлөгдсөн",
  GeniConfirming: "Geni шалгаж байна",
  ContentSentToBrand: "Брэндэд контент илгээгдсэн",
  BrandConfirming: "Брэнд шалгаж байна",
  ContentRejected: "Контент буцаагдсан",
  ContentApproved: "Контент хүлээн авсан",
  ContentFixRequest: "Засварлах хүсэлт илгээгдсэн",
  ContentReSent: "Контент дахин илгээгдсэн",
};

export enum STATUS_LIST {
  RequestSent = "RequestSent",
  RequestApproved = "RequestApproved",
  RequestRejected = "RequestRejected",
  DeliveryPaymentPending = "DeliveryPaymentPending",
  Delivery = "Delivery",
  DeliverySuccess = "DeliverySuccess",
  DeliveryRefund = "DeliveryRefund",
  ContentPending = "ContentPending",
  ContentSent = "ContentSent",
  ContentOverDue = "ContentOverDue",
  ContentBanned = "ContentBanned",
  ContentBanPayment = "ContentBanPayment",
  GeniConfirming = "GeniConfirming",
  ContentSentToBrand = "ContentSentToBrand",
  BrandConfirming = "BrandConfirming",
  ContentRejected = "ContentRejected",
  ContentApproved = "ContentApproved",
  ContentFixRequest = "ContentFixRequest",
  ContentReSent = "ContentReSent",
}

export type CurrentStepStatus = "yellow" | "green" | "red";

export const STATUS_STEPPER_MESSAGES = {
  [STATUS_LIST.Delivery]: "Бүтээгдэхүүн хүргэгдэх хугацаа: 1-2 өдөр",
  [STATUS_LIST.ContentPending]: "Контент илгээх сүүлийн хугацаа: ",
  [STATUS_LIST.ContentOverDue]: "Контент хоцорсон: ",
};

export enum DialogType {
  PROGRESS = "progress",
  CONTENT = "content",
  EDIT_REQUEST = "editRequest",
  ACCEPT_REQUEST = "acceptRequest",
  // SEND_CONTENT = "sendContent",
  PAYMENT = "payment",
  REQUEST = "request",
  CONTENT_REJECTED = "contentRejected",
  CONTENT_IN_PROGRESS = "contentInProgress",
  CONTENT_RECEIVED = "contentReceived",
}

export type FormikTypes = {
  reasons: string[];
  brandStar: number;
  contentStar: number;
  contentDesignStar: number;
  comment: string;
  returnReason: number[];
  returnReasonDescription: string;
  BrandFeedBack: number[];
  BrandReviewResendFeedback: number[];
};

export type GetContentProcessResponse = {
  ContentId: string;
  ContentProccessId: number;
  ContentStepId: number;
  StepName: string;
  ContentStepStatusCode: { String: string; Valid: boolean };
  ContentStepStatusId: number;
  Desc: { String: string; Valid: boolean };
  CreatedAt: string;
}[];

export enum DictCode {
  REFUND_REASON = "RefundReason",
  BRAND_FEEDBACK = "BrandFeedBack",
}

export type RefundReason = {
  DictId: number;
  DictCode: string;
  DictVal: string;
};

export type ContentProcessRefundParams = {
  ContentId: string;
  ReasonId: number[];
  ReasonDesc: string;
  StatusId: number;
};

export type ContentProcessWhenOverdueResponse = {
  Days: number;
  Xp: number;
  BanDate: string;
  BanDays: number;
};

export type BrandReviewParams = {
  ContentId: string;
  FixReason: string[];
};

export type FeedBackResponse = {
  BrandId: number;
  BrandReviewId: number;
  ContentId: string;
  CreatedAt: string;
  CreatedBy: number;
  CreatorChecked: boolean;
  FixReason: string;
  ModifiedAt: string;
  ModifiedBy: number;
}[];

export type BrandReceiveContentParams = {
  ContentId: string;
  Comment: string;
  InstructionStar: number;
  ContextStar: number;
  CreationStar: number;
  BrandFeedBack: number[];
};

export type ContentResendParams = {
  ContentId: string;
  Caption: string;
  ContentThumbnailFileId: number;
  ContentVideoFileId: number;
  BrandReviewId: number[];
};

export const getStepIndex = (status: string): number => {
  const arr = [
    ["RequestSent", "RequestApproved", "RequestRejected"],
    ["DeliveryPaymentPending", "Delivery", "DeliverySuccess", "DeliveryRefund"],
    [
      "ContentPending",
      "ContentSent",
      "ContentOverDue",
      "ContentBanned",
      "ContentBanPayment",
    ],
    ["GeniConfirming", "ContentSentToBrand", "ContentRejected"],
    [
      "ContentApproved",
      "ContentFixRequest",
      "ContentReSent",
      "BrandConfirming",
    ],
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
      "ContentBanPayment",
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
      "BrandConfirming",
    ],
    red: [
      "RequestRejected",
      "DeliveryRefund",
      "ContentOverDue",
      "ContentBanned",
      "ContentRejected",
    ],
  };

  return Object.keys(arr).find((key) =>
    arr[key].includes(status)
  ) as CurrentStepStatus;
};
