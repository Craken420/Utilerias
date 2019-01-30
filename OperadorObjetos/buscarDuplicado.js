exports.buscarDuplicado = arreglo => {
    var object = {}
    var result = []

    arreglo.forEach(item => {
        if(!object[item])
            object[item] = 0
        object[item] += 1
    })

    for (var prop in object) {
        if(object[prop] > 1) {
            result.push(prop)
        }
    }

    return result
}

