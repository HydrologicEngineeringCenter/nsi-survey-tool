import { SurveyApi } from "../lib/rest/api";

const baseApiUrl = process.env.REACT_APP_SURVEY_API;

const endPoints = {
  version: "/version",
  surveys: "/surveys",
}

const apiConnection = options => {

  name: "apiConnection",

  getReducer: () => {
    const initialData = {
      api: null,
    }
    return (state = initialData, { type, payload }) => {
      switch (type) {
        case "API_LOADED":
        case "AUTH_REMOVED":
          return Object.assign({}, state, payload);
        default:
      }
      return state;
    }
  },

  doCreateNewSurvey: () => ({ dispatch }) => {
    return
  },

  init: store => {

  }


}

export default apiConnection;