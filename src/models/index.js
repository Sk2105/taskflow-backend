const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Board = require('./board')(sequelize, DataTypes);
const Column = require('./column')(sequelize, DataTypes);
const Task = require('./task')(sequelize, DataTypes);
const Log = require('./Log')(sequelize, DataTypes);

const models = { Board, Column, Task, Log };

Object.values(models).forEach((model) => {
  if (model.associate) model.associate(models);
});

module.exports = { sequelize, ...models };
