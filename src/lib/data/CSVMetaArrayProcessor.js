import _ from "lodash";

/**
 * Provides common utilities to CSVMetaArray
 */
class CSVMetaArrayProcessor {
  constructor(metaArray) {
    this.metaArray = metaArray
  }

  /**
   * Change column name based on previous name
   * @param {Number} index
   * @param {String} newName
   */
  changeProperty(oldName, newName) {
    const nameIdx = _.findIndex(this.properties, oldName)
    this.changePropertyByIndex(nameIdx, newName)
  }

  changePropertyByIndex(idx, newName) {
    this.data.properties[idx] = newName
  }

  removeNA() {
  }


  /**
   * Returns array containing all property names
   */
  getOwnPropertyNames() {
    return this.data ? this.data.properties : null
  }
}

export default CSVMetaArrayProcessor
