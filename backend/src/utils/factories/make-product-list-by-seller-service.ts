import { PrismaProductsRepository } from '@/repositories/prisma/prisma-product-repository'
import { ListProductsBySellerService } from '@/service/product/list-product-by-seller-service'

export function makeListProductBySellerService() {
  const productsRepository = new PrismaProductsRepository()
  const listProductBySellerService = new ListProductsBySellerService(productsRepository)

  return listProductBySellerService
}
