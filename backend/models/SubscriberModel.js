const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    date:{type:Date, default:Date.now()},
});

const subscriberModel = mongoose.model('Subscriber',subscriberSchema);
module.exports = subscriberModel;