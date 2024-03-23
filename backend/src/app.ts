import cors from 'cors';
import express from "express";

import { resolve } from 'path';
import { productRoutes } from "./http/controller/routes/productRoutes";
import { userRoutes } from "./http/controller/routes/userRoutes";

export const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(resolve( 'uploads')));

app.use(userRoutes)
app.use(productRoutes)