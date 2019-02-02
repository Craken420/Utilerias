/*** Carpetas con las que se opera ***/

const rootIntelisis3000 = '../../../../Luis Angel\\Intelisis\\Intelisis3100\\'
const rootIntelisis5000 = '../../../../Luis Angel\\Intelisis\\Intelisis5000\\'

let jsonCarpetas = {
  archivoDLGMAVI3100: 'C:\\Users\\lapena\\Documents\\Luis Angel\\Intelisis\\Intelisis3100\\Reportes MAVI\\MenuPrincipal_DLG_MAVI.esp',
  archivoMenuPrincipal3100: 'C:\\Users\\lapena\\Documents\\Luis Angel\\Intelisis\\Intelisis3100\\Codigo Original\\MenuPrincipal.dlg',
  carpetaCodigoOriginal5000: rootIntelisis5000 + 'Codigo Original\\',
  carpetaCodigoOriginal3000: rootIntelisis3000 + 'Codigo Original\\',
  archivos: 'Archivos\\',
  carpetaTesting: 'Testing\\'
}

exports.carpetas = jsonCarpetas