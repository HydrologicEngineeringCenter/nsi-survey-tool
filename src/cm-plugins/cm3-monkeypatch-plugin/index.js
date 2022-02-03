import createBundle from './bundle';

export default (options) => {
  console.log('bundle being exported through index', options)
  const defaultConfig = {
    // send outer app store into the map store
    getOuterStore: null,

    // send the map store up to the outer store
    registerInnerStore: null
  }

  const config = { ...defaultConfig, ...options }

  return {
    components: [],
    bundle: createBundle(config)
  }
}
