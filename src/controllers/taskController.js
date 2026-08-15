const { Task, Column } = require('../models');

// POST /api/tasks
async function createTask(req, res, next) {
  try {
    const { columnId, title, description, priority } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const column = await Column.findByPk(columnId);
    if (!column) {
      return res.status(400).json({ error: 'columnId does not refer to an existing column' });
    }

    const task = await Task.create({
      columnId,
      title: title.trim(),
      description: description || null,
      priority: priority || 'Medium'
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

// PUT /api/tasks/:id
async function updateTask(req, res, next) {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const { title, description, priority } = req.body;

    if (title !== undefined && !title.trim()) {
      return res.status(400).json({ error: 'Title cannot be empty' });
    }

    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;

    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
}

// PATCH /api/tasks/:id/move   body: { columnId }
async function moveTask(req, res, next) {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const { columnId } = req.body;
    if (!columnId) return res.status(400).json({ error: 'columnId is required' });

    const column = await Column.findByPk(columnId);
    if (!column) return res.status(400).json({ error: 'columnId does not refer to an existing column' });

    task.columnId = columnId;
    await task.save();

    res.json(task);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/tasks/:id
async function deleteTask(req, res, next) {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    await task.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { createTask, updateTask, moveTask, deleteTask };
