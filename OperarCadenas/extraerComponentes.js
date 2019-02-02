const regex = require('../RegEx/jsonRgx')

/** Aun falta determinar su uso ***/
exports.extraerComponentes = contenidoArchivo => {
    contenidoArchivo = contenidoArchivo + '\n['

    let acciones = contenidoArchivo.match(regex.expresiones.componentesIntls)
    for (key in acciones) {
        let nombreAccion = acciones[key].match(regex.expresiones.nomAccion)

        if (nombreAccion != null) {
            appendArchivo(
                carpeta + '3.-ObjetosEncontrados.txt', 
                '\t\t' + nombreAccion + ':'
            )
        }
        
        if (acciones[key] != null) {
            let textoFinal = extraerObjetosCampo(texto, tipoCampo)
            if(textoFinal != null && textoFinal != undefined) {
                fq.crearArchivoPrueba(archivo,
                    regex.jsonReplace.clsSaltoLineaVacio(textoFinal)
                )
            }
        }
    }
}