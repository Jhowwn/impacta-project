import { NotAllowedError } from "@/core/errors/Errors/not-allowed-error";
import { makeProductDeleteService } from "@/utils/factories/make-product-delete-service";
import { Request, Response } from "express";
import { z } from "zod";

export async function DeleteProductController(req: Request, res: Response) {
  const deleteProductParams = z.object({
    id: z.string(),
  })

  const { id } = deleteProductParams.parse(req.params)

  try {
    const deleteProductService = makeProductDeleteService()

    const result = await deleteProductService.execute({
      product_id: id,
    })

    if (result.value instanceof NotAllowedError) {
      return res.status(403).send({ message: 'Erro' })
    }

    return res.status(200).send({message: 'Product delete'});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Dados inválidos', details: error.errors });
    }

    throw error
  }
}
