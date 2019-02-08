/***
 * Glosario:
 * Intls: Intelisis
 * Cmp: Componente
 */

const rgxAgregar ={
  addEspacioCmp: texto => { return texto.replace(/^\[/gm, ' \n[')}
}

const rgxCrear = {
  ansis: () => { return new RegExp(rgxExpresiones.ansis1.source + rgxExpresiones.ansis1.source,
                                      (rgxExpresiones.ansis1.global ? 'g' : '') 
                                    + (rgxExpresiones.ansis1.ignoreCase ? 'i' : '')
                                    + (rgxExpresiones.ansis1.multiline ? 'm' : '')
                                  )
                              },

  espaciosEntrePalabras: () => {return new RegExp(rgxExpresiones.espaciosEntrePalabras1.source
                                    +  rgxExpresiones.espaciosEntrePalabras2.source,
                                      (rgxExpresiones.espaciosEntrePalabras1.global ? 'g' : '') 
                                    + (rgxExpresiones.espaciosEntrePalabras1.ignoreCase ? 'i' : '')
                                    + (rgxExpresiones.espaciosEntrePalabras1.multiline ? 'm' : ''))},

  campoSinDigito: tipoCampo => { return new RegExp(`^${tipoCampo}\\=.*`, `gim`)},

  campoConDigito: tipoCampo => { return  new RegExp(`^${tipoCampo}\\d{3}\\=.*`, `gim`)},

  campoConSinDigito: tipoCampo => { return  new RegExp(`^${tipoCampo}(\\d{3}|)\\=.*`,`gim`)},

  cmpDiffNomArchivo: nomCmt => { return new RegExp(
      `\\[(?!\\w+;)(?!${nomCmt})(?=.*?\\/.*?\\])[^~]*?(?=(\\n|)^\\[)`,
      `gim`
  )},

  comentarioSQLMedio: () => { return new RegExp(rgxExpresiones.comentarioSQLMedio1.source
                                                +  rgxExpresiones.comentarioSQLMedio2.source, 
                                                  (rgxExpresiones.comentarioSQLMedio1.global ? 'g' : '') 
                                                + (rgxExpresiones.comentarioSQLMedio1.ignoreCase ? 'i' : '')
                                                + (rgxExpresiones.comentarioSQLMedio1.multiline ? 'm' : '')
                                              )
                                          },

  contenidoCampo: campo => { return new RegExp(`(?<=^${campo}\\=).*`, `gm`)},

  deInicioAFin: (textoInicio, textoFin) => { return new RegExp (`${
                                              rgxPreparacion.prepararRegEx(
                                                  textoInicio
                                              )}[^]*${rgxPreparacion.prepararRegEx(
                                                  textoFin
                                              ).replace(/\\s$/, '')}`, ``)
                                           },

  extraerCmpPorNom: nomCmt => { return new RegExp(`^\\[(.*?|)${nomCmt}[^]*?(?=^\\[)|\\[[^]*$`, `gim`)},

  witchNolock: () => { return new RegExp(    rgxExpresiones.withNolock1.source
                                          +  rgxExpresiones.withNolock2.source,
                                            (rgxExpresiones.withNolock1.global ? 'g' : '')
                                          + (rgxExpresiones.withNolock1.ignoreCase ? 'i' : '')
                                          + (rgxExpresiones.withNolock1.multiline ? 'm' : '')
                                        )
                                  }
}


const rgxCls = {
  clsBloqueTexto: (contenidoOriginal, bloqueTxtEliminar) => {
      return  contenidoOriginal.replace(
                  rgxCrear.deInicioAFin(
                      rgxExtractor.extrarPrimerasDosLineas(bloqueTxtEliminar),
                      rgxExtractor.extraerUltimasDosLineas(bloqueTxtEliminar)
                  ),
                  ''
              )
  },

  clsComentariosSQL:  texto => {
                        texto = texto.replace(rgxExpresiones.comentarioSQLVacio, '')
                        texto = texto.replace(rgxExpresiones.comentarioSQLSencillo, '')
                        texto = texto.replace(rgxCrear.comentarioSQLMedio(), '')
                        texto = texto.replace(rgxExpresiones.comentarioSQLAvanzado, '')
                        texto = texto.replace(rgxExpresiones.comentarioSQLDobleGuion, '')
                        return texto
                      },

  clsCampoIntlsYContinua: campoIntls => { return campoIntls.replace(rgxExpresiones.campoIntlsYcontinua, '')},

  clsComentariosIntls: texto => { return texto.replace(rgxExpresiones.comentariosLineaIntls, '')},

  clsComentariosSQL: texto => {
      texto = texto.replace(rgxExpresiones.comentarioSQLVacio, '')
      texto = texto.replace(rgxExpresiones.comentarioSQLSencillo, '')
      texto = texto.replace(rgxCrear.comentarioSQLMedio(), '')
      texto = texto.replace(rgxExpresiones.comentarioSQLAvanzado, '')
      texto = texto.replace(rgxExpresiones.comentarioSQLDobleGuion, '')
      return texto
  },

  clsEspacioEntrePalabras:  texto => { return texto.replace(rgxExpresiones.espaciosEntrePalabrasOtimizada, ' ')},

  clsIniCorcheteLineaVacia: texto => { return texto.replace(rgxExpresiones.iniCorcheteLineaVacia, '')},

  clsEspacioEntrePalabras:  texto => { return texto.replace(rgxExpresiones.espaciosEntrePalabras, ' ')},

  clsPoliticas: texto => {
      texto = texto.replace(rgxCrear.ansis(), '')
      return texto.replace(rgxCrear.witchNolock(), '')
  },

  clsTextoBasura: texto => {
      texto = texto.replace(rgxExpresiones.saltoLineaVacio, '')
      texto = texto.replace(rgxExpresiones.tabulador, ' ')
      texto = texto.replace(rgxExpresiones.ampersand, '')
      return texto
  },

  clsRuta: ruta  => { return ruta.replace(rgxExpresiones.nomArchivoEnRuta, '')},

  clsSaltoLineaVacio: texto => { return texto.replace(rgxExpresiones.saltoLineaVacio, '') },
}

const rgxExpresiones = {
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

  componentesIntls: /\[[\W\w]*(?=^\[)|\[[^]*$/gm, //=> [Componente] contenidoComponente [

  campoIntlsYcontinua: /^.*?\=<CONTINUA>|<CONTINUA>/gm, //=> SQL002=<CONTINUA>algo

  contenidoComponente: /(?<=\[.*\])[^]*?(?=\[(?!\]))/g, //=> Sin [nom] extrae hasta [

  continuaInicio: /(?<=^.*?\=)<CONTINUA>/m, //=> SQL002= <CONTINUA> Algo

  continuaFinal: /(?<=.*?)\<CONTINUA\>(\s+|)$/, //=> SQL= Algo <CONTINUA>

  espaciosEntrePalabras1: /(?=\s(\@|\(|\=|\<|\>|\[|\]|\*|\.|\&|\,|\'|\-|\,\@))/gm,

  espaciosEntrePalabras2: /((?=\s(\]\(|\#|\=\@|\(\@|\/|\+|\s\w+\+|\w+)))|((?=\n)|\s)/,

  espaciosEntrePalabras: /(?<!\s)(?<=([\w]+|[\W]+)(?!\r\n))\s+(?=([\w]+|[\W]+))/g, //=> espacios'  'entre texto

  guionBajoTipoEsp: /\_(?=(frm|vis|tbl|dlg|rep))/gi, //=> Achivo_FRM

  iniCorcheteLineaVacia: /^\[$/m, //=> [

  iniLineLetra: /^(?=\w)/gm, //=> "ola" no toma "[ola]"

  lineasBlancas: /^\n[\s\t]*/gm, //=> \n \t \s Tabulador, Espacios o Salto de linea en blanco

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

const rgxExtractor = {
  extraerCampoContenido: (texto, campo) => {return texto.match(rgxCrear.campoSinDigito(campo))},

  extraerCmpPorNom: (texto, nomComponente) => { return  texto.match(rgxCrear.extraerCmpPorNom(nomComponente))},

  extraerNomTipoEsp:      ruta  => { return ruta.replace(rgxExpresiones.nomYtipoEsp, '')},

  extraerPrimerasDosLineas:  texto => { return texto.match(/.*?\r\n.*?\r\n/).join('')},

  extraerPrimeraLinea:       texto => { return texto.match(/.*/).join('')},

  extraerUltimasDosLineas:   texto => {
    let lineaFinal = texto.replace(/^\s\n/gm, '').split('\r\n')
    return  lineaFinal[lineaFinal.length-2] + '\r\n'
          + lineaFinal[lineaFinal.length-1]
  },

  extraerUltimaLinea:  texto => {
    let lineaFinal = texto.replace(/^\s\n/gm, '').split('\r\n')
    return lineaFinal[lineaFinal.length-1]
  }
}

const rgxPreparacion = {
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
  }
}

const rgxReplace = {
  dosPuntosPorIgual: texto => { return texto.replace(/=/g, ':')},

  puntoPorGuionBajoTipoEsp: nombreTipoEsp => { return nombreTipoEsp.replace(rgxExpresiones.guionBajoTipoEsp, '.')},

  minusculasPorMayuscula: texto => { return texto.replace(
      rgxExpresiones.puntoExtension,
      archivoFrm => {
        return archivoFrm.toLowerCase()
      }
    )
  },

  remplazarBloqueTextoPorOtro: (contenidoOriginal, contenidoARemplazar, contenidoParaRemplazo) => {
      return  contenidoOriginal.replace(
              rgxCrear.deInicioAFin(
                  rgxExtractor.extrarPrimerasDosLineas(contenidoARemplazar),
                  rgxExtractor.extraerUltimasDosLineas(contenidoARemplazar)
              ),
              contenidoParaRemplazo
              )
  },

  saltoLineaPorComaEspacio: texto => { return texto.replace(rgxExpresiones.saltoLineaVacio,', ')}
}

module.exports.Agregar     = rgxAgregar
module.exports.Borrar      = rgxCls
module.exports.Crear       = rgxCrear
module.exports.Expresiones = rgxExpresiones
module.exports.Extraer     = rgxExtractor
module.exports.Preparar    = rgxPreparacion
module.exports.Remplazar   = rgxReplace