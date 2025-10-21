import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/db';
import authRoutes from './routes/authRoutes';
import Usuario from './models/User';


dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

// rutas
app.use('/api/auth', authRoutes);

// probar conexión
sequelize.authenticate()

  .then(() => {
    console.log('✅ Conexión a PostgreSQL exitosa');
    // sincronizar modelos automáticamente (solo en desarrollo)
    // await sequelize.sync({ alter: true });
  })
  .catch((err: unknown) => console.error('❌ Error al conectar a BD:', err));

// endpoint raíz
app.get('/', (req: Request, res: Response) => {
  res.send('🚀 API DigitalAlertHub activa');
});

// iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
