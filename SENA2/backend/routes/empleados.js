const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM empleados');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { nombre, apellidos, correo, telefono } = req.body;
  const [result] = await db.query('INSERT INTO empleados (nombre, apellidos, correo, telefono) VALUES (?, ?, ?, ?)', [nombre, apellidos, correo, telefono]);
  res.status(201).json({ id: result.insertId });
});

router.put('/:id', async (req, res) => {
  const { nombre, apellidos, correo, telefono } = req.body;
  await db.query('UPDATE empleados SET nombre = ?, apellidos = ?, correo = ?, telefono = ? WHERE id = ?', [nombre, apellidos, correo, telefono, req.params.id]);
  res.json({ message: 'Empleado actualizado' });
});

router.delete('/:id', async (req, res) => {
  await db.query('DELETE FROM empleados WHERE id = ?', [req.params.id]);
  res.json({ message: 'Empleado eliminado' });
});

module.exports = router;