import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { exportListPaymentExcel } from "@/redux/payment/payment.thunk";
import { PaymentState } from "@/redux/payment/payment.type";
import { Download } from "lucide-react";
import { usePaymentTableFilters } from "./PaymentListTable/usePaymentTableFilters";

export function ExportListPaymentExcelButton() {
  const { filters } = usePaymentTableFilters();

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<PaymentState>((selector) => selector.payment);

  const handleExport = async () => {
    try {
      await dispatch(exportListPaymentExcel(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  return (
    <Button
      className="min-w-[100px] sm:max-w-[120px]"
      variant="outline"
      disabled={loading.exportListPaymentExcel}
      onClick={handleExport}
    >
      <Download />
      Export
    </Button>
  );
}
