import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from 'src/entity/product.entity';
import { JwtAuthGuard } from 'src/auth/jwt_auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product-dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new Product' })
  @ApiResponse({ status: 201, description: 'Product created Successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get('getAll')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all Product' })
  @ApiResponse({ status: 200, description: 'Product retrieved successful' })
  @ApiResponse({ status: 404, description: 'Product Not Found!' })
  async getAllProduct() {
    return this.productService.getAllProduct();
  }

  @Get('product/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get single product' })
  @ApiResponse({ status: 200, description: 'Product retrieved successful' })
  @ApiResponse({ status: 404, description: 'Product Not Found!' })
  async getSingleProduct(@Param('id') id: string) {
    return this.productService.getSingleProduct(id);
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product retrieved successful' })
  @ApiResponse({ status: 404, description: 'Product Not Found!' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(+id, updateProductDto);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Product deleted successful' })
  @ApiResponse({ status: 404, description: 'Product Not Found!' })
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(+id);
  }
}
