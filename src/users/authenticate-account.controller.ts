import { ZodValidationPipe } from '@/pipes/zod-validation-pipes'
import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { AuthenticateAccountService } from './authenticate-account.service'

const authenticateAccountBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateAccountBodySchema = z.infer<
  typeof authenticateAccountBodySchema
>

@Controller('/sessions')
export class AuthenticateAccountController {
  constructor(private authService: AuthenticateAccountService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateAccountBodySchema))
  async authenticateRenter(@Body() body: AuthenticateAccountBodySchema) {
    const { email, password } = body

    return this.authService.authenticate(email, password)
  }
}
