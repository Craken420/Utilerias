/*** Operadores de archivos ***/
const pcrArchivos = require('../OperadoresArchivos/procesadorArchivos')
const eliminarArchivo = require('../OperadoresArchivos/eliminarArchivoVacio')

/*** Operadores de Objetos ***/
const pcrArreglo = require('../OperadorObjetos/eliminarDuplicado')

/*** Operadores de cadena ***/
const regEx       = require('../RegEx/jsonRgx')

/***
 * Función para eliminar el componente incorrecto y validar si esta vacio
 * o solo con comentarios para eliminarlo
 * @archivo   archivo al cual se le eliminara el contenido
 * @expresion abarca el bloque de información que sera eliminada
 * @texto     contenido que se almacenara en el archivo 
 *            despues de operar con la expresion
 ***/
const eliminarArchivoVacioYCmpIncorrecto = (archivo, expresion, texto) => {
    texto = texto.replace(expresion, '')
    texto = texto.replace(/\[(?!(\s+|)\w)/gi, '')
    if(!/\w+/g.test(regEx.jsonReplace.clsComentariosIntls(texto))) {
        eliminarArchivo.eliminarArchivoVacio(texto, archivo)
    }

    return texto
}

/*** 
 * Función que crea una nomenclatura que se usara como nombre de archivo
 * Ejemplo: recive Archivo.frm y retorna en Archivo_FRM_MAVI.esp
 * @arreglo Contiene los nombres que seran transformados
 ***/
const crearNombreNomenclaturaArchivoEsp = (arreglo) => {
    return arreglo.map(
        x => {
            x = x.replace(/\.(?=(frm|vis|tbl|dlg|rep))/gi, '_') + '_MAVI.esp'
            x = x.replace(/(?<=\_)\w+(?=\_)/gi, x => x.toUpperCase())
            return x
        }
    )
}

/***
 * Función que recive un archivo con la nomenclaruta Archivo_FRM_MAVI.esp
 * y retorna Archivo.frm
 * @archivo ruta del archivo
 ***/
const crearNombreExtensionTipoEsp = archivo => {
    return  regEx.jsonReplace.minusculasPorMayuscula(
                regEx.jsonReplace.puntoPorGuionBajoTipoEsp(
                    regEx.jsonReplace.extraerNomTipoEsp(archivo)
                )
            )
}

/***
 * Función que crea un archivo con la nomenclatura determinada dependiendo el archivo
 * agregando los componentes al archivo correcto
 * @expresion   extrae el texto de los Componentes Diferentes al Nombre del Archivo
 * @texto       contenido del archivo
 ***/
const crearArchivoOAgregarCmp = (expresion, texto) => {
    let txtCmpDiffNomArchivo = texto.match(expresion).join('\n') + '\n['

    if (regEx.expresiones.nomExtCmp.test(txtCmpDiffNomArchivo)) {

        let arrNomExtCmpSinDuplx =  pcrArreglo.arregloSinDuplicado(
                                        txtCmpDiffNomArchivo.match(
                                            regEx.expresiones.nomExtCmp
                                        )
                                    )

        let nombresArchivos  =  crearNombreNomenclaturaArchivoEsp(
                                    arrNomExtCmpSinDuplx
                                )

        for (nomExtCmp in arrNomExtCmpSinDuplx) {

            let txtFinal =  txtCmpDiffNomArchivo.match(
                regEx.crearRegEx.extraerCmpPorNom(arrNomExtCmpSinDuplx[ nomExtCmp ])
            ).join('\n')

            txtFinal = regEx.jsonReplace.clsSaltoLineaVacio(txtFinal)
            txtFinal = regEx.jsonReplace.clsIniCorcheteVacio(txtFinal)

            pcrArchivos.agregarArchivo(
                'ArchivosOriginales\\' + nombresArchivos[nomExtCmp],
                '\n' + txtFinal
            )
        }
    }
}

/***
 * Función que detecta si un componente esta fuera de lugar y si es el caso
 * crea Archivos con nomenclaruta de los componentes
 * agregando el contenido de los componentes al archivo correcto
 * @archivo ruta del archivo
 * @texto   contenido del archivo
 ***/
exports.crearArchivoCmpAddCmpArchivo = (archivo, texto) => {
    eliminarArchivo.eliminarArchivoVacio (texto, archivo)
    texto = texto + '\n['
    let textoBorrar = texto
    texto = regEx.jsonReplace.clsComentariosIntls(texto)

    let rgxExtraerCmpDiffNomArchivo = regEx.crearRegEx.cmpDiffNomArchivo(
                        crearNombreExtensionTipoEsp(archivo)
                    )

    if (rgxExtraerCmpDiffNomArchivo.test(texto)) {

        crearArchivoOAgregarCmp(rgxExtraerCmpDiffNomArchivo, texto)

        textoBorrar = eliminarArchivoVacioYCmpIncorrecto(
            archivo, rgxExtraerCmpDiffNomArchivo, textoBorrar
        )

        pcrArchivos.crearArchivo(archivo, textoBorrar)
    }
}