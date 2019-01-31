const regEx  = require('../RegEx/jsonRgx')

const clsCodigoAddTab = texto => {
    texto = texto + '\n['
    texto = regEx.jsonReplace.clsComentariosIntls(texto)
    texto = regEx.jsonReplace.clsSaltoLineaVacio(texto)
    texto = regEx.jsonReplace.addTabContenidoCmp(texto)
    texto = regEx.jsonReplace.clsIniCorcheteVacio(texto)
    return texto
}
module.exports.clsCodigoAddTab = clsCodigoAddTab