const GENERAL_ACTION = {
  STORE_BACKEND: "GENERAL_ACTION.STORE_BACKEND",
}

export default {
  name: 'general',

  getReducer: () => {
    const initialData = {
      backend: null,
    }
    return (state = initialData, { type, payload }) => {
      switch (type) {
        case GENERAL_ACTION.STORE_BACKEND:
        default:
          return payload ? { ...state, ...payload } : { ...state }
      }
    }
  },

  doStoreBackend: backend => ({ dispatch }) => {
    dispatch({
      type: GENERAL_ACTION.STORE_BACKEND,
      payload: {
        backend: backend
      }
    })
  },

  // TODO find a better place for this backend access object
  selectBackend: state => state.general.backend,

}
