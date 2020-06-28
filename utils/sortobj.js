module.exports = (obj, number) => {
  var finalObj = {}
  for (i = number; i > 0; i--) {
    Object.entries(obj).forEach(([key, value]) => {
      if (value === i) {
        finalObj[key] = value;
      }
    })
  }
  return finalObj;
}