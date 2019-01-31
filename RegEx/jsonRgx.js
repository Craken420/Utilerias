/***
 * Glosario:
 * Ini:   Inicio
 * Intls: Intelisis
 * Cmp:   Componente
 * Diff:  Diferente
 * Nom:   Nombre
 */

const jsonRegEx = {
  ampersand: /\&/g, //=> &
  ansis1: /SET(|[\s]+)ANSI(|[\s]+|\_)NULLS(|[\s]+)(ON|OFF)|SET/gi, //=> SET ANSI_NULLS
  ansis2: /(|[\s]+)QUOTED(|[\s]+|\_)IDENTIFIER(|[\s]+)(ON|OFF)/, //=> SET ANSI_NULLS
  comentariosLineaIntls:   /^;.*/gm, //=> ;Comentario
  comentarioSQLAvanzado:   /\/(\*+)([^*]*)(|[*]+|(([*]+[^*]+)*?))(\*+)\//g, /*mucho*/
  comentarioSQLDobleGuion: /(\-\-+).*/gm, //=> //comentario
  comentarioSQLMedio1:  /\/(\*+)(|\n+.*)(|[^*]*)/g, /* mas o menos contenido*/
  comentarioSQLMedio2: /(|(?:\*(?!)(|[^*]*)(|[*]+[^*]+))*?)\*+\//, /* mas o menos*/
  comentarioSQLSencillo: /\/\*+([^/]*)\*+\//g, /* comentario linea */
  comentarioSQLVacio:    /\/\*+\*+\//g, //=> /**/
  campoConsecutivoIntls: /^\w+\d{3}/m, //=> Campo002, SQL002
  componentesIntls:    /^\[[\W\w]*?(?=(^\[))/g, //=> [Componente] contenidoCmp [
  campoIntlsYcontinua: /^.*?\=<CONTINUA>|<CONTINUA>/gm, //=> SQL002=<CONTINUA>algo
  continuaAlInicio: /(?<=^.*?\=)<CONTINUA>/m, //=> SQL002= <CONTINUA> Algo
  continuaFinal:    /(?<=.*?)\<CONTINUA\>(\s+|)$/, //=> SQL= Algo <CONTINUA>
  espaciosEntrePalabras1: /(?=\s(\@|\(|\=|\<|\>|\[|\]|\*|\.|\&|\,|\'|\-|\,\@))/gm,
  espaciosEntrePalabras2: /((?=\s(\]\(|\#|\=\@|\(\@|\/|\+|\s\w+\+|\w+)))|((?=\n)|\s)/,
  guionBajoTipoEsp: /\_(?=(frm|vis|tbl|dlg|rep))/gi, //=> Achivo_FRM
  iniCorcheteLineaVacia: /^\[$/m, //=> [
  lineasBlancas: /^\n[\s\t]*/gm,
  nomAccion: /(?!\[\])\[.*?\]/g, //=> [ActivoFijo.tbl/FechaEmision] ang
  nomArchivoEnRuta: /.*\\|.*\//, //=> Busca 'c:/' hasta 'Nombre Archivo.txt'
  nomComponente: /(?<=^\[)\w*\.(tbl|vis|frm|rep|dlg)(?=\/)/gm, //=> NomComponente.frm
  nomExtCmp:   /(?<=\[).*?\.(frm|vis|tbl|dlg|rep)/gi, //=> Si ^[ extrae Componente.frm
  nomYtipoEsp: /.*(\/|\\)|\_MAVI.*|\.esp/gi, //De: \File_FRM_MAVI.esp Busca File_FRM
  //parentesisAnidados: /(\((?>[^()]+|(?1))*\))/gm,
  puntoExtension:   /\.(?=\w+$)/gim, //=> De: Achivo.FRM Busca .FRM
  saltoLineaVacio:  /^\n[\s\t]*/gm, //=> \n\s\t Lineas vacias espacios y tabulador
  tabulador:  /\t/mg, //=> \t
  tituloComponente: /^\[.*\]/gm, //=> [ActivoFijo.tbl/FechaEmision] btw
  tipoEspEnNomenclatura: /(?<=\_)\w+(?=\_)/gi, //=> _FRM_
  withNolock1: /(\s+|\n+|\s+\n+)with(|\s+|\n+|\s+\n+)\((|\s+|\n+|\s+\n+)/gim, //=> With
  withNolock2: /(rowlock|nolock)(|\s+|\n+|\s+\n+)\)///=> With (rowlock|nolock)

}

const rgxCrear = {
  ansis: () => { return new RegExp(jsonRegEx.ansis1.source + jsonRegEx.ansis1.source,
                              (jsonRegEx.ansis1.global ? 'g' : '') 
                            + (jsonRegEx.ansis1.ignoreCase ? 'i' : '')
                            + (jsonRegEx.ansis1.multiline ? 'm' : ''))},
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
  comentarioSQLMedio: () => { return new RegExp(jsonRegEx.comentarioSQLMedio1.source
                            + jsonRegEx.comentarioSQLMedio2.source, 
                              (jsonRegEx.comentarioSQLMedio1.global ? 'g' : '') 
                            + (jsonRegEx.comentarioSQLMedio1.ignoreCase ? 'i' : '')
                            + (jsonRegEx.comentarioSQLMedio1.multiline ? 'm' : ''))},
  espaciosEntrePalabras: () => {return jsonRegEx.espaciosEntrePalabras1.source
                            + jsonRegEx.espaciosEntrePalabras2.source,
                              (jsonRegEx.espaciosEntrePalabras1.global ? 'g' : '') 
                            + (jsonRegEx.espaciosEntrePalabras1.ignoreCase ? 'i' : '')
                            + (jsonRegEx.espaciosEntrePalabras1.multiline ? 'm' : '')},
  extraerCmpPorNom:   nomCmt => { return new RegExp(`\\[${nomCmt}[^~]*?(?=\\[)`, `gi`)},
  witchNolock: () => { return new RegExp(jsonRegEx.withNolock1.source
                            + jsonRegEx.withNolock2.source,
                              (jsonRegEx.withNolock1.global ? 'g' : '') 
                            + (jsonRegEx.withNolock1.ignoreCase ? 'i' : '')
                            + (jsonRegEx.withNolock1.multiline ? 'm' : ''))}
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
  clsComentariosSQL: texto => {
                        texto = texto.replace(jsonRegEx.comentarioSQLVacio, '')
                        texto = texto.replace(jsonRegEx.comentarioSQLSencillo, '')
                        texto = texto.replace(rgxCrear.comentarioSQLMedio(), '')
                        texto = texto.replace(jsonRegEx.comentarioSQLAvanzado, '')
                        texto = texto.replace(jsonRegEx.comentarioSQLDobleGuion, '')
                        return texto
                      },
  clsIniCorcheteVacio: texto => { return texto.replace(
                                                jsonRegEx.iniCorcheteLineaVacia,
                                              '')
                                     },
  clsPoliticas: texto => { 
      texto = texto.replace(rgxCrear.ansis(), '')
      return texto.replace(rgxCrear.witchNolock(), '')
  },
  clsRuta: ruta  => { return ruta.replace(jsonRegEx.nombreArchivoEnRuta, '')},
  clsSaltoLineaVacio: texto => { return texto.replace(
                                                jsonRegEx.saltoLineaVacio, 
                                              '')
                               },
  clsTextoBasura: texto => {
    texto = texto.replace(jsonRegEx.saltoLineaVacio, '')
    texto = texto.replace(jsonRegEx.tabulador, ' ')
    texto = texto.replace(rgxCrear.espaciosEntrePalabras(), '')
    texto = texto.replace(jsonRegEx.ampersand, '')
    return texto
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
                                     }
}

module.exports.expresiones = jsonRegEx
module.exports.crearRegEx =  rgxCrear
module.exports.jsonReplace = rgxReplace