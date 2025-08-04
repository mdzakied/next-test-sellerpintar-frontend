"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ totalPages, currentPage, setPage }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-1 justify-center py-12 text-sm">
      {/* Previous */}
      <button
        onClick={() => setPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 px-2 py-1 rounded ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-black cursor-pointer hover:underline"
        }`}
      >
        <ChevronLeft size={16} />
        <span className="hidden font-semibold sm:inline">Previous</span>
      </button>

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
        if (
          pageNum === 1 ||
          pageNum === totalPages ||
          Math.abs(pageNum - currentPage) <= 1
        ) {
          return (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`px-3 py-1 font-semibold cursor-pointer bg-white ${
                currentPage === pageNum
                  ? "border border-gray-300 rounded"
                  : "text-gray-700 hover:bg-gray-100 border-gray-300"
              }`}
            >
              {pageNum}
            </button>
          );
        }

        if (
          (pageNum === currentPage - 2 && pageNum > 1) ||
          (pageNum === currentPage + 2 && pageNum < totalPages)
        ) {
          return (
            <span key={pageNum} className="px-2 text-gray-400">
              ...
            </span>
          );
        }

        return null;
      })}

      {/* Next */}
      <button
        onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 px-2 py-1 rounded ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-black cursor-pointer hover:underline"
        }`}
      >
        <span className="hidden font-semibold sm:inline">Next</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
