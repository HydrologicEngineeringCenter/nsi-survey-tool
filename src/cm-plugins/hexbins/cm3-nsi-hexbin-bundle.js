import MVT from 'ol/format/MVT';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';

const NSI_HexBin_INITALIZE_START='NSI_HexBin_INITALIZE_START';
const NSI_HexBin_INITALIZE_END='NSI_HexBin_INITALIZE_END';
const MAP_INITIALIZED='MAP_INITIALIZED';
const apiHost=process.env.REACT_APP_APIHOST_HB
const hexbinLayers={
  'HB10K':'hexbin10k',
  'HB2500':'hexbin2500',
  'HB500':'hexbin500',
}
export default{
    name:'hexbins',
    getReducer: () => {
      const initialData = {
        _shouldInitialize: false,
      };
      return (state = initialData, { type, payload }) => {
        switch(type){
          case NSI_HexBin_INITALIZE_START:
          case NSI_HexBin_INITALIZE_END:
            return Object.assign({}, state, payload);
          case MAP_INITIALIZED:
            return Object.assign({}, state, {
              _shouldInitialize: true
            })
          default:
            return state;
        }
      }
    },
    doNsiHexBinInitialize: () => ({ dispatch, store, anonGet }) => {
      dispatch({
        type: NSI_HexBin_INITALIZE_START,
        payload: {
          _shouldInitialize: false,
        }
      })
      initMap(store);      
    },
    reactNsiHexBinShouldInitialize: (state) => {
      if(state.hexbins._shouldInitialize) return { actionCreator: "doNsiHexBinInitialize" };
    }
  };

const initMap=function(store){
  const map = store.selectMap();
  let layer=new VectorTileLayer({
    source: new VectorTileSource({
      attributions: 'USACE',
      format: new MVT(),
      url:`${apiHost}hb10k/tiles/{z}/{x}/{y}.pbf`,
    })
    //style: createMapboxStreetsV6Style(Style, Fill, Stroke, Icon, Text)
  })
  //map.addLayer(layer)
  const parentUid = store.selectTreeViewRootId();
  store.doAddLayer({
    displayName: 'National Structure Inventory 10kHexBins',
    parentUid: parentUid,
    type:"notfolder",
    mapLayer: layer,
    visible: true,
    zoomTo: false,
  })
  let layer2=new VectorTileLayer({
  source: new VectorTileSource({
    attributions: 'USACE',
    format: new MVT(),
    url:`${apiHost}hb2500/tiles/{z}/{x}/{y}.pbf`,
  })
  //style: createMapboxStreetsV6Style(Style, Fill, Stroke, Icon, Text)
})
//map.addLayer(layer)
store.doAddLayer({
  displayName: 'National Structure Inventory 2500HexBins',
  parentUid: parentUid,
  type:"notfolder",
  mapLayer: layer2,
  visible: true,
  zoomTo: false,
})
};