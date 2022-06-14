const Note = require('../models/Note');

const getAllNotes = async (req, res, next) => {
  const notes = await Note.find({});
  res.status(200).send(notes);
};

const createNote = async (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).send({
      error: 'El campo titulo es requerido',
    });
  }

  const newNote = new Note({
    title,
    completed: false,
  });

  const noteSaved = await newNote.save();
  res.status(201).send(noteSaved);
};

const updateNote = (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).send({
      error: 'El campo titulo es requerido',
    });
  }

  const noteUpdated = {
    title,
  };

  Note.findByIdAndUpdate(id, noteUpdated, { new: true })
    .then((note) => {
      if (!note)
        return res.status(404).send({ message: 'No se ha encontrado la nota' });

      res.status(204).send(note);
    })
    .catch(next);
};

const changeStatus = (req, res, next) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (!completed) throw new Error('El campo completed es requerido');

  const noteUpdated = {
    completed,
  };

  Note.findByIdAndUpdate(id, noteUpdated, { new: true })
    .then((note) => {
      if (!note)
        return res.status(404).send({ message: 'No se ha encontrado la nota' });

      res.status(204).send(note);
    })
    .catch(next);
};

const deleteNote = (req, res, next) => {
  const { id } = req.params;

  Note.findByIdAndRemove(id)
    .then((note) => {
      if (!note)
        return res.status(404).send({ message: 'No se ha encontrado la nota' });
      res.status(204).end();
    })
    .catch(next);
};

module.exports = {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  changeStatus,
};
