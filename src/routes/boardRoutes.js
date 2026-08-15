const express = require("express");
const router = express.Router();
const {
  listBoards,
  getBoard,
  getColumnCounts,
  getFilteredByPriority,
  createBoard,
} = require("../controllers/boardController");

router.get("/", listBoards);
router.get("/:id", getBoard);
router.get("/:id/column-counts", getColumnCounts);
router.get("/:id/tasks-by-priority/:priority", getFilteredByPriority);
router.post("/", createBoard);

module.exports = router;
