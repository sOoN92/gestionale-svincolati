const db = require("../models");
const Released = db.released;
const Squad = db.squad;

exports.getReleased = async (req, res) => {
  const members = await Squad.find(
    { "members.released": true },
    { "members.$": 1 }
  );

  const released = await Released.find({});

  const mergedData = await Promise.all([members, released]).then(
    ([members, released]) => {
      return { members, released };
    }
  );

  res.status(200).json(mergedData);
};

exports.setReleased = (req, res) => {
  const released = new Released({
    released: req.body.released,
  });
  released.save((err, released) => {
    if (err) {
      return next(err);
    }
    res.status(201).json(released);
  });
};
