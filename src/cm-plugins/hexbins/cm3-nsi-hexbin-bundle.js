import MVT from 'ol/format/MVT';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';

const NSI_HexBin_INITALIZE_START='NSI_HexBin_INITALIZE_START';
const NSI_HexBin_INITALIZE_END='NSI_HexBin_INITALIZE_END';
const MAP_INITIALIZED='MAP_INITIALIZED';

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
      url:"https://ec2-107-20-76-219.compute-1.amazonaws.com/services/hexbin10k/tiles/{z}/{x}/{y}.pbf",
    })
    //style: createMapboxStreetsV6Style(Style, Fill, Stroke, Icon, Text)
  })
  //map.addLayer(layer)
  const parentUid = store.selectTreeViewRootId();
  store.doAddLayer({
    displayName: 'National Structure Inventory HexBins',
    parentUid: parentUid,
    type:"notfolder",
    mapLayer: layer,
    visible: true,
    zoomTo: false,
  })
};