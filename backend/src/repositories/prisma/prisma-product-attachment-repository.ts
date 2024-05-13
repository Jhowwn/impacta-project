
import { prisma } from '@/lib/prisma'
import { Attachment, Prisma } from '@prisma/client'
import { ProductAttachmentsRepository } from '../product-attachments-repository'

export class PrismaProductAttachmentsRepository implements ProductAttachmentsRepository {
  async createMany(data: Prisma.AttachmentUncheckedCreateInput): Promise<Attachment> {
    const attachments = await prisma.attachment.upsert({
      where: {
        id: data.id,
      },
      update: {
        id: data.id,
      },
      create: {
        url: data.url,
        product_id: data.product_id,
      }
    })

    return attachments
  }
  
}
