import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiService } from "./api.service";
import { GetOrdersDto, RemoveOrderItemDto } from "./api.dto";
import { Order } from "./api.interface";

@Controller("/orders")
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  getOrders(): GetOrdersDto {
    return this.apiService.getOrders();
  }

  @Post(":id/remove-item")
  removeOrderItem(
    @Param() param: { id: string },
    @Body() body: RemoveOrderItemDto
  ): Order {
    const { orderItemId } = body;
    const { id } = param;
    return this.apiService.removeOrderItem(id, orderItemId);
  }

  @Delete(":id")
  deleteOrder(@Param() param: { id: string }): Order {
    const { id } = param;
    return this.apiService.deleteOrder(id);
  }
}
