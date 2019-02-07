/*** Archivos ***/
const arrCampos = require('../Archivos/arregloCamposIntelisis')

const sinDuplicado = require('../OperadorObjetos/eliminarDuplicado')

/*** Operadores de cadena ***/
const regEx = require('../RegEx/jsonRgx')

/***
 * Ordena los campos consecutivos de intelisis con el método Short()
 * @texto contenido donde se encuentran los campos desordenados
 * @contenidoCamposConSinDigito campos extraidos con y sin digito
 * @campoSinDigito extrae el campo sin digito
 * @campoConDigito extrae los campos sin digito
 ***/
const ordenar = (texto, contenidoCamposConSinDigito,
                 campoSinDigito, campoConDigito) => {

    return  texto.match(campoSinDigito).join('\n') + 
         '\n' + sinDuplicado.camposConsecutivosIntlsSinDuplicado(
                contenidoCamposConSinDigito.match(campoConDigito)).sort().join('\n')
}

/***
 * Función que crea expresiones que extraen el campo y contenido
 * @campo descripcion del campo a buscar
 ***/
const crearExpresionesCampos = campo => {
    return {
        campoConDigito: regEx.Crear.campoConDigito(campo),
        campoSinDigito: regEx.Crear.campoSinDigito(campo),
        camposConSinDigito: regEx.Crear.campoConSinDigito(campo)
    } 
}

/***
 * Funcion que detecta campos consecutivos y los ordena
 * retornando 3 arreglos
 *  1: campoConDigito - campos extraidos con digito,
 *  2: campoSinDigito - campos extraidos sin digito,,
 *  3: contenidoOrdenado - campos ordendos
 * Ejemplo:
 *     Recive:  ListaCampos=Articulo<BR>RamaListaCampos1 <B<CONTINUA>
 *              ListaCampos002=<CONTINUA>R>TieneCaducidad
 *
 *     Retorna: ListaCampos=Articulo<BR>RamaListaCampos1 <BR>TieneCaducidad
 * @contenidoArchivo texto del archivo
***/
exports.extraerOrdenarCampos = (contenidoArchivo) => {
    let campoConDigito    = []
    let campoSinDigito    = []
    let contenidoOrdenado = []
    let expresiones       = []

    for (campo in arrCampos.arregloCampos) {

        expresiones.push(crearExpresionesCampos(arrCampos.arregloCampos[campo]))
    }
    for(expresion in expresiones) {

        if (expresiones[expresion].campoConDigito.test(contenidoArchivo)) {

            campoConDigito.push(expresiones[expresion].campoConDigito)
            campoSinDigito.push(expresiones[expresion].campoSinDigito)

            contenidoOrdenado.push(
                ordenar(
                    contenidoArchivo,
                    contenidoArchivo.match(
                        expresiones[expresion].camposConSinDigito
                    ).join('\n'),
                    expresiones[expresion].campoSinDigito,
                    expresiones[expresion].campoConDigito
                )
            )
        }
    }

    return {
        campoConDigito: campoConDigito,
        campoSinDigito: campoSinDigito,
        contenidoOrdenado: contenidoOrdenado
    }
}
