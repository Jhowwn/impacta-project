import { ProductAttachment } from "@/service/entities/product-attachment";

export interface ProductAttachmentsRepository {
  createMany(attachments: ProductAttachment[]): Promise<void>;
}