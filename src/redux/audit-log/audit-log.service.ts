import { convertToSearchParams } from "@/utils/object";
import { apiInstance } from "@/redux/api";
import { GetListAuditLogPayload, GetListAuditLogResponse } from "@/redux/audit-log/audit-log.type";

export const getListAuditLogService = async (payload: GetListAuditLogPayload): Promise<GetListAuditLogResponse> => {
  return await apiInstance.get(`/audit-logs?${convertToSearchParams(payload)}`);
};
