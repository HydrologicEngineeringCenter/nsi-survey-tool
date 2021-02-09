import {fromLonLat, transform} from 'ol/proj'
import {Point} from 'ol/geom';

const SURVEY_DATA_UPDATE='SURVEY_DATA_UPDATE';
const SURVEY_LOCATION_UPDATE='SURVEY_LOCATION_UPDATE';


const handleErrors = function(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

let locationFunction = null;

let clearMapfunction = function(map,evt,fun){
  map.un(evt, fun)
  map.getTarget().style.cursor = 'default';
}

const defaultSurvey={
  fdId:1,
  shouldInitialize: false,
  occupancyType: "RES1",
  damcat:"Unknown",
  xy_updating: false,
  x: 0.0,
  y: 0.0,
  x_invalid: false,
  y_invalid: false,
  foundHt: 0.0,
  foundHtInvalid: false,
  stories: 0,
  storiesInvalid: false,
  sqFt: 0.0,
  sqFtInvalid: false,
  foundType: "",
  rsmeansType:"",
  quality:"",
  constType:"",
  garageType:"",
  roofStyle:"",
}

export default{
    name:'nsisurvey',

    getReducer: () => {
      const initialData = {
        survey:defaultSurvey,
      };
      return (state = initialData, { type, payload }) => {
        switch(type){
          case SURVEY_DATA_UPDATE:
            return {...state,...payload}
          case SURVEY_LOCATION_UPDATE:
              let newsurvey ={"survey":{...state.survey,...payload}}
              return {...state,...newsurvey}
          default:
            return state;
        }
      }
    },
    
    doSurveyUpdateData:(survey) =>({dispatch, store}) =>{
      dispatch({
        type: SURVEY_DATA_UPDATE,
        payload: {
          survey: {...survey},
        }
      })
    },

    doSurveyFetch:()=>({dispatch,store}) => {
      const token=store.selectAuthToken();
      fetch(`${apiHost}/nsi-survey/next`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(handleErrors())
      .then(resp=>resp.json())
      .then(data=>{

      })
      .catch(error=>{

      });
    },

    doSurveyModifyXY:()=>({dispatch,store})=>{
      const map = store.selectMap()
      map.getTarget().style.cursor = 'cell';
      locationFunction = function(evt){
        let coord = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
        dispatch({
          type: SURVEY_LOCATION_UPDATE,
          payload: {
            x: coord[0],
            y: coord[1],
          }
        })
        clearMapfunction(map,'singleclick',locationFunction)
      }
      map.on('singleclick', locationFunction)
    },

    doSurveyZoom:()=>({dispatch,store}) =>{
      let map = store.selectMap()
      let survey = store.selectSurveyData()
      let view = map.getView()
      let coord3857 = fromLonLat([survey.x,survey.y])//@corpsmap is in espg:3857 the default.
      let point = new Point(coord3857)
      view.fit(point,{ minResolution: 1})
    },

    doSurveyStreetView:()=>({dispatch,store}) =>{
      let survey = store.selectSurveyData()
      var url = "http://maps.google.com/maps?q=" + survey.y + "," + survey.x
      window.open(url, "_blank");
    },

    selectSurveyData: (state)=>state.nsisurvey.survey,
};