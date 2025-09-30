// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// rutas
app.use("/api/auth", authRoutes);

// probar conexión (sin modificar tablas)
sequelize.authenticate()
  .then(() => console.log("✅ Conexión a PostgreSQL exitosa"))
  .catch(err => console.error("❌ Error al conectar a BD:", err));

// iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));

