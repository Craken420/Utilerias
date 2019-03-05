const { mashUp } = require('../OperarCadenas/wordsMashUp')
const { funcion } = require('../OperadorObjetos/detalleFuncion')

module.exports.verify = function verifyCombinations(obj) {
    return (function(){
        return main(obj);
        function main(obj) {

            let namesItems = []

            for (item in obj) {
                if (obj[item]){
                    namesItems.push(item)
                }
            }


            let condicionArray = mashUp(namesItems).map(x => {
                x = x.replace(/-/g, '] && obj[')
                x = x.replace(/^/gm, 'obj[')
                x = x.replace(/$/gm, ']')
                x = x.replace(/\[/g, '[\'')
                x = x.replace(/\]/g, '\']')
                return x
            })

            let objReturn = {}
          
            let ono = condicionArray.map(element => {
                let oil = ''
                if (eval(element)) {
                    //console.log(element)
                   //console.log(element)
                    if (element) { 
                        oil =  element
                    
                    //cont + 1
                        namesItems.forEach(x => {
                            objReturn[`${x}`] = obj[`${x}`]
                        })
                    }
                }
                return oil
            })
            return objReturn
           //console.log('objReturn:\n',objReturn)
        }
    })();
}


// let verifys = function verifyCombinations(array, unique) {
//     return (function(){
//         'use strict';
//         return main(array, unique);
//         function main(array) {
//             console.log('array')
            
            
//         }
//     })();
// }

// console.log(funcion.getParameterNames(verifys))


//Usage
// const { verify } = require('../Validaciones/verifyReturn')

// let frm = ''
// let dlg = 'dlg1'
// let vis = ''
// console.log('-----------------------')
// console.log(verify({frm, dlg, vis}))
// console.log('-----------------------')