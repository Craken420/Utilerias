const { validarParametrosVacios } = require('../Validaciones/validarParametrosVacios')

const determinarStringOArreglo = (anonimo) => {
		if (Array.isArray(anonimo) == true) {
			return 'arreglo'
		}
		else if (typeof anonimo == 'string') {
			return 'string'
		} else {
			console.log(`Los tipo ${typeof(anonimo)} no son validos`)
			return 'otro'
		}
}

module.exports.determinarStringOArreglo = determinarStringOArreglo