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
import nsiDL from '../../cm-plugins/nsi/index'
import st from '../../cm-plugins/survey-tray/index'
import monkeyPatchPlugin from '../../cm-plugins/cm3-monkeypatch-plugin'

/*import nsiHexBin from '../../cm-plugins/hexbins/index' */

let mapHook = null

if (mapHook) {
  mapHook(props)
}
function MapPage(props) {
  const { doMonkeyPatchAddSubStore, doMonkeyPatchGetOuterStore } = props
  return (
    <div className="container-fluid" style={{ padding: "0" }}>
      <Map
        height={window.innerHeight - 60}
        theme="dark"
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
          //nsiDL,
          st({
            appProps: props,
            registerHook: function(mapstore) {
              mapHook = mapstore.doHookProps
            }
          }),
          monkeyPatchPlugin({
            getOuterStore: doMonkeyPatchGetOuterStore,
            registerInnerStore: doMonkeyPatchAddSubStore
          }),
        ]}
      />
    </div>
  );
}

export default connect(
  'doMonkeyPatchAddSubStore',
  'doMonkeyPatchGetOuterStore',
  MapPage
);
