var mongoose = require('mongoose');

var jihuomaSchema = mongoose.Schema({
    id: { type: String },
    usable: { type: Boolean, default: true},
});

var jihuoma = mongoose.model('jihuoma', jihuomaSchema);
module.exports = jihuoma;
