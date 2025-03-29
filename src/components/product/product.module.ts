import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/schemas/product.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductConsumer } from './ProductConsumer';

@Module({
  providers: [ProductService,ProductConsumer],
  controllers: [ProductController],
  imports:[
    JwtModule.register({
      secret: "orderManagement123",
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
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
      },
    ])
    
  ]
})
export class ProductModule {}
