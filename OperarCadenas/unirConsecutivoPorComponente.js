/*** Operadores de cadena ***/
const organizar     = require('./ordenarCampos')
const remplazar     = require('./remplazarContenido')
const regEx         = require('../RegEx/jsonRgx')
const unir          = require('./unirConsecutivos')

/*** 
 * Une los campos consecutivos de un componente Intelisis
 * @componente Componente Intelisis con campos consecutivos
***/
const ordenarUnirCampos = componente => {
    let camposOrdenados = organizar.extraerOrdenarCampos(componente)
    let camposUnificados = []

    for (contenido in camposOrdenados.contenidoOrdenado){
        camposUnificados.push(unir.unificarCamposConsecutivos(
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
    console.log(contenidoModificado)
    for (componente in componentesArchivo) {

        if (regEx.expresiones.campoConsecutivoIntls.test(componentesArchivo[componente])) {

            contenidoArchivo = remplazar.remplazarContenido(contenidoArchivo,
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