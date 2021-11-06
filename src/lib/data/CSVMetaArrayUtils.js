import _ from "lodash";

/**
 * Fluent interface to provide common utilities to CSVMetaArray
 *
 *   Class is provided as a fluent processing pipeline and multiple
 *    interface methods to extract data
 *
 *    const dataPipeline = metaArrayPipe(rawData)
 *    dataPipeline
 *      .changeProperty(['newProperty0', 'newProperty1'])
 *      .removeNA()
 *    const data = dataPipeline.data()
 *    const headers = dataPipeline.properties()
 */
export default class {

  /////////////////////////////
  //  fluent pipeline
  /////////////////////////////
  constructor(metaArray) {
    this.metaArray = metaArray
    return this
  }

  // By array
  changeProperty(newNameArray) {
    this.metaArray.properties = newNameArray
    return this
  }

  changePropertyByName(oldName, newName) {
    const nameIdx = _.findIndex(metaArray.properties, oldName)
    this.changePropertyByIndex(nameIdx, newName)
    return this
  }

  changePropertyByIndex(newName, idx) {
    this.metaArray.properties[idx] = newName
    return this
  }

  /**
   * TODO - this will probably be useful at some point
   */
  removeNA() {
  }

  __validPropArrayDim(arr) {
    const dims = this.dim()
    if (dims[1] === arr.length) {
      return true
    } else {
      return false
    }
  }

  /////////////////////////////
  //  interface
  /////////////////////////////

  // returns dimentions of array [noRows, noColumns]
  dim() {
    const row = this.metaArray.values.length
    const col = this.metaArray.values[0] ? this.metaArray.values[0].length : 0
    return [row, col]
  }

  data() {
    return this.metaArray
  }

  /**
   * Returns array containing all property names
   */
  properties() {
    return this.metaArray ? this.metaArray.properties : null
  }

  // generate json array required for HTTP requests
  // jsonArray() {
  //   this.metaArray.values.forEach(row => {
  //     let obj = {}
  //     this.metaArray.properties.forEach((col, idx) => {
  //       Object.assign(obj, {
  //         `${col}`:

  //       })
  //     })


  //   })
  // }
}


