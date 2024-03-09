import express from 'express';
import { createControlPago, getControlPagos, getControlPagoById, updateControlPago, deleteControlPago } from '../controllers/controlPago.controller.js';

const router = express.Router();

router.post('/controlpagos', createControlPago);
router.get('/controlpagos', getControlPagos);
router.get('/controlpagos/:id', getControlPagoById);
router.put('/controlpagos/:id', updateControlPago);
router.delete('/controlpagos/:id', deleteControlPago);

export default router;