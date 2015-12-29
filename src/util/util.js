/**
 *  Either get the dependencies from the array syntax, or
 *  strip it from the args of the function
 *
 *  @param {Object} arg - the directive data
 */    
function parseDependencies(arg) {
    var fn, dependencies;
    // Dependency array?
    if (Array.isArray(arg)) {
        fn = arg.pop();
        dependencies = arg;
    } else {
        fn = arg;
        const REGEX_ARGS = /function\s*[^\(]*\(([^\)]*)\)/;
        const REGEX_ARG = /,[ ]?/;
        var args = arg.toString().match(REGEX_ARGS);
        dependencies = args ? args[1].split(REGEX_ARG) : [];
    }
    return { fn, dependencies };
}

/**
 *  Either get the dependencies from the array syntax, or
 *  strip it from the args of the function
 *
 *  @param {Object} module - the directive data
 *  @param {Object} arg - the directive data
 */    
function parseTemplate(component) {
    if (component.templateUrl) {
        return template = fs.readFileSync(component.templateUrl);
    } else {
        return component.template;
    }
}

module.exports = {
    parseDependencies,
    parseTemplate
}