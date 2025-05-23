import { FilterSidebar } from "@/components/FilterSidebar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SelectFormField } from "@/components/form-fields";
import { useFormik } from "formik";
import { object, string } from "yup";
import { filterTruthyValues } from "@/utils/object";
import { GetListPaymentPayload } from "@/redux/payment/payment.type";
import { PAYMENT_STATUS } from "@/types/payment";

type FilterParams = Pick<GetListPaymentPayload, "status">;

type PaymentFilterSidebarFormProps = {
  onApplyFilter: (filters: FilterParams) => void;
  values: FilterParams;
};

const initialValues: FilterParams = {
  status: undefined,
};

const filterProductSchema = object().shape({
  status: string().nullable().default(null),
});

export function PaymentFilterSidebarForm({ onApplyFilter, values }: PaymentFilterSidebarFormProps) {
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
          name="status"
          label="Payment status"
          value={formik.values.status}
          onValueChange={(value) => formik.setFieldValue("status", value)}
          options={Object.values(PAYMENT_STATUS).map((item) => ({ value: item, title: item }))}
        />

        <Button type="submit" className="w-full mt-6">
          Query
        </Button>
      </form>
    </FilterSidebar>
  );
}
