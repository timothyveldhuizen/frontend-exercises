# Using Yarn scripts

This is how you can use existing or custom yarn scripts.

## Setup
Start by running `yarn init` to create a package.json with default information. Now a package.json is created that you can use

## Install Typescript package with Yarn
Run the command `yarn add typescript --dev` to add it to your devDependencies in package.json


More information: https://yarnpkg.com/en/docs/usage
Comparison of npm & yarn commands: https://yarnpkg.com/en/docs/migrating-from-npm

## Custom scripts

For using scripts the basics are the same as for NPM.
Just add custom scripts to package.json:
```
"scripts": {
    "say-hello": "echo 'Just say Hello! Hello..'"
  }
```

And then run the script with `yarn say-hello`