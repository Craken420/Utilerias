/*** Operadores de cadena ***/
const regEx = require('../RegEx/jsonRgx')

/***
 * Funcionción que crea una expresion regular con las dos pirmeras y ultimas lineas del @contenidoARemplazar
 * y con la expresion remplaza el contenido en el @contenidoOriginal con el contenido de remplazo
 * @contenidoOriginal Contenido general al que se le remplazara un texto pequeño
 * @contenidoARemplazar Informacion que se quiere remplazar en @contenidoOriginal
 * @contenidoParaRemplazo Informacion para remplazar a @contenidoARemplazar
 ***/
exports.remplazarContenido =  ( contenidoOriginal, contenidoARemplazar,
                                contenidoParaRemplazo) => {
  
    if (/(.*?\n){4,}/.test(contenidoARemplazar)) {
        let primerasDosLineas = regEx.Extraer.extraerPrimerasDosLineas(contenidoARemplazar)
        let ultimasDosLineas  = regEx.Extraer.extraerUltimasDosLineas(contenidoARemplazar)

        return  contenidoOriginal.replace(
                    regEx.Crear.deInicioAFin(primerasDosLineas, ultimasDosLineas),
                    contenidoParaRemplazo
                )
    } else {
        return contenidoOriginal.replace(new RegExp(`${regEx.Preparar.prepararRegEx(
            contenidoARemplazar
        )}`, ``), contenidoParaRemplazo)
    }
}

const remplazarContenidoUnido =  ( contenidoOriginal, contenidoARemplazar,
    contenidoParaRemplazo) => {
        if(contenidoARemplazar.split('\r\n').length == 1) {
            if (/.{100}/.test(contenidoARemplazar)){
               // console.log('contenidoARemplazar solo tiene una linea mayor a 100 caracteres')
            
                let inicio = regEx.Preparar.prepararRegEx(contenidoARemplazar.match(/.{50}/).join(''))
                let fin = regEx.Preparar.prepararRegEx(contenidoARemplazar.match(/.{50}$/m).join('')).replace(/(\\s)+(\\n)+$/,'')

                return contenidoOriginal.replace(
                    new RegExp(`${inicio}[^]*${fin}`, ``),
                    contenidoParaRemplazo
                )
            } else {
                //console.log('contenidoARemplazar solo tiene una linea menor a 80 caracteres')
                return  contenidoOriginal.replace(
                    new RegExp(`${regEx.Preparar.prepararRegEx(
                        contenidoARemplazar
                    )}`, ``),
                    contenidoParaRemplazo
                )
            }
        } else if (contenidoARemplazar.split('\r\n').length <= 3) {
           // console.log('contenidoARemplazar menor a 3 lineas')
            let primerasDosLineas = regEx.Extraer.extraerPrimeraLinea(contenidoARemplazar)
            let ultimasDosLineas  = regEx.Extraer.extraerUltimaLinea(contenidoARemplazar)
    
            return  contenidoOriginal.replace(
                        regEx.Crear.deInicioAFin(primerasDosLineas, ultimasDosLineas),
                        contenidoParaRemplazo
                    )
        } else if (contenidoARemplazar.split('\r\n').length >= 4) {
            //console.log('contenidoARemplazar mayor o igual a 4 lineas')
            let primerasDosLineas = regEx.Extraer.extraerPrimerasDosLineas(contenidoARemplazar)
            let ultimasDosLineas  = regEx.Extraer.extraerUltimasDosLineas(contenidoARemplazar)
    
            return  contenidoOriginal.replace(
                        regEx.Crear.deInicioAFin(primerasDosLineas, ultimasDosLineas),
                        contenidoParaRemplazo
                    )
        }
}

module.exports.remplazarContenidoUnido = remplazarContenidoUnido