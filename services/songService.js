const cancion = require('../models/songModel');


async function agregarCancion(titulo, artista, archivo, imagen) {
    return await cancion.agregarCancion(titulo, artista, archivo, imagen);
}

//obtenerLista de cnaciones
async function obtenerLista() {
    return await cancion.obtenerLista();
}

async function addSongToFavorites(id) {
    return await songModel.addSongToFavorites(id);
}

async function getSongById(id) {
    return await songModel.getSongById(id);
}

module.exports = {
    agregarCancion,
    obtenerLista,
    addSongToFavorites,
    getSongById
};
