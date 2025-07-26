export enum MessageType {
  SYSTEM_ALERT = "SYSTEM_ALERT",
  BADGE = "BADGE",
}

export type WSMessage =
  | {
      type: MessageType.SYSTEM_ALERT;
      data: { message: string; level: "info" | "warn" | "error" };
    }
  | { type: MessageType.BADGE; data: BadgeMessageData };

export interface BadgeMessageData {
  type: string;
  data: BadgeData;
  user_id: string;
  time: string;
}

export interface BadgeData {
  PrevBadge: Badge;
  NewBadge: Badge;
};


export type Badge = {
  BadgeName: string;
  BadgeImageUrl: string;
  BadgeDescription: string;
  LvlName: string;
  LvlId: number;
  Target: number;
  TargetMin: number;
  TargetMax: number;
};
