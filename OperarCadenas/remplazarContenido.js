/*** Operadores de archivos***/
const pcrArchivos =  require('../OperadoresArchivos/procesadorArchivos')

/*** Operadores de cadena ***/
const regEx       = require('../RegEx/jsonRgx')

/***
 * Funcionción que remplaza un pedazo de contenido dentro de texto general
 * @contenidoOriginal Contenido general al que se le remplazara un texto pequeño
 * @contenidoARemplazar Informacion que se quiere remplazar en @contenidoOriginal
 * @contenidoParaRemplazo Informacion para remplazar a @contenidoARemplazar
 ***/
exports.remplazarContenido = function (contenidoOriginal, contenidoARemplazar, contenidoParaRemplazo) {
    let cont = 0
    let contenidoRegEx = regEx.jsonReplace.prepararRegEx(contenidoARemplazar)
    // pcrArchivos.crearArchivo('Testing/contenidoRegEx.txt',contenidoARemplazar)
    let buscarContenidoARemplazar = new RegExp(`${contenidoRegEx}`, `g`)
    // pcrArchivos.crearArchivo('Testing/contenidoRegEx-' + cont + '.txt',buscarContenidoARemplazar)
    //pcrArchivos.crearArchivo(carpetas.carpetaTesting + 'ContenidoAchivoSinRemplazar' + cont,contenidoArchivo)
    // pcrArchivos.crearArchivo(carpetas.carpetaTesting + 'ExpresionComponentes' + cont,buscarComponente)
    // pcrArchivos.crearArchivo(carpetas.carpetaTesting + 'remplazoComponentes-' + cont,remplazoComponente)
    // pcrArchivos.crearArchivo(carpetas.carpetaTesting + 'Componentes' + cont,contenidoOriginal)
    cont++
   // pcrArchivos.crearArchivo(carpetas.carpetaTesting + 'nuevoContenidoArchivo',nuevoContenidoArchivo)
    return contenidoOriginal.replace(buscarContenidoARemplazar, contenidoParaRemplazo)
}