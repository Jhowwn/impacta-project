import { verifyToken } from "@/http/middleware/authe-middleware";
import express from "express";


export const productRoutes = express.Router();

productRoutes.post('/products', verifyToken, (req, res) => {
  return console.log(req, verifyToken)
})