const regEx  = require('../RegEx/jsonRgx')

/***
 * Función que elimina los comentarios en linea intelisis, 
 * los saltos de linea vacio
 * las tabulaciones y los espacios entre palabras mayor a uno
 * a su vez agrega tabulacion al contenido de los componentes Intelisis
 * @texto contenido a ser editado
 ***/
const clsCodigoAddTab = texto => {
    texto = texto + '\n['
    texto = regEx.jsonReplace.clsTextoBasura(texto)
    texto = regEx.jsonReplace.addTabContenidoCmp(texto)
    texto = regEx.jsonReplace.clsIniCorcheteVacio(texto)
    return texto
}
module.exports.clsCodigoAddTab = clsCodigoAddTab