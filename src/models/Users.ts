import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../../config/connection';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password1: string;
}

export default User.init(
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
  }
);
