/*** Operadores de cadena ***/
const organizar     = require('../OperarCadenas/ordenarCampos')
const unir          = require('../OperarCadenas/unirConsecutivos')

/*** 
 * Une los campos consecutivos de un componente Intelisis
 * @componente Componente Intelisis con campos consecutivos
***/
exports.camposComponente = componente => {
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
