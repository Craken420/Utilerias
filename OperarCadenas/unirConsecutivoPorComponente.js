/*** Operadores de cadena ***/
const { extraerOrdenarCampos } = require('./ordenarCampos')
const regEx = require('../RegEx/jsonRgx')
const { remplazarContenido } = require('./remplazarContenido')
const { unificarCamposConsecutivos } = require('./unirConsecutivos')

/*** 
 * Une los campos consecutivos de un componente Intelisis
 * @componente Componente Intelisis con campos consecutivos
***/
const ordenarUnirCampos = componente => {
    let camposOrdenados = extraerOrdenarCampos(componente)
    let camposUnificados = []

    for (contenido in camposOrdenados.contenidoOrdenado){
        camposUnificados.push(unificarCamposConsecutivos(
            camposOrdenados.contenidoOrdenado[contenido])
        )
    }

    for (campoD in camposOrdenados.campoConDigito) {

        componente = componente.replace(
            camposOrdenados.campoConDigito[campoD], ''
        )
    }

    for (campoS in camposOrdenados.campoSinDigito) {

        for (campoU in camposUnificados) {
            if (campoS == campoU) {
                componente = componente.replace(
                    camposOrdenados.campoSinDigito[campoS], camposUnificados[campoU]
                )
            }
        }
    }
    return componente
}

exports.unirCamposConsecutivosComponente = (contenidoArchivo) => {
    let contenidoModificado = contenidoArchivo + '\n['
    contenidoModificado = regEx.jsonReplace.clsComentariosIntls(contenidoModificado)
    
    let componentesArchivo = contenidoModificado.match(
        regEx.expresiones.componentesIntls
    )
    
    for (componente in componentesArchivo) {

        if (regEx.expresiones.campoConsecutivoIntls.test(componentesArchivo[componente])) {

            contenidoArchivo = remplazarContenido(contenidoArchivo,
                componentesArchivo[componente], 
                ordenarUnirCampos(
                    componentesArchivo[componente]
                )
            )
        }
    }

    contenidoArchivo = regEx.jsonReplace.clsSaltoLineaVacio(contenidoArchivo)
    contenidoArchivo = regEx.jsonReplace.addEspacioCmp(contenidoArchivo)

    return contenidoArchivo
}