import { Controller, Post, UseGuards, Res, Body, HttpStatus, UnprocessableEntityException, Req, Put, Param, Get } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorators';
import { JwtAuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/role.guard';
import { CreateOrdersDto } from './order.dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService){}
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('customer')
    @Post('orders')
    async createOrder(
      @Res() res: any,
      @Body() body: CreateOrdersDto,
      @Req() req:any
    ): Promise<any> {
      return await this.orderService
        .createOrder(body,req.user)
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

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Put('orders/:id/status')
    async updateStatus(
      @Res() res: any,
      @Param() id: string,
      @Body() body: any,
    ): Promise<any> {
      return await this.orderService
        .updateStatus(id,body)
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
    @Get('orders')
    async getOrders(
      @Req() req: any,
      @Res() res: any,
    ): Promise<any> {
      return await this.orderService
        .getOrders(req.user)
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
