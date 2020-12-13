

import React from 'react';
import { connect } from 'redux-bundler-react';
import { BasicToolbarButton } from "@corpsmap/corpsmap/src/application-controls/basic-toolbar-button";

class NSIDownloadButton extends React.Component {

  render() {
    const doNsiDownload = this.props
    return (
        <BasicToolbarButton
        enabled={true}
        iconClass='mdi mdi-home'
        iconStyle={{}}
        title="Download NSI"
        onActivate={ doNsiDownload }
      />
    );
  }
}

export default connect(
    'doNsiDownload',
    NSIDownloadButton,
    );

//
 //       onDeactivate={ doStopZoomBox }