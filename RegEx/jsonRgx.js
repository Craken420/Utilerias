const jsonRegEx = {
  ampersand:   /\&/g,
  comentarios: /^;.*/gm,
  campoConsecutivo:     /^\w+\d{3}/m,
  componentesIntelisis: /\[.*?.*?[^]*?(?=\[)/g,
  campoYcontinua:       /^.*?\=<CONTINUA>|<CONTINUA>/gm,
  continuaAlInicio:     /(?<=^.*?\=)<CONTINUA>/m,
  continuaFinal:        /(?<=.*?)\<CONTINUA\>(\s+|)$/,
  nombreArchivoEnRuta:  /.*\\|.*\//,
  saltoLineaVacio:      /^\n[\s\t]*/gm,
  

}

exports.expresiones = jsonRegEx

exports.crearRegEx = {
  campoSinDigito:     tipoCampo => { return  new RegExp(`^${tipoCampo}\\=.*`, `gim`)},
  campoConDigito:     tipoCampo => { return  new RegExp(`^${tipoCampo}\\d{3}\\=.*`, `gim`)},
  campoConSinDigito:  tipoCampo => { return  new RegExp(`^${tipoCampo}(\\d{3}|)\\=.*`, `gim`)}
 // return new RegExp(`${regEx}`, `gim`)
}

exports.jsonReplace = {
  addEspacioComponente:    texto => { return texto.replace(/^\[/gm, ' \n[')},
  clsCampoYContinua:       texto => { return texto.replace(jsonRegEx.campoYcontinua, '')},
  clsComentariosIntelisis: texto => { return texto.replace(jsonRegEx.comentarios, '')},
  clsRuta:            ruta  => { return ruta.replace(jsonRegEx.nombreArchivoEnRuta, '')},
  clsSaltoLineaVacio: texto => { return texto.replace(jsonRegEx.saltoLineaVacio, '') },
  dosPuntosPorIgual:  texto => { return texto.replace(/=/g, ':')},
  prepararRegEx:      texto => {
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
  saltoLineaPorComa:    texto => { return texto.replace(jsonRegEx.saltoLinea, ', ')}
  
}
