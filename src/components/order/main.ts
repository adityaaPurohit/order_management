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
        clientId: 'order',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'order-consumer',
      },
    },
  });

  await app.startAllMicroservices();
  const port = process.env.ORDER_PORT || 3003;
  await app.listen(port);
  console.log(`🚀 Order service running on http://localhost:${port}`);
}
bootstrap();
