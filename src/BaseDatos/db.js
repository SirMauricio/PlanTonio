// Ejemplo de la configuración de la API con Express
const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    database: "plantas",
    user: "root",
    password: ""
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos');
});

// Endpoints para el CRUD de plantas

// Endpoint para obtener todas las plantas
app.get('/plantas', (req, res) => {
  const sql = 'SELECT * FROM plantas';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Endpoint para agregar una nueva planta
app.post('/plantas', (req, res) => {
  const {nombre, descripcion, especie, cuidados} = req.body;
  const sql = 'INSERT INTO plantas (Nombre, Descripcion, Especie, Cuidados) VALUES (?, ?, ?, ?)';
  db.query(sql, [nombre, descripcion, especie, cuidados], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Planta agregada exitosamente', result });
  });
});

// Endpoint para actualizar una planta existente
app.put('/plantas/:id', (req, res) => {
  const { nombre, descripcion, especie, cuidados} = req.body;
  const { id } = req.params;
  const sql = 'UPDATE plantas SET Nombre=?, Descripcion=?, Especie=?, Cuidados=? WHERE id=?';
  db.query(sql, [nombre, descripcion, especie, cuidados, id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Planta actualizada exitosamente', result });
  });
});

// Endpoint para eliminar una planta existente
app.delete('/plantas/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM plantas WHERE id=?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Planta eliminada exitosamente', result });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
