import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { CreateUsersAccountController } from './controllers/create-account.controller'
import { PrismaService } from '@/lib/prisma.service'
import { AuthenticateAccountController } from './controllers/authenticate-account.controller'
import { AuthModule } from '@/auth/auth.module'
import { BalanceController } from './controllers/balance.controller'
import { GetAccountsController } from './controllers/get-accounts.controller'
import { CreateAccountsService } from './controllers/create-accounts.service'
import { CheckAccountExistsMiddleware } from '@/middleware/check-id-exists'
import { BalanceService } from './controllers/balance.service'

@Module({
  imports: [AuthModule],
  providers: [PrismaService, CreateAccountsService, BalanceService],
  controllers: [
    CreateUsersAccountController,
    AuthenticateAccountController,
    BalanceController,
    GetAccountsController,
  ],
})
export class AccountsModule {
  configure(consumer: MiddlewareConsumer) {
    // Aplicando middleware antes das rotas nos controladores
    consumer
      .apply(CheckAccountExistsMiddleware)
      .forRoutes({ path: '*/:id', method: RequestMethod.ALL })
  }
}
