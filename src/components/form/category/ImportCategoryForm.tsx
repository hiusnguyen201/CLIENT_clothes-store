import { FileExcelImportProcess } from "@/components/FileExcelImportProcess";
import { DatabaseField } from "@/components/import/types";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { liveImportListCategory, testImportListCategory } from "@/redux/category/category.thunk";
import { ImportCategoryPayload, CategoryState } from "@/redux/category/category.type";

const databaseFields: DatabaseField<ImportCategoryPayload>[] = [
  { name: "image", type: "text", constraints: { required: true } },
  { name: "name", type: "text", constraints: { required: true, unique: true } },
  { name: "parentId", type: "text", constraints: { required: false } },
];

export function ImportCategoryForm() {
  const dispatch = useAppDispatch();
  const { errorsTestImport, summaryTestImport, errorsLiveImport, recordsImported, loading } =
    useAppSelector<CategoryState>((selector) => selector.category);

  const handleTestImport = async (data: Record<string, any>[]) => {
    try {
      await dispatch(testImportListCategory({ categories: data as ImportCategoryPayload[] })).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  const handleLiveImport = async (data: Record<string, any>[]) => {
    try {
      await dispatch(liveImportListCategory({ categories: data as ImportCategoryPayload[] })).unwrap();
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
      loadingLiveImport={loading.liveImportListCategory}
      loadingTestImport={loading.testImportListCategory}
    />
  );
}
