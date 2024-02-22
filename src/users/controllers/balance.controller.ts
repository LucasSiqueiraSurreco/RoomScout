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

  @Post('/add/:id')
  async addBalance(@Param('id') id: string, @Body() body: BalanceBodySchema) {
    const updateBalance = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        balance: {
          increment: body.balance,
        },
      },
    })

    return updateBalance
  }

  @Post('withdraw/:id')
  async withdraw(@Param('id') id: string, @Body() body: BalanceBodySchema) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    // user: 2% | renter: 5%
    const discountPercentage = user?.role === 'user' ? 0.02 : 0.05
    const withdrawAmount = body.balance * (1 + discountPercentage)
    const roundedWithdrawAmount = parseFloat(withdrawAmount.toFixed(2))

    const updateUser = await this.prisma.user.update({
      where: { id },
      data: {
        balance: {
          decrement: roundedWithdrawAmount,
        },
      },
    })

    return updateUser
  }
}
