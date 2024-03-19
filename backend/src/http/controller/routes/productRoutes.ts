import express from "express";

import { verifyToken } from "@/http/middleware/authe-middleware";
import { uploadFile } from "../product/attachments-controller";
import { CreateProductController } from "../product/create-product-controller";
import { FetchProductsBySellerController } from "../product/fetch-products-by-seller-controller";

export const productRoutes = express.Router();

productRoutes.post('/products', verifyToken, CreateProductController)
productRoutes.post('/product/:id/attachment', verifyToken, uploadFile)

productRoutes.get('/fetch-products-by-seller', verifyToken, FetchProductsBySellerController)