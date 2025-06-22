import ProductTable from "@/components/products/ProductTable";
import SearchProduct from "@/components/products/SearchProduct";
import Title from "@/components/ui/Title";
import prisma from "@/src/lib/prisma";

async function searchProducts(search: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });

  return products;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const products = await searchProducts(searchParams.search);

  return (
    <>
      <Title>Resultado de la busqueda: {searchParams.search}</Title>
      <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
        <SearchProduct />
      </div>
      {products.length === 0 ? (
        <p className="text-center text-lg mt-10">
          No se encontrarón resultados para la busqueda
        </p>
      ) : (
        <ProductTable products={products} />
      )}
    </>
  );
}
