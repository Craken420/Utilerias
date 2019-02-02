const unirOriginalEsp = (objDominador, objDenominador) => {
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

module.exports.cmpOriginalEsp = unirOriginalEsp