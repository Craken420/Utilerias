/***
 * Glosario:
 * Intls: Intelisis
 * Cmp:   Componente
 * Diff:  Diferente
 * Nom:   Nombre
 */

const jsonRegEx = {
  ampersand:   /\&/g,   //=> &
  comentariosLineaIntls: /^;.*/gm, //=> ;Comentario
  campoConsecutivoIntls: /^\w+\d{3}/m, //=> Campo002, SQL002
  componentesIntls:    /\[.*?.*?[^]*?(?=\[)/g, //=> [Componente] contenidoCmp [
  campoIntlsYcontinua: /^.*?\=<CONTINUA>|<CONTINUA>/gm, //=> SQL002=<CONTINUA>algo<CONTINUA>
  continuaAlInicio:    /(?<=^.*?\=)<CONTINUA>/m, //=> SQL002= <CONTINUA> Algo
  continuaFinal:       /(?<=.*?)\<CONTINUA\>(\s+|)$/, //=> SQL= Algo <CONTINUA>
  iniCorcheteLineaVacia: /^\[$/m, //=> [
  nombreArchivoEnRuta:   /.*\\|.*\//, //=> Busca 'c:/' hasta 'Nombre Archivo.txt'
  nomExtCmp:   /(?<=\[).*?\.(frm|vis|tbl|dlg|rep)/gi, //=> Si ^[ extrae Componente.frm
  nomYtipoEsp: /.*(\/|\\)|\_MAVI.*|\.esp/gi, //De: \File_FRM_MAVI.esp Busca File_FRM
  puntoExtension:   /(?<=\.)\w+$/gim, //=> De: Achivo.FRM Busca .FRM
  saltoLineaVacio:  /^\n[\s\t]*/gm, //=> \n\s\t Lineas vacias espacios y tabulador
  guionBajoTipoEsp: /\_(?=(frm|vis|tbl|dlg|rep))/gi //=> Achivo_FRM

}

const rgxCrear = {
  campoSinDigito: tipoCampo => { return new RegExp( `^${tipoCampo}\\=.*`, `gim`)},
  campoConDigito: tipoCampo => { return  new RegExp(`^${tipoCampo}\\d{3}\\=.*`, `gim`)},
  campoConSinDigito: tipoCampo => { return  new RegExp(
                                                  `^${tipoCampo}(\\d{3}|)\\=.*`,
                                                  `gim`
                                                )
                                  },
  cmpDiffNomArchivo:  nomCmt => { return new RegExp(
                        `\\[(?!\\w+;)(?!${nomCmt})(?=.*?\\/.*?\\])[^~]*?(?=(\\n|)^\\[)`,
                        `gim`
                      )},
  extraerCmpPorNom:   nomCmt => { return new RegExp(`\\[${nomCmt}[^~]*?(?=\\[)`, `gi`)}
}

const rgxReplace = {
  addEspacioCmp: texto => { return texto.replace(/^\[/gm, ' \n[')},
  clsCampoIntlsYContinua: campoIntls => { return campoIntls.replace(
                                              jsonRegEx.campoIntlsYcontinua,
                                              '')
                                            },
  clsComentariosIntls: texto => { return texto.replace(
                                                jsonRegEx.comentariosLineaIntls,
                                              '')
                                     },
  clsIniCorcheteVacio: texto => { return texto.replace(
                                                jsonRegEx.iniCorcheteLineaVacia,
                                              '')
                                     },
  clsRuta: ruta  => { return ruta.replace(jsonRegEx.nombreArchivoEnRuta, '')},

  clsSaltoLineaVacio: texto => { return texto.replace(
                                                jsonRegEx.saltoLineaVacio, 
                                              '')
                               },
  dosPuntosPorIgual: texto => { return texto.replace(/=/g, ':')},
  minusculasPorMayuscula: texto => { return texto.replace(
                                              jsonRegEx.puntoExtension,
                                              archivoFrm => {
                                                return archivoFrm.toLowerCase()
                                              }
                                            )
                                   },
  extraerNomTipoEsp: ruta => { return ruta.replace( jsonRegEx.nomYtipoEsp, '')},
  prepararRegEx: texto => {
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
  puntoPorGuionBajoTipoEsp: nomTipoEsp => { return  nomTipoEsp.replace(
                                                      jsonRegEx.guionBajoTipoEsp, '.'
                                                    )
                                          },
  saltoLineaPorComaEspacio:  texto => { return texto.replace(
                                                      jsonRegEx.saltoLinea, 
                                                      ', '
                                                    )
                                      }
}

module.exports.expresiones = jsonRegEx
module.exports.crearRegEx =  rgxCrear
module.exports.jsonReplace = rgxReplace