import SurveyTrayButton from './cm3-survey-tray';
import stBundle from './survey-tray-bundle';

const plugin = function getPlugin(config) {
  return ({
    pluginName: 'SurveyTrayPlugin',
    enabled: true,
    components: [{
      component: SurveyTrayButton,
      region: 'left-sidebar-top',
      sortOrder: 41
    }],
    bundle: stBundle(config)
  })
}

export default plugin;
