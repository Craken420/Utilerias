/*** Operadores de cadena ***/
const regEx = require('../RegEx/jsonRgx')

/*** Operadores de objetos ***/
const opObj = require('../OperadorObjetos/eliminarDuplicado')

let camposBusqueda = ['Nombre','Menu','NombreDesplegar','TipoAccion','ClaveAccion']

const crearObjCamposCmp = (expresionCmpPorNom, texto) => {
    if (expresionCmpPorNom.test(texto)) {

        let objCampo = {}
    
        let objCampos = camposBusqueda.map(campo => {
            if (new RegExp(`(?<=^${campo}\\=).*`, `gm`).test(
                                                            texto.match(
                                                                expresionCmpPorNom
                                                            ).join('')
                                                        )
            ) {
                objCampo[campo] = texto.match(
                                            expresionCmpPorNom
                                        ).join('').match(
                                            new RegExp(`(?<=^${campo}\\=).*`, `gm`)
                                        ).join('')
            }
            return objCampo
        })

        return opObj.arregloSinDuplicado(objCampos)

    } else {
        return false
    }
}

const extraerCamposComponente = (arregloCmps, texto) => {
    texto = texto + '\n['
    texto = texto.replace(regEx.expresiones.ampersand, '')
    texto = texto.replace(regEx.expresiones.comentariosLineaIntls, '')

    let objetoPerfiles = {}

    for(componente in arregloCmps) {
        let contenidoObjs = crearObjCamposCmp(
            regEx.crearRegEx.extraerCmpPorNom(
                regEx.jsonReplace.prepararRegEx(arregloCmps[componente])
            ), texto
          )
        for (contenido in contenidoObjs){
          if (contenidoObjs != false) {
            objetoPerfiles[arregloCmps[componente]] = contenidoObjs[contenido]
          }
        }
    }
    return objetoPerfiles
}

module.exports.extraerCamposCmp = extraerCamposComponente