const rgx = require('../RegEx/jsonRgx')

exports.decode = (texto) => {
	let objeto = {}

	if(rgx.Expresiones.tituloComponente.test(texto)) {

		let componentes = texto.match(rgx.Expresiones.componentesIntls)

		componentes.forEach(componente => {

			let componenteTitulo = componente.match(
				rgx.Expresiones.tituloComponente
				).join().replace('[','').replace(']','')

			if(/^\w.*/gm.test(componente)) {

				objeto[componenteTitulo] = {}

				let lineas = componente.match(/^\w.*/gm)

				lineas.forEach(linea => {

					let campo = linea.match(/^.*?=/gm)

					campo = campo ? campo.join('').replace(
						/=$/gm,'').replace(/'/gm,"''") : 'NULL'

					let valor = linea.match(/(?!\w)=.*/gm)

					valor = valor ? valor.join('').replace(
						/^=/gm,'').replace(/'/gm,"''") : 'NULL'

					if(objeto[componenteTitulo][campo] == undefined) {

						objeto[componenteTitulo][campo] = valor.trim()
					} 
					// si se repite un campo en un mismmo comonente debe de tomar el primero
				})
			}
		})
	}

	return objeto
}