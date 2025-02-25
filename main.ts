import { NestFactory } from "@nestjs/core";
import { AppModule } from "./src/app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Converts plain JSON into DTO
      whitelist: true, // Removes extra properties
      forbidNonWhitelisted: true, // Throws error for unknown properties
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  await app.listen(3001, () => {
    console.log(`server running at http://localhost:${3001}/`);
  });
}

bootstrap();
