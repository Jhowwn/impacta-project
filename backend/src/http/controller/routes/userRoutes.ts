import express from "express";
import { AuthenticateController } from "../user/authenticate";
import { CreateAccountController } from "../user/register";

export const userRoutes = express.Router();

userRoutes.post('/users', CreateAccountController)

userRoutes.post('/sessions', AuthenticateController)