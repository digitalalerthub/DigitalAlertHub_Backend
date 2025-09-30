import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,        // Nombre de la BD
  process.env.DB_USER,        // Usuario
  process.env.DB_PASSWORD,    // Contraseña
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,           // Opcional: desactiva logs SQL
  }
);

export default sequelize;
