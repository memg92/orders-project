import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as dotenv from "dotenv";
import { ApiModule } from "./api.module";

async function bootstrap() {
  // Load environment variables
  dotenv.config();

  const app = await NestFactory.create(ApiModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  const PORT = 3001;
  await app.listen(PORT);
  console.log(`Application is running on port: ${PORT}`);
}

bootstrap();
