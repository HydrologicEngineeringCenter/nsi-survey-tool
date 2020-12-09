const SURVEY_TRAY_INITALIZE_START='SURVEY_TRAY_INITALIZE_START';
const SURVEY_TRAY_INITALIZE_END='SURVEY_TRAY_INITALIZE_END';
const SURVEY_TRAY_POINT_SUBMITTED='SURVEY_TRAY_POINT_SUBMITTED';
const SURVEY_TRAY_UPDATE_XY='SURVEY_TRAY_UPDATE_XY';
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
        occupancyType: "",
        damcat:"",
        x: 0.0,
        y: 0.0,
        found_ht: 0.0,
        stories: 0,
        sq_ft: 0.0,
        found_type:"",
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
            return Object.assign({}, state, payload);
          case MAP_INITIALIZED:
            return Object.assign({}, state, {
              shouldInitialize: true
            })
          default:
            return state;
        }
      }
    },
    doSurveyTrayInitialize: () => ({ dispatch, store, anonGet }) => {
      dispatch({
        type: SURVEY_TRAY_INITALIZE_START,
        payload: {
          shouldInitialize: false,
          occupancyType: "",
          damcat:"",
          x: 0.0,
          y: 0.0,
          found_ht: 0.0,
          stories: 0,
          sq_ft: 0.0,
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
    doSelectOccupancyType: (input) => ({dispatch, store}) =>{
        dispatch({
            type: SURVEY_TRAY_OCCUPANCY_TYPE_SELECTED,
            payload: {
              occupancyType: input,
            }
          }) 
    },
    doSelectDamCat:(input) =>({dispatch, store}) =>{
      dispatch({
        type: SURVEY_TRAY_DAMCAT_SELECTED,
        payload: {
          damcat: input,
        }
      })
    },
    doSelectFoundHt:(input) =>({dispatch, store}) =>{
      if(!isNaN(input)){
        dispatch({
          type: SURVEY_TRAY_FNDHT_ENTERED,
          payload: {
            found_ht: input,
          }
        })
      }
    },
    doSelectNumStory:(input) =>({dispatch, store}) =>{
      if(!isNaN(input)){
        dispatch({
          type: SURVEY_TRAY_NUMSTORY_ENTERED,
          payload: {
            stories: input,
          }
        })
      }
    },
    doSelectSqFt:(input) =>({dispatch, store}) =>{
      if(!isNaN(input)){
        dispatch({
          type: SURVEY_TRAY_SQFT_ENTERED,
          payload: {
            sq_ft: input,
          }
        })
      }
    },
    doSelectStructure: () =>({dispatch, store}) =>{
      //dispatch({type:"DRAWPOLYGONS_ACTIVATE", payload:{active: true}})//this doesnt work...
      dispatch({
        type: SURVEY_TRAY_INITALIZE_END,
        payload: {
          shouldInitialize: false,
          occupancyType: "invalid",
          damcat:"filename",
          x: "12343",
          y: "fish",
          found_ht: "i like to",
          stories: "eat",
          sq_ft:"tomatoes",
        }
      })
    },
    doSelectGenericVal:(input, targetField, validator) =>({dispatch, store}) =>{
      if(validator(input)){
        dispatch({
          type: SURVEY_TRAY_VAL_ENTERED,
          payload: {
            [targetField]: input
          }
        })
      }
    },
    doSelectGenericDropDown:(input, targetField) =>({dispatch, store}) =>{
      dispatch({
        type: SURVEY_TRAY_VAL_ENTERED,
        payload: {
          [targetField]: input
        }
      })      
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
    selectX: (state)=>{
      return state.surveytraybundle.x
    },
    selectNumStory: (state)=>{
      return state.surveytraybundle.stories
    },
    selectSqFt: (state)=>{
      return state.surveytraybundle.sq_ft
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