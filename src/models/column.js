module.exports = (sequelize, DataTypes) => {
  const Column = sequelize.define(
    'Column',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      boardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'board_id',
        references: { model: 'boards', key: 'id' }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      tableName: 'columns',
      underscored: true
    }
  );

  Column.associate = (models) => {
    Column.belongsTo(models.Board, { foreignKey: 'boardId', as: 'board' });
    Column.hasMany(models.Task, {
      foreignKey: 'columnId',
      as: 'tasks',
      onDelete: 'CASCADE'
    });
  };

  return Column;
};
