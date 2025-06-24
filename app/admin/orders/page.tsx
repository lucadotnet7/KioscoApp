"use client"

import useSWR from "swr";
import OrderCart from "@/components/order/OrderCard";
import Title from "@/components/ui/Title";
import React from "react";
import { OrderWithProducts } from "@/src/types";

export default function Orders() {
  const url = '/admin/orders/api';
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data);

  const {data, error, isLoading} = useSWR<{orders: OrderWithProducts[]}>(url, fetcher, {
    //DESACTIVAR EN PROD
    refreshInterval: 60000,
    revalidateOnFocus: false
  });

  if (isLoading) return <p>Cargando las ordenes...</p>;

  if(data) return (
    <div>
      <Title>Administrar Ordenes</Title>
      {data.orders.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {data.orders.map((order) => (
            <OrderCart key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-center">No hay ordenes pendientes</p>
      )}
    </div>
  );
}
