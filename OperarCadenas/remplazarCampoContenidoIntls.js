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

                console.log(`--------------------------\nNo existe la expresion: \"${condicionContenido}\"`
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

function ejecutarCondicion (archivo, condicionForzosa, condicionCampo, contenidoArchivo,
    nomCampo, nomCmp, nuevoContenidoCampo) {
    console.log('\n-------------------------------------')
    console.log('Determinacion Tipo: Nombre Componente - ',determinarStringOArreglo(condicionCampo))
    console.log('-----------------------------')

    if (determinarStringOArreglo(condicionCampo) == 'string') {

       
    } else if (determinarStringOArreglo(condicionCampo) == 'arreglo') {

        console.log('\n-------------------------------------')
        console.log('Determinacion Tipo: Condicion - ',determinarStringOArreglo(condicionCampo))
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
}
/***
 * Ejemlos:
 * denpendedor(
                    archivo,
                    false,
                    false,
                    '',
                    'VentanaTipoMarco',
                    'Forma',
                    'Sensillo'
                )
 * Si conCondicion y condicionForzosa son false
 * Editara todos los archivos con extension frm
 * 
 * denpendedor(
                    archivo,
                    true,
                    false,
                    'Normal',
                    'VentanaTipoMarco',
                    'Forma',
                    'Sensillo'
                )
 * Si conCondicion es true y condicionForzosa son false
 * Editara todos los archivos con extension frm que contengan el campo
 * [Forma]
 * 'VentanaTipoMarco=Normal lo que sea'
 * 
 ***/
function denpendedor (archivo, conCondicion, condicionForzosa, condicionCampo,
    nomCampo, nomCmp, nuevoContenidoCampo) {

    let contenidoArchivo = extraerContenidoRecodificado(archivo)

    //-----------------------------------------------------------------
    if (determinarStringOArreglo(nomCmp) == 'string') {
        if (conCondicion == true) {

            ejecutarCondicion(archivo, condicionForzosa, condicionCampo,
                contenidoArchivo, nomCampo, nomCmp, nuevoContenidoCampo)

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
    }else if (determinarStringOArreglo(nomCmp) == 'arreglo') {
        console.log('\n-------------------------------------')
        console.log('Determinacion Nombre Componente: ',determinarStringOArreglo(condicionCampo))
        console.log('-----------------------------')

        for (key in nomCmp) {
            ejecutarCondicion(archivo, condicionForzosa, condicionCampo,
                contenidoArchivo, nomCampo, nomCmp[key], nuevoContenidoCampo)
        }
    } else {
            console.log('Objeto desconocido')
            return contenidoArchivo
    }
    //--------------------------------------------------------

}

module.exports.remplazarCampoSinCondicionContenidoCmp = remplazarCampoSinCondicionContenidoCmp
module.exports.remplazarCampoConCondicionContenidoCmp = remplazarCampoConCondicionContenidoCmp
//module.exports.remplazarCampoContenidoIntls = remplazarCampoContenidoIntls
module.exports.denpendedor = denpendedor