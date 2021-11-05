/**
 * Use to read and delineate raw csv file
 * Data modeled as an object with 2 elements:
 *    properties: header containing array of field names
 *    values: 2d matrix of subarrays within a main array
 */

class CSVMetaArrayReader {
  /**
   * @param {File | Blob} file csv file
   */
  constructor(file) {
    this.file = file
  }

  /**
   * Read in file then invert control of data to handler. Handler
   * is intended to be a setState function or redux action
   */
  readFile(handler) {
    const file = this.file
    const reader = new FileReader();
    reader.onabort = () => console.log("file reading was aborted")
    reader.onerror = () => console.log("file reading has failed")
    reader.onload = () => {
      // this is on a diff priority queue
      this.data = this.__csvTextToMetaArray(reader.result)
      this.__storeData(handler)
    }
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
   * Inverting control of data to a handler
   */
  __storeData(handler) {
    handler(this.data)
  }
}

export default CSVMetaArrayReader;
