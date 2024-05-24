import { Attachment, Prisma } from "@prisma/client";

export interface ProductAttachmentsRepository {
  createMany(data: Prisma.AttachmentUncheckedCreateInput): Promise<Attachment>;
  delete(productId: string): Promise<void>;
}