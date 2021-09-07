
const CREATE_NEW_SURVEY = "CREATE_NEW_SURVEY";
const ADD_SURVEY_POINTS = "ADD_SURVEY_POINTS";
const ADD_SURVEYORS = "ADD_SURVEYORS";


export default {

  name: 'createNewSurvey',

  getReducer: () => {
    const initialData = {
      _flagInvalidName: false
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

  doCreateNewSurvey: () => ({ dispatch }, {surveyName, activeStatus}) => {
    dispatch({
      type: CREATE_NEW_SURVEY,
      payload: {
        surveyName: surveyName,
        activeStatus: activeStatus
      }
    })
  },

  selectCreateSurveyInvalidName: state => state.createNewSurvey._flagInvalidName,

};