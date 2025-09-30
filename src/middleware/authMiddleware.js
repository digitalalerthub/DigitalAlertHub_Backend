import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // "Bearer token"
  if (!authHeader) return res.status(403).json({ message: "Token requerido" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // guardar id del usuario
    req.rol = decoded.rol;   // guardar rol
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};
