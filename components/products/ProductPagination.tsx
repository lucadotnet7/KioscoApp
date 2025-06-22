import Link from "next/link";

interface ProductPagination {
  page: number;
  totalPages: number;
}

export default function ProductPagination({
  page,
  totalPages,
}: ProductPagination) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center py-10">
      {page > 1 && (
        <Link
          href={`/admin/products?page=${page - 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >
          &laquo;
        </Link>
      )}

      <div className="px-5 flex items-center">
        {pages.map((pageNumber) => (
          <Link
            key={pageNumber}
            href={`/admin/products?page=${pageNumber}`}
            className={`${
              page === pageNumber ? "bg-amber-400" : "bg-white"
            }  px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
          >
            {pageNumber}
          </Link>
        ))}
      </div>

      {page < totalPages && (
        <Link
          href={`/admin/products?page=${page + 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
}
