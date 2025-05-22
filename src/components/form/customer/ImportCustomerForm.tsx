import { FileExcelImportProcess } from "@/components/FileExcelImportProcess";
import { DatabaseField } from "@/components/import/types";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { liveImportListCustomer, testImportListCustomer } from "@/redux/customer/customer.thunk";
import { ImportCustomerPayload, CustomerState } from "@/redux/customer/customer.type";

const databaseFields: DatabaseField<ImportCustomerPayload>[] = [
  { name: "name", type: "text", constraints: { required: true } },
  { name: "email", type: "text", constraints: { required: true, unique: true } },
  { name: "phone", type: "text", constraints: { required: true } },
  { name: "gender", type: "text", constraints: { required: true } },
];

export function ImportCustomerForm() {
  const dispatch = useAppDispatch();
  const { errorsTestImport, summaryTestImport, errorsLiveImport, recordsImported, loading } =
    useAppSelector<CustomerState>((selector) => selector.customer);

  const handleTestImport = async (data: Record<string, any>[]) => {
    try {
      await dispatch(testImportListCustomer({ customers: data as ImportCustomerPayload[] })).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  const handleLiveImport = async (data: Record<string, any>[]) => {
    try {
      await dispatch(liveImportListCustomer({ customers: data as ImportCustomerPayload[] })).unwrap();
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
      loadingLiveImport={loading.liveImportListCustomer}
      loadingTestImport={loading.testImportListCustomer}
    />
  );
}
