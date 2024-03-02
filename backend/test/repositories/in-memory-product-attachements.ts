import { ProductAttachment } from "@/utils/entities/product-attachment";
import { ProductAttachmentsRepository } from "../../src/repositories/product-attachments-repository";

export class InMemoryProductAttachment implements ProductAttachmentsRepository {
  public items: ProductAttachment[] = [];

  async createMany(attachments: ProductAttachment[]): Promise<void>  {
    this.items.push(...attachments)
  }
}