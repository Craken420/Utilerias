const fs = require('fs')
const { objIsEmpty } = require('../OperadorObjetos/deleteEmptyObj')
// function getTablesSQL (text) {
//     if (/(?<=select[^]*?)(?<=from\s+)(?!.*?select).*?(?=where|\))/gi.test(text)) {

//         let tables = text.match(
//             /(?<=select[^]*?)(?<=from\s+)(?!.*?select).*?(?=where|\))/gi
//         )
//             console.log('entro')
//         if (tables) {
//             console.log('tablas',tables.join(' '))
//             //return  tablas.join(' ').match(/\w+/g)
//         }
//         console.log('salio')
//     } else {
//         con  sole.log('No existen tablas')
//     }
// }

function getSPSQL (text) {
    //\w+(|(\.\w+)+)(?<!(\bfrom\b(\s+|)\w+|=(\s+|)\w+(|(\.\w+)+)))(?<!(?:((?<!\w)\d|\bEs\b|\bSelect\b|\bFormula\b|\bLIKE\b|\bWHEN\b|\bAS\b|\bcanales\b|\bif\b|\bBETWEEN\b|\band\b|\bnull\b|then|else)))(?=(|\s+|(?:(|\s+)<TAB>(|\s+))*|(?:(|\s+)<BR>(|\s+)(|(?:(|\s+)<TAB>(|\s+))*)))((<T>\w+<T>)|(|<T>)\{[^]*?\}(<T>|)(?:(|\s+),(|\s+)((|\s+)<BR>(|\s+)(?:(|\s+)<TAB>(|\s+))*|)((<T>|)(\{|)[^]*?(\}|<T>|.*?<BR>)(<T>|)|\w+)|)*))
    //(?<=(?:<t>|exec(ute|)\s))\w+(|(\.\w+)+)(?=(?:\s:[^]*?<t>))|((?<=(?:\bEXEC(UTE|)\b(|\s+))))\w+((\.\w+)+|)
    if (/(?<=<T>(|\s+)(Exec\s+|))\w+(?=(\s+|):\w+((,(|\s+):\w+)+|)(|\s+)<T>)/gi.test(text)) {

        return text.match(/(?<=<T>(|\s+)(Exec\s+|))\w+(?=(\s+|):\w+((,(|\s+):\w+)+|)(|\s+)<T>)/gi).join(',')
        

    } else {
        //console.log('No existen Sp')
    }
}

function getFunctionsSQL (text) {

    if (/\bfn.*?\b(?=(\s+|)\([^\(\)]*?\))/gi.test(text)) {

        return text.match(/\bfn\w+\b(?=(\s+|)\([^\(\)]*?\))/gi).join(',')
        

    } else {
        //console.log('No existen Funciones')
    }
}

function getClauseSQL (text) {
    if (/(?<=(<br>[^]*?|))(?<=\b((Procesar|Ejecutar|)SQL(|EnLista|Animado))\b(|\s+)\()[^]*?(|((?=\()[^]*?\)[^]*?)+)(?=\))(?=[^]*?<br>|\))/gi.test(text)) {

        return text.match(/(?<=(<br>[^]*?|))(?<=\b((Procesar|Ejecutar|)SQL(|EnLista|Animado))\b(|\s+)\()[^]*?(|((?=\()[^]*?\)[^]*?)+)(?=\))(?=[^]*?<br>|\))/gi).join('\n')
    } else {
        return text
    }
}

function verifyReturn (fn, sp) {

    if (fn && sp) {
        return {
            ['fn']: fn,
            ['sp']: sp
        }
    } else if (fn) {
        return {
            ['fn']: fn
        }
    } else if (sp) {
        return {
            ['sp']: sp
        }
    } else {
        return false
    }
}

function getObjsSQL (obj) {

    for (key in obj) {

        let clauseSQL = getClauseSQL(obj[key])

        let fn = getFunctionsSQL(clauseSQL)
        let sp = getSPSQL(clauseSQL)
        // let frm = 

        if (verifyReturn (fn, sp)) {

            obj[key] = verifyReturn(fn, sp)
        } else {
            delete obj[key]
        }
    }
    return obj
}

module.exports.getObjsSQL = getObjsSQL
