import { ContentWrapper } from "@/components/ContentWrapper";
import { ImportRoleForm } from "@/components/form/role/ImportRoleForm";
import { Heading } from "@/components/Heading";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function ImportRolePage() {
  return (
    <ContentWrapper className="max-w-6xl">
      <Link to={"/roles"} className="flex items-center gap-2 text-sm">
        <ArrowLeft size={16} />
        <span>Back to Roles</span>
      </Link>

      <Heading
        title="Import Roles"
        description="Upload your Excel file, map columns to database fields, and import data with validation."
      />

      <ImportRoleForm />
    </ContentWrapper>
  );
}
