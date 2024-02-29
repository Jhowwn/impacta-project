import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUserService } from "./register";

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserService

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserService(usersRepository)
  })

  it('Should be able to register', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    })
    expect(result.isRight()).toBe(true)
    expect(usersRepository.items[0].id).toEqual(expect.any(String))
  })
})
