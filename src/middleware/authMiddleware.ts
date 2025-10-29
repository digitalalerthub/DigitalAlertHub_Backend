import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

//  Creamos una interfaz personalizada para extender Request
interface CustomRequest extends Request {
  // Esto nos permite agregar propiedades nuevas como userId y rol sin errores de tipo
  userId?: number;
  rol?: string;
}

//  Middleware para verificar el token JWT en las rutas protegidas
export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  // Extrae el encabezado "Authorization" del request
  const authHeader = req.headers.authorization; // Normalmente viene así: "Bearer eyJhbGciOiJIUzI1NiIsInR..."

  if (!authHeader) {
    // Si no viene el token en la cabecera, se rechaza la solicitud
    return res.status(403).json({ message: "Token requerido" });
  }

  const token = authHeader.split(" ")[1]; // Divide el valor en dos: ["Bearer", "token"] y toma la segunda parte

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload; // Verifica y decodifica el token usando la clave secreta del .env

    // Guarda los datos del usuario en req.user
    (req as any).user = { id: decoded.id, rol: decoded.rol };

    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" }); // Si el token está vencido o es inválido
  }
};
