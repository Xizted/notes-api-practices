const express = require('express');
const {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  changeStatus,
} = require('../controllers/notes');
const router = express.Router();

router.get('/', getAllNotes);
router.post('/', createNote);
router.put('/:id', updateNote);
router.put('/:id/changeStatus', changeStatus);
router.delete('/:id', deleteNote);

module.exports = router;
