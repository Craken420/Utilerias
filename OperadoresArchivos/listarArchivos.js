// ejemplo: var lista = listarArchivos(carpeta,['.esp'])
const fs = require('fs')
const path = require('path')

/***
 * Función que extrae los archivos de una carpeta filtrando por extensión
 * @carpeta ruta del directorio a examinar
 * @extenciones extensiones a filtrar
 ***/
exports.listarArchivos = (carpeta, extenciones) => {
	let files = fs.readdirSync(carpeta)
	if(extenciones != undefined)
		return files.filter(x => extenciones.indexOf(path.extname(x)) > -1)
	else 
		return files
}