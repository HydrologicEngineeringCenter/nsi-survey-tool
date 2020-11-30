import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import Circle from 'ol/style/Circle'
import MVT from 'ol/format/MVT';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
const apiHost=process.env.REACT_APP_APIHOST_TILES
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
    'NSIP1':`${apiHost}nsi1/tiles/{z}/{x}/{y}.pbf`,
    'NSIP2':`${apiHost}nsi2/tiles/{z}/{x}/{y}.pbf`,
  }


const initMap=function(store){
  const map = store.selectMap();
  let fRes = new Fill({
        color: 'pink'
      })
  let styleRes = new Style({
      image: new Circle({
        radius:2,
        fill: fRes,
      }),
      fill:fRes,
    })
    let fCom = new Fill({
      color: 'blue'
    })
let stylecom = new Style({
    image: new Circle({
      radius:2,
      fill: fCom,
    }),
    fill:fCom,
  })
  let fInd = new Fill({
    color: 'yellow'
  })
let styleInd = new Style({
  image: new Circle({
    radius:2,
    fill: fInd,
  }),
  fill:fInd,
})
let fPub = new Fill({
  color: 'green'
})
let stylePub = new Style({
image: new Circle({
  radius:2,
  fill: fPub,
}),
fill:fPub,
})


  let layer=new VectorTileLayer({
    style: function(feature, resolution){
      //console.log(feature)
     if (feature.properties_.st_damcat == "RES"){
       return styleRes
     }else if (feature.properties_.st_damcat == "PUB"){
       return stylePub
     }else if (feature.properties_.st_damcat == "IND"){
      return styleInd
     }else {
       return stylecom
     }
    },
    source: new VectorTileSource({
      attributions: 'USACE',
      format: new MVT(),
      url:nsiLayers.NSIP1,
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
    style: function(feature, resolution){
      //console.log(feature)
     if (feature.properties_.st_damcat == "RES"){
       return styleRes
     }else if (feature.properties_.st_damcat == "PUB"){
       return stylePub
     }else if (feature.properties_.st_damcat == "IND"){
      return styleInd
     }else {
       return stylecom
     }
    },
    source: new VectorTileSource({
      
      attributions: 'USACE',
      format: new MVT(),
      url:nsiLayers.NSIP2,
    })
  })
  store.doAddLayer({
    displayName: 'NSI VTL 2',
    parentUid: parentUid,
    type:"notfolder",
    mapLayer: layer2,
    visible: true,
    zoomTo: false,
  })
  map.on('click',function(evt) {
      var f = map.getFeaturesAtPixel(evt.pixel)
      if (f.length == 0) {
        //no feature?
      } else {
        //check if the property for x or y is undefined - if so, go to the next feature. if no feature has x or y property, skip.
        var feature;
        for(feature of f){
          if(feature.getProperties().x){//truthy
            //console.log("X coordinate is: " + feature.getProperties().x)
            //console.log("Y coordinate is: " + feature.getProperties().y)
            var url = "http://maps.google.com/maps?q=" + feature.getProperties().y + "," + feature.getProperties().x;
            console.log(feature.getProperties());
            window.open(url, "_blank");
            break;    
          }else{//falsy
            //console.log("falsy X coordinate is: " + feature.getProperties().x)
          }         
        }

      }
  })
};