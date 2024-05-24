import { PrismaProductAttachmentsRepository } from '@/repositories/prisma/prisma-product-attachment-repository'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-product-repository'
import { DeleteProductService } from '@/service/product/delete-product-service'

export function makeProductDeleteService() {
  const productsRepository = new PrismaProductsRepository()
  const productAttachmentsRepository = new PrismaProductAttachmentsRepository()
  const deleteProductService = new DeleteProductService(productsRepository, productAttachmentsRepository)

  return deleteProductService
}
