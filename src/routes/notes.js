const express = require('express');
const {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  changeStatus,
} = require('../controllers/notes');
const userExtractor = require('../middleware/userExtractor');

const router = express.Router();

router.get('/', getAllNotes);
router.post('/', userExtractor, createNote);
router.put('/:id', updateNote);
router.put('/:id/changeStatus', changeStatus);
router.delete('/:id', deleteNote);

module.exports = router;
