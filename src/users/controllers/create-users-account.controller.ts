import { PrismaService } from '@/lib/prisma.service'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipes'
import {
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { hash } from 'bcryptjs'
import { z } from 'zod'

const createUserAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  balance: z.number().positive().optional(),
  role: z.enum(['user', 'renter']),
})

type CreateUserAccountBodySchema = z.infer<typeof createUserAccountBodySchema>

@Controller('/users')
export class CreateUsersAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserAccountBodySchema))
  async createUser(@Body() body: CreateUserAccountBodySchema) {
    const { name, email, password, balance = 0, role } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException('User with same e-mail already exists')
    }

    const hashedPassword = await hash(password, 8)

    if (!['user', 'renter'].includes(role)) {
      throw new ConflictException('Invalid user role')
    }

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        balance,
        role,
      },
    })
  }
}
