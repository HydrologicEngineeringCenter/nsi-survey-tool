import { UnexpectedResponseError } from "../errors/exceptions";

const apiHost = process.env.REACT_APP_SURVEY_API;

// error handling inside the connection access object
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
  * Returns a prepopulated fetch promise
  */
  fetch(authAccessToken, requestParams) {
    let url = ''
    let query = ''

    // add in pathParam
    if (requestParams.pathParam) {
      url = `${apiHost}${requestParams.endpoint}${requestParams.pathParam}${requestParams.suffix}`
      if (requestParams.pathParam2) {
        url += `${requestParams.pathParam2}`
      }
    } else {
      url = `${apiHost}${requestParams.endpoint}${requestParams.suffix ? requestParams.suffix : ""}`
    }

    // add in query string
    if (requestParams.query) {
      query = new URLSearchParams(requestParams.query)
      url += ('?' + query.toString())
    }

    let requestObj = {
      method: requestParams.method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authAccessToken}`,
      },
    }

    if (requestParams.body) requestObj.body = JSON.stringify(requestParams.body)

    return fetch(url, requestObj)
  }
}


export default SurveyApi;
