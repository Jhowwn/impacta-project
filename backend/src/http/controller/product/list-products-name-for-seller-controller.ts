import { ProductNotFoundError } from "@/core/errors/Errors/not-product-found";
import { PrismaProductsRepository } from "@/repositories/prisma/prisma-product-repository";
import { GetProductByNameForSellerService } from "@/service/product/get-product-by-name-for-seller";
import { Request, Response } from "express";
import { z } from "zod";

export async function ListProductsByNameSellerController(req: Request, res: Response) {
  const pageSchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const listProductBodySchema = z.object({
    userId: z.string(),
  })

  const listProductParamsSchema = z.object({
    name: z.string()
  })

  

  const { page } = pageSchema.parse(req.query)
  const { name } = listProductParamsSchema.parse(req.params)
  const { userId } = listProductBodySchema.parse(req.body)

  try {
    const productsRepository = new PrismaProductsRepository()
    const getProductService = new GetProductByNameForSellerService(productsRepository)

    const result = await getProductService.execute({ user_id: userId, name, page})

    if (result.products instanceof ProductNotFoundError) {
      return res.status(404).send({ message: 'Product not found' })
    }

    return res.status(200).send(result.products);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Dados inválidos', details: error.errors });
    }

    throw error
  }
}