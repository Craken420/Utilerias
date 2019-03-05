const { verify } = require('../Validaciones/verifyReturn')

function applyRules (obj, field) {

   switch (field) {
        case 'ConFormaPrevia': {
            if (obj[field] == 'S') {

                return true
            }
            break
        }
   }
}

function getObjIntlsCmp (cutObj, cmp, field) {

    switch (field) {
        case 'FormaPrevia': {
            assingObject(cutObj, cmp, field, 'frm')
            break
        }
        case 'AyudaForma': {
            assingObject(cutObj, cmp, field, 'frm')
            break
        }
        case 'AyudaVista': {
            assingObject(cutObj, cmp, field, 'vis')
            break
        }
    }
   
}

function assingObject (cutObj, cmp, field, name) {

    let obj = {}

    if (typeof(cutObj[cmp][field]) == 'string'){
        if  (cutObj[cmp][field]) {
            obj['objIntls'] = {[name]: cutObj[cmp][field]}
            cutObj[cmp][field] = obj
        }
    }
}

function getObjInClaveAccion (getObj, cmp, field) {

    let objReturn = {}

    obj = JSON.parse( JSON.stringify( getObj[cmp] ) )

    switch (field) {
        case 'TipoAccion': {

            if (/Reporte/gi.test(obj[field])) {
                obj[field] = obj[field].replace(/(?<=Reporte).*/gi, '')
            }

            switch (obj[field]) {
                case 'Formas': {
                    objReturn['objIntls'] = { frm: obj['ClaveAccion'] }
                    return objReturn
                }
                case 'Reporte': {
                    objReturn['objIntls'] = { rep: obj['ClaveAccion'] }
                    return objReturn
                }
                case 'Dialogos': {
                    objReturn['objIntls'] = { dlg: obj['ClaveAccion'] }
                    return objReturn
                }
                default: {
                    return obj[field]
                }
            }
        }
        case 'FormaPrevia': {
            if (typeof(getObj[cmp][field]) == 'string'){
                return objReturn['frm'] = [cmp][field]
            }
        }
        case 'AyudaForma': {
            if (typeof(getObj[cmp][field]) == 'string'){
                return objReturn['frm'] = [cmp][field]
            }
        }
        case 'AyudaVista': {
            if (typeof(getObj[cmp][field]) == 'string'){
                return objReturn['vis'] = [cmp][field]
            }
        }
    }
}
function gerVar (text) {
    let variables = []

    if (/(?<=\bAsigna\b(\s+|)\().*?((?=\().*?\).*?|)*(?=\)((\s+|)<BR>|))/gi.test(text)) {

        text = text.match(/(?<=\bAsigna\b(\s+|)\().*?((?=\().*?\).*?|)*(?=\)((\s+|)<BR>|))/gi).join('\n')

        if (/(?<=^(\s+|))\w+([áñíóú]\w+|)+((\.\w+(|[áñíóú]\w+))+)(?=(\s+|),)|\b(mavi|dm\w+)([áñíóú]\w+|)+((\.\w+(|[áñíóú]\w+))+)/gim.test(text)) {
            variables.push(text.match(/(?<=^(\s+|))\w+([áñíóú]\w+|)+((\.\w+(|[áñíóú]\w+))+)(?=(\s+|),)|\b(mavi|dm\w+)([áñíóú]\w+|)+((\.\w+(|[áñíóú]\w+))+)/gim).join(','))
        }

        //console.log(text)
    }

    if (variables.length != 0) {
        return variables.join(',')
    }
}
function getDlg (text) {
    if (/(?<=\bDialogo\b(|\s+)\((|\s+)<t>(|\s+))\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)(?=(|\s+)<t>(|\s+)\))/gi.test(text)) {
        return text.match(/(?<=\bDialogo\b(|\s+)\((|\s+)<t>(|\s+))\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)(?=(|\s+)<t>(|\s+)\))/gi).join(',')
    }
}

function getFormas (text) {

    let formas = []

    if (/(?<=\bOtraforma\b(\s+|)\((\s+|)<T>)[^]*?(?=<T>[^]*?\))/gi.test(text)) {
        text.match(/(?<=\bOtraforma\b(\s+|)\((\s+|)<T>)[^]*?(?=<T>[^]*?\))/gi).map(x => formas.push(x))
    }

    if (/(?<=\b(Actualizar|)Forma(|Modal)\b(\s+|)\((\s+|)<T>(\s+|))[^\s]*?(?=(\s+|)<T>(\s+|)\))/gi.test(text)) {
        text.match(/(?<=\b(Actualizar|)Forma(|Modal)\b(\s+|)\((\s+|)<T>(\s+|))[^\s]*?(?=(\s+|)<T>(\s+|)\))/gi).map(x => formas.push(x))
    }

    if (formas.length != 0) {
        return formas.join(',')
    }
}

