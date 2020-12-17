import {Point} from 'ol/geom';
import {fromLonLat, transform} from 'ol/proj'
import Projection from 'ol/proj/Projection';
const SURVEY_TRAY_INITALIZE_START='SURVEY_TRAY_INITALIZE_START';
const SURVEY_TRAY_INITALIZE_END='SURVEY_TRAY_INITALIZE_END';
//const SURVEY_TRAY_POINT_SUBMITTED='SURVEY_TRAY_POINT_SUBMITTED';
const SURVEY_TRAY_UPDATE_XY_STARTED='SURVEY_TRAY_UPDATE_XY_STARTED';
const SURVEY_TRAY_UPDATE_XY_UPDATED='SURVEY_TRAY_UPDATE_XY_UPDATED';
const SURVEY_TRAY_UPDATE_XY_FINISHED='SURVEY_TRAY_UPDATE_XY_FINISHED';
const SURVEY_TRAY_OCCUPANCY_TYPE_SELECTED='SURVEY_TRAY_OCCUPANCY_TYPE_SELECTED';
const SURVEY_TRAY_DAMCAT_SELECTED='SURVEY_TRAY_DAMCAT_SELECTED';
const MAP_INITIALIZED='MAP_INITIALIZED';
const SURVEY_TRAY_FNDHT_ENTERED='SURVEY_TRAY_FNDHT_ENTERED';
const SURVEY_TRAY_NUMSTORY_ENTERED='SURVEY_TRAY_NUMSTORY_ENTERED';
const SURVEY_TRAY_SQFT_ENTERED='SURVEY_TRAY_SQFT_ENTERED';
const SURVEY_TRAY_VAL_ENTERED='SURVEY_TRAY_VAL_ENTERED';

