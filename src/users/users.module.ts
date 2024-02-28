import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { PrismaService } from '@/lib/prisma.service'
import { UsersRepository } from './repositories/users.repository'
import { CheckAccountExistsMiddleware } from '@/middleware/check-id-exists'

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UsersRepository],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAccountExistsMiddleware)
      .forRoutes({ path: '*/:id', method: RequestMethod.ALL })
  }
}
