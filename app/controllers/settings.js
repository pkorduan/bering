// controllers settings
'use strict'

module.exports.init = function() {
  console.log('controllers.settings.init');

  // register event handler

  console.log('register click on settings_edit_link')
  $('#settings_edit_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.edit(evt)
    }
  )
}

module.exports.edit = function(evt) {
  console.log('controllers.settings.edit');
  $('section').hide();
  $('#settings_edit_section').show()
}