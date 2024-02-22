import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { PrismaService } from '@/lib/prisma.service'
import { BalanceBodySchema, BalanceService } from './balance.service'

@Controller('/balance')
@UseGuards(JwtAuthGuard)
export class BalanceController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly balanceService: BalanceService,
  ) {}

  @Post('/add/:id')
  async addBalance(@Param('id') id: string, @Body() body: BalanceBodySchema) {
    const { balance } = body
    return this.balanceService.addBalance(id, balance)
  }

  @Post('withdraw/:id')
  async withdraw(@Param('id') id: string, @Body() body: BalanceBodySchema) {
    return this.balanceService.withdraw(id, body)
  }
}
