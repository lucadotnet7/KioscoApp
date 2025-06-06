import { Product, Order, OrderProducts } from "@/app/generated/prisma";


export type OrderItem = Pick<Product, 'id' | 'name' | 'price'> & {
    quantity: number;
    subtotal: number;
};

export type OrderWithProducts = Order & {
  OrderProducts: (OrderProducts & {
    product: Product;
  })[];
};