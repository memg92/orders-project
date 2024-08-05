export enum OrderStatus {
  Processing = "Processing",
  Completed = "Completed",
  Confirmed = "Confirmed",
  Cancelled = "Cancelled",
}

export class OrderItem {
  id: number;
  product: string;
  quantity: number;
  price: number;
}

export class Order {
  id: number;
  orderId: number;
  orderItems: OrderItem[];
  total: number;
  status: OrderStatus;
  created: string;
  updated: string;
}
