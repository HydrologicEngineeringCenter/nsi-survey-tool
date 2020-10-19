import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import Circle from 'ol/style/Circle'
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import GeoJSON from 'ol/format/GeoJSON';
const NSI_INITALIZE_START='NSI_INITALIZE_START';
const NSI_INITALIZE_END='NSI_INITALIZE_END';
const MAP_INITIALIZED='MAP_INITIALIZED';

const apiHost=process.env.REACT_APP_APIHOST_NSI

export default{
    name:'nsi',
    getReducer: () => {
      const initialData = {
        _shouldInitialize: false,
      };
      return (state = initialData, { type, payload }) => {
        switch(type){
          case NSI_INITALIZE_START:
          case NSI_INITALIZE_END:
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
    doNsiInitialize: () => ({ dispatch, store, anonGet }) => {
      dispatch({
        type: NSI_INITALIZE_START,
        payload: {
          _shouldInitialize: false,
        }
      })
      initMap(store);      
    },
    reactNsiShouldInitialize: (state) => {
      if(state.nsi._shouldInitialize) return { actionCreator: "doNsiInitialize" };
    }
  };

const initMap=function(store){
  const map = store.selectMap();
  let vectorSource=new VectorSource({
    format: new GeoJSON({featureProjection:"EPSG:3857"}),
    loader:function(extent, resolution, projection) {
      var url = `${apiHost}?fips=15005&fmt=fc`;//hawaii
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = function() {
        if (xhr.status === 200) {
          let format=vectorSource.getFormat();
          let resp = xhr.responseText
          let features = format.readFeatures(resp)
          vectorSource.addFeatures(features);
        } else {
          console.log("ERROR LOADING VECTOR SOURCE")
        }
      }
      xhr.send();
    }
  });

  var vectorLayer1 = new VectorLayer({
      source:vectorSource,
      style:function(feature){
        let s = new Style({
          image: new Circle({
            radius:10,
            fill: new Fill({color: '#666666'}),
            stroke: new Stroke({color: '#bada55', width: 1}),
          }),
          stroke: new Stroke({
            color: '#CCC',
            width: 3.0
          }),
          fill:new Fill({
            color: 'rgba(0,0,255,0.0)'
          }),
        })
        return s;
      } 
  });
  var logFeatureCoordinate = function (coordinate) {
    var closestFeature = vectorSource.getClosestFeatureToCoordinate(coordinate);
    if (closestFeature === null) {

    } else {
      console.log("X coordinate is: " + closestFeature.getProperties().x)
      console.log("Y coordinate is: " + closestFeature.getProperties().y)
      var url = "http://maps.google.com/maps?q=" + closestFeature.getProperties().y + "," + closestFeature.getProperties().x;
      console.log(url);
          window.open(url, "_blank");
    }
  }
  const parentUid = store.selectTreeViewRootId();
  store.doAddLayer({
    displayName: 'National Structure Inventory',
    parentUid: parentUid,
    type:"notfolder",
    mapLayer: vectorLayer1,
    visible: true,
    zoomTo: false,
  });

  vectorLayer1.getSource().on('change', function(event) {
    if(vectorLayer1.getSource().getState()==='ready'){

      map.on('click',function(evt) {
        logFeatureCoordinate(evt.coordinate)
      })
    }
  });
}