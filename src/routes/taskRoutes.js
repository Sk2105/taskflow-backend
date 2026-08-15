const express = require('express');
const router = express.Router();
const { createTask, updateTask, moveTask, deleteTask } = require('../controllers/taskController');

router.post('/', createTask);
router.put('/:id', updateTask);
router.patch('/:id/move', moveTask);
router.delete('/:id', deleteTask);

module.exports = router;
