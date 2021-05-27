import { Body, Controller, Get, HttpCode, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IPagination } from 'src/adapter/pagination/pagination.interface';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Transaction } from 'src/shared/interfaces/db.interface';
import { UserRoles } from '../auth/auth.interface';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { createTxDto } from './transaction.dto';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
    constructor(
        private transactionService: TransactionService
    ) { }

    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get All User' })
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
        @Pagination() pagination: IPagination,
        @Body() createTx: createTxDto
    ): Promise<any> {
        return this.transactionService.indexTxs(createTx, pagination);
    }
}
