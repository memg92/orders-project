import { Injectable } from "@nestjs/common";
import { GetOrdersResponse } from "./api.dto";
import { Order, OrderItem, OrderStatus } from "./api.interface";

/**
 * For simplicity, we are consolidating multiple resources (e.g. products, orderItems, and orders) into a single service.
 * These resources would typically be managed by separate resource modules in a real-world application.
 */
@Injectable()
export class ApiService {
  private orders: Order[];
  private orderItems: OrderItem[];
  constructor() {
    this.orderItems = [
      { id: 1, product: "Apple", quantity: 2, price: 20 },
      { id: 2, product: "Carrots", quantity: 1, price: 50 },
      {
        id: 3,
        product: "Salmon",
        quantity: 3,
        price: 10,
      },
      { id: 4, product: "Potato", quantity: 4, price: 2 },
      { id: 5, product: "Salmon", quantity: 1, price: 10 },
    ];
    this.orders = [
      {
        id: 1,
        orderId: 123,
        orderItems: [{ ...this.orderItems[0] }],
        total: 40, // 2 * 20
        status: OrderStatus.Processing,
        created: "2024-08-02T20:40:41.798Z",
        updated: "2024-08-02T20:40:41.798Z",
      },
      {
        id: 2,
        orderId: 456,
        orderItems: [{ ...this.orderItems[1] }, { ...this.orderItems[2] }],
        total: 80, // (50 * 1) + (10 * 3)
        status: OrderStatus.Confirmed,
        created: "2024-08-04T20:40:41.798Z",
        updated: "2024-08-04T20:40:41.798Z",
      },
      {
        id: 3,
        orderId: 789,
        orderItems: [{ ...this.orderItems[3] }],
        total: 8, // 4 * 2
        status: OrderStatus.Completed,
        created: "2024-08-01T20:40:41.798Z",
        updated: "2024-08-01T20:40:41.798Z",
      },
      {
        id: 4,
        orderId: 101,
        orderItems: [{ ...this.orderItems[4] }],
        total: 10, // 1 * 10
        status: OrderStatus.Cancelled,
        created: "2024-08-03T20:40:41.798Z",
        updated: "2024-08-03T20:40:41.798Z",
      },
    ];
  }

  getOrders(): GetOrdersResponse {
    return { orders: this.orders };
  }

  deleteOrder(orderId: string): Order {
    const orderIndex = this.orders.findIndex(
      (order) => order.id === Number(orderId)
    );

    if (orderIndex === -1) {
      console.log(`Could not find order to delete [orderId=${orderId}]`);
      return null;
    }

    console.log(`Deleting order [orderId=${this.orders[orderIndex].id}]`);
    const [deletedOrder] = this.orders.splice(orderIndex, 1);
    return deletedOrder;
  }

  removeOrderItem(orderId: string, orderItemId: number): Order {
    // note: in the real world, we could add a check here to prevent removing from a 'completed' order
    const order = this.orders.find((order) => order.id === Number(orderId));
    if (!order) {
      console.log(
        `Could not find order to remove item [orderId=${orderId}] [orderItemId=${orderItemId}]`
      );
      return null;
    }
    const orderItemIndex = order.orderItems.findIndex(
      (orderItem) => orderItem.id === orderItemId
    );
    if (orderItemIndex === -1) {
      console.log(
        `Could not find order item to remove [orderId=${orderId}] [orderItemId=${orderItemId}]`
      );
      return null;
    }
    // Alternatively, we could recalculate the total by iterating over the order items
    const amountToRemove =
      order.orderItems[orderItemIndex].price *
      order.orderItems[orderItemIndex].quantity;

    // Remove the order item from the order
    order.orderItems.splice(orderItemIndex, 1);
    // Subtract the total amount of the order item from the order total
    order.total -= amountToRemove;

    console.log(
      `Removed order item [orderItemId=${orderItemId}] [newTotal=${order.total}]`
    );

    // If the order has no items left, we can delete the order
    if (order.orderItems.length === 0) {
      console.log(
        `Order has no items left, deleting order [orderId=${orderId}]`
      );
      return this.deleteOrder(orderId);
    }
    return order;
  }
}
