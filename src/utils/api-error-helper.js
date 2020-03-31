const alertError = err => alert(getFormatedErrStatusAndMessage(err));

const onServerError = ({
  onNotFound = alertError,
  onForbidden = alertError,
  onBadRequest = alertError,
  onUnauthorized = alertError,
  onPaymentRequired = alertError,
  onServiceUnavailable = alertError,
  onInternalServerError = alertError,
  defaultErrorHandler = alertError,
}) => err => {
  if (err && err.response && err.response.status) {
    switch (err.response.status) {
      case 400:
        return onBadRequest(err);

      case 401:
        return onUnauthorized(err);

      case 402:
        return onPaymentRequired(err);

      case 403:
        return onForbidden(err);

      case 404:
        return onNotFound(err);

      case 500:
        return onInternalServerError(err);

      case 503:
        return onServiceUnavailable(err);

      default:
        defaultErrorHandler(err);
    }
  }
};

const getErrStatus = err => {
  if (err && err.response) {
    return err.response.status;
  }
};

const getErrMessage = err => {
  if (err && err.response) {
    return err.response.statusText;
  }
};

const getFormatedErrStatusAndMessage = err => {
  if (err && err.response) {
    return '[' + err.response.status + '] ' + err.response.statusText;
  }
};

const getResponseData = err => {
  if (err && err.response) {
    return err.response.data;
  }
};

const getResponseDataError = err => {
  const responseData = getResponseData(err);
  if (responseData) {
    return responseData.error;
  }
};

const getResponseDataErrorMessage = err => {
  const responseDataError = getResponseDataError(err);
  if (responseDataError) {
    return responseDataError.message;
  }
};

const getResponseDataErrorMessageErrors = err => {
  const responseDataErrorMessage = getResponseDataErrorMessage(err);
  if (responseDataErrorMessage) {
    return responseDataErrorMessage.errors;
  }
};

export {
  onServerError,
  getErrStatus,
  getErrMessage,
  getResponseData,
  getResponseDataError,
  getFormatedErrStatusAndMessage,
  getResponseDataErrorMessage,
  getResponseDataErrorMessageErrors,
};
