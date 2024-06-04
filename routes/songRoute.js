const express = require('express');
const router = express.Router();
const multer = require('multer');
const songController = require('../controllers/songController');
// Configuración de multer para almacenar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {agregarCancion} = require ('../models/songModel.js')

// Rutas para canciones
router.get('/getList', (req, res) => {
    console.log('Solicitud GET recibida en /getList');
    songController.obtenerLista(req, res);
});

//Agregar canciones
router.post('/add-song', upload.fields([{ name: 'archivo'},{ name: 'imagen' }]), (req, res, next) => {
    console.log('Solicitud POST recibida en /add-song');
    next();
},(req, res) =>{
    console.log('Pasando a controlador agregarCanción');
    songController.agregarCancion(req, res);
});

module.exports = router;