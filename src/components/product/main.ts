import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'product',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'product-consumer',
      },
    },
  });

  await app.startAllMicroservices();
  const port = process.env.PRODUCT_PORT || 3002;
  await app.listen(port);
  console.log(`🚀 Product service running on http://localhost:${port}`);
}
bootstrap();
