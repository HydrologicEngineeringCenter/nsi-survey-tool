
const apiHost=process.env.REACT_APP_SURVEY_API;
const CREATE_NEW_SURVEY = "CREATE_NEW_SURVEY";
const ADD_SURVEY_POINTS = "ADD_SURVEY_POINTS";
const ADD_SURVEYORS = "ADD_SURVEYORS";


export default {

  name: 'createNewSurvey',

  getReducer: () => {
    const initialData = {
      // _flagInvalidName: false,
      surveyName: "",
      flagSurveyActive: true,
    };
    return (state = initialData, { type, payload }) => {
      switch (type) {
        case CREATE_NEW_SURVEY:

        case ADD_SURVEY_POINTS:
        case ADD_SURVEYORS:
        default:
          return state;
      }
    }
  },

  doCreateNewSurvey: (surveyName) => ({ dispatch, store }) => {
    
    console.log(store)
    const token = store.selectAuthNSIToken();
    const surveyName = store.selectSurveyName();
    const flagSurveyActive = store.selectFlagSurveyActive();

    if (token) {

    } else {
      console.log("Error: not logged in or missing token. Cannot create new survey");
    }

    
    dispatch({
      type: CREATE_NEW_SURVEY,
      payload: {
        surveyName: surveyName,
        activeStatus: flagSurveyActive
      }
    })
  },

  // selectInvalidName: state => state.createNewSurvey._flagInvalidName,
  selectSurveyName: state => state.createNewSurvey.surveyName,
  selectFlagSurveyActive: state => state.createNewSurvey.flagSurveyActive,


};