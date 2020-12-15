import SurveyTrayButton from './cm3-survey-tray';
import tmpBundle from './survey-tray-bundle'

const plugin = {
  pluginName: 'SurveyTrayPlugin',
  enabled: true,
  components:[{
    component: SurveyTrayButton,
    region: 'left-sidebar-top',
    sortOrder: 41
  }],
  bundle: tmpBundle
}

export default plugin;