import { ColumnDef } from "@tanstack/react-table";
import { AuditLog } from "@/types/audit-log";
import { CopyValue } from "@/components/CopyValue";
import { formatDateString } from "@/utils/date";
import { AuditBadge } from "@/components/AuditBadge";

export const auditLogColumns: ColumnDef<AuditLog, any>[] = [
  {
    id: "id",
    header: "ID",
    maxSize: 64,
    cell: ({ row }) => <CopyValue value={row.original.id} hiddenValue />,
  },
  {
    accessorKey: "operationType",
    header: "Type",
    minSize: 80,
    cell: ({ row }) => <span className="capitalize">{row.original.operationType}</span>,
  },
  {
    id: "documentID",
    header: "DocumentID",
    minSize: 250,
    cell: ({ row }) => row.original.documentId,
  },
  {
    accessorKey: "collection",
    header: "Collection",
    minSize: 80,
    cell: ({ row }) => row.original.collection,
  },
  {
    accessorKey: "result",
    header: "Result",
    minSize: 100,
    cell: ({ row }) => <AuditBadge result={row.original.result} />,
  },
  {
    accessorKey: "activityDate",
    header: "Activity Date",
    minSize: 200,
    cell: ({ row }) => formatDateString(row.original.activityDate, "long"),
  },
];
