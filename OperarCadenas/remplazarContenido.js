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