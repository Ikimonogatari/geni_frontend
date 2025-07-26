type StorepayBody = {
  PlanId: number;
  MobileNumber: string;
  PromoCode?: string;
};

type StorepayResponse = {
  qr_data?: string;
  user_txn_id?: string;
  error?: string;
};
