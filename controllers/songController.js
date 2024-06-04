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

async function deleteSong(req, res) {
    const { id } = req.params;
    try {
        const result = await songService.deleteSong(id);
        if (result) {
            res.json({ message: 'Canción eliminada' });
        } else {
            res.status(404).json({ error: 'Canción no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar la canción:', error);
        res.status(500).json({ error: 'Error al eliminar la canción' });
    }
}

async function addSongToFavorites(req, res) {
    const { id } = req.params;
    try {
        const result = await songService.addSongToFavorites(id);
        if (result) {
            res.json({ message: 'Canción agregada a favoritos' });
        } else {
            res.status(404).json({ error: 'Canción no encontrada' });
        }
    } catch (error) {
        console.error('Error al agregar la canción a favoritos:', error);
        res.status(500).json({ error: 'Error al agregar la canción a favoritos' });
    }
}

//Funcion para las canciones
async function obtenerLista(req, res) {
    try {
        console.log('Solicitud recibida para obtener publicaciones');
        const canciones = await songService.obtenerLista();
        console.log('canciones obtenidas:', canciones);

        const cancionesCargadas = canciones.map(pub => {
            return {
                id: pub.id,
                titulo: pub.titulo,
                artista: pub.artista,
                archivo: pub.archivo ? `http://localhost:3000/canciones/archivo/${pub.id}` : null,
                imagen: pub.imagen ? `http://localhost:3000/canciones/imagen/${pub.id}` : null
            };
        });
        console.log('Publicaciones procesadas:', cancionesCargadas);
        res.setHeader('Content-Type', 'application/json');
        res.json({ title: 'Tú lista Amplify ', canciones: cancionesCargadas });
    } catch (error) {
        console.error('Error al obtener canciones:', error);
        res.status(500).json({ error: 'Error al obtener canciones' });
    }
}


module.exports = {
    agregarCancion,
    obtenerLista,
    addSongToFavorites,
    deleteSong
};
