import { Attachment, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { ProductAttachmentsRepository } from "../../src/repositories/product-attachments-repository";

export class InMemoryProductAttachment implements ProductAttachmentsRepository {
  public items: Attachment[] = [];

  async createMany(data: Prisma.AttachmentUncheckedCreateInput): Promise<Attachment> {
    const attachments = {
      id: data.id ?? randomUUID(),
      product_id: data.product_id ?? randomUUID(),
      url: data.url,
    }

    await this.items.push(attachments)

    return attachments
  }

  async delete(productId: string): Promise<void> {
    const findIndex = this.items.findIndex(attachments => attachments.product_id === productId)

    this.items.splice(findIndex, 1)
  }
}