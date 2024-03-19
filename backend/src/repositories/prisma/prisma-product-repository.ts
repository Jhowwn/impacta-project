
import { prisma } from '@/lib/prisma'
import { Product } from '@prisma/client'
import { ProductsRepository } from '../product-repository'

export class PrismaProductsRepository implements ProductsRepository {
  async findByUserId(userId: string, page: number): Promise<Product[] | null> {
    const products = await prisma.product.findMany({ 
      where: { 
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    throw new Error('Method not implemented.')
  }

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
    const product = await prisma.product.create({
      data,
    })

    return product
  }  
}