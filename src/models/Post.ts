import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/connection';

export class Post extends Model {
  id!: number;
  postTitle!: string;
  postText!: string;
  createdAt!: Date;
  updatedAt!: Date;
  // userId!: number; potentially will need this if userPosts can't be made to work
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
    // userId: {
    //   type: new DataTypes.INTEGER,
    //   allowNull: false,
    // },
  },
  {
    tableName: 'posts',
    modelName: 'post',
    sequelize,
    timestamps: true,
  }
);
