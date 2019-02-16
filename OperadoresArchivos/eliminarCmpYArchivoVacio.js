/*** Operadores de cadena ***/
const regEx       = require('../RegEx/jsonRgx')

const { eliminarArchivoVacio } = require('./eliminarArchivoVacio')
/***
 * Función para eliminar el componente incorrecto y validar si esta vacio
 * o solo con comentarios para eliminarlo
 * @archivo   ruta del archivo al cual se le eliminara el contenido
 * @expresion abarca el bloque de información que sera eliminada
 * @texto     contenido que se almacenara en el archivo 
 *            despues de operar con la expresion
 ***/
exports.eliminarArchivoVacioYCmpIncorrecto = (archivo, expresion, texto) => {
    texto = texto.replace(expresion, '')
    texto = regEx.Borrar.clsIniCorcheteLineaVacia(texto)
    if(!/\w+/g.test(regEx.Borrar.clsComentariosIntls(texto))) {
        eliminarArchivoVacio(texto, archivo)
    }

    return texto
}