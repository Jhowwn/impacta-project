import express from "express";
import { productRoutes } from "./http/controller/routes/productRoutes";
import { userRoutes } from "./http/controller/routes/userRoutes";

export const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes)
app.use(productRoutes)