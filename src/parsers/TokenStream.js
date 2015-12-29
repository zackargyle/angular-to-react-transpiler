const Symbols = require('./Symbols');

function TokenStream(text) {
    this.stream  = text;
    this.index = 0;
    this.done  = false;
}

TokenStream.prototype.advance = function(){
    this.index++;
    if (this.index === this.stream.length) {
        this.done = true;
    }
};
 
TokenStream.prototype.currentToken = function() {
    return this.stream[this.index];
};
 
TokenStream.prototype.isDone = function() {
    return this.done;
};
 
TokenStream.prototype.nextToken = function() {
    return this.stream[this.index + 1];
};

TokenStream.prototype.eat = function(fn, match) {
    while (fn(this.nextToken())) {
        this.advance();
        if (this.isDone()) break;
        this.token += this.currentToken();
    }
};

TokenStream.prototype.eatQuote = function(quote) {
    this.eat(Symbols.isNot.bind(null, quote));
    this.advance();
    this.token += this.currentToken();
};

TokenStream.prototype.tokenize = function() {
    this.tokens = [];
    while (!this.isDone()) {
        this.token = this.currentToken();

        if (Symbols.isQuote(this.token)) {
            this.eatQuote(this.token);
            this.tokens.push({ type: 'string', token: this.token });
        } else if (Symbols.isVariable(this.token)) {
            this.eat(Symbols.isVariable);
            this.tokens.push({ type: 'variable', token: this.token });
        } else if (Symbols.isNumber(this.token)) {
            this.eat(Symbols.isNumber);
            this.tokens.push({ type: 'number', token: this.token });
        } else if (Symbols.isPeriod()) {
            // nothing?
        }
        this.advance();
    }
    return this.tokens;
};

module.exports = TokenStream;