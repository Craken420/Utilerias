const { applyRules } = require('../Reglas/applyRules')
const { deleteObjEmpty } = require('../OperadorObjetos/deleteEmptyObj')

function getContentsAllFields (field, obj) {
    let objReturn = obj
    let content = ''

    for (key in objReturn) {

        if ( objReturn[key][field] ) {

            let objSend = objReturn[key]

            if ( applyRules(field, objSend) ) {
                content += objReturn[key][field] + '\n'
            }
        }
    }

    if (content) {
        return content
    }
}

function getFields (fields, obj) {
    //Aplicar las reglas para mandar los cambios que si aplican
    for (key in obj) {

        for (key2 in obj[key]) {
            // console.log(key2)
            if (fields.length != 0){
                if (!new RegExp(`^\\b(${fields.join('|')})\\b`, `m`).test(key2)) {
                    delete obj[key][key2]
                }
            }
        }
    }

    return deleteObjEmpty(obj)
}

module.exports.getContentsAllFields = getContentsAllFields
module.exports.getFields = getFields