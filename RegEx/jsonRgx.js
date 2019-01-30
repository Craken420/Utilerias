/***
 * Glosario:
 * Intls: Intelisis
 * Cmp:   Componente
 * Diff:  Diferente
 * Nom:   Nombre
 */

const jsonRegEx = {
  ampersand: /\&/g, //=> &
  comentariosLineaIntls: /^;.*/gm, //=> ;Comentario
  campoConsecutivoIntls: /^\w+\d{3}/m, //=> Campo002, SQL002
  componentesIntls:    /^\[[\W\w]*?(?=(^\[))/g, //=> [Componente] contenidoCmp [
  campoIntlsYcontinua: /^.*?\=<CONTINUA>|<CONTINUA>/gm, //=> SQL002=<CONTINUA>algo
  continuaAlInicio: /(?<=^.*?\=)<CONTINUA>/m, //=> SQL002= <CONTINUA> Algo
  continuaFinal:    /(?<=.*?)\<CONTINUA\>(\s+|)$/, //=> SQL= Algo <CONTINUA>
  guionBajoTipoEsp: /\_(?=(frm|vis|tbl|dlg|rep))/gi, //=> Achivo_FRM
  iniCorcheteLineaVacia: /^\[$/m, //=> [
  lineasBlancas: /^\n[\s\t]*/gm,
  nomAccion: /(?!\[\])\[.*?\]/g, //=> [ActivoFijo.tbl/FechaEmision]
  nomArchivoEnRuta: /.*\\|.*\//, //=> Busca 'c:/' hasta 'Nombre Archivo.txt'
  nomComponente: /(?<=^\[)\w*\.(tbl|vis|frm|rep|dlg)(?=\/)/gm,
  nomExtCmp:   /(?<=\[).*?\.(frm|vis|tbl|dlg|rep)/gi, //=> Si ^[ extrae Componente.frm
  nomYtipoEsp: /.*(\/|\\)|\_MAVI.*|\.esp/gi, //De: \File_FRM_MAVI.esp Busca File_FRM
  //parentesisAnidados: /(\((?>[^()]+|(?1))*\))/gm,
  puntoExtension:   /\.(?=\w+$)/gim, //=> De: Achivo.FRM Busca .FRM
  saltoLineaVacio:  /^\n[\s\t]*/gm, //=> \n\s\t Lineas vacias espacios y tabulador
  tituloComponente: /^\[.*\]/gm,
  tipoEspEnNomenclatura: /(?<=\_)\w+(?=\_)/gi //=> _FRM_

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
  crearNomenclaturaEsp: texto =>  { return texto.replace(
                                                  regEx.expresiones.puntoExtension,
                                                  '_'
                                                )
                                  },
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
  extraerNomTipoEsp: ruta => { return ruta.replace( jsonRegEx.nomYtipoEsp, '')},
  minusculasPorMayuscula: texto => { return texto.replace(
                                              jsonRegEx.puntoExtension,
                                              archivoFrm => {
                                                return archivoFrm.toLowerCase()
                                              }
                                            )
                                   },
  prepararObjeto: texto => {
    texto = texto.replace(/=/g, ':').replace(/\[.*?(?=\/)|\]/g, '')
    texto = texto.replace(/(?<=\/\w+)\./g, ':').replace(/\//, '')
    texto = texto.replace(/[^\w:,\.]/gm, "").replace(/,/g, ', ')
    return texto
  },
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
  saltoLineaPorComaEspacio: texto => { return texto.replace(
                                                      jsonRegEx.saltoLinea,
                                                      ', '
                                              )
                                     },
}

module.exports.expresiones = jsonRegEx
module.exports.crearRegEx =  rgxCrear
module.exports.jsonReplace = rgxReplace