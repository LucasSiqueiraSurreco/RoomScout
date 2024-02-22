// Importe as definições de tipos do Express
import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { PrismaService } from '@/lib/prisma.service'

@Injectable()
export class CheckAccountExistsMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accountId = req.params.id
    const account = await this.prisma.user.findUnique({
      where: { id: accountId },
    })

    if (!account) {
      throw new NotFoundException(`Account with ID ${accountId} not found`)
    }

    next()
  }
}
