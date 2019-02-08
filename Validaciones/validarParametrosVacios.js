function verificarParametrosVacios (funcion) {
    for (key in funcion.callee.arguments) {

        if (funcion.callee.arguments[key] == '' || funcion.callee.arguments[key] == null || funcion.callee.arguments[key] == undefined) {
            return true
        }
    }
}

module.exports.validarParametrosVacios = verificarParametrosVacios