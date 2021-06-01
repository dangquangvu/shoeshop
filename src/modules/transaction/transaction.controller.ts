import { Body, Controller, Get, HttpCode, HttpStatus, Injectable, Param, Post, Put, Query, UseGuards, Delete } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IPagination } from 'src/adapter/pagination/pagination.interface';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Transaction } from 'src/shared/interfaces/db.interface';
import { UserRoles } from '../auth/auth.interface';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateTxDto, TxDto, UpdateTxDto } from './transaction.dto';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
    constructor(
        private transactionService: TransactionService
    ) { }

    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get All Txs' })
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
        @Query() filters: TxDto,
        @Pagination() pagination: IPagination,
    ): Promise<any> {
        return this.transactionService.indexTxs(filters, pagination);
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create transaction' })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Roles(...[UserRoles.ADMIN])
    createTx(@Body() createTx: CreateTxDto): Promise<Transaction> {
        return this.transactionService.createTx(createTx)
    }

    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'update transaction' })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Roles(...[UserRoles.ADMIN])
    updateTx(@Param('id') id: string, @Body() updateTx: UpdateTxDto): Promise<Transaction> {
        return this.transactionService.updateTx(id, updateTx)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'update transaction' })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Roles(...[UserRoles.ADMIN])
    deleteTx(@Param('id') id: string): Promise<Transaction> {
        return this.transactionService.deleteTx(id)
    }

}
