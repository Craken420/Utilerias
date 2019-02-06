const extractor = require('./extractor')
const pcrArchivos = require('../OperadoresArchivos/procesadorArchivos')
const carpetas = require('../OperadorObjetos/carpetas')
const { extraerContenidoRecodificado } = require('../Codificacion/contenidoRecodificado')
const { arregloSinDuplicado } = require('./eliminarDuplicado')

function unificarCodigoOriginalYEsp (extraccionMenuP, extraccionDLGMAVI) {
    //console.log(extraccionDLGMAVI)
    let arregloExtraccionDLGMAVI = extraccionDLGMAVI.replace(/^\n$|\r/gm, '').split('\n')
    //console.log('arregloExtraccionDLGMAVI\n',arregloExtraccionDLGMAVI[4])
    //console.log(extraccionDLGMAVI)
    let campo = []
    for (key in arregloExtraccionDLGMAVI) {
        if(/.*?=/g.test(arregloExtraccionDLGMAVI[key])) {
            campo.push(arregloExtraccionDLGMAVI[key].match(/^(?!\s+).*?\=/gm).join(''))
        }
    }
    // console.log('1',campo)
    campo = arregloSinDuplicado(campo)
    // console.log(campo)
    for (key2 in campo) {
        //if (campo[key2] != 'undefined'||campo[key2] != undefined) {
        let campoRegEx = new RegExp(`^${campo[key2]}`, `m`)
        //console.log(campo[key2])
        if (campoRegEx.test(extraccionMenuP)) {
        // console.log('Se encuentra en ambas', campoRegEx)
            let campoBuscar = new RegExp(`${campo[key2]}.*`, ``)
            //console.log('campoBuscar',campoBuscar)
            let campoRemplazar = new RegExp(`^${campo[key2]}.*`, `m`)
            // console.log('campoRemplazar',campoRemplazar)
            let remplazo = extraccionDLGMAVI.match(campoRemplazar).join('')
            //console.log('campoRemplazar',campoRemplazar)
            //console.log(`extraccionMenuP.replace(${campoBuscar}, ${remplazo})`)
            extraccionMenuP = extraccionMenuP.replace(campoBuscar, remplazo)
            //console.log(extraccionMenuP)
        } else {
            // console.log('No encuentra en ambas', campoRegEx)
            let campoAgregar = new RegExp(`^${campo[key2]}.*`, `m`)
            // console.log('campoAgregar',campoAgregar)
            extraccionMenuP += '\n' + extraccionDLGMAVI.match(campoAgregar).join('')
        }
    }
    //fq.appendArchivo(carpetas.carpetaTesting + '6-extraccionUnificadaExtraccionMenuP.txt', extraccionMenuP)
    return extraccionMenuP
}

function comprobarOUnirExtraccion (extraccionMenuP, extraccionDLGMAVI) {
    // console.log(extraccionDLGMAVI)
    let cont = 00000
     if (extraccionMenuP != undefined && extraccionDLGMAVI != undefined || extraccionMenuP != null && extraccionDLGMAVI != null) {
        let unionCodigoOriginalYEsp = unificarCodigoOriginalYEsp(extraccionMenuP, extraccionDLGMAVI)
        pcrArchivos.agregarArchivo(carpetas.carpetaTesting + '5-extraccionUnificadaExtraccionMenuP-' + cont + '.txt', extraccionMenuP)
        cont++
        pcrArchivos.agregarArchivo(carpetas.carpetaTesting + '5-extraccionUnificadaExtraccionDLGMAVI-' + cont + '.txt', extraccionDLGMAVI)
        cont++
        // fq.appendArchivo(carpetas.carpetaTesting + '5-extraccionUnificadaExtraccion-' + cont + '.txt', unionCodigoOriginalYEsp)
        // cont++
         //console.log(extraccionMenuP)
        opcion = 1
        unionCodigoOriginalYEsp = unionCodigoOriginalYEsp.replace(/^\n\s/gm, '')
        //unionCodigoOriginalYEsp.replace(/(?<!\w)\n/g, '')
        return {
            extraccionMenuP: unionCodigoOriginalYEsp,
            opcion: opcion
        }
    } else if (extraccionMenuP != undefined) {
        opcion = 2
        extraccionMenuP = extraccionMenuP.replace(/(?<!\w\s)\n\s/g, '')
        // fq.appendArchivo(carpetas.carpetaTesting + '5-extraccionMenuP-' + cont + '.txt', extraccionMenuP)
        cont++
        //extraccionMenuP.replace(/^\n/gm, '')
        return {
             extraccionMenuP: extraccionMenuP,
             opcion: opcion
        }
    } else if (extraccionDLGMAVI != undefined) {
        opcion = 3
         //console.log('extraccionMenuP',extraccionMenuP)//Undefined
         //console.log('extraccionDLGMAVI',extraccionDLGMAVI)
        extraccionDLGMAVI = extraccionDLGMAVI.replace(/(?<!\w\s)\n\s/g, '')
        // fq.appendArchivo(carpetas.carpetaTesting + '5-extraccionDLGMAVI-' + cont + '.txt', extraccionDLGMAVI)
        cont++
        return {
            extraccionMenuP: extraccionDLGMAVI,
             opcion: opcion
        }
    } else {
         console.log('Error: No se encuentra en ningun archivo de la version 5000')
         // let contenidoArchivo = fs.readFileSync(archivo, 'ascii')
    }
 }

exports.enviarObj = function(arreglo) {
    for(key in arreglo) {
        let acceso = arreglo[key]
        // console.log(acceso)
        let extraccionMenuP =  extractor.extraerAcceso(acceso, extraerContenidoRecodificado(carpetas.archivoMenuPrincipal5000))
        // fq.appendArchivo(carpetas.carpetaTesting + '4.-extraccionMenuP' + acceso + '.txt', extraccionMenuP)
        
        let extraccionDLGMAVI = extractor.extraerAcceso(acceso, extraerContenidoRecodificado(carpetas.archivoDLGMAVI5000))
        // fq.appendArchivo(carpetas.carpetaTesting + '4.2-extraccionDLGMAVI' + acceso + '.txt', extraccionDLGMAVI)

        let objeto = comprobarOUnirExtraccion(extraccionMenuP, extraccionDLGMAVI)
        //console.log(objeto)
        return objeto.extraccionMenuP
    }
}