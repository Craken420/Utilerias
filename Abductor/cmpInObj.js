const { unirCamposConsecutivosComponente } = require('../OperarCadenas/unirConsecutivoPorComponente')
const { unirOriginalSobrEscritura } = require('../OperadorObjetos/unirCmpOriginalEsp')
const { extraerContenidoRecodificado } = require('../Codificacion/contenidoRecodificado')
const rgx = require('../RegEx/jsonRgx')
const { decode } = require('../OperadorObjetos/decode')

function getObjects (content1, content2, nameCmp) {

    if (content1 && content2 && nameCmp) {

        let objOriginal = cmpInObj(
            nameCmp,
            content1
        )

        let objEsp = cmpInObj(
            nameCmp,
            content2
        )

        return {
            objOriginal: objOriginal,
            objEsp:objEsp
        }
    } else {
        console.log('Ingresa los parámetros completos: ' + arguments.callee.name)
        return false
    }
}

function getMeltObjec (acceso, fileOriginal, fileDlg) {

    let objs = getObjects(fileOriginal, fileDlg, acceso)

    if (objs.objOriginal && objs.objEsp) {
        // console.log(unirOriginalSobrEscritura(objs.objOriginal, objs.objEsp))
        return unirOriginalSobrEscritura(objs.objEsp, objs.objOriginal)
    } else if (objs.objOriginal ) {
        return objs.objOriginal
    } else if (objs.objEsp) {
        return objs.objEsp
    } else {
        console.log('Ingresa los parámetros completos: ' + arguments.callee.name)
        return false
    }

}


const cmpInObj =  function (nameCmp, content) {

    let obj = decode(
        rgx.Borrar.clsComentariosIntls(
            unirCamposConsecutivosComponente(
                content
            )
        ).replace(/&/g, '') + '\n'
    )

    let nameCmpRgx = new RegExp (`(?<=^\\[)(.*?${nameCmp}|${nameCmp})(?=\\])`,`gm`)

    if (nameCmpRgx.test(content)) {
        
        let fullNameCmp = content.match(nameCmpRgx)

        if (fullNameCmp.length =! 0) {
            return obj[fullNameCmp.join('')]
        }
    }
}

function multiCmpInObjEsp (cmps, pathOriginal, pathDlg) {

    let obj = {}

    cmps.forEach(cmp => {

        if (cmps && pathOriginal && pathDlg) {

            let objGet = getMeltObjec(
                cmp,
                extraerContenidoRecodificado(pathOriginal),
                extraerContenidoRecodificado(pathDlg)
            )

            if (objGet) {

                obj[cmp] = objGet

            }
        } else {
            console.log('Ingresa los parámetros completos: ' + arguments.callee.name)
            return false
        }
    })

    return obj
}


function multiCmpInObjOriginal (cmps, pathOriginal) {

    let obj = {}

    cmps.forEach(cmp => {

        if (cmps && pathOriginal) {
            let objOriginal = cmpInObj(
                cmp,
                extraerContenidoRecodificado(pathOriginal),
                decode(
                    rgx.Borrar.clsComentariosIntls(
                        unirCamposConsecutivosComponente(
                            extraerContenidoRecodificado(pathOriginal)
                        )
                    ).replace(/&/g, '') + '\n['
                )
            )

            if (objOriginal) {

                obj[cmp] = objOriginal

            }
        }  else {
            console.log('Ingresa los parámetros completos: ' + arguments.callee.name)
            return false
         }
    })

    return obj
}

module.exports.multiCmpInObjOriginal = multiCmpInObjOriginal
module.exports.multiCmpInObjEsp = multiCmpInObjEsp
module.exports.cmpInObj = cmpInObj