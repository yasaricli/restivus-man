Package.describe({
  name: 'yasaricli:restivus-man',
  version: '0.0.1',
  summary: '',
  git: '',
  documentation: 'README.md'
});

Npm.depends({
  "request": "2.85.0",
  'fibers': '2.0.2'
})

Package.onUse(function(api) {
  api.versionsFrom('1.6.1.1');

  api.use([
    'ecmascript',
    'underscore',
    'templating',
    'tracker',
    'less',
    'reactive-var',

    'simple:reactive-method@1.0.2'
  ]);

  api.addFiles([
    'templates.html',
    'styles.less'
  ], 'client');

  api.mainModule('restivus-man-server.js', 'server');
  api.mainModule('restivus-man-client.js', 'client');
});
