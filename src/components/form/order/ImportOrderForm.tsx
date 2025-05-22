import { FileExcelImportProcess } from "@/components/FileExcelImportProcess";
import { DatabaseField } from "@/components/import/types";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { liveImportListOrder, testImportListOrder } from "@/redux/order/order.thunk";
import { ImportOrderPayload, OrderState } from "@/redux/order/order.type";

const databaseFields: DatabaseField<ImportOrderPayload>[] = [
  { name: "customerEmail", type: "text", constraints: { required: true } },
  { name: "district", type: "text", constraints: { required: true } },
  { name: "province", type: "text", constraints: { required: true } },
  { name: "ward", type: "text", constraints: { required: true } },
  { name: "address", type: "text", constraints: { required: true } },
  { name: "productSKU", type: "text", constraints: { required: true } },
  { name: "quantity", type: "text", constraints: { required: true } },
  { name: "paymentMethod", type: "text", constraints: { required: true } },
];

export function ImportOrderForm() {
  const dispatch = useAppDispatch();
  const { errorsTestImport, summaryTestImport, errorsLiveImport, recordsImported, loading } =
    useAppSelector<OrderState>((selector) => selector.order);

  const handleTestImport = async (data: Record<string, any>[]) => {
    try {
      await dispatch(testImportListOrder({ orders: data as ImportOrderPayload[] })).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  const handleLiveImport = async (data: Record<string, any>[]) => {
    try {
      await dispatch(liveImportListOrder({ orders: data as ImportOrderPayload[] })).unwrap();
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
      loadingLiveImport={loading.liveImportListOrder}
      loadingTestImport={loading.testImportListOrder}
    />
  );
}
