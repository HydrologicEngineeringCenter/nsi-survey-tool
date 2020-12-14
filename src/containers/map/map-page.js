import React from 'react';
import { connect } from 'redux-bundler-react';
import {
  Map,
  addData,
  basemapSwitcher,
  bookmarks,
  coordDisplay,
  draw,
  treeView,
  geocoder,
  identify,
  measureTools,
  rotateNorth,
  zoomInOut,
  zoomHome,
  zoomToBox,
  printMap,
  themeSwitcher
} from "@corpsmap/corpsmap";
import "@corpsmap/corpsmap/css/corpsmap.css";
import nsiVTL from '../../cm-plugins/vtl/index'
import  nsiDL from '../../cm-plugins/nsi/index'
import st from '../../cm-plugins/survey-tray/index'

 /*import nsiHexBin from '../../cm-plugins/hexbins/index' */
 
class MapPage extends React.Component {
  render(){
    return (
        <div className="container-fluid" style={{ padding: "0"}}>
            <Map
              theme="grey"
              plugins={[
                addData,
                basemapSwitcher,
                bookmarks,
                coordDisplay,
                draw,
                treeView(),
                geocoder,
                identify,
                measureTools,
                rotateNorth,
                zoomInOut,
                zoomHome,
                zoomToBox,
                printMap,
                themeSwitcher,
                nsiVTL,
                nsiDL,
                st
              ]}
            />        
        </div>
    )
  }
}
export default connect(
  MapPage
  );