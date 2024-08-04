"use client";
import { Button } from "@headlessui/react";

const mockOrders = [
  {
    id: 1,
    name: "Order 1",
    orderItems: [
      {
        id: 1,
        product: "Apple",
        quantity: 2,
        price: 20,
      },
      {
        id: 2,
        product: "Carrots",
        quantity: 1,
        price: 50,
      },
      {
        id: 3,
        product: "Salmon",
        quantity: 3,
        price: 10,
      },
    ],
    total: 100,
    created: "2024-08-04T20:40:41.798Z",
    updated: "2024-08-04T20:40:41.798Z",
  },
  {
    id: 2,
    name: "Order 2",
    orderItems: [
      {
        id: 2,
        product: "Carrots",
        quantity: 1,
        price: 50,
      },
      {
        id: 3,
        product: "Salmon",
        quantity: 1,
        price: 10,
      },
    ],
    total: 60,
    created: "2024-08-04T20:40:41.798Z",
    updated: "2024-08-04T20:40:41.798Z",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="m-auto w-full p-4 max-w-xl bg-slate-200 rounded-md">
        {mockOrders.map((order) => (
          <div
            key={order.id}
            className="p-4 border-b border-slate-400 bg-white rounded-md"
          >
            <div className="flex justify-between">
              <h2 className="text-lg font-bold">{order.name}</h2>
              <Button className="bg-red-700 text-white px-2 rounded-md">
                Delete
              </Button>
            </div>
            <p className="text-sm text-slate-600">
              Created: {new Date(order.created).toDateString()}
            </p>
            <div className="flex justify-between py-2 font-bold">
              <p>Product</p>
              <p>Quantity</p>
              <p>Price</p>
            </div>
            <div className="flex flex-col gap-4">
              {order.orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between bg-slate-100"
                >
                  <p>{item.product}</p>
                  <div className="flex flex-col items-center">
                    <p>{item.quantity}</p>
                    <Button className="text-blue-900 underline">Remove</Button>
                  </div>
                  <p>{item.price}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between py-2 font-bold">
              <p>Total</p>
              <p>{order.total}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
