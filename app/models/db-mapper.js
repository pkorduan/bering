'use strict'

module.exports.rowsFromSqlDataObject = function (dataObject) {
  console.log('Model DbMapper.rowsFromSqlDataObject %o', dataObject);
  let rows = {}
  let i = 0
  let j = 0
  for (let valueArray of dataObject.values) {
    rows[i] = {}
    j = 0
    for (let column of dataObject.columns) {
      Object.assign(rows[i], {[column]: valueArray[j]})
      j++
    }
    i++
  }
  return rows
}