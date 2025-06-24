"use server"

import { ProductSchema } from "@/src/schemas";
import prisma from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function editProduct(data: unknown, productId: number) {
  const result = ProductSchema.safeParse(data);

  if(!result.success) {
    return {
      errors: result.error.issues
    }
  }

  await prisma.product.update({
    where: {
        id: productId
    },
    data: result.data
  });

  revalidatePath('/admin/products');
}