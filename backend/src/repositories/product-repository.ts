import { Prisma, Product } from '@prisma/client';

export interface IProducts {
  products: Product[]
  totalPages: number
}
export abstract class ProductsRepository {
  abstract findById(id: string): Promise<Product | null>
  abstract findByUserId(userId: string, page: number): Promise<IProducts | null>
  abstract findByName(name: string): Promise<Product[] | null>
  abstract findByNameForSeller(name: string, id: string, page: number): Promise<IProducts | null>
  abstract create(product: Prisma.ProductUncheckedCreateInput): Promise<Product>
  abstract update(product: Product): Promise<Product>
  abstract delete(productId: string): Promise<void>
} 
