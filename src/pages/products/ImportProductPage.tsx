import { ContentWrapper } from "@/components/ContentWrapper";
import { ImportProductForm } from "@/components/form/product/ImportProductForm";
import { Heading } from "@/components/Heading";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function ImportProductPage() {
  return (
    <ContentWrapper className="max-w-6xl">
      <Link to={"/products"} className="flex items-center gap-2 text-sm">
        <ArrowLeft size={16} />
        <span>Back to Products</span>
      </Link>

      <Heading
        title="Import Products"
        description="Upload your Excel file, map columns to database fields, and import data with validation."
      />

      <ImportProductForm />
    </ContentWrapper>
  );
}
