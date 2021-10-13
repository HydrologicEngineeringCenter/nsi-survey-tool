
/**
 * Interface with csv data as an array of objects. 
 * Data modeled as a 2d matrix with n-datapoints x m-properties.
 * 
 * Changelog:
 * 13OCT2021 v1.0
 */
class CSVJsonArray {
  /**
   * 
   * @param {File | Blob} file csv file
   */
  constructor(file) {
    this.file = file

    // read from file
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      // Do whatever you want with the file contents
      this.data = this.__csvTextToJsonArray(reader.result)
    }
    reader.readAsText(file)
  }

  __csvTextToJsonArray(rawCsvText) {
    const lines = rawCsvText.replaceAll("\r", "").split("\n");

    let result = [];

    // NOTE: If your columns contain commas in their values, you'll need
    // to deal with those before doing the next step 
    // (you might convert them to &&& or something, then covert them back later)
    // jsfiddle showing the issue https://jsfiddle.net/
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {

      let obj = {};
      const currentline = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
    return result;
  }

  /**
   * Change property name for the entire array
   * @param {Number} index 
   * @param {String} newName 
   */
  changePropertyName(oldName, newName) {
    this.data = this.data.map(obj => this.__changePropertyNameSingleObj(obj, oldName, newName))
  }

  /**
   * Replace property name at index location from an object eg.
   *  changeNameSingleObj({ a:1, b:2 }, 0, "c") => { c:1, b:2 }
   * @param {Object} obj 
   * @param {String} oldName
   * @param {String} newName 
   */
  __changePropertyNameSingleObj(obj, oldName, newName) {
    obj[newName] = obj[oldName]
    delete obj[oldName]
    return obj
  }
  
  removeNA() {

  }

  /**
   * 
   * @param {*} name 
   * @param {*} value 
   */
  addProperty(name, value) {

  }

  /**
   * Returns array containing all property names
   */
  getOwnPropertyNames() {
    return Object.getOwnPropertyNames(this.data[0])
  }
}

export default CSVJsonArray;