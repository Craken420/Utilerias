const fs = require('fs')

/***
 * Función que verifica si el archivo esta vacio y lo elimina
 ***/
exports.eliminarArchivoVacio = (texto, archivo) => {
    if(!/\w+/g.test(texto)) {
        fs.unlinkSync(archivo)
        return
    }
}