export default{
    name:'surveytraybundle',

    getReducer: () => {
      const initialData = {
        shouldInitialize: false,
        occupancyType: "RES1",
        damcat:"Unknown",
        xy_updating: false,
        x: 0.0,
        y: 0.0,
        x_invalid: false,
        y_invalid: false,
        found_ht: 0.0,
        found_ht_invalid: false,
        stories: 0,
        stories_invalid: false,
        sq_ft: 0.0,
        sq_ft_invalid: false,
        found_type: "",
        rsmeans_type:"",
        quality:"",
        const_type:"",
        garage:"",
        roof_style:"",
      };
      return (state = initialData, { type, payload }) => {
        switch(type){
          case SURVEY_TRAY_INITALIZE_START:
          case SURVEY_TRAY_INITALIZE_END:
          case SURVEY_TRAY_OCCUPANCY_TYPE_SELECTED:
          case SURVEY_TRAY_FNDHT_ENTERED:
          case SURVEY_TRAY_NUMSTORY_ENTERED:
          case SURVEY_TRAY_SQFT_ENTERED:
          case SURVEY_TRAY_DAMCAT_SELECTED:
          case SURVEY_TRAY_VAL_ENTERED:
          case SURVEY_TRAY_UPDATE_XY_STARTED:
          case SURVEY_TRAY_UPDATE_XY_UPDATED:
          case SURVEY_TRAY_UPDATE_XY_FINISHED:
            return Object.assign({}, state, payload);
          default:
            return state;
        }
      }
    },
    doSmoosh: () =>({dispatch, store}) =>{
      const output =  store.selectMeasureOutput
      return {sqft: output.val}
    },
    doSurveyTrayInitialize: () => ({ dispatch, store, anonGet }) => {
      dispatch({
        type: SURVEY_TRAY_INITALIZE_START,
        payload: {
          shouldInitialize: false,
          occupancyType: "RES1",
          damcat:"Unknown",
          xy_updating: false,
          x: 0.0,
          y: 0.0,
          x_invalid: false,
          y_invalid: false,
          found_ht: 0.0,
          found_ht_invalid: false,
          stories: 0,
          stories_invalid: false,
          sq_ft: 0.0,
          sq_ft_invalid: false,
          found_type: "",
          rsmeans_type:"",
          quality:"",
          const_type:"",
          garage:"",
          roof_style:"",
        }
      })     
    },
    reactSurveyTrayShouldInitialize: (state) => {
      if(state.surveytraybundle.shouldInitialize) return { actionCreator: "doSurveyTrayInitialize" };
    },
    doModifyOccupancyType: (input) => ({dispatch, store}) =>{
        dispatch({
            type: SURVEY_TRAY_OCCUPANCY_TYPE_SELECTED,
            payload: {
              occupancyType: input,
            }
          }) 
    },
    doModifyDamCat:(input) =>({dispatch, store}) =>{
      dispatch({
        type: SURVEY_TRAY_DAMCAT_SELECTED,
        payload: {
          damcat: input,
        }
      })
    },
    doModifyFoundHt:(input) =>({dispatch, store}) =>{
      if(!isNaN(input)){
        dispatch({
          type: SURVEY_TRAY_FNDHT_ENTERED,
          payload: {
            found_ht: input,
          }
        })
      }
    },
    doModifyNumStory:(input) =>({dispatch, store}) =>{
      if(!isNaN(input)){
        dispatch({
          type: SURVEY_TRAY_NUMSTORY_ENTERED,
          payload: {
            stories: input,
          }
        })
      }
    },
    doModifySqFt:(input) =>({dispatch, store}) =>{
      if(!isNaN(input)){
        dispatch({
          type: SURVEY_TRAY_SQFT_ENTERED,
          payload: {
            sq_ft: input,
          }
        })
      }
    },doStreetViewByCoords:(coord)=>({dispatch,store}) =>{
      var url = "http://maps.google.com/maps?q=" + coord[1] + "," + coord[0];
      //console.log(feature.getProperties());
      window.open(url, "_blank");
    }
    ,doZoomToCoords:(coord)=>({dispatch,store}) =>{
      let map = store.selectMap()
      let view = map.getView()
      let coord3857 = fromLonLat( coord )//@corpsmap is in espg:3857 the default.
      let point = new Point(coord3857)
      view.fit(point,{ minResolution: 1})
    },
    doModifyStructure: (commit) =>({dispatch, store}) =>{    

      //check for validity first. 

      
      if (commit){
        //commit changes to database
        console.log("Committing to database")
      }
      // select a random structure
      // update to the next structure 
        let url =  'https://nsi-dev.sec.usace.army.mil/nsiapi/structure/11357491'
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
          if (xhr.status === 200) {
            let resp = xhr.responseText
            let obj = JSON.parse(resp)
            //console.log(resp)
            //zoom to the structure
            let coord = [obj.properties.x ,obj.properties.y]
            store.doZoomToCoords(coord)
            //end zoom to the structure
            dispatch({
              type: SURVEY_TRAY_INITALIZE_START,
              payload: {
                shouldInitialize: false,
                occupancyType: obj.properties.occtype,
                damcat: "RESIDENTIAL",//obj.properties.st_damcat,//this has to be specified as a real value in the maps or it throws an exception because it creates the list for Occtype
                x: obj.properties.x,
                y: obj.properties.y,
                xy_updating: false,
                found_ht: obj.properties.found_ht,
                stories: obj.properties.num_story,
                sq_ft: obj.properties.sqft,
              }
            })
          } else {
            console.log("ERROR LOADING FD_ID 11357491")
          }
        }
        xhr.send();
    },
    doModifyXY:() =>({dispatch, store}) =>{
      if(store.selectXY_Updating()){
        dispatch({
          type: SURVEY_TRAY_UPDATE_XY_FINISHED,
          payload:{
            xy_updating: false
          }
        })
        var map = store.selectMap()
        //deregister the click event.
        /*map.on('singleclick', function (evt) {
          // convert coordinate to EPSG-4326
          let coord = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
          dispatch({
            type: SURVEY_TRAY_UPDATE_XY_UPDATING,
            payload: {
              x: coord[0],
              y: coord[1],
            }
          })
      });*/ 
      }else{
      dispatch({
        type: SURVEY_TRAY_UPDATE_XY_STARTED,
        payload:{
          xy_updating: true
        }
      })
      var map = store.selectMap()
      map.on('singleclick', function (evt) {
        // convert coordinate to EPSG-4326
        let coord = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
        dispatch({
          type: SURVEY_TRAY_UPDATE_XY_UPDATED,
          payload: {
            x: coord[0],
            y: coord[1],
          }
        })
    });        
      }

    },
    doModifyGenericVal:(input, targetField, validator) =>({dispatch, store}) =>{
      if (targetField==="sq_ft"){
        if(!validator(input)){
          var units = input.substring(input.length - 4,input.length)
          input = input.substring(0,input.length - 4)
          if (units===" mi²"){//check if it is ft2 or mi2
            input = input*2.788e+7//convert
          }
        }
      }
      if(validator(input)){
        dispatch({
          type: SURVEY_TRAY_VAL_ENTERED,
          payload: {
            [targetField]: input,
            [`${targetField}_invalid`]: false
          }
        })
      }else{
        dispatch({
          type: SURVEY_TRAY_VAL_ENTERED,
          payload: {
            [`${targetField}_invalid`]: true
          }
        })
      }
    },
    doModifyGenericDropDown:(input, targetField) =>({dispatch, store}) =>{
      if (targetField==='damcat'){
        dispatch({
          type: SURVEY_TRAY_VAL_ENTERED,
          payload: {
            [targetField]: input,
            occupancyType: ""
          }
        }) 
      }else{
        dispatch({
          type: SURVEY_TRAY_VAL_ENTERED,
          payload: {
            [targetField]: input
          }
        })         
      }
     
    },
    selectOccupancyType: (state)=>{
      return state.surveytraybundle.occupancyType
    },
    selectDamCat: (state)=>{
      return state.surveytraybundle.damcat
    },
    selectFoundHt: (state)=>{
      return state.surveytraybundle.found_ht
    },
    selectFoundHt_isInvalid: (state) =>{
      return state.surveytraybundle.found_ht_invalid
    },
    selectXval: (state)=>{
      return state.surveytraybundle.x
    },
    selectX_isInvalid: (state)=>{
      return state.surveytraybundle.x_invalid
    },
    selectYval: (state)=>{
      return state.surveytraybundle.y
    },
    selectY_isInvalid: (state)=>{
      return state.surveytraybundle.y_invalid
    },
    selectXY_Updating: (state)=>{
      return state.surveytraybundle.xy_updating
    },
    selectNumStory: (state)=>{
      return state.surveytraybundle.stories
    },
    selectNumStory_isInvalid: (state) =>{
      return state.surveytraybundle.stories_invalid
    },
    selectSqFt: (state)=>{
      return state.surveytraybundle.sq_ft
    },
    selectSqFt_isInvalid: (state) =>{
      return state.surveytraybundle.sq_ft_invalid
    },
    selectFoundType: (state)=>{
      return state.surveytraybundle.found_type
    },
    selectRsmeansType: (state)=>{
      return state.surveytraybundle.rsmeans_type
    },
    selectQuality: (state)=>{
      return state.surveytraybundle.quality
    },
    selectConstType: (state)=>{
      return state.surveytraybundle.const_type
    },
    selectGarage: (state)=>{
      return state.surveytraybundle.garage
    },
    selectRoofStyle: (state)=>{
      return state.surveytraybundle.roof_style
    }
};