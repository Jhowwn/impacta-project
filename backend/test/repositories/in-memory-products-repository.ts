import { ProductsRepository } from "@/repositories/product-repository";
import { Prisma, Product } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { ProductAttachmentsRepository } from "../../src/repositories/product-attachments-repository";

export class InMemoryProductsRepository implements ProductsRepository {
  constructor(private productAttachmentsRepository: ProductAttachmentsRepository) { }
  public items: Product[] = []

  async findById(id: string): Promise<Product | null> {
    const product = this.items.find(item => item.id.toString() === id);

    if (!product) {
      return null;
    }

    return product
  }

  async findByName(name: string): Promise<Product | null> {
    const product = this.items.find(item => item.name === name);

    if (!product) {
      return null;
    }

    return product
  }

  async create(data: Prisma.ProductUncheckedCreateInput): Promise<Product> {
    const product = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      user_id: data.user_id,
      created_at: new Date(),
      updated_at: new Date() ?? null,
    };

    await this.items.push(product)

    return product
  }
}
