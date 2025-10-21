import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  userId?: number;
  rol?: string;
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization; // "Bearer token"
  if (!authHeader) {
    return res.status(403).json({ message: "Token requerido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.userId = decoded.id;
    req.rol = decoded.rol;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};
