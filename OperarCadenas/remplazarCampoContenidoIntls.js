const { extraerContenidoRecodificado } = require('../Codificacion/contenidoRecodificado')

const { determinarStringOArreglo } = require('../Validaciones/esStringOArreglo')
const { validarParametrosVacios } = require('../Validaciones/validarParametrosVacios')
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

                return remplazarContenido(contenidoArchivo, campoContenido, nuevoCampo)

        } else {
            console.log(`No existe el campo: \"${nomCampo}\" \n`
                + `En el contenido del archivo: \"${regEx.Borrar.clsRuta(archivo)}\"`)
            return contenidoArchivo
        }

    } else {
        console.log(`No existe el componente: ${nomCmp}\n`
        + `En el archivo: \"${regEx.Borrar.clsRuta(archivo)}\"`)
        return contenido
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

                console.log(`---\nCampo editado: \"${nuevoCampo}\"`)

                return remplazarContenido(contenidoArchivo, campoContenido, nuevoCampo)

            } else {
                console.log(`--------------------------\nNo existe la plabra: \"${condicionContenido}\"`
                    + `\nEn el campo: \"${campoContenido}\" \nDel archivo: \"${regEx.Borrar.clsRuta(archivo)}\"`)
                return contenidoArchivo
            }
        } else {
            console.log(`No existe el campo: \"${nomCampo}\" ` 
                + `\nEn el contenido del archivo: \"${regEx.Borrar.clsRuta(archivo)}\"`)
            return contenidoArchivo
        }

    } else {
        console.log(`No existe el componente: ${nomCmp}`
            + `\nEn el archivo: \"${regEx.Borrar.clsRuta(archivo)}\"`)
        return contenidoArchivo
    }
}

function remplazarCampoContenidoIntls (archivo, conCondicion, condicionCampo,
    nomCampo, nomCmp, nuevoContenidoCampo) {

    console.log(arguments.callee.arguments.archivo)

    let contenidoArchivo = extraerContenidoRecodificado(archivo)

    if (validarParametrosVacios(arguments) != true) {

        if (conCondicion == true) {

            return remplazarCampoConCondicionContenidoCmp(
                archivo,
                condicionCampo,
                contenidoArchivo,
                nomCampo,
                nomCmp,
                nuevoContenidoCampo
            )
        } else if (conCondicion == false) {

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
    } else {
        console.log('Existe un parametro vacio')
        return contenidoArchivo
    }
}

function denpendedor (archivo, conCondicion, condicionCampo,
    nomCampo, nomCmp, nuevoContenidoCampo) {

    console.log(arguments.callee.arguments.archivo)

    let contenidoArchivo = extraerContenidoRecodificado(archivo)

    if (validarParametrosVacios(arguments) != true) {


    } else {
        console.log('Existe un parametro vacio')
        return contenidoArchivo
    }
}

module.exports.remplazarCampoSinCondicionContenidoCmp = remplazarCampoSinCondicionContenidoCmp
module.exports.remplazarCampoConCondicionContenidoCmp = remplazarCampoConCondicionContenidoCmp
module.exports.remplazarCampoContenidoIntls = remplazarCampoContenidoIntls