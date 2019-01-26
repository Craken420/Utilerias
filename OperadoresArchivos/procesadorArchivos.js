const fs = require('fs')

/*** Crea un arhivo de forma sincrona ***/
exports.crearArchivo = function (archivo, texto) {
    fs.writeFileSync(archivo, texto)
}

/*** Lee un archivo de forma sincrona */
exports.leerArchivo = function (archivo) {
    return fs.readFileSync(archivo)
}

