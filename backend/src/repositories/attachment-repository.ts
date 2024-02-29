import { Attachment } from "@/service/entities/attachment";

export abstract class AttachmentsRepository {
  abstract create(attachment: Attachment): Promise<void>
}
