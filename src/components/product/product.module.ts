import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/schemas/product.schema';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports:[
    JwtModule.register({
      secret: "orderManagement123",
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),

  ]
})
export class ProductModule {}
