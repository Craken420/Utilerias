const { extraerContenidoRecodificado } = require('../Codificacion/contenidoRecodificado')

/*** Operadores de cadena ***/
const regEx  = require('../RegEx/jsonRgx')

function extraerCmpLista (archivo) {

    let contenidoArchivo = extraerContenidoRecodificado(archivo)

    if (regEx.Crear.campoSinDigito('ListaCarpetas').test(
            regEx.Extraer.extraerCmp(contenidoArchivo, 'Forma').join(''))
        ) {

        let cmpLista = contenidoArchivo.match(regEx.Crear.campoSinDigito('ListaCarpetas')).join('').replace(/.*=/g, '')

        if (/\(lista\)$/gi.test(cmpLista) && /^\[Forma.ListaCarpetas\]$/gim.test(contenidoArchivo)) {

            return  regEx.Extraer.extraerCmp(
                        contenidoArchivo, 'Forma.ListaCarpetas'
                    ).join('').match(/(?<=\=)(?!\(fin\)).*/gi)

        } else {

            return cmpLista.split('<BR>')
        }
    }
}

module.exports.extraerCmpLista = extraerCmpLista