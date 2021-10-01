import { connect } from "redux-bundler-react"
import httpStatus from "./httpStatus";


const handleUnexpectedResponse = (response, expectedHttpStatus) => {
  if (expectedHttpStatus !== response.status) {
    throw Error

  } else {
    return response;
  }
}

/*
*   Cookie cutter REST request
*/
class SurveyApi {

  constructor(token, apiHost) {
    this.token = token;
    this.apiHost = apiHost
  }


  post(endpoint, body, expectedHttpStatus, errorHandlerCallback) {

    fetch(`${this.apiHost}${endpoint}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
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

  setToken(token) {
    this.token = token;
  }

}


connect(postNewSurvey)

export default SurveyApi;
