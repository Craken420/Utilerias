exports.decode = texto => {

	let objeto = {}

	if (!/^\[.*?(?:\]$)/gm.test(texto)) return objeto

	let componentes = texto.match(/^\[.*?\]((\r|\n)((?!\[.*?\]).*))+/gm)

	componentes.forEach(componente => {

		let componenteTitulo = componente.match(
			/^\[.*?(?:\]$)/gm
		).join().replace('[','').replace(']','')

		if(/^(\w|\().*/gm.test(componente)) {
			objeto[componenteTitulo] = {}
			let lineas = componente.match(/^(\w|\().*/gm)
			lineas.forEach(linea => {
				let campo = linea.match(/^.*?=/gm)
				campo = campo ? campo.join('').replace(/=$/gm,'').replace(/'/gm,"''") : 'NULL'
				let valor = linea.match(/(?!\w)=.*/gm)
				valor = valor ? valor.join('').replace(/^=/gm,'').replace(/'/gm,"''") : 'NULL'
				if(objeto[componenteTitulo][campo] == undefined) {
					objeto[componenteTitulo][campo] = valor.trim()
				}
			})
		}
	})
	return objeto
}