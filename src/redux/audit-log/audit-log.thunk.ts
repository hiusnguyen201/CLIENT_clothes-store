import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "@/types/thunk-api";
import { GetListAuditLogPayload, GetListAuditLogResponse } from "@/redux/audit-log/audit-log.type";
import { getListAuditLogService } from "@/redux/audit-log/audit-log.service";

export const getListAuditLog = createAsyncThunk<GetListAuditLogResponse, GetListAuditLogPayload, ThunkApiConfig>(
  "audit-log/get-list-audit-log",
  async (filters, { rejectWithValue }) => {
    try {
      const response: GetListAuditLogResponse = await getListAuditLogService(filters);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);
