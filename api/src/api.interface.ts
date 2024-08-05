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
