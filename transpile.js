const fs = require('fs');

const angular = require('./src/angular.mock');

// Parse arguments
var argv = require('minimist')(process.argv.slice(2));
if (!argv.file) {
    throw 'transpile requires --file specifying the path to a file';
}

// Read file
const code = fs.readFileSync(argv.file, "utf8");
// Eval will utilize our angular.mock to read modules
eval(code);
// Transpile
angular.transpile();
