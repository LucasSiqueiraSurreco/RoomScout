import { Injectable, ConflictException } from '@nestjs/common'
import { PrismaService } from '@/lib/prisma.service'
import { hash } from 'bcryptjs'
import { z } from 'zod'

export const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  balance: z.number().positive().optional(),
  role: z.string(),
})

export type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Injectable()
export class CreateAccountsService {
  constructor(private prisma: PrismaService) {}

  async createUser(body: CreateAccountBodySchema) {
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

    if (!['user', 'renter'].includes(role.toLowerCase())) {
      throw new ConflictException('Invalid user role')
    }

    return this.prisma.user.create({
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
