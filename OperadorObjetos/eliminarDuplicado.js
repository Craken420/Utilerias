/*** 
 * Módulo que elimina los duplicados de un objeto
 * @arreglo arreglo con objetos duplicados
 ***/
exports.arregloSinDuplicado = arreglo => {
    return Array.from( new Set( arreglo.map( JSON.stringify ))).map( JSON.parse )
}