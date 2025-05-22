import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { exportListProductExcel } from "@/redux/product/product.thunk";
import { ProductState } from "@/redux/product/product.type";
import { Download } from "lucide-react";
import { useProductTableFilters } from "./ProductListTable/useProductTableFilters";

export function ExportListProductExcelButton() {
  const { filters } = useProductTableFilters();

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<ProductState>((selector) => selector.product);

  const handleExport = async () => {
    try {
      await dispatch(exportListProductExcel(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  return (
    <Button
      className="min-w-[100px] sm:max-w-[120px]"
      variant="outline"
      disabled={loading.exportListProductExcel}
      onClick={handleExport}
    >
      <Download />
      Export
    </Button>
  );
}
