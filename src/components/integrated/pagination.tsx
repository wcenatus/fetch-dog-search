import { useEffect, useState } from "react";
import { useFilter } from "../../context/filter-context";

export const Pagination = () => {
  const { total, filters, setFilters, page, setPage } = useFilter();
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Calculate total pages
    const getTotalPages = Math.ceil(total / (filters.size || 25));
    setTotalPages(getTotalPages);
  }, [filters, total]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    setFilters({
      ...filters,
      from: JSON.stringify(filters.size * (pageNumber - 1)),
    });
  };

  const generatePageNumbers = () => {
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, page + 2);

    // Ensure we show 5 page buttons at most
    if (endPage - startPage < 4) {
      if (page < 3) {
        endPage = Math.min(5, totalPages);
      } else {
        startPage = Math.max(1, totalPages - 4);
      }
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i}>
          <button
            onClick={() => handlePageChange(i)}
            className={`cursor-pointer flex items-center justify-center px-3 h-8 leading-tight ${
              page === i
                ? "text-blue-600 bg-blue-50 border-blue-300"
                : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100"
            } border`}
            aria-current={page === i ? "page" : undefined}
          >
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <nav>
      <ul className="inline-flex -space-x-px">
        <li>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            aria-disabled={page === 1}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
          >
            Previous
          </button>
        </li>
        {generatePageNumbers()}
        <li>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            aria-disabled={page === totalPages}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
