import { getConnection, sql } from '../database/connection';

// Controlador para obtener todos los clientes
export const getClients = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Clients');
        res.json(result.recordset);
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        res.status(500).json({ message: "Error al obtener clientes" });
    }
};

// Controlador para obtener un cliente por su ID
export const getClient = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Clients WHERE id = @id');
        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(404).json({ message: "Cliente no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener cliente:", error);
        res.status(500).json({ message: "Error al obtener cliente" });
    }
};

// Controlador para crear un nuevo cliente
export const createClient = async (req, res) => {
    const { nombre, apellido, direccion, telefono } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('apellido', sql.VarChar, apellido)
            .input('direccion', sql.VarChar, direccion)
            .input('telefono', sql.VarChar, telefono)
            .query('INSERT INTO Clients (Nombre, Apellido, Direccion, Telefono) VALUES (@nombre, @apellido, @direccion, @telefono)');
        res.status(201).json({ message: 'Cliente creado correctamente' });
    } catch (error) {
        console.error("Error al crear cliente:", error);
        res.status(500).json({ message: "Error al crear cliente" });
    }
};


// Controlador para actualizar un cliente existente
export const updateClient = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, direccion, telefono } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .input('nombre', sql.VarChar, nombre)
            .input('apellido', sql.VarChar, apellido)
            .input('direccion', sql.VarChar, direccion)
            .input('telefono', sql.VarChar, telefono)
            .query('UPDATE Clients SET Nombre = @nombre, Apellido = @apellido, Direccion = @direccion, Telefono = @telefono WHERE id = @id');
        res.json({ message: 'Cliente actualizado correctamente' });
    } catch (error) {
        console.error("Error al actualizar cliente:", error);
        res.status(500).json({ message: "Error al actualizar cliente" });
    }
};

// Controlador para eliminar un cliente existente
export const deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Clients WHERE id = @id');
        res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar cliente:", error);
        res.status(500).json({ message: "Error al eliminar cliente" });
    }
};



