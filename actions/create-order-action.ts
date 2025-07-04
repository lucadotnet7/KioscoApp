"use server"

import prisma from "@/src/lib/prisma";
import { OrderSchema } from "@/src/schemas"

export async function CreateOrder(data: unknown) {
    const result = OrderSchema.safeParse(data);

    if(!result.success) {
        return {
            errors: result.error.issues
        }
    }

    try {
        await prisma.order.create({
            data: {
                user: result.data.user,
                total: result.data.total,
                OrderProducts:  {
                    create: result.data.order.map(product => ({
                        productId: product.id,
                        quantity: product.quantity
                    }))
                }
            }
        });
    } catch(error) {
        console.log(error);
    }
}