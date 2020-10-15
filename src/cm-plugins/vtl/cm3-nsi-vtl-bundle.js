import MVT from 'ol/format/MVT';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';

const NSI_VTL_INITALIZE_START='NSI_VTL_INITALIZE_START';
const NSI_VTL_INITALIZE_END='NSI_VTL_INITALIZE_END';
const MAP_INITIALIZED='MAP_INITIALIZED';

export default{
    name:'vtl',
    getReducer: () => {
      const initialData = {
        _shouldInitialize: false,
      };
      return (state = initialData, { type, payload }) => {
        switch(type){
          case NSI_VTL_INITALIZE_START:
          case NSI_VTL_INITALIZE_END:
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
    doNsiVTLInitialize: () => ({ dispatch, store, anonGet }) => {
      dispatch({
        type: NSI_VTL_INITALIZE_START,
        payload: {
          _shouldInitialize: false,
        }
      })
      initMap(store);      
    },
    reactNsiVTLShouldInitialize: (state) => {
      if(state.vtl._shouldInitialize) return { actionCreator: "doNsiVTLInitialize" };
    }
  };
  const nsiLayers={
    'NSIP1':'http://localhost:8086/',
    'NSIP2':'http://localhost:8086/',
  }
const initMap=function(store){
  const map = store.selectMap();
  let layer=new VectorTileLayer({
    source: new VectorTileSource({
      attributions: 'USACE',
      format: new MVT(),
      url:"http://localhost:8086/tiles/{z}/{x}/{y}.pbf",
    })
  })
  const parentUid = store.selectTreeViewRootId();
  store.doAddLayer({
    displayName: 'National Structure Inventory Vector Tile Layer',
    parentUid: parentUid,
    type:"notfolder",
    mapLayer: layer,
    visible: true,
    zoomTo: false,
  })
};