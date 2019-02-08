const { extraerContenidoRecodificado } = require('../Codificacion/contenidoRecodificado')

const { determinarStringOArreglo } = require('../Validaciones/esStringOArreglo')
const { validarParametrosVacios } = require('../Validaciones/validarParametrosVacios')
const pcrArchivos = require('../OperadoresArchivos/procesadorArchivos')


/*** Operadores de cadena ***/
const regEx  = require('../RegEx/jsonRgx')
const { remplazarContenido } = require('./remplazarContenido')

function remplazarCampoSinCondicionContenidoCmp (archivo, contenidoArchivo,
                                                 nomCampo, nomCmp, nuevoContenidoCampo) {

    let contenidoEditar = contenidoArchivo + '\n['

    if (regEx.Crear.extraerCmpPorNom(nomCmp).test(contenidoEditar)) {

        let componenteSelecionado = regEx.Extraer.extraerCmpPorNom(
            contenidoEditar, nomCmp).join('')
        
        if (regEx.Crear.campoSinDigito(nomCampo).test(contenidoArchivo)) {

            let campoContenido = regEx.Extraer.extraerCampoContenido(
                componenteSelecionado, nomCampo).join('')

                let nuevoCampo = campoContenido.replace(/(?<=^.*?=).*/gm, '') 
                                 + nuevoContenidoCampo

                console.log(`--------------------------\nExiste el campo: \"${campoContenido}\"`
                    + `\nEn el contenido del archivo: \"${regEx.Borrar.clsRuta(archivo)}\"`)

                console.log(`---\nCampo editado: \"${nuevoCampo}\"`)

                pcrArchivos.crearArchivo(
                    'Testing\\'+ regEx.Borrar.clsRuta(archivo),
                    remplazarContenido(contenidoArchivo, campoContenido, nuevoCampo)
                )

        } else {

            console.log(`No existe el campo: \"${nomCampo}\" \n`
                + `En el contenido del archivo: \"${regEx.Borrar.clsRuta(archivo)}\"`)
            return contenidoArchivo
        }

    } else {
        console.log(`No existe el componente: ${nomCmp}\n`
        + `En el archivo: \"${regEx.Borrar.clsRuta(archivo)}\"`)
        return contenidoArchivo
    }
}

/***
 * 
 * Ejemplo:
 * Parámetros:      archivo.- 'c:/users/archivo',
                    condicionContenido.- 'Normal',
                    contenido.- `soy el contenido de todo el archivo 
                                y tengo el campoVentanaTipoMarco=Normal`,
                    nomCampo.- 'VentanaTipoMarco',
                    nomCmp.- 'Forma',
                    nuevoContenidoCampo.- 'Sensillo'
 ***/
function remplazarCampoConCondicionContenidoCmp (archivo, condicionContenido, contenidoArchivo,
                                                 nomCampo, nomCmp, nuevoContenidoCampo) {

    let contenidoEditar = contenidoArchivo + '\n['

    if (regEx.Crear.extraerCmpPorNom(nomCmp).test(contenidoEditar)) {

        let componenteSelecionado = regEx.Extraer.extraerCmpPorNom(contenidoEditar, nomCmp).join('')
        
        if (regEx.Crear.campoSinDigito(nomCampo).test(contenidoArchivo)) {

            let campoContenido = regEx.Extraer.extraerCampoContenido(componenteSelecionado, nomCampo).join('')

            if (new RegExp(`${condicionContenido}`,`gi`).test(campoContenido)) {

                let nuevoCampo = campoContenido.replace(/(?<=^.*?=).*/gm, '') + nuevoContenidoCampo

                console.log(`--------------------------\nExiste el campo: \"${campoContenido}\"`
                    + `\nEn el contenido del archivo: \"${regEx.Borrar.clsRuta(archivo)}\"`)

                console.log(`--------------\nCampo editado: \"${nuevoCampo}\"`)

                pcrArchivos.crearArchivo(
                    'Testing\\'+ regEx.Borrar.clsRuta(archivo),
                     remplazarContenido(contenidoArchivo, campoContenido, nuevoCampo)
                )

            } else {

                console.log(`--------------------------\nNo existe la plabra: \"${condicionContenido}\"`
                    + `\nEn el campo: \"${campoContenido}\" \nDel archivo: \"${regEx.Borrar.clsRuta(archivo)}\"`)
                return contenidoArchivo
            }
        } else {

            console.log(`No existe el campo: \"${nomCampo}\"`
                + `\nEn el contenido del archivo: \"${regEx.Borrar.clsRuta(archivo)}\"`)
            return contenidoArchivo
        }

    } else {

        console.log(`No existe el componente: ${nomCmp}`
            + `\nEn el archivo: \"${regEx.Borrar.clsRuta(archivo)}\"`)
        return contenidoArchivo
    }
}

