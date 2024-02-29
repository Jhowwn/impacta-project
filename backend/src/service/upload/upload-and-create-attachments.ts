import { Either, left, right } from "@/core/either"
import { AttachmentsRepository } from "@/repositories/attachment-repository"
import { Uploader } from "@/storage/uploader"
import { Attachment } from "../entities/attachment"
import { InvalidAttachmentTypeError } from "../errors/Invalid-attachment-error"

interface UploadAndCreateAttachmentRequest {
  fileName: string
  fileType: string
  body: Buffer
}

type UploadAndCreateAttachmentResponse = Either<
  InvalidAttachmentTypeError,
  { attachment: Attachment }
>

export class UploadAndCreateAttachmentService {
  constructor(
    private attachmentRepository: AttachmentsRepository,
    private uploader: Uploader
  ) { }

  async execute({
    fileName,
    fileType,
    body
  }: UploadAndCreateAttachmentRequest): Promise<UploadAndCreateAttachmentResponse> {
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
      return left(new InvalidAttachmentTypeError(fileType))
    }
      const {url} = await this.uploader.upload({fileName, fileType, body})

      const attachment = Attachment.create({
        title: fileName,
        url,
      })

      await this.attachmentRepository.create(attachment)

      return right({
        attachment
      })
  }
}