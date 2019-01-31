/*** 
 * Función para filtrar los archivos
 * @archivos Arreglo contenedor de las rutas de los archivos
 ***/
exports.filtrarExtension = archivos => {
    return archivos.filter(archivo => /\.sql|\.vis|\.frm|\.esp|\.tbl|\.rep|\.dlg$/i.test(archivo))
}