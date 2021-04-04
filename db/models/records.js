const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    key:String,
    createdAt:Date,
    count:Array,
    value:String
})

module.exports = mongoose.model("records", schema);