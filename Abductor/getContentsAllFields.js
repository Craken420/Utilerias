const { applyRules } = require('../Reglas/applyRules')
const { deleteObjEmpty } = require('../OperadorObjetos/deleteEmptyObj')
function getContentsAllFields (field, obj) {

    let content = ''

    for (key in obj) {

        if ( obj[key][field] ) {

            let objSend = obj[key]

            if ( applyRules(field, objSend) ) {
                content += obj[key][field] + '\n'
            }
        }
    }

    if (content) {
        return content
    }
}

function getFields (fields, obj) {

    for (key in obj) {

        for (key2 in obj[key]) {

            if (!new RegExp(`\b${fields.join('|')}\b`, ``).test(key2)) {
                delete obj[key][key2]
            }
        }

    }

    obj = deleteObjEmpty(obj)
    return obj
}

module.exports.getContentsAllFields = getContentsAllFields
module.exports.getFields = getFields