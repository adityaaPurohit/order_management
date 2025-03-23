import { Module, Inject } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './components/user/user.module';
import { ProductModule } from './components/product/product.module';
import { OrderModule } from './components/order/order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ProductModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
