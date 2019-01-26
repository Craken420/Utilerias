/*** Operadores de cadena ***/
let regEx = require('../RegEx/jsonRgx')

/*** 
 * Función que detecta en campos consecutivos y se cumple la regla
 * Regla: si se encuentra un continua al final de campo y 
 * el campo siguiente comienza con continua unirlos
***/
exports.unificarCamposConsecutivos = function (campos) {
    //console.log(campos)
    // console.log('Existen campos con digitos en la union')
    //fq.crearArchivo(carpetas.carpetaTesting + 'camposOrdenados.txt',camposOrdenados)
    let arregloCampos = campos.split('\n')
    let cadenaCamposContinuos = ''
    //console.log('arregloCamposOrdenados',arregloCamposOrdenados)
    //console.log('arregloCamposOrdenados',arregloCamposOrdenados)
    for (key in arregloCampos) {
        if (key == 0){
        //console.log(arregloCampos[key2])
   
            if (regEx.expresiones.continuaFinal.test(arregloCampos[key])) {
                cadenaCamposContinuos += arregloCampos[key].replace(regEx.expresiones.continuaFinal, '')
            } else {
                cadenaCamposContinuos = arregloCampos[key]
            }
        } else {
            //let exist = 
            if (regEx.expresiones.continuaFinal.test(arregloCampos[key-1])) {
                //console.log(exist)
                //console.log('El anterios tiene continua al final', arregloExpresionesOrdenadas[key-1])
                
                if (regEx.expresiones.continuaAlInicio.test(arregloCampos[key])) {
                    
                    //console.log('Existe continua al inicio', arregloExpresionesOrdenadas[key])
                    cadenaCamposContinuos += arregloCampos[key].replace(regEx.expresiones.campoYcontinua, '')
                    //break
                }// else {
                //     break
                // }
            } 
            // else {
            //     break
            // }
        }
    }
    //console.log('arregloCamposOrdenados[0]',arregloCamposOrdenados[0])
    //console.log('cadenaCamposContinuas',cadenaCamposContinuos)
    //fq.crearArchivoPrueba(carpetas.carpetaTesting + 'cadenaCamposContinuos.txt',cadenaCamposContinuos)
    return cadenaCamposContinuos
}
