//import getBundle from './cm3-nsi-bundle';
import nsiDlbundle from './cm3-nsi-download-bundle'
import dlButton from './cm3-nsi-download'
/*const cm3NsiPlugin={
    pluginName: 'NSI Plugin',
    enabled: true,
    bundle: getBundle,
    components:[]
  }*/
const cm3NsiDownloadPlugin={
    pluginName: 'NSI Download Plugin',
    enabled: true,
    bundle: nsiDlbundle,
    components:[{
      component: dlButton,
      region: 'basic-toolbar',
      sortOrder: 8
    }]
  }

export {cm3NsiDownloadPlugin as default}