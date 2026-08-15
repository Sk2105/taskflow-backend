const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');

async function getTaskCountsPerColumn(boardId) {
  const sql = `
    SELECT
      c.id            AS "columnId",
      c.name          AS "columnName",
      c.position      AS "position",
      COUNT(t.id)::int AS "taskCount"
    FROM columns c
    LEFT JOIN tasks t ON t.column_id = c.id
    WHERE c.board_id = :boardId
    GROUP BY c.id, c.name, c.position
    ORDER BY c.position ASC;
  `;

  return sequelize.query(sql, {
    replacements: { boardId },
    type: QueryTypes.SELECT
  });
}

async function getTasksByPriority(boardId, priority) {
  const sql = `
    SELECT
      t.id,
      t.column_id     AS "columnId",
      t.title,
      t.description,
      t.priority,
      t.created_at    AS "createdAt"
    FROM tasks t
    INNER JOIN columns c ON t.column_id = c.id
    WHERE c.board_id = :boardId
      AND t.priority = :priority
    ORDER BY t.created_at DESC;
  `;

  return sequelize.query(sql, {
    replacements: { boardId, priority },
    type: QueryTypes.SELECT
  });
}

module.exports = { getTaskCountsPerColumn, getTasksByPriority };
