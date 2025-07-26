export type Badge = {
  BadgeProcess: BadgeProcess[];
};

export enum BADGE_STATE {
  SHOW = 'show',
  MONTHLY = 'Monthly'
}

export type BadgeProcess = {
  BadgeColorCode: string;
  BadgeImageUrl: string;
  BadgeName: string;
  BadgeId: number;
  BadgeState: BADGE_STATE;
  CurrentLvlName: string;
  CurrentLvl: number;
  CurrentTarget: number;
  NextLvl: number;
  NextTarget: number;
};

export type GetBadgeListResponse = Badge[];

export type BadgeDetail = {
  BadgeColorCode: string;
  BadgeImageUrl: string;
  BadgeName: string;
  BadgeId: number;
  CurrentLvlName: string;
  BadgeDescription: string;
  CurrentLvl: number;
  CurrentTarget: number;
  NextLvl: number;
  NextTarget: number;
  BadgeState: BADGE_STATE;
  BadgeRules: BadgeRule[];
};

export type BadgeRule = {
  TargetType: string;
  LvlName: string;
  RewardValue: string;
  RewardType: string;
  LvlId: number;
  TargetMin: number;
  TargetMax: number;
  BadgeId: number;
  ImageId: number;
  ColorId: number;
  ColorCode: string;
  ImageUrl: string;
  Condition: string;
};
