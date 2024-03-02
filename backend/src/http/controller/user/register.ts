import { UserAlreadyExistsError } from "@/utils/errors/user-already-exists-error";
import { makeRegisterService } from "@/utils/factories/make-register-service";
import { Request, Response } from "express";
import { z } from "zod";

export async function CreateAccountController(req: Request, res: Response) {
  const createAccountBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = createAccountBodySchema.parse(req.body);

  try {
    const registerUserService = makeRegisterService()

    const result = await registerUserService.execute({
      name,
      email,
      password
    })

    if (result.value instanceof UserAlreadyExistsError ) {
      return res.status(409).send({ message: new UserAlreadyExistsError().message })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Dados inválidos', details: error.errors });
    }

    throw error
  }

  return res.status(201).send()
}

