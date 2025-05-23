import { Import, Plus } from "lucide-react";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { OrderListTable } from "@/components/form/order/OrderListTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { usePermission } from "@/hooks/use-permission";
import { PERMISSIONS } from "@/constants/permissions";
import { ExportListOrderExcelButton } from "@/components/form/order/ExportListOrderExcelButton";

export function ListOrderPage() {
  const can = usePermission();
  return (
    <ContentWrapper>
      <Heading
        title="Orders"
        description="An easy to use UI to help administrators manage order identities including creating and provisioning and removing orders."
        actionRight={
          can(PERMISSIONS.CREATE_ORDER) && (
            <Link to="/orders/create">
              <Button>
                <Plus size={14} />
                Create Order
              </Button>
            </Link>
          )
        }
      />

      {can([PERMISSIONS.IMPORT_ORDERS_EXCEL, PERMISSIONS.EXPORT_ORDERS_EXCEL], "some") && (
        <div className="flex items-center sm:justify-end gap-3">
          {can(PERMISSIONS.IMPORT_ORDERS_EXCEL) && (
            <Link to="/orders/import">
              <Button className="min-w-[100px] sm:max-w-[120px]" variant="outline">
                <Import />
                Import
              </Button>
            </Link>
          )}

          {can(PERMISSIONS.EXPORT_ORDERS_EXCEL) && <ExportListOrderExcelButton />}
        </div>
      )}

      {can(PERMISSIONS.READ_ORDERS) && <OrderListTable />}
    </ContentWrapper>
  );
}
