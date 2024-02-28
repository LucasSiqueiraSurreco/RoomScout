import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UsePipes,
  Delete,
} from '@nestjs/common'
import { UsersService } from './users.service'
import {
  CreateAccountBodySchema,
  createAccountBodySchema,
} from './repositories/users.repository'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipes'

@Controller('accounts')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  create(@Body() body: CreateAccountBodySchema) {
    return this.usersService.create(body)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Patch('password/:id')
  async updatePassword(
    @Param('id') id: string,
    @Body('newPassword') newPassword: string,
    @Body('currentPassword') currentPassword: string,
  ) {
    return this.usersService.updatePassword(id, newPassword, currentPassword)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
