/*!
 * Globe Test
 *
 */

require(['views/application_view', 'collections/factory_output'], function(ApplicationView, FactoryOutput) {
  $(function () {
    new ApplicationView({
      collection: new FactoryOutput()
    });
  });
});
