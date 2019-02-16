/*** Operadores de archivos ***/
const { crearNombreNomenclaturaArchivoEsp } = require('./crearNomenclatura_MaviEsp')
const { eliminarArchivoVacio } = require('./eliminarArchivoVacio')
const { eliminarArchivoVacioYCmpIncorrecto } = require('./eliminarCmpYArchivoVacio')
const { crearNomExtensionTipoEsp } = require('./crearNomExtensionTipoEsp')
const pcrArchivos = require('./procesadorArchivos')

/*** Operadores de Objetos ***/
const pcrArreglo = require('../OperadorObjetos/eliminarDuplicado')

/*** Operadores de cadena ***/
const regEx       = require('../RegEx/jsonRgx')

/***
 * Función que extrae los componentes diferentes al nombre del archivo
 * crea una nomenclatura determinada con el componente y su tipo
 * que sera usada como nombre para crear el archivo en caso de que no existe
 * de forma contrarea agregara los componentes al archivo existente
 * @expresion   extrae el texto de los Componentes Diferentes al Nombre del Archivo
 * @texto       contenido del archivo
 ***/
const crearNomenclaturaYArchivoOAdd = (expresion, texto) => {
    let txtCmpDiffNomArchivo = texto.match(expresion).join('\n') + '\n['

    if (regEx.Expresiones.nomExtCmp.test(txtCmpDiffNomArchivo)) {

        let arrNomExtCmpSinDuplx =  pcrArreglo.arregloSinDuplicado(
                                        txtCmpDiffNomArchivo.match(
                                            regEx.Expresiones.nomExtCmp
                                        )
                                    )

        let nombresArchivos  =  crearNombreNomenclaturaArchivoEsp(
                                    arrNomExtCmpSinDuplx
                                )
                                
        for (nomExtCmp in arrNomExtCmpSinDuplx) {

            let txtFinal =  txtCmpDiffNomArchivo.match(
                regEx.Crear.extraerCmpPorNom(arrNomExtCmpSinDuplx[ nomExtCmp ])
            ).join('\n')

            txtFinal = regEx.Agregar.addEspacioCmp(
                regEx.Borrar.clsIniCorcheteLineaVacia(
                    regEx.Borrar.clsSaltoLineaVacio(txtFinal)
                )
            )

            pcrArchivos.agregarArchivo(
                'Testing\\' + nombresArchivos[nomExtCmp],
                '\n' + txtFinal
            )
        }
    }
}

/***
 * Función para elimina archivos vacios usando la fn "eliminarArchivoVacio".
 * Extrae los componentes fuera del lugar (Que sean diferentes al nombre).
 * Crea nomenclatura con nombre y tipo del componente para nombre de archivo
 *      usando la función crearNombreExtensionTipoEsp
 * Crea archivos para esos componentes fuera de lugar o los agrega al correcto
 *      con el uso de crearArchivoOAgregarCmpEsp
 * A su vez elimina los componentes incorrectos en contenido, si queda vacio elimina el archivo
 * @archivo ruta del archivo
 * @texto   contenido del archivo
 ***/
exports.crearArchivoCmpAddCmpArchivo = (archivo, texto) => {

    eliminarArchivoVacio(texto, archivo)

    texto = texto + '\n['
    let textoBorrar = texto
    texto = regEx.Borrar.clsComentariosIntls(texto)

    let rgxExtraerCmpDiffNomArchivo = regEx.Crear.cmpDiffNomArchivo(
                        crearNomExtensionTipoEsp(archivo)
                    )

    if (rgxExtraerCmpDiffNomArchivo.test(texto)) {

        crearNomenclaturaYArchivoOAdd(rgxExtraerCmpDiffNomArchivo, texto)

        textoBorrar = eliminarArchivoVacioYCmpIncorrecto(
            archivo, rgxExtraerCmpDiffNomArchivo, textoBorrar
        )

        pcrArchivos.crearArchivo(archivo, textoBorrar)
    }
}
