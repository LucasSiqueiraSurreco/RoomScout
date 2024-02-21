import { PrismaService } from '@/lib/prisma.service'
import { Controller, Get, Param } from '@nestjs/common'

@Controller('/accounts')
export class GetAccountsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getAllAccounts() {
    return this.prisma.user.findMany()
  }

  @Get(':id')
  async getAccountById(@Param('id') id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }
}
