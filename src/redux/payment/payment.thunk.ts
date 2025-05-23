import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getListPaymentService,
  getPaymentService,
  exportListPaymentExcelService,
} from "@/redux/payment/payment.service";
import {
  GetListPaymentPayload,
  GetListPaymentResponse,
  GetPaymentPayload,
  GetPaymentResponse,
  ExportListPaymentExcelResponse,
} from "@/redux/payment/payment.type";
import { ThunkApiConfig } from "@/types/thunk-api";
import { downloadFileBlob } from "@/utils/object";

export const getListPayment = createAsyncThunk<GetListPaymentResponse, GetListPaymentPayload, ThunkApiConfig>(
  "payment/get-list-payment",
  async (filters, { rejectWithValue }) => {
    try {
      const response: GetListPaymentResponse = await getListPaymentService(filters);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const exportListPaymentExcel = createAsyncThunk<void, GetListPaymentPayload, ThunkApiConfig>(
  "payment/export-list-payment-excel",
  async (filters, { rejectWithValue }) => {
    try {
      const data: ExportListPaymentExcelResponse = await exportListPaymentExcelService(filters);
      downloadFileBlob(data, "payments-list.xlsx");
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getPayment = createAsyncThunk<GetPaymentResponse, GetPaymentPayload, ThunkApiConfig>(
  "payment/get-payment",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetPaymentResponse = await getPaymentService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);
