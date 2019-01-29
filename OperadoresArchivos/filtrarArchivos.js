/*** 
 * Función para filtrar los archivos
 * @archivos Arreglo contenedor de las rutas de los archivos
 ***/
exports.filtrarExtension = archivos => {
    return archivos.filter(archivo => /\.esp$/i.test(archivo))
}