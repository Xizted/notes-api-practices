const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const NoteSchema = new Schema({
  title: String,
  completed: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

NoteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = model('Note', NoteSchema);

module.exports = Note;
