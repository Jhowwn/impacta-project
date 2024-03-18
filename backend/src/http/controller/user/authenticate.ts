import { InvalidCredentialsError } from "@/utils/errors/Invalid-credentials-error";
import { makeAuthenticateService } from "@/utils/factories/make-authenticate-service";
import { Request, Response } from "express";
import { z } from "zod";

export async function AuthenticateController(req: Request, res: Response) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  const authenticateUserService = makeAuthenticateService()

  const result = await authenticateUserService.execute({
    email,
    password
  })

  if (result.value instanceof InvalidCredentialsError) {
    return res.status(409).send({ message: new InvalidCredentialsError().message })
  }

  const { accessToken } = result.value

  return res.cookie("token", accessToken, {
    path: "/",
    secure: true,
    sameSite: true,
    httpOnly: true,
  }).status(200).send({
    token: accessToken, 
  })
}
