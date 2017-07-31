var mongoose = require('mongoose');

var formSchema = mongoose.Schema({
    actionid: { type: String },
    form: { type: String },
});

var form = mongoose.model('form', formSchema);
module.exports = form;
