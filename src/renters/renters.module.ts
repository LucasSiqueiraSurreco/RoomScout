import { Module } from '@nestjs/common'
import { PrismaService } from '@/lib/prisma.service'
import { CreateRentersAccountController } from './controllers/create-renters.controller'

@Module({
  providers: [PrismaService],
  controllers: [CreateRentersAccountController],
})
export class RentersModule {}
