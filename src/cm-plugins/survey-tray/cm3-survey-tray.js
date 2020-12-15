import React from 'react';
import { SidebarPanelOpenerButton } from "@corpsmap/corpsmap";;
import SurveyTray from './survey-tray'
class SurveyTrayButton extends React.Component {
  render() {
    return (
      <SidebarPanelOpenerButton
        iconClass="mdi mdi-file-document-edit-outline"
        label="Survey Tray"
        title="Survey Tray"
        panelComponent={SurveyTray}
      />
    );
  }
}

export default SurveyTrayButton;