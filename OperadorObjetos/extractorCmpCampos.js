/*** Operadores de cadena ***/
const regEx = require('../RegEx/jsonRgx')

/*** Operadores de objetos ***/
const { unirOriginalSobrEscritura } = require('../OperadorObjetos/unirCmpOriginalEsp')
const { crearObjCamposCmp } = require('./crearObjCamposCmp')

/***
 * Función para crear un objeto con el nombre de los componentes que contiene
 * otro objeto retornado por la función "crearObjCamposCmp",
 * dicho objeto retornado contiene los campos y su respectivo contenido.
 * Nota: esta función solo opera con un contenido. Si desea validar
 *       un archivo de sobre-escritura existe la función extraerMultiComponentesCampos
 * Ejemplo:
 *      -------- this.Funsión
 *      nombreComponente {
 *          -----------------
 *          campo1: contenido,
 *          campo2: contenido,
 *          etc, etc
 *              ------------- retorno función "crearObjCamposCmp"
 *      }
 * @arregloCamposBusqueda campos que se extraeran del componente especificado.
 * @arregloNomCmps nombre de los componentes que se usaran para extraer sus campos.
 * @texto texto al que se le extraeran los componentes y sus campos especificados.
 ***/
const extraerMonoComponentesCampos = (arregloCamposBusqueda, arregloNomCmps, texto) => {
    texto = texto + '\n['
    texto = texto.replace(regEx.Expresiones.ampersand, '')
    texto = texto.replace(regEx.Expresiones.comentariosLineaIntls, '')

    let objComponentesCampos = {}

    for(nomComponente in arregloNomCmps) {

        let contenidoObjs = crearObjCamposCmp(
            arregloCamposBusqueda,
            arregloNomCmps[nomComponente],
            texto
        )

        for (contenido in contenidoObjs) {
            if (contenidoObjs != false) {
                objComponentesCampos[arregloNomCmps[nomComponente]
                                    ] = contenidoObjs[contenido]
            }
        }
    }
    return objComponentesCampos
}

/***
 * Función que une dos objetos que contienen los componentes con sus respetivos campos
 * @arregloCamposBusqueda campos que se extraeran del componente especificado.
 * @arregloNomCmps nombre de los componentes que se usaran para extraer sus campos.
 * @contenidoSobrEscritura archivo que sobre-escribe los componentes en el
 *     contenido original componentes como: Menus, Acciones, etc.
 * @contenidoOriginal archivo de "codigo original" del programa Intelisis V-3100
 *                           contenedor de los menus con los que opera dicho programa
 * Nota: esta función solo opera con un archivo contenido original y 
 *       un archivo de sobre-escritura existe la función extraerMultiComponentesCampos
 *  * Ejemplo:
 * ---------------------------------------------------------------------- this.Funsión
 *      {
 *          -------------------------------------
 *          nombreComponente {
 *              -------------
 *              campo1: contenido,
 *              campo2: contenido,
 *              etc, etc
 *              ------------- retorno función "crearObjCamposCmp"
 *          }
 *          ------------------------------------- retorno función extraerMonoComponentesCampos
 *          nombreComponente2 {
 *              -------------
 *              campo1: contenido,
 *              campo2: contenido,
 *              etc, etc
 *              ------------- retorno función "crearObjCamposCmp"
 *          }
 *          ------------------------------------- retorno función extraerMonoComponentesCampos
 *      }
 * ----------------------------------------------------------------------
 ***/
const extraerMultiComponentesCampos = (arregloCamposBusqueda, arregloNomCmps,
    contenidoSobrEscritura, contenidoOriginal) => {
    return  unirOriginalSobrEscritura(
                extraerMonoComponentesCampos(
                    arregloCamposBusqueda,
                    arregloNomCmps,
                    contenidoOriginal
                    
                ),
                extraerMonoComponentesCampos(
                    arregloCamposBusqueda,
                    arregloNomCmps,
                    contenidoSobrEscritura
                )
            )
}

module.exports.extraerMonoCmpCampos = extraerMonoComponentesCampos
module.exports.extraerMultiCmpCampos = extraerMultiComponentesCampos