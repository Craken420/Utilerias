const fs = require('fs')

/*** 
 * Crea un archivo en caso de que no exista
 * de forma contrarea, agregara el contenido al final
 * del contenido original del archivo existente
 * ***/
exports.agregarArchivo = (archivo, texto) => {
    fs.appendFileSync(archivo, texto, {flag:'as'})
}

/*** Crea un arhivo de forma sincrona ***/
exports.crearArchivo = (archivo, texto) => {
    fs.writeFileSync(archivo, texto)
}

/*** Lee un archivo de forma sincrona */
exports.leerArchivo = (archivo) => {
    return fs.readFileSync(archivo)
}

