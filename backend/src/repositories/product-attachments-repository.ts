import { ProductAttachment } from "@/utils/entities/product-attachment";

export interface ProductAttachmentsRepository {
  createMany(attachments: ProductAttachment[]): Promise<void>;
}