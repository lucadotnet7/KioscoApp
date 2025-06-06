import { z } from "zod";

export const OrderSchema = z.object({
    user: z.string()
            .min(1, "Debe ingresar un nombre"),
    total: z.number()
            .min(1, "Hay errores en la orden"),
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number()
    }))
});

export const OrderIdSchema = z.object({
    orderId: z.string()
                .transform((value) => parseInt(value))
                .refine(value => value > 0, {message: "Ha ocurrido un error"})
})