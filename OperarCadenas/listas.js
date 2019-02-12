const { extraerContenidoRecodificado } = require('../Codificacion/contenidoRecodificado')
const { operarCambio } = require('../OperarCadenas/cambiarContenidoCampo')
const pcrArchivos = require('../OperadoresArchivos/procesadorArchivos')

/*** Operadores de cadena ***/
const regEx  = require('../RegEx/jsonRgx')

function listar (archivo) {

    let contenidoArchivo = extraerContenidoRecodificado(archivo)

    if (regEx.Crear.campoSinDigito('ListaCarpetas').test(contenidoArchivo)) {

        lista = contenidoArchivo.match(regEx.Crear.campoSinDigito('ListaCarpetas')).join('').replace(/.*=/g, '')

        if (/<BR>/g.test(lista)) {

            let newList = lista.split('<BR>')
            console.log('Lista con <BR>: ',lista.split('<BR>'))

            for (key in newList) {

                let respuesta = operarCambio(
                    archivo,
                    'Negro',
                    'FichaColorFondo',
                    newList[key],
                    'Plata'
                )

                if (respuesta != false){
                    pcrArchivos.crearArchivo(archivo, respuesta)
                }
            }
        } else {
            let respuesta = operarCambio(
                archivo,
                'Negro',
                'FichaColorFondo',
                lista,
                'Plata'
            )

            if (respuesta != false){

                pcrArchivos.crearArchivo(archivo, respuesta)
            }
        }
    }
}

module.exports.listar = listar