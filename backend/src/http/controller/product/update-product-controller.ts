import { NotAllowedError } from "@/core/errors/Errors/not-allowed-error";
import { makeProductUpdateService } from "@/utils/factories/make-product-update-service";
import { Request, Response } from "express";
import { z } from "zod";

export async function UpdateProductController(req: Request, res: Response) {
  const updateProductParams = z.object({
    id: z.string(),
  })

  const updateProductBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.string(),
    stock: z.number(),
    userId: z.string(),
  })

  const { name, description, price, stock, userId } = updateProductBodySchema.parse(req.body)
  const { id } = updateProductParams.parse(req.params)

  try {
    const UpdateProductService = makeProductUpdateService()

    const result = await UpdateProductService.execute({
      product_id: id,
      name,
      description,
      price,
      stock,
      user_id: userId,
    })

    if (result.value instanceof NotAllowedError) {
      return res.status(403).send({ message: 'Erro' })
    }

    if (!result.value?.product) {
      return res.status(400).send({ message: 'Product not created!' })
    }

    return res.status(201).send(result.value.product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Dados inválidos', details: error.errors });
    }

    throw error
  }
}
