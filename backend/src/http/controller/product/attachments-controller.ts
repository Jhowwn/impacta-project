import multer from 'multer';

import multerConfig from "@/core/config/multerConfig";
import { makeProductAttachmentService } from '@/utils/factories/make-product-attachment';
import { Request, Response } from 'express';

const upload = multer(multerConfig).array('attachment', 3)

export function uploadFile(req: Request, res: Response) {
  return upload(req, res, async (error) => {
    if (error) {
      return res.status(400).json({
        error: [error]
      })
    }

    const CreateProductAttachmentService = makeProductAttachmentService()

    if (!req.files) {
      // console.log('files', req.files)
      throw new Error('Invalid file')
    }

    const files = req.files

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
