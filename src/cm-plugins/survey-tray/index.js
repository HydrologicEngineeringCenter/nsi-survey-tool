import SurveyTrayButton from './cm3-survey-tray';
import tmpBundle from './tmp-bundle'

const plugin = {
  pluginName: 'SurveyTrayPlugin',
  enabled: true,
  components:[{
    component: SurveyTrayButton,
    region: 'right-sidebar-top',
    sortOrder: 30
  }],
  bundle: tmpBundle
}

export default plugin;