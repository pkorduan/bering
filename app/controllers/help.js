// controllers settings
'use strict'

module.exports.init = function() {
  log('controllers.help.init');

  // register event handler

  log('register click on help_show_link')
  $('#help_show_link').on(
    'click',
    {
      context: this
    },
    function(evt) {
      evt.data.context.show(evt)
    }
  )

}

module.exports.show = function(evt) {
  log('controllers.help.show');

  $('section').hide();
  $('#help_section').show()
}
