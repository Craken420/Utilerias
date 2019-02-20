
/*** Operadores de cadena ***/
const rgx  = require('../RegEx/jsonRgx')
const { decode } = require('../OperadorObjetos/decode')
const pcrArchivos = require('../OperadoresArchivos/procesadorArchivos')

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

            pcrArchivos.agregarArchivo('Reporte.txt',
            `\n    Case: Sin Lista\n`)

            if (!/\(Todos\)|Seleccionar|Cerrar/i.test(content)) {
                return content.split('<BR>')
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

        if (obj[nameCmp][field]) {

            pcrArchivos.agregarArchivo('Reporte.txt',
                field + '=' + obj[nameCmp][field]
            )

            if (nameCmp == 'Forma') {
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
    })
}

function oppAbduction (content, extFile, obj) {
    switch (extFile) {
        case '.frm': {
            abducteList(array.camposFrm, 'Forma', obj)
            break
        }
    }
    
}


module.exports.oppAbduction = oppAbduction