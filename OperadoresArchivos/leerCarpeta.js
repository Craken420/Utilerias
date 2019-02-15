const fs            = require('fs')
const { promisify } = require('util')
const { resolve }   = require('path')

const leerCarpeta   = promisify(fs.readdir)
const stat          = promisify(fs.stat)

/*** 
 * Función para obtener los archivos de una carpeta, 
 * validando si es directorio para solo arrojar archivos
 * @carpeta ruta del directorio a examinar
 ***/
const obtenerArchivos = async carpeta => {
  const subCarpetas = await leerCarpeta(carpeta)
  
  const archivos   = await Promise.all(subCarpetas.map( async subCarpetas => {

    const resultado  = resolve(carpeta, subCarpetas)

    return  (
              await stat(resultado)
            ).isDirectory() ? obtenerArchivos(resultado) : resultado
  }))
  return archivos.reduce((a, f) => a.concat(f), [])
}

module.exports.obtenerArchivos = obtenerArchivos

/* Uso:
 * obtenerArchivos(carpetas)
 *     .then(archivos => { console.log(archivos) })
 *     .catch(e => console.error(e))
 */