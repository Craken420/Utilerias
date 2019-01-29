/***
 * Glosario:
 * Intls: Intelisis
 * Cmp:   Componente
 * Diff:  Diferente
 * Nom:   Nombre
 */

const jsonRegEx = {
  ampersand:   /\&/g,   //=> &
  //Uso check
  comentariosLineaIntls: /^;.*/gm, //=> ;Comentario
  campoConsecutivoIntls: /^\w+\d{3}/m, //=> Campo002, SQL002
  componentesIntls:      /\[.*?.*?[^]*?(?=\[)/g, //=> [Componente] contenidoComponente [
  campoIntlsYcontinua:   /^.*?\=<CONTINUA>|<CONTINUA>/gm, //=> SQL002 = <CONTINUA> algo <CONTINUA>
  continuaAlInicio:      /(?<=^.*?\=)<CONTINUA>/m, //=> SQL002= <CONTINUA> Algo
  continuaFinal:         /(?<=.*?)\<CONTINUA\>(\s+|)$/, //=> SQL= Algo <CONTINUA>
  //USO CHECK
  iniCorcheteLineaVacia: /^\[$/m, //=> [
  nombreArchivoEnRuta:   /.*\\|.*\//, //=> Busca 'c:/user/documents/ ' hasta 'Nombre Archivo.txt'
  //Uso check
  nomExtCmp:             /(?<=\[).*?\.(frm|vis|tbl|dlg|rep)/gi,
  //Uso check
  nomYtipoEsp:           /.*(\/|\\)|\_MAVI.*|\.esp/gi, //De: Ruta\Achivo_FRM_MAVI.esp - Busca Achivo_FRM
  //Uso check
  puntoExtension:        /(?<=\.)\w+$/gim, //=> De: Achivo.FRM - Toma - .FRM
  //Uso check
  saltoLineaVacio:       /^\n[\s\t]*/gm, //=> \n\s\t Lineas vacias espacios y tabulador
  //Uso check
  guionBajoTipoEsp:       /\_(?=(frm|vis|tbl|dlg|rep))/gi //=> Achivo_FRM

}

exports.expresiones = jsonRegEx

exports.crearRegEx = {
  campoSinDigito:     tipoCampo => { return  new RegExp(`^${tipoCampo}\\=.*`, `gim`)},
  campoConDigito:     tipoCampo => { return  new RegExp(`^${tipoCampo}\\d{3}\\=.*`, `gim`)},
  campoConSinDigito:  tipoCampo => { return  new RegExp(`^${tipoCampo}(\\d{3}|)\\=.*`, `gim`)},
  //Uso check
  cmpDiffNomArchivo:  nomCmt => { return new RegExp(`\\[(?!\\w+;)(?!${nomCmt})(?=.*?\\/.*?\\])[^~]*?(?=(\\n|)^\\[)`, `gim`)},
  //Uso check
  extraerCmpPorNom:   nomCmt => { return new RegExp(`\\[${nomCmt}[^~]*?(?=\\[)`, `gi`)}
}

exports.jsonReplace = {
  addEspacioCmp:            texto => { return texto.replace(/^\[/gm, ' \n[')},
  clsCampoIntlsYContinua:   campoIntls    => { return campoIntls.replace(jsonRegEx.campoIntlsYcontinua, '')},
  //Uso check
  clsComentariosIntls:      texto => { return texto.replace(jsonRegEx.comentariosLineaIntls, '')},
  //Uso check
  clsIniCorcheteVacio:  texto => { return texto.replace(jsonRegEx.iniCorcheteLineaVacia, '')},
  clsRuta:                  ruta  => { return ruta.replace(jsonRegEx.nombreArchivoEnRuta, '')},
  //Uso check
  clsSaltoLineaVacio:       texto => { return texto.replace(jsonRegEx.saltoLineaVacio, '') },
  dosPuntosPorIgual:        texto => { return texto.replace(/=/g, ':')},
  //Uso check
  minusculasPorMayuscula:   texto => { return texto.replace(
                                                      jsonRegEx.puntoExtension,
                                                      archivoFrm => {
                                                        return archivoFrm.toLowerCase()
                                                      }
                                                    )
                                      },
  //Uso check
  extraerNomTipoEsp:     ruta  => { return ruta.replace(jsonRegEx.nomYtipoEsp, '')},
  //Uso check
  puntoPorGuionBajoTipoEsp: nomTipoEsp => { return nomTipoEsp.replace(jsonRegEx.guionBajoTipoEsp, '.')},
  prepararRegEx:            texto => {
    texto = texto.replace(/\[/g,   '\\[').replace(/\]/g, '\\]')
    texto = texto.replace(/\(/g,   '\\(').replace(/\)/g, '\\)')
    texto = texto.replace(/\{/g,   '\\{').replace(/\}/g, '\\}')
    texto = texto.replace(/\(\?/g, '\\(\\?')
    texto = texto.replace(/\+/g,   '\\+')
    texto = texto.replace(/\n/g,   '\\n')
    texto = texto.replace(/\s/g,   '\\s')
    texto = texto.replace(/\*/g,   '\\*')
    texto = texto.replace(/\\/g,   '\\')
    texto = texto.replace(/\$/g,   '\\$')
    texto = texto.replace(/\./g,   '\\.')
    return texto
  },
  //Uso check
  saltoLineaPorComaEspacio:  texto => { return texto.replace(jsonRegEx.saltoLinea, ', ')}
  
}
