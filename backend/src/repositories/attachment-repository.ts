import { Attachment } from "@/utils/entities/attachment";

export abstract class AttachmentsRepository {
  abstract create(attachment: Attachment): Promise<void>
}
