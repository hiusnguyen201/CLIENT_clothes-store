import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { exportListOrderExcel } from "@/redux/order/order.thunk";
import { OrderState } from "@/redux/order/order.type";
import { Download } from "lucide-react";
import { useOrderTableFilters } from "./OrderListTable/useOrderTableFilters";

export function ExportListOrderExcelButton() {
  const { filters } = useOrderTableFilters();

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<OrderState>((selector) => selector.order);

  const handleExport = async () => {
    try {
      await dispatch(exportListOrderExcel(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  return (
    <Button
      className="min-w-[100px] sm:max-w-[120px]"
      variant="outline"
      disabled={loading.exportListOrderExcel}
      onClick={handleExport}
    >
      <Download />
      Export
    </Button>
  );
}
