import urlFile from '@/core/config/appConfig';
import { Either, left, right } from "@/core/either";
import { ProductAttachmentsRepository } from "@/repositories/product-attachments-repository";
import { Attachment } from "@prisma/client";
import { InvalidAttachmentTypeError } from "../../utils/errors/Invalid-attachment-error";
export interface UploadFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  path: string;
  destination: string;
  filename: string;
}

interface UploadAndCreateAttachmentRequest {
  files: UploadFile[];
  product_id: string;
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
        const attachment = await this.attachmentRepository.createMany({
          url: `${urlFile.url}images/${file.filename}`,
          product_id,
        });
        attachments.push(attachment);
      } catch (error) {
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
