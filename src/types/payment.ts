import { Order } from "@/types/order";

export enum PAYMENT_TYPE {
  OFFLINE = "offline",
  ONLINE = "online",
}

export enum OFFLINE_PAYMENT_METHOD {
  CASH = "cash",
  BANKING = "banking",
}

export enum ONLINE_PAYMENT_METHOD {
  COD = "cash on delivery",
  MOMO = "momo",
}

export enum PAYMENT_STATUS {
  PENDING = "pending",
  PAID = "paid",
  CANCELLED = "cancelled",
  REFUND = "refund",
}

export type Payment = {
  id: string;
  qrCodeUrl: string;
  status: PAYMENT_STATUS;
  paymentUrl: string;
  paymentMethod: ONLINE_PAYMENT_METHOD;
  amountPaid: number;
  paidDate: Date;
  transactionId: string;
  notes: string;
  order: Order;
  createdAt: Date;
  updatedAt: Date;
};
