import React from 'react';
import { SidebarPanelOpenerButton } from "@corpsmap/corpsmap";;

class SurveyTrayButton extends React.Component {
  render() {
    return (
      <SidebarPanelOpenerButton
        iconClass="mdi mdi-google-maps"
        label="Survey Tray"
        title="Survey Tray"
        panelComponent={() => "A component is a function essentially..."}
      />
    );
  }
}

export default SurveyTrayButton;