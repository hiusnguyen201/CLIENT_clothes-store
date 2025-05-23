import { ColumnDef } from "@tanstack/react-table";
import { Payment } from "@/types/payment";
import { CopyValue } from "@/components/CopyValue";
import { formatCurrencyVND } from "@/utils/string";
import { PaymentStatusBadge } from "@/components/PaymentStatusBadge";
import { formatDateString } from "@/utils/date";

export const paymentColumns: ColumnDef<Payment, any>[] = [
  {
    id: "id",
    header: "ID",
    maxSize: 64,
    cell: ({ row }) => <CopyValue value={row.original.id} hiddenValue />,
  },
  {
    id: "amount",
    header: "Amount",
    cell: ({ row }) => formatCurrencyVND(row.original.order.total),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <PaymentStatusBadge status={row.original.status} />,
  },
  {
    id: "email",
    header: "Email",
    minSize: 250,
    cell: ({ row }) => row.original.order.customer.email,
  },
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => row.original.order.customer.name,
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => <span className="capitalize">{row.original.paymentMethod}</span>,
  },
  {
    id: "createdAt",
    header: "Date",
    cell: ({ row }) => formatDateString(row.original.createdAt),
  },
];
