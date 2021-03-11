const { DataTypes, Model } = require('sequelize');
const sequelize  = require('../config/connection');
const User  = require('./User');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    postTitle: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    postText: {
      type: new DataTypes.STRING(3000),
      allowNull: false,
    },
    createdAt: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
    updatedAt: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
  },
  {
    tableName: 'posts',
    modelName: 'post',
    sequelize,
    timestamps: true,
    underscored: true,
  }
);

Post.belongsTo(User);

module.exports = Post;
