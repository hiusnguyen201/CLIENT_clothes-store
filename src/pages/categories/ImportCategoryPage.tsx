import { ContentWrapper } from "@/components/ContentWrapper";
import { ImportCategoryForm } from "@/components/form/category/ImportCategoryForm";
import { Heading } from "@/components/Heading";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function ImportCategoryPage() {
  return (
    <ContentWrapper className="max-w-6xl">
      <Link to={"/categories"} className="flex items-center gap-2 text-sm">
        <ArrowLeft size={16} />
        <span>Back to Categories</span>
      </Link>

      <Heading
        title="Import Categories"
        description="Upload your Excel file, map columns to database fields, and import data with validation."
      />

      <ImportCategoryForm />
    </ContentWrapper>
  );
}
