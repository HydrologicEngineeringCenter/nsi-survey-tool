const SURVEY_TRAY_INITALIZE_START='SURVEY_TRAY_INITALIZE_START';
const SURVEY_TRAY_INITALIZE_END='SURVEY_TRAY_INITALIZE_END';
//const SURVEY_TRAY_POINT_SUBMITTED='SURVEY_TRAY_POINT_SUBMITTED';
//const SURVEY_TRAY_UPDATE_XY='SURVEY_TRAY_UPDATE_XY';
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
        damcat:"Unknown",
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
          occupancyType: "RES1",
          damcat:"Unknown",
          x: 0.0,
          y: 0.0,
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
    },
    doModifyStructure: () =>({dispatch, store}) =>{      
          //dispatch({type:"DRAWPOLYGONS_ACTIVATE", payload:{active: true}})//this doesnt work...
      dispatch({
        type: SURVEY_TRAY_INITALIZE_END,
        payload: {
          shouldInitialize: false,
          occupancyType: "RES1",
          damcat:'Unknown',//this has to be specified as a real value in the maps or it throws an exception because it creates the list for Occtype
          x: "12343",
          y: "fish",
          found_ht: "i like to",
          stories: "eat",
          sq_ft:"tomatoes",
        }
      })
    },
    doModifyGenericVal:(input, targetField, validator) =>({dispatch, store}) =>{
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
    selectX: (state)=>{
      return state.surveytraybundle.x
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