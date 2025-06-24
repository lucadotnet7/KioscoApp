import ProductCard from "@/components/products/ProductCard";
import Title from "@/components/ui/Title";
import prisma from "@/src/lib/prisma";

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  });

  return products;
}

export default async function OrderPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = await params;
  const products = await getProducts(category);

  return (
    <>
      <Title>Elige y personaliza tu pedido a continuación</Title>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
