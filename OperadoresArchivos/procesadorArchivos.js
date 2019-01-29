const fs = require('fs')

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

