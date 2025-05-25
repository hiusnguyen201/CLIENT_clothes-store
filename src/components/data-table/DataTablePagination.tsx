import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectFormField } from "@/components/form-fields";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Skeleton } from "../ui/skeleton";
import { Select } from "../ui/select";

export const LIMIT_PER_PAGE: number[] = [10, 25, 50, 100];

export type DataTablePaginationProps = {
  loading: boolean;
  limit: number;
  totalCount: number;
  page: number;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
};

export function DataTablePagination({
  loading,
  limit,
  totalCount,
  page,
  onLimitChange,
  onPageChange,
}: DataTablePaginationProps) {
  const totalPages = Math.ceil(totalCount / limit);
  const isMobile = useIsMobile();

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pageNumbers: any[] = [];

    // If no items or only one page, return empty array
    if (totalCount === 0 || totalPages <= 1) {
      return pageNumbers;
    }

    // Always show first page
    pageNumbers.push(1);

    // Add ellipsis if needed
    if (page > 3) {
      pageNumbers.push("ellipsis-start");
    }

    // Add pages around current page
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis if needed
    if (page < totalPages - 2) {
      pageNumbers.push("ellipsis-end");
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  if (loading) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-24" />
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Skeleton className="h-8 w-8" />
            </PaginationItem>
            <PaginationItem>
              <Skeleton className="h-8 w-8" />
            </PaginationItem>
            <PaginationItem>
              <Skeleton className="h-8 w-8" />
            </PaginationItem>
            <PaginationItem>
              <Skeleton className="h-8 w-8" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <div>
          <Skeleton className="h-5 w-40" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {!isMobile && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground text-nowrap">Rows per page:</span>

          <SelectFormField
            disabled={loading}
            switchable={false}
            className="w-auto"
            name="limit"
            value={+limit}
            onValueChange={(val) => {
              onLimitChange(val || LIMIT_PER_PAGE[0]);
            }}
            options={LIMIT_PER_PAGE.map((val: number) => ({ title: String(val), value: val }))}
          />
        </div>
      )}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) onPageChange(page - 1);
              }}
              aria-disabled={page === 1 || totalCount === 0}
              className={page === 1 || totalCount === 0 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {!isMobile && pageNumbers.length > 0 ? (
            pageNumbers.map((pageNum, index) => {
              if (pageNum === "ellipsis-start" || pageNum === "ellipsis-end") {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem key={`page-${pageNum}`}>
                  <PaginationLink
                    href="#"
                    isActive={page === pageNum}
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(pageNum as number);
                    }}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })
          ) : (
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page < totalPages) onPageChange(page + 1);
              }}
              aria-disabled={page === totalPages || totalCount === 0}
              className={page === totalPages || totalCount === 0 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {!isMobile && (
        <div className="text-sm text-muted-foreground">
          {totalCount > 0 ? (
            <>
              Showing {Math.min((page - 1) * limit + 1, totalCount)} to {Math.min(page * limit, totalCount)} of{" "}
              {totalCount} {totalCount === 1 ? "row" : "rows"}
            </>
          ) : (
            "No results"
          )}
        </div>
      )}
    </div>
  );
}

// const isMobile = useIsMobile();
//   const totalPages: number = Math.max(Math.ceil(totalCount / limit), 1);
//   const isFirst: boolean = page !== 1;
//   const isLast: boolean = page !== totalPages;
//   const pageOptions = Array.from({ length: totalPages }, (_, i: number) => i + 1);

//   return (
//     <div className="text-sm font-small">
//       <div className={cn("flex gap-5 items-center justify-between mb-5")}>
//         <div className="flex items-center justify-start gap-1">
//           {!isMobile && <p className="whitespace-nowrap">Rows per page</p>}

//           <SelectFormField
//             disabled={loading}
//             switchable={false}
//             className="w-auto"
//             name="limit"
//             value={+limit}
//             onValueChange={(val) => {
//               onLimitChange(val || LIMIT_PER_PAGE[0]);
//             }}
//             options={LIMIT_PER_PAGE.map((val: number) => ({ title: String(val), value: val }))}
//           />
//         </div>

//         <div className="flex items-center sm:justify-end justify-center">
//           <div className="inline-flex items-center justify-center gap-1">
//             {/* First */}
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => {
//                 onPageChange(1);
//               }}
//               disabled={!isFirst || loading}
//             >
//               <ChevronsLeft />
//             </Button>
//             {/* Previous */}
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => {
//                 onPageChange(+page - 1);
//               }}
//               disabled={!isFirst || loading}
//             >
//               <ChevronLeft />
//             </Button>
//             {/* Next */}
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => {
//                 onPageChange(+page + 1);
//               }}
//               disabled={!isLast || loading}
//             >
//               <ChevronRight />
//             </Button>
//             {/* Last */}
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => {
//                 onPageChange(totalPages);
//               }}
//               disabled={!isLast || loading}
//             >
//               <ChevronsRight />
//             </Button>
//           </div>
//         </div>

//          <div className="flex items-center justify-end gap-1">
//           <span>Page</span>
//           <SelectFormField
//             disabled={loading}
//             switchable={false}
//             className="w-auto"
//             name="page"
//             value={page}
//             onValueChange={(val) => {
//               onPageChange(val || 1);
//             }}
//             options={pageOptions.map((opt) => ({ title: String(opt), value: opt }))}
//           />
//           <span>of</span>
//           <span>{totalPages || 1}</span>
//         </div>
//       </div>
//     </div>
//   );
