"use client";

import { useMemo } from "react";
import { toast } from "react-toastify";
import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { formatCurrency } from "@/src/utils";
import { CreateOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schemas";
import { OrderItem } from "@/src/types";

export default function OrderSummary() {
  const order = useStore((state) => state.order);
  const clearOrder = useStore((state) => state.clearOrder);

  const total = useMemo(
    () => order.reduce((total, product) => total + product.subtotal, 0),
    [order]
  );

  async function handleCreateOrder(formData: FormData) {
    const data = {
      user: formData.get("user"),
      total: total,
      order,
    };

    const result = OrderSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });

      return;
    }

    _createOrder(data);
  }

  //#region Private Methods
  async function _createOrder(data: {
    user: FormDataEntryValue | null;
    total: number;
    order: OrderItem[];
  }) {
    const response = await CreateOrder(data);

    if (response?.errors) {
      response.errors.forEach((err) => {
        toast.error(err.message);
      });
    }

    toast.success("Pedido realizado correctamente.");
    clearOrder();
  }
  //#endregion

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

      {order.length === 0 ? (
        <p className="text-center my-10">El pedido está vacío</p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}

          <p className="text-2xl font-bold mt-5 text-amber-500">
            Total: <span className="text-black">{formatCurrency(total)}</span>
          </p>

          <form className="w-full mt-10 space-y-5" action={handleCreateOrder}>
            <input
              type="text"
              placeholder="Tu nombre"
              className="bg-white border border-gray-100 p-2 w-full"
              name="user"
            />
            <input
              type="submit"
              className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
              value="confirmar pedido"
            />
          </form>
        </div>
      )}
    </aside>
  );
}
