function objIsEmpty (obj) {

    if (Object.entries(obj).length === 0) {

        return true
    } else {
        return false
    }
}

function deleteObjEmpty (obj) {

    for (key in obj) {

        if (objIsEmpty(obj[key])) {
            delete obj[key]
        }
    }

    return obj
}

module.exports.objIsEmpty = objIsEmpty

module.exports.deleteObjEmpty = deleteObjEmpty