import User from '../models/User.js';

// Registro de usuario
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Crear usuario en la BD
    const user = await User.create({ name, email, password });

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error en el servidor',
      error: error.message,
    });
  }
};

// Login de usuario
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    res.json({
      message: 'Login exitoso',
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error en el servidor',
      error: error.message,
    });
  }
};
