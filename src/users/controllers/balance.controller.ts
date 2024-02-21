import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { Controller, Post, UseGuards } from '@nestjs/common'

@Controller('/balance')
@UseGuards(JwtAuthGuard)
export class BalanceController {
  constructor() {}

  @Post(':id')
  async addBalance() {
    return 'addedd'
  }
}
