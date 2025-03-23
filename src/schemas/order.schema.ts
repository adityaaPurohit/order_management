import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop([
    {
      productId: { type: Types.ObjectId },
      quantity: { type: Number },
    },
  ])
  products: { productId: Types.ObjectId; quantity: number };

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.index({createdAt : -1})
