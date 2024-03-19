import { makeListProductBySellerService } from "@/utils/factories/make-product-list-by-seller-service";
import { Request, Response } from "express";
import { z } from "zod";

export async function FetchProductsBySellerController(req: Request, res: Response) {
  const createProductBodySchema = z.object({
    userId: z.string(),
  })

  const pageSchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = pageSchema.parse(req.query)

  const { userId } = createProductBodySchema.parse(req.body)

  try {
    const listProductBySellerService = makeListProductBySellerService()

    const result = await listProductBySellerService.execute({
      userId,
      page
    })

    if (result instanceof Error) {
      return res.status(409).send({ message: 'Erro' })
    }

    if (!result.products) {
      return res.status(404).send({ message: 'Product not found!' })
    }

    return res.status(201).send(result.products);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Dados inválidos', details: error.errors });
    }

    throw error
  }
}
