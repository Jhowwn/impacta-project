import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserService } from '../user/register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUserService(usersRepository)

  return registerUseCase
}
