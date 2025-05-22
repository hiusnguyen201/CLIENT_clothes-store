import { ContentWrapper } from "@/components/ContentWrapper";
import { ImportOrderForm } from "@/components/form/order/ImportOrderForm";
import { Heading } from "@/components/Heading";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function ImportOrderPage() {
  return (
    <ContentWrapper className="max-w-6xl">
      <Link to={"/orders"} className="flex items-center gap-2 text-sm">
        <ArrowLeft size={16} />
        <span>Back to Orders</span>
      </Link>

      <Heading
        title="Import Orders"
        description="Upload your Excel file, map columns to database fields, and import data with validation."
      />

      <ImportOrderForm />
    </ContentWrapper>
  );
}
