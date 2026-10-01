
import type { Pagination } from "@/types/paginationType";

type PaginationProps = {
  pagination?: Pagination | null;
  onPageChange: (page: number) => void;
};

const Pagination = ({ pagination, onPageChange }: PaginationProps) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { page, totalPages, totalItems, pageSize } = pagination;
  const startIndex = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const endIndex = Math.min(page * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= maxPagesToShow; i++) {
          pages.push(i);
        }
      } else if (page >= totalPages - 2) {
        for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = page - 2; i <= page + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100 sansation-regular">
      <p className="text-xs text-gray-400">
        Hiển thị <span className="font-semibold text-gray-600">{startIndex}</span> –{" "}
        <span className="font-semibold text-gray-600">{endIndex}</span> trong{" "}
        <span className="font-semibold text-gray-600">{totalItems}</span> kết quả
      </p>

      <div className="flex items-center gap-1.5">
        {page > 1 && (
          <button
            onClick={() => onPageChange(1)}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-xs text-gray-500 hover:bg-gray-100 transition-all duration-200"
            title="Trang đầu"
          >
            «
          </button>
        )}

        <button
          onClick={() => onPageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
          className={`px-3 h-9 rounded-xl text-xs font-medium transition-all duration-200 ${page === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          Trước
        </button>

        {pageNumbers.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-200 ${p === page
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => onPageChange(Math.min(page + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-3 h-9 rounded-xl text-xs font-medium transition-all duration-200 ${page === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          Sau
        </button>

        {page < totalPages && (
          <button
            onClick={() => onPageChange(totalPages)}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-xs text-gray-500 hover:bg-gray-100 transition-all duration-200"
            title="Trang cuối"
          >
            »
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
