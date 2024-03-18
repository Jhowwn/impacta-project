import { NotAllowedError } from "@/core/errors/Errors/not-allowed-error";
import { env } from "@/env";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization

  if (!auth) {
    return res.status(401).json({
      NotAllowedError
    })
  }

  const [, token] = auth.split(" ")

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET)

    if (!decoded.sub) {
      res.status(401).json({ error: 'Invalid token' });
    }

    req.body.userId = decoded.sub.userId 

    next()
  } catch (error) {
    res.status(401).json({ error: new NotAllowedError().message });
  }
}
