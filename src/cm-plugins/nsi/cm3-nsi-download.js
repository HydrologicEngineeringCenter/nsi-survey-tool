import React from 'react';
import { connect } from 'redux-bundler-react';
//import { BasicToolbarButton } from "@corpsmap/corpsmap/src/application-controls/basic-toolbar-button";
//import nsi from './cm3-nsi-download-bundle'

class NSIDownloadButton extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
          open: false
        }
        this.handleClick = this.handleClick.bind(this);
      }
handleClick(){
    const {doNsiDownload, fips} = this.props //thes stupid curly brackets are important
    console.log("clickity clack " + fips + " is the value of fips")   
    doNsiDownload();
}
  render() {
    return (
        <button className='mdi mdi-cloud-download' title= "Download NSI Structures" style={{border: 'none', color: 'inherit', backgroundColor: 'inherit', fontSize: '17px', verticalAlign: 'middle', marginBottom: '0', paddingTop: '8px', paddingRight: '16px'}} onClick={() => this.handleClick()}></button>
    );
  }

}
export default connect(
    'doNsiDownload',
    'selectFips',
    NSIDownloadButton
);