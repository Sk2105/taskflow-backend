module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Task',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      columnId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'column_id',
        references: { model: 'columns', key: 'id' }
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: 'Title is required' } }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        allowNull: false,
        defaultValue: 'Medium'
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      tableName: 'tasks',
      underscored: true
    }
  );

  Task.associate = (models) => {
    Task.belongsTo(models.Column, { foreignKey: 'columnId', as: 'column' });
  };

  return Task;
};
