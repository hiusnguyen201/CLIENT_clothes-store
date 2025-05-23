import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import {
  GetActivityReportResponse,
  GetCustomerReportResponse,
  GetOrderReportResponse,
  GetRecentOrdersResponse,
  GetRevenueReportResponse,
  GetSalesReportResponse,
  GetTopProductVariantsResponse,
  GetUserReportResponse,
  ReportState,
} from "@/redux/report/report.type";
import {
  getActivityReport,
  getCustomerReport,
  getOrderReport,
  getRecentOrders,
  getRevenueReport,
  getSalesReport,
  getTopProductVariants,
  getUserReport,
} from "@/redux/report/report.thunk";

const initialState: ReportState = {
  loading: {
    getUserReport: false,
    getCustomerReport: false,
    getOrderReport: false,
    getRevenueReport: false,
    getSalesReport: false,
    getActivityReport: false,
    getTopProductVariants: false,
    getRecentOrders: false,
  },
  userReport: null,
  customerReport: null,
  orderReport: null,
  revenueReport: null,
  salesReport: [],
  activityReport: [],
  topProductVariants: [],
  recentOrders: [],
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ReportState>) => {
    builder
      // Get User Report
      .addCase(getUserReport.pending, (state: Draft<ReportState>) => {
        state.loading.getUserReport = true;
        state.error = null;
      })
      .addCase(getUserReport.fulfilled, (state: Draft<ReportState>, action: PayloadAction<GetUserReportResponse>) => {
        const { data } = action.payload;
        state.loading.getUserReport = false;
        state.error = null;
        state.userReport = data;
      })
      .addCase(getUserReport.rejected, (state: Draft<ReportState>, action: PayloadAction<any>) => {
        state.loading.getUserReport = false;
        state.error = action.payload as string;
        state.userReport = null;
      });

    builder
      // Get Customer Report
      .addCase(getCustomerReport.pending, (state: Draft<ReportState>) => {
        state.loading.getCustomerReport = true;
        state.error = null;
      })
      .addCase(
        getCustomerReport.fulfilled,
        (state: Draft<ReportState>, action: PayloadAction<GetCustomerReportResponse>) => {
          const { data } = action.payload;
          state.loading.getCustomerReport = false;
          state.error = null;
          state.customerReport = data;
        }
      )
      .addCase(getCustomerReport.rejected, (state: Draft<ReportState>, action: PayloadAction<any>) => {
        state.loading.getCustomerReport = false;
        state.error = action.payload as string;
        state.customerReport = null;
      });

    builder
      // Get Order Report
      .addCase(getOrderReport.pending, (state: Draft<ReportState>) => {
        state.loading.getOrderReport = true;
        state.error = null;
      })
      .addCase(getOrderReport.fulfilled, (state: Draft<ReportState>, action: PayloadAction<GetOrderReportResponse>) => {
        const { data } = action.payload;
        state.loading.getOrderReport = false;
        state.error = null;
        state.orderReport = data;
      })
      .addCase(getOrderReport.rejected, (state: Draft<ReportState>, action: PayloadAction<any>) => {
        state.loading.getOrderReport = false;
        state.error = action.payload as string;
        state.orderReport = null;
      });

    builder
      // Get Revenue Report
      .addCase(getRevenueReport.pending, (state: Draft<ReportState>) => {
        state.loading.getRevenueReport = true;
        state.error = null;
      })
      .addCase(
        getRevenueReport.fulfilled,
        (state: Draft<ReportState>, action: PayloadAction<GetRevenueReportResponse>) => {
          const { data } = action.payload;
          state.loading.getRevenueReport = false;
          state.error = null;
          state.revenueReport = data;
        }
      )
      .addCase(getRevenueReport.rejected, (state: Draft<ReportState>, action: PayloadAction<any>) => {
        state.loading.getRevenueReport = false;
        state.error = action.payload as string;
        state.revenueReport = null;
      });

    builder
      // Get Top List Variant
      .addCase(getTopProductVariants.pending, (state: Draft<ReportState>) => {
        state.loading.getTopProductVariants = true;
        state.error = null;
      })
      .addCase(
        getTopProductVariants.fulfilled,
        (state: Draft<ReportState>, action: PayloadAction<GetTopProductVariantsResponse>) => {
          const { data } = action.payload;
          state.loading.getTopProductVariants = false;
          state.error = null;
          state.topProductVariants = data;
        }
      )
      .addCase(getTopProductVariants.rejected, (state: Draft<ReportState>, action: PayloadAction<any>) => {
        state.loading.getTopProductVariants = false;
        state.error = action.payload as string;
        state.topProductVariants = [];
      });

    builder
      // Get Sales Report
      .addCase(getSalesReport.pending, (state: Draft<ReportState>) => {
        state.loading.getSalesReport = true;
        state.error = null;
      })
      .addCase(getSalesReport.fulfilled, (state: Draft<ReportState>, action: PayloadAction<GetSalesReportResponse>) => {
        const { data } = action.payload;
        state.loading.getSalesReport = false;
        state.error = null;
        state.salesReport = data;
      })
      .addCase(getSalesReport.rejected, (state: Draft<ReportState>, action: PayloadAction<any>) => {
        state.loading.getSalesReport = false;
        state.error = action.payload as string;
        state.salesReport = [];
      });

    builder
      // Get Activity Report
      .addCase(getActivityReport.pending, (state: Draft<ReportState>) => {
        state.loading.getActivityReport = true;
        state.error = null;
      })
      .addCase(
        getActivityReport.fulfilled,
        (state: Draft<ReportState>, action: PayloadAction<GetActivityReportResponse>) => {
          const { data } = action.payload;
          state.loading.getActivityReport = false;
          state.error = null;
          state.activityReport = data;
        }
      )
      .addCase(getActivityReport.rejected, (state: Draft<ReportState>, action: PayloadAction<any>) => {
        state.loading.getActivityReport = false;
        state.error = action.payload as string;
        state.activityReport = [];
      });

    builder
      // Get Recent Orders
      .addCase(getRecentOrders.pending, (state: Draft<ReportState>) => {
        state.loading.getRecentOrders = true;
        state.error = null;
      })
      .addCase(
        getRecentOrders.fulfilled,
        (state: Draft<ReportState>, action: PayloadAction<GetRecentOrdersResponse>) => {
          const { data } = action.payload;
          state.loading.getRecentOrders = false;
          state.error = null;
          state.recentOrders = data;
        }
      )
      .addCase(getRecentOrders.rejected, (state: Draft<ReportState>, action: PayloadAction<any>) => {
        state.loading.getRecentOrders = false;
        state.error = action.payload as string;
        state.recentOrders = [];
      });
  },
});

export default userSlice.reducer;
