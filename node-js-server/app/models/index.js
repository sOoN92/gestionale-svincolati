const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.squad = require("./squad.model");
db.released = require("./released.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;