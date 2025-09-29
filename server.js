import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import sequelize from './src/config/db.js';
import User from './src/models/User.js'; // 👈 Importar modelo para sincronizar

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Sincronizar base de datos
(async () => {
  try {
    await sequelize.sync({ alter: true }); 
    console.log("✅ Tabla Users creada o actualizada correctamente");
  } catch (error) {
    console.error("❌ Error al sincronizar la base de datos:", error);
  }
})();

// Rutas
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
