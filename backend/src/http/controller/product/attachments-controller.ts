import multer from 'multer';

import multerConfig from "@/core/config/multerConfig";
import { UploadFile } from '@/service/upload/upload-and-create-attachments';
import { makeProductAttachmentService } from '@/utils/factories/make-product-attachment';
import { Request, Response } from 'express';

const upload = multer(multerConfig).array('attachment', 3)

export function uploadFile(req: Request, res: Response) {
  return upload(req, res, async (error) => {
    if (error) {
      return res.status(402).json({
        message: 'Error uploading file'
        // error: [error]
      })
    }

    console.log('Uploading file', req.files)

    const CreateProductAttachmentService = makeProductAttachmentService()

    if (!req.files || req.files.length == 0) {
      return res.status(402).json({
        message: 'Error uploading file'
        // error: [error]
      })
    }

    // const files = req.files
    const files: UploadFile[] = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();

    const product_id = req.params.id

    const result = await CreateProductAttachmentService.execute({
      files, product_id
    })

    if (result.value instanceof Error) {
      return res.status(409).send({ message: 'Erro' })
    }

    return res.status(201).send()
  })
}
