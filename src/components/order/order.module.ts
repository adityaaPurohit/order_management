import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from 'src/schemas/order.schema';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports:[
    JwtModule.register({
      secret: "orderManagement123",
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
  ]
})
export class OrderModule {}
