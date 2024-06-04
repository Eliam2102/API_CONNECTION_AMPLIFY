const cancion = require('../models/songModel');


async function agregarCancion(titulo, artista, archivo, imagen) {
    return await cancion.agregarCancion(titulo, artista, archivo, imagen);
}

//obtenerLista de cnaciones
async function getCanciones() {
    return await cancion.getAll();
}

async function addSongToFavorites(id) {
    return await songModel.addSongToFavorites(id);
}

async function getSongById(id) {
    return await songModel.getSongById(id);
}

module.exports = {
    agregarCancion,
    getCanciones,
    addSongToFavorites,
    getSongById
};
