import { Module } from '@nestjs/common'
import { CreateUsersAccountController } from './controllers/create-account.controller'
import { PrismaService } from '@/lib/prisma.service'
import { AuthenticateUserController } from './controllers/authenticate-user.controller'
import { AuthModule } from '@/auth/auth.module'
import { BalanceController } from './controllers/balance.controller'
import { GetAccountsController } from './controllers/get-accounts.controller'
import { CreateAccountsService } from './controllers/create-accounts.service'

@Module({
  imports: [AuthModule],
  providers: [PrismaService, CreateAccountsService],
  controllers: [
    CreateUsersAccountController,
    AuthenticateUserController,
    BalanceController,
    GetAccountsController,
  ],
})
export class UsersModule {}
