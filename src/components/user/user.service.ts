import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async register(payload) {
    try {
      let isExist = await this.userModel.findOne({ email: payload.email });
      if (isExist) throw new Error('Email already registered');
      let encryptPassowrd = await bcrypt.hash(payload.password, 10);
      payload.password = encryptPassowrd;
      let saveUser = await this.userModel.create(payload);
      return { message: 'User registered successfully', data: saveUser };
    } catch (error) {
      throw error;
    }
  }

  async login(payload) {
    try {
      let isExist = await this.userModel.findOne({ email: payload.email });
      if (!isExist)
        throw new Error(
          'Email not registered! Please try with registered email!!',
        );
      let checkPassword = await bcrypt.compare(
        payload.password,
        isExist.password,
      );
      if (!checkPassword)
        throw new Error(
          'Email or Password are invalid! Please try with correct Credentials!!',
        );

      let createJWT = this.jwtService.sign(JSON.parse(JSON.stringify(isExist)));
      return {
        message: 'User logged in successfully',
        data: isExist,
        token: createJWT,
      };
    } catch (error) {
      throw error;
    }
  }

  async profile(payload) {
    try {
      let isExist = await this.userModel.findOne({ email: payload.email });
      if (!isExist) throw new Error('Can not find User!!');
      return {
        message: 'User fatched in successfully',
        data: isExist,
      };
    } catch (error) {
      throw error;
    }
  }
}
