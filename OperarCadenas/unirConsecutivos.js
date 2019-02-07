/*** Operadores de cadena ***/
let regEx = require('../RegEx/jsonRgx')

/*** 
 * Función que detecta en campos consecutivos y se cumple la regla
 * Regla: si se encuentra un continua al final de campo y 
 * el campo siguiente comienza con continua unirlos
***/
exports.unificarCamposConsecutivos = campos => {
    let arregloCampos = campos.split('\n')
    let cadenaCamposContinuos = ''

    for (key in arregloCampos) {
        if (key == 0){

            if (regEx.Expresiones.continuaFinal.test(arregloCampos[key])) {
                cadenaCamposContinuos += arregloCampos[key].replace(regEx.Expresiones.continuaFinal, '')
                
            } else {
                cadenaCamposContinuos = arregloCampos[key]
            }
        } else {

            if (regEx.Expresiones.continuaFinal.test(arregloCampos[key-1])) {

                if (regEx.Expresiones.continuaInicio.test(arregloCampos[key])) {

                    cadenaCamposContinuos += arregloCampos[key].replace(regEx.Expresiones.campoIntlsYcontinua, '')
                }
            }
        }
    }

    return cadenaCamposContinuos
}
