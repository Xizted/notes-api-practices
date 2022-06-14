const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { server } = require('../index');
const { api, getUsers } = require('./helper');
const User = require('../models/User');

describe('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('pswd', 10);
    const newUser = new User({
      username: 'Xiztedtest',
      name: 'Test',
      passwordHash,
    });
    await newUser.save();
  });

  test('works as expected creating a fresh username', async () => {
    const usersAtStart = await getUsers();

    const newUser = {
      username: 'Xizted',
      name: 'osmar',
      password: 'owo',
    };

    await api
      .post('/api/v1/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await getUsers();

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);

    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await getUsers();

    const newUser = {
      username: 'Xiztedtest',
      name: 'Test',
      password: '123',
    };

    const result = await api
      .post('/api/v1/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.errors.username.message).toContain('`username` to be unique');

    const usersAtEnd = await getUsers();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  afterAll(async () => {
    mongoose.connection.close();
    server.close();
  });
});
