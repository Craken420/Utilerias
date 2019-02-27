function applyRuleExpresion(obj) {

    if (obj['TipoAccion']) {

        obj['TipoAccion'] == 'Expresion'

        return true
    } else {
        false
    }
}

function applyRules (field, obj) {
    switch (field) {
        case 'Expresion': {
            return applyRuleExpresion(obj)
        }
        default: {
            return true
        }
    }
}

module.exports.applyRules = applyRules