const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM clientes');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { nombre, apellidos } = req.body;
  const [result] = await db.query('INSERT INTO clientes (nombre, apellidos) VALUES (?, ?)', [nombre, apellidos]);
  res.status(201).json({ id: result.insertId });
});

router.put('/:id', async (req, res) => {
  const { nombre, apellidos } = req.body;
  await db.query('UPDATE clientes SET nombre = ?, apellidos = ? WHERE id = ?', [nombre, apellidos, req.params.id]);
  res.json({ message: 'Cliente actualizado' });
});

router.delete('/:id', async (req, res) => {
  await db.query('DELETE FROM clientes WHERE id = ?', [req.params.id]);
  res.json({ message: 'Cliente eliminado' });
});

module.exports = router;