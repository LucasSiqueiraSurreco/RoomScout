import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { UsersRepository } from './repositories/users.repository'
import { CreateAccountBodySchema } from 'users.old/controllers/create-accounts.service'
import { compare, hash } from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(body: CreateAccountBodySchema) {
    const { name, email, password, balance = 0, role } = body

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new ConflictException('User with same e-mail already exists')
    }

    const hashedPassword = await hash(password, 8)

    if (!['user', 'renter'].includes(role.toLowerCase())) {
      throw new ConflictException('Invalid user role')
    }

    return this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      balance,
      role,
    })
  }

  findAll() {
    return this.usersRepository.findAll()
  }

  findOne(id: string) {
    return this.usersRepository.findOne(id)
  }

  async updatePassword(
    id: string,
    newPassword: string,
    currentPassword: string,
  ) {
    const user = await this.usersRepository.findOne(id)

    if (!user) {
      throw new UnauthorizedException('User credentials do not match')
    }

    const isPasswordValid = await compare(currentPassword, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials do not match')
    }

    const hashedNewPassword = await hash(newPassword, 8)

    return this.usersRepository.update(id, { password: hashedNewPassword })
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne(id)

    await this.usersRepository.remove(id)
    return { message: `${user?.name} (${user?.email}) has been deleted` }
  }
}
