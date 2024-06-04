/*const usuariosService = require('../services/usuarioService');
const autenticador = require('../middlewares/autenticador');

async function registrarUsuario(req, res) {
    const { dataSegura } = req.body;
    try {

        let datos = autenticador.verificarDatos(dataSegura);

        await usuariosService.registrar(datos.nombre, datos.email, datos.password);
        res.status(201).send('Usuario registrado correctamente');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
}

async function loginUsuario(req, res) {
    const { dataSegura } = req.body;

    try {
        let datos = autenticador.verificarDatos(dataSegura);
        const usuario = await _obtenerUsuarioPorNombre(datos.nombre);

        if(!usuario){
            res.status(404).send('Usuario o contraseña incorrectos');
        }

        let validPassword = await autenticador.comparePassword(datos.password, usuario.password_hash)

        if (!validPassword) {
            res.status(404).send('Usuario o contraseña incorrectos');
        } else {
            res.status(200).json(usuario);
        }
        
    } catch (error) {
        console.error('Error al logear usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
}

async function _obtenerUsuarioPorNombre(nombre) {
    try {
        const usuario = await usuariosService.obtenerPorNombre(nombre);
        return usuario;
    } catch (error) {
        console.error('Error al obtener usuario por nombre:', error);
        return error;
    }
}

module.exports = {
    registrarUsuario,
    loginUsuario
};*/

/*const crypto = require('crypto');
const bcrypt = require('bcrypt');

function verificarToken(req, res, next) {
    const token = req.headers['authorization'].split(' ');
    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    jwt.verify(token[1], process.env.RSA_PRIVATE_KEY, { algorithm: 'RS256' }, (err, usuario) => {
        if (err) {
            return res.status(403).json({ mensaje: 'Token inválido' });
        }
        req.usuario = usuario;
        next();
    });
}

function verificarDatos(dataSegura){
    let resultado = {};

    for (const key in dataSegura) {
        if(Object.hasOwnProperty.call(dataSegura, key)){
            resultado[key] = decryptData(dataSegura[key]);
        }
    }

    return resultado;
}

// Función para descifrar datos encriptados
function decryptData(encryptedText) {
    // Se obtiene la clave privada AES del entorno y se convierte en un buffer
    const key = Buffer.from(process.env.AES_PRIVATE_KEY, 'hex');
    // Se divide el texto encriptado en partes: IV (vector de inicialización), AuthTag (etiqueta de autenticación) y texto encriptado
    const [ivHex, authTagHex, encryptedHex] = encryptedText.split(':');
    // Se convierte el IV en un buffer
    const iv = Buffer.from(ivHex, 'hex');
    // Se convierte la AuthTag en un buffer
    const authTag = Buffer.from(authTagHex, 'hex');
    // Se crea un descifrador usando el algoritmo AES-256-GCM, la clave y el IV
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    // Se establece la AuthTag para verificar la autenticidad del mensaje
    decipher.setAuthTag(authTag);
    // Se descifra el texto encriptado y se convierte a formato UTF-8
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    // Se devuelve el texto descifrado
    return decrypted;
}

async function comparePassword(passwordString, bdHash) {
    const compareHashes = await bcrypt.compare(passwordString, bdHash);
    return compareHashes;
}

module.exports = {
    verificarToken,
    verificarDatos,
    comparePassword
};*/


const autenticador = require('../middlewares/autenticador');
const usuarioService = require('../services/usuarioService');

async function registrarUsuario(req, res) {
    const {dataSegura} = req.body; // Asume que dataSegura es un objeto
    console.log('dataSegura controller:', dataSegura);  // prueba
    try {
        let datos = autenticador.verificarDatos(dataSegura);

        await usuarioService.registrar(datos.nombre, datos.email, datos.password);
        res.status(201).send('Usuario registrado correctamente');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
}

async function loginUsuario(req, res) {
    const {dataSegura} = req.body; // Asume que dataSegura es un objeto
    try {
        let datos = autenticador.verificarDatos(dataSegura);
        const usuario = await _obtenerUsuarioPorNombre(datos.nombre);

        if (!usuario) {
            return res.status(404).send('Usuario o contraseña incorrectos');
        }

        let validPassword = await autenticador.comparePassword(datos.password, usuario.password_hash);

        if (!validPassword) {
            return res.status(404).send('Usuario o contraseña incorrectos');
        } else {
            return res.status(200).json(usuario);
        }

    } catch (error) {
        console.error('Error al logear usuario:', error);
        return res.status(500).send('Error interno del servidor');
    }
}

async function _obtenerUsuarioPorNombre(nombre) {
    try {
        const usuario = await usuarioService.obtenerPorNombre(nombre);
        return usuario;
    } catch (error) {
        console.error('Error al obtener usuario por nombre:', error);
        return null;
    }
}

module.exports = {
    registrarUsuario,
    loginUsuario
};
