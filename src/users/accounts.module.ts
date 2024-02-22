import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { CreateUsersAccountController } from './controllers/create-account.controller'
import { PrismaService } from '@/lib/prisma.service'
import { AuthenticateUserController } from './controllers/authenticate-user.controller'
import { AuthModule } from '@/auth/auth.module'
import { BalanceController } from './controllers/balance.controller'
import { GetAccountsController } from './controllers/get-accounts.controller'
import { CreateAccountsService } from './controllers/create-accounts.service'
import { CheckAccountExistsMiddleware } from '@/middleware/check-id-exists'

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
export class AccountsModule {
  configure(consumer: MiddlewareConsumer) {
    // Aplicando middleware antes das rotas nos controladores
    consumer
      .apply(CheckAccountExistsMiddleware)
      .forRoutes({ path: '*/:id', method: RequestMethod.ALL })
  }
}
