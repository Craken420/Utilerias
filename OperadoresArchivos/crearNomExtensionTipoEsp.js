/*** Operadores de cadena ***/
const regEx       = require('../RegEx/jsonRgx')

/***
 * Función que recive un archivo con la nomenclaruta Archivo_FRM_MAVI.esp
 * y retorna Archivo.frm
 * @archivo ruta del archivo
 ***/
exports.crearNomExtensionTipoEsp = archivo => {
    return  regEx.jsonReplace.minusculasPorMayuscula(
                regEx.jsonReplace.puntoPorGuionBajoTipoEsp(
                    regEx.jsonReplace.extraerNomTipoEsp(archivo)
                )
            )
}

