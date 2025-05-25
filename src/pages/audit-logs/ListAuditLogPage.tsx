import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { AuditLogListTable } from "@/components/form/audit-log/AuditLogListTable";

export function ListAuditLogPage() {
  return (
    <ContentWrapper>
      <Heading
        title="Logs"
        description="Storage of log data of actions taken in the dashboard by the administrators, as well as authentications made by your users."
      />

      <AuditLogListTable />
    </ContentWrapper>
  );
}
