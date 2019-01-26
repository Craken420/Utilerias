/*** Archivos ***/
const carpetas    = require('../Archivos/carpetas')

/*** Operadores de cadena ***/
const organizar     = require('../OperarCadenas/ordenarCampos')
const unir          = require('../OperarCadenas/unirConsecutivos')

/*** Operadores de archivos ***/
const pcrArchivos =  require('../OperadoresArchivos/procesadorArchivos')

/*** 
 * Une los campos consecutivos de un componente Intelisis
 * @componente Componente Intelisis con campos consecutivos
***/
exports.camposComponente = function (componente) {
    //console.log(componente)
    let camposOrdenados = organizar.extraerOrdenarCampos(componente)
    // console.log(camposOrdenados.contenidoOrdenado)
    let camposUnificados = []

    for (contenido in camposOrdenados.contenidoOrdenado){
        camposUnificados.push(unir.unificarCamposConsecutivos(camposOrdenados.contenidoOrdenado[contenido]))
        //console.log('camposUnificados', typeof(camposUnificados))
        //pcrArchivos.crearArchivo('Testing/camposUnificados' + campo + '.txt', camposUnificados)
        //console.log('camposOrdenados.campoConDigito[key4]',camposOrdenados.campoConDigito[key4])
    }

    for (campoD in camposOrdenados.campoConDigito) {
        //console.log('camposOrdenados.campoSinDigito[key4]',camposOrdenados.campoConDigito[campoD])
        componente = componente.replace(
            camposOrdenados.campoConDigito[campoD], ''
        )
    }

    for (campoS in camposOrdenados.campoSinDigito) {
        //console.log('camposOrdenados.campocONdIGIT',camposOrdenados.campoSinDigito[campoS])
        for (campoU in camposUnificados) {
            if (campoS == campoU){
                //console.log('camposOrdenados.campoU',camposUnificados[campoU])
                componente = componente.replace(
                    camposOrdenados.campoSinDigito[campoS], camposUnificados[campoU]
                )
            }
        }
    }
    //console.log(nuevoContenido)
    // let cadenaComponentes = regEx.jsonReplace.clsSaltoLineaVacio(componentesArchivo.join('\n'))
    //pcrArchivos.crearArchivo(carpetas.carpetaTesting + 'nu.txt',componente)
    return componente
}
