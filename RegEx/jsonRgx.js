/***
 * Glosario:
 * Intls: Intelisis
 * Cmp:   Componente
 * Diff:  Diferente
 * Nom:   Nombre
 */

const jsonRegEx = {
  comentariosLineaIntls: /^;.*/gm, //=> ;Comentario
  componentesIntls:    /^\[[\W\w]*?(?=(^\[))/g, //=> [Componente] contenidoCmp [
  guionBajoTipoEsp: /\_(?=(frm|vis|tbl|dlg|rep))/gi, //=> Achivo_FRM
  iniCorcheteLineaVacia: /^\[$/m, //=> [
  nomExtCmp:   /(?<=\[).*?\.(frm|vis|tbl|dlg|rep)/gi, //=> Si ^[ extrae Componente.frm
  nomYtipoEsp: /.*(\/|\\)|\_MAVI.*|\.esp/gi, //De: \File_FRM_MAVI.esp Busca File_FRM
  puntoExtension:   /(?<=\.)\w+$/gim, //=> De: Achivo.FRM Busca .FRM
  saltoLineaVacio:  /^\n[\s\t]*/gm, //=> \n\s\t Lineas vacias espacios y tabulador
  tipoEspEnNomenclatura: /(?<=\_)\w+(?=\_)/gi //=> _FRM_

}

const rgxCrear = {
  cmpDiffNomArchivo:  nomCmt => { return new RegExp(
                        `\\[(?!\\w+;)(?!${nomCmt})(?=.*?\\/.*?\\])[^~]*?(?=(\\n|)^\\[)`,
                        `gim`
                      )},
  extraerCmpPorNom:   nomCmt => { return new RegExp(`\\[${nomCmt}[^~]*?(?=\\[)`, `gi`)}
}

const rgxReplace = {
  addEspacioCmp:        texto => { return texto.replace(/^\[/gm, ' \n[')},
  crearNomenclaturaEsp: texto => { return texto.replace(
                                    jsonRegEx.guionBajoTipoEsp, '_')
                                 },
  clsComentariosIntls: texto => { return texto.replace(
                                                jsonRegEx.comentariosLineaIntls,
                                              '')
                                },
  clsIniCorcheteVacio: texto => { return texto.replace(
                                                jsonRegEx.iniCorcheteLineaVacia,
                                              '')
                                },
  clsSaltoLineaVacio: texto => { return texto.replace(
                                                jsonRegEx.saltoLineaVacio, 
                                              '')
                               },
  extraerNomTipoEsp: ruta => { return ruta.replace( jsonRegEx.nomYtipoEsp, '')},
  minusculasPorMayuscula: texto => { return texto.replace(
                                              jsonRegEx.puntoExtension,
                                              archivoFrm => {
                                                return archivoFrm.toLowerCase()
                                              }
                                            )
                                   },
  puntoPorGuionBajoTipoEsp: nomTipoEsp => { return  nomTipoEsp.replace(
                                                      jsonRegEx.guionBajoTipoEsp, '.'
                                                    )
                                          },
  tipoEspAMayusculas: texto => { return texto.replace(
                                          jsonRegEx.tipoEspEnNomenclatura,
                                          texto => texto.toUpperCase()
                                        )
                               }
}

module.exports.expresiones = jsonRegEx
module.exports.crearRegEx =  rgxCrear
module.exports.jsonReplace = rgxReplace