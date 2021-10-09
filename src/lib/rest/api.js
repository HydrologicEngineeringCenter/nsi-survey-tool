import { connect } from "redux-bundler-react"
import httpStatus from "../../stores/httpStatus";
import { UnexpectedResponseError } from "../errors/exceptions";

const apiHost = process.env.REACT_APP_SURVEY_API;

const handleUnexpectedResponse = (response, expectedHttpStatus) => {
  if (expectedHttpStatus !== response.status) {
    throw new UnexpectedResponseError(response)
  } else {
    return response;
  }
}

/*
*   Cookie cutter REST request
*/
class SurveyApi {

  constructor() {
    this.apiHost = apiHost
  }

  /**
   * Send an authenticated request
   * @param {string} token bearer token from auth server
   * @param {object} params object from the requestParams store
   */
  send(token, requestParams) {

    fetch(`${this.apiHost}${requestParams.endpoint}`, {
      method: requestParams.method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: requestParams.body ? JSON.stringify(requestParams.body) : "",
    })
      .then(handleUnexpectedResponse(requestParams.expectedResponseStatus))
      .then(response => {
        return {
          status: response.status,
          body: response.json()
        }
      })
      .catch(error => console.log(error.toString()));
  }
}


export default SurveyApi;
