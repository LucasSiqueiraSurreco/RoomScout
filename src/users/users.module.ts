import { Module } from '@nestjs/common'
import { CreateUsersAccountController } from './controllers/create-users-account.controller'
import { PrismaService } from '@/lib/prisma.service'

@Module({
  providers: [PrismaService],
  controllers: [CreateUsersAccountController],
})
export class UsersModule {}
