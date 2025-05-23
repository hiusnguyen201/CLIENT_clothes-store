import { Nullable } from "@/types/common";
import { BaseResponse } from "@/types/response";
import {
  ACTIVITY_VALUES,
  ActivityReport,
  COMPARISON_VALUES,
  CustomerReport,
  OrderReport,
  RevenueReport,
  SALE_VALUES,
  SaleReport,
  UserReport,
} from "@/types/report";
import { ProductVariant } from "@/types/product";
import { Order } from "@/types/order";

/**
 * State
 */
export interface ReportState {
  loading: {
    getUserReport: boolean;
    getCustomerReport: boolean;
    getOrderReport: boolean;
    getRevenueReport: boolean;
    getTopProductVariants: boolean;
    getSalesReport: boolean;
    getRecentOrders: boolean;
    getActivityReport: boolean;
  };
  userReport: Nullable<UserReport>;
  customerReport: Nullable<CustomerReport>;
  orderReport: Nullable<OrderReport>;
  revenueReport: Nullable<RevenueReport>;
  topProductVariants: ProductVariant[];
  salesReport: SaleReport[];
  activityReport: ActivityReport[];
  recentOrders: Order[];
  error: Nullable<string>;
}

/**
 * Get User Report
 */
export interface GetUserReportPayload {
  compareTo: COMPARISON_VALUES;
}
export interface GetUserReportResponse extends BaseResponse<UserReport> {}
/**
 * Get Customer Report
 */
export interface GetCustomerReportPayload {
  compareTo: COMPARISON_VALUES;
}
export interface GetCustomerReportResponse extends BaseResponse<CustomerReport> {}

/**
 * Get Order Report
 */
export interface GetOrderReportPayload {
  compareTo: COMPARISON_VALUES;
}
export interface GetOrderReportResponse extends BaseResponse<OrderReport> {}

/**
 * Get Revenue Report
 */
export interface GetRevenueReportPayload {
  compareTo: COMPARISON_VALUES;
}
export interface GetRevenueReportResponse extends BaseResponse<RevenueReport> {}

/**
 * Get Top Product Variants
 */
export interface GetTopProductVariantsPayload {
  limit: 5 | 10;
}
export interface GetTopProductVariantsResponse extends BaseResponse<ProductVariant[]> {}

/**
 * Get Sales Report
 */
export interface GetSalesReportPayload {
  type: SALE_VALUES;
}
export interface GetSalesReportResponse extends BaseResponse<SaleReport[]> {}

/**
 * Get Activity Report
 */
export interface GetActivityReportPayload {
  type: ACTIVITY_VALUES;
}
export interface GetActivityReportResponse extends BaseResponse<ActivityReport[]> {}

/**
 * Get Recent Orders
 */
export interface GetRecentOrdersPayload {
  limit: 5 | 10;
}
export interface GetRecentOrdersResponse extends BaseResponse<Order[]> {}
