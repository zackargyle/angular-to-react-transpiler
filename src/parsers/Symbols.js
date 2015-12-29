const period = '.';
const openParens = '(';
const closeParens = ')';

const variables = '$_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const quotes = '\'"`';

module.exports = {
    isNot: (match, char) => char !== match,
    isQuote: (char) => quotes.indexOf(char) !== -1,
    isNotQuote: (char) => quotes.indexOf(char) === -1,
    isVariable: (char) => variables.indexOf(char) !== -1,
    isNumber: (char) => numbers.indexOf(char) !== -1,
    isPeriod: (char) => char === period
};