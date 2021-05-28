import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IPagination } from 'src/adapter/pagination/pagination.interface';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRoles } from '../auth/auth.interface';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ProductDto } from './product.dto';
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
    createTx(@Body() createTxDto: any): Promise<any> {
        // return this.transactionService.createTx(createTxDto)
        return;
    }
}
