import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { CategoryListTable } from "@/components/form/category/CategoryListTable";
import { Import, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateCategoryDialogForm } from "@/components/form/category/CreateCategoryDialogForm";
import { usePermission } from "@/hooks/use-permission";
import { PERMISSIONS } from "@/constants/permissions";
import { ExportListCategoryExcelButton } from "@/components/form/category/ExportListCategoryExcelButton";
import { Link } from "react-router-dom";

export function ListCategoryPage() {
  const can = usePermission();

  return (
    <ContentWrapper className="lg:max-w-6xl">
      <Heading
        title="Categories"
        description="View categories for your applications."
        actionRight={
          can(PERMISSIONS.CREATE_CATEGORY) && (
            <CreateCategoryDialogForm>
              <Button>
                <Plus size={14} />
                Create Category
              </Button>
            </CreateCategoryDialogForm>
          )
        }
      />

      {can([PERMISSIONS.IMPORT_CATEGORIES_EXCEL, PERMISSIONS.EXPORT_CATEGORIES_EXCEL], "some") && (
        <div className="flex items-center sm:justify-end gap-3">
          {can(PERMISSIONS.IMPORT_CATEGORIES_EXCEL) && (
            <Link to="/categories/import">
              <Button className="min-w-[100px] sm:max-w-[120px]" variant="outline">
                <Import />
                Import
              </Button>
            </Link>
          )}

          {can(PERMISSIONS.EXPORT_CATEGORIES_EXCEL) && <ExportListCategoryExcelButton />}
        </div>
      )}

      {can(PERMISSIONS.READ_CATEGORIES) && <CategoryListTable />}
    </ContentWrapper>
  );
}
