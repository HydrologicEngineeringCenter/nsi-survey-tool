import React from 'react';
import { connect } from 'redux-bundler-react';
//import { BasicToolbarButton } from "@corpsmap/corpsmap/src/application-controls/basic-toolbar-button";
//import nsi from './cm3-nsi-download-bundle'

class NSIDownloadButton extends React.Component {

  render() {
    const doNsiDownload = this.props
    return (
        <button className='mdi mdi-home' onClick={() => doNsiDownload()}></button>
    );
  }
}

export default connect(
    'doNsiDownload',
    NSIDownloadButton
);