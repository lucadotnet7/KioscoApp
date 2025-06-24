import { OrderWithProducts } from "@/src/types";

export default function LatestOrderItem({order}: {order: OrderWithProducts}) {
  return (
    <div className="bg-white shadow p-5 space-y-5 rounded-lg">
      <p className="text-lg font-bold text-slate-600">
          Cliente: {order.user}
      </p>
  
      <ul role="list" className="divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500">
        {order.OrderProducts.map(op => (
          <li 
              key={op.id}
              className="flex py-6 text-lg">
              <p>
                <span className="font-bold">({op.quantity}) {''}</span>
                {op.product.name}
              </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
