import { apiInstance } from "@/redux/api";
import {
  GetActivityReportPayload,
  GetActivityReportResponse,
  GetCustomerReportPayload,
  GetCustomerReportResponse,
  GetOrderReportPayload,
  GetOrderReportResponse,
  GetRecentOrdersPayload,
  GetRecentOrdersResponse,
  GetRevenueReportPayload,
  GetRevenueReportResponse,
  GetSalesReportPayload,
  GetSalesReportResponse,
  GetTopProductVariantsPayload,
  GetTopProductVariantsResponse,
  GetUserReportPayload,
  GetUserReportResponse,
} from "@/redux/report/report.type";
import { convertToSearchParams } from "@/utils/object";

export const getUserReportService = async (payload: GetUserReportPayload): Promise<GetUserReportResponse> => {
  return await apiInstance.get(`/report/users?${convertToSearchParams(payload)}`);
};

export const getCustomerReportService = async (
  payload: GetCustomerReportPayload
): Promise<GetCustomerReportResponse> => {
  return await apiInstance.get(`/report/customers?${convertToSearchParams(payload)}`);
};

export const getOrderReportService = async (payload: GetOrderReportPayload): Promise<GetOrderReportResponse> => {
  return await apiInstance.get(`/report/orders?${convertToSearchParams(payload)}`);
};

export const getRevenueReportService = async (payload: GetRevenueReportPayload): Promise<GetRevenueReportResponse> => {
  return await apiInstance.get(`/report/revenue?${convertToSearchParams(payload)}`);
};

export const getTopProductVariantsService = async (
  payload: GetTopProductVariantsPayload
): Promise<GetTopProductVariantsResponse> => {
  return await apiInstance.get(`/report/products/top-sale?${convertToSearchParams(payload)}`);
};

export const getActivityReportService = async (
  payload: GetActivityReportPayload
): Promise<GetActivityReportResponse> => {
  return await apiInstance.get(`/report/activity-logs?${convertToSearchParams(payload)}`);
};

export const getSalesReportService = async (payload: GetSalesReportPayload): Promise<GetSalesReportResponse> => {
  return await apiInstance.get(`/report/sales?${convertToSearchParams(payload)}`);
};

export const getRecentOrdersService = async (payload: GetRecentOrdersPayload): Promise<GetRecentOrdersResponse> => {
  return await apiInstance.get(`/report/orders/recent?${convertToSearchParams(payload)}`);
};
