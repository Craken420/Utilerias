const path = require('path')

/*** 
 * Función para filtrar los archivos
 * @archivos Arreglo contenedor de las rutas de los archivos
 ***/
const filtrarExtension = archivos => {
    return archivos.filter(archivo => /\.sql|\.vis|\.frm|\.esp|\.tbl|\.rep|\.dlg$/i.test(archivo))
}

/*** 
 * Función para filtrar los archivos
 * @archivos Arreglo contenedor de las rutas de los archivos
 ***/
const filtrarExtensionManual = (archivos, extenciones) => { 
    if(extenciones != undefined || extenciones != null || extenciones != '') {

		if (Array.isArray(extenciones)) {
			return archivos.filter(x => extenciones.indexOf(path.extname(x)) > -1)
		}
		else if (typeof extenciones == 'string') {
			return archivos.filter(x => new RegExp(`${extenciones}`, ``).test(x))
		} else {
			console.log('Ingresa un arreglo o una cadena \'.extension\'')
		}
	} else {
		return archivos
	}
}

module.exports.filtrarExtensionManual = filtrarExtensionManual
module.exports.filtrarExtension = filtrarExtension