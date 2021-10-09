/**
 * 
 * @param {object} obj test object
 * @returns {boolean} true if all properties are not null or undefined
 */
const allValidProperties = obj => Object.values(obj).every(o => o !== null || o !== undefined);

export default allValidProperties;