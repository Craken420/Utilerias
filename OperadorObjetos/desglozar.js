const {arregloCampos} = require('../Archivos/arregloCamposIntelisis')
const { getObjsSQL } = require('../Abductor/getObjsSQL')
const { verify } = require('../Validaciones/verifyReturn')
const { arregloSinDuplicado } = require('./eliminarDuplicado')

const cntnt = require('../Abductor/getContentsAllFields')
const intls = require('../Abductor/getObjsIntls')
const opObj = require('../OperadorObjetos/deleteEmptyObj')


function verifiReturn (objIntls, objSQL) {
    
    if (JSON.stringify(objIntls) != '{}' && JSON.stringify(objSQL) != '{}') {
 
        if (objIntls && objSQL) {
            return {
                objIntls: objIntls,
                objSQL: objSQL
            }
        } else if (objSQL) {
            return {
                objSQL:objSQL
            }
        } else if (objIntls) {
            return {
                objIntls: objIntls
            }
        } else {
            return false
        }

    }  else if (JSON.stringify(objSQL) != '{}') {
        if (objSQL) {
            return {
                objSQL:objSQL
            }
        }  else {
            return false
        }
    } else if (JSON.stringify(objIntls) != '{}') {
        if (objIntls) {
            return {
                objIntls: objIntls
            }
        }
    } else {
        return false
    }
}

function getObjs (text) {
    let objIntls = intls.getObjsIntls(text)
    let objSQL = getObjsSQL(text)
    return verify( { objIntls, objSQL } )
}


function limpiarObjeto(cutObj, cmp, field) {
    delete cutObj[cmp]['TipoAccion']

    if (typeof(cutObj[cmp][field]) == 'string') {
        delete cutObj[cmp][field]
    }

    if (typeof(cutObj[cmp]['ClaveAccion']) == 'string') {
        if (!/Formas|Reportes|Dialogos/gi.test(cutObj[cmp]['ClaveAccion'])) {
            delete cutObj[cmp]['ClaveAccion']
        }
    }
}

function cargarObjeto (cutObj) {

    let objGeneral = []

    let arrDlg = []
    let arrForma = []
    let arrPlugin = []
    let arrRep= []
    let arrTbl = []
    let arrVariables = []

    let arrSP = []
    let arrFn = []
    let arrTb = []

    opObj.deleteObjEmpty(cutObj)

    for (key2 in cutObj) {

        for (key3 in cutObj[key2]) {

            if (cutObj[key2][key3]['objIntls']) {
                if (cutObj[key2][key3]['objIntls']['frm']) {
                    arrForma.push(cutObj[key2][key3]['objIntls']['frm'])
                }
                if (cutObj[key2][key3]['objIntls']['dlg']) {
                    arrDlg.push(cutObj[key2][key3]['objIntls']['dlg'])
                }
                if (cutObj[key2][key3]['objIntls']['plugin']) {
                    arrPlugin.push(cutObj[key2][key3]['objIntls']['plugin'])
                }
                if (cutObj[key2][key3]['objIntls']['tbl']) {
                    arrTbl.push(cutObj[key2][key3]['objIntls']['tbl'])
                }
                if (cutObj[key2][key3]['objIntls']['rep']) {
                    arrRep.push(cutObj[key2][key3]['objIntls']['rep'])
                }
                if (cutObj[key2][key3]['objIntls']['variables']) {
                    arrVariables.push(cutObj[key2][key3]['objIntls']['variables'])
                }
            }

            if (cutObj[key2][key3]['objSQL']) {
                if (cutObj[key2][key3]['objSQL']['sp']) {
                    arrSP.push(cutObj[key2][key3]['objSQL']['sp'])
                }
                if (cutObj[key2][key3]['objSQL']['fn']) {
                    arrFn.push(cutObj[key2][key3]['objSQL']['fn'])
                }
                if (cutObj[key2][key3]['objSQL']['tb']) {
                    arrTb.push(cutObj[key2][key3]['objSQL']['tb'])
                }
            }
        }
    }

    objGeneral['fn'] = arregloSinDuplicado(arrFn).join(',')
    objGeneral['sp'] = arregloSinDuplicado(arrSP).join(',')
    objGeneral['tb'] = arregloSinDuplicado(arrTb).join(',')

    objGeneral['dlg'] = arregloSinDuplicado(arrDlg).join(',')
    objGeneral['frm'] = arregloSinDuplicado(arrForma).join(',')
    objGeneral['plugin'] = arregloSinDuplicado(arrPlugin).join(',')
    objGeneral['rep'] = arregloSinDuplicado(arrRep).join(',')
    objGeneral['tbl'] = arregloSinDuplicado(arrTbl).join(',')
    objGeneral['variables'] = arregloSinDuplicado(arrVariables).join(',')

    return {
        ['Relacion De Objs']: objGeneral,
        ['Detalle']: cutObj
    }
}

exports.desglozar = function(obj) {

    let cutObj = {}

    cutObj = JSON.parse( JSON.stringify( obj ) )
    
    cntnt.getFields(arregloCampos, cutObj)

    for (keyCmp in cutObj) {

        let cmp = keyCmp
  
        let objs = {}

        for (keyField in cutObj[cmp]) {
            let field = keyField

            objs = getObjs(cutObj[cmp][field])

            if (objs) {
                cutObj[cmp][field] = objs
            }

            let objsInField = intls.getObjInClaveAccion(cutObj, cmp, field)

            if (objsInField) {
                cutObj[cmp]['ClaveAccion'] =  objsInField
            }

            limpiarObjeto(cutObj, cmp, field)

            // intls.getObjIntlsCmp(cutObj, cmp, field)
            // console.log('-----------------------------------------------')
            // console.log('Obj')
            // console.log(objs)
            // console.log('-----------------------------------------------')
        }
    }

    return cargarObjeto(cutObj)
}

