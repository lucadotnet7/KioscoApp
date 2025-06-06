import Link from "next/link";

interface ProductPagination {
  page: number;
}

export default function ProductPagination({ page }: ProductPagination) {
  const nextPage = page++;

  return (
    <nav className="flex justify-center py-10">
      <Link href={`/admin/products?page=${nextPage}`}>&raquo;</Link>
    </nav>
  );
}
