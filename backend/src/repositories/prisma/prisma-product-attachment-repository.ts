
import { prisma } from '@/lib/prisma';
import { Attachment, Prisma } from '@prisma/client';
import { ProductAttachmentsRepository } from '../product-attachments-repository';

export class PrismaProductAttachmentsRepository implements ProductAttachmentsRepository {
  async createMany(data: Prisma.AttachmentUncheckedCreateInput): Promise<Attachment> {
    console.log('data', data);
    const attachments = await prisma.attachment.create({
      data: {
        url: data.url,
        product_id: data.product_id,
      }
    })

    return attachments
  }

  async delete(productId: string) {
    await prisma.attachment.deleteMany({
      where: {
        product_id: productId
      }
    })
  } 
}
