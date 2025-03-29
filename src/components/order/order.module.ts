import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from 'src/schemas/order.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    JwtModule.register({
      secret: 'orderManagement123',
      signOptions: { expiresIn: '1h' },
    }),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'order',
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),

    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
  ],
})
export class OrderModule {}
