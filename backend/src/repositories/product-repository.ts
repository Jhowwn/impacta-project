import { Product } from '@/service/entities/product';

export abstract class ProductsRepository {
  abstract findById(id: string): Promise<Product | null>
  abstract findByName(name: string): Promise<Product | null>
  abstract create(product: Product)
} 
