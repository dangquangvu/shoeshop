import { Controller, Get, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IPagination } from 'src/adapter/pagination/pagination.interface';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRoles } from '../auth/auth.interface';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { OrderService } from './order.service';

@ApiTags('order')
@Controller('order')
export class OrderController {
    constructor(
        private orderService: OrderService
    ) { }

    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get All Orders' })
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
        @Query() filters: any,
        @Pagination() pagination: IPagination,
    ): Promise<any> {
        return this.orderService.indexOrders(filters, pagination);
    }
}
