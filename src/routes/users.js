const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/User');

router.post('/', async (req, res, next) => {
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
    res.status(400).send(e);
  }
});

module.exports = router;
