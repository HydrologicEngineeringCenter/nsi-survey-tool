class UnexpectedResponseError extends Error {
  constructor(response) {
    this.response = response
    this.value = response.status
    this.message = response.statusText
  }
  toString = () => "Status: " + " " + this.value + " - " + this.message;
}

class InvalidRequestError extends Error {
  constructor(message) {
    this.message = message
  }
  toString = () => "InvalidRequestError: " + this.message;
}

export { UnexpectedResponseError, InvalidRequestError }
