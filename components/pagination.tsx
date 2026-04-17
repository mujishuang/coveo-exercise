"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { usePagination } from "@/lib/commerce-engine";

export default function Pagination() {
  const pagination = usePagination();
  const { totalPages, page } = pagination.state;

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    // If total pages is small, show all pages
    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always show first page
    pages.push(0);

    // Calculate the range of pages to show around current page
    let start = Math.max(1, page - 1);
    let end = Math.min(totalPages - 2, page + 1);

    // Adjust range if we're near the beginning
    if (page <= 2) {
      end = Math.min(totalPages - 2, 3);
    }

    // Adjust range if we're near the end
    if (page >= totalPages - 3) {
      start = Math.max(1, totalPages - 4);
    }

    // Add ellipsis before middle pages if needed
    if (start > 1) {
      pages.push("...");
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis after middle pages if needed
    if (end < totalPages - 2) {
      pages.push("...");
    }

    // Always show last page
    pages.push(totalPages - 1);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center my-8">
      <nav className="flex items-center space-x-1" aria-label="Pagination">
        <button
          onClick={pagination.methods?.previousPage}
          disabled={page === 0}
          className="relative inline-flex items-center p-2 rounded-md text-sm font-medium disabled:text-gray-300 disabled:cursor-not-allowed text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        {pageNumbers.map((curPage, index) => (
          <div key={`${curPage}-${index}`}>
            {curPage === "..." ? (
              <span className="h-10 w-10 flex items-center justify-center text-gray-400">
                ...
              </span>
            ) : (
              <button
                onClick={() => pagination.methods?.selectPage(curPage as number)}
                className={
                  page === curPage
                    ? "h-10 w-10 flex items-center justify-center rounded-md text-sm font-medium bg-indigo-600 text-white cursor-pointer"
                    : "h-10 w-10 flex items-center justify-center rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
                }
                aria-current={page === curPage ? "page" : undefined}
              >
                {(curPage as number) + 1}
              </button>
            )}
          </div>
        ))}

        <button
          onClick={pagination.methods?.nextPage}
          disabled={page === totalPages - 1}
          className="relative inline-flex items-center p-2 rounded-md text-sm font-medium disabled:text-gray-300 disabled:cursor-not-allowed text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
}
