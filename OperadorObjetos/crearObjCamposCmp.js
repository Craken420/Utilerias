/*** Operadores de cadena ***/
const regEx = require('../RegEx/jsonRgx')

/*** Operadores de objetos ***/
const opObj = require('./eliminarDuplicado')

/***
 * Función para crear la expresion regular "extraerCmpPorNom" con
 * el nombre del componente para extraer y retornar en un objeto
 * el contenido de los campos espesificados en "arregloCamposBusqueda".
 * Ejemplo: { Nombre:Contenido, Menu:Contenido, NombreDesplegar:contenido }.
 * @arregloCamposBusqueda campos a extraer del componente.
 * @nomComponente nombre del componente Intelisis que se extraera.
 * @texto contenido al que se le extraera el componente Intelisis.
 ***/
exports.crearObjCamposCmp = (arregloCamposBusqueda, nomComponente, texto) => {

    let expresionCmpPorNom = regEx.Crear.extraerCmpPorNom(nomComponente)

    if (expresionCmpPorNom.test(texto)) {

        let objCampo = {}
        
        let objCampos = arregloCamposBusqueda.map(campo => {
            if (regEx.Crear.contenidoCampo(campo).test(
                                                            texto.match(
                                                                expresionCmpPorNom
                                                            ).join('')
                                                        )) {
                objCampo[campo] = texto.match(
                                        expresionCmpPorNom
                                    ).join('').match(
                                        regEx.Crear.contenidoCampo(campo)
                                    ).join('')
            }
            return objCampo
        })

        return opObj.arregloSinDuplicado(objCampos)

    } else {
        return false
    }
}