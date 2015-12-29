'use strict'

// dedent every other for pretty output
const beautify = require('js-beautify');
const dedent = require('dedent');

const BaseTranspiler = require('./transpiler');
const Util = require('../util/util');

/**
 *  Service to CommonJS module
 *  This transpiler takes in the information for an
 *  Angular service, and transpiles it into the format
 *  of a CommonJS module
 */
class ServiceTranspiler extends BaseTranspiler {

    /**
     *  A method for transpiling angular service data
     *  into a CommonJS module.
     *
     *  @param {Object} directive - the service data
     *  @returns {string} transpiled template
     */    
    transpile(service) {
        return '';
    }

}

module.exports = new ServiceTranspiler();