import { FileExcelImportProcess } from "@/components/FileExcelImportProcess";
import { DatabaseField } from "@/components/import/types";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { liveImportListProduct, testImportListProduct } from "@/redux/product/product.thunk";
import { ImportProductPayload, ProductState } from "@/redux/product/product.type";

const databaseFields: DatabaseField<ImportProductPayload>[] = [
  { name: "thumbnail", type: "text", constraints: { required: true } },
  { name: "name", type: "text", constraints: { required: true } },
  { name: "description", type: "text", constraints: { required: true } },
  { name: "status", type: "text", constraints: { required: true } },
  { name: "category", type: "text", constraints: { required: true } },
  { name: "subCategory", type: "text", constraints: { required: true } },
  { name: "color", type: "text", constraints: { required: true } },
  { name: "size", type: "text", constraints: { required: false } },
  { name: "sku", type: "text", constraints: { required: true } },
  { name: "price", type: "number", constraints: { required: true } },
  { name: "quantity", type: "number", constraints: { required: true } },
];

export function ImportProductForm() {
  const dispatch = useAppDispatch();
  const { errorsTestImport, summaryTestImport, errorsLiveImport, recordsImported, loading } =
    useAppSelector<ProductState>((selector) => selector.product);

  const handleTestImport = async (data: Record<string, any>[]) => {
    try {
      await dispatch(testImportListProduct({ products: data as ImportProductPayload[] })).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  const handleLiveImport = async (data: Record<string, any>[]) => {
    try {
      await dispatch(liveImportListProduct({ products: data as ImportProductPayload[] })).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  return (
    <FileExcelImportProcess
      testResults={{
        errors: errorsTestImport.map((err) => ({ message: err.message, type: "data", field: err.field, row: err.row })),
        rowsWithErrors: summaryTestImport.invalidRows,
        totalRows: summaryTestImport.totalRows,
        validRows: summaryTestImport.validRows,
      }}
      importResults={{
        errors: errorsLiveImport.map((err) => ({ message: err.message, type: "data", field: err.field, row: err.row })),
        recordsImported,
        success: errorsLiveImport.length === 0,
      }}
      databaseFields={databaseFields}
      onClickLiveImport={handleLiveImport}
      onClickTestImport={handleTestImport}
      loadingLiveImport={loading.liveImportListProduct}
      loadingTestImport={loading.testImportListProduct}
    />
  );
}
