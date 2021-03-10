import { sequelize } from '../config/connection';
import { Model, DataTypes, Association } from 'sequelize';
import { Post } from './Post';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  // not going to implement these yet - might not need them: example from documentation
  // public getProjects!: HasManyGetAssociationsMixin<Project>; // Note the null assertions!
  // public addProject!: HasManyAddAssociationMixin<Project, number>;
  // public hasProject!: HasManyHasAssociationMixin<Project, number>;
  // public countProjects!: HasManyCountAssociationsMixin;
  // public createProject!: HasManyCreateAssociationMixin<Project>;
  // import values:   HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyHasAssociationMixin,HasManyAddAssociationMixin,
  // HasManyGetAssociationsMixin,
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    modelName: 'user',
    sequelize,
    timestamps: false,
  }
);

//------------------------------Version 2.0---------------------------------------------------------------------------------

// way of using TypeScript + Sequelize... without strict type checking
// export class User extends Model {
//   id!: number;
//   name!: string;
//   email!: string;
//   password!: string;
// }

// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: new DataTypes.STRING(128),
//       allowNull: false,
//     },
//     email: {
//       type: new DataTypes.STRING(128),
//       allowNull: false,
//     },
//     password: {
//       type: new DataTypes.STRING(128),
//       allowNull: false,
//     },
//   },
//   {
//     tableName: 'users',
//     modelName: 'user',
//     sequelize,
//     timestamps: false,
//   }
// );
//---------------------------------------------Version 1.0--------------------------------------------------
//Alternative way to create new Model in Sequelize
// export const User = sequelize.define(
//   'User',
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: new DataTypes.STRING(128),
//       allowNull: false,
//     },
//     email: {
//       type: new DataTypes.STRING(128),
//       allowNull: false,
//     },
//     password: {
//       type: new DataTypes.STRING(128),
//       allowNull: false,
//     },
//   },
//   {
//     tableName: 'users',
//     modelName: 'user',
//     timestamps: false,
//   }
// );
