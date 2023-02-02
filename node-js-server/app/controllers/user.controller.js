const db = require("../models");
const User = db.user;

exports.getUserById = (req, res) => {
  User.findById(req.body.id, {}, null, (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ username: user?.username });
  });
};


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
