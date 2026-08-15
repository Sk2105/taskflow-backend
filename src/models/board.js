module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    'Board',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      }
    },
    {
      tableName: 'boards',
      underscored: true
    }
  );

  Board.associate = (models) => {
    Board.hasMany(models.Column, {
      foreignKey: 'boardId',
      as: 'columns',
      onDelete: 'CASCADE'
    });
  };

  return Board;
};
