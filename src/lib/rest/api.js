import { connect } from "redux-bundler-react"
import httpStatus from "../../stores/httpStatus";


const handleUnexpectedResponse = (response, expectedHttpStatus) => {
  if (expectedHttpStatus !== response.status) {
    throw Error

  } else {
    return response;
  }
}



const retrieveData = props => {

}

/*
*   Cookie cutter REST request
*/
class SurveyApi {

  constructor(apiHost) {
    this.apiHost = apiHost
  }

  /**
   * Send an authenticated post request
   * @param {string} token bearer token from auth server
   * @param {string} endpoint http endpoint to send 
   * @param {object} json object to pass as request body  
   * @param {*} expectedHttpStatus expected response status for success operation
   * @param {function} errorHandlerCallback 
   */
  post(token, endpoint, body, expectedHttpStatus, errorHandlerCallback) {

    fetch(`${this.apiHost}${endpoint}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: body,
    })
      .then(handleUnexpectedResponse(expectedHttpStatus))
      .then(response => {
        return {
          status: response.status,
          body: response.json()
        }
      })
      .catch(error => (error);
      })



    return { status, body }

  }

  updateToken(token) {
    this.token = token;
  }

}

export default SurveyApi;
