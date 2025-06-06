import ProductPagination from "@/components/products/ProductPagination";
import ProductTable from "@/components/products/ProductTable";
import Title from "@/components/ui/Title";
import prisma from "@/src/lib/prisma";

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
  const page = +searchParams.page || 1;

  const products = await getProducts(page, 10);

  return (
    <>
      <Title> Administrar Productos </Title>
      <ProductTable products={products} />
      <ProductPagination page={page} />
    </>
  );
}
