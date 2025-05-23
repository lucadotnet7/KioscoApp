import prisma from "@/lib/prisma";

async function getCategories() {
  try {
    return await prisma.category.findMany();
  } catch (e) {
    console.error("ERROR PRISMA:", e);
  }
}

export default async function OrderSidebar() {
  const categories = await getCategories();

  console.log(categories);

  return <aside className="md:w-72 md:h-screen bg-white"></aside>;
}
