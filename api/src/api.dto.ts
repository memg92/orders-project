import { IsNotEmpty, IsNumber } from "class-validator";
import { Order } from "./api.interface";

export class GetOrdersResponse {
  orders: Order[];
}

export class RemoveOrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  orderItemId: number;
}
