import { ResourceNotFoundError } from "@/utils/errors/resource-not-found-error";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileService } from "./get-user-profile";

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get User Profile Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileService(usersRepository)
  })

  it('Should be able to get user', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6)
    })

    const result = await sut.execute({
      userId: user.id
    })

    expect(result.user.id).toEqual(user.id)
    expect(result.user.name).toEqual('John Doe')
  })

  it('should not be able to get user with wrong id', async () => {
    await expect(() =>
    sut.execute({
      userId: 'not-existing-id',
    }),
  ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
