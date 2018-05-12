'use strict'

module.exports.rowsFromSqlDataObject = function (dataObject) {
  log('Model DbMapper.rowsFromSqlDataObject %o', dataObject);
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

module.exports.getFormFieldValues = function (formId) {
  let keyValue = {columns: [], values: []}
  $('#' + formId).find('input:visible, textarea:visible').each(function (idx, obj) {
    keyValue.columns.push($(obj).attr('id'))
    keyValue.values.push($(obj).val())
  })
  return keyValue
}

module.exports.getFormFieldKVPs = function (formId) {
  log('Model dbMapper.getFormFieldKVPs');
  let kvps = {}
  $('#' + formId).find('select, input:visible, textarea:visible').each(
    function (idx, field) {
      if (!(field.id == 'id' && field.value == ''))
        kvps[field.id] = field.value
    }
  )
  log('kvps' + JSON.stringify(kvps))
  return kvps
}

module.exports.placeHoldersString = function (length) {
  let places = ''
  for (let i = 1; i <= length; i++) {
    places += '?, '
  }
  return /(.*),/.exec(places)[1]
}