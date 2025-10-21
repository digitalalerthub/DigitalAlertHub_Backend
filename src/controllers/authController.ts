import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/User';

// Tipamos el payload del JWT
interface JWTPayload {
  id: number;
  email: string;
  rol: number;
}

// 🔹 Registro
export const register = async (req: Request, res: Response): Promise<void> => {
  const { nombre, apellido, email, contrasena, telefono, id_rol } = req.body;

  try {
    // 1️⃣ Verificar si ya existe
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      res.status(409).json({ message: 'El correo ya está registrado' });
      return;
    }

    // 2️⃣ Encriptar contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // 3️⃣ Crear usuario
    const user = await Usuario.create({
      nombre,
      apellido,
      email,
      contrasena: hashedPassword,
      telefono,
      id_rol: id_rol || 2, // por defecto rol 2
      estado: true,
    });

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('❌ Error en register:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// 🔹 Login
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, contrasena } = req.body;

  try {
    // 1️⃣ Buscar usuario
    const user = await Usuario.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    // 2️⃣ Validar contraseña
    const valido = await bcrypt.compare(contrasena, user.contrasena);
    if (!valido) {
      res.status(401).json({ message: 'Contraseña incorrecta' });
      return;
    }

    // 3️⃣ Generar token
    const payload: JWTPayload = {
      id: user.id_usuario,
      email: user.email,
      rol: user.id_rol,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '8h',
    });

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
