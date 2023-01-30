const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SquadSchema = new Schema({
  members: [
    {
        name: String,
        role: String,
        team: String,
        price: Number,
        recoveredCredits: Number,
        released: Boolean
    }
],
maxSquadRelease: Number,
totalCredits: Number,
userId: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Squad = mongoose.model("Squad", SquadSchema);
module.exports = Squad;
