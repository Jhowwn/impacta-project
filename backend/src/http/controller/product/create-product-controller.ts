import { makeProductService } from "@/utils/factories/make-product-service";
import { Request, Response } from "express";
import { z } from "zod";

export async function CreateProductController(req: Request, res: Response) {
  const createProductBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.string(),
    stock: z.number(),
    userId: z.string(),
  })

  const { name, description, price, stock, userId } = createProductBodySchema.parse(req.body)

  try {
  const CreateProductService = makeProductService()

  const result = await CreateProductService.execute({
    name,
    description,
    price,
    stock,
    user_id: userId,
  })

    if (result.value instanceof Error) {
      return res.status(409).send({ message: 'Erro' })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Dados inválidos', details: error.errors });
    }

    throw error
  }

  return res.status(201).send()
}


