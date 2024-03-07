
import { prisma } from '@/lib/prisma'
import { Product } from '@prisma/client'
import { ProductsRepository } from '../product-repository'

export class PrismaProductsRepository implements ProductsRepository {
  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { 
        id 
      },
    })

    if (!product) {
      return null
    }

    return product
  }

  async findByName(name: string): Promise<Product[] | null> {
    const products = await prisma.product.findMany({
      where: {
        name,
      },
    })

    if (!products) {
      return null
    }
  
    return products
  }
  
  async create(data: Product) {
    await prisma.product.create({
      data,
    })
  }  
}