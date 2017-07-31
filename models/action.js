var mongoose = require('mongoose');

var actionSchema = mongoose.Schema({
    startDate: { type: Date },
    endDate: { type: Date },
    actionName: { type: String },
    action: { type: String },
    creator: { type: String },
    description: { type: String },
    detail: { type: String },
    isDeleted: { type: Boolean, default: false },
    isHidden: { type: Boolean, default: false },
    logoUrl: { type: String },
});

var action = mongoose.model('action', actionSchema);
module.exports = action;