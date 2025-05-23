import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { getListPayment } from "@/redux/payment/payment.thunk";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import { PaymentFieldsSort, PaymentState } from "@/redux/payment/payment.type";
import { toast } from "@/hooks/use-toast";
import { usePaymentTableFilters } from "./usePaymentTableFilters";
import { SearchFormField } from "@/components/form-fields/SearchFormFIeld";
import { PaymentFilterSidebarForm } from "./PaymentFilterSidebarForm";
import { paymentColumns } from "./payment-columns";

export function PaymentListTable() {
  const dispatch = useAppDispatch();
  const { list, totalCount, loading } = useAppSelector<PaymentState>((state) => state.payment);
  const { filters, handlePageChange, handleLimitChange, handleKeywordChange, handleSortChange, handleFiltersChange } =
    usePaymentTableFilters();

  const handleGetPaymentList = async () => {
    try {
      await dispatch(getListPayment(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    handleGetPaymentList();
  }, [filters, dispatch]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
        <SearchFormField
          name="keyword"
          disabled={loading.getListPayment}
          value={filters.keyword}
          onValueChange={handleKeywordChange}
          placeholder="Enter a keyword"
        />

        <PaymentFilterSidebarForm
          onApplyFilter={handleFiltersChange}
          values={{
            status: filters.status,
          }}
        />
      </div>

      <DataTable
        data={list}
        onSortingChange={(sorting) => {
          handleSortChange(sorting[0]?.id as PaymentFieldsSort, sorting[0]?.desc);
        }}
        loading={loading.getListPayment}
        placeholder="No payments found. Note: if a payment was just created/deleted, it takes some time for it to be indexed."
        columns={paymentColumns}
        heightPerRow={77}
      />

      <DataTablePagination
        loading={loading.getListPayment}
        limit={filters.limit}
        totalCount={totalCount}
        page={filters.page}
        onLimitChange={handleLimitChange}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
