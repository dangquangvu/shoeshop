import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IPagination } from 'src/adapter/pagination/pagination.interface';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Product } from 'src/shared/interfaces/db.interface';
import { UserRoles } from '../auth/auth.interface';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateProductDto, ProductDto, UpdateProductDto } from './product.dto';
import { ProductService } from './product.service';
@ApiTags('product')
@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService
    ) { }

    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get All Products' })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Roles(...[UserRoles.ADMIN])
    @ApiQuery({
        name: 'page',
        required: false,
        description: 'Page number',
        type: Number,
    })
    @ApiQuery({
        name: 'perPage',
        required: false,
        description: 'Items per page',
        type: Number,
    })
    async indexProfileUser(
        @Query() filters: ProductDto,
        @Pagination() pagination: IPagination,
    ): Promise<any> {
        return this.productService.indexProducts(filters, pagination);
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create Product' })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Roles(...[UserRoles.ADMIN])
    createProduct(@Body() createProductDto: CreateProductDto): Promise<any> {
        return this.productService.createProduct(createProductDto)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update Product' })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Roles(...[UserRoles.ADMIN])
    updateProduct(
        @Body() updateProductDto: UpdateProductDto,
        @Param('id') id: string,
    ): Promise<Product> {
        return this.productService.updateProduct(id, updateProductDto)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete Product' })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Roles(...[UserRoles.ADMIN])
    deleteProduct(
        @Param('id') id: string,
    ): Promise<Product> {
        return this.productService.deleteProduct(id)
    }
}
