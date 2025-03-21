import { useEffect, useState } from "react";
import { useFilter } from "../../../context/filter-context";

export const Pagination = () => {
  const { total, filters, setFilters } = useFilter();
  const [pages, setPages] = useState(0);
  const [size, setSize] = useState(25);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    // Calculate total pages
    const totalPages = Math.ceil(total / (filters.size || 25));
    setPages(totalPages);
    setSize(filters.size || 25);
  }, [filters, total]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setFilters({ ...filters, from: JSON.stringify(size * (pageNumber - 1)) });
  };

  const generatePageNumbers = () => {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(pages, currentPage + 2);

    // Ensure we show 5 page buttons at most
    if (endPage - startPage < 4) {
      if (currentPage < 3) {
        endPage = Math.min(5, pages);
      } else {
        startPage = Math.max(1, pages - 4);
      }
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i}>
          <button
            onClick={() => handlePageChange(i)}
            className={`cursor-pointer flex items-center justify-center px-3 h-8 leading-tight ${
              currentPage === i
                ? "text-blue-600 bg-blue-50 border-blue-300"
                : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100"
            } border`}
            aria-current={currentPage === i ? "page" : undefined}
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
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-disabled={currentPage === 1}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
          >
            Previous
          </button>
        </li>
        {generatePageNumbers()}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pages}
            aria-disabled={currentPage === pages}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
