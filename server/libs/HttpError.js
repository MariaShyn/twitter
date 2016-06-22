var path = require('path');
var util = require('util');
var http = require('http');

function HttpError(status, message, stack) {
    Error.apply(this, arguments);
    if(stack) this.stack = stack;
    else Error.captureStackTrace(this, HttpError);

    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "Error";
}

util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';

exports.HttpError = HttpError;
