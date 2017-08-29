# react-redux-boilerplate
Boilerplate project for a webapp using React/Redux architecture.


## Getting started

1. Clone this repository and delete the .git folder
1. Remove/Adapt all example components if necessary:
   component/button
   modules/counter
   views/home
   routes.js
1. Run `yarn`
1. Run `yarn dev`
1. Your application is running on `http://localhost:ENV.PORT || 3000`


## Prettier

### Sublime config
- Install it globally with `npm i -g prettier`
- Install jsprettier package via sublime package control

[Package](https://packagecontrol.io/packages/JsPrettier)

```
{
    "prettier_cli_path": "/usr/local/bin/prettier",
    "node_path": "/usr/local/bin/node",
    "auto_format_on_save": true,
    "allow_inline_formatting": false,
    "custom_file_extensions": [],
    "additional_cli_args": {},
    "max_file_size_limit": -1,
}

```

### VSCode config
[Package](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
```
{
  "prettier.eslintIntegration": true,
  "editor.formatOnSave": true,
  "typescript.check.npmIsInstalled": false,
  "extensions.ignoreRecommendations": true
}

```
