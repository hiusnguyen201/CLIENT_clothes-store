import { Import, Plus } from "lucide-react";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { UserListTable } from "@/components/form/user/UserListTable";
import { Button } from "@/components/ui/button";
import { usePermission } from "@/hooks/use-permission";
import { PERMISSIONS } from "@/constants/permissions";
import { Link } from "react-router-dom";
import { ExportListUserExcelButton } from "@/components/form/user/ExportListUserExcelButton";

export function ListUserPage() {
  const can = usePermission();
  console.log(can([PERMISSIONS.IMPORT_USERS_EXCEL, PERMISSIONS.EXPORT_USERS_EXCEL], "some"));
  return (
    <ContentWrapper>
      <Heading
        title="Users"
        description="An easy to use UI to help administrators manage user identities including password resets, creating and provisioning and removing users."
        actionRight={
          can(PERMISSIONS.CREATE_USER) && (
            <Link to={"/users/create"}>
              <Button>
                <Plus size={14} />
                Create User
              </Button>
            </Link>
          )
        }
      />

      {can([PERMISSIONS.IMPORT_USERS_EXCEL, PERMISSIONS.EXPORT_USERS_EXCEL], "some") && (
        <div className="flex items-center sm:justify-end gap-3">
          {can(PERMISSIONS.IMPORT_USERS_EXCEL) && (
            <Link to="/users/import">
              <Button className="min-w-[100px] sm:max-w-[120px]" variant="outline">
                <Import />
                Import
              </Button>
            </Link>
          )}

          {can(PERMISSIONS.EXPORT_USERS_EXCEL) && <ExportListUserExcelButton />}
        </div>
      )}

      {can(PERMISSIONS.READ_USERS) && <UserListTable />}
    </ContentWrapper>
  );
}
