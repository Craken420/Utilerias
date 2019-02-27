const cm =  require('../Abductor/cmpInObj')
const cntnt = require('../Abductor/getContentsAllFields')
// const fields = ['Expresion', 'ExpresionesAlMostrar']
const {arregloCampos} = require('../Archivos/arregloCamposIntelisis')
const { getObjsSQL } = require('../Abductor/getObjsSQL')




exports.desglozar = function(obj) {

    obj = cntnt.getFields(arregloCampos, obj)

    for (key in obj) {
        obj[key] = getObjsSQL(obj[key])
    }

    console.log(obj)
    return obj
}
