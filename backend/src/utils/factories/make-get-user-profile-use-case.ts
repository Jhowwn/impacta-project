import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileService } from '@/service/user/get-user-profile'

export function makeGetUserProfileUseService() {
  const usersRepository = new PrismaUsersRepository()
  const userService = new GetUserProfileService(usersRepository)

  return userService
}
