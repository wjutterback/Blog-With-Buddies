import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/connection';

export class Comment extends Model {
  id!: number;
  text!: string;
  createdAt!: Date;
  updatedAt!: Date;
  userId!: number;
  postId!: number;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: new DataTypes.STRING(128),
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
    userId: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      //user FK
    },
    postId: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      //post FK
    },
  },
  {
    tableName: 'comments',
    modelName: 'comment',
    sequelize,
    timestamps: true,
  }
);
