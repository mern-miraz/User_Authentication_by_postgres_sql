import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ description: 'Product Name', example: 'Product A' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'Product description',
    example: 'Description of Product A',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'Product price', example: 100 })
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty({ description: 'Product stock', example: 50 })
  @IsNumber()
  @IsOptional()
  stock: number;
}
