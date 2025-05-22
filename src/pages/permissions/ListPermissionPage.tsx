import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { ExportListPermissionExcelButton } from "@/components/form/permission/ExportListPermissionExcelButton";
import { PermissionListTable } from "@/components/form/permission/PermissionListTable";
import { PERMISSIONS } from "@/constants/permissions";
import { usePermission } from "@/hooks/use-permission";

export function ListPermissionPage() {
  const can = usePermission();
  return (
    <ContentWrapper>
      <Heading title="Permissions" description="View Permissions for your applications." />

      {can(PERMISSIONS.EXPORT_PERMISSIONS_EXCEL) && (
        <div className="flex items-center justify-end">
          <ExportListPermissionExcelButton />
        </div>
      )}

      {can(PERMISSIONS.READ_PERMISSIONS) && <PermissionListTable />}
    </ContentWrapper>
  );
}
