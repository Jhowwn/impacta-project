import express from "express";
import { userRoutes } from "./controller/routes/userRoutes";

export const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes)