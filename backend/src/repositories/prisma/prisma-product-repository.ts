
import { prisma } from '@/lib/prisma';
import { Product } from '@prisma/client';
import { IProducts, ProductsRepository } from '../product-repository';

export class PrismaProductsRepository implements ProductsRepository {
  async findByUserId(userId: string, page: number): Promise<IProducts | null> {
    const take = 4
    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where: {
          user_id: userId,
        },
        include: {
          Attachment: true,
        },
        skip: (page - 1) * take,
        take,
      }),
      prisma.product.count({ where: { user_id: userId }})
    ])

    const totalPages = Math.ceil(total / take)

    return {
      products,
      totalPages
    };
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

  async update(data: Product): Promise<Product> {
    const product = await prisma.product.update({
      where: {
        id: data.id
      },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        updated_at: new Date(),
      }
    })

    return product
  }
}