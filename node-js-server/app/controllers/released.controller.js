const db = require("../models");
const Released = db.released;
const Squad = db.squad;

exports.getReleased = async (req, res) => {
  let members = await Squad.find(
    { "members.released": true }
  );
  let filtered;
  const released = await Released.find({});

  if (members.length) {
    filtered = members[0].members.filter(x => x.released);
    members[0].members = filtered;
  }

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
