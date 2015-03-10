var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/survey');

module.exports = mongoose.connection;