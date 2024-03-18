import { Either, left, right } from "@/core/either";
import { env } from "@/env";
import { InvalidCredentialsError } from "@/utils/errors/Invalid-credentials-error";
import { compare } from 'bcryptjs';
import jwt from "jsonwebtoken";
import { UsersRepository } from "../../repositories/users-repository";

interface AuthenticateUserServiceRequest {
  email: string;
  password: string;
}

type AuthenticateUserServiceResponse = Either<
  InvalidCredentialsError, {
    accessToken: string;
  }
>

export class AuthenticateUserService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    email,
    password
  }: AuthenticateUserServiceRequest): Promise<AuthenticateUserServiceResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new InvalidCredentialsError())
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      return left(new InvalidCredentialsError())
    }
    
    const accessToken = jwt.sign(
      {sub: {
        userId: user.id,
      }},
      env.JWT_SECRET,
      { expiresIn: '2h',}
    )

    return right({
      accessToken,
    })
  }
}
