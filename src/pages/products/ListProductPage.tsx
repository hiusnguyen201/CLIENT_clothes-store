import { Import, Plus } from "lucide-react";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { ProductListTable } from "@/components/form/product/ProductListTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { usePermission } from "@/hooks/use-permission";
import { PERMISSIONS } from "@/constants/permissions";
import { ExportListProductExcelButton } from "@/components/form/product/ExportListProductExcelButton";

export function ListProductPage() {
  const can = usePermission();
  return (
    <ContentWrapper>
      <Heading
        title="Products"
        description="An easy to use UI to help administrators manage product."
        actionRight={
          can(PERMISSIONS.CREATE_PRODUCT) && (
            <Link to={"/products/new"}>
              <Button>
                <Plus size={14} />
                Add New Product
              </Button>
            </Link>
          )
        }
      />

      {can([PERMISSIONS.IMPORT_PRODUCTS_EXCEL, PERMISSIONS.EXPORT_PRODUCTS_EXCEL], "some") && (
        <div className="flex items-center sm:justify-end gap-3">
          {can(PERMISSIONS.IMPORT_PRODUCTS_EXCEL) && (
            <Link to="/products/import">
              <Button className="min-w-[100px] sm:max-w-[120px]" variant="outline">
                <Import />
                Import
              </Button>
            </Link>
          )}

          {can(PERMISSIONS.EXPORT_PRODUCTS_EXCEL) && <ExportListProductExcelButton />}
        </div>
      )}

      {can(PERMISSIONS.READ_PRODUCTS) && <ProductListTable />}
    </ContentWrapper>
  );
}
