import { PrismaService } from '@/lib/prisma.service'
import { Controller, UseGuards } from '@nestjs/common'

@Controller('/balance')
export class BalanceController {
  constructor(private: PrismaService) {

    @Post()
    @UseGuards()
  }
}
