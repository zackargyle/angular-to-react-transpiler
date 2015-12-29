'use strict'

// dedent every other for pretty output
const beautify = require('js-beautify');
const dedent = require('dedent');

const BaseTranspiler = require('./transpiler');
const Util = require('../util/util');

/**
 *  Service to CommonJS module
 *  This transpiler takes in the information for an
 *  Angular factory, and transpiles it into the format
 *  of a CommonJS module
 */
class FactoryTranspiler extends BaseTranspiler {

    /**
     *  A method for transpiling angular factory data
     *  into a CommonJS module.
     *
     *  @param {Object} directive - the factory data
     *  @returns {string} transpiled template
     */    
    transpile(factory) {
        return '';
    }

}

module.exports = new FactoryTranspiler();