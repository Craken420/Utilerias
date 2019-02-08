// ejemplo: var lista = listarArchivos(carpeta,['.esp'])
const fs = require('fs')
const path = require('path')

/***
 * Función que extrae los archivos de una carpeta filtrando por extensión
 * @carpeta ruta del directorio a examinar: 'c:\usuario\archivos'
 * @extenciones extensiones a filtrar: ['.frm'] o '.frm'
 ***/
exports.listarArchivos = (carpeta, extenciones) => {
	if(extenciones != undefined || extenciones != null || extenciones != '') {
	let archivos = fs.readdirSync(carpeta)

		if (Array.isArray(extenciones)) {
			return archivos.filter(x => extenciones.indexOf(path.extname(x)) > -1)
		}
		else if (typeof extenciones == 'string') {
			return archivos.filter(x => new RegExp(`${extenciones}$`, ``).test(x))
		} else {
			console.log('Ingresa un arreglo o una cadena \'.extension\'')
		}
	} else {
		return archivos
	}
}