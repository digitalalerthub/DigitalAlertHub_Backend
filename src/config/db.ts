// src/config/db.ts
import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development", // solo logs en dev
  }
)

export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    console.log("✅ Conexión a PostgreSQL establecida correctamente.")

    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true })
      console.log("🛠️ Modelos sincronizados con la base de datos.")
    }
  } catch (error) {
    console.error("❌ Error al conectar con PostgreSQL:", error)
    process.exit(1)
  }
}



