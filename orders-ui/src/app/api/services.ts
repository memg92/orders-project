import useSWR, { mutate } from "swr";

export enum OrderStatus {
  Processing = "Processing",
  Completed = "Completed",
  Confirmed = "Confirmed",
  Cancelled = "Cancelled",
}

export interface OrderItem {
  id: number;
  product: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  orderId: number;
  orderItems: OrderItem[];
  total: number;
  status: OrderStatus;
  created: string;
  updated: string;
}

// This would be an environment variable in a real app
const API_BASE_URL = "http://localhost:3001";

const fetcher = (args: string | URL | Request) =>
  fetch(args).then((res) => res.json());

export function useOrders() {
  const { data, error, isLoading } = useSWR<{ orders: Order[] }>(
    `${API_BASE_URL}/orders`,
    fetcher
  );

  return {
    orders: data?.orders,
    error,
    isLoading,
  };
}

// invalidate cache and trigger a re-fetch
export function invalidateOrdersCache() {
  mutate(`${API_BASE_URL}/orders`);
}

export async function removeOrderItem(
  orderId: number,
  orderItemId: number
): Promise<Order> {
  const response = await fetch(
    `${API_BASE_URL}/orders/${orderId}/remove-item`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderItemId }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to remove order item");
  }

  return await response.json();
}

export async function deleteOrder(orderId: number): Promise<Order> {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete order");
  }

  return await response.json();
}
