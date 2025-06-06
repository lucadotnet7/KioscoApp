import OrderCart from "@/components/order/OrderCard";
import Title from "@/components/ui/Title";
import prisma from "@/src/lib/prisma";
import React from "react";

async function getPendingOrders() {
  const pendingOrders = await prisma.order.findMany({
    where: {
      status: false,
    },
    include: {
      OrderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return pendingOrders;
}

export default async function Orders() {
  const pendingOrders = await getPendingOrders();

  return (
    <div>
      <Title>Administrar Ordenes</Title>
      {pendingOrders.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {pendingOrders.map((pendingOrder) => (
            <OrderCart key={pendingOrder.id} order={pendingOrder} />
          ))}
        </div>
      ) : (
        <p className="text-center">No hay ordenes pendientes</p>
      )}
    </div>
  );
}