function getPlugIn (text) {
    if (/(?<=Ejecutar(\s+|)\((\s+|)<T>.*?\\(\s+|))\w+([áñíóú]\w+|)+((\.\w+(|[áñíóú]\w+))+|)(?=\.exe)/gi.test(text)) {
        return text.match(/(?<=Ejecutar(\s+|)\((\s+|)<T>.*?\\(\s+|))\w+([áñíóú]\w+|)+((\.\w+(|[áñíóú]\w+))+|)(?=\.exe)/gi).join(',')
    }
}


function getTbls (text) {
    if (/\w+tbl\b/gi.test(text)) {
       return  text.match(/\w+tbl\b/gi).join(',')
    }
}

function getRep (text) {
    if (/(?<=<T>)\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)(?=(\s+|)\w+\.\d+\.\d+\.\d+(\s+|)<T>)|(?<=asigna(\s+|)\((\s+|)mavi\.reporte.*?<T>(\s+|))\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)(?=(\s+|)<T>(\s+|)\))|(?<=\b(Reporte(Pantalla|Impresora))\b(|\((\s+|)reporte.*?)(|\s+)\((|\s+)<t>(|\s+))\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)(?=(|\s+)<t>(|\s+)(\)|.*?\)))/gi.test(text)) {
        return text.match(/(?<=<T>)\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)(?=(\s+|)\w+\.\d+\.\d+\.\d+(\s+|)<T>)|(?<=asigna(\s+|)\((\s+|)mavi\.reporte.*?<T>(\s+|))\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)(?=(\s+|)<T>(\s+|)\))|(?<=\b(Reporte(Pantalla|Impresora))\b(|\((\s+|)reporte.*?)(|\s+)\((|\s+)<t>(|\s+))\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)(?=(|\s+)<t>(|\s+)(\)|.*?\)))/gi).join(',')
    }
}

function getVista (text) {

    let vis = []

    if (/(?<=ActualizarVista(|\s+)\((|\s+)<T>(|\s+))[^\s]*?(?=(|\s+)<T>(|\s+)\))/gi.test(text)) {
        text.match(/(?<=ActualizarVista(|\s+)\((|\s+)<T>(|\s+))[^\s]*?(?=(|\s+)<T>(|\s+)\))/gi).map(x => vis.push(x))
    }

    if (/\w+vis\b(?=:\w+)|\w+vis\b/g.test(text)) {
        text.match(/\w+(?=:\w+)|\w+vis\b/g).map(x => vis.push(x))
    }

    if (vis.length != 0) {
        return vis.join(',')
    }
}

function verifiReturn (frm, rep, tbl, vis) {

    if (dlg && frm && rep && tbl && vis) {
        return {
            frm: frm,
            rep: rep,
            vis: vis,
            tbl: tbl
        }
    } else if (frm && rep && tbl && vis) {
        return {
            frm: frm,
            rep: rep,
            vis: vis,
            tbl: tbl
        }
    } else if (frm && rep && vis) {
        return {
            frm: frm,
            rep: rep,
            vis: vis
        }
    } else if (frm && rep && tbl) {
        return {
            frm: frm,
            rep: rep,
            tbl: tbl
        }
    } else if (frm && tbl && vis) {
        return {
            frm: frm,
            vis: vis,
            tbl: tbl
        }
    } else if (rep && tbl && vis) {
        return {
            frm: frm,
            vis: vis,
            tbl: tbl
        }
    } else if (frm && rep) {
        return {
            frm: frm,
            vis: vis
        }
    } else if (frm && tbl) {
        return {
            frm: frm,
            vis: vis
        }
    } else if (frm && vis) {
        return {
            frm: frm,
            vis: vis
        }
    }else if (rep && tbl) {
        return {
            frm: frm,
            vis: vis
        }
    }else if (rep && vis) {
        return {
            frm: frm,
            vis: vis
        }
    }else if (tbl && vis) {
        return {
            frm: frm,
            vis: vis
        }
    } else if (rep) {
        return {
            rep: rep
        }
    } else if (frm) {
        return {
            frm: frm
        }
    } else if (frm) {
        return {
            vis: vis
        }
    } else if (tbl) {
        return {
            tbl: tbl
        }
    } else {
        return false
    }
}


//Retornar un arreglo
//Aqui se extraeran los objIntls que se encuentran en expresiones
//Se piensa que los objetos que se encuentran en campos como tipoAccion=Forma
//clave accion= frm se obtendran fuera

function getObjsIntls(text) {

    let dlg = getDlg(text)
    let frm = getFormas(text)
    let plugin = getPlugIn(text)
    let rep = getRep(text)
    let tbl = getTbls (text)
    let vis = getVista(text)
    let variables = gerVar(text)

    return verify({dlg, frm, plugin, rep, tbl, variables, vis})
    // if ( verifiReturn() ) {
    //     return verifiReturn(frm, rep, tbl, vis)
    // }
    
    //let array = []
   
    // console.log(obj)
    // getFrm(obj)
    // console.log(obj)
    // if (getFrm(returnObj)) {
    //     // console.log(getFrm(obj))
    //     return getFrm(returnObj)
    // }
}

 module.exports.getObjsIntls = getObjsIntls
 module.exports.getObjInClaveAccion = getObjInClaveAccion
 module.exports.getObjIntlsCmp = getObjIntlsCmp