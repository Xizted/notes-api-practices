const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { response } = require('express');
const User = require('../models/User');

const createUser = async (req, res, next) => {
  try {
    const { username, name, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await newUser.save();

    res.status(201).send(savedUser);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);
  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'Invalid user or password',
    });
  }

  const userForToken = {
    id: user._id,
    username: user.username,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.send({
    name: user.name,
    username: user.username,
    token,
  });
};

module.exports = {
  createUser,
  login,
};
