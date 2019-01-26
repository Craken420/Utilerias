/*** Archivos ***/
const arrCampos = require('../Archivos/arregloCamposIntelisis')

/*** Operadores de cadena ***/
const regEx = require('../RegEx/jsonRgx')

/***
 * Ordena los campos consecutivos de intelisis con el método Short()
 * @texto contenido donde se encuentran los campos desordenados
 * @contenidoCamposConSinDigito campos extraidos con y sin digito
 * @campoSinDigito extrae el campo sin digito
 * @campoConDigito extrae los campos sin digito
 ***/
function ordenar (texto, contenidoCamposConSinDigito, campoSinDigito, campoConDigito) {
    // console.log('existeCampoConDigitos',existeCampoConDigitos)
    // console.log('contenidoCamposConSinDigito',contenidoCamposConSinDigito)
    // console.log('Existen campos con digitos en la ordenacion')
    let campoConDigitos = contenidoCamposConSinDigito.match(campoConDigito).join('\n')
    //console.log('campoConDigitos\n',campoConDigitos)

    let arregloCampoConDigitos = campoConDigitos.split('\n')
    //console.log(arregloCampoConDigitos)
    let cadenaCampoConDigitos = arregloCampoConDigitos.sort().join('\n')
    //console.log('cadenaCampoConDigitos\n',cadenaCampoConDigitos)
    let campoSinDigitos =  texto.match(campoSinDigito).join('\n')
    //console.log('campoSinDigitos',campoSinDigitos)
    let camposOrdenados = campoSinDigitos + '\n' + cadenaCampoConDigitos
    //console.log(camposOrdenados)

    return camposOrdenados
}

/***
 * Función que crea expresiones que extraen el campo y contenido
 * @campo descripcion del campo a buscar
 ***/
function crearExpresionesCampos (campo) {
    return {
        campoConDigito: regEx.crearRegEx.campoConDigito(campo),
        campoSinDigito: regEx.crearRegEx.campoSinDigito(campo),
        camposConSinDigito: regEx.crearRegEx.campoConSinDigito(campo)
    } 
}

/***
 * Funcion que detecta campos consecutivos y los ordena
 * @contenidoArchivo texto del archivo
***/
exports.extraerOrdenarCampos = function (contenidoArchivo) {
    let cont = 0
    let campoConDigito    = []
    let campoSinDigito    = []
    let contenidoOrdenado = []
    let expresiones       = []
    let campos = arrCampos.arregloCampos
    //console.log(arrCampos)
    //console.log(contenidoArchivo)
   
    for (campo in campos) {
        //console.log('arrCampos.arregloCampos',arrCampos.arregloCampos[campo])
        //console.log(arrCampos.arregloCampos[campo])
        expresiones.push(crearExpresionesCampos(campos[campo]))
        //console.log('expresion\n', expresion)
    }
    for(expresion in expresiones) {
    
        if (expresiones[expresion].campoConDigito.test(contenidoArchivo)) {
        //    console.log(expresiones[expresion])
        //     console.log(expresiones[expresion].campoConDigito.test(contenidoArchivo))
                //console.log(contenidoArchivo)
                //console.log(expresion.campoConDigito)
                //console.log('Campo a organizar: ', arrCampos.arregloCampos[campo])
                //console.log('existeCampoConDigito:\n', regEx.jsonTest.pruebaExiste(expresion.campoConDigito, contenidoArchivo))
                
                let contenidoCamposConSinDigito = ''
                contenidoCamposConSinDigito = contenidoArchivo.match(expresiones[expresion].camposConSinDigito).join('\n')
               // console.log(contenidoCamposConSinDigito)
                contenidoOrdenado.push(ordenar(contenidoArchivo, contenidoCamposConSinDigito, expresiones[expresion].campoSinDigito, expresiones[expresion].campoConDigito))
                campoConDigito.push(expresiones[expresion].campoConDigito)
                campoSinDigito.push(expresiones[expresion].campoSinDigito)
                
                //console.log(contenidoOrdenado)
                // console.log(cont++)
                //return contenidoOrdenado
            // } else {
            //     //console.log('Un \"campo sin digitos\" no es necesario organizar: ', arrCampos.arregloCampos[campo], campo)
        }
    }
    // for (key in contenidoOrdenado){
    //     console.log(contenidoOrdenado[key])
    // }
    return {
        campoConDigito: campoConDigito,
        campoSinDigito: campoSinDigito,
        contenidoOrdenado: contenidoOrdenado,
    }
}

