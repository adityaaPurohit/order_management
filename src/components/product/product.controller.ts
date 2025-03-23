import {
  Controller,
  UseGuards,
  Get,
  Res,
  Req,
  HttpStatus,
  UnprocessableEntityException,
  Post,
  Body,
  Param,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guard/auth.guard';
import { ProductService } from './product.service';
import { RolesGuard } from 'src/guard/role.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { CreateProductDto } from './product.dto/create-product.dto';
import { UpdateProductDto } from './product.dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('products')
  async createProduct(
    @Res() res: any,
    @Body() body: CreateProductDto,
  ): Promise<any> {
    return await this.productService
      .createProduct(body)
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
  @Put('products/:id')
  async updateProduct(
    @Res() res: any,
    @Param() id: string,
    @Body() body: UpdateProductDto,
  ): Promise<any> {
    return await this.productService
      .updateProduct(id,body)
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
  @Get('products')
  async getProducts(
    @Res() res: any,
  ): Promise<any> {
    return await this.productService
      .getProducts()
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
  @Get('products/:id')
  async getProduct(
    @Res() res: any,
    @Param() id: string,
  ): Promise<any> {
    return await this.productService
      .getProduct(id)
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
