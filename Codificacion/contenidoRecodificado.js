/*** Operadores de archivos***/
const pcrCodificacion = require('./procesadorCodificacion')

/*** 
 * Funcion que detecta la codificacion del archivo parámetro y recodifica el texto
 * con esto se verifica que la codificación almacenada sea la correcta 
 * @archivo variable que alamacena la ruta del archivo
 ***/
exports.extraerContenidoRecodificado  = function (archivo) {
    let codificacionDetectada = ''
    codificacionDetectada = pcrCodificacion.detectarCodificacion(archivo)
    //console.log('Codificacion Detectada', codificacionDetectada)

    let contenidoArchivo = ''
    contenidoArchivo = pcrCodificacion.recodificarArchivo(archivo, codificacionDetectada)

    return contenidoArchivo
}
