import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserService } from '../../service/user/register'

export function makeRegisterService() {
  const usersRepository = new PrismaUsersRepository()
  const registerUserService = new RegisterUserService(usersRepository)

  return registerUserService
}
