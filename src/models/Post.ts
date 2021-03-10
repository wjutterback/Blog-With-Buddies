import { DataTypes, Model, Association } from 'sequelize';
import { sequelize } from '../config/connection';
import { User } from './User';

interface PostAttributes {
  id: number;
  postTitle: string;
  postText: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Post extends Model<PostAttributes> implements PostAttributes {
  id!: number;
  postTitle!: string;
  postText!: string;
  createdAt!: Date;
  updatedAt!: Date;
  public static associations: {
    //FK's here
    userId: Association<Post, User>;
  };
}

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
