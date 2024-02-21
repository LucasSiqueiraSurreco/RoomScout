import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { PrismaService } from '@/lib/prisma.service'
import { z } from 'zod'

const balanceBodySchema = z.object({
  balance: z.number(),
})

type BalanceBodySchema = z.infer<typeof balanceBodySchema>

@Controller('/balance')
@UseGuards(JwtAuthGuard)
export class BalanceController {
  constructor(private prisma: PrismaService) {}

  @Post(':id')
  async addBalance(
    @Param('id') userId: string,
    @Body() body: BalanceBodySchema,
  ) {
    const updateBalance = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        balance: {
          increment: body.balance,
        },
      },
    })

    return updateBalance
  }
}
