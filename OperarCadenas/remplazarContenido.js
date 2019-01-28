/*** Operadores de cadena ***/
const regEx       = require('../RegEx/jsonRgx')

/***
 * Funcionción que remplaza un pedazo de contenido dentro de texto general
 * @contenidoOriginal Contenido general al que se le remplazara un texto pequeño
 * @contenidoARemplazar Informacion que se quiere remplazar en @contenidoOriginal
 * @contenidoParaRemplazo Informacion para remplazar a @contenidoARemplazar
 ***/
exports.remplazarContenido =  ( contenidoOriginal, contenidoARemplazar,
                                contenidoParaRemplazo) => {
    return  contenidoOriginal.replace(
                new RegExp (
                    `${regEx.jsonReplace.prepararRegEx(contenidoARemplazar)}`, `g`
                    ),
                contenidoParaRemplazo
            )
}
