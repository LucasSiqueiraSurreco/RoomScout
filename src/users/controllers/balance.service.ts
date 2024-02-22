import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '@/lib/prisma.service'
import { z } from 'zod'

const balanceBodySchema = z.object({
  balance: z.number(),
})

export type BalanceBodySchema = z.infer<typeof balanceBodySchema>

@Injectable()
export class BalanceService {
  constructor(private prisma: PrismaService) {}

  async addBalance(id: string, amount: number) {
    return this.prisma.user.update({
      where: { id },
      data: { balance: { increment: amount } },
    })
  }

  async withdraw(id: string, body: BalanceBodySchema) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (user?.role !== 'user' && user?.role !== 'renter') {
      throw new BadRequestException('Invalid role')
    }

    const discountPercentage = user?.role === 'user' ? 0.02 : 0.05 // 2% & 5%

    const withdrawAmount = body.balance * (1 + discountPercentage)

    if (
      withdrawAmount < 0 ||
      (user.balance && user.balance - withdrawAmount < 0)
    ) {
      throw new BadRequestException(
        `Withdrawal amount: ${withdrawAmount}, exceeds balance: ${user.balance}`,
      )
    }

    const updateUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        balance: {
          decrement: withdrawAmount,
        },
      },
    })

    return updateUser
  }
}
