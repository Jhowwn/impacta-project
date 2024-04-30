import { PrismaProductsRepository } from '@/repositories/prisma/prisma-product-repository'
import { UpdateProductService } from '@/service/product/update-product-service'

export function makeProductUpdateService() {
  const productsRepository = new PrismaProductsRepository()
  const updateProductService = new UpdateProductService(productsRepository)

  return updateProductService
}
