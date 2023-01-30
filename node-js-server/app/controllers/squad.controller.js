const db = require("../models");
const Squad = db.squad;

exports.getSquad = (req, res) => {
  Squad.find((err, squad) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    const userSquad = squad?.filter((s) => s.userId == req.userId);

    res.send({ squad: userSquad || [] });
  });
};

exports.setSquad = (req, res) => {
  const members = req.body.members.map((member) => ({
    ...member,
    recoveredCredits: member.recoveredCredits ? member.recoveredCredits : member.price % 2 === 1 ? (member.price + 1) / 2 : member.price / 2,
    released: false,
  }));
  const squad = new Squad({
    members,
    totalCredits: req.body.totalCredits,
    maxSquadRelease:
      req.body.maxSquadRelease !== null &&
      req.body.maxSquadRelease !== undefined
        ? req.body.maxSquadRelease
        : 12,
    userId: req.userId,
  });
  squad.save((err, squad) => {
    if (err) {
      return next(err);
    }
    res.status(201).json(squad);
  });
};

exports.releaseMember = (req, res) => {
  const { id, credits } = req.body;

  Squad.findOneAndUpdate(
    { userId: req.userId, "members._id": id },
    {
      $set: { "members.$.released": true },
      $inc: { maxSquadRelease: -1, totalCredits: credits }
    },
    { new: true },
    (err, squad) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(squad);
      }
    }
  );
};
