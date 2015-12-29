'use strict'

// dedent every other for pretty output
const beautify = require('js-beautify');
const dedent = require('dedent');
const Util = require('../util/util');

/**
 *  Base Transpiler to provide common methods to inheritors
 */
class BaseTranspiler {
    /**
     *  A helper for rendering the component dependencies
     *
     *  @param {Object} data - the data
     *  @returns {string} dependencies
     */
    _transpileDependencies (data) {
        return data.dependencies.map(dep => {
            return `const ${dep} = require('${dep}');`;
        }).join('\n') + '\n';
    }
}

module.exports = BaseTranspiler;