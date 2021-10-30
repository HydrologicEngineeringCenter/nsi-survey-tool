import _ from "lodash";

/**
 * Interface with csv data as an array of objects.
 * Data modeled as a 2d matrix of subarrays within a main array
 *
 * Changelog:
 * 13OCT2021 v1.0
 */
class CSVMetaArray {
  /**
   * @param {File | Blob} file csv file
   */
  constructor(file) {
    this.file = file;

    // read from file
    const reader = new FileReader();
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      // Do whatever you want with the file contents
      this.data = this.__csvTextToMetaArray(reader.result);
    };
    reader.readAsText(file);
  }

  /**
   * Process raw csv text into a meta array object
   *
   * Output object contains:
   *    properties: field name ie data column name
   *    values: an array of subarrays, each subarray is a data row
   */
  __csvTextToMetaArray(rawCsvText) {
    const lines = rawCsvText.replaceAll("\r", "").split("\n");

    let result = []; // outer array
    const header = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
      let obj = []; // inner arrays
      const currentline = lines[i].split(",");

      for (let j = 0; j < header.length; j++) {
        obj[j] = currentline[j];
      }

      result.push(obj);
    }
    return { properties: header, values: result };
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
  /**
   * Replace property name at index location from an object eg.
   *  changeNameSingleObj({ a:1, b:2 }, 0, "c") => { c:1, b:2 }
   * @param {Object} obj
   * @param {String} oldName
   * @param {String} newName
   */
  // __changePropertyNameSingleObj(obj, oldName, newName) {
  //   obj[newName] = obj[oldName];
  //   delete obj[oldName];
  //   return obj;
  // }

  removeNA() {
  }


  /**
   * Returns array containing all property names
   */
  getOwnPropertyNames() {
    return this.data.properties
  }
}

export default CSVMetaArray;
