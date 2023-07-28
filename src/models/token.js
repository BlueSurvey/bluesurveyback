 const mongoose = require('mongoose');

 const Schema = mongoose.Schema;

 const tokenSchema = new Schema({
    id: {
        type: Object
    },
    token: {
        type: String,
        required: true
    }
 })

 module.exports = mongoose.model("Token", tokenSchema);