const User = require('../models/User');

const getUsers = async (req, res, next) => {
  const users = await User.find({}).populate('notes', {
    title: 1,
    important: 1,
  });

  res.status(200).send(users);
};



module.exports = {
  getUsers,
};
