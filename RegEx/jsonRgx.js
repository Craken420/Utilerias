/***
 * Glosario:
 * Intls: Intelisis
 */

const nomVar = require('./variablesNombreJsonRgx')

const jsonRegEx = {
  [nomVar.nomVar.ampersand]:     /\&/g, //=> &
  //Uso check
  [nomVar.comentarios]:          /^;.*/gm, //=> ;Comentario
  [nomVar.campoConsecutivo]:     /^\w+\d{3}/m, //=> Campo002, SQL002
  [nomVar.componentesIntelisis]: /\[.*?.*?[^]*?(?=\[)/g, //=> [Componente] contenidoComponente [
  [nomVar.campoYcontinua]:       /^.*?\=<CONTINUA>|<CONTINUA>/gm, //=> SQL002 = <CONTINUA> algo <CONTINUA>
  [nomVar.continuaAlInicio]:     /(?<=^.*?\=)<CONTINUA>/m, //=> SQL002= <CONTINUA> Algo
  [nomVar.continuaFinal]:        /(?<=.*?)\<CONTINUA\>(\s+|)$/, //=> SQL= Algo <CONTINUA>
  [nomVar.nombreArchivoEnRuta]:  /.*\\|.*\//, //=> Busca 'c:/user/documents/ ' hasta 'Nombre Archivo.txt'
  [nomVar.nombreYtipoEsp]:       /.*(\/|\\)|\_MAVI.*|\.esp/gi, //De: Ruta\Achivo_FRM_MAVI.esp - Busca Achivo_FRM
  [nomVar.saltoLineaVacio]:      /^\n[\s\t]*/gm, //=> \n\s\t Lineas vacias espacios y tabulador

}

exports.expresiones = jsonRegEx

exports.crearRegEx = {
  [nomVar.campoSinDigito]:     tipoCampo => { return  new RegExp(`^${tipoCampo}\\=.*`, `gim`)},
  [nomVar.campoConDigito]:     tipoCampo => { return  new RegExp(`^${tipoCampo}\\d{3}\\=.*`, `gim`)},
  [nomVar.campoConSinDigito]:  tipoCampo => { return  new RegExp(`^${tipoCampo}(\\d{3}|)\\=.*`, `gim`)}
 // return new RegExp(`${regEx}`, `gim`)
}

exports.jsonReplace = {
  [nomVar.addEspacioComponente]:    texto => { return texto.replace(/^\[/gm, ' \n[')},
  [nomVar.clsCampoYContinua]:       campoIntls => { return campoIntls.replace(campo.campoYcontinua, '')},
  [nomVar.clsComentariosIntelisis]: texto => { return texto.replace(jsonRegEx.comentarios, '')},
  [nomVar.clsRuta]:            ruta  => { return ruta.replace(jsonRegEx.nombreArchivoEnRuta, '')},
  [nomVar.clsSaltoLineaVacio]: texto => { return texto.replace(jsonRegEx.saltoLineaVacio, '') },
  [nomVar.dosPuntosPorIgual]:  texto => { return texto.replace(/=/g, ':')},
  [nomVar.extraerNombreTipoEsp]: ruta => { return ruta.replace(jsonRegEx.nombreYtipoEsp, '')},
  [nomVar.puntoPorTipoEsp]:      nombreTipoEsp => { return nombreTipoEsp.replace(/\_(?=(frm|vis|tbl|dlg|rep))/gi, '.')},
  [nomVar.prepararRegEx]:        texto => {
    texto = texto.replace(/\[/g, '\\[').replace(/\]/g, '\\]')
    texto = texto.replace(/\(/g, '\\(').replace(/\)/g, '\\)')
    texto = texto.replace(/\{/g, '\\{').replace(/\}/g, '\\}')
    texto = texto.replace(/\(\?/g, '\\(\\?')
    texto = texto.replace(/\+/g, '\\+')
    texto = texto.replace(/\n/g, '\\n')
    texto = texto.replace(/\s/g, '\\s')
    texto = texto.replace(/\*/g, '\\*')
    texto = texto.replace(/\\/g, '\\')
    texto = texto.replace(/\$/g, '\\$')
    texto = texto.replace(/\./g, '\\.')
    return texto
  },
  [saltoLineaPorComa]:    texto => { return texto.replace(jsonRegEx.saltoLinea, ', ')}
}
