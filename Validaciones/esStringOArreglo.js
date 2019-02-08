const { validarParametrosVacios } = require('../Validaciones/validarParametrosVacios')

const determinarStringOArreglo = (anonimo) => {
    if(validarParametrosVacios(arguments)) {

		if (Array.isArray(anonimo)) {
			return 'arreglo'
		}
		else if (typeof anonimo == 'string') {
			return 'string'
		} else {
            console.log('Ingresa un arreglo o una cadena \'.extension\'')
            return 'otro'
		}
	} else {
		return console.log('Parametros vacios')
	}
}

module.exports.determinarStringOArreglo = determinarStringOArreglo