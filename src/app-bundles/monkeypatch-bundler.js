import { createSelector } from "redux-bundler";

export default {
  name: "monkeyPatch",

  getReducer: () => {
    const initialData = {
      "default": null
    };

  return (state = initialData, { type, payload }) => {
    if (type === 'MONKEYPATCH_OTHERSTORE_ADDED') {
      return Object.assign({}, state, payload);
    }
      return state;
    };
  },

  // Use this actionCreator to add a reference to a "sub-store" to this store for accessing
  // things like map events or getting a reference to a map or layers or whatever
  doMonkeyPatchAddSubStore: (otherStore, key="default") => ({dispatch}) => {
    dispatch({
      type: 'MONKEYPATCH_OTHERSTORE_ADDED',
      payload: {
        [key]: otherStore
      }
    })
  },

  // Use this actionCreator to send the "outer" store down to a "sub-store" such as CorpsMap
  // That store will just need a copy of this bundle to handle monkeypatching there
  doMonkeyPatchGetOuterStore: (addSubStore) => ({ dispatch, store }) => {
    addSubStore(store);
    // this dispatch not necessary really...
    dispatch({
      type: 'MONKEYPATCH_STORE_CONNECTED',
    })
  },

  // If you add other stores besides "default"
  // use this selector and grab the one you want by key
  selectMonkeyPatchStores: (state) => {
    return state.monkeyPatch;
  },

  selectMonkeyPatchDefaultStore: createSelector('selectMonkeyPatchStores', (stores) => {
    return stores.default
  }),
}
