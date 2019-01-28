/***
 * Glosario:
 * Intls: Intelisis
 * Cmp: Componente
 */

const jsonRegEx = {
  ampersand:   /\&/g, //=> &
  comentarios: /^;.*/gm, //=> ;Comentario
  campoConsecutivoIntls:     /^\w+\d{3}/m, //=> Campo002, SQL002
  componentesIntls:     /\[.*?.*?[^]*?(?=\[)/g, //=> [Componente] contenidoComponente [
  campoIntlsYcontinua:  /^.*?\=<CONTINUA>|<CONTINUA>/gm, //=> SQL002 = <CONTINUA> algo <CONTINUA>
  continuaAlInicio:     /(?<=^.*?\=)<CONTINUA>/m, //=> SQL002= <CONTINUA> Algo
  continuaFinal:        /(?<=.*?)\<CONTINUA\>(\s+|)$/, //=> SQL= Algo <CONTINUA>
  nombreArchivoEnRuta:  /.*\\|.*\//, //=> Busca 'c:/user/documents/ ' hasta 'Nombre Archivo.txt'
  nombreYtipoEsp:       /.*(\/|\\)|\_MAVI.*|\.esp/gi, //De: Ruta\Achivo_FRM_MAVI.esp - Busca Achivo_FRM
  saltoLineaVacio:      /^\n[\s\t]*/gm, //=> \n\s\t Lineas vacias espacios y tabulador
  
}

exports.expresiones = jsonRegEx

exports.crearRegEx = {
  campoSinDigito:     tipoCampo => { return  new RegExp(`^${tipoCampo}\\=.*`, `gim`)},
  campoConDigito:     tipoCampo => { return  new RegExp(`^${tipoCampo}\\d{3}\\=.*`, `gim`)},
  campoConSinDigito:  tipoCampo => { return  new RegExp(`^${tipoCampo}(\\d{3}|)\\=.*`, `gim`)}
}

exports.jsonReplace = {
  addEspacioCmp:          texto => { return texto.replace(/^\[/gm, ' \n[')},
  clsCampoIntlsYContinua: campoIntls => { return campoIntls.replace(jsonRegEx.campoIntlsYcontinua, '')},
  clsComentariosIntls:    texto => { return texto.replace(jsonRegEx.comentarios, '')},
  clsRuta:                ruta  => { return ruta.replace(jsonRegEx.nombreArchivoEnRuta, '')},
  clsSaltoLineaVacio:     texto => { return texto.replace(jsonRegEx.saltoLineaVacio, '') },
  dosPuntosPorIgual:      texto => { return texto.replace(/=/g, ':')},
  extraerNombreTipoEsp:   ruta  => { return ruta.replace(jsonRegEx.nombreYtipoEsp, '')},
  puntoPorGuionBajoTipoEsp: nombreTipoEsp => { return nombreTipoEsp.replace(/\_(?=(frm|vis|tbl|dlg|rep))/gi, '.')},
  prepararRegEx:          texto => {
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
  saltoLineaPorComaEspacio:    texto => { return texto.replace(jsonRegEx.saltoLinea, ', ')}
  
}
