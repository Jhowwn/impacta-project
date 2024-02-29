import { Either, left, right } from "@/core/either";
import { User } from "@prisma/client";
import { hash } from 'bcryptjs';
import { UsersRepository } from "../../repositories/users-repository";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

interface RegisterUserServiceRequest {
  name: string;
  email: string;
  password: string;
}

type RegisterUserServiceResponse = Either<
  UserAlreadyExistsError, {
    user: User;
  }
>

export class RegisterUserService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    name,
    email,
    password
  }: RegisterUserServiceRequest): Promise<RegisterUserServiceResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError())
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash
    });

    return right({
      user,
    })
  }
}
