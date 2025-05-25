import { Nullable, Optional } from "@/types/common";
import { GetListParams, GetListResponseData } from "@/types/response";
import { AuditLog, OPERATION_TYPE, RESULT } from "@/types/audit-log";

/**
 * State
 */
export interface AuditLogState {
  loading: {
    getListAuditLog: boolean;
  };
  list: AuditLog[];
  totalCount: number;
  error: Nullable<string>;
}

/**
 * Get List Audit Log
 */
export type AuditLogFieldsSort = Extract<"operationType" | "collection" | "activityDate" | "result", AuditLog>;
export interface GetListAuditLogPayload extends GetListParams<AuditLog> {
  sortBy?: Optional<Nullable<AuditLogFieldsSort>>;
  operationType?: Optional<Nullable<OPERATION_TYPE>>;
  result?: Optional<Nullable<RESULT>>;
}
export interface GetListAuditLogResponse extends GetListResponseData<AuditLog> {}
