// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var usersSchema = new Schema({
    email: {type: String},
    username: {type: String},
    password: {type: String},
    status: {type: Number, default:1},
    isDeleted:{type:Boolean,default:false}
},{
    timestamps:true
});


// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('users', usersSchema);

// make this available to our users in our Node applications
module.exports = User;