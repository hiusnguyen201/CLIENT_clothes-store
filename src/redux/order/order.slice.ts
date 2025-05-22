import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateOrderResponse,
  // EditOrderInfoResponse,
  GetListOrderResponse,
  GetOrderResponse,
  RemoveOrderResponse,
  OrderState,
  ConfirmOrderResponse,
  CancelOrderResponse,
  CreateShipOrderResponse,
  ProcessingOrderResponse,
  TestImportListOrderResponse,
  LiveImportListOrderResponse,
} from "@/redux/order/order.type";
import {
  getListOrder,
  createOrder,
  getOrder,
  // editOrderInfo,
  removeOrder,
  confirmOrder,
  cancelOrder,
  createShipOrder,
  processingOrder,
  exportListOrderExcel,
  liveImportListOrder,
  testImportListOrder,
} from "@/redux/order/order.thunk";

const initialState: OrderState = {
  loading: {
    createOrder: false,
    getListOrder: false,
    getOrder: false,
    editOrder: false,
    removeOrder: false,
    confirmOrder: false,
    cancelOrder: false,
    shipOrder: false,
    createShipOrder: false,
    processingOrder: false,
    exportListOrderExcel: false,
    testImportListOrder: false,
    liveImportListOrder: false,
  },
  newItem: null,
  item: null,
  list: [],
  totalCount: 0,
  error: null,
  removedOrderIds: [],
  summaryTestImport: {
    totalRows: 0,
    validRows: 0,
    invalidRows: 0,
  },
  errorsTestImport: [],
  errorsLiveImport: [],
  recordsImported: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<OrderState>) => {
    builder
      // Test Import List Order
      .addCase(testImportListOrder.pending, (state: Draft<OrderState>) => {
        state.loading.testImportListOrder = true;
        state.error = null;
      })
      .addCase(
        testImportListOrder.fulfilled,
        (state: Draft<OrderState>, action: PayloadAction<TestImportListOrderResponse>) => {
          const { data } = action.payload;
          state.loading.testImportListOrder = false;
          state.error = null;
          state.errorsTestImport = data.errors;
          state.summaryTestImport = data.summary;
        }
      )
      .addCase(testImportListOrder.rejected, (state: Draft<OrderState>, action: PayloadAction<any>) => {
        state.loading.testImportListOrder = false;
        state.error = action.payload as string;
        state.errorsTestImport = [];
        state.summaryTestImport = {
          invalidRows: 0,
          totalRows: 0,
          validRows: 0,
        };
      });

    builder
      // Live Import List Order
      .addCase(liveImportListOrder.pending, (state: Draft<OrderState>) => {
        state.loading.liveImportListOrder = true;
        state.error = null;
      })
      .addCase(
        liveImportListOrder.fulfilled,
        (state: Draft<OrderState>, action: PayloadAction<LiveImportListOrderResponse>) => {
          const { data } = action.payload;
          state.loading.liveImportListOrder = false;
          state.error = null;
          state.errorsLiveImport = data.errors;
          state.recordsImported = data.recordsImported;
        }
      )
      .addCase(liveImportListOrder.rejected, (state: Draft<OrderState>, action: PayloadAction<any>) => {
        state.loading.liveImportListOrder = false;
        state.error = action.payload as string;
        state.errorsLiveImport = [];
        state.recordsImported = 0;
      });

    // Create Order
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading.createOrder = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<CreateOrderResponse>) => {
        const { data } = action.payload;
        state.loading.createOrder = false;
        state.error = null;
        state.newItem = data;
      })
      .addCase(createOrder.rejected, (state, action: PayloadAction<any>) => {
        state.loading.createOrder = false;
        state.error = action.payload;
        state.newItem = null;
      });

    builder
      // Get List Order
      .addCase(getListOrder.pending, (state: Draft<OrderState>) => {
        state.loading.getListOrder = true;
        state.error = null;
      })
      .addCase(getListOrder.fulfilled, (state: Draft<OrderState>, action: PayloadAction<GetListOrderResponse>) => {
        const { data } = action.payload;
        state.loading.getListOrder = false;
        state.error = null;
        state.list = data.list;
        state.totalCount = data.totalCount;
      })
      .addCase(getListOrder.rejected, (state: Draft<OrderState>, action: PayloadAction<any>) => {
        state.loading.getListOrder = false;
        state.error = action.payload as string;
        state.list = [];
        state.totalCount = 0;
      });

    builder
      // Export List Order Excel
      .addCase(exportListOrderExcel.pending, (state: Draft<OrderState>) => {
        state.loading.exportListOrderExcel = true;
        state.error = null;
      })
      .addCase(exportListOrderExcel.fulfilled, (state: Draft<OrderState>) => {
        state.loading.exportListOrderExcel = false;
        state.error = null;
      })
      .addCase(exportListOrderExcel.rejected, (state: Draft<OrderState>, action: PayloadAction<any>) => {
        state.loading.exportListOrderExcel = false;
        state.error = action.payload as string;
      });

    builder
      // Get Order
      .addCase(getOrder.pending, (state: Draft<OrderState>) => {
        state.loading.getOrder = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state: Draft<OrderState>, action: PayloadAction<GetOrderResponse>) => {
        const { data } = action.payload;
        state.loading.getOrder = false;
        state.error = null;
        state.item = data;
      })
      .addCase(getOrder.rejected, (state: Draft<OrderState>, action: PayloadAction<any>) => {
        state.loading.getOrder = false;
        state.error = action.payload as string;
        state.item = null;
      });

    // builder
    //   // Edit Order Info
    //   .addCase(editOrderInfo.pending, (state: Draft<OrderState>) => {
    //     state.loading.editOrder = true;
    //     state.error = null;
    //   })
    //   .addCase(editOrderInfo.fulfilled, (state: Draft<OrderState>, action: PayloadAction<EditOrderInfoResponse>) => {
    //     const { data } = action.payload;
    //     state.loading.editOrder = false;
    //     state.error = null;
    //     state.item = data;
    //     state.list = state.list.map((item) => (item.id === data.id ? data : item));
    //   })
    //   .addCase(editOrderInfo.rejected, (state: Draft<OrderState>, action: PayloadAction<any>) => {
    //     state.loading.editOrder = false;
    //     state.error = action.payload as string;
    //   });

    builder
      // Remove Order
      .addCase(removeOrder.pending, (state: Draft<OrderState>) => {
        state.loading.removeOrder = true;
        state.error = null;
      })
      .addCase(removeOrder.fulfilled, (state: Draft<OrderState>, action: PayloadAction<RemoveOrderResponse>) => {
        const { data } = action.payload;
        state.loading.removeOrder = false;
        state.error = null;
        state.removedOrderIds.push(data.id);
      })
      .addCase(removeOrder.rejected, (state: Draft<OrderState>, action: PayloadAction<any>) => {
        state.loading.removeOrder = false;
        state.error = action.payload as string;
      });

    builder
      // Confirm Order
      .addCase(confirmOrder.pending, (state: Draft<OrderState>) => {
        state.loading.confirmOrder = true;
        state.error = null;
      })
      .addCase(confirmOrder.fulfilled, (state: Draft<OrderState>, action: PayloadAction<ConfirmOrderResponse>) => {
        const { data } = action.payload;
        state.loading.confirmOrder = false;
        state.error = null;
        state.item = data;
      })
      .addCase(confirmOrder.rejected, (state: Draft<OrderState>, action: PayloadAction<any>) => {
        state.loading.confirmOrder = false;
        state.error = action.payload as string;
      });

    builder
      // Processing Order
      .addCase(processingOrder.pending, (state: Draft<OrderState>) => {
        state.loading.processingOrder = true;
        state.error = null;
      })
      .addCase(
        processingOrder.fulfilled,
        (state: Draft<OrderState>, action: PayloadAction<ProcessingOrderResponse>) => {
          const { data } = action.payload;
          state.loading.processingOrder = false;
          state.error = null;
          state.item = data;
        }
      )
      .addCase(processingOrder.rejected, (state: Draft<OrderState>, action: PayloadAction<any>) => {
        state.loading.processingOrder = false;
        state.error = action.payload as string;
      });

    builder
      // Cancel Order
      .addCase(cancelOrder.pending, (state: Draft<OrderState>) => {
        state.loading.cancelOrder = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state: Draft<OrderState>, action: PayloadAction<CancelOrderResponse>) => {
        const { data } = action.payload;
        state.loading.cancelOrder = false;
        state.error = null;
        state.item = data;
      })
      .addCase(cancelOrder.rejected, (state: Draft<OrderState>, action: PayloadAction<any>) => {
        state.loading.cancelOrder = false;
        state.error = action.payload as string;
      });

    builder
      // Create ship Order
      .addCase(createShipOrder.pending, (state: Draft<OrderState>) => {
        state.loading.createShipOrder = true;
        state.error = null;
      })
      .addCase(
        createShipOrder.fulfilled,
        (state: Draft<OrderState>, action: PayloadAction<CreateShipOrderResponse>) => {
          const { data } = action.payload;
          state.loading.createShipOrder = false;
          state.error = null;
          state.item = data;
        }
      )
      .addCase(createShipOrder.rejected, (state: Draft<OrderState>, action: PayloadAction<any>) => {
        state.loading.createShipOrder = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
