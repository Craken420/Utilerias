/*** Operadores de archivos***/
const pcrCodificacion = require('./procesadorCodificacion')

/*** 
 * Funcion que detecta la codificacion del archivo parámetro y recodifica el texto
 * con esto se verifica que la codificación almacenada sea la correcta 
 * @archivo variable que alamacena la ruta del archivo
 ***/
exports.extraerContenidoRecodificado  = archivo => {
    return  pcrCodificacion.recodificarArchivo(
                archivo,  pcrCodificacion.detectarCodificacion(archivo)
            )
}
