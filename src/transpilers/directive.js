'use strict'

// dedent every other for pretty output
const beautify = require('js-beautify');
const dedent = require('dedent');

const BaseTranspiler = require('./transpiler');
const Util = require('../util/util');

const TEMPLATE_PLACEHOLDER = '$$_template_$$';

/**
 *  Directive to React Transpiler
 *  This transpiler takes in the information for an
 *  Angular directive, and transpiles it into the format
 *  of a React component. The only public method is .parse
 */
class DirectiveTranspiler extends BaseTranspiler {

    /**
     *  A method for transpilation angular directive data
     *  into a React component.
     *
     *  @param {Object} directive - the directive data
     *  @returns {string} transpiled template
     */    
    transpile(directive) {
        var reactCode = [
            this._transpileDependencies(directive),
            this._transpileComponentStart(directive),
            this._transpileConstructor(directive),
            this._transpileComponentWillUpdate(directive),
            this._transpileComponentDidUpdate(directive),
            this._transpileComponentShouldUpdate(directive),
            this._transpileRender(directive),
            this._transpileComponentEnd()
        ].join('\n');

        // Beautify everything but the JSX
        reactCode = beautify.js(reactCode);
        return this._transpileTemplate(reactCode, directive);

    }

    /**
     *  A helper for rendering the class declaration
     *
     *  @param {Object} directive - the directive data
     *  @returns {string} class declaration
     */
    _transpileComponentStart (directive) {
        const name = directive.name.charAt(0).toUpperCase() + directive.name.slice(1);
        return `class ${name} extends React.Component {`;
    }

    /**
     *  A helper for closing class declaration
     *
     *  @returns {string} class closing tag
     */
    _transpileComponentEnd () {
        return `};`;
    }

    /**
     *  A helper for rendering the constructor function
     *
     *  @param {Object} directive - the directive data
     *  @returns {string}
     */
    _transpileConstructor (directive) {
        return `
            constructor(props) {}
        `;
    }

    /**
     *  A helper for rendering the componentWillUpdate function
     *
     *  @param {Object} directive - the directive data
     *  @returns {string}
     */
    _transpileComponentWillUpdate (directive) {
        return dedent`
            componentWillUpdate() {}
        `;
    }

    /**
     *  A helper for rendering the componentDidUpdate function
     *
     *  @param {Object} directive - the directive data
     *  @returns {string}
     */
    _transpileComponentDidUpdate (directive) {
        return `
            componentDidUpdate() {}
        `;
    }

    /**
     *  A helper for rendering the componentShouldUpdate function
     *
     *  @param {Object} directive - the directive data
     *  @returns {string}
     */
    _transpileComponentShouldUpdate (directive) {
        return dedent`
            componentShouldUpdate(nextProps, nextState) {}
        `;
    }

    /**
     *  A helper for rendering the render function. Put in placeholder
     *  for the actual template so that we can beautify the JS/JSX
     *  separately.
     *
     *  @param {Object} directive - the directive data
     *  @returns {string}
     */
    _transpileRender (directive) {
        return `
            render() {
                return (
                    ${TEMPLATE_PLACEHOLDER}
                );
            }
        `
    }

    /**
     *  Transform the template into proper JSX. Includes: ng-attribute
     *  replacement and beautifying.
     *
     *  @param {string} reactCode - the current transpiled output
     *  @param {Object} directive - the directive data
     *  @returns {string}
     */
    _transpileTemplate (reactCode, directive) {
        const template = directive.template.replace(/ng-model=('.*?')|(".*?")/g, 'defaultValue=$1');
        const prettyTemplate = beautify.html(template).replace(/\n/g, '\n            ')
        return reactCode.replace(TEMPLATE_PLACEHOLDER, prettyTemplate);
    }

}

module.exports = new DirectiveTranspiler();