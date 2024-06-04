const express = require('express');
const app = express();
const routes = require('./routes/routes');
const dotenv = require('dotenv');
const songRoutes = require('./routes/songRoute');
const path = require ('path')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use('/songs', songRoutes);


//Configura DotEnv
dotenv.config();

// Middleware para parsear JSON
app.use(express.json());

// Rutas generales
app.use('/', routes);

//Ruta de canciones
const songRoute =require('./routes/songRoute');
app.use('/songs', (req, res, next) =>{
    console.log('Solicitud recibida en /songs');
    next();
}, songRoute);

// Puerto en el que escucha el servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});