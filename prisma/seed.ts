import { PrismaClient } from "../app/generated/prisma";
import { categories } from "./data/categories";
import { products } from "./data/products";

const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.category.createMany({
            data: categories
        });
        await prisma.product.createMany({
            data: products
        });
    } catch (error) {
        console.log(error);
    }
}

main()
.catch(e => console.error(e))
  .finally(() => prisma.$disconnect())