function denpendedor (archivo, conCondicion, condicionForzosa, condicionCampo,
    nomCampo, nomCmp, nuevoContenidoCampo) {

    let contenidoArchivo = extraerContenidoRecodificado(archivo)

    if (conCondicion == true) {

        if (determinarStringOArreglo(condicionCampo) == 'string') {

            console.log('\n-------------------------------------')
            console.log('Determinacion Condicion: ',determinarStringOArreglo(condicionCampo))
            console.log('------------')

            return remplazarCampoConCondicionContenidoCmp(
                archivo,
                condicionCampo,
                contenidoArchivo,
                nomCampo,
                nomCmp,
                nuevoContenidoCampo
            )

        } else if (determinarStringOArreglo(condicionCampo) == 'arreglo') {

            console.log('\n-------------------------------------')
            console.log('Determinacion Condicion: ',determinarStringOArreglo(condicionCampo))
            console.log('-----------------------------')

            if (condicionForzosa == true) {

                let mapReg = condicionCampo.map(x => {return `(?:${x})`})
                let superReg = mapReg.join('([^]*|)')

                console.log('condicionCampo: Forzosa')
                console.log('-------------------------')
                console.log('condicionCampo',condicionCampo)
                console.log('superReg: ',superReg)

                return remplazarCampoConCondicionContenidoCmp(
                    archivo,
                    superReg,
                    contenidoArchivo,
                    nomCampo,
                    nomCmp,
                    nuevoContenidoCampo
                )

            } else if (condicionForzosa == false) {

                let mapReg = condicionCampo.map(x => {return `(?:${x})`})
                let superReg = mapReg.join('|')

                console.log('\n-------------------------------------')
                console.log('condicionCampo Opcional')
                console.log('------------')
                console.log('condicionCampo: ',condicionCampo)
                console.log('mapReg: ', mapReg)
                console.log('superReg: ',superReg)

                return remplazarCampoConCondicionContenidoCmp(
                    archivo,
                    superReg,
                    contenidoArchivo,
                    nomCampo,
                    nomCmp,
                    nuevoContenidoCampo
                )
            } else {
                console.log('Ingresa \"true\" si necesitas una condicion en el texto, \"false\" si no')
            }
        } else {
            console.log('Objeto desconocido')
            return contenidoArchivo
        }
    } else if (conCondicion == false) {
        console.log('Remplazo sin condicion')
        return remplazarCampoSinCondicionContenidoCmp(
            archivo,
            contenidoArchivo,
            nomCampo,
            nomCmp,
            nuevoContenidoCampo
        )
    } else {
        console.log('Ingresa \"true\" si necesitas una condicion en el texto, \"false\" si no')
        return contenidoArchivo
    }
}

module.exports.remplazarCampoSinCondicionContenidoCmp = remplazarCampoSinCondicionContenidoCmp
module.exports.remplazarCampoConCondicionContenidoCmp = remplazarCampoConCondicionContenidoCmp
module.exports.remplazarCampoContenidoIntls = remplazarCampoContenidoIntls
module.exports.denpendedor = denpendedor