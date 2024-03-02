import { InvalidCredentialsError } from "@/utils/errors/Invalid-credentials-error";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUserService } from "./authenticate";

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUserService

describe('Authenticate Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserService(usersRepository)
  })

  it('Should be able to authenticate user', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6)
    })

    const result = await sut.execute({
      email: 'johndoe@gmail.com',
      password: '123456'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should not be able to authenticate with wrong email', async () => {
    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toEqual(new InvalidCredentialsError())
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123123',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toEqual(new InvalidCredentialsError())
  })
})
