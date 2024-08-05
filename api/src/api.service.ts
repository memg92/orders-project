import { Injectable } from "@nestjs/common";
import { Order, OrderItem, OrderStatus } from "./api.dto";

/**
 * For simplicity, we are consolidating multiple resources (e.g. products, orderItems, and orders) into a single service.
 * These resources would typically be managed by separate services in a real-world application.
 */
@Injectable()
export class ApiService {
  private orders: Order[];
  private orderItems: OrderItem[];
  constructor() {
    this.orderItems = [
      { id: 1, product: "Apple", quantity: 2, price: 20 },
      { id: 2, product: "Carrots", quantity: 1, price: 50 },
      { id: 3, product: "Salmon", quantity: 3, price: 10 },
      { id: 4, product: "Potato", quantity: 4, price: 2 },
    ];
    this.orders = [
      {
        id: 1,
        orderId: 123,
        orderItems: [{ ...this.orderItems[0] }],
        total: 0,
        status: OrderStatus.Processing,
        created: "2024-08-02T20:40:41.798Z",
        updated: "2024-08-02T20:40:41.798Z",
      },
      {
        id: 2,
        orderId: 456,
        orderItems: [{ ...this.orderItems[1], ...this.orderItems[2] }],
        total: 0,
        status: OrderStatus.Completed,
        created: "2024-08-04T20:40:41.798Z",
        updated: "2024-08-04T20:40:41.798Z",
      },
      {
        id: 3,
        orderId: 789,
        orderItems: [{ ...this.orderItems[3] }],
        total: 0,
        status: OrderStatus.Completed,
        created: "2024-08-01T20:40:41.798Z",
        updated: "2024-08-01T20:40:41.798Z",
      },
    ];
  }

  getOrders(): any[] {
    return this.orders;
  }
}
