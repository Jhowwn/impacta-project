import { PrismaProductsRepository } from '@/repositories/prisma/prisma-product-repository'
import { CreateProductService } from '@/service/product/create-product-service'

export function makeProductService() {
  const productsRepository = new PrismaProductsRepository()
  const createProductService = new CreateProductService(productsRepository)

  return createProductService
}
