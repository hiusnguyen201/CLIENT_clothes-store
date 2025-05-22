import { ContentWrapper } from "@/components/ContentWrapper";
import { ImportUserForm } from "@/components/form/user/ImportUserForm";
import { Heading } from "@/components/Heading";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function ImportUserPage() {
  return (
    <ContentWrapper className="max-w-6xl">
      <Link to={"/users"} className="flex items-center gap-2 text-sm">
        <ArrowLeft size={16} />
        <span>Back to Users</span>
      </Link>

      <Heading
        title="Import Users"
        description="Upload your Excel file, map columns to database fields, and import data with validation."
      />

      <ImportUserForm />
    </ContentWrapper>
  );
}
