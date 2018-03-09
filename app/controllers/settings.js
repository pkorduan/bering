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

  $('#settings_info_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.info(evt)
    }
  )

}

module.exports.edit = function(evt) {
  console.log('controllers.settings.edit');
  $('section').hide();
  $('#settings_edit_section').show()
}

module.exports.info = function(evt) {
  console.log('controllers.settings.info');
  let version = fs.readFileSync(path.join(app.getAppPath(), 'VERSION'), 'utf8')

  $('#settings_info_version').html(version)
  $('section').hide();
  $('#settings_info_section').show()
}