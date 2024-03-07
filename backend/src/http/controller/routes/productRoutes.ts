import express from "express";

import { verifyToken } from "@/http/middleware/authe-middleware";
import { uploadFile } from "../product/attachments-controller";
import { CreateProductController } from "../product/create-product-controller";

export const productRoutes = express.Router();

productRoutes.post('/products', verifyToken, CreateProductController)
productRoutes.post('/product/:id/attachment', verifyToken, uploadFile)