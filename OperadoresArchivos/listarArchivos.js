// ejemplo: var lista = listarArchivos(carpeta,['.esp'])

const fs = require('fs')
const path = require('path')

exports.listarArchivos = (carpeta,extenciones) => {
	var files = fs.readdirSync(carpeta)
	if(extenciones != undefined)
		return files.filter(x => extenciones.indexOf(path.extname(x)) > -1)
	else 
		return files
}