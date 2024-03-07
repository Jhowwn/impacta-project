import { Either, left, right } from "@/core/either"
import { ProductAttachmentsRepository } from "@/repositories/product-attachments-repository"
import { Attachment } from "@prisma/client"
import { InvalidAttachmentTypeError } from "../../utils/errors/Invalid-attachment-error"

interface UploadAndCreateAttachmentRequest {
  files: {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string
    path: string
    destination: string
    filename: string
    size: number
  }[]
  product_id: string
}

interface attachemntProps {
  id: string
  url: string
  product_id: string
}

type UploadAndCreateAttachmentResponse = Either<
  InvalidAttachmentTypeError,
  { attachments: Attachment[] }
>

export class UploadAndCreateAttachmentService {
  constructor(
    private attachmentRepository: ProductAttachmentsRepository,
  ) { }

  async execute({
    files,
    product_id,
  }: UploadAndCreateAttachmentRequest): Promise<UploadAndCreateAttachmentResponse> {
    let attachments: attachemntProps[] = []
    let errors: any = [];

    const promises = files.map(async (file) => {
      if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(file.mimetype)) {
        errors.push(new InvalidAttachmentTypeError(file.mimetype));
        return;
      }

      try {
        // Aguarde a criação do anexo e adicione-o ao array attachments
        const attachment = await this.attachmentRepository.createMany({
          url: file.path,
          product_id,
        });
        attachments.push(attachment);
      } catch (error) {
        // Trate o erro aqui conforme necessário
        console.error('Erro ao criar anexo:', error);
        errors.push('Error to create an attachment');
      }
    });

    await Promise.all(promises);

    if (errors.length > 0) {
      return left(errors[0]);
    }

    return right({
      attachments
    })
  }
}
