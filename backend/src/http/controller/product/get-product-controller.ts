import { ProductNotFoundError } from "@/core/errors/Errors/not-product-found";
import { PrismaProductsRepository } from "@/repositories/prisma/prisma-product-repository";
import { GetProductService } from "@/service/product/get-ptoduct-by-id-service";
import { Request, Response } from "express";
import { z } from "zod";

export async function GetProductController(req: Request, res: Response) {
  const updateProductParams = z.object({
    id: z.string(),
  })

  const { id } = updateProductParams.parse(req.params)

  try {
    const productsRepository = new PrismaProductsRepository()
    const getProductService = new GetProductService(productsRepository)

    const result = await getProductService.execute({ product_id: id })

    if (result.value instanceof ProductNotFoundError) {
      return res.status(404).send({ message: 'Product not found' })
    }

    return res.status(201).send(result.value.product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Dados inválidos', details: error.errors });
    }

    throw error
  }
}
