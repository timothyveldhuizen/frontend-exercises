# Typescript exercises

This is used for reference how to write, compile and lint Typescript files with VS Code (Node.js + NPM)

[Markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/)

## Using tsc (1st time)
You can use this package to compile Typescript to Javascript.
Go to the typescript exercise directory `cd typescript` and we assume you already have a package.json (if not run `npm init`)
Use the `npm install --save-dev typescript` to update your `devDependencies` package.json in your project.
If you use the `npm install typescript` the your package.json is updated in `dependencies`. 


If installed globally in the .node_modules on your machine with `npm install -g typescript` you can call `tsc exercises.ts`
Then typescript is installed in your root `npm root -g`

If installed locally in the .node_modules in the project you can call `npx tsc exercises.ts`
For we assume you installed it locally.

Use `npx tsc --init` to create a tsconfig.json
When runnning `npx tsc` we will use tsconfig.json to compile to Javascript with all the compiler options in tsconfig.json.

When the output is rendered in the `/dist` folder you can debug/run the js files in VS Code.

## Using tsc 2nd or multiple times
When you already have a npm project with tsc all you need to is to get/update your node modules defined in the package.json
To do this be in the typescript folder and run `npm install`, this will install dependencies described in package.json

Now you can run `npx tsc` again.

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


Helpful links:
- [TSLint configuration](https://palantir.github.io/tslint/usage/configuration/)

## Using ESLint with a typescript parser
They announced to deprecate TSLint and make ESLint the linter for Javascript & Typescript in 2019 (https://github.com/palantir/tslint/issues/4534)
The setup is quite similar to TSLint only with some extra configuration.

First of all install eslint: `npm install --save-dev eslint`
Then do `npx eslint --init` to create a `.eslintrc` configuration file (you will get some questions to setup).

### Setup TSLint parser
Install the TSLint parser `npm install --save-dev @typescript-eslint/parser`
In your `.eslintrc` file you change the configuration to use a different parser, the `@typescript-eslint/parser`
```
{
  "parser": "@typescript-eslint/parser",
  "parserOptions":  {
        ...
}
```

When `npx eslint exercises.ts` is executed the TSLint parser is used and parses the file.
The rule `"no-console": "off"` is added to `.eslintrc` to allow console.log in our code, otherwise the parser complains about this.

Helpful links:
- [ESLint configuration](https://eslint.org/docs/user-guide/configuring#specifying-parser)
- [Setting up typescript parser](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser)
- [ESLint rules](https://eslint.org/docs/rules/)
