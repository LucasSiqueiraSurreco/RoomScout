import { Body, Controller, Post, UsePipes } from '@nestjs/common'

import { ZodValidationPipe } from '@/pipes/zod-validation-pipes'
import {
  CreateAccountBodySchema,
  CreateAccountsService,
  createAccountBodySchema,
} from './create-accounts.service'

@Controller('/accounts')
export class CreateUsersAccountController {
  constructor(private accountService: CreateAccountsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async createUser(@Body() body: CreateAccountBodySchema) {
    return this.accountService.createUser(body)
  }
}
