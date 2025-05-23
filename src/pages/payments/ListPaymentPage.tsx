import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { PaymentListTable } from "@/components/form/payment/PaymentListTable";
import { usePermission } from "@/hooks/use-permission";
import { PERMISSIONS } from "@/constants/permissions";
import { ExportListPaymentExcelButton } from "@/components/form/payment/ExportListCustomerExcelButton";

export function ListPaymentPage() {
  const can = usePermission();

  return (
    <ContentWrapper>
      <Heading title="Payments" description="An easy to use UI to help administrators manage payment identities" />

      {can(PERMISSIONS.EXPORT_PAYMENTS_EXCEL) && (
        <div className="flex items-center sm:justify-end gap-3">
          <ExportListPaymentExcelButton />{" "}
        </div>
      )}

      {can(PERMISSIONS.READ_PAYMENTS) && <PaymentListTable />}
    </ContentWrapper>
  );
}
