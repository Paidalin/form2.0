var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: { type: String },
    password: { type: String },
});

var userinformation = mongoose.model('userinformation', userSchema);
module.exports = userinformation;