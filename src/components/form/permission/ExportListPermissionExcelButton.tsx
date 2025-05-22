import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { exportListPermissionExcel } from "@/redux/permission/permission.thunk";
import { PermissionState } from "@/redux/permission/permission.type";
import { Download } from "lucide-react";
import { usePermissionTableFilters } from "./PermissionListTable/usePermissionTableFilters";

export function ExportListPermissionExcelButton() {
  const { filters } = usePermissionTableFilters();

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<PermissionState>((selector) => selector.permission);

  const handleExport = async () => {
    try {
      await dispatch(exportListPermissionExcel(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  return (
    <Button
      className="min-w-[100px] sm:max-w-[120px]"
      variant="outline"
      disabled={loading.exportListPermissionExcel}
      onClick={handleExport}
    >
      <Download />
      Export
    </Button>
  );
}
