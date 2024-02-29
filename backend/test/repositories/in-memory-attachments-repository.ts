import { AttachmentsRepository } from "@/repositories/attachment-repository"
import { Attachment } from "@/service/entities/attachment"

export class InMemoryAttachmentsRepository implements AttachmentsRepository {
  public items: Attachment[] = []

  async create(attachment: Attachment) {
    this.items.push(attachment)
  }
}