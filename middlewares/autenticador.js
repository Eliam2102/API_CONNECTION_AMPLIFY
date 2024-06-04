// En tu archivo de configuración o en un archivo separado de autenticación
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
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

function verificarDatos(dataSegura) {
    let partes = dataSegura.split(',');
    let resultado = {};

    partes.forEach((parte, index) => {
        resultado[index === 0 ? 'nombre' : index === 1 && partes.length > 2 ? 'email' : 'password'] = decryptData(parte);
    });

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


module.exports = { verificarToken, verificarDatos, comparePassword };