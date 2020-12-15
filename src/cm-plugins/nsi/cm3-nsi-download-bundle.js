

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
  doNsiDownload:() =>({ dispatch, store }) => {
    console.log("Clickty Clack")
    /*dispatch({
      type: "DRAWPOLYGONS_ACTIVATE",
      payload: {
        active: true,
      },
    });*/
    var p = store.selectDrawPolygonsLayer()
    console.log(p.getSource().getExtent())//not in the right units
    var bbox =`${p.getSource().getExtent()[0]},${p.getSource().getExtent()[1]},${p.getSource().getExtent()[0]},${p.getSource().getExtent()[3]},${p.getSource().getExtent()[2]},${p.getSource().getExtent()[3]},${p.getSource().getExtent()[2]},${p.getSource().getExtent()[1]},${p.getSource().getExtent()[0]},${p.getSource().getExtent()[1]}`
    console.log(bbox)//not in the right units.
    dispatch({
      type: "NSI_DOWNLOAD_STARTED",
      payload: {
        fips: '15002',
      },
    });
    dispatch({
      type: "BASIC_TOOL_DEACTIVATE",
      payload: {
        activeTool: null,
      },
    });
  },
  selectFips: (state) =>{
    return state.nsiDownload.fips
  }
};
