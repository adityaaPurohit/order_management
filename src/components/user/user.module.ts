import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: "orderManagement123",
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class UserModule {}
