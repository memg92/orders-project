"use client";
import { Button } from "@headlessui/react";
import {
  deleteOrder,
  invalidateOrdersCache,
  removeOrderItem,
  useOrders,
} from "./api/services";
import { usdCurrencyFormatter } from "./utils";

export default function OrdersPage() {
  const { orders, isLoading } = useOrders();

  function onOrderDelete(orderId: number) {
    deleteOrder(orderId).then(() => {
      // invalidate cache
      invalidateOrdersCache();
    });
  }

  function onOrderItemRemove(orderId: number, orderItemId: number) {
    removeOrderItem(orderId, orderItemId).then(() => {
      // invalidate cache
      invalidateOrdersCache();
    });
  }

  if (isLoading) {
    return <div className="m-auto">Loading...</div>;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="m-auto w-full p-4 max-w-xl bg-slate-200 rounded-md">
        {orders
          ? orders
              // Sort orders by created date
              .sort(
                (a, b) =>
                  new Date(a.created).getTime() - new Date(b.created).getTime()
              )
              .map((order) => (
                // note: this could be abstracted to its own component
                <div
                  key={order.id}
                  className="p-4 border-b border-slate-400 bg-white rounded-md"
                >
                  <div className="flex justify-between bg-slate-200 p-2 rounded-md">
                    <h2 className="text-lg font-bold">Order {order.orderId}</h2>
                    <Button
                      className="bg-red-700 text-white px-2 rounded-md"
                      onClick={() => onOrderDelete(order.id)}
                    >
                      Delete
                    </Button>
                  </div>
                  <div className="p-2">
                    <p className="text-sm text-slate-600">
                      Created: {new Date(order.created).toDateString()}
                    </p>
                    <p className="font-bold py-2 text-slate-600">
                      Status: {order.status}
                    </p>
                  </div>
                  {/* Headers for item details */}
                  <div className="flex justify-between p-2 font-bold">
                    <p className="w-1/3">Product</p>
                    <p className="w-1/4 text-center">Quantity</p>
                    <p className="w-1/4 text-end">Price</p>
                  </div>
                  {/* Order item details – note: this could be abstracted to its own component*/}
                  <div className="flex flex-col px-2 gap-2">
                    {order.orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between p-1 rounded-sm"
                      >
                        <p className="w-1/3 truncate">{item.product}</p>
                        <div className="flex flex-col items-center w-1/4">
                          <p>{item.quantity}</p>
                          <Button
                            className="text-blue-900 underline"
                            onClick={() => onOrderItemRemove(order.id, item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                        <p className="w-1/4 text-end">
                          {usdCurrencyFormatter.format(item.price)}
                        </p>
                      </div>
                    ))}
                  </div>
                  {/* Total amount for order */}
                  <div className="flex justify-between p-2 font-bold">
                    <p>Total</p>
                    <p>{usdCurrencyFormatter.format(order.total)}</p>
                  </div>
                </div>
              ))
          : null}
      </div>
    </main>
  );
}
