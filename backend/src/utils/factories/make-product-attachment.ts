import { PrismaProductAttachmentsRepository } from '@/repositories/prisma/prisma-product-attachment-repository'
import { UploadAndCreateAttachmentService } from '@/service/upload/upload-and-create-attachments'

export function makeProductAttachmentService() {
  const attachmentRepository = new PrismaProductAttachmentsRepository()
  const createProductAttachmentService = new UploadAndCreateAttachmentService(attachmentRepository)

  return createProductAttachmentService
}
