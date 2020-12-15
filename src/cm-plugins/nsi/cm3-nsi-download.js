import React from 'react';
import { connect } from 'redux-bundler-react';
import { BasicToolbarButton } from "@corpsmap/corpsmap";

const NSIDownloadButton = ({doNsiDownload}) =>{
  return (
    <BasicToolbarButton
      enabled={true}
      iconClass="mdi mdi-cloud-download"
      title="Download NSI Structures"
      onDeactivate={() => {}}
      onActivate={doNsiDownload}
    />
  );
};
export default connect(
    'doNsiDownload',
    NSIDownloadButton
);