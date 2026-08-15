const { Board, Column, Task } = require("../models");
const board = require("../models/board");
const {
  getTaskCountsPerColumn,
  getTasksByPriority,
} = require("../queries/analyticsQueries");

// GET /api/boards
async function listBoards(req, res, next) {
  try {
    const boards = await Board.findAll({ order: [["id", "ASC"]] });
    res.json(boards);
  } catch (err) {
    next(err);
  }
}

// GET /api/boards/:id  -> full board with columns and tasks, ready to render
async function getBoard(req, res, next) {
  try {
    const board = await Board.findByPk(req.params.id, {
      include: [
        {
          model: Column,
          as: "columns",
          include: [{ model: Task, as: "tasks" }],
        },
      ],
      order: [
        [{ model: Column, as: "columns" }, "position", "ASC"],
        [
          { model: Column, as: "columns" },
          { model: Task, as: "tasks" },
          "position",
          "ASC",
        ],
      ],
    });

    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    res.json(board);
  } catch (err) {
    next(err);
  }
}

// GET /api/boards/:id/column-counts  -> uses raw SQL query 1
async function getColumnCounts(req, res, next) {
  try {
    const counts = await getTaskCountsPerColumn(req.params.id);
    res.json(counts);
  } catch (err) {
    next(err);
  }
}

// GET /api/boards/:id/tasks-by-priority/:priority  -> uses raw SQL query 2
async function getFilteredByPriority(req, res, next) {
  try {
    const { id, priority } = req.params;
    const allowed = ["Low", "Medium", "High"];
    if (!allowed.includes(priority)) {
      return res
        .status(400)
        .json({ error: `priority must be one of ${allowed.join(", ")}` });
    }
    const tasks = await getTasksByPriority(id, priority);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

// create board
async function createBoard(req, res, next) {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Board name is required" });
    }
    const counts = Column.findAll();
    const newBoard = await Column.create({
      name,
      boardId: 1,
      position: counts.length
    });
    res.status(201).json(newBoard);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listBoards,
  createBoard,
  getBoard,
  getColumnCounts,
  getFilteredByPriority,
};
