const { promisify } = require('util')
const { resolve }   = require('path')
const fs = require('fs')
const readdir = promisify(fs.readdir)

const { filtrarExtensionManualIsFile } = require('./filtrarArchivos')

async function leerCarpetaFiltrada (rutaCarpeta, extension) {
    const archivos = await readdir(rutaCarpeta)
    const resultado = archivos.map(archivo => resolve(rutaCarpeta, archivo))
    const archivosFiltrados = await Promise.all(filtrarExtensionManualIsFile(resultado, extension))
    return archivosFiltrados.reduce((a, f) => a.concat(f), [])
}

module.exports.leerCarpetaFiltrada = leerCarpetaFiltrada