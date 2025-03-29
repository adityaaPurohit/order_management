import { MessagePattern, Payload } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument } from 'src/schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductConsumer {
  constructor(
    @InjectModel('Product') private productModel: Model<ProductDocument>,
  ) {}

  @MessagePattern('order_created')
  async handleOrderCreated(@Payload() data: any) {
    for (const item of data.products) {
      await this.productModel.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    console.log('🟢 Stock updated from order_created event');
  }
}
