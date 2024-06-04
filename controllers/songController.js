const songService = require('../services/songService');

async function agregarCancion(req, res) {
    const { titulo, artista } = req.body;
    const archivo = req.files && req.files['archivo'] ? req.files['archivo'][0].buffer : null;
    const imagen = req.files && req.files['imagen'] ? req.files['imagen'][0].buffer : null;

    // Ver si los datos son recibidos
    console.log('Cuerpo de datos de la canción a agregar:', {
        titulo,
        artista,
        archivo: archivo ? 'Audio almacenado' : 'Sin audio',
        imagen: imagen ? 'Imagen almacenada' : 'Sin imagen'
    });

    // Validar que título, artista y archivo no sean nulos
    if (!titulo || !artista || !archivo) {
        return res.status(400).json({ error: 'Título, artista y archivo de audio son requeridos' });
    }

    try {
        await songService.agregarCancion(titulo, artista, archivo, imagen);
        console.log('Canción agregada con éxito');
        res.status(201).json({ message: 'Canción agregada correctamente' });
    } catch (error) {
        console.error('Error al agregar canción:', error);
        res.status(500).json({ error: 'Error al agregar la canción' });
    }
}

//Funcion para las canciones
async function getCanciones(req, res) {
    try {
        console.log('Solicitud recibida para obtener todas las canciones de la biblioteca');
        const canciones = await songService.getCanciones;
        console.log('Canciones obtenidas:', canciones);

        const cancionesCargadas = canciones.map(pub => {
            return {
                id: pub.id,
                titulo: pub.titulo,
                artista: pub.artista,
                archivo: pub.archivo ? `http://localhost:3000/songs/archivo/${pub.id}` : null,
                imagen: pub.imagen ? `http://localhost:3000/songs/imagen/${pub.id}` : null
            };
        });
        console.log('Canciones ya cargadas:', cancionesCargadas);
        res.render('songs', {
            title: 'Amplify tu gestor de música personal',
            canciones: cancionesCargadas
        });
    } catch (error) {
        console.error('Error al obtener canciones:', error);
        res.status(500).json({ error: 'Error al obtener canciones' });
    }
}


module.exports = {
    agregarCancion,
    getCanciones,
};
