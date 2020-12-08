import React from 'react';
import { SidebarPanelOpenerButton } from "@corpsmap/corpsmap/src/application-controls/sidebar-panel-opener";;

class SurveyTrayButton extends React.Component {
  render() {
    return (
      <SidebarPanelOpenerButton
        iconClass="mdi mdi-google-maps"
        label="Survey Tray"
        title="Survey Tray"
        panelComponent={"A", "B", "C"}
      />
    );
  }
}

export default SurveyTrayButton;