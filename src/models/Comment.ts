import { DataTypes, Model, Association } from 'sequelize';
import { sequelize } from '../config/connection';
import { User } from './User';
import { Post } from './Post';

interface CommentAttributes {
  id: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  user_id: number;
  post_id: number;
}
export class Comment
  extends Model<CommentAttributes>
  implements CommentAttributes {
  id!: number;
  text!: string;
  createdAt!: Date;
  updatedAt!: Date;
  user_id!: number;
  post_id!: number;
  public static associations: {
    user_id: Association<User, Comment>;
    post_id: Association<Post, Comment>;
  };
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
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
    //user FK
    user_id: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    //post FK
    post_id: {
      type: new DataTypes.INTEGER(),
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
