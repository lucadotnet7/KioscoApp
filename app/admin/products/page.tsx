import { redirect } from "next/navigation";
import ProductPagination from "@/components/products/ProductPagination";
import ProductTable from "@/components/products/ProductTable";
import Title from "@/components/ui/Title";
import prisma from "@/src/lib/prisma";
import Link from "next/link";
import SearchProduct from "@/components/products/SearchProduct";

async function productsCount() {
  return await prisma.product.count();
}

async function getProducts(page: number, size: number) {
  const products = await prisma.product.findMany({
    take: size,
    skip: (page - 1) * size,
    include: {
      category: true,
    },
  });

  return products;
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const pageSize = 10;
  const page = +searchParams.page || 1;

  if (page < 0) redirect("/admin/products");

  const productsData = getProducts(page, pageSize);
  const totalProductsData = productsCount();

  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ]);

  const totalPages = Math.ceil(totalProducts / pageSize);

  if (page > totalPages) redirect("/admin/products");

  return (
    <>
      <Title> Administrar Productos </Title>

      <div className="flex flex-col gap-5 lg:flex-row justify-between">
        <Link
          href="/admin/products/new"
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >
          Crear producto
        </Link>
        <SearchProduct />
      </div>

      <ProductTable products={products} />
      <ProductPagination page={page} totalPages={totalPages} />
    </>
  );
}
