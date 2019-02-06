const regEx = require('../RegEx/jsonRgx')
// const fq = require('./procesadorArchivos')
// const procesadorObjetos = require('./procesadorObjetos')
// const carpetas = require('./carpetas')
// const extractorObjetos = require('./extractorObjetos')

function extraerContenidoAcceso (acceso, expresionAcceso, texto) {
    let contenidoAcceso = ''
    // console.log('acceso',acceso)
    // console.log('expresionAcceso',expresionAcceso)
    //fq.crearArchivo(carpetas.carpetaTesting + '3.-contenidoTexto.txt', texto)
    if (expresionAcceso.test(texto)){
        contenidoAcceso = texto.match(expresionAcceso).join('')
        //fq.appendArchivo(carpetas.carpetaTesting + '3.-contenidoAcceso' + acceso + '.txt', contenidoAcceso)
        return contenidoAcceso
    }
}

function crearExpresion (texto) {
    let expresionAcceso =  new RegExp(`^\\[(.*?|)${regEx.jsonReplace.prepararRegEx(texto)}[^*]*?(?=^\\[)`, `gm`)
    let expresionVariables =  new RegExp(`^\\[${regEx.jsonReplace.prepararRegEx(texto)}\\][^~]*?(?=^\\[)`, `gm`)
    //console.log('expresionAcceso',expresionAcceso)
    return {
        expresionAcceso: expresionAcceso,
        expresionVariables: expresionVariables
    }
}

exports.extraerAcceso =  function (acceso, texto) {
    texto = texto + '\n['
    texto = regEx.jsonReplace.clsComentariosIntls(texto)
    
    let extraccionReducida = ''
        //console.log('Acceso',acceso)
       
        let expresionAcceso =  crearExpresion(acceso)
        //console.log(expresionAcceso.expresionAcceso)
        extraccionReducida = extraerContenidoAcceso(acceso, expresionAcceso.expresionAcceso, texto)

        return extraccionReducida
}