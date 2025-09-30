// src/controllers/authController.js
import Usuario from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registro
export const register = async (req, res) => {
  const { nombre, apellido, email, contrasena, telefono, id_rol } = req.body;
  try {
    // 1. ¿Ya existe el usuario?
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // 2. Encriptar contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // 3. Crear usuario
    const user = await Usuario.create({
      nombre,
      apellido,
      email,
      contrasena: hashedPassword,
      telefono,
      id_rol: 2,
      estado: true,
    });

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Error en register:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Login
export const login = async (req, res) => {
  const { email, contrasena } = req.body;
  try {
    // 1. Buscar usuario
    const user = await Usuario.findOne({ where: { email } });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    // 2. Comparar contraseñas
    const valido = await bcrypt.compare(contrasena, user.contrasena);
    if (!valido)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    // 3. Generar token
    const token = jwt.sign(
      { id: user.id_usuario, email: user.email, rol: user.id_rol },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
