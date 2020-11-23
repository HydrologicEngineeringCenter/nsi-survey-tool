import MVT from 'ol/format/MVT';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
const apiHost=process.env.REACT_APP_APIHOST_NSI
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
    'NSIP1':'https://ml-dev.sec.usace.army.mil/nsi-ml/tileservice/services/structures',
    'NSIP2':'https://ml-dev.sec.usace.army.mil/nsi-ml/tileservice/services/structures',
  }
const initMap=function(store){
  const map = store.selectMap();
  let layer=new VectorTileLayer({
    source: new VectorTileSource({
      attributions: 'USACE',
      format: new MVT(),
      url:`https://ml-dev.sec.usace.army.mil/nsi-ml/tileservice/services/nsi1/tiles/{z}/{x}/{y}.pbf`,
    })
  })
  const parentUid = store.selectTreeViewRootId();
  store.doAddLayer({
    displayName: 'NSI VTL 1',
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
      url:`https://ml-dev.sec.usace.army.mil/nsi-ml/tileservice/services/nsi2/tiles/{z}/{x}/{y}.pbf`,
    })
  })
  //const parentUid = store.selectTreeViewRootId();
  store.doAddLayer({
    displayName: 'NSI VTL 2',
    parentUid: parentUid,
    type:"notfolder",
    mapLayer: layer2,
    visible: true,
    zoomTo: false,
  })
};