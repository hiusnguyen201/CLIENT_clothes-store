import { convertToSearchParams } from "@/utils/object";
import { apiInstance } from "@/redux/api";
import {
  CreateCustomerResponse,
  GetListCustomerPayload,
  GetListCustomerResponse,
  CreateCustomerPayload,
  GetCustomerPayload,
  GetCustomerResponse,
  EditCustomerInfoPayload,
  EditCustomerInfoResponse,
  RemoveCustomerPayload,
  RemoveCustomerResponse,
  ExportListCustomerExcelResponse,
  ImportListCustomerPayload,
  TestImportListCustomerResponse,
  LiveImportListCustomerResponse,
} from "@/redux/customer/customer.type";

export const testImportListCustomerExcelService = async (
  payload: ImportListCustomerPayload
): Promise<TestImportListCustomerResponse> => {
  return await apiInstance.post(`/customers/test-import`, payload);
};

export const liveImportListCustomerExcelService = async (
  payload: ImportListCustomerPayload
): Promise<LiveImportListCustomerResponse> => {
  return await apiInstance.post(`/customers/live-import`, payload);
};

export const createCustomerService = async (payload: CreateCustomerPayload): Promise<CreateCustomerResponse> => {
  return await apiInstance.post("/customers/create-customer", payload);
};

export const getListCustomerService = async (payload: GetListCustomerPayload): Promise<GetListCustomerResponse> => {
  return await apiInstance.get(`/customers/get-customers?${convertToSearchParams(payload)}`);
};

export const exportListCustomerExcelService = async (
  payload: GetListCustomerPayload
): Promise<ExportListCustomerExcelResponse> => {
  return await apiInstance.get(`/customers/export-excel?${convertToSearchParams(payload)}`, {
    responseType: "blob",
  });
};

export const getCustomerService = async (payload: GetCustomerPayload): Promise<GetCustomerResponse> => {
  return await apiInstance.get(`/customers/get-customer-by-id/${payload.id}`);
};

export const editCustomerInfoService = async (payload: EditCustomerInfoPayload): Promise<EditCustomerInfoResponse> => {
  return await apiInstance.put(`/customers/update-customer-by-id/${payload.id}`, payload);
};

export const removeCustomerService = async (payload: RemoveCustomerPayload): Promise<RemoveCustomerResponse> => {
  return await apiInstance.delete(`/customers/remove-customer-by-id/${payload.id}`);
};
