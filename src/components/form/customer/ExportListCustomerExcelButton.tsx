import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { exportListCustomerExcel } from "@/redux/customer/customer.thunk";
import { CustomerState } from "@/redux/customer/customer.type";
import { Download } from "lucide-react";
import { useCustomerTableFilters } from "./CustomerListTable/useCustomerTableFilters";

export function ExportListCustomerExcelButton() {
  const { filters } = useCustomerTableFilters();

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<CustomerState>((selector) => selector.customer);

  const handleExport = async () => {
    try {
      await dispatch(exportListCustomerExcel(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  return (
    <Button
      className="min-w-[100px] sm:max-w-[120px]"
      variant="outline"
      disabled={loading.exportListCustomerExcel}
      onClick={handleExport}
    >
      <Download />
      Export
    </Button>
  );
}
