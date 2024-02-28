import { PrismaService } from '@/lib/prisma.service'
import { Injectable } from '@nestjs/common'
import { z } from 'zod'

export const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  newPassword: z.string().optional(),
  balance: z.number().positive().optional(),
  role: z.string(),
})

export type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(body: CreateAccountBodySchema) {
    return this.prisma.user.create({
      data: body,
    })
  }

  async findAll() {
    return this.prisma.user.findMany()
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    })
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    })
  }

  async update(id: string, data: Partial<CreateAccountBodySchema>) {
    return this.prisma.user.update({
      where: { id },
      data,
    })
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    })
  }
}
