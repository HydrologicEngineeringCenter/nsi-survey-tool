

export default {
  name: "nsiDownload",

  getReducer: () => {
    const initialData = {
      fips: '15005',
    };

    return (state = initialData, { type, payload }) => {
      switch (type) {
        case "NSI_DOWNLOAD_STARTED":
          return Object.assign({}, state, payload);
        default:
          return state;
      }
    };
  },
  doNsiDownload: () => ({ dispatch, store }) => {
    console.log("Clickty Clack")
    dispatch({
      type: "NSI_DOWNLOAD_STARTED",
      payload: {
        fips: '15002',
      },
    });
  },

};
