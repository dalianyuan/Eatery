const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/eatery');
mongoose.Promise = global.Promise;

module.exports = mongoose;