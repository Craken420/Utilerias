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
	if(extenciones != undefined || extenciones != null || extenciones != '') {

        if (typeof extenciones == 'string') {

            return archivos.filter(x => new RegExp(`${extenciones}`, ``).test(x))
        } else {

            console.log('Ingresa un arreglo o una cadena \'.extension\'')
        }
    } else {
		return files
	}
}