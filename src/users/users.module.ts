import { Module } from '@nestjs/common'
import { CreateUsersAccountController } from './controllers/create-users-account.controller'
import { PrismaService } from '@/lib/prisma.service'
import { AuthenticateUserController } from './controllers/authenticate-user.controller'
import { AuthModule } from '@/auth/auth.module'

@Module({
  providers: [PrismaService, AuthModule],
  controllers: [CreateUsersAccountController, AuthenticateUserController],
})
export class UsersModule {}
