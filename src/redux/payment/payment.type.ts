import { Nullable, Optional } from "@/types/common";
import { BaseResponse, GetListParams, GetListResponseData } from "@/types/response";
import { Payment, PAYMENT_STATUS } from "@/types/payment";

/**
 * State
 */
export interface PaymentState {
  loading: {
    getListPayment: boolean;
    getPayment: boolean;
    exportListPaymentExcel: boolean;
  };
  item: Nullable<Payment>;
  list: Payment[];
  totalCount: number;
  error: Nullable<string>;
}

/**
 * Get List Payment
 */
export type PaymentFieldsSort = Extract<"createdAt" | "paymentMethod" | "amountPaid" | "status", Payment>;
export interface GetListPaymentPayload extends GetListParams<Payment> {
  sortBy?: Optional<Nullable<PaymentFieldsSort>>;
  status?: Optional<Nullable<PAYMENT_STATUS>>;
}
export interface GetListPaymentResponse extends GetListResponseData<Payment> {}

/**
 * Export List Payment To Excel
 */
export interface ExportListPaymentExcelResponse extends Blob {}

/**
 * Get Payment
 */
export interface GetPaymentPayload {
  id: string;
}
export interface GetPaymentResponse extends BaseResponse<Payment> {}
