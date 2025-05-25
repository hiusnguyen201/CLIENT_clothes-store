import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { getListAuditLog } from "@/redux/audit-log/audit-log.thunk";
import { DataTablePagination } from "@/components/data-table/DataTablePagination";
import { AuditLogFieldsSort, AuditLogState } from "@/redux/audit-log/audit-log.type";
import { toast } from "@/hooks/use-toast";
import { useAuditLogTableFilters } from "./useAuditLogTableFilters";
import { SearchFormField } from "@/components/form-fields/SearchFormFIeld";
import { AuditLogFilterSidebarForm } from "./AuditLogFilterSidebarForm";
import { auditLogColumns } from "./audit-log-columns";

export function AuditLogListTable() {
  const dispatch = useAppDispatch();
  const { list, totalCount, loading } = useAppSelector<AuditLogState>((state) => state.auditLog);
  const { filters, handlePageChange, handleLimitChange, handleKeywordChange, handleSortChange, handleFiltersChange } =
    useAuditLogTableFilters();

  const handleGetAuditLogList = async () => {
    try {
      await dispatch(getListAuditLog(filters)).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    handleGetAuditLogList();
  }, [filters, dispatch]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
        <SearchFormField
          name="keyword"
          disabled={loading.getListAuditLog}
          value={filters.keyword}
          onValueChange={handleKeywordChange}
          placeholder="Enter a keyword"
        />

        <AuditLogFilterSidebarForm
          onApplyFilter={handleFiltersChange}
          values={{
            operationType: filters.operationType,
            result: filters.result,
          }}
        />
      </div>

      <DataTable
        data={list}
        onSortingChange={(sorting) => {
          handleSortChange(sorting[0]?.id as AuditLogFieldsSort, sorting[0]?.desc);
        }}
        loading={loading.getListAuditLog}
        placeholder="No audit-logs found. Note: if a audit-log was just created/deleted, it takes some time for it to be indexed."
        columns={auditLogColumns}
        heightPerRow={77}
      />

      <DataTablePagination
        loading={loading.getListAuditLog}
        limit={filters.limit}
        totalCount={totalCount}
        page={filters.page}
        onLimitChange={handleLimitChange}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
