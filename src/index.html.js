const DEFAULT_PATHS = {
  styles: 'styles.css',
  production: 'bundle.js',
  vendor: '404',
}

module.exports = (initialHtml = '', paths = DEFAULT_PATHS) =>
`<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>React Redux Boilerplate</title>
  <link rel="stylesheet" href="/static/${paths.styles}" />
</head>
<body>
  <div id="root">${initialHtml}</div>
  <script src="/static/${paths.vendor}"></script>
  <script src="/static/${paths.production}"></script>
</body>
</html>`
