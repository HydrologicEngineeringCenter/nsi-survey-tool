export default (config) => {
  return {
    name: 'monkeyPatch',

    getReducer: () => {
      const initialState = {
        _shouldMonkeyPatch: false,
        outerStore: null
      }

      // the action type here is pretty CorpsMap specific, might want to make it more
      // generic, but not going to worry too much about that right now.
      return (state = initialState, { type, payload }) => {
        switch (type) {
          case 'MAP_INITIALIZED':
            return Object.assign({}, state, {
              _shouldMonkeyPatch: true
            });
          case 'MONKEYPATCHED':
            return Object.assign({}, state, payload)
          default:
            return state;
        }
      }
    },

    doMonkeyPatch: () => ({ dispatch, store }) => {
      dispatch({
        type: 'MONKEYPATCHED',
        payload: {
          _shouldMonkeyPatch: false
        }
      })
      if (config.registerInnerStore) {
        config.registerInnerStore(store);
      }
      if (config.getOuterStore) {
        config.getOuterStore((store) => {
          dispatch({
            type: 'MONKEYPATCHED',
            payload: {
              outerStore: store
            }
          })
        })
      }
    },

    // this selector should give you the outer store where you can use any of it's
    // actionCreators or selectors
    selectMonkeyPatchOuterStore: (state) => {
      return state.monkeyPatch.outerStore;
    },

    reactShouldMonkeyPatch: (state) => {
      if (state.monkeyPatch._shouldMonkeyPatch) return { actionCreator: "doMonkeyPatch" }
    }
  }
}
