import express from 'express';
import config from './config';
import cors from 'cors'; // Importa el middleware CORS
import clientsRoutes from './routes/clients.routes';

import controlPagoRoutes from './routes/controlPago.routes';
import path from 'path';

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:3000' // Permitir solicitudes solo desde http://localhost:3000
};

// Habilita CORS en tu aplicación Express
app.use(cors(corsOptions));

app.set('port', config.port || 3000);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Rutas para el backend
app.use(clientsRoutes);

app.use(controlPagoRoutes);

// Ruta para servir archivos estáticos del
// Ruta para servir archivos estáticos del frontend de inicio
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// Ruta para servir archivos estáticos del frontend de productos
const productsFrontendPath = path.join(__dirname, '../productos_frontend');
app.use('/productos', express.static(productsFrontendPath));

// Iniciar el servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor corriendo en http://localhost:${app.get('port')}`);
});
