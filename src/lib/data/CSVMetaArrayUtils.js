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
 *      .addIndex('index', 0)
 *      .addCol('allBs', 'B')
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
    const nameIdx = _.findIndex(this.metaArray.properties, name => {
      return name === oldName
    })
    this.changePropertyByIndex(newName, nameIdx)
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

  /**
   * add an index column with key 'index'
   * @param start start index
   */
  addIndex(start) {
    const idxVals = _.range(start, this.dim()[0] + start)
    this.metaArray.properties.push('index')
    this.metaArray.values.map((row, idx) => { row.push(idxVals[idx]) })
    return this
  }

  /**
   * add new column to data
   * @param key property name
   * @param val value of new column, can be a string, number, or array
   */
  addCol(key, val) {
    const type = typeof (val)

    if (val == null) {
      throw new Error("csvMetaArray.addCol: val is null")
    }

    switch (type) {
      case 'string':
      // auto fallthrough, handling for string and number are the same
      case 'number':
        this.metaArray.values.map(row => row.push(val))
        break
      case 'object':
        if (Array.isArray(val) && val.length === this.dim()[1]) {
          this.metaArray.values.map(
            (row, idx) => {
              row.push(idxVals[idx])
            })
          break
        }
      default:
        throw new Error(
          'csvMetaArray.addCol: val has to be a string, number, or array with the same number of rows as existing data'
        )
    }
    this.metaArray.properties.push(key)
    return this
  }

  /**
   *  Map callback function to every value row
   */
  mapRow(callback) {
    this.metaArray.values = this.metaArray.values.map(row => callback(row))
    return this
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
  jsonArray() {
    let results = []
    this.metaArray.values.forEach(row => {
      let obj = {}
      this.metaArray.properties.forEach((prop, idx) => {
        obj[prop] = row[idx]
      })
      results.push(obj)
    })
    return results
  }
}


