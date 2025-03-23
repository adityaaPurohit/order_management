import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  HttpStatus,
  UnprocessableEntityException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guard/auth.guard';
import { RegisterDto } from './user.dto/register.dto';
import { LoginDto } from './user.dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async registerUser(@Res() res: any, @Body() body: RegisterDto): Promise<any> {
    return await this.userService
      .register(body)
      .then(async response => {
        return res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          data: response,
        });
      })
      .catch((error: any) => {
        throw new UnprocessableEntityException(error.message);
      });
  }

  @Post('login')
  async loginUser(@Res() res: any, @Body() body: LoginDto): Promise<any> {
    return await this.userService
      .login(body)
      .then(async response => {
        return res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          data: response,
        });
      })
      .catch((error: any) => {
        throw new UnprocessableEntityException(error.message);
      });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUser(@Res() res: any, @Req() req: any): Promise<any> {
    return await this.userService
      .profile(req.user)
      .then(async response => {
        return res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          data: response,
        });
      })
      .catch((error: any) => {
        throw new UnprocessableEntityException(error.message);
      });
  }
}
