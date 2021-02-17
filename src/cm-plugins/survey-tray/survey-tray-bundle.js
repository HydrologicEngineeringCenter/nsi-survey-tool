import {fromLonLat, transform} from 'ol/proj'
import {Feature} from 'ol';
import {Point} from 'ol/geom';
import {Style,Icon} from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

const SURVEY_DATA_UPDATE='SURVEY_DATA_UPDATE';
const SURVEY_LOCATION_UPDATE='SURVEY_LOCATION_UPDATE';
const UPDATE_PARENT_PROPS='UPDATE_PARENT_PROPS';
const ST_INITIALIZE_START='ST_INITIALIZE_START';
const ST_INITIALIZE_FINISHED='ST_INITIALIZE_FINISHED'
const SURVEY_LOADING='SURVEY_LOADING';
const UPDATE_SURVEY_SAVED='UPDATE_SURVEY_SAVED';

const apiHost=process.env.REACT_APP_APIHOST_NSI
let markerLayer = null;


const handleErrors = function(response) {
    if (response && !response.ok) {
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
  fdId:-1,
  invalidStructure:false,
  noStreetView:false,
  shouldInitialize: false,
  occupancyType: "RES1",
  damcat:"Unknown",
  xy_updating: false,
  x: 0.0,
  y: 0.0,
  x_invalid: false,
  y_invalid: false,
  found_ht: 0.0,
  foundHtInvalid: false,
  stories: 0,
  storiesInvalid: false,
  sq_ft: 0.0,
  sqFtInvalid: false,
  found_type: "",
  rsmeans_type:"",
  quality:"",
  const_type:"",
  garage:"",
  roof_style:"",
}

const stBundle=function(config){
  return(
    {
      name:'st',
  
      getReducer: () => {
        const initialData = {
          _shouldInitialize: true,
          survey:defaultSurvey,
          surveyLoading:false,
          surveySaved:true,
          surveysCompleted:false,
          appProps:{},
        };
        return (state = initialData, { type, payload }) => {
          switch(type){
            case SURVEY_DATA_UPDATE:
            case SURVEY_LOADING:
            case UPDATE_SURVEY_SAVED:
            case UPDATE_PARENT_PROPS:
            case ST_INITIALIZE_START:
            case ST_INITIALIZE_FINISHED:
              return {...state,...payload}
            case SURVEY_LOCATION_UPDATE:
                let newsurvey ={"survey":{...state.survey,...payload}}
                return {...state,...newsurvey}
            default:
              return state;
          }
        }
      },

      
      //init:(store)=>{
      //  config.registerHook(store)
      //},

      doStInitialize: () => ({ dispatch, store, anonGet }) => {
        dispatch({
          type: 'ST_INITIALIZE_START',
          payload: {
            _shouldInitialize: false
          }
        });
        config.registerHook(store)
        dispatch({type:UPDATE_PARENT_PROPS,payload:{"appProps":config.appProps}});
      },
      
      doSurveyUpdateData:(survey) =>({dispatch, store}) =>{
        dispatch({
          type: SURVEY_DATA_UPDATE,
          payload: {
            survey: {...survey},
          }
        })
      },

      doSurveyUpdateSurveySaved:(saved)=>({dispatch,store})=>{
        dispatch({type:UPDATE_SURVEY_SAVED,payload:{"surveySaved":saved}});  
      },
  
      doSurveyFetch:()=>({dispatch,store}) => {
        const token=store.selectSurveyAuthToken();
        if(token){
          dispatch({type:SURVEY_LOADING,payload:{"surveyLoading":true}});
          fetch(`${apiHost}/nsisapi/survey`, {
            method: 'get',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          })
          .then(handleErrors())
          .then(resp=>resp.json())
          .then(data=>{
            dispatch({type:SURVEY_LOADING,payload:{"surveyLoading":false}});
            if(data.result && data.result==="completed"){
              dispatch({type:SURVEY_DATA_UPDATE,payload:{"surveysCompleted":true}});
            } else {
              let newsurvey={
                ...defaultSurvey,
                'damcat':data.damcat,
                'occupancyType':data.occupancyType,
                'x':data.x,
                'y':data.y,
                'fdId':data.fdId,
                'saId':data.saId,
                'cbfips':data.cbfips
              }
              store.doSurveyUpdateData(newsurvey);
              store.doSurveyUpdateSurveySaved(false);
              store.doSurveyDisplayMarker();
              store.doSurveyZoom();
            }
          })
          .catch(error=>{
            console.log(error);
            dispatch({type:SURVEY_LOADING,payload:{"surveyLoading":false}});
          });
        } else {
          console.log("Not logged in or missing token.  Cannot request survey");
        }
      },

      doSurveySave:()=>({dispatch,store}) => {
        const token=store.selectSurveyAuthToken();
        let survey = store.selectSurveyData()
        if(token){
          fetch(`${apiHost}/nsisapi/survey`, {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body:JSON.stringify(survey)
          })
          .then(handleErrors())
          .then(resp=>{
            if(!resp.ok){
              store.doNotificationsFire({
                title: "Error",
                message: "Unable to save survey",
                level: "warning",
              });
            }
            return resp.json();
          })
          .then(resp=>{
            if(resp.result=="success"){
              store.doNotificationsFire({
                title: "Success",
                message: "Survey Saved",
                level: "success",
              });
            }
            store.doSurveyUpdateSurveySaved(true)
          })
          .catch(error=>{
            console.log(error);
            store.doNotificationsFire({
              title: "Error",
              message: "Unable to save survey",
              level: "warning",
            });
          });
        } else {
          console.log("Not logged in or missing token.  Cannot request survey");
        }
      },

      doSurveyDisplayMarker:()=>({dispatch,store})=>{
        const map = store.selectMap();
        
        if (markerLayer){
          map.removeLayer(markerLayer);
        }
        
        let survey = store.selectSurveyData();
        let coord = fromLonLat([survey.x,survey.y])
        var surveyMarker = new Feature({
          geometry: new Point(coord),
          name: 'NSI Survey',
        });

        surveyMarker.setStyle(new Style({
          image: new Icon({
            anchor: [0.5, 0.5],
            scale:0.2,
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Map_marker_font_awesome.svg/200px-Map_marker_font_awesome.svg.png',
          })
        }));

        const surveyMarkerSource = new VectorSource({
          features: [surveyMarker]
        });
      
        markerLayer = new VectorLayer({
          source: surveyMarkerSource,
        });

        map.addLayer(markerLayer);
      },
  
      doSurveyModifyXY:()=>({dispatch,store})=>{
        const map = store.selectMap()
        if (locationFunction){
          clearMapfunction(map,'singleclick',locationFunction); //locationFunction should be cleaned up automatically, but rarely it is not...
          locationFunction=null;
        }
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
          clearMapfunction(map,'singleclick',locationFunction);
          locationFunction=null;
          store.doSurveyDisplayMarker();
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

      reactStShouldInitialize: (state) => {
        if(state.st._shouldInitialize) return { actionCreator: "doStInitialize" };
      },
  
      selectSurveyData: (state)=>state.st.survey,
      selectSurveyLoading:state=>state.st.surveyLoading,
      selectSurveyAuthToken:state=>state.st.appProps?.authNSIToken,
      selectSurveySaved:state=>state.st.surveySaved,
      selectAllSurveysCompleted:state=>state.st.surveysCompleted,
      selectMapLoading:state=>false,
  });
} 

export default stBundle;


