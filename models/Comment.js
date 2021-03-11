import { DataTypes, Model} from 'sequelize';
import { sequelize } from '../config/connection';
import { User } from './User';
import { Post } from './Post';

export class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: new DataTypes.STRING(),
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
    tableName: 'comments',
    modelName: 'comment',
    sequelize,
    timestamps: true,
    underscored: true,
  }
);

Comment.belongsTo(User);
Comment.belongsTo(Post);
