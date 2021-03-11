import { DataTypes, Model, Association } from 'sequelize';
import { sequelize } from '../config/connection';
import { User } from './User';
import { Post } from './Post';

interface CommentAttributes {
  id: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
export class Comment
  extends Model<CommentAttributes>
  implements CommentAttributes {
  id!: number;
  text!: string;
  createdAt!: Date;
  updatedAt!: Date;
  public static associations: {
    //FK's here - created on last line of file
    user_id: Association<Comment, User>;
    post_id: Association<Comment, Post>;
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
