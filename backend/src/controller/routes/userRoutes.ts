import express from "express";
import { CreateAccountController } from "../user/register";

export const userRoutes = express.Router();

userRoutes.post('/users', CreateAccountController)