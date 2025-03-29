export type Content = {
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

export const mainStates = {
  Request: "Хүсэлт илгээгдсэн",
  ProdDelivering: "Бүтээгдэхүүн хүргэж байна",
  ContentInProgress: "Контент хүлээгдэж байна",
  ContentSent: "Контент илгээсэн",
  ContentOnHold: "Контент хоцорсон",
  ContentInReview: "Geni шалгаж байна",
  ProdRejected: "Geni-гээс зөвшөөрөгдөөгүй",
  ContentSent2: "Контент илгээсэн",
  ProdApproved: "Geni-гээс зөвшөөрсөн",
  ContentRejected: "Контент буцаагдсан",
  ContentReceived: "Контент хүлээн авсан",
  ContentApproved: "Контент зөвшөөрөгдсөн",
};

// huselt batalgaajsan
// hurgegdsen

export const myStates = [
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
  returnReason: string;
};
