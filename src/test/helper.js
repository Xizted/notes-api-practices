const supertest = require('supertest');
const User = require('../models/User');
const { app } = require('../index');
const api = supertest(app);

const initialNotes = [
  {
    title: 'test1',
  },
  {
    title: 'test2',
  },
];

const getAllTitleNotes = async () => {
  const resp = await api.get('/api/v1/notes');
  const titles = resp.body.map((notes) => notes.title);

  return {
    resp,
    titles,
  };
};

const getUsers = async () => {
  const usersDB = await User.find({});
 return usersDB.map((user) => user.toJSON());
}

module.exports = {
  initialNotes,
  api,
  getAllTitleNotes,
  getUsers
};
