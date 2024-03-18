import { verifyToken } from "@/http/middleware/authe-middleware";
import express from "express";
import { AuthenticateController } from "../user/authenticate";
import { profile } from "../user/profile";
import { CreateAccountController } from "../user/register";

export const userRoutes = express.Router();

userRoutes.post('/users', CreateAccountController)

userRoutes.post('/sessions', AuthenticateController)

userRoutes.get('/me', verifyToken, profile)