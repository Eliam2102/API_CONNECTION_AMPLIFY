const express = require('express');
const router = express.Router();

// Importar rutas específicas
const songRoute = require('./songRoute');
const usuarioRoute = require('./usuarioRoute');

// Rutas específicas para canciones
router.use('/songs', songRoute);
// Rutas específicas para usuarios
router.use('/usuarios', usuarioRoute);

module.exports = router;