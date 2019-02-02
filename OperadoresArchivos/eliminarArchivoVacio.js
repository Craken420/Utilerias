const fs = require('fs')

/***
 * Función que verifica si el archivo esta vacio y lo elimina
 * @texto contenido del archivo
 * @archivo ruta del archivo a eliminar
 ***/
exports.eliminarArchivoVacio = (texto, archivo) => {
    if(!/\w+/g.test(texto)) {
        fs.unlinkSync(archivo)
        return
    }
}