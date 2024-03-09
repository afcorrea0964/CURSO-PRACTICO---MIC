import { Router } from 'express';
import { getClient, getClients, createClient, updateClient, deleteClient } from '../controllers/clients.controller';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/clients', getClients);

// Ruta para obtener un cliente por su ID
router.get('/clients/:id', getClient);

// Ruta para crear un nuevo cliente
router.post('/clients', createClient);

// Ruta para actualizar un cliente existente
router.put('/clients/:id', updateClient);

// Ruta para eliminar un cliente existente
router.delete('/clients/:id', deleteClient);

export default router;
