/**
 * Zip two arrays of the same length together into an array of objects.
 * Similar to zip() in Python eg:
 * 
 * a = [1, 2, 3]
 * 
 * b = [4, 5, 6]
 * 
 * zip(a, b) => [[1,4] [2,5], [3,6]]
 */
const zip = (a, b) => a.map((k, i) => [k, b[i]])

export default zip;