import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { GetListPaymentResponse, GetPaymentResponse, PaymentState } from "@/redux/payment/payment.type";
import { getListPayment, getPayment, exportListPaymentExcel } from "@/redux/payment/payment.thunk";

const initialState: PaymentState = {
  loading: {
    getListPayment: false,
    getPayment: false,
    exportListPaymentExcel: false,
  },
  item: null,
  list: [],
  totalCount: 0,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<PaymentState>) => {
    builder
      // Get List Payment
      .addCase(getListPayment.pending, (state: Draft<PaymentState>) => {
        state.loading.getListPayment = true;
        state.error = null;
      })
      .addCase(
        getListPayment.fulfilled,
        (state: Draft<PaymentState>, action: PayloadAction<GetListPaymentResponse>) => {
          const { data } = action.payload;
          state.loading.getListPayment = false;
          state.error = null;
          state.list = data.list;

          state.totalCount = data.totalCount;
        }
      )
      .addCase(getListPayment.rejected, (state: Draft<PaymentState>, action: PayloadAction<any>) => {
        state.loading.getListPayment = false;
        state.error = action.payload as string;
        state.list = [];
        state.totalCount = 0;
      });

    builder
      // Export List Payment Excel
      .addCase(exportListPaymentExcel.pending, (state: Draft<PaymentState>) => {
        state.loading.exportListPaymentExcel = true;
        state.error = null;
      })
      .addCase(exportListPaymentExcel.fulfilled, (state: Draft<PaymentState>) => {
        state.loading.exportListPaymentExcel = false;
        state.error = null;
      })
      .addCase(exportListPaymentExcel.rejected, (state: Draft<PaymentState>, action: PayloadAction<any>) => {
        state.loading.exportListPaymentExcel = false;
        state.error = action.payload as string;
      });

    builder
      // Get Payment
      .addCase(getPayment.pending, (state: Draft<PaymentState>) => {
        state.loading.getPayment = true;
        state.error = null;
      })
      .addCase(getPayment.fulfilled, (state: Draft<PaymentState>, action: PayloadAction<GetPaymentResponse>) => {
        const { data } = action.payload;
        state.loading.getPayment = false;
        state.error = null;
        state.item = data;
      })
      .addCase(getPayment.rejected, (state: Draft<PaymentState>, action: PayloadAction<any>) => {
        state.loading.getPayment = false;
        state.error = action.payload as string;
        state.item = null;
      });
  },
});

export default paymentSlice.reducer;
