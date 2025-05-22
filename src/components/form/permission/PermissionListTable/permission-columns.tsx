import { ColumnDef } from "@tanstack/react-table";
import { TruncatedTextWithTooltip } from "@/components/TruncatedTextWithTooltip";
import { Permission } from "@/types/permission";
import { Tag } from "@/components/Tag";
import { CopyValue } from "@/components/CopyValue";

export const permissionColumns: ColumnDef<Permission, any>[] = [
  {
    id: "id",
    header: "ID",
    maxSize: 64,
    cell: ({ row }) => <CopyValue value={row.original.id} hiddenValue />,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <Tag className="text-sm">{row.original.name}</Tag>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <TruncatedTextWithTooltip>{row.original.description}</TruncatedTextWithTooltip>,
  },
];
