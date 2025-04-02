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

export const STATUS_LIST_VALUE = {
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
  GeniConfirming: "Geni шалгаж байна",
  ContentSentToBrand: "Брэндэд контент илгээгдсэн",
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
  GeniConfirming = "GeniConfirming",
  ContentSentToBrand = "ContentSentToBrand",
  ContentRejected = "ContentRejected",
  ContentApproved = "ContentApproved",
  ContentFixRequest = "ContentFixRequest",
  ContentReSent = "ContentReSent",
}

// export const mainStates = {
//   Request: "Хүсэлт илгээгдсэн",
//   ProdDelivering: "Бүтээгдэхүүн хүргэж байна",
//   ContentInProgress: "Контент хүлээгдэж байна",
//   ContentSent: "Контент илгээсэн",
//   ContentOnHold: "Контент хоцорсон",
//   ContentInReview: "Geni шалгаж байна",
//   ProdRejected: "Geni-гээс зөвшөөрөгдөөгүй",
//   ContentSent2: "Контент илгээсэн",
//   ProdApproved: "Geni-гээс зөвшөөрсөн",
//   ContentRejected: "Контент буцаагдсан",
//   ContentReceived: "Контент хүлээн авсан",
//   ContentApproved: "Контент зөвшөөрөгдсөн",
//   ContentEditRequest: "Контент дахин илгээгдсэн",
// };

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
  sharePost: boolean;
  collabPost: boolean;
  returnReason: number[];
  returnReasonDescription: string;
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
}

export type RefundReason = {
  DictId: number;
  DictCode: string;
  DictVal: string;
}

export type ContentProcessRefundParams = {
  ContentId: string;
  ReasonId: number[];
  ReasonDesc: string;
  StatusId: number;
}
