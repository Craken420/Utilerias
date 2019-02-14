const path = require('path')
const fs = require('fs')
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
			return archivos.filter(archivo => extenciones.indexOf(path.extname(archivo)) > -1)
		}
		else if (typeof extenciones == 'string') {
			return archivos.filter(archivo => new RegExp(`${extenciones.replace('.','\\.')}`, ``).test(archivo))
		} else {
			console.log('Ingresa un arreglo o una cadena \'.extension\'')
		}
	} else {
		return archivos
	}
}

const filtrarExtensionManualIsFile = (archivos, extenciones) => { 
    if(extenciones != undefined || extenciones != null || extenciones != '') {

		if (Array.isArray(extenciones)) {
			return archivos.filter(archivo => extenciones.indexOf(path.extname(archivo)) > -1 && fs.statSync(archivo).isFile())
		}
		else if (typeof extenciones == 'string') {
			return archivos.filter(archivo => new RegExp(`${extenciones.replace(/\./,'\\.')}`, ``).test(archivo) && fs.statSync(archivo).isFile())
		} else {
			console.log('Ingresa un arreglo o una cadena \'.extension\'')
		}
	} else {
		return archivos
	}
}

module.exports.filtrarExtensionManual = filtrarExtensionManual
module.exports.filtrarExtension = filtrarExtension
module.exports.filtrarExtensionManualIsFile = filtrarExtensionManualIsFile