import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { GetListAuditLogResponse, AuditLogState } from "@/redux/audit-log/audit-log.type";
import { getListAuditLog } from "@/redux/audit-log/audit-log.thunk";

const initialState: AuditLogState = {
  loading: {
    getListAuditLog: false,
  },
  list: [],
  totalCount: 0,
  error: null,
};

const auditLogSlice = createSlice({
  name: "auditLog",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AuditLogState>) => {
    builder
      // Get List AuditLog
      .addCase(getListAuditLog.pending, (state: Draft<AuditLogState>) => {
        state.loading.getListAuditLog = true;
        state.error = null;
      })
      .addCase(
        getListAuditLog.fulfilled,
        (state: Draft<AuditLogState>, action: PayloadAction<GetListAuditLogResponse>) => {
          const { data } = action.payload;
          state.loading.getListAuditLog = false;
          state.error = null;
          state.list = data.list;
          state.totalCount = data.totalCount;
        }
      )
      .addCase(getListAuditLog.rejected, (state: Draft<AuditLogState>, action: PayloadAction<any>) => {
        state.loading.getListAuditLog = false;
        state.error = action.payload as string;
        state.list = [];
        state.totalCount = 0;
      });
  },
});

export default auditLogSlice.reducer;
