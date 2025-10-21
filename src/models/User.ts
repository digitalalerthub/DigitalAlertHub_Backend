import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

// 🔹 Definimos los atributos que tiene la tabla
interface UsuarioAttributes {
  id_usuario: number;
  id_rol: number;
  nombre: string;
  apellido: string;
  email: string;
  contrasena: string;
  telefono?: string | null;
  estado: boolean;
}

// 🔹 Para crear un usuario, no se necesita el id (lo genera la BD)
type UsuarioCreationAttributes = Optional<UsuarioAttributes, 'id_usuario'>;

// 🔹 Clase del modelo con tipado fuerte
class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes>
  implements UsuarioAttributes {
  public id_usuario!: number;
  public id_rol!: number;
  public nombre!: string;
  public apellido!: string;
  public email!: string;
  public contrasena!: string;
  public telefono?: string | null;
  public estado!: boolean;
}

// 🔹 Definición del modelo (mapeo con la tabla 'usuarios')
Usuario.init(
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize, // conexión a la BD
    tableName: 'usuarios',
    timestamps: false, // evita createdAt / updatedAt automáticos
    
  }
);

export default Usuario;
