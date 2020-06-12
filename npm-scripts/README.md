# Using NPM scripts

This is how you can use existing or custom NPM scripts

## Setup
Start by running command `npm init` to create a package.json with default information. Now a package.json is created that you can use

## Custom NPM scripts

Add in the following in package.json:
```
"scripts": {
    "say-hello": "echo 'Just say Hello! Hello..'"
}
```

And run command `npm run say-hello` this will now execute the custom script. Or `npm run --silent say-hello` to disable default npm logs from outputting.

### Run bash script

You can run bash scripts, add a `hello.sh` bash file with the below content:
```
#!/usr/bin/env bash
# filename: hello.sh
echo "What's your name?"
read name
echo "Hello there, $name!"
```

And in you package.json:
```
"scripts": {
    "bash-hello": "bash hello.sh"
}
```

## Combine scripts

You can do `"hello-all": "npm run say-hello && npm run bash-hello"` but that is dirty. One way to write clean scripts is using pre and post hooks.

Use the exact naming as the normal normal script as shown below:
```
"scripts": {
    "say-hello": "echo 'Hello World'", 
    "presay-hello": "echo 'I run before say-hello'",
    "postsay-hello": "echo 'I run after say-hello'" 
}
```

## NPM install and NPM update

You can do `"npm install"` which will install all the devdependencies + dependencies mentioned in package.json.
If you want to check on new versions you can do `"npm outdated"`, which will list all outdated dependencies or you can do `"npm update"` which will update dependencies based on the versioning syntax. For example `"typescript": "^3.9.2"` version rule means we can update to patch 3.9.3, 3.9.4 or minor 3.10.0 releases. And `"npm update"` will do that for you following the versioning rule.

## More information

Finally, there is a lot that you can do with NPM scripts. Some use cases are:

- Minification/Uglification of CSS/JavaScript
- Automating the build process
- Linting your code
- Compressing images

Helpful links:
- [Intro to NPM scripts](https://medium.freecodecamp.org/introduction-to-npm-scripts-1dbb2ae01633)
- [Official npm scripts](https://docs.npmjs.com/misc/scripts)