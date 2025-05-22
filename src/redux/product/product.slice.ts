import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateProductResponse,
  EditProductInfoResponse,
  GetListProductResponse,
  GetProductResponse,
  RemoveProductResponse,
  ProductState,
  EditProductVariantsResponse,
  TestImportListProductResponse,
  LiveImportListProductResponse,
} from "@/redux/product/product.type";
import {
  getListProduct,
  createProduct,
  getProduct,
  editProductInfo,
  removeProduct,
  checkProductNameExist,
  editProductVariants,
  exportListProductExcel,
  liveImportListProduct,
  testImportListProduct,
} from "@/redux/product/product.thunk";

const initialState: ProductState = {
  loading: {
    checkProductNameExist: false,
    createProduct: false,
    getListProduct: false,
    getProduct: false,
    editProductInfo: false,
    editProductVariants: false,
    removeProduct: false,
    exportListProductExcel: false,
    testImportListProduct: false,
    liveImportListProduct: false,
  },
  newItem: null,
  item: null,
  list: [],
  totalCount: 0,
  error: null,
  removedProductIds: [],
  summaryTestImport: {
    totalRows: 0,
    validRows: 0,
    invalidRows: 0,
  },
  errorsTestImport: [],
  errorsLiveImport: [],
  recordsImported: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ProductState>) => {
    builder
      // Test Import List Product
      .addCase(testImportListProduct.pending, (state: Draft<ProductState>) => {
        state.loading.testImportListProduct = true;
        state.error = null;
      })
      .addCase(
        testImportListProduct.fulfilled,
        (state: Draft<ProductState>, action: PayloadAction<TestImportListProductResponse>) => {
          const { data } = action.payload;
          state.loading.testImportListProduct = false;
          state.error = null;
          state.errorsTestImport = data.errors;
          state.summaryTestImport = data.summary;
        }
      )
      .addCase(testImportListProduct.rejected, (state: Draft<ProductState>, action: PayloadAction<any>) => {
        state.loading.testImportListProduct = false;
        state.error = action.payload as string;
        state.errorsTestImport = [];
        state.summaryTestImport = {
          invalidRows: 0,
          totalRows: 0,
          validRows: 0,
        };
      });

    builder
      // Live Import List Product
      .addCase(liveImportListProduct.pending, (state: Draft<ProductState>) => {
        state.loading.liveImportListProduct = true;
        state.error = null;
      })
      .addCase(
        liveImportListProduct.fulfilled,
        (state: Draft<ProductState>, action: PayloadAction<LiveImportListProductResponse>) => {
          const { data } = action.payload;
          state.loading.liveImportListProduct = false;
          state.error = null;
          state.errorsLiveImport = data.errors;
          state.recordsImported = data.recordsImported;
        }
      )
      .addCase(liveImportListProduct.rejected, (state: Draft<ProductState>, action: PayloadAction<any>) => {
        state.loading.liveImportListProduct = false;
        state.error = action.payload as string;
        state.errorsLiveImport = [];
        state.recordsImported = 0;
      });

    // Check Email Exist
    builder
      .addCase(checkProductNameExist.pending, (state) => {
        state.loading.checkProductNameExist = true;
        state.error = null;
      })
      .addCase(checkProductNameExist.fulfilled, (state) => {
        state.loading.checkProductNameExist = false;
        state.error = null;
      })
      .addCase(checkProductNameExist.rejected, (state, action: PayloadAction<any>) => {
        state.loading.checkProductNameExist = false;
        state.error = action.payload;
      });

    // Create Product
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading.createProduct = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<CreateProductResponse>) => {
        const { data } = action.payload;
        state.loading.createProduct = false;
        state.error = null;
        state.newItem = data;
      })
      .addCase(createProduct.rejected, (state, action: PayloadAction<any>) => {
        state.loading.createProduct = false;
        state.error = action.payload;
        state.newItem = null;
      });

    builder
      // Get List Product
      .addCase(getListProduct.pending, (state: Draft<ProductState>) => {
        state.loading.getListProduct = true;
        state.error = null;
      })
      .addCase(
        getListProduct.fulfilled,
        (state: Draft<ProductState>, action: PayloadAction<GetListProductResponse>) => {
          const { data } = action.payload;
          state.loading.getListProduct = false;
          state.error = null;
          state.list = data.list;
          state.totalCount = data.totalCount;
        }
      )
      .addCase(getListProduct.rejected, (state: Draft<ProductState>, action: PayloadAction<any>) => {
        state.loading.getListProduct = false;
        state.error = action.payload as string;
        state.list = [];
        state.totalCount = 0;
      });

    builder
      // Export List Product Excel
      .addCase(exportListProductExcel.pending, (state: Draft<ProductState>) => {
        state.loading.exportListProductExcel = true;
        state.error = null;
      })
      .addCase(exportListProductExcel.fulfilled, (state: Draft<ProductState>) => {
        state.loading.exportListProductExcel = false;
        state.error = null;
      })
      .addCase(exportListProductExcel.rejected, (state: Draft<ProductState>, action: PayloadAction<any>) => {
        state.loading.exportListProductExcel = false;
        state.error = action.payload as string;
      });

    builder
      // Get Product
      .addCase(getProduct.pending, (state: Draft<ProductState>) => {
        state.loading.getProduct = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state: Draft<ProductState>, action: PayloadAction<GetProductResponse>) => {
        const { data } = action.payload;
        state.loading.getProduct = false;
        state.error = null;
        state.item = data;
      })
      .addCase(getProduct.rejected, (state: Draft<ProductState>, action: PayloadAction<any>) => {
        state.loading.getProduct = false;
        state.error = action.payload as string;
        state.item = null;
      });

    builder
      // Edit Product Info
      .addCase(editProductInfo.pending, (state: Draft<ProductState>) => {
        state.loading.editProductInfo = true;
        state.error = null;
      })
      .addCase(
        editProductInfo.fulfilled,
        (state: Draft<ProductState>, action: PayloadAction<EditProductInfoResponse>) => {
          const { data } = action.payload;
          state.loading.editProductInfo = false;
          state.error = null;
          state.item = data;
          state.list = state.list.map((item) => (item.id === data.id ? data : item));
        }
      )
      .addCase(editProductInfo.rejected, (state: Draft<ProductState>, action: PayloadAction<any>) => {
        state.loading.editProductInfo = false;
        state.error = action.payload as string;
      });

    builder
      // Edit Product Variants
      .addCase(editProductVariants.pending, (state: Draft<ProductState>) => {
        state.loading.editProductVariants = true;
        state.error = null;
      })
      .addCase(
        editProductVariants.fulfilled,
        (state: Draft<ProductState>, action: PayloadAction<EditProductVariantsResponse>) => {
          const { data } = action.payload;
          state.loading.editProductVariants = false;
          state.error = null;
          state.item = data;
        }
      )
      .addCase(editProductVariants.rejected, (state: Draft<ProductState>, action: PayloadAction<any>) => {
        state.loading.editProductVariants = false;
        state.error = action.payload as string;
      });

    builder
      // Remove Product
      .addCase(removeProduct.pending, (state: Draft<ProductState>) => {
        state.loading.removeProduct = true;
        state.error = null;
      })
      .addCase(removeProduct.fulfilled, (state: Draft<ProductState>, action: PayloadAction<RemoveProductResponse>) => {
        const { data } = action.payload;
        state.loading.removeProduct = false;
        state.error = null;
        state.removedProductIds.push(data.id);
      })
      .addCase(removeProduct.rejected, (state: Draft<ProductState>, action: PayloadAction<any>) => {
        state.loading.removeProduct = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
