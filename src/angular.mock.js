'use strict'

const mkdirp = require('mkdirp');
const fs = require('fs');

const Util = require('./util/util');
const directive = require('./transpilers/directive');

const OUTPUT_PATH = './output/';

const modules = {};

/**
 *  Mocked Angular Module
 *  
 *  @param {string} name - the module name
 *  @param {Array} deps - the module dependencies
 */
class Module {

    constructor(name, deps) {
        this.name = name;
        this.deps = deps;
        this.components = [];
        this.services = [];
        this.factories = [];
    }

    /**
     *  Mocked Angular Directive
     *  
     *  @param {string} name - the directive name
     *  @param {Array|Function} arg - the second argument. Can be
     *      either a function or an array due to minification standard.
     */
    directive(name, arg) {
        var parsedDeps = Util.parseDependencies(arg);
        var details = parsedDeps.fn();
        var component = Object.assign({ name, details }, parsedDeps, {
            template: Util.parseTemplate(details)
        });
        this.components.push(component);
    }

    /**
     *  Mocked Angular Service
     *  
     *  @param {string} name - the service name
     *  @param {Array|Function} arg - the second argument. Can be
     *      either a function or an array due to minification standard.
     */
    service(name, arg) {

    }

    /**
     *  Mocked Angular Factory
     *  
     *  @param {string} name - the factory name
     *  @param {Array|Function} arg - the second argument. Can be
     *      either a function or an array due to minification standard.
     */
    factory(name, arg) {

    }
}

module.exports = {
    /**
     *  Cached module declarator
     *  
     *  @param {string} name - the module name
     *  @param {Array} deps - module dependencies
     */
    module: (name, deps) => {
        if (!modules[name]) {
            modules[name] = new Module(name, deps);
        }
        return modules[name];
    },
    /**
     *  Transpile all of the parsed modules and write them
     *  out to the output path
     */
    transpile: function() {
        Object.keys(modules).forEach(function(key) {
            const mod = modules[key];
            const path = OUTPUT_PATH + mod.name;
            mkdirp(path, function (err) {
                mod.components.forEach(function(component) {
                    var code = directive.transpile(component);
                    fs.writeFileSync(`${path}/${component.name}.jsx`, code);
                });
                mod.services.forEach(function(component) {

                });
                mod.factories.forEach(function(component) {

                });
            });
        });
    }
};