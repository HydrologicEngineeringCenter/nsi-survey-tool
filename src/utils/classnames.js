export default (opts) => {
  return Object.keys(opts)
    .map((key) => {
      return !!opts[key] ? key : "";
    })
    .join(" ");
};
