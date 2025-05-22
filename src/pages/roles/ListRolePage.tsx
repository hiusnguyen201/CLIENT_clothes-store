import { Import, Plus } from "lucide-react";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { CreateRoleDialogForm } from "@/components/form/role/CreateRoleDialogForm";
import { RoleListTable } from "@/components/form/role/RoleListTable";
import { Button } from "@/components/ui/button";
import { usePermission } from "@/hooks/use-permission";
import { PERMISSIONS } from "@/constants/permissions";
import { ExportListRoleExcelButton } from "@/components/form/role/ExportListRoleExcelButton";
import { Link } from "react-router-dom";

export function ListRolePage() {
  const can = usePermission();
  return (
    <ContentWrapper className="lg:max-w-6xl">
      <Heading
        title="Roles"
        description="Create and manage Roles for your applications. Roles contain collections of Permissions."
        actionRight={
          can(PERMISSIONS.CREATE_ROLE) && (
            <CreateRoleDialogForm>
              <Button>
                <Plus size={14} />
                Create Role
              </Button>
            </CreateRoleDialogForm>
          )
        }
      />

      {can([PERMISSIONS.IMPORT_ROLES_EXCEL, PERMISSIONS.EXPORT_ROLES_EXCEL], "some") && (
        <div className="flex items-center sm:justify-end gap-3">
          {can(PERMISSIONS.IMPORT_ROLES_EXCEL) && (
            <Link to="/roles/import">
              <Button className="min-w-[100px] sm:max-w-[120px]" variant="outline">
                <Import />
                Import
              </Button>
            </Link>
          )}

          {can(PERMISSIONS.EXPORT_ROLES_EXCEL) && <ExportListRoleExcelButton />}
        </div>
      )}

      {can(PERMISSIONS.READ_ROLES) && <RoleListTable />}
    </ContentWrapper>
  );
}
