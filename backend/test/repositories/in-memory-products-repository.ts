import { ProductsRepository } from "@/repositories/product-repository";
import { Product } from "@/service/entities/product";
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

  async create(product: Product) {
    this.items.push(product)

    await this.productAttachmentsRepository.createMany(
      product.attachments.getItems()
    )

    this.items.push(product);
  }
}