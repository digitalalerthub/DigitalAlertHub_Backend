// Este archivo define cómo se "mapea" la tabla usuarios a un objeto en Node.
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Usuario = sequelize.define(
  "Usuario",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // corresponde a SERIAL en PostgreSQL
    },
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    contrasena: {
      type: DataTypes.STRING(255), // aquí guardaremos contraseña encriptada
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(20),
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // por defecto activo
    },
  },
  {
    tableName: "usuarios", // nombre real de la tabla en la BD
    timestamps: false, // desactiva createdAt/updatedAt automáticos
  }
);

export default Usuario;
