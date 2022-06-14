const mongoose = require('mongoose');
const { server } = require('../index');
const { initialNotes, api, getAllTitleNotes } = require('./helper');
const Note = require('../models/Note');

beforeEach(async () => {
  await Note.deleteMany({});

  for (const note of initialNotes) {
    const noteObject = new Note(note);
    await noteObject.save();
  }
});

test('notes are returned as json', async () => {
  await api
    .get('/api/v1/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('notes are two notes', async () => {
  const resp = await api.get('/api/v1/notes');

  expect(resp.body).toHaveLength(initialNotes.length);
});

test('the first Note is about test1', async () => {
  const resp = await api.get('/api/v1/notes');

  const titles = resp.body.map((notes) => notes.title);

  expect(titles).toContain(initialNotes[0].title);
});

test('a valid note can be added', async () => {
  const newNote = {
    title: 'Nota desde test',
  };

  await api
    .post('/api/v1/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const { resp, titles } = await getAllTitleNotes();

  expect(resp.body).toHaveLength(initialNotes.length + 1);
  expect(titles).toContain(newNote.title);
});

test('Note without content is not added', async () => {
  const newNote = {};

  await api.post('/api/v1/notes').send(newNote).expect(400);

  const resp = await api.get('/api/v1/notes');
  expect(resp.body).toHaveLength(initialNotes.length);
});

test('a note can be deleted', async () => {
  const { resp: firstResponse } = await getAllTitleNotes();
  const { body: notes } = firstResponse;
  const noteToDelete = notes[0];
  await api.delete(`/api/v1/notes/${noteToDelete.id}`).expect(204);

  const { resp: secondResponse, titles } = await getAllTitleNotes();

  expect(secondResponse.body).toHaveLength(initialNotes.length - 1);
  expect(titles).not.toContain(noteToDelete.title);
});

test('a note that do not exist can not be deleted', async () => {
  await api.delete(`/api/v1/notes/123`).expect(400);

  const { resp } = await getAllTitleNotes();
  expect(resp.body).toHaveLength(initialNotes.length);
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
