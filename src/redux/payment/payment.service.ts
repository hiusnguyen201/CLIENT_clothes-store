import { convertToSearchParams } from "@/utils/object";
import { apiInstance } from "@/redux/api";
import {
  GetListPaymentPayload,
  GetListPaymentResponse,
  GetPaymentPayload,
  GetPaymentResponse,
  ExportListPaymentExcelResponse,
} from "@/redux/payment/payment.type";

export const getListPaymentService = async (payload: GetListPaymentPayload): Promise<GetListPaymentResponse> => {
  return await apiInstance.get(`/payments/get-payments?${convertToSearchParams(payload)}`);
};

export const exportListPaymentExcelService = async (
  payload: GetListPaymentPayload
): Promise<ExportListPaymentExcelResponse> => {
  return await apiInstance.get(`/payments/export-excel?${convertToSearchParams(payload)}`, {
    responseType: "blob",
  });
};

export const getPaymentService = async (payload: GetPaymentPayload): Promise<GetPaymentResponse> => {
  return await apiInstance.get(`/payments/get-payment-by-id/${payload.id}`);
};
