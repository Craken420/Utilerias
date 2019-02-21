const path = require('path')
/*** Operadores de cadena ***/
const rgx  = require('../RegEx/jsonRgx')
const { decode } = require('../OperadorObjetos/decode')
const { extraerContenidoRecodificado } = require('../Codificacion/contenidoRecodificado')
const pcrArchivos = require('../OperadoresArchivos/procesadorArchivos')

const { unirCamposConsecutivosComponente } = require('../OperarCadenas/unirConsecutivoPorComponente')
const array = require('../Archivos/arregloCamposIntelisis')

function abductCampoLista (field, fields, nameCmp, obj) {

    let content = obj[nameCmp][field]

    switch (content) {

        case '(Lista)': {
            pcrArchivos.agregarArchivo('Reporte.txt',
             '\n[' + nameCmp + '.' + field + ']\n')

            if (obj[ `${ nameCmp }.${field}` ] != undefined) {

                return Object.getOwnPropertyNames(obj[ `${ nameCmp }.${ field }` ])

            } else {
                break
            }
        }
        case 'Lista': {

            abducteList(fields, content, obj)

            break
        }
        case '(Variables)': {

            abducteList(fields, content, obj)

            break
        }
        default : {

            //console.log(`\n    Case: Sin Lista\n`)

            if (content != undefined) {
                if (!/\(Todos\)|Seleccionar|Cerrar/i.test(content)) {
                    return content.split('<BR>')
                }
            }
        }
    }
}

function abducirTotalizador (fields, nameCmp, obj) {

    if(obj[nameCmp]['Totalizadores'] == 'S') {

        pcrArchivos.agregarArchivo('Reporte.txt',
            '\n[' + nameCmp + '.' +'Totalizadores' + ']\n'
        )

        abducteList(fields, '(Carpeta Totalizadores)', obj)
    }
}

function abducteList (fields, nameCmp, obj) {

    pcrArchivos.agregarArchivo('Reporte.txt',
        `[${nameCmp}]\n`
    )

    fields.forEach(field => {

        if (obj[ nameCmp ]) {

            // pcrArchivos.agregarArchivo('Reporte.txt',
            //     '\nobj[ nameCmp ]' + obj[ nameCmp ]
            // )

            if (obj[ nameCmp ][ field ]) {

                // pcrArchivos.agregarArchivo('Reporte.txt',
                //     obj[nameCmp][field]
                // )

                pcrArchivos.agregarArchivo('Reporte.txt',
                    field + '=' + obj[nameCmp][field] + '\n'
                )

                if (nameCmp == Object.keys(obj)[0]) {
                    abducirTotalizador(fields, nameCmp, obj)
                }

                let arrayList = abductCampoLista(field, fields, nameCmp, obj)

                if (arrayList) {

                    pcrArchivos.agregarArchivo('Reporte.txt',
                        'Lista: ' + arrayList + '\n\n'
                    )

                    if (field == 'ListaCarpetas') {

                        arrayList.forEach(item => {

                            if  (obj[item]) {
                                abducteList(fields, item, obj)
                            }
                        })
                    }
                }
            }
        }
        
    })
}

function oppAbduction (pathFile) {
    let fileContent = extraerContenidoRecodificado(pathFile) + '\n['

    let obj = decode(
        rgx.Borrar.clsComentariosIntls(unirCamposConsecutivosComponente(fileContent)).replace(/&/g, '') +'\n[',
        pathFile
    )

    switch (path.extname(pathFile)) {

        case '.frm': {
            abducteList(array.camposFrm, 'Forma', obj)
            break
        }
        case '.tbl': {
            abducteList(array.camposTbl, 'Tabla', obj)
            break
        }
        case '.vis': {
            abducteList(array.camposVisYRep, 'Vista', obj)
            break
        }
        case '.rep': {
            abducteList(array.camposVisYRep, 'Reportes', obj)
            break
        }
        
        default: {
            console.log('Extension no valida: ' + typeof(path))
        }
    }
}


module.exports.oppAbduction = oppAbduction