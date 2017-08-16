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
https://packagecontrol.io/packages/JsPrettier
```
{
    "prettier_cli_path": "/usr/local/bin/prettier",
    "node_path": "/usr/local/bin/node",
    "auto_format_on_save": false,
    "allow_inline_formatting": false,
    "custom_file_extensions": [],
    "additional_cli_args": {},
    "max_file_size_limit": -1,

    "prettier_options": {
        "printWidth": 100,
        "singleQuote": true,
        "trailingComma": "all",
        "bracketSpacing": true,
        "jsxBracketSameLine": false,
        "parser": "babylon",
        "semi": false
    }
}

```
