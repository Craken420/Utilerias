/***
 * Une dos objetos donde las propiedades del objDominador 
 * sera sobre-escrito por objDenominador
 * @objDominador objeto que sera sobre-escrito
 * @objDenominador objeto que sobre-escribira las propiedades del objeto con las suyas
 ***/
exports.unirOriginalSobrEscritura = (objDominador, objDenominador) => {
    for (key in objDominador) {
  
        if (objDenominador[key] != undefined) {
            let propiedadObj = Object.getOwnPropertyNames(objDenominador[key])

            for (key2 in propiedadObj) {
                objDominador[key][ propiedadObj[key2] ] = objDenominador[key][ propiedadObj[key2] ]
            }
        }

        delete objDenominador[key]
    }

  return  Object.assign(objDominador, objDenominador)
}