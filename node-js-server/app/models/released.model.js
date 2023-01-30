const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReleasedSchema = new Schema({
  released: [
    {
        name: String,
        role: String,
        team: String,
        fantaPoint: Number
    }
]
});

const Released = mongoose.model("Released", ReleasedSchema);
module.exports = Released;
