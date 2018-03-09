var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    title: { type: String },
    description: { type: String },
    isDeleted: { type: Boolean, default: false }
}, {
        timestamps: true
    });

module.exports = mongoose.model('Note', noteSchema);

