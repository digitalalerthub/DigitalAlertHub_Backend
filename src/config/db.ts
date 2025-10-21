import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,      // Nombre de la BD
  process.env.DB_USER as string,      // Usuario
  process.env.DB_PASSWORD as string,  // Contraseña
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    logging: true, // Desactiva logs SQL (opcional)
  }
);

// Prueba inmediata de conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a PostgreSQL establecida correctamente.");
  } catch (error) {
    console.error("❌ Error al conectar con PostgreSQL:", error);
  }
})();

export default sequelize;
