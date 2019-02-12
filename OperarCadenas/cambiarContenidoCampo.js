const { extraerContenidoRecodificado } = require('../Codificacion/contenidoRecodificado')

const pcrArchivos = require('../OperadoresArchivos/procesadorArchivos')

/*** Operadores de cadena ***/
const regEx  = require('../RegEx/jsonRgx')
const { remplazarContenido } = require('./remplazarContenido')


function remplazarCampoConCondicionContenidoCmp (archivo, contenidoArchivo, condicionContenido,
    nomCampo, nomCmp, nuevoContenidoCampo) {

   
    if (new RegExp(`\\[${nomCmp}\\]`,`gi`).test(contenidoArchivo)) {

        let componenteSelecionado = regEx.Extraer.extraerCmp(contenidoArchivo, nomCmp).join('')

        console.log(`------------------------------------------------------------------\n`)
        console.log('***  Deteccion ***\n')
        console.log(`Archivo: \"${regEx.Borrar.clsRuta(archivo)}\"`)
        console.log(`Componente: \"${nomCmp}\"`)

        // console.log(`--------------------------------\nContenido:\n\"${componenteSelecionado}\"`)

        if (regEx.Crear.campoSinDigito(nomCampo).test(componenteSelecionado)) {

            let campoContenido = regEx.Extraer.extraerCampoContenido(componenteSelecionado, nomCampo).join('')

            console.log(`    --------------------------------`)
            console.log(`       Campo: \"${nomCampo}\"`)
            console.log(`       Extraccion: \"${campoContenido}\"`)

            if (new RegExp(`${condicionContenido}`,`gi`).test(campoContenido)) {

                let nuevoCampo = campoContenido.replace(/(?<=^.*?=).*/gm, '') + nuevoContenidoCampo
                
                console.log(`       --------------------------------`)
                console.log(`            Campo editado: \"${nuevoCampo}\"`)

                return remplazarContenido(contenidoArchivo, campoContenido, nuevoCampo)

            } else {

                console.log(`------------------------------------------------------------------`)
                console.log(`***  Omicion  ***`)
                console.log(`------------------------------------------------------------------`)
                console.log(`Campo sin cumplir la condicion: \"${condicionContenido}\"
                \nEn el Componente: \"${nomCmp}\"`)

                return false
            }
        } else {

            console.log(`------------------------------------------------------------------`)
            console.log(`***  Omicion  ***`)
            console.log(`No existe el campo: \"${nomCampo}\"`
            + `\nEn el contenido del archivo: \"${regEx.Borrar.clsRuta(archivo)}\"`)
            console.log(`------------------------------------------------------------------`)

           return false
        }

    } else {
        console.log(`------------------------------------------------------------------`)
        console.log(`***  Omicion  ***`)
        console.log(`No existe el componente: ${nomCmp}`
        + `\nEn el archivo: \"${regEx.Borrar.clsRuta(archivo)}\"`)
        console.log(`------------------------------------------------------------------`)

        return false
    }
}

const operarCambio = (archivo, condicionCampo, nomCampo, nomCmp, nuevoContenidoCampo) => {

        let contenidoArchivo = extraerContenidoRecodificado(archivo)
        contenidoArchivo = contenidoArchivo + '\n['

        return remplazarCampoConCondicionContenidoCmp(
            archivo,
            contenidoArchivo,
            condicionCampo,
            nomCampo,
            nomCmp,
            nuevoContenidoCampo
        )
}
module.exports.operarCambio = operarCambio