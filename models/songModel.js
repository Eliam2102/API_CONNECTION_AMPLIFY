const { obtenerConexion } = require('../database/conexion');

// Función para agregar una nueva canción
async function agregarCancion(titulo, artista, archivo, imagen) {
    const conexion = await obtenerConexion();
    try {
        const query = 'INSERT INTO canciones (titulo, artista, archivo, imagen) VALUES (?, ?, ?, ?)';
        const values = [titulo, artista, archivo, imagen];
        const [result] = await conexion.query(query, values);
        return result.insertId; // Retorna el ID de la nueva canción creada
    } catch (error) {
        console.error('Error al agregar la canción:', error);
        throw error; // Lanza el error para manejarlo en la ruta
    } finally {
        conexion.release();
    }
}

// Función para obtener la lista de canciones
async function obtenerLista() {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query('SELECT * FROM canciones');
        return results;
    } catch (error) {
        console.error('Error al buscar las canciones', error);
        throw error;
    } finally {
        conexion.release();
    }
}

// Función para agregar una canción a favoritos
async function agregarCancionAFavoritos(id) {
    const conexion = await obtenerConexion();
    try {
        const query = 'INSERT INTO favoritos (song_id) VALUES (?)';
        const [result] = await conexion.query(query, [id]);
        return result.insertId; // Retorna el ID de la nueva entrada en favoritos
    } catch (error) {
        console.error('Error al agregar la canción a favoritos:', error);
        throw error; // Lanza el error para manejarlo en la ruta
    } finally {
        conexion.release();
    }
}

// Función para obtener una canción por su ID
async function obtenerCancionPorId(id) {
    const conexion = await obtenerConexion();
    try {
        const [rows] = await conexion.query('SELECT * FROM canciones WHERE id = ?', [id]);
        return rows[0]; // Asume que ID es único y devuelve la primera coincidencia
    } catch (error) {
        console.error('Error al obtener la canción:', error);
        throw error; // Lanza el error para manejarlo en la ruta
    } finally {
        conexion.release();
    }
}

module.exports = {
    agregarCancion,
    agregarCancionAFavoritos,
    obtenerLista
};
