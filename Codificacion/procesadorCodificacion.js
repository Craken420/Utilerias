/*** Operadores de archivos***/
const fs        = require('fs')

/*** Operadores de codificación***/
const chardet   = require('chardet')
const iconvlite = require('iconv-lite')

/***
 * Función que recodifica el contenido de un archivo
 * @archivo variable que alamacena la ruta del archivo
 * @codificacionFinal Codificación deseada
 ***/
exports.recodificarArchivo = (archivo, codificacionFinal) => {
    return iconvlite.decode(fs.readFileSync(archivo), codificacionFinal)
}

/***
 * Detecta la codificación del archivo parámetro
 * @archivo variable que alamacena la ruta del archivo
 ***/
exports.detectarCodificacion = archivo => {
    return chardet.detectFileSync(archivo)
}
