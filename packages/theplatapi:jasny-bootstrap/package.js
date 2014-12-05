Package.describe({
  name: 'theplatapi:jasny-bootstrap',
  summary: 'Jasny Bootstrap with dependencies taken care of.',
  version: '1.0.0'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use('ian:bootstrap-3', 'client');
  api.use('jquery', 'client');
  api.addFiles('jasny-bootstrap.min.css', 'client');
  api.addFiles('jasny-bootstrap.min.js', 'client');
});

Package.onTest(function(api) {

});
