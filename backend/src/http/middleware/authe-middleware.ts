import { NotAllowedError } from "@/core/errors/Errors/not-allowed-error";
import { env } from "@/env";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')

  if (!token) {
    return res.status(404).json({
      NotAllowedError
    })
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET)

    if (!decoded.sub) {
      res.status(401).json({ error: 'Invalid token' });
    }

    next()
  } catch (error) {
    res.status(401).json({ error: new NotAllowedError().message });
  }
}
