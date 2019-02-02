/*** Operadores de cadena ***/
const regEx       = require('../RegEx/jsonRgx')

/***
 * Función que crea una nomenclatura que se usara como nombre de archivo
 * Ejemplo: recive Archivo.frm y retorna en Archivo_FRM_MAVI.esp
 * @arreglo Contiene los nombres que seran transformados
 ***/
exports.crearNombreNomenclaturaArchivoEsp = arreglo => {
    return arreglo.map(x => {
            x = x.replace(regEx.expresiones.puntoExtension, '_') + '_MAVI.esp'
            x = x.replace(
                regEx.expresiones.tipoEspEnNomenclatura,
                x => x.toUpperCase()
            )
            return x
        }
    )
}