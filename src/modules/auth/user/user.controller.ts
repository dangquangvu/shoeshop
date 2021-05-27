import {InputUpdateUserDto} from './user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiPropertyOptional, ApiQuery, ApiTags} from '@nestjs/swagger';
import {Roles} from 'src/shared/decorators/roles.decorator';
import {UserRoles} from '../auth.interface';
import {JwtAuthGuard} from '../guard/jwt-auth.guard';
import {UserService} from './user.service';
import {Request, Response} from 'express';
import {Pagination} from '../../../shared/decorators/pagination.decorator';
import {IPagination} from 'src/adapter/pagination/pagination.interface';
import {IsNumberString, IsOptional} from 'class-validator';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Get All User'})
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
  indexProfileUser(@Pagination() pagination: IPagination): Promise<any> {
    return this.userService.indexUser(pagination);
  }

  @Get(':id/details')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Get User details'})
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles(...[UserRoles.ADMIN, UserRoles.SHIPPER])
  indexUserDetails(@Param('id') id: string, @Req() request: Request): Promise<any> {
    const authHeader = request.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];
    return this.userService.indexUserDetails(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({summary: 'Edit profile user'})
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles(...[UserRoles.ADMIN, UserRoles.SHIPPER])
  updateProfileUser(
    @Body() inputUpdateUserDto: InputUpdateUserDto,
    @Param('id') id: string,
    @Req() request: Request,
  ): Promise<any> {
    const authHeader = request.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];
    return this.userService.updateProfileUser(id, inputUpdateUserDto, accessToken);
  }

  @Put(':id/block')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'admin block user'})
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles(...[UserRoles.ADMIN])
  blockUser(@Param('id') id: string): Promise<any> {
    return this.userService.blockUser(id);
  }
}
