# Typescript exercises

This is used for reference how to write, compile and lint Typescript files with VS Code (Node.js + NPM)

[Markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/)

## Using tsc
Use the `npm install --save-dev typescript` to update your package.json in your project. You can use this package to compile Typescript to Javascript.

If installed globally in the .node_modules on your machine with `npm install -g typescript` you can call `tsc exercises.ts`

If installed locally in the .node_modules in the project you can call `npx tsc exercises.ts`

Use `tsc init` to create a tsconfig.json
When runnning `npx tsc` we will use tsconfig.json to compile to Javascript with all the compiler options in tsconfig.json.

After this you can debug/run the js files in VS Code.

Helpful links:
- [Package.json](https://flaviocopes.com/package-json/)
- [Typescript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Setting up Typescript project](https://alligator.io/typescript/new-project/)

## Using tslint 
Use the `npm install --save-dev tslint`. This package helps to quickly know about inconsistencies, syntax errors and omissions during development with Typescript. 

Use `npx tslint --init` to create a tslint.json with default configuration.

To lint run one of the following commands:
```
# lints every file in your project
npx tslint --project tsconfig.json --config tslint.json 

# shorthand of the command above
npx tslint -p . -c tslint.json 

# lint all files in the project excluding declaration files
npx tslint -p tsconfig.json --exclude '**/*.d.ts' 

# ignores files in tsconfig.json and uses the provided glob instead
npx tslint -p tsconfig.json **/*.ts 
```

They announced to deprecate TSLint and make ESLint the linter for Javascript & Typescript in 2019 (https://github.com/palantir/tslint/issues/4534)

Helpful links:
- [TSLint configuration](https://palantir.github.io/tslint/usage/configuration/)