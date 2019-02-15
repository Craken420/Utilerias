/*** Operadores de cadena ***/
const { extraerOrdenarCampos } = require('./ordenarCampos')
const { remplazarContenidoUnido } = require('./remplazarContenido')
const regEx = require('../RegEx/jsonRgx')
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
    let contenidoModificado = contenidoArchivo
    contenidoModificado = regEx.Borrar.clsComentariosIntls(contenidoModificado)

    let componentesArchivo = contenidoModificado.match(
        regEx.Expresiones.componentesIntls
    )

    for (componente in componentesArchivo) {
        if (regEx.Expresiones.campoConsecutivoIntls.test(componentesArchivo[componente])) {
            contenidoArchivo = remplazarContenidoUnido(contenidoArchivo,
                componentesArchivo[componente],
                ordenarUnirCampos(
                    componentesArchivo[componente]
                )
            )
        }
    }

    contenidoArchivo = regEx.Borrar.clsIniCorcheteLineaVacia(contenidoArchivo)
    contenidoArchivo = regEx.Borrar.clsSaltoLineaVacio(contenidoArchivo)
    contenidoArchivo = regEx.Agregar.addEspacioCmp(contenidoArchivo)

    return contenidoArchivo
}