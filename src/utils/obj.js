
const checkValidProperties = obj => Object.values(obj).every(o => o === null || o === undefined);

export default checkValidProperties;