import { ContentWrapper } from "@/components/ContentWrapper";
import { ImportCustomerForm } from "@/components/form/customer/ImportCustomerForm";
import { Heading } from "@/components/Heading";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function ImportCustomerPage() {
  return (
    <ContentWrapper className="max-w-6xl">
      <Link to={"/customers"} className="flex items-center gap-2 text-sm">
        <ArrowLeft size={16} />
        <span>Back to Customers</span>
      </Link>

      <Heading
        title="Import Customers"
        description="Upload your Excel file, map columns to database fields, and import data with validation."
      />

      <ImportCustomerForm />
    </ContentWrapper>
  );
}
