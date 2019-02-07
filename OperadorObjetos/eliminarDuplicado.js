const regEx = require('../RegEx/jsonRgx')

/*** 
 * Módulo que elimina los duplicados de un objeto
 * @arreglo arreglo con objetos duplicados
 ***/
const camposConsecutivosSinDuplicado = arreglo => {

    let expresiones = eliminarDuplicado(arreglo.map(x => {
        return  x.replace(/=.*/g, '')})).map(x => {
        return new RegExp(`^${x}.*`, `m`)
    })

    let camposSinDuplicado = ''

    for(expresion in expresiones) {

        camposSinDuplicado += '\n' + arreglo.join('\n').match(expresiones[expresion])
    }

    return regEx.Borrar.clsSaltoLineaVacio(camposSinDuplicado).split('\n')
}

const eliminarDuplicado = arreglo => {
    let set =new Set( arreglo.map( JSON.stringify))
    //console.log(set)
    return Array.from(set).map( JSON.parse )
}

module.exports.arregloSinDuplicado = eliminarDuplicado
module.exports.camposConsecutivosIntlsSinDuplicado = camposConsecutivosSinDuplicado