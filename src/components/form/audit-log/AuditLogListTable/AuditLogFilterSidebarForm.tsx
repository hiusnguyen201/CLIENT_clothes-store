import { FilterSidebar } from "@/components/FilterSidebar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SelectFormField } from "@/components/form-fields";
import { useFormik } from "formik";
import { object, string } from "yup";
import { filterTruthyValues } from "@/utils/object";
import { GetListAuditLogPayload } from "@/redux/audit-log/audit-log.type";
import { OPERATION_TYPE, RESULT } from "@/types/audit-log";

type FilterParams = Pick<GetListAuditLogPayload, "operationType" | "result">;

type AuditLogFilterSidebarFormProps = {
  onApplyFilter: (filters: FilterParams) => void;
  values: FilterParams;
};

const initialValues: FilterParams = {
  operationType: undefined,
  result: undefined,
};

const filterProductSchema = object().shape({
  operationType: string().oneOf(Object.values(OPERATION_TYPE)).nullable(),
  result: string().oneOf(Object.values(RESULT)).nullable(),
});

export function AuditLogFilterSidebarForm({ onApplyFilter, values }: AuditLogFilterSidebarFormProps) {
  const [openFilter, setOpenFilter] = useState(false);

  const formik = useFormik({
    initialValues: values,
    validationSchema: filterProductSchema,
    onSubmit: (values: FilterParams) => {
      onApplyFilter(values);
      setOpenFilter(false);
    },
  });

  useEffect(() => {
    formik.setValues(values);
  }, [values]);

  return (
    <FilterSidebar
      isOpen={openFilter}
      title="Filter"
      countFilters={Object.keys(filterTruthyValues(values)).length}
      onClickClear={() => {
        onApplyFilter(initialValues);
      }}
      onOpenChange={setOpenFilter}
    >
      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        <SelectFormField
          name="operationType"
          label="Operation Type"
          value={formik.values.operationType}
          onValueChange={(value) => formik.setFieldValue("status", value)}
          options={Object.values(OPERATION_TYPE).map((item) => ({ value: item, title: item }))}
        />

        <SelectFormField
          name="result"
          label="Result"
          value={formik.values.result}
          onValueChange={(value) => formik.setFieldValue("gender", value)}
          options={Object.values(RESULT).map((item) => ({ value: item, title: item }))}
        />

        <Button type="submit" className="w-full mt-6">
          Query
        </Button>
      </form>
    </FilterSidebar>
  );
}
