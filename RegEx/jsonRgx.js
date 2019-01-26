const jsonRegEx = {
  comentarios: /\;.*/g, 
  ampersand:   /\&/g,
  nombreArchivoEnRuta:  /.*\\|.*\//,
  saltoLineaVacio:      /^\n[\s\t]*/gm,
  continuaAlInicio:     /(?<=^.*?\=)<CONTINUA>/m,
  continuaFinal:        /(?<=.*?)\<CONTINUA\>(\s+|)$/,
  campoYcontinua:       /^.*?\=<CONTINUA>|<CONTINUA>/gm,
  componentesIntelisis: /\[.*?.*?[^]*?(?=\[)/g,
  campoConsecutivo:     /^\w+\d{3}/m,
  
}

exports.expresiones = jsonRegEx

exports.crearRegEx = {
  campoSinDigito:     tipoCampo => { return  new RegExp(`^${tipoCampo}\\=.*`, `gim`)},
  campoConDigito:     tipoCampo => { return  new RegExp(`^${tipoCampo}\\d{3}\\=.*`, `gim`)},
  campoConSinDigito:  tipoCampo => { return  new RegExp(`^${tipoCampo}(\\d{3}|)\\=.*`, `gim`)}
  
}

exports.jsonReplace = {
  clsComentarios:       texto => { return texto.replace(jsonRegEx.comentarios, '')},
  clsRuta:              ruta  => { return ruta.replace(jsonRegEx.nombreArchivoEnRuta, '')},
  clsSaltoLineaVacio:   texto => { return texto.replace(jsonRegEx.saltoLineaVacio, '') },
  clsCampoYContinua:    texto => { return texto.replace(jsonRegEx.campoYcontinua, '')},
  dosPuntosPorIgual:    texto => { return texto.replace(/=/g, ':')},
  saltoLineaPorComa:    texto => { return texto.replace(jsonRegEx.saltoLinea, ', ')},
  addEspacioComponente: texto => { return texto.replace(/^\[/gm, ' \n[')},
  prepararRegEx:        texto => {
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
  }
}
