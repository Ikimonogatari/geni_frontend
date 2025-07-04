export type Badge = {
  BadgeProcess: BadgeProcess[];
};

export type BadgeProcess = {
  BadgeColorCode: string;
  BadgeImageUrl: string;
  BadgeName: string;
  CurrentLvlName: string;
  CurrentLvl: number;
  CurrentTarget: number;
  NextLvl: number;
  NextTarget: number;
};

export type GetBadgeListResponse = Badge[];
