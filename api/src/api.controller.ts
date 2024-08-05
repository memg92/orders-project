import { Controller, Get } from "@nestjs/common";
import { ApiService } from "./api.service";

@Controller("/orders")
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  getOrders(): any[] {
    return this.apiService.getOrders();
  }
}
