const { verify } = require('../Validaciones/verifyReturn')

function getTablesSQL (text) {
    // console.log(text)
    if (/(?<=(from|JOIN)(\s+|)(<BR>(?!(Eliminar))|)(\s+|)((\w+([áñíóú]\w+|)+((\.\w+([áñíóú]\w+|))+|)(\s+\w+([\(áñíóú]\w+(\)|)|)+((\.\w+(|[áñíóú]\w+))+|)|),(\s+|))|)*)(?!(dbo(\.|)|)fn)\w+([áñíóú]\w+|)+((\.\w+(|[áñíóú]\w+))+|)((?=[^]*?(INNER|LEFT|UNION||RIGHT|WHERE|ORDER|ON))|)/gi.test(text)) {

        let tb = text.match(/(?<=(from|JOIN)(\s+|)(<BR>(?!(Eliminar))|)(\s+|)((\w+([áñíóú]\w+|)+((\.\w+([áñíóú]\w+|))+|)(\s+\w+([\(áñíóú]\w+(\)|)|)+((\.\w+(|[áñíóú]\w+))+|)|),(\s+|))|)*)(?!(dbo(\.|)|)fn)\w+([áñíóú]\w+|)+((\.\w+(|[áñíóú]\w+))+|)((?=[^]*?(INNER|LEFT|UNION||RIGHT|WHERE|ORDER|ON))|)/gi)

        if (tb.length != 0) {
            return tb.join(',')
        }
    }
}

function getSPSQL (text) {

    let sps = []

    if (/\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)(?<!(\bfrom\b(\s+|)\w+|=(\s+|)\w+(|(\.\w+)+)|and(\s+|)(\W|)\w+))(?<!(?:((?<!\w)\d|\bEs\b|\bSelect\b|\bwhere\b|\bentonces\b|\bon\b|\bFormula\b|\bLIKE\b|\bWHEN\b|\bAS\b|\bcanales\b|\bif\b|\bBETWEEN\b|\bInfo\.Acreditado\b|\band\b|\bnull\b|then|else)))(?=(|\s+|(?:(|\s+)<TAB>(|\s+))*|(?:(|\s+)<BR>(|\s+)(|(?:(|\s+)<TAB>(|\s+))*)))((<T>\w+<T>)|(|<T>)\{[^]*?\}(<T>|)(?:(|\s+),(|\s+)((|\s+)<BR>(|\s+)(?:(|\s+)<TAB>(|\s+))*|)((<T>|)(\{|)[^]*?(\}|<T>|.*?<BR>)(<T>|)|\w+)|)*))/gi.test(text)) {
        text.match(/\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)(?<!(\bfrom\b(\s+|)\w+|=(\s+|)\w+(|(\.\w+)+)|and(\s+|)(\W|)\w+))(?<!(?:((?<!\w)\d|\bEs\b|\bSelect\b|\bwhere\b|\bon\b|\bFormula\b|\bLIKE\b|\bWHEN\b|\bAS\b|\bcanales\b|\bif\b|\bBETWEEN\b|\bInfo\.Acreditado\b|\band\b|\bnull\b|then|else)))(?=(|\s+|(?:(|\s+)<TAB>(|\s+))*|(?:(|\s+)<BR>(|\s+)(|(?:(|\s+)<TAB>(|\s+))*)))((<T>\w+<T>)|(|<T>)\{[^]*?\}(<T>|)(?:(|\s+),(|\s+)((|\s+)<BR>(|\s+)(?:(|\s+)<TAB>(|\s+))*|)((<T>|)(\{|)[^]*?(\}|<T>|.*?<BR>)(<T>|)|\w+)|)*))/gi).map(x => sps.push(x))
    }

    if (/((?<=(?:\bEXEC(UTE|)\b(|\s+))))\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)|(?<=<T>(|\s+)(Exec\s+|))\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)(?=(\s+|):\w+((,(|\s+):\w+)+|)(|\s+)<T>)/gi.test(text)) {
        text.match(/((?<=(?:\bEXEC(UTE|)\b(|\s+))))\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)|(?<=<T>(|\s+)(Exec\s+|))\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)(?=(\s+|):\w+((,(|\s+):\w+)+|)(|\s+)<T>)/gi).map(x => sps.push(x))
    }

    if ((/(?<=<T>(|\s+))\bSP\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)(?=(|\s+)<T>)/gi).test(text)) {
        text.match(/(?<=<T>(|\s+))\bSP\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)(?=(|\s+)<T>)/gi).map(x => sps.push(x))
    }

    if (sps.length != 0) {
        return sps.join(',')
    }
}

function getFunctionsSQL (text) {

    if (/\bfn\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)\b(?=(\s+|)\([^\(\)]*?\))/gi.test(text)) {
 
        let fn = text.match(/\bfn\w+(|[áñíóú]\w+)+(|(\.\w+(|[áñíóú]\w+))+)\b(?=(\s+|)\([^\(\)]*?\))/gi)
 
        if (fn.length != 0) {
            return fn.join(',')
        }
    }
}

function getClauseSQL (text) {

    if (/(?<=(<br>[^]*?|))(?<=\b((EnviarCorreo|Procesar|Ejecutar|)SQL(|MemoEnLista|Local|Espejo|EnLista|Animado))\b(|\s+)\()[^]*?(|((?=\()[^]*?\)[^]*?)+)(?=\))(?=[^]*?<br>|\))/gi.test(text)) {

        let clauseSQL = text.match(/(?<=(<br>[^]*?|))(?<=\b((EnviarCorreo|Procesar|Ejecutar|)SQL(|MemoEnLista|Local|Espejo|EnLista|Animado))\b(|\s+)\()[^]*?(|((?=\()[^]*?\)[^]*?)+)(?=\))(?=[^]*?<br>|\))/gi)

        if (clauseSQL.length != 0) {
            return clauseSQL.join(',')
        }

    } else {
        return text
    }
}

function verifyReturn (fn, sp) {
    // if (fn && sp && tbl) {
    //     return {
    //         fn: fn,
    //         sp: sp,
    //         tbl: tbl
    //     }
    // } else 
    if (fn && sp) {
        return {
            fn: fn,
            sp: sp
        }
    } else if (fn) {
        return {
            fn: fn
        }
    } else if (sp) {
        return {
            sp: sp
        }
    //} else if (tbl) {
        // return {
        //     tbl: tbl
        // }
    } else {
        return false
    }
}

function getObjsSQL (text) {

    let clauseSQL = getClauseSQL(text)

    let fn = getFunctionsSQL(clauseSQL)

    let sp = getSPSQL(clauseSQL)

    let tb = getTablesSQL(clauseSQL)

    if (verify( { fn, sp, tb } )) {
        return verify({fn, sp, tb})
    }
}

module.exports.getObjsSQL = getObjsSQL
