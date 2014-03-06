/*!
 * Siemens Demo
 *
 */

require(['views/application_view', 'jquery'], function(ApplicationView) {
  $(function () {
    $('#application').html(function() {
      var appView = new ApplicationView();
      return appView.render().el;
    });
  });
});
