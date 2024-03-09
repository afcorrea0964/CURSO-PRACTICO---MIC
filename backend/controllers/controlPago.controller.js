import { getConnection, sql } from '../database/connection';

// Crear un control de pago
export const createControlPago = async (req, res) => {
    const { cliente_id, pagos_mensuales, recordatorio_pago } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('cliente_id', sql.Int, cliente_id)
            .input('pagos_mensuales', sql.Decimal, pagos_mensuales)
            .input('recordatorio_pago', sql.VarChar, recordatorio_pago)
            .query('INSERT INTO control_pago (cliente_id, pagos_mensuales, recordatorio_pago) VALUES (@cliente_id, @pagos_mensuales, @recordatorio_pago)');
        res.status(201).json({ message: 'Control de pago creado correctamente' });
    } catch (error) {
        console.error("Error al crear control de pago:", error);
        res.status(500).json({ message: "Error al crear control de pago" });
    }
};

// Obtener todos los controles de pago
export const getControlPagos = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM control_pago');
        res.json(result.recordset);
    } catch (error) {
        console.error("Error al obtener controles de pago:", error);
        res.status(500).json({ message: "Error al obtener controles de pago" });
    }
};

// Obtener un control de pago por ID
export const getControlPagoById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM control_pago WHERE id = @id');
        res.json(result.recordset[0]);
    } catch (error) {
        console.error("Error al obtener control de pago por ID:", error);
        res.status(500).json({ message: "Error al obtener control de pago por ID" });
    }
};

// Actualizar un control de pago
export const updateControlPago = async (req, res) => {
    const { id } = req.params;
    const { cliente_id, pagos_mensuales, recordatorio_pago } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('cliente_id', sql.Int, cliente_id)
            .input('pagos_mensuales', sql.Decimal, pagos_mensuales)
            .input('recordatorio_pago', sql.VarChar, recordatorio_pago)
            .input('id', sql.Int, id)
            .query('UPDATE control_pago SET cliente_id = @cliente_id, pagos_mensuales = @pagos_mensuales, recordatorio_pago = @recordatorio_pago WHERE id = @id');
        res.json({ message: 'Control de pago actualizado correctamente' });
    } catch (error) {
        console.error("Error al actualizar control de pago:", error);
        res.status(500).json({ message: "Error al actualizar control de pago" });
    }
};

// Eliminar un control de pago
export const deleteControlPago = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM control_pago WHERE id = @id');
        res.json({ message: 'Control de pago eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar control de pago:", error);
        res.status(500).json({ message: "Error al eliminar control de pago" });
    }
};