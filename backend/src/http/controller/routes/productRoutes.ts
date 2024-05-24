import express from "express";

import { verifyToken } from "@/http/middleware/authe-middleware";
import { uploadFile } from "../product/attachments-controller";
import { CreateProductController } from "../product/create-product-controller";
import { DeleteProductController } from "../product/delete-product-controller";
import { FetchProductsBySellerController } from "../product/fetch-products-by-seller-controller";
import { GetProductController } from "../product/get-product-controller";
import { UpdateProductController } from "../product/update-product-controller";

export const productRoutes = express.Router();

productRoutes.post('/products', verifyToken, CreateProductController)
productRoutes.post('/product/:id/attachment', verifyToken, uploadFile)
productRoutes.get('/product/:id', verifyToken, GetProductController)
productRoutes.put('/product/:id', verifyToken, UpdateProductController)
productRoutes.delete('/product/:id', verifyToken, DeleteProductController)

productRoutes.get('/fetch-products-by-seller', verifyToken, FetchProductsBySellerController)