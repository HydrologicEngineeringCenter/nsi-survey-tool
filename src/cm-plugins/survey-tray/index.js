import SurveyTrayButton from './cm3-survey-tray';

const plugin = {
  pluginName: 'SurveyTrayPlugin',
  enabled: true,
  components:[{
    component: SurveyTrayButton,
    region: 'right-sidebar-top',
    sortOrder: 30
  }]
}

export default plugin;