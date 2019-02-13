const { extraerContenidoRecodificado } = require('../Codificacion/contenidoRecodificado')
const { operarCambio } = require('../OperarCadenas/cambiarContenidoCampo')
const pcrArchivos = require('../OperadoresArchivos/procesadorArchivos')

/*** Operadores de cadena ***/
const regEx  = require('../RegEx/jsonRgx')

function extraerCmpLista (archivo) {

    let contenidoArchivo = extraerContenidoRecodificado(archivo)

    if (regEx.Crear.campoSinDigito('ListaCarpetas').test(contenidoArchivo)) {

        let cmpLista = contenidoArchivo.match(regEx.Crear.campoSinDigito('ListaCarpetas')).join('').replace(/.*=/g, '')

        if (/<BR>/g.test(cmpLista)) {

            return cmpLista.split('<BR>')
        } else {

            return cmpLista.split('\r')
        }
    }
}

module.exports.extraerCmpLista = extraerCmpLista