import { IsNotEmpty, IsNumber, Min } from 'class-validator';
export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;
}
