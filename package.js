Package.describe({
  name: 'yasaricli:restivus-man',
  version: '0.0.1',
  summary: 'Restivus UI',
  git: 'https://github.com/yasaricli/restivus-man',
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
    'templating@1.3.2',
    'tracker',
    'less',
    'reactive-var',

    'manuel:reactivearray@1.0.6',
    'simple:reactive-method@1.0.2'
  ]);

  api.addFiles([
    'templates.html',
    'styles.less'
  ], 'client');

  api.mainModule('restivus-man-server.js', 'server');
  api.mainModule('restivus-man-client.js', 'client');
});
