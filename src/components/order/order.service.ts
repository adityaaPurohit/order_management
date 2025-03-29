import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { OrderDocument } from 'src/schemas/order.schema';
import { Model, Connection } from 'mongoose';
import { ObjectId } from 'bson';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class OrderService implements OnModuleInit  {
  constructor(
    @InjectModel('Order') private orderModel: Model<OrderDocument>,
    @InjectConnection() private readonly connection: Connection,
    @Inject('KAFKA_SERVICE') private kafkaClient: ClientKafka

  ) {}

  async onModuleInit() {
    this.kafkaClient.connect(); // ensure connection
  }
  async createOrder(payload, user) {
    try {
      const productConnection = this.connection.model('Product');
      let count = 0;
  
      for (const item of payload.products) {
        const product = await productConnection.findById(item.productId);
        if (!product) throw new Error('Can not find Product!!');
        if (product.stock < item.quantity) {
          throw new Error('Less stock');
        }
        count += product.price * item.quantity;
      }
  
      for (const item of payload.products) {
        await productConnection.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.quantity },
        });
      }
  
      const saveOrder = await this.orderModel.create({
        userId: user._id,
        products: payload.products,
        totalAmount: count,
      });
  
      // 🔥 Emit Kafka Event
      this.kafkaClient.emit('order_created', {
        orderId: saveOrder._id,
        products: payload.products,
      });
  
      return { message: 'Order Placed successfully', data: saveOrder };
    } catch (error) {
      throw error;
    }
  }
  

  async updateStatus(id, payload) {
    try {
      let updateStatus = await this.orderModel.findByIdAndUpdate(
        new ObjectId(id),
        payload,
        { new: true },
      );
      if (!updateStatus)
        throw new Error('Can not find order! Please try again!!');
      return { message: 'Status Updated Successfully', data: updateStatus };
    } catch (error) {
      throw error;
    }
  }

  async getOrders(user) {
    try {
      let orders;
      if (user.role == 'admin') {
        orders = await this.orderModel.aggregate([
          {
            $lookup: {
              from: 'products',
              localField: 'products.productId',
              foreignField: '_id',
              as: 'productDetails',
            },
          },
          {
            $project: {
              products: 0,
            },
          },
        ]);
      } else {
        orders = await this.orderModel.aggregate([
          {
            $match: {
              userId: user._id,
            },
          },
          {
            $lookup: {
              from: 'products',
              localField: 'products.productId',
              foreignField: '_id',
              as: 'productDetails',
            },
          },
          {
            $project: {
              products: 0,
            },
          },
        ]);
      }
      
      return { message: 'Orders fatched successfully', data: orders };
    } catch (error) {
      throw error;
    }
  }
}
