import { FileExcelImportProcess } from "@/components/FileExcelImportProcess";
import { DatabaseField } from "@/components/import/types";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { liveImportListUser, testImportListUser } from "@/redux/user/user.thunk";
import { ImportUserPayload, UserState } from "@/redux/user/user.type";

const databaseFields: DatabaseField<ImportUserPayload>[] = [
  { name: "name", type: "text", constraints: { required: true } },
  { name: "email", type: "text", constraints: { required: true, unique: true } },
  { name: "phone", type: "text", constraints: { required: true } },
  { name: "gender", type: "text", constraints: { required: true } },
  { name: "roleId", type: "text", constraints: { required: false } },
];

export function ImportUserForm() {
  const dispatch = useAppDispatch();
  const { errorsTestImport, summaryTestImport, errorsLiveImport, recordsImported, loading } = useAppSelector<UserState>(
    (selector) => selector.user
  );

  const handleTestImport = async (data: Record<string, any>[]) => {
    try {
      await dispatch(testImportListUser({ users: data as ImportUserPayload[] })).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  const handleLiveImport = async (data: Record<string, any>[]) => {
    try {
      await dispatch(liveImportListUser({ users: data as ImportUserPayload[] })).unwrap();
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
      loadingLiveImport={loading.liveImportListUser}
      loadingTestImport={loading.testImportListUser}
    />
  );
}
