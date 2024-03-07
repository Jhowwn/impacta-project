import { Prisma, Product } from '@prisma/client';

export abstract class ProductsRepository {
  abstract findById(id: string): Promise<Product | null>
  abstract findByName(name: string): Promise<Product | null>
  abstract create(product: Prisma.ProductUncheckedCreateInput): Promise<Product>
} 
