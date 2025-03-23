import {
  IsNotEmpty,
  IsNumber,
  Min,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OrdersDto {
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: string;
}

export class CreateOrdersDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrdersDto)
  products: OrdersDto[];
}
