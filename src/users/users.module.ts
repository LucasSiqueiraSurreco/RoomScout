import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { PrismaService } from '@/lib/prisma.service'
import { UsersRepository } from './repositories/users.repository'
import { CheckAccountExistsMiddleware } from '@/middleware/check-id-exists'
import { AuthenticateAccountController } from './authenticate-account.controller'
import { AuthenticateAccountService } from './authenticate-account.service'

@Module({
  controllers: [UsersController, AuthenticateAccountController],
  providers: [
    UsersService,
    PrismaService,
    UsersRepository,
    AuthenticateAccountService,
  ],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAccountExistsMiddleware)
      .forRoutes({ path: '*/:id', method: RequestMethod.ALL })
  }
}
