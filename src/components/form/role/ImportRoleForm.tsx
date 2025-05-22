import { FileExcelImportProcess } from "@/components/FileExcelImportProcess";
import { DatabaseField } from "@/components/import/types";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { liveImportListRole, testImportListRole } from "@/redux/role/role.thunk";
import { ImportRolePayload, RoleState } from "@/redux/role/role.type";

const databaseFields: DatabaseField<ImportRolePayload>[] = [
  { name: "name", type: "text", constraints: { required: true, unique: true } },
  { name: "description", type: "text", constraints: { required: true } },
];

export function ImportRoleForm() {
  const dispatch = useAppDispatch();
  const { errorsTestImport, summaryTestImport, errorsLiveImport, recordsImported, loading } = useAppSelector<RoleState>(
    (selector) => selector.role
  );

  const handleTestImport = async (data: Record<string, any>[]) => {
    try {
      await dispatch(testImportListRole({ roles: data as ImportRolePayload[] })).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  const handleLiveImport = async (data: Record<string, any>[]) => {
    try {
      await dispatch(liveImportListRole({ roles: data as ImportRolePayload[] })).unwrap();
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
      loadingLiveImport={loading.liveImportListRole}
      loadingTestImport={loading.testImportListRole}
    />
  );
}
