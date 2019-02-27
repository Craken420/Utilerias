/*** Carpetas con las que se opera ***/

const rootIntelisis3000 = 'C:\\Users\\lapena\\Documents\\Luis Angel\\Sección Mavi\\Intelisis\\Intelisis3100\\'
const rootIntelisis5000 = 'C:\\Users\\lapena\\Documents\\Luis Angel\\Sección Mavi\\Intelisis\\Intelisis5000\\'

let jsonCarpetas = {
  archivoDLGMAVI3100: rootIntelisis3000 + 'Reportes MAVI\\MenuPrincipal_DLG_MAVI.esp',
  archivoMenuPrincipal5000: rootIntelisis5000 + 'Codigo Original\\MenuPrincipal.dlg',
  archivoDLGMAVI5000: rootIntelisis5000 + 'Reportes MAVI\\MenuPrincipal_DLG_MAVI.esp',
  archivoMenuPrincipal3100: rootIntelisis3000 + 'Codigo Original\\MenuPrincipal.dlg',
  carpetaCodigoOriginal5000: rootIntelisis5000 + 'Codigo Original\\',
  carpetaCodigoOriginal3000: rootIntelisis3000 + 'Codigo Original\\',
  archivos: 'Archivos\\',
  carpetaTesting: 'Testing\\'
}

exports.carpetas = jsonCarpetas