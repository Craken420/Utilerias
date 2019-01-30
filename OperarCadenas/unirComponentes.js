exports.unifica = function(original,especial,nombreArchivo){
	let prepare = nombreArchivo.replace('.','\\.')
	let regex = new RegExp(`${prepare}`,'gi')
	for(comp in especial){
	
		let compBase = comp.split('/')[1]

		if(original[compBase] == undefined) original[compBase] = {}

		for(lin in especial[comp]) {
		
			if(original[compBase][lin] == especial[comp][lin])
				fs.appendFileSync('log.txt',`Estetico: en el componete: ${compBase} el campo: ${lin} y valor ya esta igual en el objeto original\n`)
			if(original[compBase][lin] == undefined)
			original[compBase][lin] = {}
			original[compBase][lin] = especial[comp][lin]
		}
		let minimo = Object.keys(original[compBase]).filter(x => !/\d{3}$/gm.test(x))
		minimo.forEach(min => {
			let secuencia = 2
			let siguiente = min+'0'.repeat(3-secuencia.toString().length)+secuencia
			let actual = min
			while(/<CONTINUA>$/gm.test(original[compBase][actual]) && /^<CONTINUA>/gm.test(original[compBase][siguiente])){
				// console.log(actual,siguiente,compBase,min,/<CONTINUA>$/gm.test(original[compBase][min]))
				// console.log(/^<CONTINUA>/gm.test(original[compBase][siguiente]),actual,siguiente,compBase)
				original[compBase][min] = original[compBase][min].replace(/<CONTINUA>$/gm,'') + original[compBase][siguiente].replace(/^<CONTINUA>/gm,'')
				secuencia++
				siguiente = min+'0'.repeat(3-secuencia.toString().length)+secuencia
			}
			original[compBase][min] = original[compBase][min].replace(/<CONTINUA>$/gm,'')
			original[compBase][min] = original[compBase][min].replace(/<BR>$/gm,'')
			if(/<BR>/gm.test(original[compBase][min])){
				original[compBase][min] = original[compBase][min].split('<BR>')
			}
			// console.log(compBase,min,original[compBase][min])
			// console.log(original[compBase][min])
		})
		let borrar = Object.keys(original[compBase]).filter(x => /\d{3}$/gm.test(x))
		borrar.forEach(borr => delete original[compBase][borr])//console.log(borr))//original[compBase][borr]) )
		// console.log(Object.keys(original[compBase]).filter(x => !/\d{3}$/gm.test(x)))
	}

	if(original['Dialogo']['ListaAcciones.Cambios']){
		original['Dialogo']['ListaAcciones.Cambios'].forEach(x => {
			original['Dialogo']['ListaAcciones'].push(x.split('<TAB>')[1])
		})
		delete original['Dialogo']['ListaAcciones.Cambios']
	}

	let listaDuplicados = buscarDuplicado(original['Dialogo']['ListaAcciones'])
	if(listaDuplicados.length > 0){
		listaDuplicados.forEach((x,k) => {
			fs.appendFileSync('log.txt',`Funcional: en el archivo: ${nombreArchivo} en ListaAcciones esta duplicado: ${x}\n`)
			original['Dialogo']['ListaAcciones'].splice(k,1)
		})
	}

	return original
}
